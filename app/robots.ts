// WO4 WP6.5: robots.txt implementing §12.1 block.
// RFC 9309: a bot obeys only the most specific group that names it,
// so private disallows are repeated in every named group.
// Training-crawler policy is §8 #34 (default: allow).
// Note: Google-Extended blocking also removes the site from Gemini grounding.
// The Host: directive was removed — it is not a standard robots.txt directive.

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const privateDisallow = ["/admin", "/api/"];

  return {
    rules: [
      // Search + AI search/citation (ALLOW)
      {
        userAgent: [
          "Googlebot",
          "bingbot",
          "Applebot",
          "DuckDuckBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
          "meta-webindexer",
          "meta-externalfetcher",
          "Amzn-SearchBot",
          "Amzn-User",
          "DuckAssistBot",
          "MistralAI-User",
          "MistralAI-Index",
        ],
        allow: "/",
        disallow: privateDisallow,
      },
      // Training / training-control (§8 #34 default: ALLOW)
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "Google-Extended",
          "Applebot-Extended",
          "meta-externalagent",
          "Amazonbot",
          "MistralAI-Training",
          "CCBot",
        ],
        allow: "/",
        disallow: privateDisallow,
      },
      // Everyone else
      {
        userAgent: "*",
        allow: "/",
        disallow: privateDisallow,
      },
    ],
    sitemap: "https://www.vaiasaparts.ro/sitemap.xml",
  };
}
