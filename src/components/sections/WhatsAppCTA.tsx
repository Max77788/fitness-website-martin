"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function WhatsAppCTA() {
  return (
    <section className="border-t border-neutral-200 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/5">
            <MessageCircle className="h-6 w-6 text-neutral-900" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
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
              className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-full px-8"
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
