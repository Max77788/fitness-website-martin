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
        const email =
          new URLSearchParams(window.location.search).get("email") || "";

        const res = await fetch(`/api/user/payments?email=${email}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setPayments(data.payments || []);
      } catch (e) {
        setError("Unable to load your bookings.");
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">My dashboard</h1>
          <p className="mt-2 text-neutral-600">
            Manage your bookings and access your Zoom sessions.
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-500/10 p-4 text-red-400">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        {payments.length === 0 ? (
          <Card className="bg-neutral-50 border-neutral-200">
            <CardContent className="py-12 text-center">
              <Video className="mx-auto h-12 w-12 text-neutral-400" />
              <h3 className="mt-4 text-lg font-medium text-neutral-900">
                No bookings yet
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                You haven&apos;t booked a session yet.
              </p>
              <Button
                asChild
                className="mt-6 bg-neutral-900 text-white hover:bg-neutral-800 rounded-full"
              >
                <a href="/#pricing">Book a session</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {payments.map((payment) => (
              <Card
                key={payment.id}
                className="bg-neutral-50 border-neutral-200"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-neutral-900">
                        {payment.plan.name}
                      </CardTitle>
                      <CardDescription className="text-neutral-600 mt-1">
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
                          ? "bg-neutral-900 text-white"
                          : "bg-black/5 text-neutral-700"
                      }
                    >
                      {payment.status === "completed" ? "Paid" : payment.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(payment.createdAt).toLocaleDateString("en-US")}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {(payment.amount / 100).toFixed(2)} {payment.currency.toUpperCase()}
                    </div>
                  </div>

                  {payment.accessCode && (
                    <>
                      <Separator className="bg-neutral-200" />

                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-neutral-900">
                          Your Zoom access
                        </h4>

                        <div className="rounded-lg bg-white border border-neutral-200 p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neutral-500 uppercase font-semibold">
                              Unique access code
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
                              className="text-neutral-600 hover:text-neutral-900"
                            >
                              {copiedId === payment.accessCode.id ? (
                                "Copied!"
                              ) : (
                                <>
                                  <Copy className="mr-1 h-3 w-3" />
                                  Copy
                                </>
                              )}
                            </Button>
                          </div>
                          <code className="block text-sm font-mono text-neutral-900 break-all">
                            {payment.accessCode.code}
                          </code>
                        </div>

                        {payment.accessCode.zoomJoinUrl && (
                          <Button
                            asChild
                            className="w-full bg-neutral-900 text-white hover:bg-neutral-800 rounded-full"
                          >
                            <a
                              href={payment.accessCode.zoomJoinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Join the Zoom session
                            </a>
                          </Button>
                        )}

                        {payment.accessCode.expiresAt && (
                          <p className="text-xs text-neutral-500 text-center">
                            Expires on{" "}
                            {new Date(
                              payment.accessCode.expiresAt
                            ).toLocaleDateString("en-US")}
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
