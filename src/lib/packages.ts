export type CuratedPackage = {
  slug: string;
  nameRO: string;
  nameEN: string;
  audience: string;
  durationNights: { min: number; max?: number };
  fromPricePerPersonRON: number;
  tagline: string;
  descriptionRO: string;
  inclusions: string[];
  bestFor: string;
  icon: string;
};

export const CURATED_PACKAGES: CuratedPackage[] = [
  {
    slug: "pelerinaj-neamt",
    nameRO: "Pelerinaj Neamț",
    nameEN: "Neamț Pilgrimage",
    audience: "pilgrims",
    durationNights: { min: 3 },
    fromPricePerPersonRON: 690,
    tagline: "3 nopți la pelerinii Mănăstirilor Nordului Moldovei.",
    descriptionRO:
      "Trei nopți de pelerinaj la mănăstirile Agapia, Văratec, Neamț și Sihăstria — toate la 15-20 minute de Vaias Aparts. Cazare boutique, ghid duhovnicesc disponibil la cerere, mese tradiționale.",
    inclusions: [
      "Cazare 3 nopți, apartament standard",
      "Tur ghidat 4 mănăstiri (Agapia, Văratec, Neamț, Sihăstria)",
      "Ghid duhovnicesc ortodox la cerere (gratuit)",
      "Carte de rugăciune pentru drum",
      "Transport la mănăstiri organizat",
      "Han Rustic dineu o seară",
      "WhatsApp concierge 24/7",
    ],
    bestFor: "Grupuri de pelerini, familii religioase, diaspora în vizită",
    icon: "church",
  },
  {
    slug: "familie-completa",
    nameRO: "Familie Completă",
    nameEN: "Full Family",
    audience: "families",
    durationNights: { min: 5 },
    fromPricePerPersonRON: 380,
    tagline: "5+ nopți pentru familia mare, copii fericiți, părinți odihniți.",
    descriptionRO:
      "Pachet de 5 nopți sau mai mult pentru familii — apartament cu 2 dormitoare sau vilă întreagă, activități pentru copii, gastronomie locală, mănăstiri și natură.",
    inclusions: [
      "Cazare 5+ nopți în apartament familial sau vila întreagă",
      "Reducere 15% pentru sejur lung",
      "Activitate la Refugiul Vaias (pescuit + BBQ) 1 zi",
      "Tur Cetatea Neamțului inclus",
      "Vizită Grădina Zoologică Vânători-Neamț",
      "Han Rustic — 2 mese tradiționale",
      "Coș de bun venit gratuit (3+ nopți)",
    ],
    bestFor: "Familii cu copii 4-14 ani, sejur extins",
    icon: "users",
  },
  {
    slug: "diaspora-acasa",
    nameRO: "Diaspora Acasă",
    nameEN: "Diaspora Home",
    audience: "diaspora",
    durationNights: { min: 5 },
    fromPricePerPersonRON: 320,
    tagline: "5+ nopți pentru românii din străinătate care vin acasă.",
    descriptionRO:
      "Construit pentru românii din Italia, Spania, Marea Britanie, Germania, Irlanda. Comunicare bilingvă, asistență transfer aeroport, sfat pentru recăpătare contact cu familia și mănăstirile.",
    inclusions: [
      "Cazare 5+ nopți cu reducere diaspora 10%",
      "Transfer aeroport Iași / Suceava / Bacău (la cost)",
      "Concierge multilingv (RO/EN/IT/FR)",
      "Sfat pentru rezervări mănăstiri, restaurante, evenimente locale",
      "Coș de bun venit cu produse moldovenești",
      "Han Rustic dineu inclus 1 dată",
      "WhatsApp 24/7 cu echipa Vaias",
    ],
    bestFor: "Diaspora cu familie și/sau prieteni la întâlnire în Moldova",
    icon: "globe",
  },
  {
    slug: "readaway",
    nameRO: "Readaway — Retreat de Citit",
    nameEN: "Readaway — Reading Retreat",
    audience: "solo",
    durationNights: { min: 3, max: 5 },
    fromPricePerPersonRON: 290,
    tagline: "3-5 nopți să citești tot ce ai amânat.",
    descriptionRO:
      "Pentru cei care vor să se desprindă — apartament boutique, fără TV pornit, internet bun dacă vrei, plimbări scurte la Cetatea Neamțului, cafenele liniștite în Târgu Neamț.",
    inclusions: [
      "Cazare 3-5 nopți",
      "Living cu fotoliu și lumină naturală",
      "Recomandare 5 cărți de citit despre Moldova",
      "Cafea & ceai de bun venit",
      "Mic dejun continental (la cerere, +30 lei/zi)",
      "Cetatea Neamțului bilet inclus",
      "Recomandare cafenele liniștite din Târgu Neamț",
    ],
    bestFor: "Persoane care vor o pauză cu o carte bună",
    icon: "book-open",
  },
  {
    slug: "gastronomic-moldova",
    nameRO: "Gastronomic Moldova",
    nameEN: "Moldova Gastronomy",
    audience: "couple",
    durationNights: { min: 3 },
    fromPricePerPersonRON: 590,
    tagline: "3 nopți pe urma celor 8 mâncăruri esențiale moldovenești.",
    descriptionRO:
      "Tour gastronomic prin Moldova de la Vaias Aparts ca bază — Han Rustic, restaurante locale, mănăstiri cu trapeze tradiționale, plus o lecție de gătit acasă.",
    inclusions: [
      "Cazare 3 nopți",
      "Han Rustic — cină tradițională (sarmale, mămăligă, tochitură)",
      "Lecție de gătit moldovenesc (3 ore, 200 lei/persoană inclus)",
      "Vizită mănăstire cu trapeză (Agapia sau Văratec)",
      "Degustare vinuri locale",
      "Cumpărături la piața locală cu ghid",
      "Caiet de rețete personalizat",
    ],
    bestFor: "Cupluri, prieteni gourmand, jurnaliști food",
    icon: "utensils",
  },
  {
    slug: "corporate-teambuilding",
    nameRO: "Corporate Teambuilding",
    nameEN: "Corporate Teambuilding",
    audience: "corporate",
    durationNights: { min: 2, max: 3 },
    fromPricePerPersonRON: 580,
    tagline: "2-3 zile pentru echipa ta — natură, mâncare, conexiune.",
    descriptionRO:
      "Vila întreagă pentru companie (22-28 persoane), activitate la Refugiul Vaias (lac privat), cină gala la Han Rustic, opțional workshop wellness sau coaching de echipă.",
    inclusions: [
      "Vila întreagă (7 apartamente)",
      "Activitate teambuilding Refugiul Vaias (pescuit + BBQ)",
      "Han Rustic — cină gala",
      "Cetatea Neamțului tur ghidat",
      "Workshop wellness sau coaching (opțional, +cost)",
      "Photographer 1 zi pentru content corporate",
      "Factură fiscală corporativă",
    ],
    bestFor: "Echipe corporate 8-28 persoane",
    icon: "briefcase",
  },
  {
    slug: "digital-nomad",
    nameRO: "Digital Nomad",
    nameEN: "Digital Nomad",
    audience: "nomad",
    durationNights: { min: 14 },
    fromPricePerPersonRON: 200,
    tagline: "14+ nopți — birou în Moldova, sărbători cu pelerinaj în weekend.",
    descriptionRO:
      "Pachet long-stay pentru cei care lucrează remote — internet de fibră, birou în apartament, cafea bună, weekend-uri exploratorii la mănăstiri sau munte.",
    inclusions: [
      "Cazare 14+ nopți",
      "Reducere 25% pentru long-stay",
      "Internet de fibră 1Gbps",
      "Birou în apartament (la cerere)",
      "Acces Bucătăria pentru Toți",
      "Sfat săptămânal pentru weekend (mănăstiri, Ceahlău, Iași)",
      "Spălătorie inclusă (1x/săptămână)",
    ],
    bestFor: "Lucrători remote, scriitori, freelanceri",
    icon: "laptop",
  },
  {
    slug: "pescuit-si-natura",
    nameRO: "Pescuit și Natură",
    nameEN: "Fishing and Nature",
    audience: "outdoors",
    durationNights: { min: 2, max: 3 },
    fromPricePerPersonRON: 490,
    tagline: "2-3 nopți la Refugiul Vaias — lac, pădure, foc de tabără.",
    descriptionRO:
      "Lacul privat Refugiul Vaias (30 min de Vaias Aparts) — pescuit, BBQ, foc de tabără seara. Combinație perfectă vilă boutique + sălbăticie controlată.",
    inclusions: [
      "Cazare 2-3 nopți la apartament",
      "Acces zilnic Refugiul Vaias",
      "Echipament pescuit inclus (undițe, momeli)",
      "BBQ și foc de tabără cu lemne",
      "Carne și legume pentru BBQ incluse",
      "Drumeție ghidată Văratec (pădure)",
      "Transport vilă ↔ refugiu organizat",
    ],
    bestFor: "Bărbați, familii cu adolescenți, prieteni cu pasiuni outdoors",
    icon: "fish",
  },
  {
    slug: "craciunul-moldovenesc",
    nameRO: "Crăciunul Moldovenesc",
    nameEN: "Moldavian Christmas",
    audience: "families",
    durationNights: { min: 3, max: 4 },
    fromPricePerPersonRON: 790,
    tagline: "3-4 nopți de sărbători în Moldova — colinzi, mănăstiri, masă.",
    descriptionRO:
      "Sărbătorile cum au fost ele — colindători la ușă, brad în living, slujbă de la miezul nopții la Mănăstirea Neamț, masă tradițională cu familia.",
    inclusions: [
      "Cazare 3-4 nopți",
      "Brad în living cu globuri tradiționale",
      "Coș de Crăciun (cozonac, vin fiert, drob)",
      "Slujbă miezul nopții la Mănăstirea Neamț (transport organizat)",
      "Han Rustic — cină de Crăciun (1 seară)",
      "Concert de colinde tradiționale (la cerere)",
      "Cetatea Neamțului sub zăpadă (bilet inclus)",
    ],
    bestFor: "Familii care vor sărbători autentice românești",
    icon: "tree",
  },
];

export function getCuratedPackageBySlug(slug: string) {
  return CURATED_PACKAGES.find(p => p.slug === slug);
}
