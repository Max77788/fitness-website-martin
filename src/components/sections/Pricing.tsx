"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: string;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: "single",
    name: "Single Session",
    description: "Perfect to get started",
    price: 29,
    interval: "session",
    features: [
      "1 live 60-min session",
      "Unique Zoom access",
      "Coach feedback",
      "Valid for 7 days",
    ],
  },
  {
    id: "weekly",
    name: "Weekly Pack",
    description: "For a regular routine",
    price: 49,
    interval: "week",
    features: [
      "2 sessions per week",
      "Unique Zoom access",
      "Personalized follow-up",
      "Chat with the coach",
      "Valid for 7 days",
    ],
    popular: true,
  },
  {
    id: "monthly",
    name: "Monthly",
    description: "The most complete",
    price: 149,
    interval: "month",
    features: [
      "Unlimited sessions",
      "Unique Zoom access",
      "Personalized program",
      "Priority chat",
      "24h replay",
      "Valid for 30 days",
    ],
  },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!selectedPlan || !email || !name) return;

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          planId: selectedPlan.id,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pricing" className="bg-black py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Our plans
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-500">
            Choose the plan that matches your goals. All plans include a
            personal and secure Zoom access.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative flex flex-col border-white/10 bg-[#0A0A0A] ${
                plan.popular
                  ? "ring-1 ring-white/20 overflow-visible"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-black">
                    Most popular
                  </span>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                <p className="text-sm text-neutral-500">{plan.description}</p>
                <div className="mt-4 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">
                    ${plan.price}
                  </span>
                  <span className="text-sm text-neutral-500">
                    /{plan.interval}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col">
                <ul className="space-y-3 text-sm leading-6 text-neutral-400">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-white" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => setSelectedPlan(plan)}
                  className={`mt-8 w-full rounded-full ${
                    plan.popular
                      ? "bg-white text-black hover:bg-neutral-200"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Choose this plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="sm:max-w-md border-white/10 bg-[#0A0A0A]">
          <DialogHeader>
            <DialogTitle className="text-white">
              Book: {selectedPlan?.name} (${selectedPlan?.price})
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-neutral-300">Full name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                className="border-white/10 bg-black text-white placeholder:text-neutral-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="border-white/10 bg-black text-white placeholder:text-neutral-600"
              />
            </div>

            <Button
              onClick={handleCheckout}
              disabled={loading || !email || !name}
              className="w-full bg-white text-black hover:bg-neutral-200 rounded-full"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Proceed to payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
