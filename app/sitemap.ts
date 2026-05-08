import type { MetadataRoute } from "next";
import { apartments } from "@/lib/apartments";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vaiasaparts.ro";
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
    "/politica-confidentialitate",
    "/termeni-conditii"
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8
  }));

  const apartmentUrls = apartments.map((a) => ({
    url: `${base}/apartments/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9
  }));

  return [...staticUrls, ...apartmentUrls];
}
