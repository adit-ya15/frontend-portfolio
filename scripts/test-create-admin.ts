
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createTestAdmin() {
    const email = 'testadmin@example.com';
    const password = 'password123';

    try {
        console.log('--- Starting Admin Creation Test ---');

        // 1. Check DB connection
        await prisma.$connect();
        console.log('✅ Connected to Database');

        // 2. Check if admin exists
        const existing = await prisma.admin.findUnique({
            where: { email },
        });

        if (existing) {
            console.log(`ℹ️ Admin ${email} already exists. ID: ${existing.id}`);
            // Optional: Delete to test creation? Better to just report success.
            return;
        }

        // 3. Hash password
        console.log('🔑 Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create admin
        console.log('👤 Creating admin user...');
        const admin = await prisma.admin.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        console.log('✅ Admin created successfully!');
        console.log(admin);

    } catch (error) {
        console.error('❌ Failed to create admin:');
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

createTestAdmin();
