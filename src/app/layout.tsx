import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import DemoBanner from "@/components/DemoBanner";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLive | Online Personal Fitness Coach",
  description:
    "Book your live online fitness sessions. Personalized Zoom classes with secure unique access.",
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
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        {isDemo && <DemoBanner />}
      </body>
    </html>
  );
}
