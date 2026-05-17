/**
 * VAIA OS — Agent 18: Social Media Engine.
 *
 * Generates platform-aware social posts (Instagram, Facebook, TikTok caption,
 * LinkedIn for B2B) from structured inputs — apartment data, reviews, events.
 */
import { apartments, getApartmentBySlug } from "../../../lib/apartments";

export type SocialPlatform = "instagram" | "facebook" | "tiktok" | "linkedin";
export type SocialPostCategory =
  | "apartment_showcase"
  | "review_repost"
  | "event"
  | "tip"
  | "season"
  | "monastery"
  | "behind_scenes"
  | "partner_highlight";

const PLATFORM_LIMITS: Record<SocialPlatform, { caption: number; hashtags: number }> = {
  instagram: { caption: 2200, hashtags: 30 },
  facebook: { caption: 8000, hashtags: 6 },
  tiktok: { caption: 2200, hashtags: 8 },
  linkedin: { caption: 3000, hashtags: 5 },
};

export type SocialPostInputs = {
  platform: SocialPlatform;
  category: SocialPostCategory;
  apartmentSlug?: string;
  reviewQuote?: string;
  reviewerName?: string;
  rating?: number;
  customSubject?: string;
  language?: "ro" | "en";
  season?: "spring" | "summer" | "autumn" | "winter";
};

export type SocialPostResult = {
  platform: SocialPlatform;
  caption: string;
  hashtags: string[];
  imageHint: string;
  cta: string;
  scheduledHint: string;
};

const CORE_HASHTAGS_RO = [
  "#VaiasAparts",
  "#TârguNeamț",
  "#CazareNeamț",
  "#Moldova",
  "#MănăstiriNeamț",
  "#CetateaNeamțului",
  "#VacanțăRomânia",
];

const CORE_HASHTAGS_EN = [
  "#VaiasAparts",
  "#TarguNeamt",
  "#RomaniaTravel",
  "#Moldova",
  "#NeamtMonasteries",
  "#NeamtCitadel",
  "#BoutiqueStay",
];

const CATEGORY_HASHTAGS: Record<SocialPostCategory, string[]> = {
  apartment_showcase: ["#BoutiqueApartment", "#Apartamente", "#Hospitality"],
  review_repost: ["#GuestReview", "#ReviewVaias", "#HappyGuests"],
  event: ["#Pelerinaj", "#Eveniment", "#Tradiție"],
  tip: ["#TravelTip", "#GhidNeamț"],
  season: ["#PrimăvaraMoldovei", "#VaraNeamț", "#ToamnaMoldovei", "#IarnaNeamț"],
  monastery: ["#Agapia", "#Văratec", "#Sihăstria", "#MănăstireaNeamț"],
  behind_scenes: ["#BehindTheScenes", "#FamilieVaias"],
  partner_highlight: ["#HanRustic", "#Partener", "#LocalLove"],
};

function pickHashtags(category: SocialPostCategory, platform: SocialPlatform, lang: "ro" | "en"): string[] {
  const core = lang === "ro" ? CORE_HASHTAGS_RO : CORE_HASHTAGS_EN;
  const cat = CATEGORY_HASHTAGS[category];
  const limit = PLATFORM_LIMITS[platform].hashtags;
  return [...core, ...cat].slice(0, limit);
}

function apartmentShowcaseCaption(input: SocialPostInputs): string {
  const apt = input.apartmentSlug ? getApartmentBySlug(input.apartmentSlug) : apartments[0];
  if (!apt) return "Vila Vaias Aparts — apartamente boutique în Târgu Neamț.";
  if (input.language === "en") {
    return `${apt.name} — ${apt.tagline}.\n\n${apt.descriptionEN.slice(0, 300)}...\n\nDirect booking at vaiasaparts.ro — best price guaranteed.`;
  }
  return `${apt.name} — ${apt.tagline}.\n\n${apt.shortDescription}\n\nDirect bookings la vaiasaparts.ro — cel mai bun preț garantat. 📲 WhatsApp 0743 456 789.`;
}

function reviewRepostCaption(input: SocialPostInputs): string {
  const rev = input.reviewQuote ?? "Loc minunat, oameni dragi.";
  const who = input.reviewerName ?? "Oaspete";
  const stars = "⭐".repeat(Math.round(input.rating ?? 5));
  if (input.language === "en") {
    return `${stars}\n\n"${rev}"\n— ${who}\n\nThank you for choosing Vaias Aparts! 🙏\n\nBook direct → vaiasaparts.ro`;
  }
  return `${stars}\n\n"${rev}"\n— ${who}\n\nMulțumim că ne-ați ales! 🙏\n\nRezervare directă → vaiasaparts.ro`;
}

function eventCaption(input: SocialPostInputs): string {
  const subj = input.customSubject ?? "Eveniment special la Vaias Aparts";
  if (input.language === "en") {
    return `${subj}\n\nJoin us at Vaias Aparts — 7 boutique apartments in Târgu Neamț, 15 min from Agapia, Văratec, and Neamț monasteries.\n\nBook direct: vaiasaparts.ro`;
  }
  return `${subj}\n\nVă invităm la Vaias Aparts — 7 apartamente boutique în Târgu Neamț, la 15 minute de Agapia, Văratec și Mănăstirea Neamț.\n\nRezervare: vaiasaparts.ro / 0743 456 789`;
}

function tipCaption(input: SocialPostInputs): string {
  return input.language === "en"
    ? `Travel tip 💡\n\n${input.customSubject ?? "Best time to visit the Neamț monasteries: late spring or early autumn."}\n\nMore tips at vaiasaparts.ro/blog`
    : `Sfat de călătorie 💡\n\n${input.customSubject ?? "Cea mai bună perioadă pentru mănăstirile Neamț: sfârșit de primăvară sau început de toamnă."}\n\nMai multe sfaturi pe vaiasaparts.ro/blog`;
}

function seasonCaption(input: SocialPostInputs): string {
  const sLabel = input.season ?? "summer";
  const ro: Record<string, string> = {
    spring: "Primăvara în Moldova — pomii înflorit, mănăstirile pline de cântec, drumurile reluate.",
    summer: "Vara la Vaias Aparts — apartamente răcoroase, terase însorite, copii fericiți.",
    autumn: "Toamna în Neamț — culorile pe care le-au pictat icoanele. Vino să le vezi.",
    winter: "Iarna în Târgu Neamț — colinzi, brad în living, slujbe de la miezul nopții.",
  };
  const en: Record<string, string> = {
    spring: "Spring in Moldova — orchards in bloom, monasteries alive with song, roads open again.",
    summer: "Summer at Vaias Aparts — cool apartments, sunny terraces, happy kids.",
    autumn: "Autumn in Neamț — the colors painted in icons. Come see them.",
    winter: "Winter in Târgu Neamț — carols, Christmas trees, midnight services.",
  };
  return (input.language === "en" ? en : ro)[sLabel];
}

function monasteryCaption(input: SocialPostInputs): string {
  return input.language === "en"
    ? `Sacred Moldova 🙏\n\n${input.customSubject ?? "The Northern Moldavian monasteries — Agapia, Văratec, Neamț, Sihăstria — within 20 minutes of Vaias Aparts."}\n\nPilgrimage stays at vaiasaparts.ro`
    : `Moldova sfântă 🙏\n\n${input.customSubject ?? "Mănăstirile din nordul Moldovei — Agapia, Văratec, Neamț, Sihăstria — la 20 minute de Vaias Aparts."}\n\nPachete pelerini pe vaiasaparts.ro`;
}

function behindScenesCaption(input: SocialPostInputs): string {
  return input.language === "en"
    ? `Behind the scenes 🎬\n\n${input.customSubject ?? "Today: ironing the linens, baking welcome bread, checking every room twice."}\n\nDetails matter. Always. → vaiasaparts.ro`
    : `În culise 🎬\n\n${input.customSubject ?? "Astăzi: călcat lenjeria, copt pâinea de bun venit, verificat fiecare cameră de două ori."}\n\nDetaliile contează. Întotdeauna. → vaiasaparts.ro`;
}

function partnerHighlightCaption(input: SocialPostInputs): string {
  return input.language === "en"
    ? `Local love ❤️\n\n${input.customSubject ?? "Han Rustic — our favorite neighbour. Traditional Moldovan cuisine 200m from our villa."}\n\nWe book your table → vaiasaparts.ro/han-rustic`
    : `Iubire locală ❤️\n\n${input.customSubject ?? "Han Rustic — vecinul nostru drag. Bucătărie moldovenească tradițională la 200 m de vilă."}\n\nVă rezervăm masa → vaiasaparts.ro/han-rustic`;
}

const CAPTION_FNS: Record<SocialPostCategory, (i: SocialPostInputs) => string> = {
  apartment_showcase: apartmentShowcaseCaption,
  review_repost: reviewRepostCaption,
  event: eventCaption,
  tip: tipCaption,
  season: seasonCaption,
  monastery: monasteryCaption,
  behind_scenes: behindScenesCaption,
  partner_highlight: partnerHighlightCaption,
};

const CTA_BY_PLATFORM: Record<SocialPlatform, string> = {
  instagram: "Rezervă pe vaiasaparts.ro — link în bio",
  facebook: "Rezervă direct la vaiasaparts.ro — 0743 456 789",
  tiktok: "Link in bio — vaiasaparts.ro",
  linkedin: "B2B partnerships: contact@vaiasaparts.ro",
};

const SCHEDULE_HINT: Record<SocialPlatform, string> = {
  instagram: "Best at 18:00-21:00 local time, Tuesday & Friday",
  facebook: "Best at 12:00 or 19:00, Wednesday or Sunday",
  tiktok: "Best at 21:00-23:00, evenings",
  linkedin: "Best at 09:00 or 17:00, Tuesday-Thursday",
};

const IMAGE_HINT_BY_CATEGORY: Record<SocialPostCategory, string> = {
  apartment_showcase: "Wide-angle photo of apartment interior, natural light, bed made, terrace visible.",
  review_repost: "Quote card design — gold accent on cream, 5-star rating visible.",
  event: "Atmospheric photo (monastery candle, Christmas tree, Easter table) related to event.",
  tip: "Infographic card with key tip + Vaias Aparts logo bottom-right.",
  season: "Seasonal landscape — apple orchard, summer terrace, autumn leaves, snowy mountains.",
  monastery: "Close-up of monastery painting or wide shot of monastery courtyard, golden hour.",
  behind_scenes: "Authentic behind-scenes shot — hands ironing, table being set, fresh bread.",
  partner_highlight: "Photo at partner location (Han Rustic, lake, etc.) with Vaias Aparts representative.",
};

export function generateSocialPost(input: SocialPostInputs): SocialPostResult {
  const lang = input.language ?? "ro";
  const caption = CAPTION_FNS[input.category](input);
  const hashtags = pickHashtags(input.category, input.platform, lang);
  const finalCaption = `${caption}\n\n${hashtags.join(" ")}`;
  return {
    platform: input.platform,
    caption: finalCaption.slice(0, PLATFORM_LIMITS[input.platform].caption),
    hashtags,
    imageHint: IMAGE_HINT_BY_CATEGORY[input.category],
    cta: CTA_BY_PLATFORM[input.platform],
    scheduledHint: SCHEDULE_HINT[input.platform],
  };
}

/**
 * Weekly content calendar — generates 7 posts per platform.
 */
export function generateWeeklyCalendar(platform: SocialPlatform = "instagram", language: "ro" | "en" = "ro") {
  const rota: Array<{ day: string; input: SocialPostInputs }> = [
    { day: "Luni", input: { platform, category: "monastery", language } },
    { day: "Marți", input: { platform, category: "apartment_showcase", language, apartmentSlug: "apartament-3" } },
    { day: "Miercuri", input: { platform, category: "tip", language } },
    { day: "Joi", input: { platform, category: "review_repost", language, reviewQuote: "Locul perfect pentru reculegere și vacanță cu familia.", reviewerName: "Maria D., București", rating: 5 } },
    { day: "Vineri", input: { platform, category: "behind_scenes", language } },
    { day: "Sâmbătă", input: { platform, category: "partner_highlight", language } },
    { day: "Duminică", input: { platform, category: "season", language, season: "summer" } },
  ];
  return rota.map(r => ({ day: r.day, ...generateSocialPost(r.input) }));
}
