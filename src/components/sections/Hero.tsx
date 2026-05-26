"use client";

import { Button } from "@/components/ui/button";
import { Users, Video, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black py-32 sm:py-40 lg:py-48">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Subtle radial gradient accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-10 flex justify-center">
            <div className="rounded-full bg-white/10 px-4 py-1.5 ring-1 ring-white/20">
              <span className="text-sm font-medium text-white">
                Live classes on Zoom
              </span>
            </div>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            Transform your body with live coaching
          </h1>

          <p className="mt-8 text-lg leading-8 text-neutral-300 sm:text-xl">
            Online personal fitness coach. Book your session, pay securely and
            receive your unique Zoom access instantly. Live classes, real
            results.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-neutral-200 rounded-full px-8"
            >
              <a href="#pricing">Book a session</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-full px-8"
            >
              <a href="#how-it-works">How it works</a>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              icon: Video,
              title: "Live classes",
              desc: "Live sessions on Zoom with real-time interaction",
            },
            {
              icon: Shield,
              title: "Secure access",
              desc: "Unique personal Zoom code for each client",
            },
            {
              icon: Users,
              title: "Personalized follow-up",
              desc: "Advice and adjustments tailored to your level",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center"
            >
              <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">
                <feature.icon className="h-6 w-6 text-white" />
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
