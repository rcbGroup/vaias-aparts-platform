export type SeasonalOffer = {
  id: string;
  active: boolean;
  titleRO: string;
  descriptionRO: string;
  targetGuestType: string;
  season?: string;
  minNights?: number;
  apartmentCategory?: "studio" | "family" | "any";
  ctaTextRO: string;
  whatsappMessageRO: string;
};

export const seasonalOffers: SeasonalOffer[] = [
  {
    id: "paste-neamt",
    active: true,
    titleRO: "Paști la Neamț",
    descriptionRO: "Sărbătoriți Paștele în inima Moldovei — aproape de mănăstirile Agapia, Văratec și Neamț. Rezervați din timp pentru cele mai bune apartamente disponibile.",
    targetGuestType: "pilgrims",
    season: "Martie–Mai",
    minNights: 2,
    apartmentCategory: "any",
    ctaTextRO: "Solicită disponibilitate Paști",
    whatsappMessageRO: "Bună ziua! Doresc să rezerv un apartament la Vila Vaias Aparts pentru Paști. Vă rog să îmi comunicați disponibilitatea și prețul pentru datele: [DATA CHECK-IN] – [DATA CHECK-OUT], [NR] adulți, [NR] copii."
  },
  {
    id: "vacanta-vara-familie",
    active: true,
    titleRO: "Vacanță de Vară cu Familia",
    descriptionRO: "Vara la Vaias Aparts — apartamente spațioase pentru familii, parcare gratuită, Bucătăria pentru Toți și aer curat de munte. Ideal pentru copii și părinți deopotrivă.",
    targetGuestType: "families",
    season: "Iunie–August",
    minNights: 2,
    apartmentCategory: "family",
    ctaTextRO: "Rezervă vacanța de vară",
    whatsappMessageRO: "Bună ziua! Doresc să rezerv un apartament pentru familia mea la Vila Vaias Aparts în perioada de vară. Datele noastre: [DATA CHECK-IN] – [DATA CHECK-OUT], [NR] adulți, [NR] copii (vârste: [VÂRSTE]). Vă rog să îmi comunicați disponibilitatea."
  },
  {
    id: "circuit-manastiri-toamna",
    active: true,
    titleRO: "Circuit Mănăstiri — Toamnă",
    descriptionRO: "Toamna aduce culorile cele mai frumoase în Moldova. Agapia, Văratec, Neamț și Sihăstria — toate la câteva minute de baza noastră din Târgu Neamț.",
    targetGuestType: "pilgrims",
    season: "Septembrie–Noiembrie",
    minNights: 2,
    apartmentCategory: "any",
    ctaTextRO: "Solicită ofertă circuit mănăstiri",
    whatsappMessageRO: "Bună ziua! Sunt interesat/ă de un sejur pentru circuit de mănăstiri din zona Neamț, la Vila Vaias Aparts. Datele: [DATA CHECK-IN] – [DATA CHECK-OUT], [NR] persoane. Vă rog detalii."
  },
  {
    id: "craciun-an-nou",
    active: true,
    titleRO: "Crăciun & Revelion la Neamț",
    descriptionRO: "Petreceți sărbătorile în liniștea Moldovei. Rezervări timpurii pentru Crăciun și Revelion — disponibilitate limitată.",
    targetGuestType: "families",
    season: "Decembrie",
    minNights: 2,
    apartmentCategory: "any",
    ctaTextRO: "Rezervă pentru sărbători",
    whatsappMessageRO: "Bună ziua! Doresc să rezerv un apartament la Vila Vaias Aparts pentru perioada sărbătorilor de iarnă. Datele: [DATA CHECK-IN] – [DATA CHECK-OUT], [NR] adulți, [NR] copii. Vă rog confirmați disponibilitatea."
  },
  {
    id: "diaspora-acasa",
    active: true,
    titleRO: "Acasă în Moldova",
    descriptionRO: "Pentru românii din diaspora care revin în Neamț — un loc cald, confortabil și familiar, în inima orașului. Comunicare directă pe WhatsApp, în română sau engleză.",
    targetGuestType: "diaspora",
    season: "Tot anul",
    minNights: 3,
    apartmentCategory: "any",
    ctaTextRO: "Contactează-ne pe WhatsApp",
    whatsappMessageRO: "Hello! I'm Romanian, living abroad, and I'd like to book a stay at Vila Vaias Aparts for my visit home to Neamț. Dates: [CHECK-IN] – [CHECK-OUT], [NR] adults, [NR] children. Please confirm availability and price."
  },
  {
    id: "cazare-nunta-grup",
    active: true,
    titleRO: "Cazare pentru Nuntă sau Eveniment",
    descriptionRO: "Aveți o nuntă sau un eveniment în zona Neamț? Vila Vaias Aparts poate asigura cazarea pentru familia și prietenii dvs. — mai multe apartamente, același complex.",
    targetGuestType: "groups",
    season: "Tot anul",
    apartmentCategory: "any",
    ctaTextRO: "Solicită ofertă grup",
    whatsappMessageRO: "Bună ziua! Avem un eveniment (nuntă/aniversare/reuniune) în zona Neamț și căutăm cazare pentru mai multe persoane. Data evenimentului: [DATA]. Nr. de apartamente necesare: [NR]. Total persoane: [NR]. Vă rog să ne contactați pentru o ofertă personalizată."
  },
  {
    id: "vila-intreaga",
    active: true,
    titleRO: "Rezervă Întreaga Vilă",
    descriptionRO: "Grup mare? Reuniune de familie? Echipă? Vila Vaias Aparts poate fi rezervată integral — toate cele 7 apartamente pentru uzul exclusiv al grupului dvs. Capacitate optimă 22 persoane, maxim 26–28.",
    targetGuestType: "groups",
    season: "Tot anul",
    minNights: 2,
    apartmentCategory: "any",
    ctaTextRO: "Solicită ofertă vilă întreagă",
    whatsappMessageRO: "Bună ziua! Suntem interesați să rezervăm întreaga vilă Vaias Aparts. Datele: [DATA CHECK-IN] – [DATA CHECK-OUT]. Total adulți: [NR]. Total copii: [NR] (vârste: [VÂRSTE]). Avem nevoie de toate cele 7 apartamente. Vă rog să ne comunicați disponibilitatea și prețul total."
  },
  {
    id: "wellness-oglinzi",
    active: true,
    titleRO: "Cură Wellness — Oglinzi & Bălțătești",
    descriptionRO: "Stațiunile de tratament Oglinzi și Bălțătești sunt la mai puțin de 30 de minute de Vaias Aparts. Sejur mai lung, confort de acasă și liniștea Moldovei.",
    targetGuestType: "wellness",
    season: "Tot anul",
    minNights: 4,
    apartmentCategory: "any",
    ctaTextRO: "Solicită ofertă sejur lung",
    whatsappMessageRO: "Bună ziua! Vin la tratament la Oglinzi/Bălțătești și caut cazare confortabilă pentru mai multe zile. Datele: [DATA CHECK-IN] – [DATA CHECK-OUT], [NR] persoane. Vă rog să îmi comunicați disponibilitatea și dacă există o tarif special pentru sejur lung."
  },
  {
    id: "sejur-lung-direct",
    active: true,
    titleRO: "Tarif Direct — Sejur Lung",
    descriptionRO: "Stai 4 nopți sau mai mult și beneficiezi de cel mai bun tarif direct disponibil. Rezervând direct pe WhatsApp sau telefon, eviți comisionul platformelor (15–25%).",
    targetGuestType: "any",
    season: "Tot anul",
    minNights: 4,
    apartmentCategory: "any",
    ctaTextRO: "Rezervă direct pe WhatsApp",
    whatsappMessageRO: "Bună ziua! Doresc să rezerv un apartament la Vila Vaias Aparts pentru un sejur mai lung. Datele: [DATA CHECK-IN] – [DATA CHECK-OUT], [NR] adulți, [NR] copii. Vă rog să îmi comunicați cel mai bun tarif direct disponibil."
  }
];

export function getActiveOffers(): SeasonalOffer[] {
  return seasonalOffers.filter(o => o.active);
}

export function getOffersByGuestType(type: string): SeasonalOffer[] {
  return seasonalOffers.filter(o => o.active && (o.targetGuestType === type || o.targetGuestType === "any"));
}
