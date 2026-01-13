import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { convertToSignedUrl, deleteFromCloudinary, extractPublicIdFromUrl } from "@/lib/cloudinary";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    const formattedExperiences = await Promise.all(experiences.map(async (exp) => ({
      title: exp.title,
      companyName: exp.companyName,
      icon: await convertToSignedUrl(exp.icon),
      iconBg: exp.iconBg,
      date: exp.date,
      points: JSON.parse(exp.points),
    })));

    return NextResponse.json(formattedExperiences);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    const experience = await prisma.experience.create({
      data: {
        title: data.title,
        companyName: data.companyName,
        icon: data.icon,
        iconBg: data.iconBg,
        date: data.date,
        points: JSON.stringify(data.points),
        order: data.order || 0,
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    // Verify ownership/existence
    const existingExperience = await prisma.experience.findUnique({
      where: { id: data.id },
    });

    if (!existingExperience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    const experience = await prisma.experience.update({
      where: { id: data.id },
      data: {
        title: data.title,
        companyName: data.companyName,
        icon: data.icon,
        iconBg: data.iconBg,
        date: data.date,
        points: JSON.stringify(data.points),
        order: data.order,
        isActive: data.isActive,
      },
    });

    // Delete old icon if changed
    if (data.icon && existingExperience.icon && data.icon !== existingExperience.icon) {
      const publicId = extractPublicIdFromUrl(existingExperience.icon);
      if (publicId) await deleteFromCloudinary(publicId);
    }

    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const experience = await prisma.experience.delete({
      where: { id },
    });

    // Delete icon from Cloudinary
    if (experience.icon) {
      const publicId = extractPublicIdFromUrl(experience.icon);
      if (publicId) await deleteFromCloudinary(publicId);
    }

    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}
