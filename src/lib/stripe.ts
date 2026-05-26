import Stripe from "stripe";

export const isStripeConfigured = !!process.env.STRIPE_SECRET_KEY;

export const stripe = isStripeConfigured
  ? new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-04-22.dahlia",
    })
  : ({
      checkout: {
        sessions: {
          create: async () => ({
            url: `${process.env.APP_URL || "http://localhost:3000"}/success?demo=true`,
            id: `demo_${Date.now()}`,
          }),
        },
      },
      webhooks: {
        constructEvent: () => {
          throw new Error("Stripe not configured");
        },
      },
    } as any);
