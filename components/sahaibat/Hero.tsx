import Link from "next/link";
import { site } from "@/lib/sahaibat/content";

export function Hero() {
  return (
    <div className="rounded-3xl border bg-gradient-to-b from-slate-50 to-white p-8 md:p-12">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {site.tagline}
          </h1>
          <p className="mt-4 text-slate-600">{site.subtag}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Book a demo
            </Link>
            <Link
              href="/scenarios"
              className="rounded-xl border px-5 py-3 text-sm font-semibold hover:bg-slate-50"
            >
              Explore scenarios
            </Link>
          </div>

          <div className="mt-6 text-xs text-slate-500">
            SahAIbat provides triage support and care guidance — not diagnosis.
          </div>
        </div>

        {/* “Interactive” placeholder panel (swap later with WhatsApp simulator) */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold">Live demo preview</div>
          <div className="mt-2 text-sm text-slate-600">
            Click a scenario to see what the CHW captures, what the reviewer
            receives, and what the patient sees next.
          </div>
          <div className="mt-6 space-y-3">
            <div className="w-fit rounded-2xl bg-slate-900 px-3 py-2 text-xs text-white">
              “I have fever for 3 days…”
            </div>
            <div className="ml-auto w-fit rounded-2xl border px-3 py-2 text-xs">
              “Reply with your age and symptoms…”
            </div>
            <div className="w-fit rounded-2xl bg-slate-900 px-3 py-2 text-xs text-white">
              “I feel weak and dizzy”
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

