import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/sahaibat/SiteHeader";
import { SiteFooter } from "@/components/sahaibat/SiteFooter";

export const metadata: Metadata = {
  title: "SahAIbat",
  description:
    "WhatsApp-first triage and care-guidance platform for CHWs, nurses, doctors, and NGOs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
