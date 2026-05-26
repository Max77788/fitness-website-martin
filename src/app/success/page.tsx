"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2, ExternalLink } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [accessCode, setAccessCode] = useState<any>(null);

  useEffect(() => {
    if (!sessionId) return;

    const checkPayment = async () => {
      try {
        const res = await fetch(`/api/checkout/status?session_id=${sessionId}`);
        const data = await res.json();

        if (data.accessCode) {
          setAccessCode(data.accessCode);
          setLoading(false);
        } else {
          setTimeout(checkPayment, 2000);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    checkPayment();
  }, [sessionId]);

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle className="h-8 w-8 text-emerald-500" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-white">
          Paiement réussi !
        </h1>
        <p className="mt-2 text-neutral-400">
          Merci pour votre réservation. Voici votre accès Zoom personnel.
        </p>
      </div>

      {loading ? (
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="flex flex-col items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            <p className="mt-4 text-sm text-neutral-400">
              Génération de votre accès sécurisé...
            </p>
          </CardContent>
        </Card>
      ) : accessCode ? (
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              Votre accès Zoom
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-neutral-800 p-4 space-y-2">
              <p className="text-xs text-neutral-500 uppercase font-semibold">
                Code d&apos;accès unique
              </p>
              <code className="block text-lg font-mono text-emerald-400 break-all">
                {accessCode.code}
              </code>
            </div>

            {accessCode.zoomJoinUrl && (
              <Button
                asChild
                className="w-full bg-emerald-600 text-white hover:bg-emerald-500"
              >
                <a
                  href={accessCode.zoomJoinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Rejoindre la séance Zoom
                </a>
              </Button>
            )}

            <p className="text-xs text-neutral-500 text-center">
              Cet accès est strictement personnel. Ne le partagez pas.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="py-8 text-center">
            <p className="text-neutral-400">
              Votre accès sera disponible sous peu. Vous recevrez également un
              email de confirmation.
            </p>
            <Button
              asChild
              className="mt-4 bg-emerald-600 text-white hover:bg-emerald-500"
            >
              <a href="/dashboard">Voir mon tableau de bord</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6 py-12">
      <Suspense
        fallback={
          <div className="w-full max-w-md">
            <Card className="bg-neutral-900 border-neutral-800">
              <CardContent className="flex flex-col items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                <p className="mt-4 text-sm text-neutral-400">
                  Chargement...
                </p>
              </CardContent>
            </Card>
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
