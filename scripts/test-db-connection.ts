
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Attempting to connect to the database...');
        await prisma.$connect();
        console.log('Successfully connected to the database!');

        // Try a simple query to ensure read access
        const count = await prisma.project.count();
        console.log(`Database is readable. Found ${count} projects.`);

    } catch (error) {
        console.error('Failed to connect to the database:');
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
