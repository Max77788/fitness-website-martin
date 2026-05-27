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
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
          <CheckCircle className="h-8 w-8 text-neutral-900" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-neutral-900">
          Payment successful!
        </h1>
        <p className="mt-2 text-neutral-600">
          Thank you for your booking. Here is your personal Zoom access.
        </p>
      </div>

      {loading ? (
        <Card className="bg-neutral-50 border-neutral-200">
          <CardContent className="flex flex-col items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-neutral-900" />
            <p className="mt-4 text-sm text-neutral-600">
              Generating your secure access...
            </p>
          </CardContent>
        </Card>
      ) : accessCode ? (
        <Card className="bg-neutral-50 border-neutral-200">
          <CardHeader>
            <CardTitle className="text-neutral-900 text-lg">
              Your Zoom access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-white border border-neutral-200 p-4 space-y-2">
              <p className="text-xs text-neutral-500 uppercase font-semibold">
                Unique access code
              </p>
              <code className="block text-lg font-mono text-neutral-900 break-all">
                {accessCode.code}
              </code>
            </div>

            {accessCode.zoomJoinUrl && (
              <Button
                asChild
                className="w-full bg-neutral-900 text-white hover:bg-neutral-800 rounded-full"
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
        <Card className="bg-neutral-50 border-neutral-200">
          <CardContent className="py-8 text-center">
            <p className="text-neutral-600">
              Your access will be available shortly. You will also receive a
              confirmation email.
            </p>
            <Button
              asChild
              className="mt-4 bg-neutral-900 text-white hover:bg-neutral-800 rounded-full"
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
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <Suspense
        fallback={
          <div className="w-full max-w-md">
            <Card className="bg-neutral-50 border-neutral-200">
              <CardContent className="flex flex-col items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-neutral-900" />
                <p className="mt-4 text-sm text-neutral-600">Loading...</p>
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
