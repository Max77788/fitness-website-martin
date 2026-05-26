"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Loader2 } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    window.location.href = `/dashboard?email=${encodeURIComponent(email)}`;
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <a href="/" className="flex items-center gap-2 text-white">
            <Dumbbell className="h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-bold">FitLive</span>
          </a>
        </div>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white text-center">
              Access my account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-neutral-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white hover:bg-emerald-500"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Access
              </Button>
            </form>

            <p className="mt-4 text-xs text-center text-neutral-500">
              No account yet? Book a session on the{" "}
              <a href="/" className="text-emerald-500 hover:underline">
                homepage
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
