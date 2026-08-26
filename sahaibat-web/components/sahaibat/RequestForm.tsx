"use client";

// components/sahaibat/RequestForm.tsx
//
// One form, two jobs: requesting the investor deck and opening a partnership
// conversation. Both previously either linked straight out to the deck or
// posted a bare mailto with no shape to it.
//
// WHY A FORM AND NOT A LINK. A public deck URL is a document you have no
// record of having sent. Collecting a name and an organisation first means
// every deck that goes out is attached to someone you can follow up with —
// and it lets the reply carry the version of the deck that suits the reader.
//
// There is no backend on this site, so submission composes a mailto: the same
// mechanism the old partner form used, with the fields laid out for whoever
// reads the inbox. Swap `onSubmit` for a POST the day an endpoint exists.

import React, { useMemo, useState } from "react";
import { C } from "@/lib/sahaibat/theme";

export type Field = {
  k: string;
  label: string;
  type?: "text" | "email" | "textarea" | "select";
  options?: string[];
  required?: boolean;
  half?: boolean;
  placeholder?: string;
};

export function RequestForm({
  fields, to, subject, submitLabel, note, done,
}: {
  fields: Field[];
  to: string;
  subject: (v: Record<string, string>) => string;
  submitLabel: string;
  note?: string;
  done?: string;
}) {
  const [v, setV] = useState<Record<string, string>>({});
  const [tried, setTried] = useState(false);
  const set = (k: string, val: string) => setV((p) => ({ ...p, [k]: val }));

  const missing = fields.filter((f) => f.required && !(v[f.k] || "").trim()).map((f) => f.k);
  const emailField = fields.find((f) => f.type === "email");
  const emailBad =
    !!emailField && !!(v[emailField.k] || "").trim() && !/^\S+@\S+\.\S+$/.test(v[emailField.k]);
  const ok = missing.length === 0 && !emailBad;

  const href = useMemo(() => {
    const body = fields
      .map((f) => `${f.label}: ${(v[f.k] || "").trim() || "—"}`)
      .join("\n");
    return `mailto:${to}?subject=${encodeURIComponent(subject(v))}&body=${encodeURIComponent(body)}`;
  }, [fields, v, to, subject]);

  return (
    <div className="rf">
      <div className="rf-grid">
        {fields.map((f) => {
          const bad = tried && f.required && !(v[f.k] || "").trim();
          return (
            <label key={f.k} className={`rf-f${f.half ? " half" : ""}`}>
              <span className="rf-l">
                {f.label}{f.required && <i aria-hidden> *</i>}
              </span>

              {f.type === "textarea" ? (
                <textarea rows={4} className={`rf-i${bad ? " bad" : ""}`} value={v[f.k] || ""}
                  placeholder={f.placeholder} onChange={(e) => set(f.k, e.target.value)} />
              ) : f.type === "select" ? (
                <select className={`rf-i${bad ? " bad" : ""}`} value={v[f.k] || ""}
                  onChange={(e) => set(f.k, e.target.value)}>
                  <option value="">Select…</option>
                  {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input type={f.type === "email" ? "email" : "text"} className={`rf-i${bad ? " bad" : ""}`}
                  value={v[f.k] || ""} placeholder={f.placeholder}
                  onChange={(e) => set(f.k, e.target.value)} />
              )}
            </label>
          );
        })}
      </div>

      {tried && !ok && (
        <div className="rf-err" role="alert">
          {emailBad ? "That email address does not look right." : "Please complete the required fields."}
        </div>
      )}

      <div className="rf-foot">
        <a
          className={`rf-go${ok ? "" : " off"}`}
          href={ok ? href : undefined}
          onClick={(e) => { setTried(true); if (!ok) e.preventDefault(); }}
        >
          {submitLabel} <span aria-hidden>→</span>
        </a>
        {note && <span className="rf-note">{note}</span>}
      </div>
      {done && <p className="rf-done">{done}</p>}

      <style>{`
        .rf-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .rf-f { display:flex; flex-direction:column; gap:7px; grid-column:1 / -1; }
        .rf-f.half { grid-column:auto; }
        .rf-l { color:rgba(255,255,255,0.5); font-size:10.5px; font-weight:800; letter-spacing:1.2px; }
        .rf-l i { color:${C.teal}; font-style:normal; }
        .rf-i { width:100%; background:rgba(255,255,255,0.05);
          border:1px solid rgba(2,195,154,0.22); border-radius:11px;
          padding:12px 14px; color:#fff; font-size:14.5px; font-family:inherit;
          outline:none; transition:border-color .16s, background .16s; }
        .rf-i::placeholder { color:rgba(255,255,255,0.28); }
        .rf-i:focus { border-color:${C.teal}; background:rgba(2,195,154,0.07); }
        .rf-i.bad { border-color:#E5674F; }
        .rf-i option { background:${C.dark}; color:#fff; }
        textarea.rf-i { resize:vertical; line-height:1.65; }
        .rf-err { margin-top:14px; color:#FFB4A6; font-size:13px; }
        .rf-foot { display:flex; align-items:center; gap:16px; flex-wrap:wrap; margin-top:22px; }
        .rf-go { background:${C.teal}; color:${C.dark}; font-weight:800; font-size:14.5px;
          padding:13px 28px; border-radius:12px; text-decoration:none; cursor:pointer;
          transition:transform .16s, box-shadow .16s; box-shadow:0 4px 16px rgba(2,195,154,0.25); }
        .rf-go:hover { transform:translateY(-1px); box-shadow:0 8px 22px rgba(2,195,154,0.35); }
        .rf-go.off { background:rgba(255,255,255,0.1); color:rgba(255,255,255,0.4);
          box-shadow:none; cursor:not-allowed; }
        .rf-go.off:hover { transform:none; }
        .rf-note { color:rgba(255,255,255,0.42); font-size:12.5px; }
        .rf-done { color:rgba(255,255,255,0.4); font-size:12.5px; line-height:1.7; margin-top:16px;
          padding-top:16px; border-top:1px solid rgba(255,255,255,0.09); }
        @media (max-width:640px) { .rf-grid { grid-template-columns:1fr; } }
      `}</style>
    </div>
  );
}
