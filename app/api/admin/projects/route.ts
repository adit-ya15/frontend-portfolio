import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { convertToSignedUrl } from "@/lib/cloudinary";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    });

    // Add signed URLs for display while keeping original paths for editing
    const projectsWithSignedUrls = await Promise.all(
      projects.map(async (project) => ({
        ...project,
        imageUrl: await convertToSignedUrl(project.image), // For display
        // image field keeps the original S3 path for editing
      }))
    );

    return NextResponse.json(projectsWithSignedUrls);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
