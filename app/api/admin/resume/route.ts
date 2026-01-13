import { NextResponse } from "next/server";
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
    const resumes = await prisma.resume.findMany({
      orderBy: { order: 'asc' },
    });

    // Add signed URLs for display while keeping original paths for editing
    const resumesWithSignedUrls = await Promise.all(
      resumes.map(async (resume) => ({
        ...resume,
        fileUrlSigned: await convertToSignedUrl(resume.fileUrl), // For display/download
        // fileUrl field keeps the original S3 path for editing
      }))
    );

    return NextResponse.json(resumesWithSignedUrls);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resumes" }, { status: 500 });
  }
}
