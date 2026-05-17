/**
 * VAIA OS — Agent 10: B2B Distribution.
 *
 * Manages partner database (travel agencies, tour operators, corporate accounts,
 * diaspora agencies). Generates outreach emails in Romanian and English with a
 * unique tracking code per partner that survives URL clicks and booking attribution.
 */

export type B2BCategory =
  | "TRAVEL_AGENCY"
  | "TOUR_OPERATOR"
  | "CORPORATE"
  | "PILGRIMAGE"
  | "RESTAURANT"
  | "EXPERIENCE"
  | "DIASPORA"
  | "OTHER";

export type B2BPartner = {
  id?: number;
  name: string;
  category: B2BCategory;
  contactName?: string;
  email?: string;
  phone?: string;
  website?: string;
  city?: string;
  address?: string;
  commissionPct: number;
  notes?: string;
  active?: boolean;
};

export const SEED_PARTNERS: B2BPartner[] = [
  // Romanian travel agencies
  { name: "Christian Tour", category: "TOUR_OPERATOR", city: "București", commissionPct: 12, website: "https://www.christiantour.ro" },
  { name: "Eximtur", category: "TOUR_OPERATOR", city: "Cluj-Napoca", commissionPct: 12, website: "https://www.eximtur.ro" },
  { name: "Paralela 45", category: "TOUR_OPERATOR", city: "București", commissionPct: 12, website: "https://www.paralela45.ro" },
  { name: "Hello Holidays", category: "TOUR_OPERATOR", city: "București", commissionPct: 10, website: "https://www.helloholidays.ro" },
  { name: "Cocktail Holidays", category: "TRAVEL_AGENCY", city: "Iași", commissionPct: 10 },
  { name: "Nextour", category: "TRAVEL_AGENCY", city: "Bacău", commissionPct: 10, website: "https://www.nextour.ro" },
  { name: "Mega Tours", category: "TRAVEL_AGENCY", city: "Iași", commissionPct: 10 },

  // Diaspora agencies
  { name: "Atlassib UK", category: "DIASPORA", city: "Londra", commissionPct: 8, notes: "Transport diaspora UK → RO" },
  { name: "Eurolines Italia", category: "DIASPORA", city: "Roma", commissionPct: 8, notes: "Transport diaspora IT → RO" },
  { name: "Romanian Travel Center", category: "DIASPORA", city: "Madrid", commissionPct: 10, notes: "Agenție diaspora Spania" },
  { name: "Diaspora Tours DE", category: "DIASPORA", city: "München", commissionPct: 10, notes: "Diaspora Germania" },
  { name: "Irish-Romanian Travel", category: "DIASPORA", city: "Dublin", commissionPct: 10, notes: "Diaspora Irlanda" },

  // Pilgrimage operators
  { name: "Pelerinaj România", category: "PILGRIMAGE", city: "București", commissionPct: 12, notes: "Tururi mănăstiri Moldova" },
  { name: "Sfânta Cuvioasa Pelerinaje", category: "PILGRIMAGE", city: "Iași", commissionPct: 12 },
  { name: "Pelerinaje Ortodoxe Cluj", category: "PILGRIMAGE", city: "Cluj-Napoca", commissionPct: 12 },

  // Corporate
  { name: "Asociația Cluj IT", category: "CORPORATE", city: "Cluj-Napoca", commissionPct: 5, notes: "Teambuilding companii tech" },
  { name: "Camera de Comerț Neamț", category: "CORPORATE", city: "Piatra Neamț", commissionPct: 5 },
];

export function generateTrackingCode(partnerName: string): string {
  const slug = partnerName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 8)
    .toUpperCase();
  const yearSuffix = String(new Date().getFullYear()).slice(-2);
  return `VAIAS-${slug}-${yearSuffix}`;
}

export function buildTrackingUrl(partnerName: string): string {
  const code = generateTrackingCode(partnerName);
  return `https://www.vaiasaparts.ro/?ref=${encodeURIComponent(code)}`;
}

// ====================== OUTREACH TEMPLATES ======================

type OutreachContext = {
  partner: B2BPartner;
  contactName?: string;
  commissionPct?: number;
};

export function outreachRomanianAgency(ctx: OutreachContext): { subject: string; body: string; tracking: string } {
  const tracking = generateTrackingCode(ctx.partner.name);
  const url = buildTrackingUrl(ctx.partner.name);
  const greet = ctx.contactName ? `Bună ziua, ${ctx.contactName},` : "Bună ziua,";
  const comm = ctx.commissionPct ?? ctx.partner.commissionPct ?? 12;
  return {
    subject: `Parteneriat ${ctx.partner.name} ↔ Vila Vaias Aparts — comision ${comm}%`,
    body: `${greet}

Mă numesc Vasile Jiboc, fondator al Vilei Vaias Aparts — 7 apartamente boutique situate ultracentral în Târgu Neamț, la 15 minute de mănăstirile Agapia, Văratec și Neamț.

Vă scriu pentru că mulți dintre clienții ${ctx.partner.name} ar putea fi interesați de un sejur în zona noastră — circuit mănăstiri, weekend de relaxare, sau combinație Bicaz-Ceahlău.

Ce vă oferim:
  • 7 apartamente boutique, capacitate 22–28 persoane (vila întreagă)
  • Tarife B2B preferențiale + comision standard ${comm}%
  • Disponibilitate live prin WhatsApp / email
  • Asistență permanentă pentru clienții voștri
  • Facturare promptă (factură fiscală RO)
  • Confirmare instant pentru rezervări sub 10 persoane

Link partener (cu cod de urmărire ${tracking}):
${url}

Aș fi bucuros să stabilim un call de 15 minute săptămâna viitoare. Sau, dacă preferați, vă trimit imediat fișa tehnică și fotografii apartamente.

Cu drag,
Vasile Jiboc
Vila Vaias Aparts — www.vaiasaparts.ro
WhatsApp: 0743 456 789
Echipa Vaias Aparts`,
    tracking,
  };
}

export function outreachDiasporaAgency(ctx: OutreachContext): { subject: string; body: string; tracking: string } {
  const tracking = generateTrackingCode(ctx.partner.name);
  const url = buildTrackingUrl(ctx.partner.name);
  const greet = ctx.contactName ? `Hello ${ctx.contactName},` : "Hello,";
  const comm = ctx.commissionPct ?? ctx.partner.commissionPct ?? 10;
  return {
    subject: `Partnership ${ctx.partner.name} ↔ Vaias Aparts (Moldova, Romania) — ${comm}% commission`,
    body: `${greet}

I'm Vasile Jiboc, founder of Vila Vaias Aparts — 7 boutique apartments in the heart of Târgu Neamț, Moldova, Romania. We host many Romanian-diaspora guests every year who return home for visits, weddings, or monastery pilgrimages.

Since your clients are exactly those families, I'd love to set up a partnership:

  • 7 boutique apartments, 22–28 person capacity (whole-villa rentals available)
  • Romanian-speaking concierge by WhatsApp (24/7)
  • Pre-arrival airport transfer (Iași) coordinated by us
  • Family-friendly + kids stay free under 3
  • Best Rate Guarantee for direct bookings
  • ${comm}% commission on confirmed stays
  • Romanian fiscal invoicing for B2B partners

Partner link (with tracking code ${tracking}):
${url}

Could we schedule a 15-minute call next week? I'd be glad to send our partner pack — fact sheet, photo library, sample itineraries.

Warmly,
Vasile Jiboc
Vila Vaias Aparts — www.vaiasaparts.ro
WhatsApp: +40 743 456 789
Echipa Vaias Aparts`,
    tracking,
  };
}

export function outreachTourOperator(ctx: OutreachContext): { subject: string; body: string; tracking: string } {
  const tracking = generateTrackingCode(ctx.partner.name);
  const url = buildTrackingUrl(ctx.partner.name);
  const greet = ctx.contactName ? `Stimată/Stimate ${ctx.contactName},` : "Stimate partener,";
  const comm = ctx.commissionPct ?? ctx.partner.commissionPct ?? 12;
  return {
    subject: `Vila Vaias Aparts — propunere de listare ${ctx.partner.name} (Moldova, mănăstiri)`,
    body: `${greet}

Vă scriu din partea Vilei Vaias Aparts — 7 apartamente boutique în Târgu Neamț, deja apreciate pe Booking (4.8/5) și Airbnb (4.9/5).

Punctele forte pentru circuitele dvs.:

  • Locație ideală pentru tururi "Mănăstirile Nordului Moldovei"
  • Capacitate flexibilă: 1 apartament (2-6 pers) sau întreaga vilă (22-28 pers)
  • Confort uniform în toate apartamentele
  • Acces facil cu autocar (parcare proprie + zonă încărcare)
  • Comision standard ${comm}%, facturat lunar
  • Confirmare în maxim 4 ore lucrătoare

Pachete preconfigurate disponibile:
  • Pelerinaj Neamț — 3 nopți (Agapia + Văratec + Neamț + Sihăstria)
  • Crăciunul Moldovenesc — 3-4 nopți
  • Gastronomic Moldova — 3 nopți cu degustări

Link partener cu cod tracking ${tracking}:
${url}

Pot trimite oferta completă (fact sheet, foto, tarife B2B) la confirmarea interesului. Sau vă invit la un call scurt.

Cu deosebită considerație,
Vasile Jiboc
Vila Vaias Aparts
www.vaiasaparts.ro · 0743 456 789
Echipa Vaias Aparts`,
    tracking,
  };
}

export function templateFor(category: B2BCategory) {
  if (category === "DIASPORA") return outreachDiasporaAgency;
  if (category === "TOUR_OPERATOR") return outreachTourOperator;
  return outreachRomanianAgency;
}
