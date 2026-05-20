// Things to do near Vila Vaias Aparts, organised by how far they are.
// Walking-distance places live here (they aren't in lib/attractions.ts);
// the drive tiers reference the richer attraction records by slug so the
// distances/times stay consistent with the /zone-turistice page.

export type LocalTier = "walk" | "drive5" | "drive15" | "drive30";

export type WalkPlace = {
  slug: string;
  name: string;
  icon: string;
  description: string;
  time: string; // human label, e.g. "5 min pe jos"
  address?: string;
  /** Radial position on the walking map. angle in degrees, minutes drives radius. */
  angle: number;
  minutes: number;
  mode: "walk" | "drive";
};

// Under ~15 minutes on foot from Str. Sfântul Lazăr nr. 1.
export const walkablePlaces: WalkPlace[] = [
  {
    slug: "restaurante-cafenele",
    name: "Restaurante & cafenele",
    icon: "🍽️",
    description: "Restaurante și cafenele cu bucătărie moldovenească autentică, la câțiva pași.",
    time: "4 min pe jos",
    angle: 110,
    minutes: 4,
    mode: "walk"
  },
  {
    slug: "magazine",
    name: "Magazine (Lidl, Profi, non-stop)",
    icon: "🛒",
    description: "Lidl, Profi și magazine non-stop pentru tot ce ai nevoie, aproape de vilă.",
    time: "5 min pe jos",
    angle: 60,
    minutes: 5,
    mode: "walk"
  },
  {
    slug: "centrul-vechi",
    name: "Centrul Vechi / Old Town",
    icon: "🏘️",
    description: "Clădiri istorice din secolele XVIII–XIX și vechiul cartier comercial al târgului.",
    time: "5 min pe jos",
    angle: 205,
    minutes: 5,
    mode: "walk"
  },
  {
    slug: "piata-agroalimentara",
    name: "Piața Agroalimentară",
    icon: "🧺",
    description: "Piață de produse proaspete și locale — brânză, miere, legume de la producători.",
    time: "6 min pe jos",
    angle: 88,
    minutes: 6,
    mode: "walk"
  },
  {
    slug: "casa-veronica-micle",
    name: "Casa Memorială Veronica Micle",
    icon: "✍️",
    description: "Casa memorială a poetei Veronica Micle, muza lui Mihai Eminescu.",
    time: "7 min pe jos",
    address: "Str. Ștefan cel Mare 33",
    angle: 145,
    minutes: 7,
    mode: "walk"
  },
  {
    slug: "muzeul-de-istorie",
    name: "Muzeul de Istorie — Fosta Școală Domnească",
    icon: "🏛️",
    description: "Muzeu de istorie și etnografie găzduit în vechea Școală Domnească a târgului.",
    time: "7 min pe jos",
    address: "Str. Ștefan cel Mare 37",
    angle: 168,
    minutes: 7,
    mode: "walk"
  },
  {
    slug: "sinagoga-mestesugarilor",
    name: "Sinagoga Meșteșugarilor (1870)",
    icon: "🕍",
    description: "Sinagogă istorică din 1870, mărturie a comunității evreiești a târgului.",
    time: "8 min pe jos",
    angle: 248,
    minutes: 8,
    mode: "walk"
  },
  {
    slug: "parcul-central",
    name: "Parcul Central",
    icon: "🌳",
    description: "Parc liniștit în inima orașului, perfect pentru o plimbare de dimineață.",
    time: "9 min pe jos",
    angle: 322,
    minutes: 9,
    mode: "walk"
  },
  {
    slug: "spitalul-vechi",
    name: "Spitalul Vechi (1852)",
    icon: "🏥",
    description: "Construit în 1852 de Mănăstirea Neamț — monument de patrimoniu al orașului.",
    time: "10 min pe jos",
    angle: 288,
    minutes: 10,
    mode: "walk"
  },
  {
    slug: "monumentul-eroilor",
    name: "Monumentul Eroilor de Munte",
    icon: "🗿",
    description: "Monument dedicat vânătorilor de munte, în memoria eroilor neamului.",
    time: "12 min pe jos",
    angle: 28,
    minutes: 12,
    mode: "walk"
  }
];

// A few key spots a short drive away, shown on the outer band of the map.
export const nearbyDrivePoints: WalkPlace[] = [
  {
    slug: "casa-memoriala-creanga",
    name: "Casa Ion Creangă · Humulești",
    icon: "📖",
    description: "Casa copilăriei lui Ion Creangă, în Humulești.",
    time: "7 min cu mașina",
    angle: 182,
    minutes: 7,
    mode: "drive"
  },
  {
    slug: "cetatea-neamt",
    name: "Cetatea Neamț",
    icon: "🏰",
    description: "Cetatea medievală a lui Ștefan cel Mare.",
    time: "10 min cu mașina",
    angle: 218,
    minutes: 10,
    mode: "drive"
  },
  {
    slug: "vanatori-neamt",
    name: "Rezervația de Zimbri · Vânători-Neamț",
    icon: "🦬",
    description: "Rezervație de zimbri europeni — unică în zonă.",
    time: "15 min cu mașina",
    angle: 38,
    minutes: 15,
    mode: "drive"
  },
  {
    slug: "manastirea-neamt",
    name: "Mănăstirea Neamț",
    icon: "⛪",
    description: "Cea mai veche și importantă mănăstire din Moldova.",
    time: "18 min cu mașina",
    angle: 338,
    minutes: 18,
    mode: "drive"
  }
];

// Drive tiers — resolved against lib/attractions.ts by slug on the page,
// so distances/times match /zone-turistice.
export const DRIVE5_SLUGS = [
  "cetatea-neamt",
  "casa-memoriala-creanga",
  "vanatori-neamt",
  "manastirea-neamt"
];
export const DRIVE15_SLUGS = [
  "manastirea-agapia",
  "manastirea-varatec",
  "manastirea-secu",
  "manastirea-sihastria"
];
export const DRIVE30_SLUGS = [
  "manastirea-bistrita",
  "statiunea-durau",
  "muntele-ceahlau",
  "cheile-bicazului",
  "lacul-rosu",
  "piatra-neamt"
];
