import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { convertToSignedUrl } from "@/lib/s3";

export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    const formattedVideos = await Promise.all(
      videos.map(async (video) => ({
        id: video.id,
        title: video.title,
        description: video.description,
        videoUrl: await convertToSignedUrl(video.videoUrl),
        thumbnail: video.thumbnail
          ? await convertToSignedUrl(video.thumbnail)
          : null,
        tags: JSON.parse(video.tags),
        order: video.order,
      }))
    );

    return NextResponse.json(formattedVideos);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
