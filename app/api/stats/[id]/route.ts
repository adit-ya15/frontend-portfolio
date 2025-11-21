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
    
    const stat = await prisma.stat.update({
      where: { id: params.id },
      data: {
        label: data.label,
        value: data.value,
        icon: data.icon,
        order: data.order,
        isActive: data.isActive,
      },
    });

    return NextResponse.json(stat);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update stat" }, { status: 500 });
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
    await prisma.stat.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Stat deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete stat" }, { status: 500 });
  }
}
