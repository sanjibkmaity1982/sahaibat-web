export type Lang = "id" | "en" | "fr";

export const LANG_LABEL: Record<Lang, string> = {
  id: "Bahasa",
  en: "English",
  fr: "Français",
};

export type I18nKey =
  | "brand.name"
  | "brand.tagline"
  | "brand.subtag"
  | "brand.localGlobal"
  | "cta.bookDemo"
  | "cta.exploreScenarios"
  | "nav.home"
  | "nav.how"
  | "nav.scenarios"
  | "nav.ngos"
  | "nav.trust"
  | "nav.contact"
  | "disclaimer.short";

export const DICT: Record<Lang, Record<I18nKey, string>> = {
  en: {
    "brand.name": "SahAIbat",
    "brand.tagline": "Triage support that works where care is hardest",
    "brand.subtag":
      "A WhatsApp-first triage and care-guidance platform that helps community health workers and clinical reviewers act faster, safer, and more consistently — especially in low-resource settings.",
    "brand.localGlobal": "Built with local communities. Guided by global clinical safety standards.",
    "cta.bookDemo": "Book a demo",
    "cta.exploreScenarios": "Explore scenarios",
    "nav.home": "Home",
    "nav.how": "How it works",
    "nav.scenarios": "Scenarios",
    "nav.ngos": "For NGOs",
    "nav.trust": "Trust & Safety",
    "nav.contact": "Contact",
    "disclaimer.short": "SahAIbat provides triage support and care guidance — not diagnosis.",
  },
  id: {
    "brand.name": "SahAIbat",
    "brand.tagline": "Dukungan triase saat layanan kesehatan paling menantang",
    "brand.subtag":
      "Platform triase dan panduan perawatan berbasis WhatsApp yang membantu kader/tenaga kesehatan komunitas serta peninjau klinis bergerak lebih cepat, lebih aman, dan lebih konsisten — terutama di wilayah dengan sumber daya terbatas.",
    "brand.localGlobal": "Dibangun bersama komunitas lokal. Berpanduan pada standar keselamatan klinis global.",
    "cta.bookDemo": "Minta demo",
    "cta.exploreScenarios": "Lihat skenario",
    "nav.home": "Beranda",
    "nav.how": "Cara kerja",
    "nav.scenarios": "Skenario",
    "nav.ngos": "Untuk NGO",
    "nav.trust": "Keamanan & Kepercayaan",
    "nav.contact": "Kontak",
    "disclaimer.short": "SahAIbat membantu triase dan panduan perawatan — bukan diagnosis.",
  },
  fr: {
    "brand.name": "SahAIbat",
    "brand.tagline": "Un support de triage là où les soins sont les plus difficiles",
    "brand.subtag":
      "Une plateforme de triage et de guidance de soins, d’abord sur WhatsApp, qui aide les agents communautaires et les cliniciens à agir plus vite, plus prudemment et plus régulièrement — notamment en contextes à faibles ressources.",
    "brand.localGlobal":
      "Co-conçu avec les communautés locales. Guidé par des standards mondiaux de sécurité clinique.",
    "cta.bookDemo": "Demander une démo",
    "cta.exploreScenarios": "Explorer les scénarios",
    "nav.home": "Accueil",
    "nav.how": "Fonctionnement",
    "nav.scenarios": "Scénarios",
    "nav.ngos": "Pour les ONG",
    "nav.trust": "Confiance & Sécurité",
    "nav.contact": "Contact",
    "disclaimer.short":
      "SahAIbat fournit un support de triage et une guidance — pas un diagnostic.",
  },
};

