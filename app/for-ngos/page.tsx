import { Section } from "@/components/sahaibat/Section";
import { CTA } from "@/components/sahaibat/CTA";

export default function ForNGOsPage() {
  return (
    <div className="space-y-10">
      <Section
        title="For NGOs"
        subtitle="SahAIbat is built with NGOs — pilot-first, safety-first, and adaptable to local guidelines."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card
            title="Partnership model"
            bullets={[
              "Pilot with a small cohort (10–30 CHWs)",
              "Align workflows to local guidelines and referral pathways",
              "Train using scenario-based SOPs",
              "Iterate with field feedback",
              "Scale responsibly",
            ]}
          />
          <Card
            title="What you need to start"
            bullets={[
              "A CHW cohort + a clinical reviewer (nurse/doctor) point of contact",
              "Basic referral pathway mapping (where to send urgent cases)",
              "Language + terminology preferences",
              "Agreement on what the tool supports (triage + guidance, not diagnosis)",
            ]}
          />
        </div>

        <div className="mt-8 rounded-3xl border bg-slate-50 p-6">
          <div className="text-sm font-semibold">TB-focused programs</div>
          <p className="mt-2 text-sm text-slate-600">
            For programs focused on TB prevention and follow-up, SahAIbat can support structured
            screening signals (e.g., cough duration, weight loss, night sweats) and guide referral
            to program-approved testing pathways — without diagnosing.
          </p>
        </div>
      </Section>

      <CTA
        title="Let’s discuss a pilot"
        subtitle="Tell us your program goals, geography, and CHW workflow — we’ll tailor scenarios and onboarding materials."
      />
    </div>
  );
}

function Card({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="rounded-2xl border p-6">
      <div className="text-sm font-semibold">{title}</div>
      <ul className="mt-3 grid gap-2">
        {bullets.map((b) => (
          <li key={b} className="text-sm text-slate-700">
            • {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
