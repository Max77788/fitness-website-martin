import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ payments: [] });
  }

  // Manually gather payments and include plan + accessCode
  // Since mockPrisma doesn't support nested includes, we do it manually
  const userPayments = await (prisma as any).payment?.findMany
    ? (prisma as any).payment.findMany({ where: { userId: user.id } })
    : [];

  const plans = await (prisma as any).plan?.findMany
    ? (prisma as any).plan.findMany()
    : [];

  const accessCodes = await (prisma as any).accessCode?.findMany
    ? (prisma as any).accessCode.findMany()
    : [];

  const enrichedPayments = userPayments.map((p: any) => ({
    ...p,
    plan: plans.find((pl: any) => pl.id === p.planId) || null,
    accessCode: accessCodes.find((ac: any) => ac.paymentId === p.id) || null,
  }));

  return NextResponse.json({ payments: enrichedPayments });
}
