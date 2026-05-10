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
  pricePerNightRON: number;
  pricePerNightEUR: number;
  weekendPriceRON: number;
  weekendPriceEUR: number;
  weeklyDiscountPct: number;
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

const BASE = "https://www.vaiasaparts.ro/wp-content/uploads";

const defaultRules = [
  "Check-in: după ora 14:00",
  "Check-out: până la ora 11:00",
  "Fără fumat în interior",
  "Fără petreceri sau evenimente zgomotoase",
  "Liniște după ora 22:00",
  "Parcare gratuită disponibilă în curte — primul venit, primul servit",
  "Animalele de companie acceptate la cerere, fără cost suplimentar",
  "Self check-in cu ghidaj de la echipa noastră"
];

export const apartments: Apartment[] = [
  {
    slug: "apartament-1",
    name: "Apartament 1",
    tagline: "Intimitate și confort la capătul coridorului",
    shortDescription:
      "Apartament elegant cu dormitor Emperor 2m×2m, living spațios cu canapea extensibilă și bucătărie complet utilată — la etaj 1, la capătul coridorului stâng.",
    description:
      "Apartament 1 vă primește cu liniștea etajului întâi, departe de zgomotul orașului. Poziționat la capătul coridorului stâng, dormitorul are un pat Emperor de 2m×2m cu lenjerie moale de bumbac premium, iar living-ul deschis invită la seri de relaxare. Canapea extensibilă dublă și fotoliul confortabil completează spațiul, perfect pentru 3 până la 5 oaspeți. Bucătăria proprie complet utilată include frigider mare, cuptor cu microunde, fierbător electric și prăjitor de pâine — tot ce vă trebuie pentru micul dejun de dimineață sau cina la lumina lumânărilor. Terasa privată vă oferă un colț al vostru sub cerul Moldovei. WiFi gratuit de mare viteză, televizor smart și tot confortul pentru un sejur tihnit în Târgu Neamț.",
    descriptionEN:
      "Apartment 1 welcomes you with the calm of the first floor, tucked away at the end of the left corridor. The bedroom features a 2m×2m Emperor bed with premium cotton bedding, while the open living room invites relaxing evenings. A double sofa bed and armchair complete the space, perfect for 3 to 5 guests. The fully equipped private kitchenette includes a large fridge, microwave, electric kettle and toaster. The private terrace gives you your own corner under the Moldavian sky. Free high-speed WiFi, smart TV, and every comfort for a restful stay in Târgu Neamț.",
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    guests: 3,
    guestsMax: 5,
    sizeSqm: 52,
    floor: "Etaj 1",
    hasAC: false,
    hasTerrace: true,
    accessible: false,
    hasPrivateKitchen: true,
    pricePerNightRON: 297,
    pricePerNightEUR: 0,
    weekendPriceRON: 320,
    weekendPriceEUR: 0,
    weeklyDiscountPct: 15,
    rating: 5.0,
    reviewsCount: 97,
    view: "Etaj 1 · Coridor stâng, capăt",
    amenities: [
      "WiFi gratuit de mare viteză",
      "Pat Emperor 2m×2m",
      "Canapea extensibilă dublă",
      "Fotoliu",
      "Bucătărie privată complet utilată",
      "Frigider mare",
      "Cuptor cu microunde",
      "Fierbător electric",
      "Prăjitor de pâine",
      "Smart TV",
      "Baie privată",
      "Terasă privată",
      "Parcare gratuită în curte",
      "Lenjerie de bumbac premium",
      "Prosoape incluse",
      "CCTV 24/7 zone comune"
    ],
    rooms: [
      { name: "Dormitor", description: "Pat Emperor 2m×2m, lenjerie de bumbac premium" },
      { name: "Living", description: "Canapea extensibilă dublă, fotoliu, Smart TV" },
      { name: "Bucătărie", description: "Frigider mare, microunde, fierbător, prăjitor de pâine" },
      { name: "Baie", description: "Duș, lavoar, WC, prosoave incluse" },
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
    tagline: "Spațiu propriu, liniște garantată la etaj 1",
    shortDescription:
      "Apartament cu dormitor Emperor 2m×2m, living cu canapea extensibilă, bucătărie proprie și terasă privată — etaj 1, coridor stâng.",
    description:
      "Apartament 2 este sora mai liniștită a primului — aceeași calitate, aceeași îngrijire, un alt unghi de lumină. Situat pe coridorul stâng al etajului 1, apartamentul oferă un dormitor cu pat Emperor de 2m×2m, living spațios cu canapea extensibilă dublă și fotoliu confortabil, plus o bucătărie proprie complet utilată cu frigider, microunde, fierbător și prăjitor. Terasa privată vă invită să admirați liniștea dimineții cu o cafea caldă. Capacitate 3-5 oaspeți. La ieșire, pe coridorul de la etaj, auziți uneori clopotele îndepărtate ale mănăstirii — un detaliu pe care oaspeții noștri îl menționează mereu.",
    descriptionEN:
      "Apartment 2 is the quieter sibling of the first — same quality, same care, a different angle of light. Located on the left corridor of the first floor, it offers a bedroom with a 2m×2m Emperor bed, a spacious living room with a double sofa bed and armchair, plus a fully equipped private kitchenette. The private terrace invites you to enjoy morning coffee in peace. Capacity 3–5 guests. On the corridor outside, you can sometimes hear distant monastery bells — a detail guests always mention.",
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    guests: 3,
    guestsMax: 5,
    sizeSqm: 52,
    floor: "Etaj 1",
    hasAC: false,
    hasTerrace: true,
    accessible: false,
    hasPrivateKitchen: true,
    pricePerNightRON: 297,
    pricePerNightEUR: 0,
    weekendPriceRON: 320,
    weekendPriceEUR: 0,
    weeklyDiscountPct: 15,
    rating: 5.0,
    reviewsCount: 97,
    view: "Etaj 1 · Coridor stâng",
    amenities: [
      "WiFi gratuit de mare viteză",
      "Pat Emperor 2m×2m",
      "Canapea extensibilă dublă",
      "Fotoliu",
      "Bucătărie privată complet utilată",
      "Frigider mare",
      "Cuptor cu microunde",
      "Fierbător electric",
      "Prăjitor de pâine",
      "Smart TV",
      "Baie privată",
      "Terasă privată",
      "Parcare gratuită în curte",
      "Lenjerie de bumbac premium",
      "Prosoave incluse"
    ],
    rooms: [
      { name: "Dormitor", description: "Pat Emperor 2m×2m, lenjerie de bumbac premium" },
      { name: "Living", description: "Canapea extensibilă dublă, fotoliu, Smart TV" },
      { name: "Bucătărie", description: "Frigider mare, microunde, fierbător, prăjitor de pâine" },
      { name: "Baie", description: "Duș, lavoar, WC, prosoave incluse" },
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
    tagline: "Două dormitoare, primul la stânga după scări",
    shortDescription:
      "Apartament cu două dormitoare Emperor 2m×2m, living cu canapea extensibilă și terasă cu mobilier exterior — etaj 1, prima ușă la stânga.",
    description:
      "Apartament 3 este alegerea familiilor sau a grupurilor mici — două dormitoare cu paturi Emperor de 2m×2m, un living generos cu canapea extensibilă pentru oaspeți suplimentari și o bucătărie complet echipată. Terasa privată cu masă și scaune exterioare vă invită la micul dejun în aer liber sau la un pahar de vin la apus. Situat la primul etaj, prima ușă la stânga după urcarea scărilor principale, are o poziție privilegiată — luminos și prietenos. Capacitate 4-6 oaspeți. Copiii sunt bineveniți.",
    descriptionEN:
      "Apartment 3 is the perfect choice for families or small groups — two bedrooms with 2m×2m Emperor beds, a generous living room with a sofa bed for extra guests, and a fully equipped kitchenette. The private terrace with outdoor table and chairs invites breakfast in the fresh air or an evening glass of wine. Located on the first floor, first door on the left after climbing the main stairs. Capacity 4–6 guests. Children are very welcome.",
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    guests: 4,
    guestsMax: 6,
    sizeSqm: 70,
    floor: "Etaj 1",
    hasAC: false,
    hasTerrace: true,
    accessible: false,
    hasPrivateKitchen: true,
    pricePerNightRON: 547,
    pricePerNightEUR: 0,
    weekendPriceRON: 580,
    weekendPriceEUR: 0,
    weeklyDiscountPct: 15,
    rating: 5.0,
    reviewsCount: 97,
    view: "Etaj 1 · Prima ușă stânga",
    amenities: [
      "WiFi gratuit de mare viteză",
      "2 × Pat Emperor 2m×2m",
      "Canapea extensibilă în living",
      "Bucătărie privată complet utilată",
      "Frigider mare",
      "Cuptor cu microunde",
      "Fierbător electric",
      "Prăjitor de pâine",
      "Smart TV",
      "Baie privată",
      "Terasă privată cu masă și scaune",
      "Parcare gratuită în curte",
      "Lenjerie de bumbac premium",
      "Prosoave incluse"
    ],
    rooms: [
      { name: "Dormitor 1", description: "Pat Emperor 2m×2m, lenjerie de bumbac premium" },
      { name: "Dormitor 2", description: "Pat Emperor 2m×2m, lenjerie de bumbac premium" },
      { name: "Living", description: "Canapea extensibilă, Smart TV" },
      { name: "Bucătărie", description: "Frigider mare, microunde, fierbător, prăjitor de pâine" },
      { name: "Baie", description: "Duș, lavoar, WC, prosoave incluse" },
      { name: "Terasă", description: "Masă și scaune exterioare" }
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
    tagline: "Două dormitoare generoase la etaj 1 dreapta",
    shortDescription:
      "Al doilea apartament cu două dormitoare Emperor 2m×2m la etaj 1, pe coridorul drept — spațiu generos pentru 4-6 oaspeți.",
    description:
      "Apartament 4 completează perechea apartamentelor cu două dormitoare de la etaj 1 — de data aceasta pe coridorul drept. Același spațiu generos, aceeași grijă pentru detalii — pat Emperor 2m×2m în fiecare dormitor, living cu canapea extensibilă, bucătărie proprie complet echipată cu frigider, microunde, fierbător și prăjitor de pâine, și o terasă privată. Baie privată cu cadă — o raritate printre apartamentele noastre. Ideal pentru familii cu copii sau pentru două cupluri care preferă independența. Capacitate 4-6 oaspeți.",
    descriptionEN:
      "Apartment 4 completes the pair of two-bedroom apartments on the first floor — this time on the right corridor. Same generous space, same attention to detail — 2m×2m Emperor bed in each bedroom, living room with sofa bed, fully equipped private kitchenette, and a private terrace. Private bathroom with bathtub — a rarity among our apartments. Ideal for families with children or two couples who prefer independence. Capacity 4–6 guests.",
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    guests: 4,
    guestsMax: 6,
    sizeSqm: 70,
    floor: "Etaj 1",
    hasAC: false,
    hasTerrace: true,
    accessible: false,
    hasPrivateKitchen: true,
    pricePerNightRON: 547,
    pricePerNightEUR: 0,
    weekendPriceRON: 580,
    weekendPriceEUR: 0,
    weeklyDiscountPct: 15,
    rating: 5.0,
    reviewsCount: 97,
    view: "Etaj 1 · Coridor drept",
    amenities: [
      "WiFi gratuit de mare viteză",
      "2 × Pat Emperor 2m×2m",
      "Canapea extensibilă în living",
      "Bucătărie privată complet utilată",
      "Frigider mare",
      "Cuptor cu microunde",
      "Fierbător electric",
      "Prăjitor de pâine",
      "Smart TV",
      "Baie privată cu cadă",
      "Terasă privată",
      "Parcare gratuită în curte",
      "Lenjerie de bumbac premium",
      "Prosoave incluse"
    ],
    rooms: [
      { name: "Dormitor 1", description: "Pat Emperor 2m×2m, lenjerie de bumbac premium" },
      { name: "Dormitor 2", description: "Pat Emperor 2m×2m, lenjerie de bumbac premium" },
      { name: "Living", description: "Canapea extensibilă, Smart TV" },
      { name: "Bucătărie", description: "Frigider mare, microunde, fierbător, prăjitor de pâine" },
      { name: "Baie", description: "Cadă, lavoar, WC, prosoave incluse" },
      { name: "Terasă privată", description: "Spațiu exterior privat" }
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
    tagline: "Aer condiționat, canapea L și vedere largă la etaj 2",
    shortDescription:
      "Apartament cu aer condiționat, dormitor Emperor, canapea L extensibilă și bucătărie proprie — etaj 2, stânga. Capacitate 3-5 oaspeți.",
    description:
      "Apartament 5 este ales de cei care apreciază confortul termic în orice anotimp — singurul de la etaj 2 stânga cu aer condiționat propriu. Dormitorul cu pat Emperor 2m×2m se completează cu o canapea extensibilă tip L în living, perfectă pentru un al treilea, al patrulea sau al cincilea oaspete. Bucătăria proprie complet utilată include frigider mare, microunde, fierbător și prăjitor de pâine. Terasa privată oferă o privire mai largă asupra împrejurimilor — mai mult cer, mai mult verde. Capacitate 3-5 oaspeți.",
    descriptionEN:
      "Apartment 5 is chosen by those who appreciate thermal comfort in any season — the only apartment on the second floor left side with its own air conditioning. The bedroom with 2m×2m Emperor bed is complemented by an L-shaped sofa bed in the living room, perfect for a third, fourth, or fifth guest. The fully equipped private kitchenette includes a large fridge, microwave, electric kettle and toaster. The private terrace offers a wider view of the surroundings. Capacity 3–5 guests.",
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    guests: 3,
    guestsMax: 5,
    sizeSqm: 52,
    floor: "Etaj 2",
    hasAC: true,
    hasTerrace: true,
    accessible: false,
    hasPrivateKitchen: true,
    pricePerNightRON: 297,
    pricePerNightEUR: 0,
    weekendPriceRON: 320,
    weekendPriceEUR: 0,
    weeklyDiscountPct: 15,
    rating: 5.0,
    reviewsCount: 97,
    view: "Etaj 2 · Stânga · Aer condiționat",
    amenities: [
      "WiFi gratuit de mare viteză",
      "Pat Emperor 2m×2m",
      "Aer condiționat",
      "Canapea extensibilă tip L",
      "Bucătărie privată complet utilată",
      "Frigider mare",
      "Cuptor cu microunde",
      "Fierbător electric",
      "Prăjitor de pâine",
      "Smart TV",
      "Baie privată",
      "Terasă privată",
      "Parcare gratuită în curte",
      "Lenjerie de bumbac premium",
      "Prosoave incluse"
    ],
    rooms: [
      { name: "Dormitor", description: "Pat Emperor 2m×2m, aer condiționat, lenjerie premium" },
      { name: "Living", description: "Canapea extensibilă tip L, Smart TV" },
      { name: "Bucătărie", description: "Frigider mare, microunde, fierbător, prăjitor de pâine" },
      { name: "Baie", description: "Duș, lavoar, WC, prosoave incluse" },
      { name: "Terasă privată", description: "Vedere spre împrejurimi" }
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
    tagline: "Răcoare și liniște la etaj 2, dreapta",
    shortDescription:
      "Apartament cu aer condiționat și pat Emperor la etaj 2 dreapta — confort complet pentru 3-5 oaspeți, cu terasă privată.",
    description:
      "Apartament 6 vă oferă intimitatea etajului 2 dreapta și răcoarea aerului condiționat în serile calde de vară. Dormitorul cu pat Emperor 2m×2m, living confortabil cu canapea extensibilă și TV smart, bucătărie proprie completă cu frigider, microunde, fierbător și prăjitor — tot ce aveți nevoie pentru un sejur fără griji. Terasa privată vă oferă un colț liniștit al vostru. La fel ca toate apartamentele noastre, este pregătit cu lenjerie moale și prosoave curate. Capacitate 3-5 oaspeți.",
    descriptionEN:
      "Apartment 6 offers the privacy of the second floor right side and the coolness of air conditioning on warm summer evenings. The bedroom with 2m×2m Emperor bed, comfortable living room with sofa bed and smart TV, fully equipped private kitchenette — everything you need for a worry-free stay. The private terrace offers your own quiet corner. Capacity 3–5 guests.",
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    guests: 3,
    guestsMax: 5,
    sizeSqm: 50,
    floor: "Etaj 2",
    hasAC: true,
    hasTerrace: true,
    accessible: false,
    hasPrivateKitchen: true,
    pricePerNightRON: 297,
    pricePerNightEUR: 0,
    weekendPriceRON: 320,
    weekendPriceEUR: 0,
    weeklyDiscountPct: 15,
    rating: 5.0,
    reviewsCount: 97,
    view: "Etaj 2 · Dreapta · Aer condiționat",
    amenities: [
      "WiFi gratuit de mare viteză",
      "Pat Emperor 2m×2m",
      "Aer condiționat",
      "Canapea extensibilă",
      "Bucătărie privată complet utilată",
      "Frigider mare",
      "Cuptor cu microunde",
      "Fierbător electric",
      "Prăjitor de pâine",
      "Smart TV",
      "Baie privată",
      "Terasă privată",
      "Parcare gratuită în curte",
      "Lenjerie de bumbac premium",
      "Prosoave incluse"
    ],
    rooms: [
      { name: "Dormitor", description: "Pat Emperor 2m×2m, aer condiționat, lenjerie premium" },
      { name: "Living", description: "Canapea extensibilă, Smart TV" },
      { name: "Bucătărie", description: "Frigider mare, microunde, fierbător, prăjitor de pâine" },
      { name: "Baie", description: "Duș, lavoar, WC, prosoave incluse" },
      { name: "Terasă privată", description: "Spațiu exterior privat" }
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
    tagline: "La parter, fără trepte — prietenos pentru toți",
    shortDescription:
      "Apartament la parter stânga, fără trepte, cu pat Emperor, baie privată, frigider și acces la Bucătăria pentru Toți — ideal pentru mobilitate redusă. Capacitate 2-4 oaspeți.",
    description:
      "Apartament 7 este gândit cu grijă pentru oaspeții cu nevoi speciale de accesibilitate — situat la parter stânga, fără trepte, cu spații generoase. Dormitorul are pat Emperor 2m×2m cu lenjerie moale de bumbac, iar apartamentul include frigider propriu și baie privată. Pentru prepararea meselor, oaspeții de la Apartament 7 au acces la Bucătăria pentru Toți — bucătăria comună a vilei, situată la parter, complet echipată și disponibilă tuturor oaspeților. Terasa privată vă invită la relaxare. Liniștit, discret și prietenos, Apartament 7 demonstrează că accesibilitatea și confortul merg mână în mână. Capacitate 2-4 oaspeți.",
    descriptionEN:
      "Apartment 7 is thoughtfully designed for guests with reduced mobility — located on the ground floor left side, with no stairs and generous spaces. The bedroom has a 2m×2m Emperor bed with soft cotton bedding. The apartment includes its own fridge and private bathroom. For meal preparation, guests of Apartment 7 have access to Kitchen for All — the villa's shared communal kitchen on the ground floor, fully equipped and available to all guests. The private terrace invites relaxation. Quiet, discreet and welcoming, Apartment 7 proves that accessibility and comfort go hand in hand. Capacity 2–4 guests.",
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    guests: 2,
    guestsMax: 4,
    sizeSqm: 42,
    floor: "Parter",
    hasAC: false,
    hasTerrace: true,
    accessible: true,
    hasPrivateKitchen: false,
    pricePerNightRON: 297,
    pricePerNightEUR: 0,
    weekendPriceRON: 320,
    weekendPriceEUR: 0,
    weeklyDiscountPct: 15,
    rating: 5.0,
    reviewsCount: 97,
    view: "Parter · Stânga · Accesibil",
    amenities: [
      "WiFi gratuit de mare viteză",
      "Pat Emperor 2m×2m",
      "Canapea extensibilă",
      "Frigider propriu",
      "Acces Bucătăria pentru Toți",
      "Smart TV",
      "Baie privată",
      "Terasă privată",
      "Fără trepte — parter",
      "Spații generoase, prietenos mobilitate redusă",
      "Parcare gratuită în curte",
      "Lenjerie de bumbac premium",
      "Prosoave incluse"
    ],
    rooms: [
      { name: "Dormitor", description: "Pat Emperor 2m×2m, spațios, accesibil" },
      { name: "Living", description: "Canapea extensibilă, Smart TV" },
      { name: "Baie", description: "Duș accesibil, lavoar, WC, prosoave incluse" },
      { name: "Frigider propriu", description: "Frigider în apartament" },
      { name: "Bucătăria pentru Toți", description: "Bucătăria comună a vilei — complet utilată, la parter" },
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
      "Acces Bucătăria pentru Toți inclus"
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
