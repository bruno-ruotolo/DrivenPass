import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  const data = { email: "superadmin@admin.com", password: "adminadminadmin" }
  await prisma.users.createMany({ data });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });