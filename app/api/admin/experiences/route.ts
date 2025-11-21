import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { convertToSignedUrl } from "@/lib/s3";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: 'asc' },
    });

    // Add signed URLs for display while keeping original paths for editing
    const experiencesWithSignedUrls = await Promise.all(
      experiences.map(async (experience) => ({
        ...experience,
        iconUrl: await convertToSignedUrl(experience.icon), // For display
        // icon field keeps the original S3 path for editing
      }))
    );

    return NextResponse.json(experiencesWithSignedUrls);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}
