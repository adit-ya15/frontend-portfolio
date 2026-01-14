import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { convertToSignedUrl, deleteFromCloudinary, extractPublicIdFromUrl } from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format');

    const technologies = await prisma.technology.findMany({
      where: { isActive: true },
      orderBy: [{ group: 'asc' }, { order: 'asc' }],
    });

    // If flat format requested, return simple array with all fields
    if (format === 'flat') {
      const formatted = await Promise.all(technologies.map(async (tech) => ({
        id: tech.id,
        name: tech.name,
        icon: await convertToSignedUrl(tech.icon),
        category: tech.group,
        order: tech.order,
        isActive: tech.isActive,
      })));
      return NextResponse.json(formatted);
    }

    // Format for grouped list (default)
    const grouped: Record<string, { id: string; name: string; icon: string }[]> = {};

    for (const tech of technologies) {
      if (!grouped[tech.group]) {
        grouped[tech.group] = [];
      }
      grouped[tech.group].push({
        id: tech.id,
        name: tech.name,
        icon: await convertToSignedUrl(tech.icon),
      });
    }

    const desiredOrder = [
      "Frontend",
      "Core Frontend Concepts",
      "Languages",
      "Databases & Cache",
      "Tools & Platforms"
    ];



    const technologyGroups = Object.keys(grouped)
      .sort((a, b) => {
        const normalize = (s: string) => s.toLowerCase().trim();
        const indexA = desiredOrder.findIndex(order => normalize(order) === normalize(a));
        const indexB = desiredOrder.findIndex(order => normalize(order) === normalize(b));

        // If both are in the list, sort by index
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        // If one is in the list, the one in the list comes first
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        // If neither is in the list, sort naturally
        return a.localeCompare(b);
      })
      .map(groupName => ({
        title: groupName,
        items: grouped[groupName],
      }));

    return NextResponse.json(technologyGroups);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch technologies" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    const technology = await prisma.technology.create({
      data: {
        name: data.name,
        icon: data.icon,
        group: data.category || data.group,
        order: data.order || 0,
      },
    });

    return NextResponse.json(technology);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create technology" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    const updateData: any = {
      name: data.name,
      icon: data.icon,
      group: data.category || data.group,
      order: data.order,
    };

    if (data.isActive !== undefined) {
      updateData.isActive = data.isActive;
    }

    // Verify ownership/existence and get old image URL
    const existingTechnology = await prisma.technology.findUnique({
      where: { id: data.id },
    });

    if (!existingTechnology) {
      return NextResponse.json({ error: "Technology not found" }, { status: 404 });
    }

    const technology = await prisma.technology.update({
      where: { id: data.id },
      data: updateData,
    });

    // If icon was updated, delete the old one
    if (data.icon && existingTechnology.icon && data.icon !== existingTechnology.icon) {
      const publicId = extractPublicIdFromUrl(existingTechnology.icon);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }

    return NextResponse.json(technology);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update technology" }, { status: 500 });
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

    const technology = await prisma.technology.delete({
      where: { id },
    });

    // Delete image from Cloudinary
    if (technology.icon) {
      const publicId = extractPublicIdFromUrl(technology.icon);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }

    return NextResponse.json({ message: "Technology deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete technology" }, { status: 500 });
  }
}
