"use client";

import { AlertTriangle } from "lucide-react";

export default function DemoBanner() {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-black shadow-lg ring-2 ring-amber-300 flex items-center gap-2 animate-pulse">
      <AlertTriangle className="h-4 w-4" />
      Mode démo - configurez les variables d&apos;environnement pour activer les vrais paiements et Zoom
    </div>
  );
}
