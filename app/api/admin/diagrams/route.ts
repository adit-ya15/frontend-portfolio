import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { convertToSignedUrl } from "@/lib/cloudinary";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const diagrams = await prisma.diagram.findMany({
      orderBy: { order: "asc" },
    });

    const diagramsWithSignedUrls = await Promise.all(
      diagrams.map(async (diagram) => ({
        ...diagram,
        imageUrl: await convertToSignedUrl(diagram.image),
      }))
    );

    return NextResponse.json(diagramsWithSignedUrls);
  } catch (error) {
    console.error("Error fetching diagrams:", error);
    return NextResponse.json(
      { error: "Failed to fetch diagrams" },
      { status: 500 }
    );
  }
}
