"use client";

// Short partnership form shown on landing pages whose call to action is the
// partnership form. Like the form on /impact, it opens the visitor's email app
// with the details addressed to admin@sahaibat.com; nothing is stored. Email or
// phone/WhatsApp is enough. Counts one aggregate "partner_submit" (app/api/m).

import { useState, type FormEvent } from "react";

const TYPES = [
  "District health office / Dinas kesehatan",
  "Puskesmas",
  "NGO / LSM",
  "CSR",
  "Development partner / Mitra pembangunan",
  "Lainnya / Other",
];
const PRODUCTS = ["Kader", "Bidan", "DOK", "Kasih", "Code"];

function count() {
  const n = navigator as Navigator & { globalPrivacyControl?: boolean };
  if (n.doNotTrack === "1" || n.globalPrivacyControl === true) return;
  const body = JSON.stringify({ e: "partner_submit", p: location.pathname });
  try {
    if (!navigator.sendBeacon?.("/api/m", new Blob([body], { type: "text/plain" }))) {
      fetch("/api/m", { method: "POST", body, keepalive: true }).catch(() => {});
    }
  } catch {}
}

export function PartnerForm({ product = "Kader" }: { product?: string }) {
  const [msg, setMsg] = useState("");

  function submit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    if (!v("email") && !v("phone")) {
      setMsg("Isi email atau nomor telepon/WhatsApp agar kami bisa menghubungi Anda.");
      return;
    }
    count();
    const body =
      `Organisation type: ${v("type")}\nRegion: ${v("region") || "—"}\nInterested in: ${v("product")}\n` +
      `Email: ${v("email") || "—"}\nPhone/WhatsApp: ${v("phone") || "—"}\nPage: ${location.pathname}\n\n${v("message")}`;
    location.href =
      `mailto:admin@sahaibat.com?subject=${encodeURIComponent(`Partnership inquiry · ${v("type")}`)}&body=${encodeURIComponent(body)}`;
    setMsg("Membuka aplikasi email Anda untuk mengirim permintaan ke tim kemitraan. Tekan kirim di aplikasi email Anda.");
  }

  return (
    <form className="seo-pform" onSubmit={submit}>
      <label>
        Jenis organisasi
        <select name="type" defaultValue={TYPES[0]}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
      </label>
      <label>
        Wilayah
        <input name="region" placeholder="Kabupaten / kota, provinsi" />
      </label>
      <label>
        Tertarik pada
        <select name="product" defaultValue={product}>{PRODUCTS.map((t) => <option key={t}>{t}</option>)}</select>
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" placeholder="nama@instansi.go.id" />
      </label>
      <label className="full">
        Telepon atau WhatsApp
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+62 8xx xxxx xxxx" />
      </label>
      <label className="full">
        Apa yang Anda butuhkan?
        <textarea name="message" rows={4} placeholder="Misalnya: jumlah Posyandu, kebutuhan kader, rencana program" />
      </label>
      <div className="full">
        <button className="b1" type="submit">Kirim permintaan kemitraan</button>
      </div>
      {msg && <p className="full seo-pform-msg" role="status">{msg}</p>}
    </form>
  );
}
