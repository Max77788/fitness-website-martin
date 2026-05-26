import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// WhatsApp Business API webhook verification
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

// Handle incoming WhatsApp messages
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

    // Find or create lead
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

    // Simple automation responses
    const lowerText = text.toLowerCase();
    let responseText = "";

    if (lowerText.includes("bonjour") || lowerText.includes("salut") || lowerText.includes("hello") || lowerText.includes("hi")) {
      responseText = `Bonjour ! Je suis Martin, votre coach fitness personnel. Comment puis-je vous aider aujourd'hui ?\n\n1. Informations sur les cours\n2. Tarifs et abonnements\n3. Réserver une séance\n4. Parler à un coach`;
    } else if (lowerText.includes("prix") || lowerText.includes("tarif") || lowerText.includes("coût") || lowerText.includes("combien")) {
      responseText = `Nos forfaits :\n\n🏋️ Séance unique : 25€\n📅 Pack hebdomadaire (2 séances) : 45€\n💪 Abonnement mensuel illimité : 150€\n\nTous nos cours sont en direct sur Zoom avec un accès personnel unique.\n\nPour réserver : ${process.env.APP_URL || "https://martin-fitness.vercel.app"}`;
    } else if (lowerText.includes("cours") || lowerText.includes("séance") || lowerText.includes("type") || lowerText.includes("quoi")) {
      responseText = `Nos cours en direct sur Zoom :\n\n💪 Musculation & Force\n🏃 HIIT & Cardio\n🧘 Yoga & Mobilité\n🥊 Boxe Fitness\n\nChaque séance dure 45-60 min. Vous recevez un lien Zoom personnel après paiement.\n\nPour réserver : ${process.env.APP_URL || "https://martin-fitness.vercel.app"}`;
    } else if (lowerText.includes("réserver") || lowerText.includes("book") || lowerText.includes("acheter") || lowerText.includes("payer")) {
      responseText = `Parfait ! Réservez votre séance ici :\n${process.env.APP_URL || "https://martin-fitness.vercel.app"}\n\nAprès le paiement, vous recevrez immédiatement votre code d'accès Zoom personnel.`;
    } else {
      responseText = `Merci pour votre message ! Pour réserver une séance ou consulter nos tarifs, visitez notre site :\n${process.env.APP_URL || "https://martin-fitness.vercel.app"}\n\nSinon, je vous invite à nous contacter par email : contact@martinfitness.fr`;
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
