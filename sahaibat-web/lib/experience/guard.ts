// lib/experience/guard.ts
//
// The Experience Zone takes fictional cases only. The page runs the same check
// before sending; this is the copy that cannot be skipped.

export type GuardFail = "nik" | "phone" | "email" | "short" | "long";

export function guardText(text: string, maxInput: number): GuardFail | null {
  if (/\b\d{16}\b/.test(text.replace(/[\s.-]/g, " "))) return "nik";
  if (/(\+62|\b0)8\d{7,11}\b/.test(text.replace(/[\s-]/g, ""))) return "phone";
  if (/[\w.+-]+@[\w-]+\.[\w.]+/.test(text)) return "email";
  if (text.trim().length < 40) return "short";
  if (text.length > maxInput) return "long";
  return null;
}
