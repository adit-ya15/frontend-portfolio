import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { convertToSignedUrl, deleteFromCloudinary, extractPublicIdFromUrl } from "@/lib/cloudinary";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const diagrams = await prisma.diagram.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    const diagramsWithSignedUrls = await Promise.all(
      diagrams.map(async (diagram) => ({
        id: diagram.id,
        title: diagram.title,
        description: diagram.description,
        image: await convertToSignedUrl(diagram.image),
        order: diagram.order,
      }))
    );

    return NextResponse.json(diagramsWithSignedUrls);
  } catch (error) {
    console.error("Error fetching diagrams:", error);
    return NextResponse.json(
      { error: "Failed to fetch diagrams" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, image, order } = await req.json();

    const diagram = await prisma.diagram.create({
      data: {
        title,
        description,
        image,
        order: order || 0,
      },
    });

    return NextResponse.json(diagram);
  } catch (error) {
    console.error("Error creating diagram:", error);
    return NextResponse.json(
      { error: "Failed to create diagram" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, title, description, image, order, isActive } = await req.json();

    // Get existing diagram for image comparison
    const existingDiagram = await prisma.diagram.findUnique({
      where: { id },
    });

    if (!existingDiagram) {
      return NextResponse.json({ error: "Diagram not found" }, { status: 404 });
    }

    const diagram = await prisma.diagram.update({
      where: { id },
      data: {
        title,
        description,
        image,
        order,
        isActive,
      },
    });

    // Delete old image if it changed
    if (image && existingDiagram.image && image !== existingDiagram.image) {
      const publicId = extractPublicIdFromUrl(existingDiagram.image);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }

    return NextResponse.json(diagram);
  } catch (error) {
    console.error("Error updating diagram:", error);
    return NextResponse.json(
      { error: "Failed to update diagram" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    const diagram = await prisma.diagram.delete({
      where: { id },
    });

    // Delete image from Cloudinary
    if (diagram.image) {
      const publicId = extractPublicIdFromUrl(diagram.image);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting diagram:", error);
    return NextResponse.json(
      { error: "Failed to delete diagram" },
      { status: 500 }
    );
  }
}
