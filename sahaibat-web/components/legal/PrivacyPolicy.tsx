// SERVER COMPONENT. The privacy policy page, in one language per route
// (/privacy in Bahasa Indonesia, /en/privacy in English), with the same
// footer as the redesigned home page.

import { MARKUP } from "@/components/redesign/markup";
import "@/components/redesign/redesign.css";
import "./legal.css";
import { COMMITMENTS, INTRO, SECTIONS, UPDATED, type Block, type T } from "./privacy-content";

type Lang = "en" | "id";

// Headings carry a number in the content file; the page numbers them itself.
const title = (h: string) => h.replace(/^\d+[a-z]?\.\s*/, "");

// The home page footer, with its in-page anchors pointed back at the home page.
function footer(lang: Lang) {
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

const UI: Record<string, T> = {
  kicker: { en: "Privacy", id: "Privasi" },
  title: { en: "Privacy Policy", id: "Kebijakan Privasi" },
  contents: { en: "Contents", id: "Daftar isi" },
  officer: { en: "Privacy Officer", id: "Pejabat Pelindungan Data" },
  back: { en: "Back to SahAIbat", id: "Kembali ke SahAIbat" },
  switchTo: { en: "ID · Bahasa", id: "EN · English" },
};

export function PrivacyPolicy({ lang: l }: { lang: Lang }) {
  const other = l === "en" ? "/privacy" : "/en/privacy";
  return (
    <div className="sb" data-l={l} lang={l}>
      <header className="nav pp-nav">
        <div className="wrap">
          <a href={l === "en" ? "/en" : "/"} aria-label={UI.back[l]}>
            <img src="/redesign/img/wm_light.png" alt="SahAIbat" />
          </a>
          <span className="sp" />
          <a className="lg" href={other} hrefLang={l === "en" ? "id" : "en"}>{UI.switchTo[l]}</a>
          <a className="b1" href={l === "en" ? "/en#dok" : "/#dok"}>{l === "en" ? "Try DOK" : "Coba DOK"}</a>
        </div>
      </header>

      <main className="pp">
        <div className="wrap pp-head">
          <span className="k">{UI.kicker[l]}</span>
          <h1>{UI.title[l]}</h1>
          <p className="pp-updated">{UPDATED[l]}</p>
          <p className="lead">{INTRO[l]}</p>
          <ul className="pp-commit">
            {COMMITMENTS.map((c, i) => (
              <li key={i}><b>{c.h[l]}</b><span>{c.d[l]}</span></li>
            ))}
          </ul>
        </div>

        <div className="wrap pp-body">
          <aside className="pp-toc">
            <nav aria-label={UI.contents[l]}>
              <span className="k">{UI.contents[l]}</span>
              <ol>{SECTIONS.map((s) => <li key={s.id}><a href={`#${s.id}`}>{title(s.h[l])}</a></li>)}</ol>
            </nav>
            <div className="pp-contact">
              <span className="k">{UI.officer[l]}</span>
              <b>Shindy Farah</b>
              <a href="mailto:shindyfarrah@sahaibat.com">shindyfarrah@sahaibat.com</a>
              <a href="mailto:privacy@sahaibat.com">privacy@sahaibat.com</a>
            </div>
          </aside>
          <article>
            {SECTIONS.map((s, i) => (
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
