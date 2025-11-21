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
    const technologies = await prisma.technology.findMany({
      orderBy: { order: 'asc' },
    });

    // Add signed URLs for display while keeping original paths for editing
    const technologiesWithSignedUrls = await Promise.all(
      technologies.map(async (technology) => ({
        id: technology.id,
        name: technology.name,
        icon: technology.icon,
        iconUrl: await convertToSignedUrl(technology.icon), // For display
        category: technology.group, // Map group to category for admin UI
        order: technology.order,
        isActive: technology.isActive,
      }))
    );

    return NextResponse.json(technologiesWithSignedUrls);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch technologies" }, { status: 500 });
  }
}
