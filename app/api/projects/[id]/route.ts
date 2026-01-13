import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteFromCloudinary, extractPublicIdFromUrl } from "@/lib/cloudinary";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    // Verify ownership/existence
    const existingProject = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        name: data.name,
        description: data.description,
        tags: JSON.stringify(data.tags),
        image: data.image,
        sourceCodeLink: data.source_code_link,
        deployLink: data.deploy_link,
        platform: data.platform,
        order: data.order,
        isActive: data.isActive,
      },
    });

    // Delete old image from Cloudinary if changed
    if (data.image && existingProject.image && data.image !== existingProject.image) {
      const publicId = extractPublicIdFromUrl(existingProject.image);
      if (publicId) await deleteFromCloudinary(publicId);
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const project = await prisma.project.delete({
      where: { id: params.id },
    });

    // Delete image from Cloudinary
    if (project.image) {
      const publicId = extractPublicIdFromUrl(project.image);
      if (publicId) await deleteFromCloudinary(publicId);
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
