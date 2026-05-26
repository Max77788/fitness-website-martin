import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import DemoBanner from "@/components/DemoBanner";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Martin Fitness | Coach Fitness en Ligne",
  description:
    "Réservez vos séances de fitness en direct avec Martin. Cours personnalisés sur Zoom avec accès unique sécurisé.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDemo =
    !process.env.DATABASE_URL ||
    !process.env.STRIPE_SECRET_KEY ||
    !process.env.ZOOM_CLIENT_ID;

  return (
    <html lang="fr" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        {isDemo && <DemoBanner />}
      </body>
    </html>
  );
}
