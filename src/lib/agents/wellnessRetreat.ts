/**
 * VAIA OS — Agent 14: Wellness Retreat Manager.
 *
 * Static catalog of 8 wellness programs offered at Vila Vaias Aparts.
 * Each program has Romanian + English copy, inclusions, duration, and pricing.
 */

export type WellnessProgram = {
  slug: string;
  category: "weight_loss" | "diabetes" | "detox" | "pilgrimage" | "women" | "men" | "couples" | "corporate";
  nameRO: string;
  nameEN: string;
  tagline: string;
  durationDays: number;
  groupSize: string;
  priceRON: number;
  descriptionRO: string;
  descriptionEN: string;
  inclusions: string[];
  schedule?: { day: string; activity: string }[];
  audience: string;
  icon: string;
};

export const WELLNESS_PROGRAMS: WellnessProgram[] = [
  {
    slug: "slabire-sanatoasa",
    category: "weight_loss",
    nameRO: "Slăbire Sănătoasă în 7 Zile",
    nameEN: "Healthy Weight Loss in 7 Days",
    tagline: "Renunță la kilograme, nu la bucurie.",
    durationDays: 7,
    groupSize: "4-12 participanți",
    priceRON: 2890,
    descriptionRO:
      "Un program complet de 7 zile cu meniu controlat caloric, activitate zilnică în aer liber pe traseele dimprejurul Cetății Neamțului, consultații cu nutritionist și recuperare la stațiunea Oglinzi. Pierderea medie: 3-5 kg.",
    descriptionEN:
      "A complete 7-day program with calorie-controlled menu, daily outdoor activity on the trails around Neamț Citadel, consultations with a nutritionist, and recovery at Oglinzi spa. Average loss: 3-5 kg.",
    inclusions: [
      "Cazare apartament boutique 7 nopți",
      "Mic dejun, prânz, cină — calibrate de nutriționist",
      "Consultație inițială + finală cu nutriționist",
      "Drumeții zilnice (Cetatea Neamțului, Mănăstirea Neamț)",
      "2 ședințe tratament Oglinzi",
      "Acces Bucătăria pentru Toți",
      "Plan personalizat post-program",
    ],
    audience: "Persoane care vor să piardă 3-7 kg în siguranță",
    icon: "weight",
  },
  {
    slug: "control-diabet",
    category: "diabetes",
    nameRO: "Control Diabet — 14 Zile",
    nameEN: "Diabetes Management — 14 Days",
    tagline: "Învață să trăiești bine cu diabetul.",
    durationDays: 14,
    groupSize: "4-8 participanți",
    priceRON: 5490,
    descriptionRO:
      "Program intensiv pentru diabetici (tip 1 și 2) — meniu diabetologic, monitorizare glicemie, mișcare adaptată și sprijin emoțional. În colaborare cu medic diabetolog din Iași.",
    descriptionEN:
      "Intensive program for diabetics (type 1 and 2) — diabetic menu, glycemia monitoring, adapted physical activity, and emotional support. In collaboration with a diabetologist from Iași.",
    inclusions: [
      "Cazare 14 nopți în apartament cu frigider",
      "Meniu diabetologic 3 mese + 2 gustări/zi",
      "Consultație medic diabetolog (2 vizite)",
      "Monitorizare glicemie zilnică",
      "Plimbări ghidate adaptate ritmului fiecăruia",
      "Tratament Oglinzi (4 ședințe)",
      "Sesiuni educaționale: cum gătim, ce evităm",
      "Plan personalizat scris pentru acasă",
    ],
    audience: "Persoane diagnosticate cu diabet de tip 1 sau 2",
    icon: "activity",
  },
  {
    slug: "detoxifiere-completa",
    category: "detox",
    nameRO: "Detoxifiere Completă — 5 Zile",
    nameEN: "Complete Detox — 5 Days",
    tagline: "Curăță corpul, limpezește mintea.",
    durationDays: 5,
    groupSize: "6-14 participanți",
    priceRON: 1990,
    descriptionRO:
      "5 zile pentru a-ți curăța corpul de toxine și mintea de zgomot. Meniu detox cu sucuri proaspete, smoothie-uri verzi, supă cremă, suportate de ședințe de yoga, plimbări în pădurea Văratec și meditație ghidată.",
    descriptionEN:
      "5 days to cleanse body of toxins and mind of noise. Detox menu with fresh juices, green smoothies, cream soups, supported by yoga sessions, walks in Văratec forest, and guided meditation.",
    inclusions: [
      "Cazare 5 nopți",
      "Meniu detox personalizat (sucuri, supe, salate)",
      "2 ședințe yoga / zi (dimineață + seară)",
      "Plimbare ghidată zilnică",
      "Sesiune meditație de seară",
      "Tratament masaj de eliminare toxine (2 ședințe)",
      "Acces sauna și baia de aburi (în comun)",
    ],
    audience: "Persoane stresate, suprasolicitate, care vor un reset",
    icon: "leaf",
  },
  {
    slug: "pelerinaj-ortodox",
    category: "pilgrimage",
    nameRO: "Pelerinaj Ortodox — 7 Zile",
    nameEN: "Orthodox Pilgrimage — 7 Days",
    tagline: "Întâlnire cu liniștea Părinților Neamțeni.",
    durationDays: 7,
    groupSize: "8-22 pelerini",
    priceRON: 2490,
    descriptionRO:
      "O săptămână de retragere spirituală cu vizite zilnice la mănăstirile Agapia, Văratec, Neamț, Sihăstria, Secu, Sihla, Neamțul de Sus. Cazare ortodoxă cu post recomandat, ghid duhovnicesc disponibil pentru cei care doresc.",
    descriptionEN:
      "A week of spiritual retreat with daily visits to Agapia, Văratec, Neamț, Sihăstria, Secu, Sihla, and Upper Neamț monasteries. Orthodox accommodation, fasting menu available, spiritual guide on request.",
    inclusions: [
      "Cazare 7 nopți în apartament boutique",
      "Mese tradiționale cu opțiune post",
      "Ghid duhovnicesc disponibil (la cerere, fără cost)",
      "Transport zilnic la mănăstiri (autoturism vilă)",
      "Slujbe de seară + Sfânta Liturghie duminica",
      "Acatist și ghidaj icoane",
      "Carte de rugăciune pentru drum",
    ],
    audience: "Creștini ortodocși care vor o săptămână de reculegere",
    icon: "church",
  },
  {
    slug: "wellness-femei",
    category: "women",
    nameRO: "Retragere Femei — 4 Zile",
    nameEN: "Women's Retreat — 4 Days",
    tagline: "Doar pentru tine. Doar pentru sora ta.",
    durationDays: 4,
    groupSize: "6-12 femei",
    priceRON: 1690,
    descriptionRO:
      "Patru zile dedicate femeilor — yoga la răsărit, baie hidromasaj, ateliere de cosmetică naturală cu produse mănăstirești, vorbă bună la foc de seară. Fără bărbați, fără grabă.",
    descriptionEN:
      "Four days for women — sunrise yoga, hydromassage bath, natural cosmetics workshops with monastery products, evenings of good conversation by the fire. No men, no rush.",
    inclusions: [
      "Cazare 4 nopți, 2 femei/apartament (sau singură +30%)",
      "Yoga dimineața + seara",
      "Atelier cosmetică naturală (produse Agapia / Văratec)",
      "Ședință masaj relaxare",
      "Tratament Oglinzi (1 ședință)",
      "Cină tematică la Han Rustic",
      "Carte cadou de la mănăstirea Văratec",
    ],
    audience: "Femei care au nevoie de spațiu propriu",
    icon: "flower",
  },
  {
    slug: "wellness-barbati",
    category: "men",
    nameRO: "Retragere Bărbați — 3 Zile",
    nameEN: "Men's Retreat — 3 Days",
    tagline: "Munte. Pescuit. Tăcere.",
    durationDays: 3,
    groupSize: "6-14 bărbați",
    priceRON: 1290,
    descriptionRO:
      "Trei zile la munte și lac. Pescuit la Refugiul Vaias, BBQ și frate-de-cruce, drumeție Ceahlău, conversație serioasă (sau deloc). Pentru bărbați care își iau timp.",
    descriptionEN:
      "Three days in the mountains and by the lake. Fishing at Refugiul Vaias, BBQ and brotherhood, Ceahlău hike, serious conversation (or none). For men who take time.",
    inclusions: [
      "Cazare 3 nopți, 2 bărbați/apartament",
      "Pescuit la Refugiul Vaias (echipament inclus)",
      "BBQ seara (carne din Neamț)",
      "Drumeție ghidată Ceahlău (8 ore)",
      "Saună finlandeză (în comun)",
      "Han Rustic — dineu tradițional 1 dată",
      "Whisky tasting Moldova (degustare locală)",
    ],
    audience: "Bărbați care vor o pauză autentică",
    icon: "mountain",
  },
  {
    slug: "wellness-cupluri",
    category: "couples",
    nameRO: "Retragere Cupluri — 3 Zile",
    nameEN: "Couples Retreat — 3 Days",
    tagline: "Reconectează-te cu cel/cea drag/ă.",
    durationDays: 3,
    groupSize: "2 persoane / cuplu",
    priceRON: 2190,
    descriptionRO:
      "Trei zile romantice pentru cupluri — apartament privat cu jacuzzi pe terasă (la cerere), cină privată, masaj în doi, plimbări la mănăstiri, pauză completă de la rutină.",
    descriptionEN:
      "Three romantic days for couples — private apartment with terrace jacuzzi (on request), private dinner, couples massage, walks to monasteries, full break from routine.",
    inclusions: [
      "Cazare 3 nopți apartament boutique privat",
      "Coș de bun venit (vin local + brânzeturi)",
      "Cină privată cu lumânări (1 seară)",
      "Masaj în doi (1 ședință)",
      "Tur mănăstiri privat (Agapia + Văratec)",
      "Acces sauna privată (1 ședință)",
      "Suvenir cadou pentru cuplu",
    ],
    audience: "Cupluri care vor să se reconecteze",
    icon: "heart",
  },
  {
    slug: "wellness-corporate",
    category: "corporate",
    nameRO: "Wellness Corporate — 3 Zile",
    nameEN: "Corporate Wellness — 3 Days",
    tagline: "Echipa ta merită o pauză adevărată.",
    durationDays: 3,
    groupSize: "8-28 angajați",
    priceRON: 1490,
    descriptionRO:
      "Pachet pentru companii — vila întreagă, workshop wellness cu expert, mișcare în natură, alimentație sănătoasă, sesiuni de team coaching la lac. Ideal pentru q1/q3 kick-off.",
    descriptionEN:
      "Corporate package — whole villa, wellness workshop with expert, outdoor movement, healthy eating, team coaching sessions by the lake. Ideal for Q1/Q3 kick-off.",
    inclusions: [
      "Cazare 3 nopți în 7 apartamente (vila întreagă)",
      "Workshop wellness cu expert invitat",
      "Yoga dimineața (opțional)",
      "Activitate teambuilding la Refugiul Vaias",
      "Mese sănătoase calibrate (catering)",
      "Sesiune coaching de echipă (3 ore)",
      "Cină gala la Han Rustic",
      "Factură fiscală corporativă",
    ],
    audience: "Echipe corporate 8-28 persoane",
    icon: "users",
  },
];

export function getWellnessProgramBySlug(slug: string): WellnessProgram | undefined {
  return WELLNESS_PROGRAMS.find(p => p.slug === slug);
}

export function getUpcomingSessions(programSlug: string): Array<{ start: string; end: string; remainingSpots: number }> {
  // Generated rolling 8 weeks ahead.
  const program = getWellnessProgramBySlug(programSlug);
  if (!program) return [];
  const sessions: Array<{ start: string; end: string; remainingSpots: number }> = [];
  const now = new Date();
  for (let i = 1; i <= 4; i++) {
    const start = new Date(now);
    start.setDate(start.getDate() + i * 14); // every 2 weeks
    const end = new Date(start);
    end.setDate(end.getDate() + program.durationDays);
    sessions.push({
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
      remainingSpots: Math.floor(Math.random() * 4) + 2,
    });
  }
  return sessions;
}
