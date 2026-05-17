/**
 * VAIA OS — Agent 12: Institutional Segments.
 *
 * Outreach templates and package configurations for institutional segments:
 *   • Schools (tabere, excursii tematice, schimb cultural)
 *   • Police / Military (refacere fizică, teambuilding, tratament)
 *   • Medical (personal medical pentru tratament Oglinzi/Bălțătești sau conferințe)
 *   • Corporate (teambuilding, board meetings, executive retreats)
 */

export type InstitutionalSegment = "SCHOOL" | "POLICE_MILITARY" | "MEDICAL" | "CORPORATE";

export type SegmentPackage = {
  segment: InstitutionalSegment;
  nameRO: string;
  durationDays: number;
  capacityMin: number;
  capacityMax: number;
  basePricePerPersonRON: number;
  inclusions: string[];
};

export const SEGMENT_PACKAGES: SegmentPackage[] = [
  {
    segment: "SCHOOL",
    nameRO: "Tabără școlară — Mănăstiri și cultură",
    durationDays: 3,
    capacityMin: 20,
    capacityMax: 28,
    basePricePerPersonRON: 350,
    inclusions: [
      "Cazare 3 nopți, 1 elev = 1 pat",
      "Mic dejun zilnic",
      "Vizite Cetatea Neamțului + 3 mănăstiri",
      "Ghid local pentru toate excursiile",
      "Transport intern de la vilă spre obiective",
      "Atelier interactiv: istoria locală cu un profesor invitat",
      "Acoperire CCTV pentru parinți (siguranță elevi)",
      "Profesori = cazare gratuită (1 la 10 elevi)",
    ],
  },
  {
    segment: "POLICE_MILITARY",
    nameRO: "Pachet recuperare fizică — Poliție / Armată",
    durationDays: 5,
    capacityMin: 4,
    capacityMax: 24,
    basePricePerPersonRON: 480,
    inclusions: [
      "Cazare 5 nopți în apartament standard sau familial",
      "Tratament tradițional la Oglinzi/Bălțătești (taxe necombustibile)",
      "Plimbare ghidată zona Cetatea Neamțului",
      "Han Rustic dineu inclus (1 dată)",
      "Acces Bucătăria pentru Toți",
      "Factura conform cerințelor instituționale",
      "Reducere 10% pentru ordine de serviciu colective",
    ],
  },
  {
    segment: "MEDICAL",
    nameRO: "Conferință / Retragere medicală",
    durationDays: 3,
    capacityMin: 10,
    capacityMax: 28,
    basePricePerPersonRON: 420,
    inclusions: [
      "Cazare 3 nopți",
      "Sala de conferințe disponibilă (Han Rustic, partener)",
      "Acces Bucătăria pentru Toți (în comun)",
      "Tehnică audio-video (proiector, internet)",
      "Posibilitate vizită mănăstiri pentru program social",
      "Factură fiscală conform CFR pentru raportare conferință",
    ],
  },
  {
    segment: "CORPORATE",
    nameRO: "Corporate Teambuilding",
    durationDays: 3,
    capacityMin: 8,
    capacityMax: 28,
    basePricePerPersonRON: 580,
    inclusions: [
      "Cazare 2-3 nopți",
      "Workshop la Refugiul Vaias (lac privat)",
      "Pescuit + BBQ inclus",
      "Tur ghidat mănăstiri (opțional)",
      "Han Rustic — cină gala",
      "Photographer 1 zi pentru content corporate",
      "Reducere vilă întreagă: 22-28 persoane",
    ],
  },
];

// ====================== OUTREACH TEMPLATES ======================

export function schoolEmail(opts: { schoolName: string; principalName?: string }): { subject: string; body: string } {
  const pkg = SEGMENT_PACKAGES.find(p => p.segment === "SCHOOL")!;
  return {
    subject: `${opts.schoolName} — propunere tabără 3 zile la Vaias Aparts Neamț`,
    body: `Bună ziua${opts.principalName ? `, ${opts.principalName}` : ""},

Vă scriu din partea Vilei Vaias Aparts — 7 apartamente boutique în Târgu Neamț, cu capacitate optimă 22-28 persoane (perfectă pentru o clasă întreagă).

Vrem să sprijinim școlile interesate de tabere tematice "Mănăstirile Nordului Moldovei" — istorie, religie, natură.

Pachetul "${pkg.nameRO}":
  • ${pkg.durationDays} zile / ${pkg.durationDays - 1} nopți cazare
  • ${pkg.basePricePerPersonRON} lei/elev
  • Grup ${pkg.capacityMin}–${pkg.capacityMax} elevi
  • Inclus:
${pkg.inclusions.map(i => `      - ${i}`).join("\n")}

Profesori însoțitori: cazare gratuită (1 la 10 elevi).
Facturare CFR conform, decontare cu ordin de plată.

Aș fi bucuros să stabilim o întâlnire scurtă online sau să vă vizitez la școală pentru a vă prezenta detaliile. Putem rezerva oricând în lunile aprilie, mai sau octombrie — calendarul școlar.

Cu deosebită considerație,
Vasile Jiboc — Vila Vaias Aparts
www.vaiasaparts.ro · 0743 456 789
Echipa Vaias Aparts`,
  };
}

export function policeMilitaryEmail(opts: { institutionName: string }): { subject: string; body: string } {
  const pkg = SEGMENT_PACKAGES.find(p => p.segment === "POLICE_MILITARY")!;
  return {
    subject: `${opts.institutionName} — pachet recuperare fizică la Vaias Aparts (Neamț)`,
    body: `Stimată/Stimate domn,

Vă scriu din partea Vilei Vaias Aparts — un complex de 7 apartamente boutique în Târgu Neamț, la 30 minute de stațiunile balneare Oglinzi și Bălțătești.

Multe instituții publice (poliție, jandarmerie, armată) au nevoie de pachete de recuperare pentru personalul lor. Le oferim:

  ${pkg.inclusions.map(i => `• ${i}`).join("\n  ")}

Tarif ${pkg.basePricePerPersonRON} lei/persoană pentru ${pkg.durationDays} nopți. Facturare conformă cerințelor instituționale (cod fiscal, CIF, etc.). Decontare pe bază de ordin de plată sau virament bancar.

Putem începe colaborarea cu un grup pilot — 4-8 persoane. Verificați programul cu ordonatorul de credite și putem programa primul grup în 2-3 săptămâni.

Cu respect,
Vasile Jiboc — Vila Vaias Aparts
www.vaiasaparts.ro · 0743 456 789
Echipa Vaias Aparts`,
  };
}

export function medicalEmail(opts: { organization: string; eventTopic?: string }): { subject: string; body: string } {
  const pkg = SEGMENT_PACKAGES.find(p => p.segment === "MEDICAL")!;
  return {
    subject: `${opts.organization} — locație pentru ${opts.eventTopic ?? "conferință medicală"} în Neamț`,
    body: `Bună ziua,

Vă scriu din partea Vilei Vaias Aparts. Locația noastră — 7 apartamente boutique în centrul Târgu Neamț, capacitate 22-28 persoane — este potrivită pentru retrageri sau conferințe medicale mici, în natură, dar cu logistică profesională.

Pachetul ${pkg.nameRO}:
  • ${pkg.durationDays} nopți cazare, totul cuprins
  • ${pkg.basePricePerPersonRON} lei/participant
  • Sală de conferințe disponibilă (la Han Rustic, partener la 200m)
  • Internet de fibră, proiector, sistem audio
  • Cazare în apartamente complete (nu camere de hotel)
  • Acces la mănăstiri pentru program de relaxare
  • Factură fiscală CFR conform pentru raportare congres

Decontare pe bază de program scris, factura fiscală conform regulamentelor de raportare. Putem oferi și pachete sponsor pentru firme farma.

Aș fi bucuros să vă trimit fișa tehnică completă și dispunerea spațiilor. Aveți disponibilitate pentru un call?

Cu drag,
Vasile Jiboc
Vila Vaias Aparts · www.vaiasaparts.ro
WhatsApp: 0743 456 789
Echipa Vaias Aparts`,
  };
}

export function corporateEmail(opts: { companyName: string; contactName?: string }): { subject: string; body: string } {
  const pkg = SEGMENT_PACKAGES.find(p => p.segment === "CORPORATE")!;
  const greet = opts.contactName ? `Bună, ${opts.contactName},` : "Bună ziua,";
  return {
    subject: `${opts.companyName} — teambuilding la Vaias Aparts (Refugiul Vaias inclus)`,
    body: `${greet}

Vă scriu din partea Vilei Vaias Aparts — 7 apartamente boutique în Târgu Neamț, plus Refugiul Vaias (lacul nostru privat la 30 min) — locul ideal pentru teambuilding-uri care nu seamănă cu nimic altceva.

Pachetul Corporate Teambuilding:
  • ${pkg.durationDays} zile, ${pkg.basePricePerPersonRON} lei/persoană
  • Grup ${pkg.capacityMin}-${pkg.capacityMax} persoane
  • Inclus:
${pkg.inclusions.map(i => `      - ${i}`).join("\n")}

Avantajul vilă întreagă: 22-28 persoane, intimitate completă, nimeni străin în jurul echipei dvs.

Trimit cu plăcere o ofertă detaliată cu calendar disponibil. Răspundeți la mail sau pe WhatsApp 0743 456 789 — răspund în maxim 4 ore lucrătoare.

Cu drag,
Vasile Jiboc — Vila Vaias Aparts
www.vaiasaparts.ro
Echipa Vaias Aparts`,
  };
}

export function templateForSegment(segment: InstitutionalSegment) {
  switch (segment) {
    case "SCHOOL": return schoolEmail;
    case "POLICE_MILITARY": return policeMilitaryEmail;
    case "MEDICAL": return medicalEmail;
    case "CORPORATE": return corporateEmail;
  }
}
