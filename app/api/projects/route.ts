import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { convertToSignedUrl } from "@/lib/s3";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    const formattedProjects = await Promise.all(projects.map(async (project) => ({
      name: project.name,
      description: project.description,
      tags: JSON.parse(project.tags),
      image: await convertToSignedUrl(project.image),
      source_code_link: project.sourceCodeLink,
      deploy_link: project.deployLink,
      platform: project.platform,
    })));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    
    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        tags: JSON.stringify(data.tags),
        image: data.image,
        sourceCodeLink: data.source_code_link,
        deployLink: data.deploy_link,
        platform: data.platform,
        order: data.order || 0,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
