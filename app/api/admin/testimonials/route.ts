import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { convertToSignedUrl } from "@/lib/cloudinary";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: 'asc' },
    });

    // Add signed URLs for display while keeping original paths for editing
    const testimonialsWithSignedUrls = await Promise.all(
      testimonials.map(async (testimonial) => ({
        ...testimonial,
        imageUrl: await convertToSignedUrl(testimonial.image), // For display
        // image field keeps the original S3 path for editing
      }))
    );

    return NextResponse.json(testimonialsWithSignedUrls);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}
