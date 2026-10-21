// lib/experience/anc.ts
//
// Maternal risk screening for the Bidan experience (pregnancy and postpartum). The AI only pulls the numbers
// out of the visit note; these thresholds are applied here, in code, so a risk
// is never missed or invented by the model. Thresholds follow common Kemenkes
// ANC guidance (Buku KIA, Permenkes 21/2021 practice):
//   - blood pressure ≥ 140/90: hypertension in pregnancy; ≥ 160/110 severe
//   - Hb < 11 g/dL: anaemia; < 7 g/dL severe
//   - LILA < 23.5 cm: chronic energy deficiency (KEK)
//   - maternal age < 20 or > 35
//   - fetal heart rate outside 120–160 bpm (from 20 weeks)

export type AncFacts = {
  age_years: number | null;
  ga_weeks: number | null;
  bp_systolic: number | null;
  bp_diastolic: number | null;
  hb_g_dl: number | null;
  lila_cm: number | null;
  fhr_bpm: number | null;
};

export type AncRisk = { level: "high" | "medium"; en: string; id: string };

const idn = (n: number | null) => String(n).replace(".", ","); // Bahasa decimal comma

export function screenAnc(f: AncFacts, phase: "pregnancy" | "postpartum" = "pregnancy"): { risks: AncRisk[]; referNow: boolean } {
  const post = phase === "postpartum";
  const risks: AncRisk[] = [];
  const sys = f.bp_systolic, dia = f.bp_diastolic;
  const bp = `${sys ?? "?"}/${dia ?? "?"}`;
  if ((sys ?? 0) >= 160 || (dia ?? 0) >= 110)
    risks.push({ level: "high", en: `Severe hypertension (${bp}): refer now and screen for pre-eclampsia.`, id: `Hipertensi berat (${bp}): rujuk segera dan skrining preeklampsia.` });
  else if ((sys ?? 0) >= 140 || (dia ?? 0) >= 90)
    risks.push(post
      ? { level: "high", en: `Postpartum hypertension (${bp}): check urine protein and refer for postpartum pre-eclampsia assessment.`, id: `Hipertensi pascapersalinan (${bp}): periksa protein urin dan rujuk untuk penilaian preeklampsia pascapersalinan.` }
      : { level: "high", en: `Hypertension in pregnancy (${bp}): check urine protein and refer for pre-eclampsia assessment.`, id: `Hipertensi dalam kehamilan (${bp}): periksa protein urin dan rujuk untuk penilaian preeklampsia.` });
  if (f.hb_g_dl != null) {
    if (f.hb_g_dl < 7) risks.push({ level: "high", en: `Severe anaemia (Hb ${f.hb_g_dl} g/dL): refer.`, id: `Anemia berat (Hb ${idn(f.hb_g_dl)} g/dL): rujuk.` });
    else if (f.hb_g_dl < 11) risks.push({ level: "medium", en: `Anaemia (Hb ${f.hb_g_dl} g/dL): iron tablets and follow-up Hb.`, id: `Anemia (Hb ${idn(f.hb_g_dl)} g/dL): tablet tambah darah dan cek Hb ulang.` });
  }
  if (!post && f.lila_cm != null && f.lila_cm < 23.5)
    risks.push({ level: "medium", en: `Chronic energy deficiency (LILA ${f.lila_cm} cm): nutrition support.`, id: `Kurang energi kronis (LILA ${idn(f.lila_cm)} cm): dukungan gizi (PMT ibu hamil).` });
  if (!post && f.age_years != null && (f.age_years < 20 || f.age_years > 35))
    risks.push({ level: "medium", en: `Maternal age ${f.age_years}: higher-risk pregnancy, closer monitoring.`, id: `Usia ibu ${f.age_years} tahun: kehamilan berisiko, pemantauan lebih ketat.` });
  if (!post && f.fhr_bpm != null && (f.ga_weeks ?? 0) >= 20 && (f.fhr_bpm < 120 || f.fhr_bpm > 160))
    risks.push({ level: "high", en: `Fetal heart rate ${f.fhr_bpm} bpm is outside 120–160: refer now.`, id: `Denyut jantung janin ${f.fhr_bpm}x/menit di luar 120–160: rujuk segera.` });
  return { risks, referNow: risks.some((r) => r.level === "high") };
}
