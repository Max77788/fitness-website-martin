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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-transparent backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="flex items-center gap-2 text-white">
          <Dumbbell className="h-6 w-6 text-white" />
          <span className="text-lg font-bold tracking-tight">FitLive</span>
        </a>

        <div className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button
            asChild
            size="sm"
            className="bg-white text-black hover:bg-neutral-200"
          >
            <a href="#pricing">Book now</a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/5">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="border-white/10 bg-black">
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-neutral-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                className="bg-white text-black hover:bg-neutral-200"
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
