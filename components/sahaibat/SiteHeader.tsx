import Link from "next/link";
import { LanguagePill } from "@/components/sahaibat/LanguagePill";
import { useI18n } from "@/components/sahaibat/LanguageProvider";

export function SiteHeader() {
  const { t } = useI18n();

  const nav = [
    { href: "/", label: t("nav.home") },
    { href: "/how-it-works", label: t("nav.how") },
    { href: "/scenarios", label: t("nav.scenarios") },
    { href: "/for-ngos", label: t("nav.ngos") },
    { href: "/trust-safety", label: t("nav.trust") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-slate-900" />
          <div className="leading-tight">
            <div className="text-sm font-semibold">{t("brand.name")}</div>
            <div className="text-xs text-slate-500">NGO Partner Demo Site</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguagePill />
          <Link
            href="/contact"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {t("cta.bookDemo")}
          </Link>
        </div>
      </div>
    </header>
  );
}
