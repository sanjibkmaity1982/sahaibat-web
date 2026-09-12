// app/(home)/copy.ts
//
// The homepage argument, in one place.
//
// WHY THE COPY LIVES HERE AND NOT IN THE COMPONENT
//
// The previous homepage interleaved English and Bahasa ternaries with layout,
// which is why the two languages drifted apart and why "Free — and built as a
// partner, not a vendor" survived a commercial rewrite that had already landed
// on /investors and /enterprise. Separating the argument from the rendering
// makes a contradiction between sections visible in one file.
//
// ENGLISH IS THE SOURCE OF TRUTH. The primary reader of sahaibat.com is an
// investor or an enterprise buyer. Bahasa is a full peer translation served at
// /id — not a subset — but it is written FROM this file, never in parallel
// with it.
//
// ── ON THE WORD "FREE" ────────────────────────────────────────────────────
// It does not appear on this page, deliberately, and its absence is the point
// of the rewrite.
//
// The health worker never pays — that part is settled and permanent. What was
// wrong was calling the LAYER free, which told an investor there is no
// business underneath it and framed the strongest strategic asset as charity.
//
// Layer 1 is therefore described as institutionally funded: CSR programmes,
// development and health-system grants, and technical-partner agreements. The
// specific mix is still being decided, so the copy names the funding ROUTES
// without committing to a structure or a number. Nothing here has to be
// retracted whichever way that lands.

export type Lang = "en" | "id";

/** Verified facts only. Anything not sourced from the product or the field is absent. */
export const FACTS = {
  liveSince: "Timor Tengah Utara, Nusa Tenggara Timur",
  ancQuality: "8.7 / 10",
  entity: "Viantra Health · 11679210 Canada Inc.",
  nib: "NIB 1202260248509",
  deckUrl: "https://investor.sahaibat.com",
  investorEmail: "investor@sahaibat.com",
  enterpriseEmail: "enterprise@sahaibat.com",
  dokUrl: "https://www.sahaibatdok.com",
} as const;

type Copy = {
  hero: {
    kicker: string; h1a: string; h1b: string; h1c: string; sub: string;
    ctaPrimary: string; ctaSecondary: string; scale: { n: string; l: string }[];
  };
  why: {
    kicker: string; h2: string; lead: string;
    mandates: { tag: string; t: string; gap: string; opening: string }[];
    prize: { n: string; l: string }[]; close: string;
  };
  problem: { kicker: string; h2: string; lead: string; steps: { l: string; d: string; lost: string }[]; close: string };
  platform: {
    kicker: string; h2: string; lead: string;
    nodes: { name: string; layer: string; what: string; who: string; market: string }[];
    close: string; closeSub: string;
  };
  engine: {
    kicker: string; h2: string; lead: string;
    cascadeTitle: string;
    cascade: { tag: string; t: string; d: string }[];
    engines: { t: string; d: string; m: string }[];
    dashTitle: string; dashLead: string;
    dashKpis: { n: string; l: string }[];
    sovTag: string; sovTitle: string; sovBody: string;
    sovChips: { t: string; d: string }[];
    close: string; closeCta: string; closeCta2: string;
  };
  model: { kicker: string; h2: string; lead: string; tiers: { tag: string; t: string; price: string; d: string; note: string }[]; flywheel: string };
  moat: { kicker: string; h2: string; lead: string; pillars: { t: string; d: string }[] };
  brand: { kicker: string; story: string; sub: string };
  dok: { kicker: string; h2: string; lead: string; points: string[]; cta: string; url: string; badge: string };
  traction: {
    kicker: string; h2: string; lead: string;
    tabs: { id: string; label: string; metrics: { n: string; l: string }[]; note: string }[];
    partners: { n: string; d: string }[]; close: string;
  };
  team: { kicker: string; h2: string; lead: string;
    people: { n: string; r: string; d: string; open?: boolean }[] };
  gov: { kicker: string; h2: string; lead: string; items: { t: string; d: string }[] };
  cta: { h2: string; lead: string; primary: string; secondary: string; fine: string };
};

const EN: Copy = {
  hero: {
    kicker: "INDONESIA'S CLINICAL AI INFRASTRUCTURE · LIVE IN NTT",
    h1a: "Indonesia is digitising",
    h1b: "280 million patients.",
    h1c: "Nobody owns the layer underneath.",
    sub:
      "Three government mandates now reach every layer of Indonesian healthcare — community, primary care, hospital. None of them came with a platform. SahAIbat operates across all three as one connected patient record, and trains Indonesia's own clinical language model on the consented data that record produces.",
    ctaPrimary: "Investor brief",
    ctaSecondary: "Enterprise",
    scale: [
      { n: "1.4M", l: "community health workers" },
      { n: "300K", l: "doctors" },
      { n: "280M", l: "patients" },
      { n: "One", l: "connected record" },
    ],
  },

  why: {
    kicker: "THE OPPORTUNITY",
    h2: "The largest single-payer health system on earth is being digitised — all of it, at once.",
    lead:
      "BPJS Kesehatan covers more people than any other health insurer in the world. Indonesia has now ordered every layer beneath it to go digital on parallel timelines: the village health post, the clinic, the hospital. Three mandates, three simultaneous buying events, and no connected platform serving any of them. Windows like this open when a national system re-platforms — roughly once a generation.",
    mandates: [
      {
        tag: "COMMUNITY LAYER",
        t: "ILP · primary-care service integration",
        gap: "Every Posyandu (village health post) and Puskesmas (district health centre) restructured around life-cycle care, with data expected to flow upward. Most of it is still written on paper.",
        opening: "A national screening network with no digital system underneath it.",
      },
      {
        tag: "INTEROPERABILITY LAYER",
        t: "SATUSEHAT · the national exchange",
        gap: "An HL7 FHIR R4 interface every facility is required to send to. Meeting the standard is an engineering programme most clinics — and many hospitals — cannot staff.",
        opening: "Compliance becomes a product, and the integrator holds the pipe.",
      },
      {
        tag: "PAYMENT LAYER",
        t: "BPJS · capitation and casemix",
        gap: "Kapitasi (per-member capitation) at primary care, INA-CBG severity-priced claims at hospitals. Both are decided by coding quality — and coding quality is a documentation problem, not a finance one.",
        opening: "Revenue moves with documentation. Whoever writes the note moves the money.",
      },
    ],
    prize: [
      { n: "270M+", l: "BPJS members — the world's largest single-payer scheme" },
      { n: "3", l: "mandates running in parallel, none of them funded" },
      { n: "0", l: "platforms serving all three today" },
    ],
    close:
      "Every competitor answers one mandate. Satisfying all three means spanning the whole continuum of care — a much harder thing to build, and a far harder thing to displace once it is built.",
  },

  problem: {
    kicker: "THE PROBLEM",
    h2: "A patient in Indonesia is six different records.",
    lead:
      "A child weighed at a village Posyandu, a mother asking about a fever, a diagnosis at a clinic, a claim at a hospital — these are the same person, and almost nothing carries between them. The clinical history that would make each visit better is the exact thing the system throws away.",
    steps: [
      { l: "Posyandu", d: "Village health post — growth and screening, on paper", lost: "Never digitised" },
      { l: "Bidan", d: "Midwife — antenatal visits across a pregnancy", lost: "Stays in the book" },
      { l: "Home", d: "The questions between visits", lost: "Asked to nobody" },
      { l: "Clinic", d: "Diagnosis and prescription", lost: "Starts from blank" },
      { l: "Hospital", d: "Admission and claim", lost: "Comorbidities unknown" },
    ],
    close:
      "Every gap here is a clinical risk and a revenue leak at the same time. Closing them is one product, not five.",
  },

  platform: {
    kicker: "THE PLATFORM",
    h2: "Everyone in Indonesian healthtech builds one layer. The patient moves through all of them.",
    lead:
      "There are competent products at almost every layer of Indonesian healthcare — clinic EMRs, AI scribes, consumer telehealth apps, casemix consultancies. Every one of them is a point solution, and not one of them hands the next layer a record. That is the honest gap, and it is the whole thesis: SahAIbat runs the same system of record from the village health post to the hospital claim, which means each layer arrives at the next already knowing the patient.",
    nodes: [
      {
        name: "Kader", layer: "COMMUNITY",
        what: "Screening, growth tracking and referral at the Posyandu (village health post), aligned to the ILP primary-care standard.",
        who: "Kader · community health workers",
        market: "Paper registers. No commercial vendor finds this layer economic.",
      },
      {
        name: "Bidan", layer: "MATERNAL",
        what: "ANC 10T — the national ten-point antenatal protocol — tracked across a full pregnancy, with danger signs surfaced early.",
        who: "Bidan · midwives",
        market: "Handwritten KIA (maternal & child health) books, kept by the patient.",
      },
      {
        name: "Kasih", layer: "FAMILY",
        what: "A health assistant living in WhatsApp: care plans, medication reminders, and questions answered between visits.",
        who: "Patients and families",
        market: "Consumer telehealth apps, structurally disconnected from the clinic.",
      },
      {
        name: "DoK", layer: "CLINIC",
        what: "Clinical intelligence: reads labs, imaging and ECGs together, writes the note, validates the ICD-10 code against the patient's own results, pre-checks the BPJS claim.",
        who: "Doctors, clinics and Puskesmas",
        market: "Standalone EMRs and AI scribes that trust whatever was dictated.",
      },
      {
        name: "Konsensus", layer: "KNOWLEDGE",
        what: "Indonesian clinical guidance — PERKENI, PAPDI, IDAI — with Fornas (national formulary) coverage checked at the point of prescribing.",
        who: "Every clinical node",
        market: "General-purpose chatbots with no formulary and no citation.",
      },
      { name: "Enterprise", layer: "HOSPITAL", who: "Casemix and coding teams",
        what: "Claim integrity: documented-but-uncoded conditions surfaced before submission to E-Klaim, while the chart is still open — never after a denial.",
        market: "Casemix consultancies and retrospective audits, paid after the money is already lost." },
    ],
    close: "Nobody else is at every layer. That is not a marketing claim — it is a build order.",
    closeSub:
      "A single-layer competitor can add a second layer. What they cannot do is reconstruct the years of longitudinal, consented history that only exists because the platform was already in the field at the layer below.",
  },

  engine: {
    kicker: "THE ENGINE ROOM",
    h2: "The mandate asks for a form. We built the mathematics.",
    lead:
      "Digitising a register satisfies a regulation. It does not tell anyone whether a child is wasting or whether an outbreak has started. Underneath every interface we ship, a real model is running — which is why one measurement that costs a kader thirty seconds can end up as a district's early-warning signal without a single person re-entering it.",

    cascadeTitle: "One measurement. Six levels of meaning.",
    cascade: [
      { tag: "FIELD", t: "Measured",
        d: "A kader weighs and measures a child at the Posyandu. Thirty seconds, on a phone that may have no signal all day." },
      { tag: "ON DEVICE", t: "Scored",
        d: "WHO growth standards run on the handset — weight-for-age, height-for-age, weight-for-height — returned as Z-scores before the family stands up." },
      { tag: "RISK ENGINE", t: "Classified",
        d: "A WAZ of −2.7 is not a number a kader should have to interpret. It comes back as SAM, with the referral already written." },
      { tag: "CLINICAL", t: "Escalated",
        d: "The midwife and the Puskesmas receive the case with the measurements attached — not a phone call describing them from memory." },
      { tag: "B2G", t: "Aggregated",
        d: "The same record updates village prevalence, district SAM rate, immunisation coverage and Posyandu performance ranking. Nobody re-types anything into a monthly report." },
      { tag: "SURVEILLANCE", t: "Watched",
        d: "When communicable disease reports cross mean + 1.5 SD of that district's own history, the epidemic curve raises an SKDR-compatible alert on its own." },
    ],

    engines: [
      { t: "Growth engine", m: "Under 30 seconds per child",
        d: "WHO WAZ, HAZ and WHZ computed offline on the handset — classified, and referred, from the same screen." },
      { t: "Risk engine", m: "Simple inputs → clinical meaning",
        d: "Danger signs, ANC 10T completeness, weight velocity and immunisation gaps come back as graded risk, not raw rows." },
      { t: "Surveillance engine", m: "SKDR-compatible",
        d: "Alert thresholds computed as mean + 1.5 SD of a district's own history — not a national constant that fits nowhere." },
      { t: "Clinical engine", m: "Deterministic, not generative",
        d: "Labs, imaging and ECGs read together; eGFR and FIB-4 computed; the ICD-10 code held against the patient's own results." },
      { t: "Assistant engine", m: "Adaptive, inside WhatsApp",
        d: "The plan, the reminders and the language shift with each household's own history — not one template broadcast to everybody." },
    ],

    dashTitle: "The district sees what the village sees — the same day.",
    dashLead:
      "Posyandu ranking, nutrition status by WAZ band, immunisation coverage, stunting prevalence month by month and a live epidemic curve — generated from records a kader created that morning, with no reporting cycle in between.",
    dashKpis: [
      { n: "WAZ", l: "SAM · MAM · normal · over, banded automatically" },
      { n: "10T", l: "ANC completeness scored per pregnancy" },
      { n: "SKDR", l: "epidemic curve with auto-calculated thresholds" },
      { n: "0", l: "manual re-entry between field and government" },
    ],
    sovTag: "SOVEREIGN MODEL · IN TRAINING",
    sovTitle: "Every layer above is also a training set.",
    sovBody:
      "The same consented records feed Indonesia's own clinical model. We are fine-tuning MedGemma on Indonesian clinical language — how a kader records a danger sign, how a midwife documents ANC 10T, how a doctor writes an assessment in Bahasa Indonesia, how a coder justifies a severity level under BPJS. Extraction runs today on our own GPU in Jakarta; nothing a doctor corrects leaves the country.",
    sovChips: [
      { t: "MedGemma", d: "medical-specialist base, fine-tuned on Indonesian clinical text" },
      { t: "\u{1F1EE}\u{1F1E9} Jakarta GPU", d: "self-hosted inference — the machine is ours, not rented per call" },
      { t: "Consent-bound", d: "corrections become training data only where consent covers it" },
    ],
    close:
      "An app that satisfies a mandate can be rebuilt in a quarter. A risk engine a health ministry trusts, running on records traceable to the kader who took them, cannot — and that is the part this page is too short to do justice to.",
    closeCta: "See the technical brief",
    closeCta2: "Talk to us",
  },

  model: {
    kicker: "THE MODEL",
    h2: "Distribution at the bottom. Revenue in the middle. Compounding at the top.",
    lead:
      "Three layers, three different payers. The community layer is funded by the institutions whose mandate it serves, which buys national reach and a consented longitudinal corpus without a sales force. The clinic layer sells subscriptions. The hospital layer captures a share of recovered claim value. Each one pays for the next.",
    tiers: [
      {
        tag: "LAYER 1 · REACH",
        t: "Community and maternal",
        price: "Institutionally funded",
        d: "The Kader (community health worker) and Bidan (midwife) never pay for the tools, and the layer is not a cost centre. It is funded where the mandate already sits — corporate CSR programmes, development and health-system grants, and technical-partner agreements with the institutions accountable for community health outcomes.",
        note: "Funded by mandate holders · never billed to the health worker",
      },
      {
        tag: "LAYER 2 · RECURRING",
        t: "Clinics and doctors",
        price: "Rp 1.2M–3M / year",
        d: "DoK is sold per doctor and per clinic. Subscription revenue, low support burden, and a buyer who feels the value the same day — documentation time back, cleaner codes, protected kapitasi (capitation).",
        note: "Recurring · self-serve · expands seat by seat",
      },
      {
        tag: "LAYER 3 · MARGIN",
        t: "Hospitals",
        price: "Value-linked",
        d: "Claim integrity for casemix and coding teams: documented-but-uncoded conditions surfaced before submission to E-Klaim, where a single INA-CBG severity level is worth more than an entire clinic contract.",
        note: "Advisory only — E-Klaim retains grouping authority",
      },
    ],
    flywheel:
      "Each layer feeds the next. Community reach produces the corpus, the corpus trains the model, a better model makes the clinic and hospital products harder to leave — and funds deeper distribution underneath.",
  },

  moat: {
    kicker: "THE MOAT",
    h2: "A corpus that cannot be bought.",
    lead:
      "Foreign clinical models are trained on English medical literature and adapted outward. SahAIbat is trained on how Indonesian health workers actually screen, document and decide — in Bahasa Indonesia, under Indonesian regulation, across the whole continuum of care. That data has no marketplace. It is produced, with consent, by a platform that has to already be in the field.",
    pillars: [
      { t: "Distribution", d: "Present at the community layer, where no commercial vendor finds it economic to go." },
      { t: "Data", d: "Longitudinal and consented, spanning Posyandu to hospital claim — a shape no single-layer product can reconstruct." },
      { t: "Regulatory", d: "SATUSEHAT, BPJS and UU PDP built in, on Indonesian soil, with PSE registration already held." },
      { t: "Full-stack", d: "One record across five products. Competitors integrate; we do not have to." },
    ],
  },

  brand: {
    kicker: "THE NAME",
    story:
      "Sahabat is the Indonesian word for companion — the friend who stays. We put AI in the middle of it, because that is where it belongs: inside the relationship, helping the person doing the work. Not in front of them, replacing it.",
    sub:
      "It is also the whole product decision. Every layer we build assists a human who keeps the final say — a kader, a midwife, a doctor, a coder. None of them are being automated away.",
  },

  dok: {
    kicker: "LIVE NOW · SAHAIBAT DOK",
    h2: "The clinic layer is already in doctors' hands.",
    lead:
      "DOK is the commercial engine of the platform and it is shipping today — an Indonesian clinical intelligence that reads the labs, X-rays and ECGs a patient brings, writes the note, checks the ICD-10 code against the patient's own results, and pre-checks the BPJS claim before it is submitted.",
    points: [
      "Reads lab panels, radiology, ECG and ultrasound together",
      "Catalogue-bound ICD-10 — it cannot invent a code",
      "BPJS kapitasi, Fornas and claim pre-flight built in",
      "SATUSEHAT HL7 FHIR R4, submitted automatically",
    ],
    cta: "Visit sahaibatdok.com",
    url: "https://www.sahaibatdok.com",
    badge: "Free for 30 days · no card",
  },

  traction: {
    kicker: "TRACTION",
    h2: "Running in the field. Not projected.",
    lead:
      "The platform is deployed today with real health workers, real clinicians and real partners — which is a different conversation from a roadmap.",
    tabs: [
      { id: "community", label: "Community",
        metrics: [
          { n: "1,500+", l: "children monitored in NTT" },
          { n: "WHO", l: "Z-scores computed on every visit" },
          { n: "SAM / MAM", l: "flagged and referred from the field" },
        ],
        note: "Growth tracked at the Posyandu against WHO standards — weight-for-age, height-for-age and weight-for-height — with malnutrition classified and referred from the same screen the measurement was taken on." },
      { id: "maternal", label: "Maternal",
        metrics: [
          { n: "300+", l: "mothers monitored" },
          { n: FACTS.ancQuality, l: "average ANC quality score" },
          { n: "10T", l: "national protocol tracked per pregnancy" },
        ],
        note: "Every antenatal contact scored against ANC 10T, the national ten-point protocol, so a pregnancy is followed as one continuous record rather than a series of unconnected visits." },
      { id: "clinical", label: "Clinical",
        metrics: [
          { n: "Live", l: "SahAIbat DOK, in production" },
          { n: "5", l: "products across 3 care layers" },
          { n: "0", l: "re-entry between field and government" },
        ],
        note: "The clinic layer is commercially live, SATUSEHAT-connected and BPJS-aware — and every consented record it produces feeds the same corpus the community layer is building." },
    ],
    partners: [
      { n: "Yayasan Pijar Timur", d: "Community deployment partner · Nusa Tenggara Timur" },
      { n: "PAPHA", d: "Public health association" },
      { n: "PERDHAKI", d: "National faith-based hospital and clinic network" },
    ],
    close: "Live in " + FACTS.liveSince + ".",
  },

  team: {
    kicker: "THE TEAM",
    h2: "Built by people who have shipped it.",
    lead:
      "A working platform across five products and three care layers, already in the field — built by a team small enough to still be moving quickly.",
    people: [
      { n: "Sanjib Maity", r: "Founder · CEO & CTO",
        d: "Draws the thing on a whiteboard, then writes the code that makes it true." },
      { n: "Dr. Ratih Rakhmawati, M.Biomed", r: "Clinical validation",
        d: "Decides whether a model's answer would survive a real consultation — and sends it back until it would." },
      { n: "Surabhi Das", r: "Clinical & medical concept",
        d: "Turns a national protocol into something a screen can actually ask, in the order a clinician asks it." },
      { n: "Stefanus Bere", r: "Field & partnerships · NTT",
        d: "The reason a Posyandu in Timor trusts software it never asked for." },
      { n: "Shindy Farah", r: "Operations · Indonesia",
        d: "Holds the gap between a plan written in Jakarta and a health post that has to run it on Friday." },
      { n: "Saurav Das", r: "Infrastructure & DevOps",
        d: "Owns the servers, the GPUs and the 3am pager. Nothing ships until it stays up." },
      { n: "Chief Market Strategist", r: "Open role", open: true,
        d: "Owns how Indonesia hears about all of this." },
      { n: "Business Development", r: "Open role", open: true,
        d: "Turns a working platform into signed clinics." },
      { n: "Inside Sales", r: "Open role", open: true,
        d: "First voice a doctor hears after the free trial starts." },
    ],
  },

  gov: {
    kicker: "GOVERNANCE",
    h2: "Regulated infrastructure, not a pilot.",
    lead:
      "Health data in Indonesia is governed, and the compliance surface is a barrier to entry rather than a formality. Ours is already in place.",
    items: [
      { t: "PSE Kominfo", d: "Registered electronic system operator · " + FACTS.nib },
      { t: "UU PDP", d: "Indonesian data protection law · AES-256-GCM at rest" },
      { t: "Data residency", d: "AWS Jakarta · ap-southeast-3 · records never leave Indonesia" },
      { t: "SATUSEHAT", d: "HL7 FHIR R4 · national exchange connected" },
      { t: "BPJS", d: "PCare (primary care) and E-Klaim (hospital claims) · per-facility credentials" },
      { t: "NVIDIA Inception", d: "Member · inference tooling and GPU programme" },
    ],
  },

  cta: {
    h2: "If you see what we see, we should talk.",
    lead:
      "This page makes the argument. The numbers, the structure and the timeline are in the deck and in the conversation — not published here.",
    primary: "See the deck",
    secondary: "Talk to us",
    fine: FACTS.entity,
  },
};

// Bahasa Indonesia ships in the next pass, written from the English above and
// served at /id. Falling back rather than half-translating keeps the two
// languages from drifting the way they did on the previous homepage.
const ID: Copy = EN;

export const COPY: Record<Lang, Copy> = { en: EN, id: ID };
