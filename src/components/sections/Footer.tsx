"use client";

import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-neutral-950 py-12 border-t border-neutral-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <a href="#" className="flex items-center gap-2 text-white">
              <Dumbbell className="h-6 w-6 text-emerald-500" />
              <span className="text-lg font-bold">Martin Fitness</span>
            </a>
            <p className="mt-4 text-sm text-neutral-400">
              Coach fitness personnel en ligne. Des séances en direct sur Zoom
              pour atteindre vos objectifs.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-400">
              <li>Email : contact@martinfitness.fr</li>
              <li>Tél : +33 6 00 00 00 00</li>
              <li>WhatsApp : +33 6 00 00 00 00</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Horaires</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-400">
              <li>Lundi - Vendredi : 7h - 21h</li>
              <li>Samedi : 9h - 17h</li>
              <li>Dimanche : Cours enregistrés</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-8 text-center">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Martin Fitness. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
