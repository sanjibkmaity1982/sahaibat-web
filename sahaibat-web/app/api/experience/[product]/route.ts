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
import { takeRun, visitorId } from "@/lib/experience/limits";
import { verifyTurnstile } from "@/lib/experience/turnstile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// The flows produce a full consultation / claim review in one call; give a
// stronger model room to finish.
export const maxDuration = 60;

// Stronger is better for a marketing demo: a wrong code in front of a hospital
// coder costs more than the extra seconds. If the configured model is not
// available on this key, fall back once to a widely available one.
const MODEL = process.env.EXPERIENCE_AI_MODEL?.trim() || "gpt-5";
const FALLBACK_MODEL = process.env.EXPERIENCE_AI_FALLBACK_MODEL?.trim() || "gpt-4.1";
const isReasoningModel = (m: string) => /^(gpt-5|o\d)/.test(m);

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
    timeout: 50_000,
    maxRetries: 0,
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

  let body: { text?: unknown; data?: unknown; lang?: unknown; token?: unknown };
  try {
    body = await req.json();
  } catch {
    return fail(400, "bad_request");
  }
  const text = typeof body.text === "string" ? body.text.trim() : "";
  const lang: Lang = body.lang === "id" ? "id" : "en";
  const token = typeof body.token === "string" ? body.token : null;

  const spec = PRODUCTS[product];
  const prepared = spec.input({ text, data: body.data }, lang);
  if ("error" in prepared) return fail(422, "guard");

  const ip = clientIp(req);
  if (!(await verifyTurnstile(token, ip))) return fail(403, "verify");

  try {
    if (!(await takeRun(visitorId(ip)))) return fail(429, "limit");
  } catch (err) {
    console.error("experience: rate-limit store unavailable", err);
    return fail(503, "disabled");
  }

  const started = Date.now();
  const ask = (model: string) =>
    openai(cfg.key).chat.completions.create(
      {
        model,
        messages: [
          { role: "system", content: spec.system(lang) },
          { role: "user", content: prepared.user },
        ],
        response_format: {
          type: "json_schema",
          json_schema: { name: spec.schemaName, strict: true, schema: spec.jsonSchema },
        },
        ...(isReasoningModel(model)
          ? { reasoning_effort: (spec.reasoning || process.env.EXPERIENCE_AI_REASONING?.trim() || "low") as OpenAI.ReasoningEffort, max_completion_tokens: 12000 }
          : { max_completion_tokens: 4000 }),
      },
      { signal: req.signal },
    );

  let model = MODEL;
  try {
    let completion;
    try {
      completion = await ask(model);
    } catch (err) {
      const modelProblem = err instanceof OpenAI.NotFoundError || err instanceof OpenAI.BadRequestError;
      if (!modelProblem || model === FALLBACK_MODEL) throw err;
      console.warn(JSON.stringify({ evt: "experience_model_fallback", from: model, to: FALLBACK_MODEL, status: (err as InstanceType<typeof OpenAI.APIError>).status }));
      model = FALLBACK_MODEL;
      completion = await ask(model);
    }

    const msg = completion.choices[0]?.message;
    if (msg?.refusal) return fail(422, "refused");
    if (completion.choices[0]?.finish_reason === "length" || !msg?.content) {
      return fail(502, "invalid_json");
    }

    let result: unknown;
    try {
      result = spec.parse(JSON.parse(msg.content), prepared.ctx);
    } catch {
      return fail(502, "invalid_json");
    }

    // Product analytics without content: which demo, how long, did it work.
    console.info(JSON.stringify({ evt: "experience_run", product, lang, model, ok: true, ms: Date.now() - started }));
    return NextResponse.json({ result }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof OpenAI.APIUserAbortError) return fail(499, "cancelled");
    if (err instanceof OpenAI.RateLimitError) return fail(429, "rate_limited");
    console.error(
      JSON.stringify({
        evt: "experience_run",
        product,
        model,
        ok: false,
        status: err instanceof OpenAI.APIError ? err.status : undefined,
        ms: Date.now() - started,
      }),
    );
    return fail(502, "error");
  }
}
