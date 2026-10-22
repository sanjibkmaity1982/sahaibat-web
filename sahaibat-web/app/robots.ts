import type { MetadataRoute } from "next";

// Search engines and the crawlers behind AI search answers are all welcome:
// being read and cited is the point. Only the API is off limits.
const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "Google-Extended", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Applebot-Extended", "CCBot", "Bingbot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: "https://www.sahaibat.com/sitemap.xml",
    host: "https://www.sahaibat.com",
  };
}
