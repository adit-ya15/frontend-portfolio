import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { convertToSignedUrl } from "@/lib/cloudinary";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        testimonial: true,
        name: true,
        image: true,
        link: true,
      },
    });

    const formattedTestimonials = await Promise.all(testimonials.map(async (t) => ({
      id: t.id,
      testimonial: t.testimonial,
      name: t.name,
      image: await convertToSignedUrl(t.image),
      link: t.link,
    })));

    return NextResponse.json(formattedTestimonials);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}
