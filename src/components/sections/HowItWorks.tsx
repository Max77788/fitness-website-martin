"use client";

import { Calendar, CreditCard, KeyRound, Dumbbell } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    number: "01",
    title: "Choose your plan",
    description:
      "Select the plan that fits you best: single session, weekly pack, or monthly subscription.",
  },
  {
    icon: CreditCard,
    number: "02",
    title: "Pay online",
    description:
      "Secure card payment through our partner Stripe. No hidden commitments.",
  },
  {
    icon: KeyRound,
    number: "03",
    title: "Get your access",
    description:
      "Immediately after payment, receive your personal and unique Zoom access code.",
  },
  {
    icon: Dumbbell,
    number: "04",
    title: "Join the class",
    description:
      "Log in at class time with your personal link. The coach is waiting for you!",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-black py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            How it works
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-500">
            Four simple steps to access your live fitness sessions.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black">
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="mt-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Step {step.number}
                </span>
                <h3 className="mt-2 text-base font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-500">
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
