import { Section } from "@/components/sahaibat/Section";

export default function ContactPage() {
  return (
    <div className="space-y-10">
      <Section
        title="Book a demo / Partnership inquiry"
        subtitle="Share a few details and we’ll respond with next steps for a pilot."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border p-6">
            <div className="text-sm font-semibold">What to include</div>
            <ul className="mt-3 grid gap-2 text-sm text-slate-700">
              {[
                "Organization name and region(s)",
                "Program focus (e.g., TB, maternal, child health)",
                "Approx. CHW cohort size",
                "Clinical reviewer availability (nurse/doctor)",
                "Preferred language(s)",
              ].map((x) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border bg-slate-50 p-6">
            <div className="text-sm font-semibold">Email (placeholder)</div>
            <p className="mt-2 text-sm text-slate-600">
              Replace this with your real contact method or embed a form provider.
            </p>
            <div className="mt-4 rounded-2xl border bg-white p-4 text-sm">
              partnerships@sahaibat.com
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Note: SahAIbat provides triage support and care guidance — not diagnosis.
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
