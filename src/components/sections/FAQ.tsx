"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need any equipment?",
    answer:
      "Not necessarily. Many classes are bodyweight-focused. For strength sessions, a pair of dumbbells is recommended. Your coach will always suggest alternatives if you do not have gear.",
  },
  {
    question: "What if I miss a live session?",
    answer:
      "Monthly subscribers get access to 24-hour replays. Single and weekly plans are live-only to keep the energy high and the class size intimate.",
  },
  {
    question: "Is the Zoom link really unique to me?",
    answer:
      "Yes. After payment, you receive a personalized Zoom registration tied to your email. It cannot be shared or reused by someone else — keeping classes secure and exclusive.",
  },
  {
    question: "Can I cancel or get a refund?",
    answer:
      "Single sessions are non-refundable but can be rescheduled with 24 hours notice. Monthly plans can be cancelled anytime before the next billing cycle.",
  },
  {
    question: "What fitness level do I need?",
    answer:
      "All levels are welcome. Our coaches provide modifications for beginners and advanced options for experienced athletes. Just show up and we will meet you where you are.",
  },
  {
    question: "How do I book my first session?",
    answer:
      "Pick a plan, enter your email and name, and complete payment. You will instantly receive your personal Zoom access code and a link to join. It takes under 2 minutes.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-neutral-50 py-32 sm:py-40">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-500">
            Everything you need to know before booking. Still unsure? Message us
            on WhatsApp and we will reply in minutes.
          </p>
        </div>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-neutral-200 bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-sm font-semibold text-neutral-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-neutral-500 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-6 text-neutral-600">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
