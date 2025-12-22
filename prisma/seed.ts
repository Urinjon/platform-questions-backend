import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole } from "../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // ---------- ADMIN ----------
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: "hashed-password", // ❗ в реале хэш
      role: UserRole.ADMIN,
    },
  });

  // ---------- STUDENT ----------
  await prisma.user.upsert({
    where: { email: "student@example.com" },
    update: {},
    create: {
      email: "student@example.com",
      password: "hashed-password",
      role: UserRole.STUDENT,
      studentProfile: {
        create: {
          lastName: "Иванов",
          phone: "+998901234567",
          birthDate: new Date("2002-05-12"),
          university: "ТУИТ",
        },
      },
    },
  });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
