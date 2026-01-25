import { Section } from "@/components/sahaibat/Section";
import { CTA } from "@/components/sahaibat/CTA";

export default function HowItWorksPage() {
  return (
    <div className="space-y-10">
      <Section
        title="How it works"
        subtitle="A simple end-to-end flow: CHW capture → clinical review → patient guidance."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card
            title="1) CHW / Kader"
            text="Guided prompts help capture key facts: demographics, vitals, observations, and danger signs — using familiar WhatsApp workflows."
          />
          <Card
            title="2) Nurse / Doctor reviewer"
            text="Receives structured summaries that reduce noise, speed prioritization, and support safer decisions."
          />
          <Card
            title="3) Patient & family"
            text="Receives empathetic, non-diagnostic guidance: what to do now, what to watch for, and clear escalation steps."
          />
        </div>

        <div className="mt-8 rounded-3xl border bg-slate-50 p-6">
          <div className="text-sm font-semibold">What makes it work in the field</div>
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            {[
              "WhatsApp-first delivery for low-friction adoption",
              "Rules-first triage logic to remain auditable and conservative",
              "Structured capture (vitals + danger signs + observations)",
              "NGO-led workflows aligned to local referral pathways",
            ].map((x) => (
              <li key={x} className="rounded-2xl border bg-white p-4 text-sm text-slate-700">
                • {x}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CTA
        title="See it through scenarios"
        subtitle="Pick a real-life case and walk through what the CHW, reviewer, and patient experience."
      />
    </div>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border p-6">
      <div className="text-sm font-semibold">{title}</div>
      <p className="mt-2 text-sm text-slate-600">{text}</p>
    </div>
  );
}

