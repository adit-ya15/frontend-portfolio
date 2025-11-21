import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { convertToSignedUrl } from "@/lib/s3";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const videos = await prisma.video.findMany({
      orderBy: { order: "asc" },
    });

    const videosWithSignedUrls = await Promise.all(
      videos.map(async (video) => ({
        ...video,
        videoUrlSigned: await convertToSignedUrl(video.videoUrl),
        thumbnailSigned: video.thumbnail
          ? await convertToSignedUrl(video.thumbnail)
          : null,
      }))
    );

    return NextResponse.json(videosWithSignedUrls);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    const tags = data.tags
      .split(",")
      .map((tag: string) => ({ name: tag.trim() }))
      .filter((tag: { name: string }) => tag.name);

    const video = await prisma.video.create({
      data: {
        title: data.title,
        description: data.description,
        videoUrl: data.videoUrl,
        thumbnail: data.thumbnail || null,
        tags: JSON.stringify(tags),
        order: data.order || 0,
        isActive: true,
      },
    });

    return NextResponse.json(video);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}
