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
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-white">
          Payment successful!
        </h1>
        <p className="mt-2 text-neutral-400">
          Thank you for your booking. Here is your personal Zoom access.
        </p>
      </div>

      {loading ? (
        <Card className="bg-[#0A0A0A] border-white/10">
          <CardContent className="flex flex-col items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
            <p className="mt-4 text-sm text-neutral-400">
              Generating your secure access...
            </p>
          </CardContent>
        </Card>
      ) : accessCode ? (
        <Card className="bg-[#0A0A0A] border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              Your Zoom access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-black border border-white/10 p-4 space-y-2">
              <p className="text-xs text-neutral-500 uppercase font-semibold">
                Unique access code
              </p>
              <code className="block text-lg font-mono text-white break-all">
                {accessCode.code}
              </code>
            </div>

            {accessCode.zoomJoinUrl && (
              <Button
                asChild
                className="w-full bg-white text-black hover:bg-neutral-200 rounded-full"
              >
                <a
                  href={accessCode.zoomJoinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Join the Zoom session
                </a>
              </Button>
            )}

            <p className="text-xs text-neutral-500 text-center">
              This access is strictly personal. Do not share it.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-[#0A0A0A] border-white/10">
          <CardContent className="py-8 text-center">
            <p className="text-neutral-400">
              Your access will be available shortly. You will also receive a
              confirmation email.
            </p>
            <Button
              asChild
              className="mt-4 bg-white text-black hover:bg-neutral-200 rounded-full"
            >
              <a href="/dashboard">Go to my dashboard</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12">
      <Suspense
        fallback={
          <div className="w-full max-w-md">
            <Card className="bg-[#0A0A0A] border-white/10">
              <CardContent className="flex flex-col items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
                <p className="mt-4 text-sm text-neutral-400">Loading...</p>
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
