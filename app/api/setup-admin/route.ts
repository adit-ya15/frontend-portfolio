import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        const password = searchParams.get("password");

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password required in query params" }, { status: 400 });
        }

        // Check if admin exists
        const existingAdmin = await prisma.admin.findUnique({
            where: { email },
        });

        if (existingAdmin) {
            // Update password
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.admin.update({
                where: { email },
                data: { password: hashedPassword },
            });
            return NextResponse.json({ message: "Admin updated successfully" });
        }

        // Create new admin
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await prisma.admin.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: "Admin created successfully", admin: { id: admin.id, email: admin.email } });
    } catch (error) {
        console.error("Error creating admin:", error);
        return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
    }
}
