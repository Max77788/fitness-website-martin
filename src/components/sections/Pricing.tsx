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
    name: "Séance Unique",
    description: "Idéal pour découvrir",
    price: 25,
    interval: "séance",
    features: [
      "1 séance de 60 min en direct",
      "Accès Zoom unique",
      "Retour du coach",
      "Validité 7 jours",
    ],
  },
  {
    id: "weekly",
    name: "Pack Hebdo",
    description: "Pour une routine régulière",
    price: 45,
    interval: "semaine",
    features: [
      "2 séances par semaine",
      "Accès Zoom unique",
      "Suivi personnalisé",
      "Chat avec le coach",
      "Validité 7 jours",
    ],
    popular: true,
  },
  {
    id: "monthly",
    name: "Mensuel",
    description: "Le plus complet",
    price: 150,
    interval: "mois",
    features: [
      "Séances illimitées",
      "Accès Zoom unique",
      "Programme personnalisé",
      "Chat prioritaire",
      "Replay 24h",
      "Validité 30 jours",
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
    <section id="pricing" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Nos forfaits
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Choisissez la formule qui correspond à vos objectifs. Tous les
            forfaits incluent un accès Zoom personnel et sécurisé.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative flex flex-col ${
                plan.popular
                  ? "border-emerald-600 ring-1 ring-emerald-600"
                  : "border-neutral-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white">
                    Le plus populaire
                  </span>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <p className="text-sm text-neutral-500">{plan.description}</p>
                <div className="mt-4 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-neutral-900">
                    {plan.price}€
                  </span>
                  <span className="text-sm text-neutral-500">
                    /{plan.interval}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col">
                <ul className="space-y-3 text-sm leading-6 text-neutral-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => setSelectedPlan(plan)}
                  className={`mt-8 w-full ${
                    plan.popular
                      ? "bg-emerald-600 text-white hover:bg-emerald-500"
                      : "bg-neutral-900 text-white hover:bg-neutral-800"
                  }`}
                >
                  Choisir ce forfait
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Réserver : {selectedPlan?.name} ({selectedPlan?.price}€)
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Martin Dupont"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="martin@exemple.fr"
              />
            </div>

            <Button
              onClick={handleCheckout}
              disabled={loading || !email || !name}
              className="w-full bg-emerald-600 text-white hover:bg-emerald-500"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Procéder au paiement
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
