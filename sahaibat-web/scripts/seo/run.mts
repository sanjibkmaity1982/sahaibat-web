// The weekly SEO run, end to end. Each step is isolated: one failing step
// (an API outage, a missing key) is reported and the rest still run.
//
//   audit → Search Console → funnel → fact check → keywords → drafts
//   → AI visibility → IndexNow → report

import { audit } from "./audit.mts";
import { gsc } from "./gsc.mts";
import { keywords } from "./keywords.mts";
import { draft } from "./draft.mts";
import { visibility } from "./visibility.mts";
import { factcheck } from "./factcheck.mts";
import { funnel } from "./funnel.mts";
import { indexnow } from "./indexnow.mts";
import { report } from "./report.mts";
import { log } from "./lib.mts";

// The DOK product site; its pages are built in the sahaibat-dok repo.
const DOK = "https://www.sahaibatdok.com";

const steps: [string, () => Promise<unknown>][] = [
  ["audit", () => audit()],
  ["audit sahaibatdok.com", () => audit(DOK, "audit-dok.json")],
  ["gsc", () => gsc()],
  ["funnel", () => funnel()],
  ["factcheck", () => factcheck()],
  ["keywords", () => keywords()],
  ["draft", () => (process.env.SEO_SKIP_DRAFTS ? Promise.resolve() : draft())],
  ["visibility", () => visibility()],
  ["indexnow", () => indexnow()],
  ["indexnow sahaibatdok.com", () => indexnow(undefined, DOK)],
];

let failed = 0;
for (const [name, fn] of steps) {
  try {
    await fn();
  } catch (e) {
    failed++;
    log(`✖ ${name} failed: ${(e as Error).message}`);
  }
}
await report();
log(failed ? `done with ${failed} failed step(s)` : "done");
