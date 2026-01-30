import "./globals.css";
import { LanguageProvider } from "@/components/sahaibat/LanguageProvider";
import { SiteHeader } from "@/components/sahaibat/SiteHeader";
import { SiteFooter } from "@/components/sahaibat/SiteFooter";

export const metadata = {
  title: "SahAIbat — healthcare closer than ever.",
  description:
    "SahAIbat is built with local communities, guided by global clinical safety principles — helping Kader, nurses, and doctors support families faster.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <LanguageProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-5xl px-4 py-10">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
