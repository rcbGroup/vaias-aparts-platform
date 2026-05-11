import type { MetadataRoute } from "next";
import { apartments } from "@/lib/apartments";
import { blogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.vaiasaparts.ro";
  const now = new Date();
  const staticUrls = [
    "",
    "/apartments",
    "/zone-turistice",
    "/galerie",
    "/recenzii",
    "/despre-noi",
    "/contact",
    "/rezervare",
    "/blog",
    "/diaspora",
    "/pelerini",
    "/han-rustic",
    "/afiliati",
    "/experiente",
    "/comenzi-mancare",
    "/parteneri-restaurante",
    "/politica-confidentialitate",
    "/termeni-conditii"
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/rezervare" ? 0.95 : path === "/apartments" ? 0.9 : 0.8
  }));

  const apartmentUrls = apartments.map((a) => ({
    url: `${base}/apartments/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9
  }));

  const blogUrls = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...staticUrls, ...apartmentUrls, ...blogUrls];
}
