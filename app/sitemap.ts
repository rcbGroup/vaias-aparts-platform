import type { MetadataRoute } from "next";
import { apartments } from "@/lib/apartments";
import { blogPosts } from "@/lib/blog";
import { landingPages } from "@/lib/landing-pages";

const BASE = "https://www.vaiasaparts.ro";
const LOCALES = ["en", "fr", "de", "it", "es"];

function buildAlternates(path: string): Record<string, string> {
  const cleanPath = path === "" ? "" : path;
  const result: Record<string, string> = {
    ro: `${BASE}${cleanPath}`
  };
  for (const loc of LOCALES) {
    result[loc] = `${BASE}/${loc}${cleanPath}`;
  }
  return result;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { p: "", priority: 1.0 },
    { p: "/apartments", priority: 0.95 },
    { p: "/vila-completa", priority: 0.95 },
    { p: "/rezervare", priority: 0.95 },
    { p: "/cazare", priority: 0.9 },
    { p: "/ce-poti-face", priority: 0.85 },
    { p: "/zone-turistice", priority: 0.85 },
    { p: "/istoria-orasului", priority: 0.7 },
    { p: "/cum-ajungi", priority: 0.9 },
    { p: "/diaspora", priority: 0.85 },
    { p: "/pelerini", priority: 0.85 },
    { p: "/galerie", priority: 0.8 },
    { p: "/videouri", priority: 0.8 },
    { p: "/recenzii", priority: 0.8 },
    { p: "/despre-noi", priority: 0.7 },
    { p: "/contact", priority: 0.7 },
    { p: "/blog", priority: 0.7 },
    { p: "/han-rustic", priority: 0.6 },
    { p: "/afiliati", priority: 0.5 },
    { p: "/experiente", priority: 0.7 },
    { p: "/packages", priority: 0.85 },
    { p: "/wellness", priority: 0.85 },
    { p: "/refugiul-vaias", priority: 0.7 },
    { p: "/vouchere-vacanta", priority: 0.6 },
    { p: "/comenzi-mancare", priority: 0.5 },
    { p: "/parteneri-restaurante", priority: 0.5 },
    { p: "/politica-confidentialitate", priority: 0.3 },
    { p: "/termeni-conditii", priority: 0.3 }
  ];

  const staticUrls = staticPages.map(({ p, priority }) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority,
    alternates: { languages: buildAlternates(p) }
  }));

  const apartmentUrls = apartments.map((a) => ({
    url: `${BASE}/apartments/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
    alternates: { languages: buildAlternates(`/apartments/${a.slug}`) }
  }));

  const landingUrls = landingPages.map((p) => ({
    url: `${BASE}/cazare/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
    alternates: { languages: buildAlternates(`/cazare/${p.slug}`) }
  }));

  const blogUrls = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: { languages: buildAlternates(`/blog/${p.slug}`) }
  }));

  return [...staticUrls, ...apartmentUrls, ...landingUrls, ...blogUrls];
}
