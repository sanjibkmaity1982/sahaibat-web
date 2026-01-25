import Link from "next/link";
import { nav } from "@/lib/sahaibat/content";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold">SahAIbat</div>
            <div className="mt-1 text-xs text-slate-500">
              Triage support and care guidance — not diagnosis.
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="text-xs text-slate-600 hover:text-slate-900"
              >
                {i.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} SahAIbat. Built with NGO partners.
        </div>
      </div>
    </footer>
  );
}

