import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";
import { siteVideos, videoObjectLd } from "@/lib/videos";

export const metadata: Metadata = {
  title: "Galerie Foto & Video | Vila Vaias Aparts Târgu Neamț — 7 Apartamente Boutique",
  description:
    "Galerie foto și video Vila Vaias Aparts — toate cele 7 apartamente boutique, tururi video, exterior, curte și facilitățile vilei din Târgu Neamț, la poalele Cetății Neamțului.",
};

export default function GalleryPage() {
  return (
    <>
      <GalleryClient />
      {siteVideos.map((v) => (
        <script
          key={v.youtubeId}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectLd(v)) }}
        />
      ))}
    </>
  );
}
