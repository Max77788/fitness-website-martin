import { NextRequest, NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, planId } = body;

    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: { email, name },
    });

    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        planId: plan.id,
        amount: plan.price,
        currency: "usd",
        status: "pending",
      },
    });

    if (!isStripeConfigured) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "completed" },
      });

      const appUrl = process.env.APP_URL || "http://localhost:3000";
      const demoSessionId = `demo_${payment.id}`;

      await prisma.payment.update({
        where: { id: payment.id },
        data: { stripeSessionId: demoSessionId },
      });

      const code = `DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      await prisma.accessCode.create({
        data: {
          userId: user.id,
          paymentId: payment.id,
          code,
          zoomJoinUrl: "https://zoom.us/j/123456789?pwd=demo",
          zoomMeetingId: "123456789",
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });

      return NextResponse.json({ url: `${appUrl}/success?session_id=${demoSessionId}` });
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: plan.name,
              description: plan.description || undefined,
            },
            unit_amount: plan.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.APP_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL || "http://localhost:3000"}/`,
      metadata: {
        paymentId: payment.id,
        userId: user.id,
        planId: plan.id,
      },
    });

    await prisma.payment.update({
      where: { id: payment.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
