import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const admin = searchParams.get('admin') === 'true';

    if (admin) {
      // Admin view - return all navlinks with full details
      const navLinks = await prisma.navLink.findMany({
        orderBy: { order: 'asc' },
      });
      return NextResponse.json(navLinks);
    }

    // Public view - only active links with minimal data
    const navLinks = await prisma.navLink.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: {
        linkId: true,
        title: true,
      },
    });

    const formattedLinks = navLinks.map(link => ({
      id: link.linkId,
      title: link.title,
    }));

    return NextResponse.json(formattedLinks);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch nav links" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    
    const navLink = await prisma.navLink.create({
      data: {
        linkId: data.linkId,
        title: data.title,
        order: data.order || 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });

    return NextResponse.json(navLink);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create nav link" }, { status: 500 });
  }
}
