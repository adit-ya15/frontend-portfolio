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

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, testimonial: testimonialText, designation, company, image, link, order } = body;

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        testimonial: testimonialText,
        designation,
        company,
        image,
        link,
        order,
        isActive: true,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, name, testimonial: testimonialText, designation, company, image, link, order, isActive } = body;

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name,
        testimonial: testimonialText,
        designation,
        company,
        image,
        link,
        order,
        isActive,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id } = body;

    await prisma.testimonial.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
