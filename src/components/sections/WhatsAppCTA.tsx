"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function WhatsAppCTA() {
  return (
    <section className="border-t border-white/10 bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Have a question? Let&apos;s chat on WhatsApp
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-500">
            Our automated assistant answers your questions 24/7 and guides you
            to book your session.
          </p>
          <div className="mt-8 flex justify-center gap-x-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-neutral-200 rounded-full px-8"
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
