"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Video,
  Calendar,
  Clock,
  Copy,
  ExternalLink,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface AccessCode {
  id: string;
  code: string;
  zoomJoinUrl: string | null;
  zoomMeetingId: string | null;
  zoomPassword: string | null;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
}

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  plan: {
    name: string;
    description: string | null;
  };
  accessCode: AccessCode | null;
}

export default function DashboardPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // For this MVP, we lookup by email query param
        // In production, this would be protected by NextAuth session
        const email =
          new URLSearchParams(window.location.search).get("email") || "";

        const res = await fetch(`/api/user/payments?email=${email}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setPayments(data.payments || []);
      } catch (e) {
        setError("Impossible de charger vos réservations.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 py-12 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">
            Mon tableau de bord
          </h1>
          <p className="mt-2 text-neutral-400">
            Gérez vos réservations et accédez à vos séances Zoom.
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-500/10 p-4 text-red-400">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        {payments.length === 0 ? (
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="py-12 text-center">
              <Video className="mx-auto h-12 w-12 text-neutral-600" />
              <h3 className="mt-4 text-lg font-medium text-white">
                Aucune réservation
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Vous n&apos;avez pas encore de séance réservée.
              </p>
              <Button
                asChild
                className="mt-6 bg-emerald-600 text-white hover:bg-emerald-500"
              >
                <a href="/#pricing">Réserver une séance</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {payments.map((payment) => (
              <Card
                key={payment.id}
                className="bg-neutral-900 border-neutral-800"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">
                        {payment.plan.name}
                      </CardTitle>
                      <CardDescription className="text-neutral-400 mt-1">
                        {payment.plan.description}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        payment.status === "completed"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        payment.status === "completed"
                          ? "bg-emerald-600 text-white"
                          : "bg-neutral-700 text-neutral-300"
                      }
                    >
                      {payment.status === "completed"
                        ? "Payé"
                        : payment.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-4 text-sm text-neutral-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(payment.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {(payment.amount / 100).toFixed(2)} {payment.currency.toUpperCase()}
                    </div>
                  </div>

                  {payment.accessCode && (
                    <>
                      <Separator className="bg-neutral-800" />

                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white">
                          Votre accès Zoom
                        </h4>

                        <div className="rounded-lg bg-neutral-800 p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neutral-500 uppercase font-semibold">
                              Code d&apos;accès unique
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(
                                  payment.accessCode!.code,
                                  payment.accessCode!.id
                                )
                              }
                              className="text-neutral-400 hover:text-white"
                            >
                              {copiedId === payment.accessCode.id ? (
                                "Copié !"
                              ) : (
                                <>
                                  <Copy className="mr-1 h-3 w-3" />
                                  Copier
                                </>
                              )}
                            </Button>
                          </div>
                          <code className="block text-sm font-mono text-emerald-400 break-all">
                            {payment.accessCode.code}
                          </code>
                        </div>

                        {payment.accessCode.zoomJoinUrl && (
                          <Button
                            asChild
                            className="w-full bg-emerald-600 text-white hover:bg-emerald-500"
                          >
                            <a
                              href={payment.accessCode.zoomJoinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Rejoindre la séance Zoom
                            </a>
                          </Button>
                        )}

                        {payment.accessCode.expiresAt && (
                          <p className="text-xs text-neutral-500 text-center">
                            Expire le{" "}
                            {new Date(
                              payment.accessCode.expiresAt
                            ).toLocaleDateString("fr-FR")}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
