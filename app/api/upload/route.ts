import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `${folder}/${timestamp}_${sanitizedFileName}`;

    // Upload to Cloudinary
    const result = await uploadToCloudinary(buffer, folder);

    return NextResponse.json({
      url: result.url,
      // Cloudinary doesn't use keys in the same way, but we can return publicId if needed
      key: result.publicId,
      message: "File uploaded successfully"
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({
      error: "Failed to upload file",
      details: error.message
    }, { status: 500 });
  }
}
