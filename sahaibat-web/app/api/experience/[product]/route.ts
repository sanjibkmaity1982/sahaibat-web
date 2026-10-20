// app/api/experience/[product]/route.ts
//
// The controlled AI behind the homepage Experience Zone. Public, so it is
// deliberately narrow:
//   - off unless EXPERIENCE_AI_ENABLED=true (the kill switch)
//   - same-origin requests only, Turnstile when configured, rate limited
//   - fictional text only (NIK / phone / email are refused), size capped
//   - prompts and output schemas are fixed server-side; output is re-validated
//   - nothing the visitor types is stored or logged
//
// It never touches DOK, Konsensus or any production patient system. It uses
// its own OpenAI key (EXPERIENCE_OPENAI_API_KEY), which should carry a monthly
// spend cap in the OpenAI dashboard.

import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { isProduct, PRODUCTS, type Lang } from "@/lib/experience/products";
import { guardText } from "@/lib/experience/guard";
import { takeRun, visitorId } from "@/lib/experience/limits";
import { verifyTurnstile } from "@/lib/experience/turnstile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Read forgivingly: a dashboard value of `True`, `"true"` or `true ` (stray
// space) should still switch the zone on, and a pasted key often carries
// whitespace.
function config() {
  const flag = (process.env.EXPERIENCE_AI_ENABLED ?? "").trim().replace(/^["']|["']$/g, "").toLowerCase();
  const key = (process.env.EXPERIENCE_OPENAI_API_KEY ?? "").trim().replace(/^["']|["']$/g, "");
  return { enabled: ["true", "1", "yes", "on"].includes(flag), flagSet: flag !== "", key };
}

let client: OpenAI | null = null;
function openai(apiKey: string): OpenAI {
  client ??= new OpenAI({
    apiKey,
    timeout: 30_000,
    maxRetries: 1,
  });
  return client;
}

const fail = (status: number, code: string) =>
  NextResponse.json({ code }, { status, headers: { "Cache-Control": "no-store" } });

// Browsers send Origin on cross-site POSTs; reject any that isn't this site.
function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ product: string }> }) {
  const { product } = await ctx.params;
  if (!isProduct(product)) return fail(404, "not_found");
  const cfg = config();
  if (!cfg.enabled || !cfg.key) {
    // Names which setting is missing, never its value.
    console.warn(JSON.stringify({ evt: "experience_disabled", enabled: cfg.enabled, flagSet: cfg.flagSet, keySet: Boolean(cfg.key) }));
    return fail(503, "disabled");
  }

  if (!sameOrigin(req)) return fail(403, "forbidden");

  let body: { text?: unknown; lang?: unknown; token?: unknown };
  try {
    body = await req.json();
  } catch {
    return fail(400, "bad_request");
  }
  const text = typeof body.text === "string" ? body.text.trim() : "";
  const lang: Lang = body.lang === "id" ? "id" : "en";
  const token = typeof body.token === "string" ? body.token : null;

  const spec = PRODUCTS[product];
  if (guardText(text, spec.maxInput)) return fail(422, "guard");

  const ip = clientIp(req);
  if (!(await verifyTurnstile(token, ip))) return fail(403, "verify");

  try {
    if (!(await takeRun(visitorId(ip)))) return fail(429, "limit");
  } catch (err) {
    console.error("experience: rate-limit store unavailable", err);
    return fail(503, "disabled");
  }

  const started = Date.now();
  try {
    const completion = await openai(cfg.key).chat.completions.create(
      {
        model: process.env.EXPERIENCE_AI_MODEL ?? "gpt-4.1-mini",
        messages: [
          { role: "system", content: spec.system(lang) },
          { role: "user", content: text },
        ],
        response_format: {
          type: "json_schema",
          json_schema: { name: spec.schemaName, strict: true, schema: spec.jsonSchema },
        },
        max_completion_tokens: 2500,
      },
      { signal: req.signal },
    );

    const msg = completion.choices[0]?.message;
    if (msg?.refusal) return fail(422, "refused");
    if (completion.choices[0]?.finish_reason === "length" || !msg?.content) {
      return fail(502, "invalid_json");
    }

    let result: unknown;
    try {
      result = spec.parse(JSON.parse(msg.content));
    } catch {
      return fail(502, "invalid_json");
    }

    // Product analytics without content: which demo, how long, did it work.
    console.info(JSON.stringify({ evt: "experience_run", product, lang, ok: true, ms: Date.now() - started }));
    return NextResponse.json({ result }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof OpenAI.APIUserAbortError) return fail(499, "cancelled");
    if (err instanceof OpenAI.RateLimitError) return fail(429, "rate_limited");
    console.error(
      JSON.stringify({
        evt: "experience_run",
        product,
        ok: false,
        status: err instanceof OpenAI.APIError ? err.status : undefined,
        ms: Date.now() - started,
      }),
    );
    return fail(502, "error");
  }
}
