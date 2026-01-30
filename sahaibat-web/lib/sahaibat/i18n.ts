export type Lang = "en" | "id" | "fr";

export const LANG_LABEL: Record<Lang, string> = {
  en: "English",
  id: "Bahasa",
  fr: "Français",
};

export type I18nKey =
  | "brand.name"
  | "brand.tagline"
  | "hero.title"
  | "hero.subtitle"
  | "hero.pill"
  | "cta.partner"
  | "story.what"
  | "story.local"
  | "story.kader"
  | "story.doctor"
  | "story.partner"
  | "impact.title"
  | "impact.one"
  | "impact.two"
  | "impact.three"
  | "partner.title"
  | "partner.subtitle"
  | "partner.submit"
  | "disclaimer";

export const DICT: Record<Lang, Record<I18nKey, string>> = {
  en: {
    "brand.name": "SahAIbat",
    "brand.tagline": "healthcare closer than ever.",
    "hero.title": "Healthcare closer than ever.",
    "hero.subtitle":
      "SahAIbat helps community health workers, nurses, and doctors support families faster — with local understanding and global clinical safety principles.",
    "hero.pill":
      "Built with local communities. Guided by global clinical safety principles.",
    "cta.partner": "Partner with us",
    "story.what":
      "SahAIbat is built for moments where care is needed now — not technology for its own sake, but calm guidance for real people.",
    "story.local":
      "This is not built from North America. SahAIbat respects local language, culture, and how community care truly works.",
    "story.kader":
      "For Kader, SahAIbat helps ask the right questions, recognize danger signs early, and escalate with confidence.",
    "story.doctor":
      "For nurses and doctors, SahAIbat turns field notes into clear summaries that are easier to review and act on.",
    "story.partner":
      "SahAIbat is free and built as a partner — not a vendor. We work alongside NGOs to adapt to each community.",
    "impact.title": "What impact can this create?",
    "impact.one": "More consistent triage in the field",
    "impact.two": "Earlier escalation when danger signs appear",
    "impact.three": "Better handoff between community and clinicians",
    "partner.title": "Partner with SahAIbat",
    "partner.subtitle":
      "Tell us about your NGO or program. We’ll explore a pilot together.",
    "partner.submit": "Send partnership request",
    "disclaimer":
      "SahAIbat provides triage support and care guidance — not diagnosis or emergency services.",
  },

  id: {
    "brand.name": "SahAIbat",
    "brand.tagline": "healthcare closer than ever.",
    "hero.title": "Healthcare closer than ever.",
    "hero.subtitle":
      "SahAIbat membantu kader, perawat, dan dokter mendampingi keluarga dengan lebih cepat dan aman.",
    "hero.pill":
      "Dibangun bersama komunitas lokal. Berpanduan pada prinsip keselamatan klinis global.",
    "cta.partner": "Bermitra dengan kami",
    "story.what":
      "SahAIbat dibuat untuk situasi nyata di lapangan — membantu keputusan yang lebih aman, bukan teknologi rumit.",
    "story.local":
      "Bukan dibuat dari Amerika Utara. SahAIbat menghormati bahasa, budaya, dan cara kerja komunitas lokal.",
    "story.kader":
      "Untuk Kader, SahAIbat membantu mengenali tanda bahaya lebih dini dan tahu kapan harus eskalasi.",
    "story.doctor":
      "Untuk perawat dan dokter, SahAIbat menyederhanakan ringkasan kasus dari lapangan.",
    "story.partner":
      "SahAIbat gratis dan dibangun sebagai mitra — bukan vendor.",
    "impact.title": "Dampak yang bisa tercipta",
    "impact.one": "Triase lapangan lebih konsisten",
    "impact.two": "Eskalasi lebih cepat",
    "impact.three": "Koordinasi yang lebih baik",
    "partner.title": "Bermitra dengan SahAIbat",
    "partner.subtitle":
      "Ceritakan tentang NGO atau program Anda. Kita bisa mulai dengan pilot kecil.",
    "partner.submit": "Kirim permintaan",
    "disclaimer":
      "SahAIbat membantu triase dan panduan perawatan — bukan diagnosis.",
  },

  fr: {
    "brand.name": "SahAIbat",
    "brand.tagline": "healthcare closer than ever.",
    "hero.title": "Healthcare closer than ever.",
    "hero.subtitle":
      "SahAIbat aide les agents communautaires et les cliniciens à soutenir les familles plus rapidement.",
    "hero.pill":
      "Co-conçu avec les communautés locales. Guidé par des principes mondiaux de sécurité clinique.",
    "cta.partner": "Devenir partenaire",
    "story.what":
      "SahAIbat est conçu pour les moments critiques — une aide calme pour des décisions plus sûres.",
    "story.local":
      "Pas conçu depuis l’Amérique du Nord. SahAIbat respecte la culture et la langue locales.",
    "story.kader":
      "Pour les agents communautaires, SahAIbat aide à identifier les signes de danger et à escalader.",
    "story.doctor":
      "Pour les infirmiers et médecins, SahAIbat transforme les notes terrain en résumés clairs.",
    "story.partner":
      "SahAIbat est gratuit et construit comme un partenaire — pas comme un fournisseur.",
    "impact.title": "Quel impact possible ?",
    "impact.one": "Triage plus cohérent",
    "impact.two": "Escalade plus précoce",
    "impact.three": "Meilleure coordination",
    "partner.title": "Partenariat avec SahAIbat",
    "partner.subtitle":
      "Parlez-nous de votre organisation. Explorons un pilote ensemble.",
    "partner.submit": "Envoyer",
    "disclaimer":
      "SahAIbat fournit une aide au triage — pas un diagnostic.",
  },
};
