import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_WEBHOOK_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const entry = body.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const message = value?.messages?.[0];

    if (!message) {
      return NextResponse.json({ received: true });
    }

    const phone = message.from;
    const text = message.text?.body || "";

    let lead = await prisma.whatsAppLead.findFirst({
      where: { phone },
    });

    if (!lead) {
      lead = await prisma.whatsAppLead.create({
        data: {
          phone,
          lastMessage: text,
          lastMessageAt: new Date(),
        },
      });
    } else {
      lead = await prisma.whatsAppLead.update({
        where: { id: lead.id },
        data: {
          lastMessage: text,
          lastMessageAt: new Date(),
          status: lead.status === "new" ? "engaged" : lead.status,
        },
      });
    }

    const lowerText = text.toLowerCase();
    let responseText = "";

    if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
      responseText = `Hi! I'm your personal fitness coach. How can I help you today?\n\n1. Class info\n2. Pricing & subscriptions\n3. Book a session\n4. Talk to a coach`;
    } else if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("how much") || lowerText.includes("pricing")) {
      responseText = `Our plans:\n\n🏋️ Single session : $29\n📅 Weekly pack (2 sessions) : $49\n💪 Monthly unlimited : $149\n\nAll classes are live on Zoom with a unique personal access.\n\nTo book : ${process.env.APP_URL || "https://fitlive.vercel.app"}`;
    } else if (lowerText.includes("class") || lowerText.includes("session") || lowerText.includes("type") || lowerText.includes("what")) {
      responseText = `Our live Zoom classes:\n\n💪 Strength & Muscle\n🏃 HIIT & Cardio\n🧘 Yoga & Mobility\n🥊 Boxing Fitness\n\nEach session lasts 45-60 min. You get a personal Zoom link after payment.\n\nTo book : ${process.env.APP_URL || "https://fitlive.vercel.app"}`;
    } else if (lowerText.includes("book") || lowerText.includes("buy") || lowerText.includes("pay") || lowerText.includes("reserve")) {
      responseText = `Great! Book your session here:\n${process.env.APP_URL || "https://fitlive.vercel.app"}\n\nAfter payment, you'll immediately receive your personal Zoom access code.`;
    } else {
      responseText = `Thanks for your message! To book a session or check our pricing, visit our website:\n${process.env.APP_URL || "https://fitlive.vercel.app"}\n\nOtherwise, feel free to email us at contact@fitlivecoaching.com`;
    }

    console.log(`WhatsApp response to ${phone}: ${responseText}`);

    return NextResponse.json({
      received: true,
      response: responseText,
      leadId: lead.id,
    });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
