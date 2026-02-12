export type Lang = "id" | "en" | "fr";

export const LANG_LABEL: Record<Lang, string> = {
  id: "Bahasa",
  en: "English",
  fr: "Français",
};

export type I18nKey =
  | "brand.name"
  | "brand.tagline"
  | "nav.partner"
  | "hero.title"
  | "hero.subtitle"
  | "hero.pill"
  | "hero.ctaPrimary"
  | "hero.ctaSecondary"
  | "story.whatTitle"
  | "story.whatText"
  | "story.localTitle"
  | "story.localText"
  | "story.kaderTitle"
  | "story.kaderText"
  | "story.reviewerTitle"
  | "story.reviewerText"
  | "story.partnerTitle"
  | "story.partnerText"
  | "whyDifferent.title"
  | "earlyTriage.title"
  | "reporting.title"
  | "supports.title"
  | "strategy.title"
  | "impact.title"
  | "impact.item1"
  | "impact.item2"
  | "impact.item3"
  | "partner.pageTitle"
  | "partner.pageSubtitle"
  | "partner.formTitle"
  | "partner.org"
  | "partner.country"
  | "partner.region"
  | "partner.focus"
  | "partner.size"
  | "partner.email"
  | "partner.message"
  | "partner.submit"
  | "partner.directEmail"
  | "disclaimer"
| "legal.privacy"
| "legal.terms"
| "legal.contact"
| "legal.websiteNoticeTitle"
| "legal.websiteNoticeText"
| "legal.appPolicyTitle"
| "legal.appPolicyText"
| "legal.appPolicyLinkLabel"
| "legal.operatorTitle"
| "legal.operatorText"
| "legal.privacy.title"
| "legal.privacy.updated"
| "legal.privacy.p1"
| "legal.privacy.p2"
| "legal.privacy.p3"
| "legal.terms.title"
| "legal.terms.updated"
| "legal.terms.p1"
| "legal.terms.p2"
| "legal.contact.title"
| "legal.contact.p1"
| "legal.contact.emailLabel"
| "legal.contact.emailValue"
| "legal.contact.indonesiaNote"


export const DICT: Record<Lang, Record<I18nKey, string>> = {
  en: {
    "brand.name": "SahAIbat",
    "brand.tagline": "healthcare closer than ever.",
    "nav.partner": "Partner with us",

    "hero.title": "Healthcare closer than ever.",
    "hero.subtitle":
      "SahAIbat is built for real communities — helping Kader, nurses, and doctors support families faster with clarity, empathy, and safer next steps.",
    "hero.pill":
      "Built with local communities. Guided by global clinical safety principles.",
    "hero.ctaPrimary": "Partner with us",
    "hero.ctaSecondary": "See the story",

    "story.whatTitle": "What is SahAIbat?",
    "story.whatText":
      "SahAIbat is a simple, story-first way to support care decisions when time is limited and help is needed now. It’s not about fancy technology — it’s about calm guidance for real people.",
    "story.localTitle": "Not built from North America — built with local reality",
    "story.localText":
      "SahAIbat is designed to feel familiar. We respect language, culture, and how community care actually works — while staying grounded in global clinical safety thinking.",
    "story.kaderTitle": "How it helps Kader (Community Health Workers)",
    "story.kaderText":
      "In a rural visit, a Kader shouldn’t have to guess what to ask next. SahAIbat helps gather the right information, notice danger signs early, and know when to escalate — with dignity and clarity.",
    "story.reviewerTitle": "How it helps nurses and doctors",
    "story.reviewerText":
      "Reviewers often receive incomplete stories. SahAIbat helps turn field observations into clearer handoffs, so nurses and doctors can prioritize faster and support safer decisions.",
    "story.partnerTitle": "Free — and built as a partner, not a vendor",
    "story.partnerText":
      "Our goal is to build SahAIbat for the world. We work with NGOs as partners, adapting workflows to each community — not selling a one-size-fits-all product.",

    "whyDifferent.title": "Why SahAIbat is different",
    "earlyTriage.title": "Supporting early triage — for communities and patients",
    "reporting.title": "Clear reporting, ready to integrate",
    "supports.title": "Designed for high-impact community health programs",
    "strategy.title": "Built for programs working closest to the community",

    "impact.title": "What impact can this create?",
    "impact.item1": "More consistent triage in the field",
    "impact.item2": "Earlier escalation when danger signs appear",
    "impact.item3": "Better handoff between Kader and clinical reviewers",

    "partner.pageTitle": "Partner with SahAIbat",
    "partner.pageSubtitle":
      "Tell us about your NGO or program. We’ll respond with simple next steps to explore a pilot together.",
    "partner.formTitle": "Partnership form",
    "partner.org": "Organization name",
    "partner.country": "Country",
    "partner.region": "Region / District",
    "partner.focus": "Program focus (e.g., TB, maternal, child health)",
    "partner.size": "CHW/Kader cohort size (approx.)",
    "partner.email": "Your email",
    "partner.message": "Message / context",
    "partner.submit": "Send partnership request",
    "partner.directEmail": "Or email us directly:",
    "disclaimer":
      "SahAIbat provides triage support and care guidance — not diagnosis, not emergency services.",
    // ✅ Add inside translations.en
"legal.privacy": "Privacy",
"legal.terms": "Terms",
"legal.contact": "Contact",

"legal.websiteNoticeTitle": "Notice (This website)",
"legal.websiteNoticeText":
  "sahaibat.com is an informational/marketing website. It does not collect health data and does not store triage data. Triage services and health data (if any) are handled only within the SahAIbat app at app.sahaibat.com.",

"legal.appPolicyTitle": "App Privacy (Indonesia)",
"legal.appPolicyText":
  "The privacy policy covering triage services, Jakarta data hosting, and the Indonesia contact representative applies to the SahAIbat app at app.sahaibat.com.",
"legal.appPolicyLinkLabel": "Open App Privacy Policy",

"legal.operatorTitle": "Operator",
"legal.operatorText":
  "11679210 Canada Inc. (federally registered in Canada).",

"legal.privacy.title": "Privacy Policy (sahaibat.com website)",
"legal.privacy.updated": "Last updated: 02 Jan 2026",
"legal.privacy.p1":
  "This policy applies to sahaibat.com (an informational/marketing website). This website does not provide triage services and does not store health data.",
"legal.privacy.p2":
  "Data processed on this website may be limited to technical logs and, if you submit a contact/partner form, the information you provide (e.g., name, email, organization, message).",
"legal.privacy.p3":
  "For the Indonesia triage/health-data privacy policy, please refer to the SahAIbat app privacy policy at app.sahaibat.com.",

"legal.terms.title": "Terms & Conditions (sahaibat.com website)",
"legal.terms.updated": "Last updated: 02 Jan 2026",
"legal.terms.p1":
  "sahaibat.com is provided for informational purposes only. Content is general and not medical advice.",
"legal.terms.p2":
  "Use of triage services (if available) is governed by the terms and policies within the SahAIbat app at app.sahaibat.com.",

"legal.contact.title": "Contact",
"legal.contact.p1":
  "For questions, partnerships, or more information, please contact:",
"legal.contact.emailLabel": "Email",
"legal.contact.emailValue": "privacy@sahaibat.com",
"legal.contact.indonesiaNote":
  "Note: Indonesia representative details and Jakarta hosting apply to the SahAIbat app (app.sahaibat.com), not this marketing website.",
  },

  id: {
    "brand.name": "SahAIbat",
    "brand.tagline": "healthcare closer than ever.",
    "nav.partner": "Bermitra dengan kami",

    "hero.title": "Healthcare closer than ever.",
    "hero.subtitle":
      "SahAIbat dibuat untuk komunitas nyata — membantu Kader, perawat, dan dokter mendampingi keluarga lebih cepat dengan jelas, empatik, dan langkah berikutnya yang lebih aman.",
    "hero.pill":
      "Dibangun bersama komunitas lokal. Berpanduan pada prinsip keselamatan klinis global.",
    "hero.ctaPrimary": "Bermitra dengan kami",
    "hero.ctaSecondary": "Lihat ceritanya",

    "story.whatTitle": "Apa itu SahAIbat?",
    "story.whatText":
      "SahAIbat adalah cara sederhana berbasis cerita untuk membantu keputusan perawatan saat waktu terbatas dan bantuan dibutuhkan sekarang.",
    "story.localTitle": "Bukan dibuat dari Amerika Utara — dibuat bersama realitas lokal",
    "story.localText":
      "SahAIbat dirancang agar terasa familiar. Kami menghormati bahasa dan budaya setempat serta cara kerja layanan komunitas.",
    "story.kaderTitle": "Bagaimana membantu Kader",
    "story.kaderText":
      "SahAIbat membantu mengumpulkan informasi penting, mengenali tanda bahaya lebih dini, dan tahu kapan harus eskalasi — dengan jelas dan manusiawi.",
    "story.reviewerTitle": "Bagaimana membantu perawat dan dokter",
    "story.reviewerText":
      "SahAIbat membantu merapikan temuan lapangan agar handoff lebih jelas sehingga prioritas lebih cepat dan keputusan lebih aman.",
    "story.partnerTitle": "Gratis — dan kami adalah mitra, bukan vendor",
    "story.partnerText":
      "Kami bekerja bersama NGO sebagai mitra, menyesuaikan alur kerja dengan setiap komunitas.",

    "whyDifferent.title": "Mengapa SahAIbat berbeda",
    "earlyTriage.title": "Dukungan triase awal — untuk komunitas dan pasien",
    "reporting.title": "Pelaporan jelas, siap integrasi",
    "supports.title": "Dirancang untuk program kesehatan komunitas berdampak tinggi",
    "strategy.title": "Dibangun untuk program yang paling dekat dengan komunitas",

    "impact.title": "Dampak yang bisa tercipta",
    "impact.item1": "Triase lapangan lebih konsisten",
    "impact.item2": "Eskalasi lebih cepat saat ada tanda bahaya",
    "impact.item3": "Handoff lebih baik antara Kader dan peninjau klinis",

    "partner.pageTitle": "Bermitra dengan SahAIbat",
    "partner.pageSubtitle":
      "Ceritakan tentang NGO atau program Anda. Kami akan membalas dengan langkah sederhana untuk menjajaki pilot bersama.",
    "partner.formTitle": "Form kemitraan",
    "partner.org": "Nama organisasi",
    "partner.country": "Negara",
    "partner.region": "Wilayah / Kabupaten / Kecamatan",
    "partner.focus": "Fokus program (mis. TB, ibu & anak)",
    "partner.size": "Perkiraan jumlah Kader",
    "partner.email": "Email Anda",
    "partner.message": "Pesan / konteks",
    "partner.submit": "Kirim permintaan kemitraan",
    "partner.directEmail": "Atau email langsung:",
    "disclaimer":
      "SahAIbat membantu triase dan panduan perawatan — bukan diagnosis, bukan layanan darurat.",
    // ✅ Add inside translations.id
"legal.privacy": "Privasi",
"legal.terms": "Ketentuan",
"legal.contact": "Kontak",

"legal.websiteNoticeTitle": "Catatan (Situs ini)",
"legal.websiteNoticeText":
  "Situs sahaibat.com adalah situs informasi/marketing. Situs ini tidak mengumpulkan data kesehatan dan tidak menyimpan data triase. Layanan triase dan data kesehatan (jika ada) hanya ada di aplikasi SahAIbat di app.sahaibat.com.",

"legal.appPolicyTitle": "Privasi untuk Aplikasi (Indonesia)",
"legal.appPolicyText":
  "Kebijakan privasi untuk layanan triase, penyimpanan data di Jakarta, serta perwakilan kontak Indonesia berlaku untuk aplikasi SahAIbat di app.sahaibat.com.",
"legal.appPolicyLinkLabel": "Buka Kebijakan Privasi Aplikasi",

"legal.operatorTitle": "Operator",
"legal.operatorText":
  "11679210 Canada Inc. (terdaftar secara federal di Kanada).",

"legal.privacy.title": "Kebijakan Privasi (Situs sahaibat.com)",
"legal.privacy.updated": "Terakhir diperbarui: 02 Januari 2026",
"legal.privacy.p1":
  "Kebijakan ini berlaku untuk situs sahaibat.com (situs informasi/marketing). Situs ini tidak menyediakan layanan triase dan tidak menyimpan data kesehatan.",
"legal.privacy.p2":
  "Data yang mungkin diproses oleh situs ini terbatas pada data teknis seperti log akses dan, jika Anda mengirim formulir kontak/kemitraan, informasi yang Anda kirimkan (misalnya nama, email, organisasi, pesan).",
"legal.privacy.p3":
  "Untuk kebijakan privasi layanan triase dan data kesehatan di Indonesia, silakan lihat kebijakan privasi aplikasi SahAIbat di app.sahaibat.com.",

"legal.terms.title": "Syarat & Ketentuan (Situs sahaibat.com)",
"legal.terms.updated": "Terakhir diperbarui: 02 Januari 2026",
"legal.terms.p1":
  "Situs sahaibat.com disediakan untuk tujuan informasi. Konten bersifat umum dan tidak dimaksudkan sebagai nasihat medis.",
"legal.terms.p2":
  "Penggunaan layanan triase (jika tersedia) tunduk pada ketentuan dan kebijakan yang berlaku di aplikasi SahAIbat di app.sahaibat.com.",

"legal.contact.title": "Kontak",
"legal.contact.p1":
  "Untuk pertanyaan, kemitraan, atau informasi lebih lanjut, silakan hubungi kami:",
"legal.contact.emailLabel": "Email",
"legal.contact.emailValue": "privacy@sahaibat.com",
"legal.contact.indonesiaNote":
  "Catatan: Kontak perwakilan Indonesia dan detail hosting Jakarta berlaku untuk aplikasi SahAIbat (app.sahaibat.com), bukan untuk situs marketing ini.",

  },

  fr: {
    "brand.name": "SahAIbat",
    "brand.tagline": "healthcare closer than ever.",
    "nav.partner": "Partenariat",

    "hero.title": "Healthcare closer than ever.",
    "hero.subtitle":
      "SahAIbat est conçu pour les communautés réelles — aider les agents communautaires et cliniciens à soutenir les familles plus vite avec clarté et empathie.",
    "hero.pill":
      "Co-conçu avec les communautés locales. Guidé par des principes mondiaux de sécurité clinique.",
    "hero.ctaPrimary": "Partenariat",
    "hero.ctaSecondary": "Voir l’histoire",

    "story.whatTitle": "Qu’est-ce que SahAIbat ?",
    "story.whatText":
      "SahAIbat est une approche simple et humaine pour soutenir les décisions de soins quand le temps est limité.",
    "story.localTitle": "Conçu avec la réalité locale",
    "story.localText":
      "SahAIbat respecte la langue, la culture et la façon dont les soins communautaires fonctionnent réellement.",
    "story.kaderTitle": "Comment cela aide les agents communautaires",
    "story.kaderText":
      "SahAIbat aide à recueillir l’essentiel, repérer les signes de danger et savoir quand escalader — avec dignité et clarté.",
    "story.reviewerTitle": "Comment cela aide les infirmier·e·s et médecins",
    "story.reviewerText":
      "SahAIbat transforme les observations terrain en transmissions plus claires pour prioriser plus vite.",
    "story.partnerTitle": "Gratuit — et construit comme un partenaire",
    "story.partnerText":
      "Nous travaillons avec les ONG comme partenaires, en adaptant les parcours à chaque communauté.",

    "whyDifferent.title": "Pourquoi SahAIbat est différent",
    "earlyTriage.title": "Soutenir le triage précoce — communautés et patients",
    "reporting.title": "Reporting clair, prêt à s’intégrer",
    "supports.title": "Conçu pour des programmes à fort impact",
    "strategy.title": "Pour les programmes au plus près des communautés",

    "impact.title": "Quel impact possible ?",
    "impact.item1": "Un triage plus cohérent",
    "impact.item2": "Une escalade plus précoce",
    "impact.item3": "De meilleures transmissions",

    "partner.pageTitle": "Partenariat avec SahAIbat",
    "partner.pageSubtitle":
      "Parlez-nous de votre ONG ou programme. Nous répondrons avec des étapes simples pour explorer un pilote.",
    "partner.formTitle": "Formulaire de partenariat",
    "partner.org": "Nom de l’organisation",
    "partner.country": "Pays",
    "partner.region": "Région / District",
    "partner.focus": "Objectif du programme (ex : TB, maternel, santé enfant)",
    "partner.size": "Taille du groupe CHW/Kader (approx.)",
    "partner.email": "Votre email",
    "partner.message": "Message / contexte",
    "partner.submit": "Envoyer la demande",
    "partner.directEmail": "Ou écrivez-nous :",
    "disclaimer":
      "SahAIbat fournit une aide au triage et une guidance — pas un diagnostic, ni des services d’urgence.",
    // ✅ Add inside translations.fr
"legal.privacy": "Confidentialité",
"legal.terms": "Conditions",
"legal.contact": "Contact",

"legal.websiteNoticeTitle": "Avis (Ce site)",
"legal.websiteNoticeText":
  "sahaibat.com est un site d’information/marketing. Il ne collecte pas de données de santé et ne stocke pas de données de triage. Le triage et les données de santé (le cas échéant) sont gérés uniquement via l’application SahAIbat sur app.sahaibat.com.",

"legal.appPolicyTitle": "Confidentialité de l’application (Indonésie)",
"legal.appPolicyText":
  "La politique couvrant le triage, l’hébergement des données à Jakarta et le contact indonésien s’applique à l’application SahAIbat sur app.sahaibat.com.",
"legal.appPolicyLinkLabel": "Ouvrir la politique de l’application",

"legal.operatorTitle": "Opérateur",
"legal.operatorText":
  "11679210 Canada Inc. (enregistrée au niveau fédéral au Canada).",

"legal.privacy.title": "Politique de confidentialité (site sahaibat.com)",
"legal.privacy.updated": "Dernière mise à jour : 02 janv. 2026",
"legal.privacy.p1":
  "Cette politique s’applique à sahaibat.com (site d’information/marketing). Ce site ne fournit pas de triage et ne stocke pas de données de santé.",
"legal.privacy.p2":
  "Les données traitées sur ce site peuvent se limiter à des journaux techniques et, si vous envoyez un formulaire, aux informations fournies (nom, email, organisation, message).",
"legal.privacy.p3":
  "Pour la politique de confidentialité du triage/données de santé en Indonésie, veuillez consulter la politique de l’application sur app.sahaibat.com.",

"legal.terms.title": "Conditions d’utilisation (site sahaibat.com)",
"legal.terms.updated": "Dernière mise à jour : 02 janv. 2026",
"legal.terms.p1":
  "sahaibat.com est fourni à titre informatif. Le contenu est général et ne constitue pas un avis médical.",
"legal.terms.p2":
  "L’utilisation du triage (si disponible) est régie par les conditions et politiques de l’application SahAIbat sur app.sahaibat.com.",

"legal.contact.title": "Contact",
"legal.contact.p1":
  "Pour toute question, partenariat ou information, contactez-nous :",
"legal.contact.emailLabel": "Email",
"legal.contact.emailValue": "privacy@sahaibat.com",
"legal.contact.indonesiaNote":
  "Remarque : les détails du contact indonésien et l’hébergement à Jakarta s’appliquent à l’application (app.sahaibat.com), pas à ce site.",

  },
};
