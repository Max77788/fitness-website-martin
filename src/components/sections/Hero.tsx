"use client";

import { Button } from "@/components/ui/button";
import { Dumbbell, Users, Video, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 py-24 sm:py-32">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500 via-neutral-950 to-neutral-950" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-emerald-500/10 px-4 py-1.5 ring-1 ring-emerald-500/20">
              <span className="text-sm font-medium text-emerald-400">
                Cours en direct sur Zoom
              </span>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Transformez votre corps avec{" "}
            <span className="text-emerald-500">Martin</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-neutral-300">
            Coach fitness personnel en ligne. Réservez votre séance, payez en
            toute sécurité et recevez immédiatement votre accès Zoom unique.
            Des cours live, des résultats réels.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              asChild
              size="lg"
              className="bg-emerald-600 text-white hover:bg-emerald-500"
            >
              <a href="#pricing">Réserver une séance</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-neutral-700 text-white hover:bg-neutral-800"
            >
              <a href="#how-it-works">Comment ça marche</a>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              icon: Video,
              title: "Cours en direct",
              desc: "Séances live sur Zoom avec interaction en temps réel",
            },
            {
              icon: Shield,
              title: "Accès sécurisé",
              desc: "Code Zoom unique et personnel pour chaque client",
            },
            {
              icon: Users,
              title: "Suivi personnalisé",
              desc: "Conseils et ajustements adaptés à votre niveau",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center"
            >
              <div className="rounded-lg bg-neutral-800 p-3 ring-1 ring-neutral-700">
                <feature.icon className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
