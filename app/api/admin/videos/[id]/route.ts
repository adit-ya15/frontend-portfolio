import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteFromCloudinary, extractPublicIdFromUrl } from "@/lib/cloudinary";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Verify ownership/existence
    const existingVideo = await prisma.video.findUnique({
      where: { id: params.id },
    });

    if (!existingVideo) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const video = await prisma.video.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description,
        videoUrl: data.videoUrl,
        thumbnail: data.thumbnail || null,
        tags: JSON.stringify(tags),
        order: data.order,
      },
    });

    // Delete old video if changed
    if (data.videoUrl && existingVideo.videoUrl && data.videoUrl !== existingVideo.videoUrl) {
      const publicId = extractPublicIdFromUrl(existingVideo.videoUrl);
      if (publicId) await deleteFromCloudinary(publicId);
    }

    // Delete old thumbnail if changed
    if (data.thumbnail && existingVideo.thumbnail && data.thumbnail !== existingVideo.thumbnail) {
      const publicId = extractPublicIdFromUrl(existingVideo.thumbnail);
      if (publicId) await deleteFromCloudinary(publicId);
    }

    return NextResponse.json(video);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update video" },
      { status: 500 }
    );
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
    const video = await prisma.video.delete({
      where: { id: params.id },
    });

    // Delete video from Cloudinary
    if (video.videoUrl) {
      const publicId = extractPublicIdFromUrl(video.videoUrl);
      if (publicId) await deleteFromCloudinary(publicId);
    }

    // Delete thumbnail from Cloudinary
    if (video.thumbnail) {
      const publicId = extractPublicIdFromUrl(video.thumbnail);
      if (publicId) await deleteFromCloudinary(publicId);
    }

    return NextResponse.json({ message: "Video deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete video" },
      { status: 500 }
    );
  }
}
