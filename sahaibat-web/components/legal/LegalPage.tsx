// SERVER COMPONENT. The legal pages (privacy policy, terms of use), in one
// language per route (Bahasa Indonesia on the bare path, English under /en),
// with the same footer as the redesigned home page.

import { MARKUP } from "@/components/redesign/markup";
import "@/components/redesign/redesign.css";
import "./legal.css";
import * as PRIVACY from "./privacy-content";
import * as TERMS from "./terms-content";
import type { Block, Section, T } from "./privacy-content";

type Lang = "en" | "id";

// Headings carry a number in the content file; the page numbers them itself.
const title = (h: string) => h.replace(/^\d+[a-z]?\.\s*/, "");

// The home page footer, with its in-page anchors pointed back at the home page.
export function footer(lang: Lang) {
  const home = lang === "en" ? "/en" : "/";
  const f = MARKUP.slice(MARKUP.indexOf("<footer"), MARKUP.indexOf("</footer>") + 9);
  return f
    .replace(/href="#impact-page" data-go="impact"/g, `href="${lang === "en" ? "/en/impact" : "/impact"}"`)
    .replace(/href="#([a-z-]+)"/g, `href="${home}#$1"`);
}

function Blocks({ body, l }: { body: Block[]; l: Lang }) {
  return (
    <>
      {body.map((b, i) => {
        if ("p" in b) return <p key={i}>{b.p[l]}</p>;
        if ("note" in b) return <p key={i} className="pp-note">{b.note[l]}</p>;
        if ("ul" in b) return <ul key={i}>{b.ul.map((x, j) => <li key={j}>{x[l]}</li>)}</ul>;
        return (
          <div key={i} className="pp-table">
            <table>
              <thead><tr>{b.table.head.map((h, j) => <th key={j} scope="col">{h[l]}</th>)}</tr></thead>
              <tbody>{b.table.rows.map((r, j) => <tr key={j}>{r.map((c, k) => (k === 0 ? <th key={k} scope="row">{c[l]}</th> : <td key={k}>{c[l]}</td>))}</tr>)}</tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}

type Doc = {
  path: string;
  kicker: T;
  title: T;
  contact: { label: T; name?: string; emails: string[] };
  UPDATED: T;
  INTRO: T;
  COMMITMENTS: { h: T; d: T }[];
  SECTIONS: Section[];
};

const DOCS: Record<"privacy" | "terms", Doc> = {
  privacy: {
    ...PRIVACY,
    path: "/privacy",
    kicker: { en: "Privacy", id: "Privasi" },
    title: { en: "Privacy Policy", id: "Kebijakan Privasi" },
    contact: { label: { en: "Privacy Officer", id: "Pejabat Pelindungan Data" }, name: "Shindy Farah", emails: ["shindyfarrah@sahaibat.com", "privacy@sahaibat.com"] },
  },
  terms: {
    ...TERMS,
    path: "/terms",
    kicker: { en: "Terms", id: "Ketentuan" },
    title: { en: "Terms of Use", id: "Ketentuan Penggunaan" },
    contact: { label: { en: "Questions", id: "Pertanyaan" }, emails: ["admin@sahaibat.com", "privacy@sahaibat.com"] },
  },
};

const UI: Record<string, T> = {
  contents: { en: "Contents", id: "Daftar isi" },
  back: { en: "Back to SahAIbat", id: "Kembali ke SahAIbat" },
  switchTo: { en: "ID · Bahasa", id: "EN · English" },
};

// A slim version of the home page nav. `other` is the same page in the other
// language; pages that exist in one language only leave it out.
export function SiteHeader({ lang: l, other }: { lang: Lang; other?: string }) {
  return (
    <header className="nav pp-nav">
      <div className="wrap">
        <a href={l === "en" ? "/en" : "/"} aria-label={UI.back[l]}>
          <img src="/redesign/img/wm_light.png" alt="SahAIbat" />
        </a>
        <span className="sp" />
        {other && <a className="lg" href={other} hrefLang={l === "en" ? "id" : "en"}>{UI.switchTo[l]}</a>}
        <a className="b1" href={l === "en" ? "/en#dok" : "/#dok"}>{l === "en" ? "Try DOK" : "Coba DOK"}</a>
      </div>
    </header>
  );
}

export function LegalPage({ doc: name, lang: l }: { doc: "privacy" | "terms"; lang: Lang }) {
  const d = DOCS[name];
  return (
    <div className="sb" data-l={l} lang={l}>
      <SiteHeader lang={l} other={l === "en" ? d.path : `/en${d.path}`} />

      <main className="pp">
        <div className="wrap pp-head">
          <span className="k">{d.kicker[l]}</span>
          <h1>{d.title[l]}</h1>
          <p className="pp-updated">{d.UPDATED[l]}</p>
          <p className="lead">{d.INTRO[l]}</p>
          <ul className="pp-commit">
            {d.COMMITMENTS.map((c, i) => (
              <li key={i}><b>{c.h[l]}</b><span>{c.d[l]}</span></li>
            ))}
          </ul>
        </div>

        <div className="wrap pp-body">
          <aside className="pp-toc">
            <nav aria-label={UI.contents[l]}>
              <span className="k">{UI.contents[l]}</span>
              <ol>{d.SECTIONS.map((s) => <li key={s.id}><a href={`#${s.id}`}>{title(s.h[l])}</a></li>)}</ol>
            </nav>
            <div className="pp-contact">
              <span className="k">{d.contact.label[l]}</span>
              {d.contact.name && <b>{d.contact.name}</b>}
              {d.contact.emails.map((e) => <a key={e} href={`mailto:${e}`}>{e}</a>)}
            </div>
          </aside>
          <article>
            {d.SECTIONS.map((s, i) => (
              <section key={s.id} id={s.id}>
                <h2>{`${i + 1}. ${title(s.h[l])}`}</h2>
                <Blocks body={s.body} l={l} />
              </section>
            ))}
          </article>
        </div>
      </main>

      <div dangerouslySetInnerHTML={{ __html: footer(l) }} />
    </div>
  );
}
