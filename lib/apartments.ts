export type Apartment = {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  description: string;
  descriptionEN: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  guests: number;
  guestsMax: number;
  sizeSqm: number;
  floor: string;
  hasAC: boolean;
  hasTerrace: boolean;
  accessible: boolean;
  hasPrivateKitchen: boolean;
  /** Direct-booking base price (RON/night). Cheapest channel. */
  pricePerNightRON: number;
  pricePerNightEUR: number;
  weekendPriceRON: number;
  weekendPriceEUR: number;
  extraPersonRON: number;
  weeklyDiscountPct: number;
  /** Hard floor — never quote below this RON/night for this apartment. */
  floorPriceRON: number;
  rating: number;
  reviewsCount: number;
  view: string;
  amenities: string[];
  rooms: { name: string; description: string }[];
  rules: string[];
  heroImage: string;
  gallery: string[];
  youtubeId?: string;
  matterportId?: string;
};

/**
 * Commission rate per channel — used to compute the channel-displayed price
 * so the host nets the same direct rate after commission.
 *
 * Use `priceForChannel(apt, "booking")` to get the price shown on each OTA.
 */
export const CHANNEL_MARKUP_PCT = {
  direct: 0,
  airbnb: 5,
  travelminit: 15,
  h2b: 18,
  booking: 20,
} as const;

export type ChannelKey = keyof typeof CHANNEL_MARKUP_PCT;

export function priceForChannel(apt: Apartment, channel: ChannelKey): number {
  const markup = CHANNEL_MARKUP_PCT[channel];
  return Math.round(apt.pricePerNightRON * (1 + markup / 100));
}

const BASE = "https://www.vaiasaparts.ro/wp-content/uploads";

const defaultRules = [
  "Check-in: după ora 14:00",
  "Check-out: până la ora 11:00",
  "Fără fumat în interior",
  "Fără petreceri sau evenimente zgomotoase",
  "Liniște după ora 22:00",
  "Parcare gratuită disponibilă în curte — primul venit, primul servit",
  "Animalele de companie acceptate la cerere, fără cost suplimentar",
  "Self check-in cu ghidaj de la echipa noastră",
  "Persoană suplimentară pe canapeaua extensibilă: +50 RON/noapte"
];

export const apartments: Apartment[] = [
  {
    slug: "apartament-1",
    name: "Apartament 1",
    tagline: "Apartament întreg de 46,4 mp — dormitor, living, bucătărie și baie, doar pentru tine",
    shortDescription:
      "APARTAMENT COMPLET PRIVAT 46,4 mp (NU o cameră de hotel) — dormitor cu pat dublu, living cu canapele extensibile, bucătărie proprie cu masă de servit și baie. Capacitate 3-5 oaspeți, etaj 1.",
    description:
      "Apartament 1 este un APARTAMENT ÎNTREG PRIVAT de 46,4 mp — nu o cameră de hotel, ci propriul tău spațiu cu mai multe camere. Primești ușa ta, cheia ta, întreaga locuință doar pentru tine: dormitor (11,4 mp · 2,73×4,20 m) cu pat dublu și lenjerie premium de bumbac, living (11 mp) cu canapele extensibile pentru oaspeți suplimentari, bucătărie proprie complet utilată (9,7 mp) cu masă de servit, frigider, microunde, fierbător și prăjitor, o cameră mică (3,6 mp · 2,80×1,27 m) cu pat single — ideală pentru un copil sau un al treilea oaspete — și baie privată (2,9 mp). Capacitate optimă 3 oaspeți, maxim 5 folosind canapelele extensibile (50 RON/noapte persoana suplimentară). Etaj 1, la capătul coridorului stâng — liniștit, intim, complet al tău. Recenzii Google 5,0★, Booking 9,4 și #1 TripAdvisor în Târgu Neamț.",
    descriptionEN:
      "Apartment 1 is an ENTIRE PRIVATE APARTMENT of 46.4 sqm — not a hotel room, but your own multi-room home. You get your own door, your own key, the whole place to yourself: bedroom (11.4 sqm · 2.73×4.20 m) with a double bed and premium cotton linen, living room (11 sqm) with extendable sofa beds for extra guests, your own fully equipped kitchen (9.7 sqm) with dining table, fridge, microwave, kettle and toaster, a small room (3.6 sqm · 2.80×1.27 m) with a single bed — perfect for a child or third guest — and a private bathroom (2.9 sqm). Sleeps 3 comfortably, up to 5 using the sofa beds (50 RON/night for extra person). First floor, end of the left corridor — quiet, private, entirely yours. Google 5.0★, Booking 9.4, TripAdvisor #1 in Târgu Neamț.",
    bedrooms: 1,
    beds: 3,
    bathrooms: 1,
    guests: 3,
    guestsMax: 5,
    sizeSqm: 46.4,
    floor: "Etaj 1",
    hasAC: false,
    hasTerrace: true,
    accessible: false,
    hasPrivateKitchen: true,
    pricePerNightRON: 295,
    pricePerNightEUR: 0,
    weekendPriceRON: 320,
    weekendPriceEUR: 0,
    extraPersonRON: 50,
    weeklyDiscountPct: 15,
    floorPriceRON: 200,
    rating: 5.0,
    reviewsCount: 99,
    view: "Etaj 1 · Apartament complet 46,4 mp",
    amenities: [
      "Apartament întreg privat (nu cameră de hotel)",
      "46,4 mp cu 4 camere + baie",
      "WiFi gratuit de mare viteză",
      "Dormitor 11,4 mp cu pat dublu",
      "Cameră mică 3,6 mp cu pat single",
      "Living 11 mp cu canapele extensibile",
      "Bucătărie proprie 9,7 mp complet utilată",
      "Masă de servit în bucătărie",
      "Baie privată 2,9 mp",
      "Frigider mare",
      "Cuptor cu microunde",
      "Fierbător electric",
      "Prăjitor de pâine",
      "Smart TV",
      "Terasă privată",
      "Parcare gratuită în curte",
      "Lenjerie de bumbac premium",
      "Prosoape incluse",
      "CCTV 24/7 zone comune"
    ],
    rooms: [
      { name: "Dormitor · 11,4 mp", description: "2,73 × 4,20 m · Pat dublu, lenjerie premium de bumbac" },
      { name: "Cameră mică · 3,6 mp", description: "2,80 × 1,27 m · Pat single — ideală pentru un copil sau al treilea oaspete" },
      { name: "Living · 11 mp", description: "Canapele extensibile pentru oaspeți suplimentari, Smart TV" },
      { name: "Bucătărie proprie · 9,7 mp", description: "Masă de servit, frigider, microunde, fierbător, prăjitor — complet utilată" },
      { name: "Baie privată · 2,9 mp", description: "Duș, lavoar, WC, prosoape incluse" },
      { name: "Terasă privată", description: "Spațiu exterior privat" }
    ],
    rules: defaultRules,
    heroImage: `${BASE}/2022/12/Apartament1_VaiasaAparts_01.webp`,
    gallery: Array.from({ length: 19 }, (_, i) =>
      `${BASE}/2022/12/Apartament1_VaiasaAparts_${String(i + 1).padStart(2, "0")}.webp`
    )
  },
  {
    slug: "apartament-2",
    name: "Apartament 2",
    tagline: "Apartament întreg de 46,1 mp — dormitor, living, bucătărie și baie, doar pentru tine",
    shortDescription:
      "APARTAMENT COMPLET PRIVAT 46,1 mp (NU o cameră de hotel) — dormitor cu pat dublu, living cu canapea extensibilă, bucătărie proprie separată și baie. Capacitate 2-4 oaspeți, etaj 1.",
    description:
      "Apartament 2 este un APARTAMENT ÎNTREG PRIVAT de 46,1 mp — propria ta locuință cu mai multe camere, nu o cameră de hotel. Primești ușa ta, cheia ta și tot spațiul doar pentru tine: dormitor cu pat dublu și lenjerie moale de bumbac, living spațios cu canapea extensibilă pentru oaspeți suplimentari, bucătărie proprie separată complet utilată (frigider, microunde, fierbător, prăjitor, veselă) și baie privată. Capacitate optimă 2 oaspeți, maxim 4 folosind canapeaua extensibilă (50 RON/noapte persoana suplimentară). Etaj 1, coridorul stâng — liniștit, intim, complet al tău. Recenzii Google 5,0★, Booking 9,4 și #1 TripAdvisor în Târgu Neamț.",
    descriptionEN:
      "Apartment 2 is an ENTIRE PRIVATE APARTMENT of 46.1 sqm — your own multi-room home, not a hotel room. You get your own door, your own key, the whole place to yourself: bedroom with double bed and soft cotton bedding, spacious living room with extendable sofa for extra guests, separate fully equipped kitchen (fridge, microwave, kettle, toaster, cookware) and private bathroom. Sleeps 2 comfortably, up to 4 with the sofa bed (50 RON/night for extra person). First floor, left corridor — quiet, private, entirely yours. Google 5.0★, Booking 9.4, TripAdvisor #1 in Târgu Neamț.",
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    guests: 2,
    guestsMax: 4,
    sizeSqm: 46.1,
    floor: "Etaj 1",
    hasAC: false,
    hasTerrace: true,
    accessible: false,
    hasPrivateKitchen: true,
    pricePerNightRON: 295,
    pricePerNightEUR: 0,
    weekendPriceRON: 320,
    weekendPriceEUR: 0,
    extraPersonRON: 50,
    weeklyDiscountPct: 15,
    floorPriceRON: 200,
    rating: 5.0,
    reviewsCount: 99,
    view: "Etaj 1 · Apartament complet 46,1 mp",
    amenities: [
      "Apartament întreg privat (nu cameră de hotel)",
      "46,1 mp · dormitor + living + bucătărie + baie",
      "WiFi gratuit de mare viteză",
      "Dormitor cu pat dublu",
      "Living cu canapea extensibilă",
      "Bucătărie proprie separată complet utilată",
      "Frigider mare",
      "Cuptor cu microunde",
      "Fierbător electric",
      "Prăjitor de pâine",
      "Smart TV",
      "Baie privată",
      "Terasă privată",
      "Parcare gratuită în curte",
      "Lenjerie de bumbac premium",
      "Prosoape incluse"
    ],
    rooms: [
      { name: "Dormitor", description: "Pat dublu, lenjerie premium de bumbac" },
      { name: "Living", description: "Canapea extensibilă, Smart TV" },
      { name: "Bucătărie proprie separată", description: "Frigider, microunde, fierbător, prăjitor, veselă — complet utilată" },
      { name: "Baie privată", description: "Duș, lavoar, WC, prosoape incluse" },
      { name: "Terasă privată", description: "Spațiu exterior privat" }
    ],
    rules: defaultRules,
    heroImage: `${BASE}/2022/12/Apartament2_VaiasaAparts_01.webp`,
    gallery: Array.from({ length: 14 }, (_, i) =>
      `${BASE}/2022/12/Apartament2_VaiasaAparts_${String(i + 1).padStart(2, "0")}.webp`
    )
  },
  {
    slug: "apartament-3",
    name: "Apartament 3",
    tagline: "Cel mai mare apartament — 66,6 mp cu 2 dormitoare, doar pentru tine",
    shortDescription:
      "CEL MAI MARE APARTAMENT — 66,6 mp COMPLET PRIVAT (NU o cameră de hotel). 2 dormitoare cu pat dublu, living generos 25,8 mp cu zonă de luat masa și baie. 4-6 oaspeți, etaj 1.",
    description:
      "Apartament 3 este cel MAI MARE APARTAMENT din vilă — 66,6 mp ÎNTREG PRIVAT, nu o cameră de hotel. Două familii, două cupluri sau o familie mare cu copii primesc o locuință completă doar pentru ei: dormitorul 1 (14,4 mp · 3,70×4,32 m) cu pat dublu, dormitorul 2 (13,1 mp · 4,57×2,98 m) cu pat dublu, living impresionant de 25,8 mp (9,95×2,97 m) cu canapea galbenă și zonă de luat masa, baie privată (3,3 mp). Capacitate optimă 4 oaspeți, maxim 6 (50 RON/noapte persoana suplimentară). Etaj 1, prima ușă la stânga după scări — luminos, generos, complet al tău. Recenzii Google 5,0★, Booking 9,4 și #1 TripAdvisor în Târgu Neamț.",
    descriptionEN:
      "Apartment 3 is the LARGEST APARTMENT in the villa — an ENTIRE PRIVATE 66.6 sqm home, not a hotel room. Two families, two couples, or a large family with kids get a complete multi-room residence to themselves: bedroom 1 (14.4 sqm · 3.70×4.32 m) with double bed, bedroom 2 (13.1 sqm · 4.57×2.98 m) with double bed, impressive 25.8 sqm living room (9.95×2.97 m) with a yellow sofa and dining area, private bathroom (3.3 sqm). Sleeps 4 comfortably, up to 6 (50 RON/night extra person). First floor, first door on the left after the stairs — bright, generous, entirely yours. Google 5.0★, Booking 9.4, TripAdvisor #1 in Târgu Neamț.",
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    guests: 4,
    guestsMax: 6,
    sizeSqm: 66.6,
    floor: "Etaj 1",
    hasAC: false,
    hasTerrace: true,
    accessible: false,
    hasPrivateKitchen: true,
    pricePerNightRON: 595,
    pricePerNightEUR: 0,
    weekendPriceRON: 620,
    weekendPriceEUR: 0,
    extraPersonRON: 50,
    weeklyDiscountPct: 15,
    floorPriceRON: 400,
    rating: 5.0,
    reviewsCount: 99,
    view: "Etaj 1 · Cel mai mare — 66,6 mp · 2 dormitoare",
    amenities: [
      "CEL MAI MARE APARTAMENT — 66,6 mp",
      "Apartament întreg privat (nu cameră de hotel)",
      "2 dormitoare + living mare + baie",
      "WiFi gratuit de mare viteză",
      "Dormitor 1: 14,4 mp · pat dublu",
      "Dormitor 2: 13,1 mp · pat dublu",
      "Living 25,8 mp cu canapea galbenă",
      "Zonă de luat masa în living",
      "Bucătărie complet utilată",
      "Frigider mare",
      "Cuptor cu microunde",
      "Fierbător electric",
      "Prăjitor de pâine",
      "Smart TV",
      "Baie privată 3,3 mp",
      "Terasă privată cu masă și scaune",
      "Parcare gratuită în curte",
      "Lenjerie de bumbac premium",
      "Prosoape incluse"
    ],
    rooms: [
      { name: "Dormitor 1 · 14,4 mp", description: "3,70 × 4,32 m · Pat dublu, lenjerie premium" },
      { name: "Dormitor 2 · 13,1 mp", description: "4,57 × 2,98 m · Pat dublu, lenjerie premium" },
      { name: "Living · 25,8 mp", description: "9,95 × 2,97 m · Canapea galbenă, zonă de luat masa, Smart TV" },
      { name: "Bucătărie", description: "Complet utilată — frigider, microunde, fierbător, prăjitor" },
      { name: "Baie privată · 3,3 mp", description: "Duș, lavoar, WC, prosoape incluse" },
      { name: "Terasă privată", description: "Masă și scaune exterioare" }
    ],
    rules: defaultRules,
    heroImage: `${BASE}/2022/12/Apartament3_VaiasaAparts_01.webp`,
    gallery: Array.from({ length: 17 }, (_, i) =>
      `${BASE}/2022/12/Apartament3_VaiasaAparts_${String(i + 1).padStart(2, "0")}.webp`
    )
  },
  {
    slug: "apartament-4",
    name: "Apartament 4",
    tagline: "Apartament întreg de 61 mp cu 2 dormitoare și patio privat",
    shortDescription:
      "APARTAMENT COMPLET PRIVAT 61 mp (NU o cameră de hotel) — 2 dormitoare cu pat dublu, living cu canapea extensibilă, bucătărie, baie și patio/terasă. 4-6 oaspeți, etaj 1.",
    description:
      "Apartament 4 este un APARTAMENT ÎNTREG PRIVAT de 61 mp — propria ta locuință cu mai multe camere, nu o cameră de hotel. Două dormitoare cu pat dublu fiecare, living spațios cu canapea extensibilă pentru oaspeți suplimentari, bucătărie proprie complet utilată (frigider, microunde, fierbător, prăjitor), baie privată și patio/terasă proprie pentru cafea de dimineață sau cina sub stele. Capacitate optimă 4 oaspeți, maxim 6 (50 RON/noapte persoana suplimentară). Etaj 1, coridorul drept — generos, prietenos cu familiile, complet al tău. Recenzii Google 5,0★, Booking 9,4 și #1 TripAdvisor în Târgu Neamț.",
    descriptionEN:
      "Apartment 4 is an ENTIRE PRIVATE APARTMENT of 61 sqm — your own multi-room home, not a hotel room. Two bedrooms each with a double bed, spacious living room with extendable sofa for extra guests, fully equipped kitchen (fridge, microwave, kettle, toaster), private bathroom and your own patio/terrace for morning coffee or dinner under the stars. Sleeps 4 comfortably, up to 6 (50 RON/night extra person). First floor, right corridor — generous, family-friendly, entirely yours. Google 5.0★, Booking 9.4, TripAdvisor #1 in Târgu Neamț.",
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    guests: 4,
    guestsMax: 6,
    sizeSqm: 61,
    floor: "Etaj 1",
    hasAC: false,
    hasTerrace: true,
    accessible: false,
    hasPrivateKitchen: true,
    pricePerNightRON: 595,
    pricePerNightEUR: 0,
    weekendPriceRON: 620,
    weekendPriceEUR: 0,
    extraPersonRON: 50,
    weeklyDiscountPct: 15,
    floorPriceRON: 400,
    rating: 5.0,
    reviewsCount: 99,
    view: "Etaj 1 · 61 mp · 2 dormitoare · Patio",
    amenities: [
      "Apartament întreg privat (nu cameră de hotel)",
      "61 mp · 2 dormitoare + living + bucătărie + baie + patio",
      "WiFi gratuit de mare viteză",
      "2 dormitoare cu pat dublu",
      "Living cu canapea extensibilă",
      "Bucătărie proprie complet utilată",
      "Frigider mare",
      "Cuptor cu microunde",
      "Fierbător electric",
      "Prăjitor de pâine",
      "Smart TV",
      "Baie privată",
      "Patio/terasă privată",
      "Parcare gratuită în curte",
      "Lenjerie de bumbac premium",
      "Prosoape incluse"
    ],
    rooms: [
      { name: "Dormitor 1", description: "Pat dublu, lenjerie premium de bumbac" },
      { name: "Dormitor 2", description: "Pat dublu, lenjerie premium de bumbac" },
      { name: "Living", description: "Canapea extensibilă, Smart TV" },
      { name: "Bucătărie", description: "Frigider, microunde, fierbător, prăjitor — complet utilată" },
      { name: "Baie privată", description: "Duș/cadă, lavoar, WC, prosoape incluse" },
      { name: "Patio/terasă privată", description: "Spațiu exterior privat" }
    ],
    rules: defaultRules,
    heroImage: `${BASE}/2022/12/Apartament4_VaiasaAparts_01.webp`,
    gallery: Array.from({ length: 10 }, (_, i) =>
      `${BASE}/2022/12/Apartament4_VaiasaAparts_${String(i + 1).padStart(2, "0")}.webp`
    )
  },
  {
    slug: "apartament-5",
    name: "Apartament 5",
    tagline: "Apartament compact de ~33 mp, întreg al tău — cu aer condiționat",
    shortDescription:
      "APARTAMENT COMPLET PRIVAT ~33 mp (NU o cameră de hotel) — dormitor cu pat dublu, living cu canapea extensibilă portocalie, bucătărie open-space și baie. Cu AC. 2-4 oaspeți, etaj 2.",
    description:
      "Apartament 5 este un APARTAMENT ÎNTREG PRIVAT compact de aproximativ 33 mp — propriul tău spațiu cu mai multe zone, nu o cameră de hotel. Primești ușa ta, cheia ta și întreaga locuință: dormitor cu pat dublu și lenjerie de bumbac, zonă de living cu o canapea extensibilă portocalie (perfectă pentru un al treilea sau al patrulea oaspete), bucătărie open-space integrată complet utilată și baie privată. Aer condiționat propriu — singurul de la etaj 2 stânga. Capacitate optimă 2 oaspeți, maxim 4 (50 RON/noapte persoana suplimentară). Compact, dar tot al tău — fără holuri comune, fără vecini de cameră. Recenzii Google 5,0★, Booking 9,4 și #1 TripAdvisor în Târgu Neamț.",
    descriptionEN:
      "Apartment 5 is a compact ENTIRE PRIVATE APARTMENT of about 33 sqm — your own multi-zone space, not a hotel room. You get your own door, your own key, the whole place: bedroom with double bed and cotton linen, living area with an orange extendable sofa (perfect for a third or fourth guest), integrated open-plan kitchenette fully equipped, and private bathroom. Own air conditioning — the only one on the second floor left. Sleeps 2 comfortably, up to 4 (50 RON/night extra person). Compact but entirely yours — no shared hallways, no roommates. Google 5.0★, Booking 9.4, TripAdvisor #1 in Târgu Neamț.",
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    guests: 2,
    guestsMax: 4,
    sizeSqm: 33,
    floor: "Etaj 2",
    hasAC: true,
    hasTerrace: false,
    accessible: false,
    hasPrivateKitchen: true,
    pricePerNightRON: 295,
    pricePerNightEUR: 0,
    weekendPriceRON: 320,
    weekendPriceEUR: 0,
    extraPersonRON: 50,
    weeklyDiscountPct: 15,
    floorPriceRON: 200,
    rating: 5.0,
    reviewsCount: 99,
    view: "Etaj 2 · ~33 mp · Compact cu AC",
    amenities: [
      "Apartament întreg privat (nu cameră de hotel)",
      "~33 mp · dormitor + living + bucătărie + baie",
      "WiFi gratuit de mare viteză",
      "Aer condiționat propriu",
      "Dormitor cu pat dublu",
      "Canapea extensibilă portocalie",
      "Bucătărie open-space complet utilată",
      "Frigider",
      "Cuptor cu microunde",
      "Fierbător electric",
      "Smart TV",
      "Baie privată",
      "Parcare gratuită în curte",
      "Lenjerie de bumbac premium",
      "Prosoape incluse"
    ],
    rooms: [
      { name: "Dormitor", description: "Pat dublu, aer condiționat, lenjerie premium" },
      { name: "Living", description: "Canapea extensibilă portocalie, Smart TV" },
      { name: "Bucătărie open-space", description: "Integrată, complet utilată — frigider, microunde, fierbător" },
      { name: "Baie privată", description: "Duș, lavoar, WC, prosoape incluse" }
    ],
    rules: defaultRules,
    heroImage: `${BASE}/2022/12/Apartament5_VaiasaAparts_01.webp`,
    gallery: Array.from({ length: 17 }, (_, i) =>
      `${BASE}/2022/12/Apartament5_VaiasaAparts_${String(i + 1).padStart(2, "0")}.webp`
    ),
    matterportId: "6xEQUdBSM9w"
  },
  {
    slug: "apartament-6",
    name: "Apartament 6",
    tagline: "Apartament compact de ~35 mp, întreg al tău — cu aer condiționat",
    shortDescription:
      "APARTAMENT COMPLET PRIVAT ~35 mp (NU o cameră de hotel) — dormitor cu pat dublu, living cu canapea extensibilă portocalie, bucătărie open-space și baie. Cu AC. 2-4 oaspeți, etaj 2.",
    description:
      "Apartament 6 este un APARTAMENT ÎNTREG PRIVAT compact de aproximativ 35 mp — propriul tău spațiu cu mai multe zone, nu o cameră de hotel. Similar cu Apartament 5: ușa ta, cheia ta, locuința completă: dormitor cu pat dublu, zonă de living cu canapea extensibilă portocalie, bucătărie open-space integrată complet utilată și baie privată. Aer condiționat propriu — răcoare în zilele toride. Capacitate optimă 2 oaspeți, maxim 4 (50 RON/noapte persoana suplimentară). Etaj 2, dreapta — liniștit, intim, complet al tău. Recenzii Google 5,0★, Booking 9,4 și #1 TripAdvisor în Târgu Neamț.",
    descriptionEN:
      "Apartment 6 is a compact ENTIRE PRIVATE APARTMENT of about 35 sqm — your own multi-zone space, not a hotel room. Similar to Apartment 5: your door, your key, the complete home: bedroom with double bed, living area with orange extendable sofa, integrated open-plan kitchenette fully equipped, private bathroom. Own air conditioning — cool on hot days. Sleeps 2 comfortably, up to 4 (50 RON/night extra person). Second floor right — quiet, private, entirely yours. Google 5.0★, Booking 9.4, TripAdvisor #1 in Târgu Neamț.",
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    guests: 2,
    guestsMax: 4,
    sizeSqm: 35,
    floor: "Etaj 2",
    hasAC: true,
    hasTerrace: false,
    accessible: false,
    hasPrivateKitchen: true,
    pricePerNightRON: 295,
    pricePerNightEUR: 0,
    weekendPriceRON: 320,
    weekendPriceEUR: 0,
    extraPersonRON: 50,
    weeklyDiscountPct: 15,
    floorPriceRON: 200,
    rating: 5.0,
    reviewsCount: 99,
    view: "Etaj 2 · ~35 mp · Compact cu AC",
    amenities: [
      "Apartament întreg privat (nu cameră de hotel)",
      "~35 mp · dormitor + living + bucătărie + baie",
      "WiFi gratuit de mare viteză",
      "Aer condiționat propriu",
      "Dormitor cu pat dublu",
      "Canapea extensibilă portocalie",
      "Bucătărie open-space complet utilată",
      "Frigider",
      "Cuptor cu microunde",
      "Fierbător electric",
      "Smart TV",
      "Baie privată",
      "Parcare gratuită în curte",
      "Lenjerie de bumbac premium",
      "Prosoape incluse"
    ],
    rooms: [
      { name: "Dormitor", description: "Pat dublu, aer condiționat, lenjerie premium" },
      { name: "Living", description: "Canapea extensibilă portocalie, Smart TV" },
      { name: "Bucătărie open-space", description: "Integrată, complet utilată — frigider, microunde, fierbător" },
      { name: "Baie privată", description: "Duș, lavoar, WC, prosoape incluse" }
    ],
    rules: defaultRules,
    heroImage: `${BASE}/2022/12/Apartament6_VaiasaAparts_02.webp`,
    gallery: [
      `${BASE}/2022/12/Apartament6_VaiasaAparts_02.webp`,
      `${BASE}/2022/12/Apartament6_VaiasaAparts_03.webp`,
      `${BASE}/2022/12/Apartament6_VaiasaAparts_04.webp`,
      `${BASE}/2022/12/Apartament6_VaiasaAparts_05.webp`,
      `${BASE}/2022/12/Apartament6_VaiasaAparts_06.webp`,
      `${BASE}/2022/12/Apartament6_VaiasaAparts_07.webp`,
      `${BASE}/2022/12/Apartament6_VaiasaAparts_08.webp`,
      `${BASE}/2022/12/Apartament6_VaiasaAparts_09.webp`,
      `${BASE}/2022/12/Apartament6_VaiasaAparts_10.webp`,
      `${BASE}/2022/12/Apartament6_VaiasaAparts_11.webp`,
      `${BASE}/2022/12/Apartament6_VaiasaAparts_12.webp`
    ]
  },
  {
    slug: "apartament-7",
    name: "Apartament 7",
    tagline: "Apartament de 56,1 mp la parter — fără trepte, întreg al tău",
    shortDescription:
      "APARTAMENT COMPLET PRIVAT 56,1 mp la PARTER, fără trepte (NU o cameră de hotel) — dormitor cu pat dublu, living, frigider + microunde în apartament + bucătărie mare alături. Prietenos mobilitate redusă. 2-4 oaspeți.",
    description:
      "Apartament 7 este un APARTAMENT ÎNTREG PRIVAT de 56,1 mp la PARTER — propriul tău spațiu cu mai multe camere, fără trepte, prietenos pentru oaspeții cu mobilitate redusă. NU este o cameră de hotel: primești ușa ta, cheia ta și tot apartamentul: dormitor (12,1 mp) cu pat dublu și lenjerie de bumbac, living spațios (14,8 mp) cu canapea extensibilă și fotoliu, coridor-bucătărie propriu (5,3 mp) cu frigider și cuptor cu microunde CHIAR ÎN APARTAMENT, și baie privată (4 mp). Pentru gătit pe foc, ai bucătăria mare comunitară (12,4 mp · 4,47×2,57 m) chiar lângă ușa ta — complet utilată cu aragaz, cuptor, frigider mare și toate ustensilele. Capacitate optimă 2 oaspeți, maxim 4 (50 RON/noapte persoana suplimentară). Liniștit, accesibil, complet al tău. Recenzii Google 5,0★, Booking 9,4 și #1 TripAdvisor în Târgu Neamț.",
    descriptionEN:
      "Apartment 7 is an ENTIRE PRIVATE APARTMENT of 56.1 sqm on the GROUND FLOOR — your own multi-room space, no stairs, friendly for guests with reduced mobility. NOT a hotel room: your door, your key, the whole apartment: bedroom (12.1 sqm) with double bed and cotton linen, spacious living (14.8 sqm) with extendable sofa and armchair, your own kitchen corridor (5.3 sqm) with fridge and microwave RIGHT INSIDE THE APARTMENT, and private bathroom (4 sqm). For cooking on a stove, the large shared kitchen (12.4 sqm · 4.47×2.57 m) is right next door — fully equipped with stove, oven, large fridge and all cookware. Sleeps 2 comfortably, up to 4 (50 RON/night extra person). Quiet, accessible, entirely yours. Google 5.0★, Booking 9.4, TripAdvisor #1 in Târgu Neamț.",
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    guests: 2,
    guestsMax: 4,
    sizeSqm: 56.1,
    floor: "Parter",
    hasAC: false,
    hasTerrace: true,
    accessible: true,
    hasPrivateKitchen: false,
    pricePerNightRON: 295,
    pricePerNightEUR: 0,
    weekendPriceRON: 320,
    weekendPriceEUR: 0,
    extraPersonRON: 50,
    weeklyDiscountPct: 15,
    floorPriceRON: 200,
    rating: 5.0,
    reviewsCount: 99,
    view: "Parter · 56,1 mp · Fără trepte",
    amenities: [
      "Apartament întreg privat (nu cameră de hotel)",
      "56,1 mp la parter — fără trepte",
      "WiFi gratuit de mare viteză",
      "Dormitor 12,1 mp cu pat dublu",
      "Living 14,8 mp cu canapea extensibilă și fotoliu",
      "Coridor-bucătărie 5,3 mp cu frigider + microunde ÎN apartament",
      "Acces la bucătăria mare alături (12,4 mp, complet utilată)",
      "Smart TV",
      "Baie privată 4 mp",
      "Terasă privată",
      "Fără trepte — parter",
      "Spații generoase, prietenos mobilitate redusă",
      "Parcare gratuită în curte",
      "Lenjerie de bumbac premium",
      "Prosoape incluse"
    ],
    rooms: [
      { name: "Dormitor · 12,1 mp", description: "Pat dublu, lenjerie premium" },
      { name: "Living · 14,8 mp", description: "Canapea extensibilă și fotoliu, Smart TV" },
      { name: "Coridor-bucătărie · 5,3 mp", description: "Frigider și cuptor cu microunde CHIAR ÎN apartament" },
      { name: "Baie privată · 4 mp", description: "Duș accesibil, lavoar, WC, prosoape incluse" },
      { name: "Bucătăria mare alături · 12,4 mp", description: "4,47 × 2,57 m · Aragaz, cuptor, frigider mare, ustensile — comună, complet utilată" },
      { name: "Terasă privată", description: "Spațiu exterior privat" }
    ],
    rules: [
      "Check-in: după ora 14:00",
      "Check-out: până la ora 11:00",
      "Fără fumat în interior",
      "Fără petreceri sau evenimente zgomotoase",
      "Liniște după ora 22:00",
      "Parcare gratuită disponibilă în curte — primul venit, primul servit",
      "Animalele de companie acceptate la cerere, fără cost suplimentar",
      "Self check-in cu ghidaj de la echipa noastră",
      "Persoană suplimentară pe canapeaua extensibilă: +50 RON/noapte",
      "Acces la bucătăria mare comunitară de alături — inclus"
    ],
    heroImage: "https://www.vaiasaparts.ro/wp-content/uploads/2026/04/516492579_733556772950876_3694245894075396123_n.webp",
    gallery: [
      "https://www.vaiasaparts.ro/wp-content/uploads/2026/04/516492579_733556772950876_3694245894075396123_n.webp",
      "https://www.vaiasaparts.ro/wp-content/uploads/2026/04/518199043_733557542950799_1039072054897679506_n.webp",
      "https://www.vaiasaparts.ro/wp-content/uploads/2026/04/518272256_733556742950879_6883338769382424532_n.webp",
      "https://www.vaiasaparts.ro/wp-content/uploads/2026/04/518277917_733556719617548_6039837942695933401_n.webp",
      "https://www.vaiasaparts.ro/wp-content/uploads/2026/04/518333555_733556406284246_5206156284237423621_n.webp",
      "https://www.vaiasaparts.ro/wp-content/uploads/2026/04/518335038_733557552950798_4553339340452107002_n.webp"
    ]
  }
];

export function getApartmentBySlug(slug: string): Apartment | undefined {
  return apartments.find((a) => a.slug === slug);
}

export function getRelatedApartments(slug: string, count = 3): Apartment[] {
  return apartments.filter((a) => a.slug !== slug).slice(0, count);
}

export function calculatePriceRON(
  apartment: Apartment,
  nights: number
): {
  basePrice: number;
  totalBeforeDiscount: number;
  discountPct: number;
  discountLabel: string;
  discount: number;
  total: number;
  currency: string;
} {
  const base = apartment.pricePerNightRON;
  let discountPct = 0;
  let discountLabel = "";

  if (nights === 1) {
    discountPct = 0;
  } else if (nights <= 3) {
    discountPct = 10;
    discountLabel = "2-3 nopți";
  } else if (nights <= 6) {
    discountPct = 15;
    discountLabel = "4-6 nopți";
  } else {
    discountPct = 25;
    discountLabel = "Sejur lung 7+ nopți";
  }

  const totalBeforeDiscount = base * nights;
  const discount = Math.round(totalBeforeDiscount * discountPct / 100);
  const total = totalBeforeDiscount - discount;

  return {
    basePrice: base,
    totalBeforeDiscount,
    discountPct,
    discountLabel,
    discount,
    total,
    currency: "RON"
  };
}

export const VILLA_PROPERTY_PHOTOS = [
  `${BASE}/2022/12/Vaias_aparts_16.jpg`,
  `${BASE}/2022/12/Vaias_aparts_11.jpg`,
  `${BASE}/2022/12/Vaias_aparts_12.jpg`,
  `${BASE}/2022/12/Vaias_aparts_7.jpg`,
  `${BASE}/2022/12/Vaias_aparts_8.jpg`,
  `${BASE}/2022/12/Vaias_aparts_6.jpg`,
  `${BASE}/2022/12/Vaias_aparts_5.jpg`,
  `${BASE}/2022/12/Vaias_aparts_4.jpg`,
  `${BASE}/2022/12/Vaias_8.jpg`,
  `${BASE}/2022/12/Vaias_7.jpg`,
  `${BASE}/2022/12/Vaias_6.jpg`,
  `${BASE}/2022/12/Vaias_4.jpg`
];
