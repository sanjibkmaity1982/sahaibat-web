// The SahAIbat privacy policy, in both languages. Structured to follow the
// UU PDP (UU No. 27 Tahun 2022) and the privacy principles of ISO/IEC 29100,
// with the PIMS controls of ISO/IEC 27701. Edit the text here; the page only
// lays it out.

export type T = { en: string; id: string };
export type Block =
  | { p: T }
  | { ul: T[] }
  | { table: { head: T[]; rows: T[][] } }
  | { note: T };
export type Section = { id: string; h: T; body: Block[] };

const t = (en: string, id: string): T => ({ en, id });

export const UPDATED = t("Last updated: 21 October 2026 · Version 2.0", "Terakhir diperbarui: 21 Oktober 2026 · Versi 2.0");

export const INTRO = t(
  "SahAIbat looks after some of the most personal information there is: the health of mothers, children, patients and families. This policy explains, in plain language, what personal data we process, why, where it is kept, who can see it, how SahAIbat Intelligence uses it, and the rights you have under Indonesian law.",
  "SahAIbat menjaga salah satu informasi paling pribadi: kesehatan ibu, anak, pasien dan keluarga. Kebijakan ini menjelaskan dengan bahasa yang jelas data pribadi apa yang kami proses, untuk apa, di mana disimpan, siapa yang dapat melihatnya, bagaimana SahAIbat Intelligence menggunakannya, serta hak Anda menurut hukum Indonesia.",
);

export const COMMITMENTS: { h: T; d: T }[] = [
  { h: t("Stored in Indonesia", "Disimpan di Indonesia"), d: t("Personal and health data are stored on servers in Jakarta.", "Data pribadi dan kesehatan disimpan di server di Jakarta.") },
  { h: t("No identities in training", "Tanpa identitas dalam pelatihan"), d: t("Names, NIK, dates of birth and other identifying details are never used to train models.", "Nama, NIK, tanggal lahir dan data identitas lain tidak pernah dipakai untuk melatih model.") },
  { h: t("Never sold", "Tidak pernah dijual"), d: t("We do not sell personal data or use it for advertising.", "Kami tidak menjual data pribadi atau memakainya untuk iklan.") },
  { h: t("A clinician decides", "Keputusan di tangan tenaga kesehatan"), d: t("Intelligence drafts and checks; a qualified person reviews and signs.", "Intelligence menyusun dan memeriksa; tenaga kesehatan yang meninjau dan menandatangani.") },
];

export const SECTIONS: Section[] = [
  {
    id: "scope",
    h: t("1. Scope of this policy", "1. Ruang lingkup kebijakan"),
    body: [
      { p: t(
        "This policy applies to the website www.sahaibat.com (including the Experience Zone), and to the SahAIbat products and services: SahAIbat Kader, SahAIbat Bidan, SahAIbat DOK, DOK Companion, Kasih, Code and Konsensus.id, together with their apps, browser extensions and support channels (the “Services”).",
        "Kebijakan ini berlaku untuk situs www.sahaibat.com (termasuk Zona Pengalaman), serta produk dan layanan SahAIbat: SahAIbat Kader, SahAIbat Bidan, SahAIbat DOK, DOK Companion, Kasih, Code dan Konsensus.id, beserta aplikasi, ekstensi peramban dan kanal dukungannya (“Layanan”).") },
      { p: t(
        "A product may have additional terms or an agreement with your organisation (for example a data processing agreement with a clinic). Where those are more protective, they apply in addition to this policy.",
        "Suatu produk dapat memiliki ketentuan tambahan atau perjanjian dengan organisasi Anda (misalnya perjanjian pemrosesan data dengan klinik). Bila ketentuan tersebut memberi perlindungan lebih, ketentuan itu berlaku bersama kebijakan ini.") },
    ],
  },
  {
    id: "who",
    h: t("2. Who we are and our role", "2. Siapa kami dan peran kami"),
    body: [
      { p: t(
        "SahAIbat is a brand owned by 11679210 Canada Inc (Viantra Health). In Indonesia it operates as SahAIbat Health, and globally as Orivera (together “SahAIbat”, “we”). In Indonesia we hold NIB 1202260248509 and are registered as an Electronic System Operator (PSE) with the Ministry of Communication and Digital Affairs (Komdigi). Our address is Jl. Boulevard Raya No. 1, Kelapa Gading Timur, Kec. Kelapa Gading, Jakarta, DKI Jakarta 14240, Indonesia.",
        "SahAIbat adalah merek milik 11679210 Canada Inc (Viantra Health). Di Indonesia beroperasi sebagai SahAIbat Health, dan secara global sebagai Orivera (bersama-sama “SahAIbat”, “kami”). Di Indonesia kami memiliki NIB 1202260248509 dan terdaftar sebagai Penyelenggara Sistem Elektronik (PSE) di Kementerian Komunikasi dan Digital (Komdigi). Alamat kami: Jl. Boulevard Raya No. 1, Kelapa Gading Timur, Kec. Kelapa Gading, Jakarta, DKI Jakarta 14240, Indonesia.") },
      { p: t("Under the UU PDP our role depends on whose data it is:", "Menurut UU PDP, peran kami bergantung pada data milik siapa:") },
      { table: {
        head: [t("Data", "Data"), t("Our role", "Peran kami"), t("What it means", "Artinya")],
        rows: [
          [t("Patient and clinical records kept by a clinic, practice, midwife, Posyandu or hospital", "Rekam medis dan data klinis yang dikelola klinik, praktik, bidan, Posyandu atau rumah sakit"),
           t("Data Processor (Prosesor Data Pribadi)", "Prosesor Data Pribadi"),
           t("The health facility is the Controller. We process the records only on its documented instructions and for no other purpose.", "Fasilitas kesehatan adalah Pengendali. Kami memproses rekam medis hanya atas instruksi tertulisnya dan tidak untuk tujuan lain.")],
          [t("Accounts of doctors, midwives, kaders and clinic staff; billing; support; website visitors; Kasih users who sign up themselves", "Akun dokter, bidan, kader dan staf klinik; tagihan; dukungan; pengunjung situs; pengguna Kasih yang mendaftar sendiri"),
           t("Data Controller (Pengendali Data Pribadi)", "Pengendali Data Pribadi"),
           t("We decide why and how the data is processed, and we are accountable for it under this policy.", "Kami menentukan tujuan dan cara pemrosesan, dan kami bertanggung jawab atasnya menurut kebijakan ini.")],
        ],
      } },
      { p: t(
        "If you are a patient and want to use your rights over your medical record, please contact your health facility first. We will help them respond, and you may also contact our Privacy Officer.",
        "Jika Anda pasien dan ingin menggunakan hak atas rekam medis Anda, silakan hubungi fasilitas kesehatan Anda terlebih dahulu. Kami akan membantu mereka menanggapi, dan Anda juga dapat menghubungi Pejabat Pelindungan Data kami.") },
    ],
  },
  {
    id: "officer",
    h: t("3. Privacy Officer (Data Protection Officer)", "3. Pejabat Pelindungan Data Pribadi"),
    body: [
      { p: t(
        "We have appointed a Privacy Officer, as required by Article 53 of the UU PDP, who oversees compliance with this policy and is your point of contact for any privacy question, request or complaint.",
        "Kami telah menunjuk Pejabat Pelindungan Data Pribadi sesuai Pasal 53 UU PDP, yang mengawasi kepatuhan terhadap kebijakan ini dan menjadi titik kontak Anda untuk setiap pertanyaan, permintaan atau keluhan privasi.") },
      { ul: [
        t("Privacy Officer: Shindy Farah · shindyfarrah@sahaibat.com", "Pejabat Pelindungan Data: Shindy Farah · shindyfarrah@sahaibat.com"),
        t("Privacy team: privacy@sahaibat.com", "Tim privasi: privacy@sahaibat.com"),
        t("Post: Privacy Officer, SahAIbat Health, Jl. Boulevard Raya No. 1, Kelapa Gading Timur, Jakarta 14240, Indonesia", "Surat: Pejabat Pelindungan Data, SahAIbat Health, Jl. Boulevard Raya No. 1, Kelapa Gading Timur, Jakarta 14240, Indonesia"),
      ] },
    ],
  },
  {
    id: "data",
    h: t("4. Personal data we process", "4. Data pribadi yang kami proses"),
    body: [
      { p: t("We collect only what each Service needs (data minimisation). Depending on the Service:", "Kami hanya mengumpulkan yang dibutuhkan tiap Layanan (minimalisasi data). Tergantung Layanannya:") },
      { table: {
        head: [t("Category", "Kategori"), t("Examples", "Contoh"), t("Source", "Sumber")],
        rows: [
          [t("Identity and contact", "Identitas dan kontak"), t("Name, NIK, date of birth, sex, address, phone, email, BPJS number", "Nama, NIK, tanggal lahir, jenis kelamin, alamat, telepon, email, nomor BPJS"), t("The patient or family, the health facility, or you", "Pasien atau keluarga, fasilitas kesehatan, atau Anda")],
          [t("Health data (specific personal data)", "Data kesehatan (data pribadi spesifik)"), t("Consultations, diagnoses, vital signs, prescriptions, lab and radiology results, pregnancy, birth, postnatal, family planning and immunisation records, child growth", "Konsultasi, diagnosis, tanda vital, resep, hasil lab dan radiologi, catatan kehamilan, persalinan, nifas, KB dan imunisasi, pertumbuhan anak"), t("Health workers using the Services", "Tenaga kesehatan pengguna Layanan")],
          [t("Children’s data (specific personal data)", "Data anak (data pribadi spesifik)"), t("Growth measurements, immunisation, development checks", "Pengukuran pertumbuhan, imunisasi, pemeriksaan perkembangan"), t("Kaders, midwives and doctors, with the parent or guardian", "Kader, bidan dan dokter, bersama orang tua atau wali")],
          [t("Consultation recordings", "Rekaman konsultasi"), t("Audio of a consultation, when the doctor chooses to record, to create a SOAP draft", "Audio konsultasi, bila dokter memilih merekam, untuk menyusun draf SOAP"), t("The doctor, with the patient’s knowledge", "Dokter, sepengetahuan pasien")],
          [t("Professional and account data", "Data profesional dan akun"), t("Name, STR/SIP, facility, role, login details, settings", "Nama, STR/SIP, fasilitas, peran, data masuk, pengaturan"), t("You or your organisation", "Anda atau organisasi Anda")],
          [t("Billing data", "Data tagihan"), t("Plan, invoices, payment status (card details are handled by the payment provider, not by us)", "Paket, faktur, status pembayaran (data kartu ditangani penyedia pembayaran, bukan kami)"), t("You", "Anda")],
          [t("Technical and security data", "Data teknis dan keamanan"), t("IP address, device and browser type, access logs, a salted hash of the IP for rate limits", "Alamat IP, jenis perangkat dan peramban, log akses, hash IP bergaram untuk pembatasan pemakaian"), t("Your device", "Perangkat Anda")],
          [t("Communications", "Komunikasi"), t("Messages to support, sales or partnerships, by email, WhatsApp or forms", "Pesan ke dukungan, penjualan atau kemitraan, lewat email, WhatsApp atau formulir"), t("You", "Anda")],
        ],
      } },
    ],
  },
  {
    id: "purposes",
    h: t("5. Why we process it, and the legal basis", "5. Tujuan pemrosesan dan dasar hukumnya"),
    body: [
      { p: t("We process personal data only for specified, explicit and legitimate purposes, each with a legal basis under Article 20 of the UU PDP:", "Kami memproses data pribadi hanya untuk tujuan yang spesifik, jelas dan sah, masing-masing dengan dasar hukum menurut Pasal 20 UU PDP:") },
      { table: {
        head: [t("Purpose", "Tujuan"), t("Legal basis", "Dasar hukum")],
        rows: [
          [t("Providing the Services: records, documentation, prescriptions, referrals, reports", "Menyediakan Layanan: rekam medis, dokumentasi, resep, rujukan, laporan"), t("Performance of a contract with the health facility or user; the facility’s legal duty to keep medical records", "Pelaksanaan perjanjian dengan fasilitas kesehatan atau pengguna; kewajiban hukum fasilitas menyimpan rekam medis")],
          [t("Sending data to SATUSEHAT and BPJS Kesehatan", "Mengirim data ke SATUSEHAT dan BPJS Kesehatan"), t("Legal obligation of the health facility (Permenkes 24/2022; JKN rules)", "Kewajiban hukum fasilitas kesehatan (Permenkes 24/2022; ketentuan JKN)")],
          [t("SahAIbat Intelligence: drafting notes, guideline and drug-safety checks, reading reports", "SahAIbat Intelligence: menyusun catatan, cek pedoman dan keamanan obat, membaca laporan"), t("Performance of a contract, on the facility’s instructions; consent for recordings", "Pelaksanaan perjanjian, atas instruksi fasilitas; persetujuan untuk rekaman")],
          [t("Account management, billing, support", "Pengelolaan akun, tagihan, dukungan"), t("Performance of a contract", "Pelaksanaan perjanjian")],
          [t("Security, fraud and abuse prevention, service reliability", "Keamanan, pencegahan penipuan dan penyalahgunaan, keandalan layanan"), t("Legitimate interest, balanced against your rights", "Kepentingan yang sah, diseimbangkan dengan hak Anda")],
          [t("Product news and offers to professional users", "Kabar produk dan penawaran untuk pengguna profesional"), t("Consent, which you can withdraw at any time", "Persetujuan, yang dapat Anda tarik kapan saja")],
          [t("Emergencies where someone’s life is at risk", "Keadaan darurat yang mengancam jiwa"), t("Vital interests", "Kepentingan vital")],
        ],
      } },
      { p: t("We do not use personal data for a new purpose that is incompatible with the original one without telling you and, where required, asking for consent.", "Kami tidak memakai data pribadi untuk tujuan baru yang tidak sejalan dengan tujuan awal tanpa memberi tahu Anda dan, bila diwajibkan, meminta persetujuan.") },
    ],
  },
  {
    id: "specific",
    h: t("6. Health data and children’s data", "6. Data kesehatan dan data anak"),
    body: [
      { p: t(
        "Health data and children’s data are specific personal data under Article 4 of the UU PDP. We apply stronger safeguards to them: encryption, strict role-based access, access logging, and a data protection impact assessment before any new processing that carries high risk.",
        "Data kesehatan dan data anak termasuk data pribadi spesifik menurut Pasal 4 UU PDP. Kami menerapkan perlindungan lebih ketat: enkripsi, akses ketat berbasis peran, pencatatan akses, dan penilaian dampak pelindungan data sebelum pemrosesan baru yang berisiko tinggi.") },
      { p: t(
        "Children’s data is processed with the consent or knowledge of a parent or legal guardian, as required by Article 25 of the UU PDP, and only for the child’s care.",
        "Data anak diproses dengan persetujuan atau sepengetahuan orang tua atau wali sesuai Pasal 25 UU PDP, dan hanya untuk perawatan anak tersebut.") },
    ],
  },
  {
    id: "intelligence",
    h: t("7. Safe use of SahAIbat Intelligence", "7. Penggunaan SahAIbat Intelligence yang aman"),
    body: [
      { p: t("SahAIbat Intelligence (including DOK Intelligence) supports health workers; it never replaces them. These guardrails apply to every product:", "SahAIbat Intelligence (termasuk DOK Intelligence) mendukung tenaga kesehatan, bukan menggantikannya. Pengaman berikut berlaku di setiap produk:") },
      { table: {
        head: [t("Guardrail", "Pengaman"), t("What it means", "Artinya")],
        rows: [
          [t("A person decides", "Manusia yang memutuskan"), t("Every note, code, plan or message is a draft until a qualified health worker reviews, edits and signs it. Diagnosis, treatment and referral are always decided by the health worker.", "Setiap catatan, kode, rencana atau pesan adalah draf sampai tenaga kesehatan yang berwenang meninjau, mengedit dan menandatanganinya. Diagnosis, pengobatan dan rujukan selalu diputuskan tenaga kesehatan.")],
          [t("No automated decisions", "Tanpa keputusan otomatis"), t("Intelligence makes no decision with legal or similarly significant effect on a patient, and never contacts a patient on its own. Messages are sent only after a health worker approves them.", "Intelligence tidak membuat keputusan yang berdampak hukum atau signifikan bagi pasien, dan tidak pernah menghubungi pasien sendiri. Pesan hanya dikirim setelah disetujui tenaga kesehatan.")],
          [t("Calculated, not guessed", "Dihitung, bukan ditebak"), t("Clinical calculations and risk thresholds, such as WHO growth z-scores, pregnancy risk flags and drug-safety checks, are computed by fixed, tested rules.", "Perhitungan klinis dan ambang risiko, seperti skor-z pertumbuhan WHO, tanda risiko kehamilan dan cek keamanan obat, dihitung dengan aturan tetap yang teruji.")],
          [t("Grounded in what was said", "Berdasarkan percakapan"), t("A note is never made from an empty recording. Lines that were inferred rather than said are marked, and drafts are checked against the consultation.", "Catatan tidak pernah dibuat dari rekaman kosong. Baris hasil simpulan ditandai, dan draf dicocokkan dengan isi konsultasi.")],
          [t("Indonesian standards", "Standar Indonesia"), t("Clinical support follows national guidelines and professional bodies (such as Kemenkes, PERKI, PERKENI, IDAI and POGI), with the source shown.", "Dukungan klinis mengikuti pedoman nasional dan organisasi profesi (seperti Kemenkes, PERKI, PERKENI, IDAI dan POGI), dengan sumber yang ditampilkan.")],
          [t("Safe by design", "Aman sejak rancangan"), t("Intelligence suggests no medicine dose that the health worker did not state, refuses requests that are not clinical, and treats text inside a record only as information, never as instructions.", "Intelligence tidak menyarankan dosis obat yang tidak disebutkan tenaga kesehatan, menolak permintaan non-klinis, dan memperlakukan teks dalam rekam medis hanya sebagai informasi, bukan perintah.")],
          [t("Only what is needed", "Hanya yang dibutuhkan"), t("Each task uses only the data it needs, and only for that task.", "Setiap tugas hanya memakai data yang dibutuhkan, dan hanya untuk tugas itu.")],
          [t("Monitored and improved", "Dipantau dan diperbaiki"), t("Quality and safety are reviewed continuously. Any safety concern reported by a health worker is investigated, and fixes are tested before release.", "Mutu dan keamanan ditinjau terus-menerus. Setiap masalah keamanan yang dilaporkan tenaga kesehatan diselidiki, dan perbaikan diuji sebelum dirilis.")],
        ],
      } },
      { p: t("You have the right to object to decisions based solely on automated processing (Article 10 UU PDP). Contact us and a person will review it.", "Anda berhak menolak keputusan yang semata-mata berdasarkan pemrosesan otomatis (Pasal 10 UU PDP). Hubungi kami dan seseorang akan meninjaunya.") },
    ],
  },
  {
    id: "training",
    h: t("8. Model training: our commitment", "8. Pelatihan model: komitmen kami"),
    body: [
      { note: t(
        "Identifying details are never used to train any model: names, NIK, dates of birth, addresses, phone numbers, email addresses, BPJS numbers, photos or any other detail that identifies a patient, family, health worker or facility. Nor are account, billing or usage data, or demographic data used for profiling.",
        "Data identitas tidak pernah dipakai untuk melatih model apa pun: nama, NIK, tanggal lahir, alamat, nomor telepon, email, nomor BPJS, foto atau detail lain yang mengidentifikasi pasien, keluarga, tenaga kesehatan atau fasilitas. Demikian pula data akun, tagihan, pemakaian, atau data demografi untuk profiling.") },
      { p: t(
        "To make DOK Intelligence more accurate for Indonesian clinical language, we may learn from how doctors correct its drafts. When we do, these rules apply:",
        "Agar DOK Intelligence makin akurat untuk bahasa klinis Indonesia, kami dapat belajar dari cara dokter mengoreksi drafnya. Bila itu dilakukan, aturan berikut berlaku:") },
      { ul: [
        t("Only facilities that agree in writing take part (opt-in). It is never switched on by default, and a facility can withdraw at any time, with its data removed from future training.", "Hanya fasilitas yang setuju secara tertulis yang ikut serta (opt-in). Tidak pernah aktif secara bawaan, dan fasilitas dapat berhenti kapan saja; datanya dikeluarkan dari pelatihan berikutnya."),
        t("Only the clinical text is used: the draft and the doctor’s signed correction. Identifying details are removed before any example is used, including names spoken during a consultation.", "Hanya teks klinis yang dipakai: draf dan koreksi yang ditandatangani dokter. Data identitas dihapus sebelum contoh dipakai, termasuk nama yang terucap saat konsultasi."),
        t("Training runs only on infrastructure we operate in Jakarta. The data does not leave Indonesia for training, and the resulting model is never sold or shared with third parties.", "Pelatihan hanya berjalan di infrastruktur yang kami operasikan di Jakarta. Data tidak keluar dari Indonesia untuk pelatihan, dan model yang dihasilkan tidak pernah dijual atau dibagikan ke pihak ketiga."),
        t("A data protection impact assessment is completed before training begins, and the model is checked so that it cannot reproduce an individual record.", "Penilaian dampak pelindungan data diselesaikan sebelum pelatihan dimulai, dan model diperiksa agar tidak dapat mereproduksi rekam medis individu."),
        t("Our technology partners are never permitted to use our customers’ data to train their own models.", "Mitra teknologi kami tidak pernah diizinkan memakai data pelanggan kami untuk melatih model mereka."),
        t("Kader, Bidan, Kasih, Code, the Experience Zone and all other Services: no customer data of any kind is used for training.", "Kader, Bidan, Kasih, Code, Zona Pengalaman dan semua Layanan lain: tidak ada data pelanggan apa pun yang dipakai untuk pelatihan."),
      ] },
    ],
  },
  {
    id: "location",
    h: t("9. Where your data is stored", "9. Di mana data Anda disimpan"),
    body: [
      { note: t(
        "All personal data and health records are stored in Indonesia, in secure data centres in Jakarta. Your records are not stored outside Indonesia.",
        "Seluruh data pribadi dan rekam medis disimpan di Indonesia, di pusat data yang aman di Jakarta. Rekam medis Anda tidak disimpan di luar Indonesia.") },
      { p: t(
        "Storing data in Indonesia keeps it under Indonesian law and supervision, in line with the UU PDP and the rules on electronic medical records.",
        "Penyimpanan di Indonesia menjaga data tetap berada di bawah hukum dan pengawasan Indonesia, sesuai UU PDP dan ketentuan rekam medis elektronik.") },
    ],
  },
  {
    id: "offline",
    h: t("9a. Working offline", "9a. Bekerja secara offline"),
    body: [
      { p: t(
        "Our products are built to work without a connection, because many health posts in Indonesia have no reliable signal. When a device is offline, the data entered is saved on that device in encrypted storage, available only to the signed-in user, and sent to our servers in Indonesia when the connection returns. After a successful sync, the device keeps only what the user needs to keep working.",
        "Produk kami dibuat untuk bekerja tanpa koneksi, karena banyak fasilitas kesehatan di Indonesia tidak memiliki sinyal yang andal. Saat perangkat offline, data yang dimasukkan disimpan di perangkat dalam penyimpanan terenkripsi, hanya dapat diakses pengguna yang masuk, dan dikirim ke server kami di Indonesia saat koneksi kembali. Setelah sinkronisasi berhasil, perangkat hanya menyimpan yang dibutuhkan pengguna untuk tetap bekerja.") },
      { p: t(
        "Health facilities are responsible for keeping their devices secure (a screen lock, and telling us at once if a device is lost or stolen so that we can sign it out). We can revoke a device’s access remotely.",
        "Fasilitas kesehatan bertanggung jawab menjaga keamanan perangkatnya (kunci layar, dan segera memberi tahu kami bila perangkat hilang atau dicuri agar kami dapat mengeluarkannya). Kami dapat mencabut akses perangkat dari jarak jauh.") },
    ],
  },
  {
    id: "sharing",
    h: t("10. Who we share data with", "10. Dengan siapa kami berbagi data"),
    body: [
      { p: t("We never sell personal data and never use it for advertising. We share it only:", "Kami tidak pernah menjual data pribadi dan tidak pernah memakainya untuk iklan. Kami membagikannya hanya:") },
      { ul: [
        t("With the health facility that the record belongs to, and the health workers it authorises.", "Dengan fasilitas kesehatan pemilik rekam medis, dan tenaga kesehatan yang diberi wewenang olehnya."),
        t("With SATUSEHAT (Ministry of Health) and BPJS Kesehatan, when the facility submits data as the law requires.", "Dengan SATUSEHAT (Kementerian Kesehatan) dan BPJS Kesehatan, saat fasilitas mengirim data sesuai kewajiban hukum."),
        t("With another facility, pharmacy or the patient, when a health worker sends a referral, prescription or message.", "Dengan fasilitas lain, apotek atau pasien, saat tenaga kesehatan mengirim rujukan, resep atau pesan."),
        t("With service providers who process data for us under a written agreement with confidentiality and security obligations (sub-processors): cloud hosting and technology services, messaging (such as WhatsApp), email and payments. They may use the data only to provide their service to us.", "Dengan penyedia layanan yang memproses data untuk kami berdasarkan perjanjian tertulis dengan kewajiban kerahasiaan dan keamanan (sub-prosesor): hosting cloud dan layanan teknologi, pesan (seperti WhatsApp), email dan pembayaran. Mereka hanya boleh memakai data untuk memberi layanan kepada kami."),
        t("With authorities, when required by Indonesian law or a valid order, and only to the extent required.", "Dengan otoritas, bila diwajibkan hukum Indonesia atau perintah yang sah, dan hanya sebatas yang diwajibkan."),
        t("With a successor, if our business is reorganised or transferred, under the same protections and after notifying you, as required by Article 48 of the UU PDP.", "Dengan penerus, bila usaha kami direorganisasi atau dialihkan, dengan perlindungan yang sama dan setelah memberi tahu Anda sesuai Pasal 48 UU PDP."),
      ] },
      { p: t("A current list of sub-processors is available on request from privacy@sahaibat.com.", "Daftar sub-prosesor terkini tersedia atas permintaan ke privacy@sahaibat.com.") },
    ],
  },
  {
    id: "security",
    h: t("11. How we protect data", "11. Cara kami melindungi data"),
    body: [
      { p: t("Our information security controls are aligned with ISO/IEC 27001 and ISO/IEC 27701, and include:", "Kontrol keamanan informasi kami selaras dengan ISO/IEC 27001 dan ISO/IEC 27701, termasuk:") },
      { ul: [
        t("Encryption of clinical data at rest (AES-256-GCM) and in transit (TLS).", "Enkripsi data klinis saat disimpan (AES-256-GCM) dan saat dikirim (TLS)."),
        t("NIK stored as a one-way hash for matching, so it is not readable in search.", "NIK disimpan sebagai hash satu arah untuk pencocokan, sehingga tidak terbaca saat pencarian."),
        t("Role-based access: each person sees only what their role at their facility allows.", "Akses berbasis peran: setiap orang hanya melihat yang diizinkan perannya di fasilitasnya."),
        t("An access log of who viewed or changed a record, available to the facility.", "Log akses tentang siapa yang melihat atau mengubah rekam medis, tersedia bagi fasilitas."),
        t("Separation of each facility’s data, backups, and tested recovery.", "Pemisahan data tiap fasilitas, cadangan, dan pemulihan yang teruji."),
        t("Confidentiality agreements, privacy training and least-privilege access for our staff.", "Perjanjian kerahasiaan, pelatihan privasi dan akses seminimal mungkin bagi staf kami."),
        t("Security testing, vulnerability management and a documented incident response plan.", "Pengujian keamanan, pengelolaan kerentanan dan rencana tanggap insiden yang terdokumentasi."),
      ] },
    ],
  },
  {
    id: "breach",
    h: t("12. If a data breach happens", "12. Bila terjadi kegagalan pelindungan data"),
    body: [
      { p: t(
        "If a personal data breach occurs, we act at once to contain it. As required by Article 46 of the UU PDP, we notify the affected people and the relevant authority in writing within 3 × 24 hours, explaining what data was involved, when and how it happened, and what we are doing about it. Where we act as Processor, we notify the health facility without delay so that it can meet its own obligations.",
        "Bila terjadi kegagalan pelindungan data pribadi, kami segera bertindak untuk menanganinya. Sesuai Pasal 46 UU PDP, kami memberi tahu secara tertulis orang yang terdampak dan otoritas terkait paling lambat 3 × 24 jam, menjelaskan data yang terdampak, kapan dan bagaimana terjadi, serta langkah yang kami ambil. Bila kami bertindak sebagai Prosesor, kami segera memberi tahu fasilitas kesehatan agar dapat memenuhi kewajibannya.") },
    ],
  },
  {
    id: "retention",
    h: t("13. How long we keep data", "13. Berapa lama data disimpan"),
    body: [
      { table: {
        head: [t("Data", "Data"), t("Retention", "Masa simpan")],
        rows: [
          [t("Medical records", "Rekam medis"), t("As the health facility instructs, and at least as long as Permenkes 24/2022 requires (25 years from the last visit for electronic medical records)", "Sesuai instruksi fasilitas kesehatan, dan paling singkat sesuai Permenkes 24/2022 (25 tahun sejak kunjungan terakhir untuk rekam medis elektronik)")],
          [t("Consultation recordings", "Rekaman konsultasi"), t("Used to create the draft and not kept as part of the record, unless the facility chooses otherwise", "Dipakai untuk menyusun draf dan tidak disimpan sebagai bagian rekam medis, kecuali fasilitas memilih lain")],
          [t("Account and billing data", "Data akun dan tagihan"), t("While the account is active, then as long as tax and accounting law requires (generally 10 years for financial records)", "Selama akun aktif, lalu selama diwajibkan hukum pajak dan akuntansi (umumnya 10 tahun untuk catatan keuangan)")],
          [t("Support and enquiry messages", "Pesan dukungan dan pertanyaan"), t("Up to 2 years after the last contact", "Hingga 2 tahun setelah kontak terakhir")],
          [t("Security and access logs", "Log keamanan dan akses"), t("Up to 12 months, longer for an open investigation", "Hingga 12 bulan, lebih lama bila sedang diselidiki")],
          [t("Experience Zone text", "Teks Zona Pengalaman"), t("Not stored. Rate-limit counters use a salted hash of the IP and expire within 24 hours", "Tidak disimpan. Penghitung batas pemakaian memakai hash IP bergaram dan kedaluwarsa dalam 24 jam")],
        ],
      } },
      { p: t("When data is no longer needed, it is deleted or irreversibly anonymised.", "Bila data tidak lagi dibutuhkan, data dihapus atau dianonimkan secara permanen.") },
    ],
  },
  {
    id: "rights",
    h: t("14. Your rights", "14. Hak Anda"),
    body: [
      { p: t("Under Articles 5 to 13 of the UU PDP you have the right to:", "Menurut Pasal 5 sampai 13 UU PDP, Anda berhak untuk:") },
      { ul: [
        t("Be informed about who processes your data, why, and on what basis.", "Mendapat informasi tentang siapa yang memproses data Anda, untuk apa, dan atas dasar apa."),
        t("Access your data and get a copy.", "Mengakses data Anda dan mendapatkan salinannya."),
        t("Correct inaccurate or incomplete data.", "Memperbaiki data yang tidak akurat atau tidak lengkap."),
        t("Ask us to stop processing, delete or destroy your data, where the law allows.", "Meminta kami mengakhiri pemrosesan, menghapus atau memusnahkan data Anda, sejauh diizinkan hukum."),
        t("Withdraw consent you have given, at any time.", "Menarik persetujuan yang telah diberikan, kapan saja."),
        t("Object to decisions based solely on automated processing, including profiling.", "Menolak keputusan yang semata-mata berdasarkan pemrosesan otomatis, termasuk profiling."),
        t("Delay or restrict processing.", "Menunda atau membatasi pemrosesan."),
        t("Receive your data in a commonly used, machine-readable format, and have it sent to another controller.", "Menerima data Anda dalam format umum yang dapat dibaca mesin, dan memindahkannya ke pengendali lain."),
        t("Claim compensation for a breach of the law in processing your data.", "Menuntut ganti rugi atas pelanggaran pemrosesan data Anda."),
      ] },
      { p: t(
        "To use a right, email privacy@sahaibat.com or our Privacy Officer. We will verify your identity and respond within the time the UU PDP sets, generally 3 × 24 hours. There is no charge. Some rights are limited by other laws: a medical record, for example, cannot be deleted while the law requires the facility to keep it.",
        "Untuk menggunakan hak, kirim email ke privacy@sahaibat.com atau Pejabat Pelindungan Data kami. Kami akan memverifikasi identitas Anda dan menanggapi dalam waktu yang ditetapkan UU PDP, umumnya 3 × 24 jam. Tanpa biaya. Beberapa hak dibatasi undang-undang lain: rekam medis, misalnya, tidak dapat dihapus selama hukum mewajibkan fasilitas menyimpannya.") },
    ],
  },
  {
    id: "website",
    h: t("15. This website and the Experience Zone", "15. Situs ini dan Zona Pengalaman"),
    body: [
      { ul: [
        t("The website uses no advertising or tracking cookies and no third-party analytics.", "Situs ini tidak memakai cookie iklan atau pelacak dan tidak memakai analitik pihak ketiga."),
        t("Your browser stores your language choice locally. It never leaves your device.", "Peramban Anda menyimpan pilihan bahasa secara lokal. Tidak pernah keluar dari perangkat Anda."),
        t("The Experience Zone is a public demonstration. Please do not enter real patient information. Text containing a NIK, phone number or email address is refused.", "Zona Pengalaman adalah demonstrasi publik. Mohon jangan memasukkan data pasien sungguhan. Teks yang berisi NIK, nomor telepon atau alamat email akan ditolak."),
        t("Text you type in the Experience Zone is used only to produce the demonstration. It is not stored, not linked to you, and not used for training.", "Teks yang Anda ketik di Zona Pengalaman hanya dipakai untuk menghasilkan demonstrasi. Teks tersebut tidak disimpan, tidak dikaitkan dengan Anda, dan tidak dipakai untuk pelatihan."),
        t("To prevent abuse, the Experience Zone uses Cloudflare Turnstile, which checks that a visitor is human, and counts runs using a salted hash of the IP address.", "Untuk mencegah penyalahgunaan, Zona Pengalaman memakai Cloudflare Turnstile untuk memastikan pengunjung adalah manusia, dan menghitung pemakaian dengan hash alamat IP bergaram."),
      ] },
    ],
  },
  {
    id: "standards",
    h: t("16. Laws and standards we follow", "16. Hukum dan standar yang kami ikuti"),
    body: [
      { ul: [
        t("UU No. 27 Tahun 2022 on Personal Data Protection (UU PDP)", "UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)"),
        t("UU No. 17 Tahun 2023 on Health, and Permenkes No. 24 Tahun 2022 on Medical Records", "UU No. 17 Tahun 2023 tentang Kesehatan, dan Permenkes No. 24 Tahun 2022 tentang Rekam Medis"),
        t("UU ITE and PP No. 71 Tahun 2019 on Electronic Systems and Transactions", "UU ITE dan PP No. 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik"),
        t("ISO/IEC 29100 privacy principles, ISO/IEC 27701 privacy information management and ISO/IEC 27001 information security, as the framework for our controls", "Prinsip privasi ISO/IEC 29100, manajemen informasi privasi ISO/IEC 27701 dan keamanan informasi ISO/IEC 27001, sebagai kerangka kontrol kami"),
      ] },
    ],
  },
  {
    id: "changes",
    h: t("17. Changes to this policy", "17. Perubahan kebijakan"),
    body: [
      { p: t(
        "We review this policy at least once a year. If we make a material change, we will tell users of the Services in the product or by email before it takes effect, and ask for consent where the law requires. The date and version at the top show the latest update.",
        "Kami meninjau kebijakan ini paling sedikit setahun sekali. Bila ada perubahan penting, kami memberi tahu pengguna Layanan melalui produk atau email sebelum berlaku, dan meminta persetujuan bila diwajibkan hukum. Tanggal dan versi di bagian atas menunjukkan pembaruan terakhir.") },
    ],
  },
  {
    id: "complaints",
    h: t("18. Questions and complaints", "18. Pertanyaan dan keluhan"),
    body: [
      { p: t(
        "Please contact our Privacy Officer first; we take every concern seriously and will reply in writing. If you are not satisfied, you may complain to the personal data protection authority in Indonesia or the Ministry of Communication and Digital Affairs (Komdigi). This policy is governed by the laws of the Republic of Indonesia. If the English and Bahasa Indonesia versions differ, the Bahasa Indonesia version prevails.",
        "Silakan hubungi Pejabat Pelindungan Data kami terlebih dahulu; setiap keluhan kami tanggapi dengan serius dan kami balas secara tertulis. Bila belum puas, Anda dapat mengadu ke lembaga pelindungan data pribadi di Indonesia atau Kementerian Komunikasi dan Digital (Komdigi). Kebijakan ini tunduk pada hukum Republik Indonesia. Bila versi bahasa Inggris dan bahasa Indonesia berbeda, versi bahasa Indonesia yang berlaku.") },
    ],
  },
];
