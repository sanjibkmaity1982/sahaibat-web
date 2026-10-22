# SahAIbat SEO engine

Organic growth without ads, following the *AI + SEO Acquisition Strategy for Indonesia* (October 2026). It runs every Monday at 07:37 WIB in GitHub Actions and does the repetitive work. People keep two jobs: **reviewing drafts and merging them**.

## What runs every week

| Step | Script | What it does |
|---|---|---|
| Technical audit | `audit.mts` | Crawls the live sitemap. Checks status, title, description, one H1, canonical, structured data, indexability, speed, the word "AI", broken internal links and dead source links. |
| Search Console | `gsc.mts` | Pulls 28 days of queries and pages, plus the 28 days before. Splits branded and non-branded traffic. |
| Funnel | `funnel.mts` | Reads the site's own aggregate counters (`app/api/m`): landings from search engines and from answer assistants (ChatGPT, Perplexity, Gemini, Copilot), Experience Zone demos and clicks through to DOK. Compares the last 28 days with the 28 before. |
| Fact check | `factcheck.mts` | Uses web search to check every published page against official sources and the claims registry. Pages with a wrong statement get a correction draft PR first. |
| Keyword analyst | `keywords.mts` | Merges the seed matrix (`content/keywords.json`) with real queries. OpenAI clusters them by intent and maps each cluster to a page or a new page idea. Scores use the strategy formula. Only Search Console impressions count as demand. |
| Editorial assistant | `draft.mts` | Turns the top new-page opportunities and pages ranking 4–20 into drafts. Drafts are researched with web search and checked by the validator and claims registry. Each draft opens as a **draft PR**. Nothing is merged automatically. |
| AI visibility | `visibility.mts` | Asks 8 fixed Bahasa questions to a web-searching assistant. Records whether SahAIbat is mentioned and cited, and whether the description is accurate. |
| IndexNow | `indexnow.mts` | Tells Bing and the assistants that search with it which pages changed. It also runs after every merge that touches `content/pages`. |
| Report | `report.mts` | Opens one GitHub issue (label `seo-report`) with the numbers, opportunities, drafts waiting for review, visibility and issues. |

On every pull request, `seo-ci.yml` validates content, builds the site and runs the audit in strict mode.

## One-time setup

1. **OpenAI key.** In GitHub, go to *Settings → Secrets and variables → Actions → New repository secret*. Add `SEO_OPENAI_API_KEY`. Use a separate key with a monthly spend cap set in the OpenAI dashboard.
2. **Allow draft PRs.** In GitHub, go to *Settings → Actions → General → Workflow permissions*. Choose "Read and write permissions" and tick **"Allow GitHub Actions to create and approve pull requests"**.
3. **Google Search Console**
   1. Add the **Domain** property `sahaibat.com` at <https://search.google.com/search-console> and verify it with the DNS TXT record. Do the same for `sahaibatdok.com`.
   2. In Google Cloud, create a project and enable the **Google Search Console API**. Then create a **service account** and download its JSON key.
   3. In Search Console, go to *Settings → Users and permissions → Add user*. Add the service account's email with **Restricted** permission, on each property.
   4. Add the whole JSON as the secret `GSC_SERVICE_ACCOUNT_JSON`.
   5. Optional: add the variable `GSC_SITES` = `sc-domain:sahaibat.com,sc-domain:sahaibatdok.com`.
4. **Bing Webmaster Tools.** At <https://www.bing.com/webmasters>, import the site from Search Console. Bing feeds ChatGPT search and Copilot. Optionally set `BING_SITE_VERIFICATION` in Vercel.
5. **On-site funnel.** Add the secrets `KV_REST_API_URL` and `KV_REST_API_READ_ONLY_TOKEN`. Copy both from the Upstash database the site already uses (Vercel → Storage, or the Upstash console). The read-only token is enough.
6. **First run.** Go to *Actions → SEO weekly run → Run workflow*.

Optional repository variables: `SEO_MODEL` (default `gpt-5`), `SEO_DRAFTS_PER_RUN` (default 2), `SEO_REFRESHES_PER_RUN` (default 1).

## Reviewing a draft

Each draft PR has a Vercel preview and a checklist. Read the page on the preview, then:
- check SahAIbat facts against `content/claims.json`
- check regulatory statements against the cited official sources
- optional: add a named reviewer as `reviewedBy`

Merge the PR to publish. To reject a draft, close the PR. Each topic is drafted only once, so a closed draft won't come back. To revisit it, reopen the PR or write the page by hand.

## Reviewers and fact checking

Every week `factcheck.mts` checks each published page against official sources and the claims registry, and opens a correction draft for anything wrong. That covers routine accuracy, so a named reviewer is optional.

Adding one (`reviewedBy`, for example a doctor on the team) still helps. For health topics, Google gives weight to visible expertise, and a named, qualified reviewer is one of the clearest signals. It shows on the page as "Ditinjau oleh …" and in the structured data. Only add a real person who has actually reviewed the page.

## Measuring results

The site counts visits in aggregate (`app/api/m`, described in the privacy policy):
- no cookies, no IP address and no profile
- Do Not Track and Global Privacy Control are honoured

Links to sahaibatdok.com get `utm_source=sahaibat.com&utm_medium=website&utm_campaign=<page>`. DOK can then attribute sign-ups and activation to the page and search that brought them. The weekly report shows the sahaibat.com half of the funnel: landing, demo, click to DOK.

## Adding or changing pages by hand

Pages are JSON files in `content/pages/`, described by `lib/seo/schema.ts`:
- `section: "landing"` publishes at `/<slug>`
- `section: "panduan"` publishes at `/panduan/<slug>`

Run `npm run seo:validate` before pushing. When a fact about SahAIbat changes (price, feature, integration), update `content/claims.json` first. Every page is then re-checked against it.

## What it deliberately does not do

- It doesn't publish anything without a merge.
- It doesn't invent search volumes, rankings or traffic forecasts.
- It doesn't send patient or clinical product data anywhere. It reads only public pages and aggregated Search Console data.
- It doesn't guarantee rankings or inclusion in AI answers. Those come from useful pages, technical health, accurate entity information and genuine external mentions. The report tracks all of them so you can see what moves.
