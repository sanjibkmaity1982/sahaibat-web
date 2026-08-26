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
  // Deck is requested, never linked — see app/investors/page.tsx
  deckPath: "/investors#deck",
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
      { t: "🇮🇩 Jakarta GPU", d: "self-hosted inference — the machine is ours, not rented per call" },
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
        d: "Holds the gap between a plan written in Jakarta and a health post that has to run it on a Friday." },
      { n: "Saurav Das", r: "Infrastructure & DevOps",
        d: "Owns the servers, the GPUs and the 3am pager. Nothing ships until it stays up." },
      { n: "Chief Market Strategist", r: "Open role", open: true,
        d: "Owns how Indonesia hears about all of this." },
      { n: "Business Development", r: "Open role", open: true,
        d: "Turns a working platform into signed clinics." },
      { n: "Inside Sales", r: "Open role", open: true,
        d: "First voice a doctor hears after a trial begins." },
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
      { t: "🇮🇩 Data residency", d: "AWS Jakarta · ap-southeast-3 · records never leave Indonesia" },
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

// Bahasa Indonesia — ditulis ulang, bukan diterjemahkan.
//
// Beberapa keputusan yang disengaja:
//  · Register formal ("Anda"), nada korporat, tanpa bahasa gaul.
//  · Istilah yang memang dipakai klinisi Indonesia dipertahankan apa adanya:
//    BPJS, SATUSEHAT, Posyandu, Puskesmas, kader, bidan, ANC 10T, ILP,
//    kapitasi, INA-CBG, E-Klaim, Fornas, ICD-10.
//  · Angka mengikuti kaidah Indonesia: 1.500 untuk seribu lima ratus,
//    8,7 untuk delapan koma tujuh. CountUp membaca lokal, jadi keduanya aman.
//  · Bagian "THE NAME" justru lebih kuat di sini: "sahabat" adalah kata
//    Indonesia, jadi permainan katanya tidak perlu dijelaskan.
const ID: Copy = {
  hero: {
    kicker: "INFRASTRUKTUR AI KLINIS INDONESIA · AKTIF DI NTT",
    h1a: "Indonesia sedang mendigitalkan",
    h1b: "280 juta pasien.",
    h1c: "Belum ada yang memiliki lapisan di bawahnya.",
    sub:
      "Tiga mandat pemerintah kini menjangkau setiap lapisan layanan kesehatan Indonesia — komunitas, layanan primer, dan rumah sakit. Tidak satu pun disertai platform pendukung. SahAIbat beroperasi di ketiganya sebagai satu rekam pasien yang terhubung, dan melatih model bahasa klinis milik Indonesia sendiri dari data berpersetujuan yang dihasilkan rekam tersebut.",
    ctaPrimary: "Ringkasan investor",
    ctaSecondary: "Enterprise",
    scale: [
      { n: "1,4 jt", l: "kader kesehatan" },
      { n: "300 rb", l: "dokter" },
      { n: "280 jt", l: "pasien" },
      { n: "Satu", l: "rekam terhubung" },
    ],
  },

  why: {
    kicker: "PELUANGNYA",
    h2: "Sistem kesehatan pembayar tunggal terbesar di dunia sedang didigitalkan — seluruhnya, sekaligus.",
    lead:
      "BPJS Kesehatan menanggung lebih banyak jiwa daripada penjamin kesehatan mana pun di dunia. Indonesia kini mewajibkan setiap lapisan di bawahnya beralih ke digital dalam linimasa yang berjalan bersamaan: pos kesehatan desa, klinik, dan rumah sakit. Tiga mandat, tiga momentum pengadaan sekaligus, dan belum ada satu pun platform terhubung yang melayaninya. Peluang seperti ini terbuka ketika sebuah sistem nasional mengganti fondasinya — kira-kira sekali dalam satu generasi.",
    mandates: [
      {
        tag: "LAPISAN KOMUNITAS",
        t: "ILP · Integrasi Layanan Primer",
        gap: "Setiap Posyandu dan Puskesmas ditata ulang mengikuti siklus hidup, dengan data yang diharapkan mengalir ke atas. Sebagian besar masih ditulis di atas kertas.",
        opening: "Jaringan skrining nasional tanpa sistem digital di bawahnya.",
      },
      {
        tag: "LAPISAN INTEROPERABILITAS",
        t: "SATUSEHAT · pertukaran data nasional",
        gap: "Antarmuka HL7 FHIR R4 yang wajib dipenuhi setiap fasilitas. Memenuhinya adalah pekerjaan rekayasa yang tidak sanggup ditangani sebagian besar klinik — dan banyak rumah sakit.",
        opening: "Kepatuhan berubah menjadi produk, dan integratornya memegang salurannya.",
      },
      {
        tag: "LAPISAN PEMBAYARAN",
        t: "BPJS · kapitasi dan casemix",
        gap: "Kapitasi di layanan primer, klaim INA-CBG berbasis tingkat keparahan di rumah sakit. Keduanya ditentukan oleh kualitas coding — dan kualitas coding adalah persoalan dokumentasi, bukan keuangan.",
        opening: "Pendapatan bergerak mengikuti dokumentasi. Siapa yang menulis catatan, dialah yang menggerakkan uangnya.",
      },
    ],
    prize: [
      { n: "270 jt+", l: "peserta BPJS — skema pembayar tunggal terbesar di dunia" },
      { n: "3", l: "mandat berjalan bersamaan, tak satu pun didanai" },
      { n: "0", l: "platform yang melayani ketiganya hari ini" },
    ],
    close:
      "Setiap pesaing menjawab satu mandat. Memenuhi ketiganya berarti membentang di sepanjang rangkaian layanan — jauh lebih sulit dibangun, dan jauh lebih sulit digeser setelah berdiri.",
  },

  problem: {
    kicker: "MASALAHNYA",
    h2: "Satu pasien di Indonesia adalah enam rekam yang berbeda.",
    lead:
      "Anak yang ditimbang di Posyandu, ibu yang bertanya soal demam, diagnosis di klinik, klaim di rumah sakit — semuanya orang yang sama, dan nyaris tidak ada yang terbawa dari satu tempat ke tempat berikutnya. Riwayat klinis yang justru akan membuat setiap kunjungan lebih baik adalah hal yang dibuang oleh sistem ini.",
    steps: [
      { l: "Posyandu", d: "Pos kesehatan desa — tumbuh kembang dan skrining, di atas kertas", lost: "Tidak pernah didigitalkan" },
      { l: "Bidan", d: "Kunjungan antenatal sepanjang kehamilan", lost: "Berhenti di buku KIA" },
      { l: "Rumah", d: "Pertanyaan yang muncul di antara kunjungan", lost: "Tidak ditanyakan ke siapa pun" },
      { l: "Klinik", d: "Diagnosis dan resep", lost: "Dimulai dari halaman kosong" },
      { l: "Rumah sakit", d: "Rawat inap dan klaim", lost: "Komorbiditas tidak diketahui" },
    ],
    close:
      "Setiap celah di sini sekaligus merupakan risiko klinis dan kebocoran pendapatan. Menutupnya adalah satu produk, bukan lima.",
  },

  platform: {
    kicker: "PLATFORMNYA",
    h2: "Semua pemain healthtech Indonesia membangun satu lapisan. Pasien melewati semuanya.",
    lead:
      "Ada produk yang mumpuni di hampir setiap lapisan layanan kesehatan Indonesia — EMR klinik, AI scribe, aplikasi telehealth konsumen, konsultan casemix. Semuanya solusi satu titik, dan tidak satu pun menyerahkan rekam kepada lapisan berikutnya. Itulah celah yang sesungguhnya, dan itulah seluruh tesis kami: SahAIbat menjalankan sistem rekam yang sama dari pos kesehatan desa hingga klaim rumah sakit, sehingga setiap lapisan tiba di lapisan berikutnya dengan sudah mengenal pasiennya.",
    nodes: [
      {
        name: "Kader", layer: "KOMUNITAS",
        what: "Skrining, pemantauan tumbuh kembang, dan rujukan di Posyandu, selaras dengan standar layanan primer ILP.",
        who: "Kader · kader kesehatan masyarakat",
        market: "Register kertas. Tidak ada vendor komersial yang menganggap lapisan ini layak secara ekonomi.",
      },
      {
        name: "Bidan", layer: "MATERNAL",
        what: "ANC 10T — protokol antenatal sepuluh poin nasional — dipantau sepanjang satu kehamilan penuh, dengan tanda bahaya yang muncul lebih awal.",
        who: "Bidan · tenaga kebidanan",
        market: "Buku KIA tulis tangan, yang disimpan sendiri oleh pasien.",
      },
      {
        name: "Kasih", layer: "KELUARGA",
        what: "Asisten kesehatan yang tinggal di WhatsApp: rencana perawatan, pengingat obat, dan jawaban atas pertanyaan di antara kunjungan.",
        who: "Pasien dan keluarga",
        market: "Aplikasi telehealth konsumen yang secara struktural terputus dari klinik.",
      },
      {
        name: "DoK", layer: "KLINIK",
        what: "Kecerdasan klinis: membaca lab, pencitraan, dan EKG secara bersamaan, menulis catatan, memvalidasi kode ICD-10 terhadap hasil pasien sendiri, dan memeriksa klaim BPJS sebelum diajukan.",
        who: "Dokter, klinik, dan Puskesmas",
        market: "EMR dan AI scribe berdiri sendiri yang memercayai begitu saja apa pun yang didiktekan.",
      },
      {
        name: "Konsensus", layer: "PENGETAHUAN",
        what: "Panduan klinis Indonesia — PERKENI, PAPDI, IDAI — dengan cakupan Fornas yang diperiksa tepat saat resep ditulis.",
        who: "Setiap titik klinis",
        market: "Chatbot serbaguna tanpa formularium dan tanpa rujukan sumber.",
      },
      {
        name: "Enterprise", layer: "RUMAH SAKIT",
        who: "Tim casemix dan koder",
        what: "Integritas klaim: kondisi yang terdokumentasi namun belum dikode ditampilkan sebelum pengajuan ke E-Klaim, selagi rekam medis masih terbuka — bukan setelah klaim ditolak.",
        market: "Konsultan casemix dan audit retrospektif, dibayar setelah uangnya terlanjur hilang.",
      },
    ],
    close: "Tidak ada pihak lain yang hadir di setiap lapisan. Itu bukan klaim pemasaran — itu urutan pembangunan.",
    closeSub:
      "Pesaing satu lapisan bisa saja menambah lapisan kedua. Yang tidak bisa mereka lakukan adalah menyusun ulang riwayat longitudinal berpersetujuan bertahun-tahun, yang hanya ada karena platformnya sudah lebih dulu berada di lapangan pada lapisan di bawahnya.",
  },

  engine: {
    kicker: "RUANG MESIN",
    h2: "Mandatnya meminta sebuah formulir. Kami membangun matematikanya.",
    lead:
      "Mendigitalkan register memenuhi sebuah peraturan. Ia tidak memberi tahu siapa pun apakah seorang anak sedang kurang gizi atau apakah sebuah wabah sudah dimulai. Di balik setiap antarmuka yang kami rilis, ada model yang benar-benar berjalan — itulah sebabnya satu pengukuran yang menghabiskan tiga puluh detik seorang kader bisa berakhir sebagai sinyal peringatan dini sebuah kabupaten, tanpa seorang pun mengetiknya ulang.",

    cascadeTitle: "Satu pengukuran. Enam tingkat makna.",
    cascade: [
      { tag: "LAPANGAN", t: "Diukur",
        d: "Kader menimbang dan mengukur seorang anak di Posyandu. Tiga puluh detik, di ponsel yang mungkin tidak dapat sinyal seharian." },
      { tag: "DI PERANGKAT", t: "Diskor",
        d: "Standar pertumbuhan WHO dihitung langsung di ponsel — berat menurut umur, tinggi menurut umur, berat menurut tinggi — dan kembali sebagai Z-score sebelum keluarganya beranjak." },
      { tag: "MESIN RISIKO", t: "Diklasifikasi",
        d: "WAZ −2,7 bukan angka yang seharusnya ditafsirkan sendiri oleh kader. Ia kembali sebagai SAM, lengkap dengan rujukan yang sudah tertulis." },
      { tag: "KLINIS", t: "Dieskalasi",
        d: "Bidan dan Puskesmas menerima kasusnya beserta hasil pengukurannya — bukan telepon yang menceritakannya dari ingatan." },
      { tag: "B2G", t: "Diagregasi",
        d: "Rekam yang sama memperbarui prevalensi desa, angka SAM kabupaten, cakupan imunisasi, dan peringkat kinerja Posyandu. Tidak ada yang mengetik ulang apa pun ke laporan bulanan." },
      { tag: "SURVEILANS", t: "Dipantau",
        d: "Ketika laporan penyakit menular melewati rata-rata + 1,5 SD dari riwayat kabupaten itu sendiri, kurva epidemi memunculkan peringatan kompatibel SKDR dengan sendirinya." },
    ],

    engines: [
      { t: "Mesin pertumbuhan", m: "Di bawah 30 detik per anak",
        d: "WAZ, HAZ, dan WHZ WHO dihitung luring di ponsel — diklasifikasi, dan dirujuk, dari layar yang sama." },
      { t: "Mesin risiko", m: "Data sederhana → makna klinis",
        d: "Tanda bahaya, kelengkapan ANC 10T, laju pertambahan berat, dan celah imunisasi kembali sebagai risiko berjenjang, bukan baris data mentah." },
      { t: "Mesin surveilans", m: "Kompatibel SKDR",
        d: "Ambang peringatan dihitung sebagai rata-rata + 1,5 SD dari riwayat kabupaten itu sendiri — bukan konstanta nasional yang tidak cocok di mana pun." },
      { t: "Mesin klinis", m: "Deterministik, bukan generatif",
        d: "Lab, pencitraan, dan EKG dibaca bersamaan; eGFR dan FIB-4 dihitung; kode ICD-10 diadu dengan hasil pasien sendiri." },
      { t: "Mesin asisten", m: "Adaptif, di dalam WhatsApp",
        d: "Rencana, pengingat, dan bahasanya menyesuaikan riwayat tiap keluarga — bukan satu templat yang disiarkan ke semua orang." },
    ],

    dashTitle: "Kabupaten melihat apa yang desa lihat — di hari yang sama.",
    dashLead:
      "Peringkat Posyandu, status gizi per pita WAZ, cakupan imunisasi, prevalensi stunting bulan demi bulan, dan kurva epidemi langsung — dihasilkan dari rekam yang dibuat seorang kader pagi itu juga, tanpa siklus pelaporan di antaranya.",
    dashKpis: [
      { n: "WAZ", l: "SAM · MAM · normal · lebih, terpita otomatis" },
      { n: "10T", l: "kelengkapan ANC diskor per kehamilan" },
      { n: "SKDR", l: "kurva epidemi dengan ambang terhitung otomatis" },
      { n: "0", l: "pengetikan ulang antara lapangan dan pemerintah" },
    ],
    sovTag: "MODEL BERDAULAT · SEDANG DILATIH",
    sovTitle: "Setiap lapisan di atas juga merupakan data latih.",
    sovBody:
      "Rekam berpersetujuan yang sama menjadi bahan bakar model klinis milik Indonesia sendiri. Kami sedang melatih ulang MedGemma dengan bahasa klinis Indonesia — cara kader mencatat tanda bahaya, cara bidan mendokumentasikan ANC 10T, cara dokter menulis asesmen dalam Bahasa Indonesia, cara koder membenarkan sebuah tingkat keparahan di bawah aturan BPJS. Ekstraksi sudah berjalan hari ini di GPU milik kami sendiri di Jakarta; tidak ada koreksi dokter yang keluar dari negeri ini.",
    sovChips: [
      { t: "MedGemma", d: "basis spesialis medis, dilatih ulang dengan teks klinis Indonesia" },
      { t: "🇮🇩 GPU Jakarta", d: "inferensi mandiri — mesinnya milik kami, bukan sewaan per panggilan" },
      { t: "Terikat persetujuan", d: "koreksi menjadi data latih hanya sejauh persetujuan mencakupnya" },
    ],

    close:
      "Aplikasi yang sekadar memenuhi mandat bisa dibangun ulang dalam satu triwulan. Mesin risiko yang dipercaya kementerian kesehatan, berjalan di atas rekam yang dapat ditelusuri sampai ke kader yang mengambilnya, tidak bisa — dan bagian itulah yang tidak cukup diwakili oleh satu halaman ini.",
    closeCta: "Lihat ringkasan teknis",
    closeCta2: "Hubungi kami",
  },

  model: {
    kicker: "MODEL BISNIS",
    h2: "Jangkauan di bawah. Pendapatan di tengah. Efek bergulir di atas.",
    lead:
      "Tiga lapisan, tiga pembayar yang berbeda. Lapisan komunitas didanai oleh institusi yang mandatnya dilayani lapisan itu — yang membeli jangkauan nasional dan korpus longitudinal berpersetujuan tanpa perlu tim penjualan. Lapisan klinik menjual langganan. Lapisan rumah sakit mengambil bagian dari nilai klaim yang berhasil diselamatkan. Masing-masing membiayai yang berikutnya.",
    tiers: [
      {
        tag: "LAPIS 1 · JANGKAUAN",
        t: "Komunitas dan maternal",
        price: "Didanai institusi",
        d: "Kader dan bidan tidak pernah membayar perangkatnya, dan lapisan ini bukan pusat biaya. Ia didanai di tempat mandatnya sudah berada — program CSR perusahaan, hibah pembangunan dan sistem kesehatan, serta perjanjian mitra teknis dengan institusi yang bertanggung jawab atas capaian kesehatan masyarakat.",
        note: "Didanai pemegang mandat · tidak pernah ditagihkan ke tenaga kesehatan",
      },
      {
        tag: "LAPIS 2 · BERULANG",
        t: "Klinik dan dokter",
        price: "Rp 1,2–3 juta / tahun",
        d: "DoK dijual per dokter dan per klinik. Pendapatan langganan, beban dukungan rendah, dan pembeli yang merasakan manfaatnya di hari yang sama — waktu dokumentasi kembali, kode lebih bersih, kapitasi terlindungi.",
        note: "Berulang · swalayan · tumbuh kursi demi kursi",
      },
      {
        tag: "LAPIS 3 · MARGIN",
        t: "Rumah sakit",
        price: "Terkait nilai",
        d: "Integritas klaim untuk tim casemix dan koder: kondisi terdokumentasi namun belum dikode ditampilkan sebelum pengajuan ke E-Klaim, di mana satu tingkat keparahan INA-CBG bernilai lebih besar daripada seluruh kontrak sebuah klinik.",
        note: "Bersifat advisory — kewenangan grouping tetap pada E-Klaim",
      },
    ],
    flywheel:
      "Setiap lapisan memberi makan lapisan berikutnya. Jangkauan komunitas menghasilkan korpus, korpus melatih model, model yang lebih baik membuat produk klinik dan rumah sakit makin sulit ditinggalkan — dan membiayai distribusi yang lebih dalam di bawahnya.",
  },

  moat: {
    kicker: "BENTENGNYA",
    h2: "Korpus yang tidak bisa dibeli.",
    lead:
      "Model klinis asing dilatih dari literatur medis berbahasa Inggris lalu diadaptasi ke luar. SahAIbat dilatih dari cara tenaga kesehatan Indonesia benar-benar melakukan skrining, dokumentasi, dan pengambilan keputusan — dalam Bahasa Indonesia, di bawah regulasi Indonesia, di sepanjang rangkaian layanan. Data seperti itu tidak ada pasarnya. Ia dihasilkan, dengan persetujuan, oleh platform yang memang sudah harus berada di lapangan.",
    pillars: [
      { t: "Distribusi", d: "Hadir di lapisan komunitas, tempat yang tidak dianggap layak secara ekonomi oleh vendor komersial mana pun." },
      { t: "Data", d: "Longitudinal dan berpersetujuan, membentang dari Posyandu hingga klaim rumah sakit — bentuk yang tak bisa disusun ulang oleh produk satu lapisan." },
      { t: "Regulasi", d: "SATUSEHAT, BPJS, dan UU PDP sejak awal, di tanah Indonesia, dengan pendaftaran PSE yang sudah dikantongi." },
      { t: "Satu tumpukan penuh", d: "Satu rekam untuk lima produk. Pesaing harus mengintegrasikan; kami tidak perlu." },
    ],
  },

  brand: {
    kicker: "TENTANG NAMA",
    story:
      "Sahabat — teman yang tetap tinggal. Kami menaruh AI tepat di tengahnya, karena di situlah tempatnya: di dalam hubungan itu, membantu orang yang sedang bekerja. Bukan berdiri di depannya, menggantikannya.",
    sub:
      "Itu juga keseluruhan keputusan produk kami. Setiap lapisan yang kami bangun membantu manusia yang tetap memegang keputusan akhir — kader, bidan, dokter, koder. Tidak satu pun dari mereka sedang digantikan.",
  },

  dok: {
    kicker: "AKTIF SEKARANG · SAHAIBAT DOK",
    h2: "Lapisan klinik sudah berada di tangan para dokter.",
    lead:
      "DOK adalah mesin komersial platform ini dan sudah berjalan hari ini — kecerdasan klinis Indonesia yang membaca lab, rontgen, dan EKG yang dibawa pasien, menulis catatannya, memeriksa kode ICD-10 terhadap hasil pasien sendiri, dan memeriksa klaim BPJS sebelum diajukan.",
    points: [
      "Membaca panel lab, radiologi, EKG, dan USG secara bersamaan",
      "ICD-10 terikat katalog — ia tidak bisa mengarang kode",
      "Kapitasi BPJS, Fornas, dan pra-periksa klaim sudah di dalamnya",
      "SATUSEHAT HL7 FHIR R4, terkirim otomatis",
    ],
    cta: "Kunjungi sahaibatdok.com",
    url: "https://www.sahaibatdok.com",
    badge: "Gratis 30 hari · tanpa kartu",
  },

  traction: {
    kicker: "BUKTI DI LAPANGAN",
    h2: "Sudah berjalan di lapangan. Bukan proyeksi.",
    lead:
      "Platform ini sudah diterapkan hari ini bersama tenaga kesehatan, klinisi, dan mitra yang nyata — dan itu percakapan yang berbeda dari sebuah peta jalan.",
    tabs: [
      { id: "community", label: "Komunitas",
        metrics: [
          { n: "1.500+", l: "anak dipantau di NTT" },
          { n: "WHO", l: "Z-score dihitung di setiap kunjungan" },
          { n: "SAM / MAM", l: "ditandai dan dirujuk dari lapangan" },
        ],
        note: "Tumbuh kembang dipantau di Posyandu terhadap standar WHO — berat menurut umur, tinggi menurut umur, dan berat menurut tinggi — dengan status gizi buruk yang diklasifikasi dan dirujuk dari layar yang sama tempat pengukurannya diambil." },
      { id: "maternal", label: "Maternal",
        metrics: [
          { n: "300+", l: "ibu dipantau" },
          { n: "8,7 / 10", l: "rata-rata skor kualitas ANC" },
          { n: "10T", l: "protokol nasional dipantau per kehamilan" },
        ],
        note: "Setiap kontak antenatal diskor terhadap ANC 10T, protokol sepuluh poin nasional, sehingga satu kehamilan diikuti sebagai satu rekam yang utuh — bukan rangkaian kunjungan yang tidak saling terhubung." },
      { id: "clinical", label: "Klinis",
        metrics: [
          { n: "Aktif", l: "SahAIbat DOK, sudah produksi" },
          { n: "5", l: "produk di 3 lapisan layanan" },
          { n: "0", l: "pengetikan ulang antara lapangan dan pemerintah" },
        ],
        note: "Lapisan klinik sudah aktif secara komersial, terhubung SATUSEHAT, dan sadar aturan BPJS — dan setiap rekam berpersetujuan yang dihasilkannya mengisi korpus yang sama yang sedang dibangun lapisan komunitas." },
    ],
    partners: [
      { n: "Yayasan Pijar Timur", d: "Mitra penerapan komunitas · Nusa Tenggara Timur" },
      { n: "PAPHA", d: "Asosiasi kesehatan masyarakat" },
      { n: "PERDHAKI", d: "Jaringan rumah sakit dan klinik berbasis keagamaan nasional" },
    ],
    close: "Aktif di " + FACTS.liveSince + ".",
  },

  team: {
    kicker: "TIM KAMI",
    h2: "Dibangun oleh orang-orang yang benar-benar merilisnya.",
    lead:
      "Platform yang bekerja di lima produk dan tiga lapisan layanan, sudah berada di lapangan — dibangun oleh tim yang masih cukup ramping untuk bergerak cepat.",
    people: [
      { n: "Sanjib Maity", r: "Pendiri · CEO & CTO",
        d: "Menggambarnya di papan tulis, lalu menulis sendiri kode yang mewujudkannya." },
      { n: "Dr. Ratih Rakhmawati, M.Biomed", r: "Validasi klinis",
        d: "Menentukan apakah jawaban sebuah model akan bertahan di konsultasi sungguhan — dan mengembalikannya sampai bertahan." },
      { n: "Surabhi Das", r: "Konsep klinis & medis",
        d: "Mengubah protokol nasional menjadi sesuatu yang benar-benar bisa ditanyakan layar, dalam urutan seorang klinisi menanyakannya." },
      { n: "Stefanus Bere", r: "Lapangan & kemitraan · NTT",
        d: "Alasan sebuah Posyandu di Timor memercayai perangkat lunak yang tidak pernah mereka minta." },
      { n: "Shindy Farah", r: "Operasional · Indonesia",
        d: "Menjaga jarak antara rencana yang ditulis di Jakarta dan pos kesehatan yang harus menjalankannya hari Jumat." },
      { n: "Saurav Das", r: "Infrastruktur & DevOps",
        d: "Memegang server, GPU, dan panggilan pukul tiga pagi. Tidak ada yang dirilis sebelum ia berdiri stabil." },
      { n: "Chief Market Strategist", r: "Posisi terbuka", open: true,
        d: "Memegang bagaimana Indonesia mendengar semua ini." },
      { n: "Business Development", r: "Posisi terbuka", open: true,
        d: "Mengubah platform yang bekerja menjadi klinik yang menandatangani." },
      { n: "Inside Sales", r: "Posisi terbuka", open: true,
        d: "Suara pertama yang didengar dokter setelah masa cobanya dimulai." },
    ],
  },

  gov: {
    kicker: "TATA KELOLA",
    h2: "Infrastruktur teregulasi, bukan proyek percobaan.",
    lead:
      "Data kesehatan di Indonesia diatur ketat, dan kepatuhannya adalah penghalang masuk, bukan formalitas. Milik kami sudah terpasang.",
    items: [
      { t: "PSE Kominfo", d: "Penyelenggara sistem elektronik terdaftar · " + FACTS.nib },
      { t: "UU PDP", d: "Undang-undang pelindungan data pribadi · AES-256-GCM saat disimpan" },
      { t: "🇮🇩 Residensi data", d: "AWS Jakarta · ap-southeast-3 · rekam tidak pernah keluar dari Indonesia" },
      { t: "SATUSEHAT", d: "HL7 FHIR R4 · terhubung pertukaran nasional" },
      { t: "BPJS", d: "PCare (layanan primer) dan E-Klaim (klaim rumah sakit) · kredensial per fasilitas" },
      { t: "NVIDIA Inception", d: "Anggota · perkakas inferensi dan program GPU" },
    ],
  },

  cta: {
    h2: "Jika Anda melihat apa yang kami lihat, mari berbicara.",
    lead:
      "Halaman ini menyampaikan argumennya. Angka, struktur, dan linimasanya ada di dalam deck dan di dalam percakapan — tidak dipublikasikan di sini.",
    primary: "Minta deck",
    secondary: "Hubungi kami",
    fine: FACTS.entity,
  },
};

export const COPY: Record<Lang, Copy> = { en: EN, id: ID };
