import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { addZoomRegistrant } from "@/lib/zoom";
import { randomBytes } from "crypto";

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const { paymentId, userId, planId } = session.metadata;

    // Update payment status
    await prisma.payment.update({
      where: { id: paymentId },
      data: { status: "completed" },
    });

    // Get plan and user
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (plan?.zoomMeetingId && user) {
      // Generate unique access code
      const code = randomBytes(16).toString("hex");

      // Register user for Zoom meeting
      const [firstName, ...lastNameParts] = (user.name || "Client").split(" ");
      const lastName = lastNameParts.join(" ") || "User";

      let zoomJoinUrl: string | undefined;
      try {
        const registrant = await addZoomRegistrant(
          plan.zoomMeetingId,
          user.email,
          firstName,
          lastName
        );
        zoomJoinUrl = registrant.join_url;
      } catch (e) {
        console.error("Zoom registration failed:", e);
      }

      // Create access code
      await prisma.accessCode.create({
        data: {
          userId,
          paymentId,
          code,
          zoomJoinUrl,
          zoomMeetingId: plan.zoomMeetingId,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}
