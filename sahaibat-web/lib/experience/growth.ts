// lib/experience/growth.ts
//
// Child growth status for the Kader experience, computed here and never by the
// AI: WHO Child Growth Standards z-scores (LMS method, with WHO's restricted
// computation beyond ±3 SD for the weight indicators) and the Indonesian
// categories of Permenkes No. 2/2020 on child anthropometry.

import { WHO } from "./who-growth";

export type Sex = "L" | "P"; // laki-laki / perempuan, as on the KMS

export type GrowthInput = {
  sex: Sex;
  ageMonths: number; // 0-59
  weightKg: number;
  lengthCm: number; // recumbent length under 24 months, standing height from 24 months
  prevWeightKg?: number | null; // last month's weight, for the trend
  muacCm?: number | null; // LILA, 6-59 months
};

type LMS = [number, number, number];

function z(x: number, [l, m, s]: LMS, restricted: boolean): number {
  const raw = l === 0 ? Math.log(x / m) / s : ((x / m) ** l - 1) / (l * s);
  if (!restricted || Math.abs(raw) <= 3) return raw;
  const sd = (k: number) => (l === 0 ? m * Math.exp(s * k) : m * (1 + l * s * k) ** (1 / l));
  if (raw > 3) return 3 + (x - sd(3)) / (sd(3) - sd(2));
  return -3 + (x - sd(-3)) / (sd(-2) - sd(-3));
}

const round1 = (n: number) => Math.round(n * 10) / 10 + 0; // + 0 turns -0 into 0
const sexKey = (s: Sex) => (s === "L" ? "1" : "2");

function byLength(table: { start: number; step: number } & Record<"1" | "2", LMS[]>, sex: Sex, cm: number): LMS | null {
  const i = Math.round((cm - table.start) / table.step);
  return table[sexKey(sex)][i] ?? null;
}

export type Category = { code: string; en: string; id: string; level: "ok" | "watch" | "alert" | "severe" };

const C = (code: string, en: string, id: string, level: Category["level"]): Category => ({ code, en, id, level });

function wfaCat(v: number): Category {
  if (v < -3) return C("severely_underweight", "Severely underweight", "Berat badan sangat kurang", "severe");
  if (v < -2) return C("underweight", "Underweight", "Berat badan kurang", "alert");
  if (v <= 1) return C("normal", "Normal weight", "Berat badan normal", "ok");
  return C("risk_overweight", "Risk of overweight", "Risiko berat badan lebih", "watch");
}

function lfaCat(v: number): Category {
  if (v < -3) return C("severely_stunted", "Severely stunted", "Sangat pendek", "severe");
  if (v < -2) return C("stunted", "Stunted", "Pendek", "alert");
  if (v <= 3) return C("normal", "Normal", "Normal", "ok");
  return C("tall", "Tall", "Tinggi", "watch");
}

function wflCat(v: number): Category {
  if (v < -3) return C("severe_wasting", "Severe wasting", "Gizi buruk", "severe");
  if (v < -2) return C("wasting", "Wasting", "Gizi kurang", "alert");
  if (v <= 1) return C("normal", "Good nutrition", "Gizi baik", "ok");
  if (v <= 2) return C("risk_overweight", "Risk of overweight", "Berisiko gizi lebih", "watch");
  if (v <= 3) return C("overweight", "Overweight", "Gizi lebih", "alert");
  return C("obese", "Obese", "Obesitas", "alert");
}

export type GrowthResult = {
  wfa: { z: number; cat: Category };
  lfa: { z: number; cat: Category; measure: "length" | "height" };
  wfl: { z: number; cat: Category } | null;
  trend: { status: "up" | "flat" | "down" | "unknown"; deltaG: number | null };
  muac: { cm: number; cat: Category } | null;
  referral: { needed: boolean; reasons: { en: string; id: string }[] };
};

export function validateGrowth(raw: unknown): GrowthInput | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const num = (v: unknown) => (typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v.replace(",", ".")) : NaN);
  const sex = r.sex === "L" || r.sex === "P" ? r.sex : null;
  const age = num(r.ageMonths), w = num(r.weightKg), len = num(r.lengthCm);
  const prev = r.prevWeightKg == null || r.prevWeightKg === "" ? null : num(r.prevWeightKg);
  const muac = r.muacCm == null || r.muacCm === "" ? null : num(r.muacCm);
  if (!sex || !Number.isInteger(age) || age < 0 || age > 59) return null;
  if (!(w >= 1 && w <= 40) || !(len >= 45 && len <= 120)) return null;
  if (prev !== null && !(prev >= 1 && prev <= 40)) return null;
  if (muac !== null && !(muac >= 7 && muac <= 25)) return null;
  return { sex, ageMonths: age, weightKg: w, lengthCm: len, prevWeightKg: prev, muacCm: muac };
}

export function assessGrowth(g: GrowthInput): GrowthResult {
  const s = sexKey(g.sex);
  const wfaZ = round1(z(g.weightKg, WHO.wfa[s][g.ageMonths], true));
  const lfaZ = round1(z(g.lengthCm, WHO.lfa[s][g.ageMonths], false));
  const measure = g.ageMonths < 24 ? "length" : "height";
  const lms = measure === "length" ? byLength(WHO.wfl, g.sex, g.lengthCm) : byLength(WHO.wfh, g.sex, g.lengthCm);
  const wflZ = lms ? round1(z(g.weightKg, lms, true)) : null;

  let trend: GrowthResult["trend"] = { status: "unknown", deltaG: null };
  if (g.prevWeightKg != null) {
    const d = Math.round((g.weightKg - g.prevWeightKg) * 1000);
    trend = { status: d > 0 ? "up" : d === 0 ? "flat" : "down", deltaG: d };
  }

  let muac: GrowthResult["muac"] = null;
  if (g.muacCm != null && g.ageMonths >= 6) {
    const cm = g.muacCm;
    muac = { cm, cat: cm < 11.5 ? C("severe", "Severe acute malnutrition", "Gizi buruk (LILA < 11,5 cm)", "severe")
      : cm < 12.5 ? C("moderate", "Moderate acute malnutrition", "Gizi kurang (LILA 11,5–12,5 cm)", "alert")
        : C("normal", "Normal", "Normal", "ok") };
  }

  const reasons: { en: string; id: string }[] = [];
  const wflCatV = wflZ != null ? wflCat(wflZ) : null;
  if (wflCatV?.level === "severe" || muac?.cat.level === "severe")
    reasons.push({ en: "Severe wasting: refer to the Puskesmas today.", id: "Gizi buruk: rujuk ke Puskesmas hari ini." });
  if (lfaCat(lfaZ).level === "severe" || lfaCat(lfaZ).level === "alert")
    reasons.push({ en: "Possible stunting: confirm with a health worker at the Puskesmas.", id: "Kemungkinan stunting: konfirmasi oleh tenaga kesehatan di Puskesmas." });
  if (wfaCat(wfaZ).level === "severe")
    reasons.push({ en: "Severely underweight: refer to the Puskesmas.", id: "Berat badan sangat kurang: rujuk ke Puskesmas." });
  if (trend.status === "flat" || trend.status === "down")
    if (wfaCat(wfaZ).level !== "ok")
      reasons.push({ en: "No weight gain and low weight-for-age: refer for assessment.", id: "Berat badan tidak naik dan BB/U rendah: rujuk untuk pemeriksaan." });

  return {
    wfa: { z: wfaZ, cat: wfaCat(wfaZ) },
    lfa: { z: lfaZ, cat: lfaCat(lfaZ), measure },
    wfl: wflZ != null ? { z: wflZ, cat: wflCatV! } : null,
    trend,
    muac,
    referral: { needed: reasons.length > 0, reasons },
  };
}
