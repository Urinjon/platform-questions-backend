import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({adapter});

async function main() {
  // Очистка существующих данных (опционально)
  await prisma.user.deleteMany();
  
  // Создание пользователей
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'alice@example.com',
        name: 'Alice Johnson',
        createdAt: new Date(),
      },
      {
        email: 'bob@example.com',
        name: 'Bob Smith',
        createdAt: new Date(),
      },
      {
        email: 'charlie@example.com',
        name: 'Charlie Brown',
        createdAt: new Date(),
      },
    ],
    skipDuplicates: true, // Пропускать если email уже существует
  });

  console.log(`Created ${users.count} users`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});