import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { convertToSignedUrl } from "@/lib/s3";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    const formattedVideos = await Promise.all(
      videos.map(async (video) => {
        try {
          const signedVideoUrl = await convertToSignedUrl(video.videoUrl);
          const signedThumbnail = video.thumbnail
            ? await convertToSignedUrl(video.thumbnail)
            : null;

          console.log('Video signed URL generated:', {
            id: video.id,
            originalVideo: video.videoUrl,
            signedVideo: signedVideoUrl,
            originalThumbnail: video.thumbnail,
            signedThumbnail: signedThumbnail,
          });

          return {
            id: video.id,
            title: video.title,
            description: video.description,
            videoUrl: signedVideoUrl,
            thumbnail: signedThumbnail,
            tags: JSON.parse(video.tags),
            order: video.order,
          };
        } catch (error) {
          console.error('Error processing video:', video.id, error);
          return {
            id: video.id,
            title: video.title,
            description: video.description,
            videoUrl: video.videoUrl,
            thumbnail: video.thumbnail,
            tags: JSON.parse(video.tags),
            order: video.order,
          };
        }
      })
    );

    const res = NextResponse.json(formattedVideos);
    // Prevent caching of signed URLs on the edge/CDN and browser
    res.headers.set('Cache-Control', 'no-store, max-age=0');
    return res;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
