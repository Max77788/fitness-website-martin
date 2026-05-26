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
            Have a question? Let&apos;s chat on WhatsApp
          </h2>
          <p className="mt-4 text-lg leading-8 text-emerald-100">
            Our automated assistant answers your questions 24/7 and guides you
            to book your session.
          </p>
          <div className="mt-8 flex justify-center gap-x-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-emerald-700 hover:bg-emerald-50"
            >
              <a
                href="https://wa.me/10000000000?text=Hi%2C%20I'd%20like%20info%20about%20your%20classes"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Send a message
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
