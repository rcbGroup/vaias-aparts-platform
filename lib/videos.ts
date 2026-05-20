/**
 * Central registry of the property's YouTube videos.
 *
 * Source: scraped from the original site vaiasaparts.ro (each apartment page,
 * the whole-villa presentation and the shared-kitchen clip). IDs and upload
 * dates verified live against YouTube. The same channel: @VaiasAparts.
 */

export type VideoCategory = "vila" | "apartament" | "bucatarie";

export type SiteVideo = {
  youtubeId: string;
  title: string;
  description: string;
  category: VideoCategory;
  /** Set for apartment videos — links the clip to its apartment page. */
  aptSlug?: string;
  /** ISO 8601 publish date from YouTube — used for VideoObject schema. */
  uploadDate: string;
};

export const SITE_URL = "https://www.vaiasaparts.ro";
export const YOUTUBE_CHANNEL = "https://www.youtube.com/@VaiasAparts/videos";

export const VILLA_VIDEO_ID = "KnEAUHQFEvY";
export const KITCHEN_VIDEO_ID = "xnxi4jQYKaU";

export const siteVideos: SiteVideo[] = [
  {
    youtubeId: VILLA_VIDEO_ID,
    title: "Vila Vaias Aparts — tur complet",
    description:
      "Confort de hotel, libertatea de acasă, liniște și priveliști ca în Elveția — o privire peste întreaga vilă și împrejurimile ei.",
    category: "vila",
    uploadDate: "2025-08-20T02:52:31-07:00",
  },
  {
    youtubeId: "21BhJhk6jPE",
    title: "Apartament 1",
    description:
      "Confort, relaxare și acces central în Târgu Neamț — apartament complet privat de 46,4 mp.",
    category: "apartament",
    aptSlug: "apartament-1",
    uploadDate: "2025-08-21T10:34:33-07:00",
  },
  {
    youtubeId: "nGQpA50hlNY",
    title: "Apartament 2",
    description:
      "City-break ideal sau sejur prelungit — modern și central, apartament întreg de 46,1 mp.",
    category: "apartament",
    aptSlug: "apartament-2",
    uploadDate: "2025-08-21T11:31:28-07:00",
  },
  {
    youtubeId: "UjtKgNfktr0",
    title: "Apartament 3",
    description:
      "Cel mai încăpător — 2 dormitoare XXL și terasă, 66,6 mp doar pentru tine.",
    category: "apartament",
    aptSlug: "apartament-3",
    uploadDate: "2025-08-21T13:31:36-07:00",
  },
  {
    youtubeId: "QsAMMzvvRG8",
    title: "Apartament 4",
    description:
      "Spațios, 2 dormitoare XXL plus terasă mare spre pădure și grădină, în centrul Târgu Neamț.",
    category: "apartament",
    aptSlug: "apartament-4",
    uploadDate: "2025-08-21T13:56:08-07:00",
  },
  {
    youtubeId: "CB2qN7b3hk8",
    title: "Apartament 5",
    description:
      "Apartament luminos cu aer condiționat și priveliște superbă spre pădure, etaj 2.",
    category: "apartament",
    aptSlug: "apartament-5",
    uploadDate: "2025-08-21T14:23:21-07:00",
  },
  {
    youtubeId: "9hxuujvLB8Y",
    title: "Apartament 6",
    description:
      "Premium și spațios, cu terasă privată, flori și priveliște ca în Elveția, etaj 2.",
    category: "apartament",
    aptSlug: "apartament-6",
    uploadDate: "2025-08-21T14:50:08-07:00",
  },
  {
    youtubeId: "VrQ_jbreueU",
    title: "Apartament 7",
    description:
      "Apartament elegant la parter, cu terasă privată, acces facil fără trepte și liniște absolută.",
    category: "apartament",
    aptSlug: "apartament-7",
    uploadDate: "2025-08-21T15:22:17-07:00",
  },
  {
    youtubeId: KITCHEN_VIDEO_ID,
    title: "Bucătăria pentru Toți",
    description:
      "Bucătăria comună modernă, complet utilată — confort și libertate ca acasă.",
    category: "bucatarie",
    uploadDate: "2025-08-21T15:50:44-07:00",
  },
];

export function getVideoByApartment(slug: string): SiteVideo | undefined {
  return siteVideos.find((v) => v.aptSlug === slug);
}

export function youtubeThumb(
  id: string,
  quality: "maxresdefault" | "hqdefault" = "maxresdefault"
): string {
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`;
}

export function videoEmbedUrl(id: string, autoplay = false): string {
  const params = new URLSearchParams({ rel: "0" });
  if (autoplay) {
    params.set("autoplay", "1");
    params.set("mute", "0");
  }
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function videoWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

/** schema.org VideoObject JSON-LD for a video. */
export function videoObjectLd(v: SiteVideo): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${v.title} — Vila Vaias Aparts`,
    description: v.description,
    thumbnailUrl: [
      youtubeThumb(v.youtubeId, "maxresdefault"),
      youtubeThumb(v.youtubeId, "hqdefault"),
    ],
    uploadDate: v.uploadDate,
    contentUrl: videoWatchUrl(v.youtubeId),
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.youtubeId}`,
    publisher: {
      "@type": "Organization",
      name: "Vila Vaias Aparts",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/gallery/vila-vaias-aparts-targu-neamt-exterior-fatada-1.jpg`,
      },
    },
    ...(v.aptSlug
      ? { contentLocation: `${SITE_URL}/apartments/${v.aptSlug}` }
      : {}),
  };
}
