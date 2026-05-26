"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function WhatsAppCTA() {
  return (
    <section className="bg-emerald-600 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Une question ? Discutons sur WhatsApp
          </h2>
          <p className="mt-4 text-lg leading-8 text-emerald-100">
            Notre assistant automatisé répond à vos questions 24/7 et vous
            guide vers la réservation de votre séance.
          </p>
          <div className="mt-8 flex justify-center gap-x-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-emerald-700 hover:bg-emerald-50"
            >
              <a
                href="https://wa.me/33000000000?text=Bonjour%20Martin%2C%20je%20souhaite%20avoir%20des%20infos%20sur%20les%20cours"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Envoyer un message
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
