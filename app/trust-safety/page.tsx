import { Section } from "@/components/sahaibat/Section";
import { TrustAccordion } from "@/components/sahaibat/TrustAccordion";
import { CTA } from "@/components/sahaibat/CTA";

export default function TrustSafetyPage() {
  return (
    <div className="space-y-10">
      <Section
        title="Trust & Safety"
        subtitle="SahAIbat is intentionally not a diagnostic system. It supports triage, risk recognition, and escalation."
      >
        <TrustAccordion />
      </Section>

      <CTA
        title="Safety-first pilots"
        subtitle="We start small, align to local SOPs, and iterate responsibly with clinical oversight."
      />
    </div>
  );
}

