// SERVER COMPONENT. One SEO page from content/pages, in Bahasa Indonesia:
// breadcrumbs, the article, FAQ, sources and a next step, with Article,
// BreadcrumbList and FAQPage structured data that matches the visible text.

import type { ReactNode } from "react";
import "@/components/redesign/redesign.css";
import "@/components/legal/legal.css";
import "./seo.css";
import { SiteHeader, footer } from "@/components/legal/LegalPage";
import { publishedPages, pagePath } from "@/lib/seo/content";
import type { Block, Page } from "@/lib/seo/schema";

const BASE = "https://www.sahaibat.com";
const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const date = (d: string) => {
  const [y, m, day] = d.split("-").map(Number);
  return `${day} ${MONTHS[m - 1]} ${y}`;
};

// **bold** and [text](href); everything else is plain text.
function Inline({ s }: { s: string }) {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(s.slice(last, m.index));
    if (m[1]) out.push(<b key={m.index}>{m[1]}</b>);
    else {
      const ext = /^https?:/.test(m[3]);
      out.push(<a key={m.index} href={m[3]} {...(ext ? { target: "_blank", rel: "noopener" } : {})}>{m[2]}</a>);
    }
    last = re.lastIndex;
  }
  if (last < s.length) out.push(s.slice(last));
  return <>{out}</>;
}

const plain = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[(.+?)\]\((.+?)\)/g, "$1");

function Blocks({ body }: { body: Block[] }) {
  return (
    <>
      {body.map((b, i) => {
        if ("p" in b) return <p key={i}><Inline s={b.p} /></p>;
        if ("note" in b) return <p key={i} className="pp-note"><Inline s={b.note} /></p>;
        if ("ul" in b) return <ul key={i}>{b.ul.map((x, j) => <li key={j}><Inline s={x} /></li>)}</ul>;
        if ("ol" in b) return <ol key={i} className="seo-steps">{b.ol.map((x, j) => <li key={j}><Inline s={x} /></li>)}</ol>;
        return (
          <div key={i} className="pp-table">
            <table>
              <thead><tr>{b.table.head.map((h, j) => <th key={j} scope="col">{h}</th>)}</tr></thead>
              <tbody>{b.table.rows.map((r, j) => <tr key={j}>{r.map((c, k) => (k === 0 ? <th key={k} scope="row"><Inline s={c} /></th> : <td key={k}><Inline s={c} /></td>))}</tr>)}</tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}

export function SeoPage({ page: p }: { page: Page }) {
  const url = `${BASE}${pagePath(p)}`;
  const crumbs = [
    { name: "Beranda", href: "/" },
    ...(p.section === "panduan" ? [{ name: "Panduan", href: "/panduan" }] : []),
    { name: p.h1, href: pagePath(p) },
  ];
  const related = p.related.map((s) => publishedPages().find((x) => x.slug === s)).filter((x): x is Page => !!x);

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: p.h1,
      description: p.description,
      inLanguage: "id-ID",
      datePublished: p.published,
      dateModified: p.updated,
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "SahAIbat", url: BASE },
      publisher: { "@type": "Organization", name: "SahAIbat", logo: { "@type": "ImageObject", url: `${BASE}/images/brand/wordmark-horizontal-dark.png` } },
      ...(p.reviewedBy ? { reviewedBy: { "@type": "Person", name: p.reviewedBy } } : {}),
      citation: p.sources.map((s) => s.url),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${BASE}${c.href === "/" ? "" : c.href}` })),
    },
    ...(p.faq.length
      ? [{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plain(f.a) } })),
        }]
      : []),
  ];

  return (
    <div className="sb" data-l="id" lang="id">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <SiteHeader lang="id" />

      <main className="pp seo">
        <div className="wrap pp-head">
          <nav className="seo-crumbs" aria-label="Breadcrumb">
            <ol>{crumbs.map((c, i) => <li key={c.href}>{i < crumbs.length - 1 ? <a href={c.href}>{c.name}</a> : <span aria-current="page">{c.name}</span>}</li>)}</ol>
          </nav>
          <span className="k">{p.kicker}</span>
          <h1>{p.h1}</h1>
          <p className="pp-updated">
            Diperbarui {date(p.updated)} · Oleh {p.author}{p.reviewedBy ? ` · Ditinjau oleh ${p.reviewedBy}` : ""}
          </p>
          <p className="lead"><Inline s={p.intro} /></p>
        </div>

        <div className="wrap pp-body">
          <aside className="pp-toc">
            <nav aria-label="Daftar isi">
              <span className="k">Daftar isi</span>
              <ol>
                {p.sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.h}</a></li>)}
                {p.faq.length > 0 && <li><a href="#faq">Pertanyaan umum</a></li>}
                {p.sources.length > 0 && <li><a href="#sumber">Sumber</a></li>}
              </ol>
            </nav>
            <div className="pp-contact seo-side-cta">
              <span className="k">SahAIbat DOK</span>
              <b>{p.cta.h}</b>
              <a className="b1" href={p.cta.href}>{p.cta.label}</a>
            </div>
          </aside>

          <article>
            {p.sections.map((s) => (
              <section key={s.id} id={s.id}>
                <h2>{s.h}</h2>
                <Blocks body={s.body} />
              </section>
            ))}

            {p.faq.length > 0 && (
              <section id="faq">
                <h2>Pertanyaan umum</h2>
                <div className="seo-faq">
                  {p.faq.map((f, i) => (
                    <details key={i} open={i === 0}>
                      <summary>{f.q}</summary>
                      <p><Inline s={f.a} /></p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <section className="seo-cta" aria-label={p.cta.h}>
              <h2>{p.cta.h}</h2>
              <p><Inline s={p.cta.p} /></p>
              <a className="b1" href={p.cta.href}>{p.cta.label}</a>
            </section>

            {p.sources.length > 0 && (
              <section id="sumber">
                <h2>Sumber</h2>
                <ol className="seo-sources">
                  {p.sources.map((s) => (
                    <li key={s.url}><a href={s.url} target="_blank" rel="noopener">{s.title}</a> <span>· {s.publisher}</span></li>
                  ))}
                </ol>
                <p className="seo-disclaimer">
                  Halaman ini adalah panduan praktis, bukan nasihat hukum atau pernyataan resmi Kementerian Kesehatan. Selalu rujuk sumber resmi terbaru. Melihat kesalahan? Kirim ke <a href="mailto:admin@sahaibat.com">admin@sahaibat.com</a>.
                </p>
              </section>
            )}

            {related.length > 0 && (
              <section aria-label="Baca juga">
                <h2>Baca juga</h2>
                <ul className="seo-related">
                  {related.map((r) => (
                    <li key={r.slug}><a href={pagePath(r)}><span className="k">{r.kicker}</span><b>{r.h1}</b><span>{r.description}</span></a></li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        </div>
      </main>

      <div dangerouslySetInnerHTML={{ __html: footer("id") }} />
    </div>
  );
}
