import { NextRequest, NextResponse } from "next/server";
import { convertToSignedUrl } from "@/lib/s3";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    // If type is provided, return specific resume with signed URL (for public use)
    if (type) {
      const resume = await prisma.resume.findFirst({
        where: {
          type: type,
          isActive: true,
        },
        orderBy: { order: "asc" },
      });

      if (!resume) {
        return NextResponse.json(
          { error: "Resume not found" },
          { status: 404 }
        );
      }

      const signedUrl = await convertToSignedUrl(resume.fileUrl, 3600);

      return NextResponse.json({
        url: signedUrl,
        type: resume.type,
      });
    }

    // Otherwise, return all resumes (for admin panel)
    const resumes = await prisma.resume.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(resumes);
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json(
      { error: "Failed to fetch resume" },
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

    const { type, title, fileUrl, order } = await req.json();

    const resume = await prisma.resume.create({
      data: {
        type,
        title,
        fileUrl,
        order: order || 0,
      },
    });

    return NextResponse.json(resume);
  } catch (error) {
    console.error("Error creating resume:", error);
    return NextResponse.json(
      { error: "Failed to create resume" },
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

    const { id, type, title, fileUrl, order, isActive } = await req.json();

    const resume = await prisma.resume.update({
      where: { id },
      data: {
        type,
        title,
        fileUrl,
        order,
        isActive,
      },
    });

    return NextResponse.json(resume);
  } catch (error) {
    console.error("Error updating resume:", error);
    return NextResponse.json(
      { error: "Failed to update resume" },
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

    await prisma.resume.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting resume:", error);
    return NextResponse.json(
      { error: "Failed to delete resume" },
      { status: 500 }
    );
  }
}
