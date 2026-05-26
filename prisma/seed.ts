import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const plans = [
    {
      name: "Single Session",
      description: "One 60-minute live fitness session with personal Zoom access.",
      price: 2900,
      interval: "single",
    },
    {
      name: "Weekly Pack",
      description: "2 live sessions per week with personal Zoom access.",
      price: 4900,
      interval: "weekly",
    },
    {
      name: "Monthly",
      description: "Unlimited live sessions for 1 month with personal Zoom code.",
      price: 14900,
      interval: "monthly",
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { id: plan.name },
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
