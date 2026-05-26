import { PrismaClient, Plan, User, Payment, AccessCode, WhatsAppLead } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

let prismaClient: PrismaClient | null = null;
let usingMockDb = false;

try {
  if (process.env.DATABASE_URL) {
    prismaClient = globalForPrisma.prisma ?? new PrismaClient();
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaClient;
  } else {
    usingMockDb = true;
  }
} catch {
  usingMockDb = true;
}

export const isMockDb = () => usingMockDb;

const staticPlans: Plan[] = [
  {
    id: "single",
    name: "Single Session",
    description: "One 60-minute live fitness session with personal Zoom access.",
    price: 2900,
    interval: "single",
    zoomMeetingId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "weekly",
    name: "Weekly Pack",
    description: "2 live sessions per week with personal Zoom access.",
    price: 4900,
    interval: "weekly",
    zoomMeetingId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "monthly",
    name: "Monthly",
    description: "Unlimited live sessions for 1 month with personal Zoom code.",
    price: 14900,
    interval: "monthly",
    zoomMeetingId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const users: User[] = [];
const payments: Payment[] = [];
const accessCodes: AccessCode[] = [];
const whatsappLeads: WhatsAppLead[] = [];

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const mockPrisma = {
  plan: {
    findUnique: async ({ where }: { where: { id: string } }) => {
      return staticPlans.find((p) => p.id === where.id) || null;
    },
    findMany: async () => staticPlans,
  },
  user: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      return users.find((u) => u.email === where.email || u.id === where.id) || null;
    },
    upsert: async ({
      where,
      update,
      create,
    }: {
      where: { email: string };
      update: Partial<User>;
      create: Omit<User, "id" | "createdAt" | "updatedAt">;
    }) => {
      let user = users.find((u) => u.email === where.email);
      if (user) {
        Object.assign(user, update, { updatedAt: new Date() });
      } else {
        user = {
          id: generateId(),
          ...create,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as User;
        users.push(user);
      }
      return user;
    },
    create: async ({ data }: { data: any }) => {
      const user = { id: generateId(), ...data, createdAt: new Date(), updatedAt: new Date() } as User;
      users.push(user);
      return user;
    },
  },
  payment: {
    create: async ({ data }: { data: any }) => {
      const payment = {
        id: generateId(),
        ...data,
        stripeSessionId: data.stripeSessionId || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Payment;
      payments.push(payment);
      return payment;
    },
    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      const payment = payments.find((p) => p.id === where.id);
      if (payment) {
        Object.assign(payment, data, { updatedAt: new Date() });
      }
      return payment!;
    },
    findUnique: async ({ where }: { where: { id?: string; stripeSessionId?: string } }) => {
      return (
        payments.find(
          (p) => p.id === where.id || p.stripeSessionId === where.stripeSessionId
        ) || null
      );
    },
  },
  accessCode: {
    create: async ({ data }: { data: any }) => {
      const code = {
        id: generateId(),
        ...data,
        zoomJoinUrl: data.zoomJoinUrl || null,
        zoomMeetingId: data.zoomMeetingId || null,
        zoomPassword: data.zoomPassword || null,
        expiresAt: data.expiresAt || null,
        usedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as AccessCode;
      accessCodes.push(code);
      return code;
    },
    findUnique: async ({ where }: { where: { id?: string; code?: string; paymentId?: string } }) => {
      return (
        accessCodes.find(
          (c) => c.id === where.id || c.code === where.code || c.paymentId === where.paymentId
        ) || null
      );
    },
  },
  whatsAppLead: {
    findFirst: async ({ where }: { where: { phone?: string } }) => {
      return whatsappLeads.find((l) => l.phone === where.phone) || null;
    },
    create: async ({ data }: { data: any }) => {
      const lead = {
        id: generateId(),
        ...data,
        name: data.name || null,
        email: data.email || null,
        status: data.status || "new",
        lastMessage: data.lastMessage || null,
        lastMessageAt: data.lastMessageAt || null,
        userId: data.userId || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as WhatsAppLead;
      whatsappLeads.push(lead);
      return lead;
    },
    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      const lead = whatsappLeads.find((l) => l.id === where.id);
      if (lead) {
        Object.assign(lead, data, { updatedAt: new Date() });
      }
      return lead!;
    },
  },
};

export const prisma = (prismaClient || mockPrisma) as unknown as PrismaClient;
