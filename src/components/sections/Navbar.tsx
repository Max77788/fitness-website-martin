"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dumbbell, Menu } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="flex items-center gap-2 text-neutral-900">
          <Dumbbell className="h-6 w-6 text-neutral-900" />
          <span className="text-lg font-bold tracking-tight">FitLive</span>
        </a>

        <div className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button
            asChild
            size="sm"
            className="bg-neutral-900 text-white hover:bg-neutral-800"
          >
            <a href="#pricing">Book now</a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-neutral-900 hover:bg-black/5">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="border-neutral-200 bg-white">
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                className="bg-neutral-900 text-white hover:bg-neutral-800"
              >
                <a href="#pricing" onClick={() => setOpen(false)}>
                  Book a session
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
