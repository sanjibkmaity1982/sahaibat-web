import { Hero } from "@/components/sahaibat/Hero";
import { Section } from "@/components/sahaibat/Section";
import { ProblemList } from "@/components/sahaibat/ProblemList";
import { FeatureGrid } from "@/components/sahaibat/FeatureGrid";
import { ScenarioCards } from "@/components/sahaibat/ScenarioCards";
import { RoleToggle } from "@/components/sahaibat/RoleToggle";
import { TrustAccordion } from "@/components/sahaibat/TrustAccordion";
import { CTA } from "@/components/sahaibat/CTA";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <Hero />

      <Section
        title="The reality on the ground"
        subtitle="SahAIbat is designed for real field conditions — where timing, clarity, and escalation matter."
      >
        <ProblemList />
      </Section>

      <Section title="What SahAIbat does" subtitle="Decision timing, not diagnosis.">
        <FeatureGrid />
      </Section>

      <Section
        title="Explore real-life scenarios"
        subtitle="Pick a scenario to see what the CHW captures, what the reviewer receives, and what the patient sees next."
      >
        <ScenarioCards />
      </Section>

      <Section
        title="Built for every role in the care chain"
        subtitle="Toggle by role to see the value SahAIbat provides."
      >
        <RoleToggle />
      </Section>

      <Section title="Trust & Safety" subtitle="Safety-first design for NGO-led deployments.">
        <TrustAccordion />
      </Section>

      <CTA
        title="Ready to explore a pilot?"
        subtitle="Start small with a cohort, align workflows to local guidelines, train with scenarios, then scale responsibly."
      />
    </div>
  );
}

