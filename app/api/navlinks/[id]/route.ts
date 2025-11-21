import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    
    const navLink = await prisma.navLink.update({
      where: { id: params.id },
      data: {
        title: data.title,
        order: data.order,
        isActive: data.isActive,
      },
    });

    return NextResponse.json(navLink);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update nav link" }, { status: 500 });
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
    await prisma.navLink.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Nav link deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete nav link" }, { status: 500 });
  }
}
