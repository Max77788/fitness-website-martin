import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const plans = [
    {
      name: "Séance Unique",
      description: "Une séance de fitness en direct de 60 minutes avec accès Zoom personnel.",
      price: 2500, // 25 EUR in cents
      interval: "single",
    },
    {
      name: "Pack Hebdomadaire",
      description: "2 séances par semaine en direct avec accès Zoom personnel.",
      price: 4500, // 45 EUR in cents
      interval: "weekly",
    },
    {
      name: "Abonnement Mensuel",
      description: "Accès illimité aux séances en direct pendant 1 mois avec code Zoom personnel.",
      price: 15000, // 150 EUR in cents
      interval: "monthly",
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { id: plan.name }, // Using name as unique identifier for seeding
      update: plan,
      create: {
        ...plan,
        id: undefined,
      },
    });
  }

  console.log("Seeded plans successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
