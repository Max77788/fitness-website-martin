"use client";

import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-black py-12 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <a href="#" className="flex items-center gap-2 text-white">
              <Dumbbell className="h-6 w-6 text-white" />
              <span className="text-lg font-bold tracking-tight">FitLive</span>
            </a>
            <p className="mt-4 text-sm text-neutral-500">
              Online personal fitness coach. Live sessions on Zoom to reach your
              goals.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-500">
              <li>Email: contact@fitlivecoaching.com</li>
              <li>Phone: +1 (555) 000-0000</li>
              <li>WhatsApp: +1 (555) 000-0000</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Hours</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-500">
              <li>Mon - Fri: 7am - 9pm EST</li>
              <li>Saturday: 9am - 5pm EST</li>
              <li>Sunday: Recorded classes</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} FitLive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
