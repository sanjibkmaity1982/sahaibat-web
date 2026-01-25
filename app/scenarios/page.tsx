import { Section } from "@/components/sahaibat/Section";
import { ScenarioCards } from "@/components/sahaibat/ScenarioCards";
import { CTA } from "@/components/sahaibat/CTA";

export default function ScenariosPage() {
  return (
    <div className="space-y-10">
      <Section
        title="Scenarios"
        subtitle="A story-led way to demo SahAIbat. Click a scenario and walk through the CHW capture → reviewer summary → patient guidance."
      >
        <ScenarioCards />
      </Section>

      <CTA
        title="Want a guided demo?"
        subtitle="We can run these scenarios with your team and align the workflow to your referral pathways and SOPs."
      />
    </div>
  );
}

