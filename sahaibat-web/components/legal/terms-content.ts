// The SahAIbat terms of use, in both languages. Edit the text here; the page
// only lays it out. Personal data is covered by the privacy policy.

import type { Section, T } from "./privacy-content";

const t = (en: string, id: string): T => ({ en, id });

export const UPDATED = t("Last updated: 21 October 2026 · Version 2.0", "Terakhir diperbarui: 21 Oktober 2026 · Versi 2.0");

export const INTRO = t(
  "These terms explain the agreement between you and SahAIbat when you use our website and products. We have written them to be clear and fair. Please read them together with our Privacy Policy, which explains how we protect personal and health data.",
  "Ketentuan ini menjelaskan kesepakatan antara Anda dan SahAIbat saat Anda menggunakan situs dan produk kami. Kami menulisnya agar jelas dan adil. Bacalah bersama Kebijakan Privasi kami, yang menjelaskan cara kami melindungi data pribadi dan kesehatan.",
);

export const COMMITMENTS: { h: T; d: T }[] = [
  { h: t("Your records stay yours", "Rekam medis tetap milik Anda"), d: t("Health facilities own their records and can export them at any time.", "Fasilitas kesehatan memiliki rekam medisnya dan dapat mengekspornya kapan saja.") },
  { h: t("A clinician decides", "Keputusan di tangan tenaga kesehatan"), d: t("SahAIbat supports health workers. It does not replace clinical judgement.", "SahAIbat mendukung tenaga kesehatan. Bukan pengganti penilaian klinis.") },
  { h: t("No hidden costs", "Tanpa biaya tersembunyi"), d: t("Prices are shown before you pay, with notice before any change.", "Harga ditampilkan sebelum Anda membayar, dengan pemberitahuan sebelum ada perubahan.") },
  { h: t("Leave any time", "Berhenti kapan saja"), d: t("Cancel whenever you choose and take your data with you.", "Berhenti kapan pun Anda mau dan bawa data Anda.") },
];

export const SECTIONS: Section[] = [
  {
    id: "acceptance",
    h: t("1. About these terms", "1. Tentang ketentuan ini"),
    body: [
      { p: t(
        "These Terms of Use apply to the website www.sahaibat.com, including the Experience Zone, and to the SahAIbat products: Kader, Bidan, DOK, DOK Companion, Kasih, Code and Konsensus.id, with their apps and extensions (the “Services”). By using the Services you agree to these terms.",
        "Ketentuan Penggunaan ini berlaku untuk situs www.sahaibat.com, termasuk fitur Coba langsung, dan produk SahAIbat: Kader, Bidan, DOK, DOK Companion, Kasih, Code dan Konsensus.id, beserta aplikasi dan ekstensinya (“Layanan”). Dengan menggunakan Layanan, Anda menyetujui ketentuan ini.") },
      { p: t(
        "If you use the Services for a health facility or organisation, you confirm that you may accept these terms for it. Where your organisation has signed a separate agreement with us, that agreement prevails over these terms if they differ.",
        "Bila Anda menggunakan Layanan untuk fasilitas kesehatan atau organisasi, Anda menyatakan berwenang menyetujui ketentuan ini atas namanya. Bila organisasi Anda menandatangani perjanjian terpisah dengan kami, perjanjian itu yang berlaku bila berbeda dengan ketentuan ini.") },
    ],
  },
  {
    id: "who",
    h: t("2. Who we are", "2. Siapa kami"),
    body: [
      { p: t(
        "The Services are provided by SahAIbat, registered in Indonesia under NIB 1202260248509 and as an Electronic System Operator (PSE) with Komdigi, at Jl. Boulevard Raya No. 1, Kelapa Gading Timur, Kec. Kelapa Gading, Jakarta 14240, Indonesia. Contact: admin@sahaibat.com.",
        "Layanan disediakan oleh SahAIbat, terdaftar di Indonesia dengan NIB 1202260248509 dan sebagai Penyelenggara Sistem Elektronik (PSE) di Komdigi, beralamat di Jl. Boulevard Raya No. 1, Kelapa Gading Timur, Kec. Kelapa Gading, Jakarta 14240, Indonesia. Kontak: admin@sahaibat.com.") },
    ],
  },
  {
    id: "eligibility",
    h: t("3. Who may use the Services", "3. Siapa yang dapat menggunakan Layanan"),
    body: [
      { ul: [
        t("Clinical products (DOK, Bidan, Code) are for qualified health workers with a valid STR and SIP where the law requires them, and for the staff of health facilities they authorise.", "Produk klinis (DOK, Bidan, Code) diperuntukkan bagi tenaga kesehatan yang memiliki STR dan SIP yang berlaku bila diwajibkan hukum, serta staf fasilitas kesehatan yang diberi wewenang."),
        t("Kader is for community health volunteers working with a Posyandu, Puskesmas or programme partner.", "Kader diperuntukkan bagi kader kesehatan yang bekerja bersama Posyandu, Puskesmas atau mitra program."),
        t("Kasih may be used by patients and families. Users under 18 need a parent or guardian.", "Kasih dapat digunakan pasien dan keluarga. Pengguna di bawah 18 tahun memerlukan orang tua atau wali."),
        t("You must give accurate information when you register and keep it up to date.", "Anda wajib memberi informasi yang benar saat mendaftar dan memperbaruinya."),
      ] },
    ],
  },
  {
    id: "clinical",
    h: t("4. Clinical responsibility", "4. Tanggung jawab klinis"),
    body: [
      { note: t(
        "SahAIbat supports health workers; it does not provide medical advice to patients and does not replace a health worker’s judgement. The health worker remains responsible for every diagnosis, treatment, prescription, referral and record they sign.",
        "SahAIbat mendukung tenaga kesehatan; tidak memberi nasihat medis kepada pasien dan tidak menggantikan penilaian tenaga kesehatan. Tenaga kesehatan tetap bertanggung jawab atas setiap diagnosis, pengobatan, resep, rujukan dan rekam medis yang ditandatanganinya.") },
      { p: t(
        "In an emergency, do not rely on the Services: call 119 for an ambulance or 112, or go to the nearest emergency department.",
        "Dalam keadaan darurat, jangan mengandalkan Layanan: hubungi 119 untuk ambulans atau 112, atau datang ke IGD terdekat.") },
    ],
  },
  {
    id: "intelligence",
    h: t("5. SahAIbat Intelligence", "5. SahAIbat Intelligence"),
    body: [
      { p: t(
        "SahAIbat Intelligence and DOK Intelligence produce drafts and suggestions: SOAP notes, codes, checklists, care plans, messages and guideline references. They can be incomplete or wrong. You must review, correct and approve each one before it is signed, saved, submitted or sent. Our guardrails are described in section 7 of the Privacy Policy.",
        "SahAIbat Intelligence dan DOK Intelligence menghasilkan draf dan saran: catatan SOAP, kode, daftar periksa, rencana perawatan, pesan dan rujukan pedoman. Hasilnya bisa tidak lengkap atau keliru. Anda wajib meninjau, memperbaiki dan menyetujui setiap hasil sebelum ditandatangani, disimpan, dikirim atau diserahkan. Pengaman kami dijelaskan di bagian 7 Kebijakan Privasi.") },
      { p: t(
        "When you record a consultation, you are responsible for telling the patient and obtaining any consent the law or your facility requires.",
        "Saat merekam konsultasi, Anda bertanggung jawab memberi tahu pasien dan memperoleh persetujuan yang diwajibkan hukum atau fasilitas Anda.") },
    ],
  },
  {
    id: "experience",
    h: t("6. The Experience Zone", "6. Coba langsung"),
    body: [
      { p: t(
        "The Experience Zone on our website is a public demonstration. Its results are illustrations, not clinical advice. Use only the sample cases or invented details; never enter real patient information. Use is limited per visitor and per day, and may be paused at any time.",
        "Fitur Coba langsung di situs kami adalah demonstrasi publik. Hasilnya berupa ilustrasi, bukan nasihat klinis. Gunakan hanya kasus contoh atau data rekaan; jangan pernah memasukkan data pasien sungguhan. Pemakaian dibatasi per pengunjung dan per hari, dan dapat dihentikan sewaktu-waktu.") },
    ],
  },
  {
    id: "accounts",
    h: t("7. Accounts and security", "7. Akun dan keamanan"),
    body: [
      { ul: [
        t("Keep your password private and do not share your account. Each person must use their own login.", "Jaga kerahasiaan kata sandi dan jangan berbagi akun. Setiap orang wajib memakai akun masing-masing."),
        t("Facility administrators decide who can access their records and must remove access when someone leaves.", "Administrator fasilitas menentukan siapa yang dapat mengakses rekam medisnya dan wajib mencabut akses saat seseorang berhenti."),
        t("Tell us at once at admin@sahaibat.com if you suspect unauthorised access or lose a device.", "Segera beri tahu kami di admin@sahaibat.com bila Anda menduga ada akses tanpa izin atau perangkat hilang."),
      ] },
    ],
  },
  {
    id: "use",
    h: t("8. Acceptable use", "8. Penggunaan yang wajar"),
    body: [
      { p: t("You agree not to:", "Anda setuju untuk tidak:") },
      { ul: [
        t("Use the Services against Indonesian law or professional standards, or to process data you have no right to process.", "Menggunakan Layanan bertentangan dengan hukum Indonesia atau standar profesi, atau memproses data yang tidak berhak Anda proses."),
        t("Access another person’s or facility’s data without authorisation.", "Mengakses data orang atau fasilitas lain tanpa izin."),
        t("Disrupt, overload, probe or bypass the security or usage limits of the Services.", "Mengganggu, membebani, menguji celah atau mengakali keamanan maupun batas pemakaian Layanan."),
        t("Copy, resell, reverse engineer or build a competing product from the Services, except where the law allows.", "Menyalin, menjual kembali, merekayasa balik atau membuat produk pesaing dari Layanan, kecuali diizinkan hukum."),
        t("Upload harmful code or content that is unlawful, misleading or infringes others’ rights.", "Mengunggah kode berbahaya atau konten yang melanggar hukum, menyesatkan atau melanggar hak orang lain."),
      ] },
    ],
  },
  {
    id: "data",
    h: t("9. Your data", "9. Data Anda"),
    body: [
      { p: t(
        "Health facilities own the medical records they create in the Services. We process them only to provide the Services, as described in the Privacy Policy and any data processing agreement, and they are stored in Indonesia. You can export your records at any time in a standard format.",
        "Fasilitas kesehatan memiliki rekam medis yang dibuatnya di Layanan. Kami memprosesnya hanya untuk menyediakan Layanan, sebagaimana dijelaskan dalam Kebijakan Privasi dan perjanjian pemrosesan data, dan rekam medis disimpan di Indonesia. Anda dapat mengekspor rekam medis kapan saja dalam format standar.") },
      { p: t(
        "The facility remains responsible for its legal duties as a health facility, including keeping medical records, obtaining patient consent and submitting data to SATUSEHAT and BPJS Kesehatan using its own credentials. The Services help you meet these duties.",
        "Fasilitas tetap bertanggung jawab atas kewajiban hukumnya sebagai fasilitas kesehatan, termasuk menyimpan rekam medis, memperoleh persetujuan pasien dan mengirim data ke SATUSEHAT dan BPJS Kesehatan dengan kredensialnya sendiri. Layanan membantu Anda memenuhi kewajiban tersebut.") },
    ],
  },
  {
    id: "offline",
    h: t("10. Working offline", "10. Bekerja secara offline"),
    body: [
      { p: t(
        "Our products work offline and sync when a connection returns. Until a device syncs, its latest entries exist only on that device, so connect regularly and keep devices secure. We are not responsible for entries lost because a device was damaged, reset or lost before it synced.",
        "Produk kami bekerja offline dan tersinkron saat koneksi kembali. Sebelum tersinkron, data terbaru hanya ada di perangkat tersebut, jadi sambungkan secara berkala dan jaga keamanan perangkat. Kami tidak bertanggung jawab atas data yang hilang karena perangkat rusak, direset atau hilang sebelum tersinkron.") },
    ],
  },
  {
    id: "fees",
    h: t("11. Plans, fees and trials", "11. Paket, biaya dan uji coba"),
    body: [
      { ul: [
        t("Some Services have a free plan with usage limits. Paid plans are priced as shown on our website or in your order at the time you subscribe, and include the taxes stated there.", "Sebagian Layanan memiliki paket gratis dengan batas pemakaian. Paket berbayar dikenai harga sesuai yang ditampilkan di situs atau pesanan Anda saat berlangganan, termasuk pajak yang tercantum."),
        t("We will give at least 30 days’ notice before changing the price of a paid plan. The change applies from your next billing period.", "Kami memberi pemberitahuan paling lambat 30 hari sebelum mengubah harga paket berbayar. Perubahan berlaku mulai periode tagihan berikutnya."),
        t("Trials and promotional offers follow the conditions stated with them.", "Uji coba dan penawaran promosi mengikuti syarat yang tercantum di dalamnya."),
        t("If a payment is overdue, we will remind you before limiting the account. Your records are never deleted because of a late payment, and you can still export them.", "Bila pembayaran terlambat, kami mengingatkan Anda sebelum membatasi akun. Rekam medis tidak pernah dihapus karena keterlambatan pembayaran, dan Anda tetap dapat mengekspornya."),
      ] },
    ],
  },
  {
    id: "third",
    h: t("12. Integrations and third-party services", "12. Integrasi dan layanan pihak ketiga"),
    body: [
      { p: t(
        "The Services connect to systems run by others, such as SATUSEHAT, BPJS Kesehatan, WhatsApp and app stores. Their availability and rules are set by their operators, and their own terms apply. We are not responsible for an outage or change on their side, but we will help you work around it where we can.",
        "Layanan terhubung ke sistem yang dijalankan pihak lain, seperti SATUSEHAT, BPJS Kesehatan, WhatsApp dan toko aplikasi. Ketersediaan dan aturannya ditentukan pengelolanya, dan ketentuan mereka berlaku. Kami tidak bertanggung jawab atas gangguan atau perubahan di pihak mereka, tetapi kami akan membantu Anda mencari jalan keluar sebisa mungkin.") },
    ],
  },
  {
    id: "ip",
    h: t("13. Intellectual property", "13. Hak kekayaan intelektual"),
    body: [
      { p: t(
        "The Services, the SahAIbat name and logo, our software, designs, guideline cards and content are protected by intellectual property law and remain ours or our licensors’. We give you a limited, non-exclusive, non-transferable right to use the Services under these terms. If you send us feedback, we may use it to improve the Services without obligation to you.",
        "Layanan, nama dan logo SahAIbat, perangkat lunak, desain, kartu pedoman dan konten kami dilindungi hukum kekayaan intelektual dan tetap milik kami atau pemberi lisensi kami. Kami memberi Anda hak terbatas, non-eksklusif dan tidak dapat dialihkan untuk menggunakan Layanan berdasarkan ketentuan ini. Bila Anda mengirim masukan, kami dapat memakainya untuk memperbaiki Layanan tanpa kewajiban kepada Anda.") },
    ],
  },
  {
    id: "availability",
    h: t("14. Availability and changes to the Services", "14. Ketersediaan dan perubahan Layanan"),
    body: [
      { p: t(
        "We work to keep the Services available and secure, and we schedule maintenance outside busy clinic hours where possible. We may improve, change or retire features. If we remove a feature you rely on in a paid plan, we will tell you in advance.",
        "Kami berupaya menjaga Layanan tetap tersedia dan aman, dan menjadwalkan pemeliharaan di luar jam sibuk klinik bila memungkinkan. Kami dapat menyempurnakan, mengubah atau menghentikan fitur. Bila kami menghapus fitur yang Anda andalkan dalam paket berbayar, kami memberi tahu lebih dahulu.") },
    ],
  },
  {
    id: "termination",
    h: t("15. Ending your use", "15. Mengakhiri penggunaan"),
    body: [
      { p: t(
        "You may stop using the Services and cancel at any time; a paid plan runs until the end of the period already paid. We may suspend or close an account that seriously or repeatedly breaks these terms or the law, after notice where it is safe to give it.",
        "Anda dapat berhenti menggunakan Layanan dan membatalkan langganan kapan saja; paket berbayar berlaku hingga akhir periode yang sudah dibayar. Kami dapat menangguhkan atau menutup akun yang melanggar ketentuan ini atau hukum secara serius atau berulang, dengan pemberitahuan bila aman untuk diberikan.") },
      { p: t(
        "After an account closes, you have at least 30 days to export your records. After that, data is deleted or returned to the facility, except where the law requires us to keep it.",
        "Setelah akun ditutup, Anda memiliki paling sedikit 30 hari untuk mengekspor rekam medis. Setelah itu, data dihapus atau dikembalikan ke fasilitas, kecuali hukum mewajibkan kami menyimpannya.") },
    ],
  },
  {
    id: "liability",
    h: t("16. Warranties and liability", "16. Jaminan dan tanggung jawab"),
    body: [
      { p: t(
        "We provide the Services with reasonable care and skill. Beyond that, and to the extent Indonesian law allows, the Services are provided “as is”, without a guarantee that they will be uninterrupted or error-free, or that Intelligence outputs will be correct.",
        "Kami menyediakan Layanan dengan kehati-hatian dan keahlian yang wajar. Di luar itu, dan sejauh diizinkan hukum Indonesia, Layanan disediakan “sebagaimana adanya”, tanpa jaminan akan selalu tersedia atau bebas kesalahan, atau bahwa hasil Intelligence selalu benar.") },
      { p: t(
        "To the extent Indonesian law allows, we are not liable for indirect or consequential loss, or for clinical decisions made by health workers. Our total liability for any claim is limited to the fees you paid us in the 12 months before the claim. Nothing in these terms limits liability that cannot be limited by law, or your rights as a consumer.",
        "Sejauh diizinkan hukum Indonesia, kami tidak bertanggung jawab atas kerugian tidak langsung atau lanjutan, atau atas keputusan klinis tenaga kesehatan. Tanggung jawab kami secara keseluruhan atas klaim apa pun terbatas pada biaya yang Anda bayarkan kepada kami dalam 12 bulan sebelum klaim. Tidak ada dalam ketentuan ini yang membatasi tanggung jawab yang tidak dapat dibatasi menurut hukum, atau hak Anda sebagai konsumen.") },
    ],
  },
  {
    id: "law",
    h: t("17. Governing law and disputes", "17. Hukum yang berlaku dan sengketa"),
    body: [
      { p: t(
        "These terms are governed by the laws of the Republic of Indonesia. If a dispute arises, we will first try to resolve it together in good faith (musyawarah) within 30 days. If that does not succeed, the dispute will be settled by the District Court of North Jakarta (Pengadilan Negeri Jakarta Utara), without limiting your rights under consumer protection law.",
        "Ketentuan ini tunduk pada hukum Republik Indonesia. Bila terjadi sengketa, kami akan lebih dulu berupaya menyelesaikannya secara musyawarah dengan iktikad baik dalam 30 hari. Bila tidak berhasil, sengketa diselesaikan melalui Pengadilan Negeri Jakarta Utara, tanpa mengurangi hak Anda menurut hukum perlindungan konsumen.") },
      { p: t(
        "These terms are made in Bahasa Indonesia and English. If the versions differ, the Bahasa Indonesia version prevails.",
        "Ketentuan ini dibuat dalam bahasa Indonesia dan bahasa Inggris. Bila terdapat perbedaan, versi bahasa Indonesia yang berlaku.") },
    ],
  },
  {
    id: "changes",
    h: t("18. Changes to these terms", "18. Perubahan ketentuan"),
    body: [
      { p: t(
        "We may update these terms as the Services or the law change. For a material change, we will tell users in the product or by email at least 30 days before it takes effect. If you do not agree, you may stop using the Services before then.",
        "Kami dapat memperbarui ketentuan ini sesuai perubahan Layanan atau hukum. Untuk perubahan penting, kami memberi tahu pengguna melalui produk atau email paling lambat 30 hari sebelum berlaku. Bila tidak setuju, Anda dapat berhenti menggunakan Layanan sebelum itu.") },
    ],
  },
  {
    id: "contact",
    h: t("19. Contact", "19. Kontak"),
    body: [
      { p: t(
        "Questions about these terms: admin@sahaibat.com. Privacy questions: privacy@sahaibat.com. Post: SahAIbat, Jl. Boulevard Raya No. 1, Kelapa Gading Timur, Jakarta 14240, Indonesia.",
        "Pertanyaan tentang ketentuan ini: admin@sahaibat.com. Pertanyaan privasi: privacy@sahaibat.com. Surat: SahAIbat, Jl. Boulevard Raya No. 1, Kelapa Gading Timur, Jakarta 14240, Indonesia.") },
    ],
  },
];
