/**
 * VAIA OS — Agent 6: Upsell Engine.
 *
 * Builds personalized upsell recommendations across the guest journey:
 *   • Pre-arrival (offered after booking confirmation)
 *   • In-stay (offered Day 2)
 *   • Post-stay (offered after checkout)
 *
 * Personalization signals:
 *   - apartment slug (e.g. Apt 7 gets accessibility-friendly suggestions)
 *   - guest type (family, couple, pilgrim, business, diaspora, wellness)
 *   - language (RO default; EN for diaspora/foreign)
 *   - nights (some offers gated by min nights)
 */
export type UpsellCategory = "pre_arrival" | "in_stay" | "post_stay";
export type UpsellLanguage = "ro" | "en";
export type GuestType = "family" | "couple" | "pilgrim" | "business" | "diaspora" | "wellness" | "any";

export type UpsellOffer = {
  key: string;
  category: UpsellCategory;
  nameRO: string;
  nameEN: string;
  descriptionRO: string;
  descriptionEN: string;
  priceRON: number;
  unit?: string; // "/persoană", "/sejur", etc.
  minNights?: number;
  appliesTo?: GuestType[];
  excludeApartments?: string[];
  iconHint?: string;
};

export const UPSELL_CATALOG: UpsellOffer[] = [
  // ===== PRE-ARRIVAL =====
  {
    key: "early_checkin",
    category: "pre_arrival",
    nameRO: "Early check-in (de la 12:00)",
    nameEN: "Early check-in (from 12:00)",
    descriptionRO: "Acces în apartament cu 2 ore mai devreme — perfect dacă veniți după un drum lung.",
    descriptionEN: "Access to your apartment 2 hours earlier — perfect after a long journey.",
    priceRON: 50,
    unit: "/sejur",
    iconHint: "clock",
  },
  {
    key: "welcome_basket",
    category: "pre_arrival",
    nameRO: "Coș de bun venit",
    nameEN: "Welcome basket",
    descriptionRO: "Vin local, brânză de Neamț, pâine de casă, dulciuri de mănăstire — pregătit pentru momentul sosirii.",
    descriptionEN: "Local wine, Neamț cheese, home-baked bread, monastery sweets — ready for your arrival.",
    priceRON: 80,
    unit: "/sejur",
    appliesTo: ["family", "couple", "diaspora", "any"],
    iconHint: "gift",
  },
  {
    key: "han_rustic_reservation",
    category: "pre_arrival",
    nameRO: "Rezervare Han Rustic (lângă vilă)",
    nameEN: "Han Rustic reservation (next to villa)",
    descriptionRO: "Rezervăm noi masa la Han Rustic — cea mai apreciată locație tradițională din Târgu Neamț.",
    descriptionEN: "We book your table at Han Rustic — the most loved traditional restaurant in Târgu Neamț.",
    priceRON: 0,
    unit: "gratuit",
    iconHint: "utensils",
  },
  {
    key: "airport_transfer_iasi",
    category: "pre_arrival",
    nameRO: "Transfer aeroport Iași",
    nameEN: "Iași airport transfer",
    descriptionRO: "Transfer privat dus de la aeroportul Iași — 100–150 lei în funcție de oră.",
    descriptionEN: "Private one-way transfer from Iași airport — 100–150 RON depending on time.",
    priceRON: 150,
    unit: "/cursă",
    appliesTo: ["diaspora", "couple", "family", "any"],
    iconHint: "car",
  },
  {
    key: "fishing_bbq",
    category: "pre_arrival",
    nameRO: "Pescuit + BBQ la Refugiul Vaias",
    nameEN: "Fishing + BBQ at Refugiul Vaias",
    descriptionRO: "Zi întreagă la lacul nostru privat — undițe, momeli, BBQ inclus. Familie completă.",
    descriptionEN: "Full day at our private lake — rods, bait, BBQ included. Whole family fun.",
    priceRON: 150,
    unit: "/persoană",
    minNights: 2,
    appliesTo: ["family", "business", "any"],
    iconHint: "flame",
  },
  {
    key: "late_checkout",
    category: "pre_arrival",
    nameRO: "Late check-out (până la 14:00)",
    nameEN: "Late check-out (until 14:00)",
    descriptionRO: "Plecare relaxată după prânz — fără grabă în ultima dimineață.",
    descriptionEN: "Relaxed departure after lunch — no rush on your last morning.",
    priceRON: 50,
    unit: "/sejur",
    iconHint: "clock-2",
  },

  // ===== IN-STAY (offered Day 2) =====
  {
    key: "extend_stay",
    category: "in_stay",
    nameRO: "Prelungire sejur — încă o noapte",
    nameEN: "Extend your stay — one more night",
    descriptionRO: "Vă place la noi? Mai aveți disponibilitate pentru încă o noapte — la tarif redus 15%.",
    descriptionEN: "Enjoying your stay? We have availability for one more night — 15% off.",
    priceRON: 0,
    unit: "tarif redus 15%",
    iconHint: "calendar-plus",
  },
  {
    key: "lake_activity",
    category: "in_stay",
    nameRO: "După-amiază la lac",
    nameEN: "Afternoon at the lake",
    descriptionRO: "Refugiul Vaias — relaxare, pescuit recreativ și BBQ. Transferul îl asigurăm noi.",
    descriptionEN: "Refugiul Vaias — relaxation, recreational fishing, BBQ. We provide the transfer.",
    priceRON: 200,
    unit: "/grup",
    appliesTo: ["family", "couple", "business", "any"],
    iconHint: "waves",
  },
  {
    key: "monastery_tour",
    category: "in_stay",
    nameRO: "Tur ghidat mănăstiri (Agapia, Văratec, Neamț)",
    nameEN: "Guided monastery tour (Agapia, Văratec, Neamț)",
    descriptionRO: "Ghid local creștin ortodox — 4 ore, transport inclus pentru grup.",
    descriptionEN: "Local Orthodox guide — 4 hours, transport included for group.",
    priceRON: 350,
    unit: "/grup",
    appliesTo: ["pilgrim", "diaspora", "couple", "any"],
    iconHint: "church",
  },

  // ===== POST-STAY =====
  {
    key: "gift_voucher",
    category: "post_stay",
    nameRO: "Voucher cadou pentru prieteni",
    nameEN: "Gift voucher for friends",
    descriptionRO: "Faceți-le bucurie celor dragi cu un voucher pentru un sejur la Vaias Aparts.",
    descriptionEN: "Surprise loved ones with a Vaias Aparts stay voucher.",
    priceRON: 300,
    unit: "/voucher",
    iconHint: "ticket",
  },
  {
    key: "future_discount",
    category: "post_stay",
    nameRO: "Discount 10% la următoarea rezervare directă",
    nameEN: "10% off your next direct booking",
    descriptionRO: "Valabil 12 luni — rezervare directă pe WhatsApp sau site.",
    descriptionEN: "Valid 12 months — direct booking via WhatsApp or website.",
    priceRON: 0,
    unit: "gratuit",
    iconHint: "percent",
  },
  {
    key: "referral",
    category: "post_stay",
    nameRO: "Recomandare → 100 lei credit",
    nameEN: "Refer a friend → 100 RON credit",
    descriptionRO: "Recomandați-ne unui prieten care rezervă — primiți 100 lei credit pentru sejurul următor.",
    descriptionEN: "Refer a friend who books — receive 100 RON credit for your next stay.",
    priceRON: 0,
    unit: "credit",
    iconHint: "heart-handshake",
  },
];

export type UpsellRequest = {
  bookingRef?: string;
  guestName?: string;
  apartmentSlug?: string;
  guestType?: GuestType;
  language?: UpsellLanguage;
  nights?: number;
  category?: UpsellCategory;
};

export type GeneratedUpsell = {
  offer: UpsellOffer;
  rendered: string;
};

export type UpsellGenerationResult = {
  language: UpsellLanguage;
  guestName: string;
  category: UpsellCategory;
  offers: GeneratedUpsell[];
  message: string; // full ready-to-send message
};

function pickOffers(req: UpsellRequest): UpsellOffer[] {
  const cat = req.category ?? "pre_arrival";
  const guestType = req.guestType ?? "any";
  const nights = req.nights ?? 1;
  return UPSELL_CATALOG.filter(o => {
    if (o.category !== cat) return false;
    if (o.minNights && nights < o.minNights) return false;
    if (o.appliesTo && !o.appliesTo.includes(guestType) && !o.appliesTo.includes("any")) return false;
    if (o.excludeApartments && req.apartmentSlug && o.excludeApartments.includes(req.apartmentSlug)) return false;
    return true;
  });
}

function renderOfferLine(o: UpsellOffer, lang: UpsellLanguage): string {
  const name = lang === "ro" ? o.nameRO : o.nameEN;
  const desc = lang === "ro" ? o.descriptionRO : o.descriptionEN;
  const priceStr = o.priceRON > 0 ? ` — ${o.priceRON} lei${o.unit ? " " + o.unit : ""}` : ` — ${o.unit ?? (lang === "ro" ? "gratuit" : "free")}`;
  return `• *${name}*${priceStr}\n  ${desc}`;
}

const INTRO_RO: Record<UpsellCategory, (name: string) => string> = {
  pre_arrival: name => `Bună, ${name}! 👋\n\nNe pregătim de sosirea voastră la Vaias Aparts. Vă putem face sejurul și mai plăcut cu câteva opțiuni:`,
  in_stay: name => `Bună, ${name}! Sperăm că vă bucurați de timpul petrecut la noi. Câteva idei pentru ziua de azi:`,
  post_stay: name => `Bună, ${name}! Mulțumim că ați ales Vaias Aparts! Câteva moduri prin care putem rămâne aproape:`,
};

const INTRO_EN: Record<UpsellCategory, (name: string) => string> = {
  pre_arrival: name => `Hi ${name}! 👋\n\nWe're getting ready for your arrival at Vaias Aparts. A few options to make your stay even better:`,
  in_stay: name => `Hi ${name}! Hope you're enjoying your time with us. A few ideas for today:`,
  post_stay: name => `Hi ${name}! Thank you for choosing Vaias Aparts. A few ways we can stay in touch:`,
};

const OUTRO_RO = `\n\nRăspundeți la acest mesaj cu opțiunea care vă interesează și pregătim totul.\n\nCu drag,\nEchipa Vaias Aparts`;
const OUTRO_EN = `\n\nReply to this message with the option you'd like and we'll take care of it.\n\nWarmly,\nEchipa Vaias Aparts`;

export function generateUpsell(req: UpsellRequest): UpsellGenerationResult {
  const lang: UpsellLanguage = req.language ?? "ro";
  const cat: UpsellCategory = req.category ?? "pre_arrival";
  const name = req.guestName ?? (lang === "ro" ? "oaspete drag" : "dear guest");
  const offers = pickOffers(req);
  const intro = (lang === "ro" ? INTRO_RO : INTRO_EN)[cat](name);
  const outro = lang === "ro" ? OUTRO_RO : OUTRO_EN;

  const renderedOffers: GeneratedUpsell[] = offers.map(o => ({
    offer: o,
    rendered: renderOfferLine(o, lang),
  }));

  const message = `${intro}\n\n${renderedOffers.map(r => r.rendered).join("\n\n")}${outro}`;

  return {
    language: lang,
    guestName: name,
    category: cat,
    offers: renderedOffers,
    message,
  };
}
