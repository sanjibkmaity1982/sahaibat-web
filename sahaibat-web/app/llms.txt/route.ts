// /llms.txt: a plain summary of SahAIbat for AI search and answer engines,
// built from the claims registry and the published pages so it never drifts
// from what the site says.
import claims from "@/content/claims.json";
import { publishedPages, pagePath } from "@/lib/seo/content";

export const dynamic = "force-static";

const BASE = "https://www.sahaibat.com";

export function GET() {
  const pages = publishedPages();
  const body = [
    "# SahAIbat",
    "",
    "> SahAIbat (sahaibat.com) is an Indonesian healthcare technology company. Tagline: \"Kesehatan, lebih dekat dari sebelumnya\" (Healthcare closer than ever). Products: SahAIbat Kader (Posyandu), SahAIbat Bidan (midwives), SahAIbat DOK (the Intelligent RME for doctors and clinics, sahaibatdok.com), DOK Companion, Kasih (families), Code (hospital coding) and Konsensus.id (clinical knowledge).",
    "",
    "## Key facts",
    ...claims.verified.map((c: { claim: string }) => `- ${c.claim}`),
    "",
    "## Guides and pages (Bahasa Indonesia)",
    ...pages.map((p) => `- [${p.h1}](${BASE}${pagePath(p)}): ${p.description}`),
    "",
    "## Company",
    `- [Home](${BASE}/) · [English](${BASE}/en) · [Impact](${BASE}/impact)`,
    `- [Privacy Policy](${BASE}/privacy) · [Terms of Use](${BASE}/terms)`,
    "- Contact: admin@sahaibat.com · Privacy: privacy@sahaibat.com",
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
