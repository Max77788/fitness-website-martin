"use client";

import { Calendar, CreditCard, KeyRound, Dumbbell } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    number: "01",
    title: "Choisissez votre forfait",
    description:
      "Sélectionnez la formule qui vous convient : séance unique, pack hebdomadaire ou abonnement mensuel.",
  },
  {
    icon: CreditCard,
    number: "02",
    title: "Payez en ligne",
    description:
      "Paiement sécurisé par carte bancaire via notre partenaire Stripe. Aucun engagement caché.",
  },
  {
    icon: KeyRound,
    number: "03",
    title: "Recevez votre accès",
    description:
      "Immédiatement après le paiement, recevez votre code d'accès Zoom personnel et unique.",
  },
  {
    icon: Dumbbell,
    number: "04",
    title: "Rejoignez le cours",
    description:
      "Connectez-vous à l'heure du cours avec votre lien personnel. Le coach vous attend !",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-neutral-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Comment ça marche
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Quatre étapes simples pour accéder à vos séances de fitness en
            direct.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="mt-4 text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Étape {step.number}
                </span>
                <h3 className="mt-2 text-base font-semibold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
