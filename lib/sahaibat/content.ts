import type { RoleKey, Scenario } from "./types";

export const site = {
  name: "SahAIbat",
  tagline: "Triage support that works where care is hardest",
  subtag:
    "A WhatsApp-first triage and care-guidance platform that helps community health workers and clinical reviewers act faster, safer, and more consistently — especially in low-resource settings.",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/scenarios", label: "Scenarios" },
  { href: "/for-ngos", label: "For NGOs" },
  { href: "/trust-safety", label: "Trust & Safety" },
  { href: "/contact", label: "Contact" },
];

export const problems = [
  "Community health workers are often the first — and sometimes only — point of care.",
  "Paper notes and inconsistent questioning increase risk and delay escalation.",
  "Nurses and doctors receive fragmented or late information.",
  "Patients are unsure what to do next — or when to seek urgent care.",
];

export const features = [
  {
    title: "Guide safer first decisions",
    text: "Structured prompts help frontline workers check danger signs, not just symptoms.",
  },
  {
    title: "Clinical-ready summaries",
    text: "Vitals, observations, and risk flags captured in a format nurses and doctors can review quickly.",
  },
  {
    title: "Close the loop with patient guidance",
    text: "Empathetic, non-diagnostic guidance: what to do now, what to watch for, and when to seek help.",
  },
];

export const roleValue: Record<RoleKey, { title: string; bullets: string[] }> = {
  chw: {
    title: "Community Health Workers (CHW / Kader)",
    bullets: [
      "Familiar WhatsApp workflow; less cognitive load in the field",
      "Clear danger-sign prompts to reduce missed escalation",
      "Structured capture of vitals, observations, and risk flags",
      "Confidence to escalate earlier when needed",
    ],
  },
  reviewer: {
    title: "Nurses & Doctors (Clinical Reviewers)",
    bullets: [
      "Cleaner signal, less chat noise",
      "Faster prioritization with structured context",
      "Better handoffs: vitals + observations + risk flags in one place",
      "Supports continuity (follow-up guidance and escalation notes)",
    ],
  },
  ngo: {
    title: "NGOs & Health Programs",
    bullets: [
      "Standardized workflows and training playbooks",
      "Pilot-first rollout: small cohort → feedback → scale",
      "Adaptable to language, guidelines, and referral pathways",
      "Designed for low-resource settings and operational realities",
    ],
  },
};

export const scenarios: Scenario[] = [
  {
    id: "child-fever",
    title: "Child with fever",
    subtitle: "Dehydration + danger signs → earlier escalation",
    chw: [
      "Capture age, fever duration, intake, urine, breathing, alertness",
      "Check dehydration and danger signs (not only temperature)",
      "Record observations (feeding, lethargy, breathing effort)",
    ],
    reviewer: [
      "Receives structured summary with red flags and timeline",
      "Can prioritize urgent review if danger signs are present",
    ],
    patient: [
      "Receives simple guidance: hydration, monitoring, and urgent warning signs",
      "Clear next steps and when to seek immediate care",
    ],
  },
  {
    id: "maternal-warning",
    title: "Maternal warning signs",
    subtitle: "Pregnancy/post-partum red flags recognized faster",
    chw: [
      "Guided checks for critical maternal danger signs",
      "Capture bleeding, severe headache, swelling, fever, shortness of breath",
    ],
    reviewer: [
      "Sees risk-level banner + structured maternal danger sign summary",
      "Clear escalation context for urgency and referral",
    ],
    patient: [
      "Non-diagnostic guidance with urgent referral instructions when needed",
      "Supportive language, clear safety steps",
    ],
  },
  {
    id: "dengue",
    title: "Dengue risk",
    subtitle: "Differentiate warning signs from mild fever",
    chw: [
      "Check warning signs (bleeding, severe abdominal pain, persistent vomiting)",
      "Capture fever days and hydration status",
    ],
    reviewer: [
      "Receives dengue warning/severe signal summary",
      "Prioritizes escalation when warning signs appear",
    ],
    patient: [
      "Guidance: hydration, monitoring, and urgent warning signs",
      "Clear “go now” instructions for high risk",
    ],
  },
  {
    id: "tb-screening",
    title: "Chronic cough / TB screening support",
    subtitle: "Screening signals → referral pathways (not diagnosis)",
    chw: [
      "Capture cough duration (≥2 weeks), weight loss, night sweats, fever",
      "Check exposure/contact history when appropriate",
      "Encourage referral to testing pathways per program protocol",
    ],
    reviewer: [
      "Gets a structured screening summary and program-aligned referral suggestion",
      "Escalation note when danger signs appear",
    ],
    patient: [
      "Respectful, non-judgmental guidance about next steps and testing",
      "Clear safety advice if severe symptoms occur",
    ],
  },
];

export const trust = [
  {
    q: "Is SahAIbat a diagnostic tool?",
    a: "No. SahAIbat provides triage support and care guidance. It is designed to help frontline workers recognize danger signs, document structured information, and escalate appropriately.",
  },
  {
    q: "Does SahAIbat prescribe medications?",
    a: "No. SahAIbat does not prescribe. Guidance is non-diagnostic and focuses on safe, general next steps and escalation when risk is high.",
  },
  {
    q: "How do you prevent unsafe outputs?",
    a: "We prioritize rules-first triage logic and guardrails that emphasize escalation for high risk. Outputs are designed to be conservative and safety-oriented.",
  },
  {
    q: "How do NGO partnerships work?",
    a: "We start with a pilot cohort, align workflows to local guidelines and referral pathways, train with scenario-based SOPs, iterate with field feedback, then scale responsibly.",
  },
];

