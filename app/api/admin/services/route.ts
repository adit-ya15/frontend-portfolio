import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { convertToSignedUrl } from "@/lib/s3";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    });

    const servicesWithSignedUrls = await Promise.all(
      services.map(async (service) => ({
        ...service,
        iconUrl: await convertToSignedUrl(service.icon),
      }))
    );

    return NextResponse.json(servicesWithSignedUrls);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
