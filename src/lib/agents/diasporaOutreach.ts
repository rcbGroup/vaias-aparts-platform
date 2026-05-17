/**
 * VAIA OS — Agent 11: Diaspora Outreach.
 *
 * Catalog of Romanian Orthodox parishes abroad + transport companies.
 * Produces warm, personal Romanian-language outreach templates for parish priests
 * and English/Romanian templates for diaspora transport partners.
 */

export type DiasporaParish = {
  country: string;
  city: string;
  parishName: string;
  priestName?: string;
  email?: string;
  notes?: string;
};

export type TransportCompany = {
  name: string;
  country: string;
  routes: string[];
  email?: string;
  website?: string;
};

// Hand-curated seed list. Real production list will be expanded by ops.
export const DIASPORA_PARISHES: DiasporaParish[] = [
  // Italy
  { country: "Italia", city: "Roma", parishName: "Parohia Ortodoxă Română Sfântul Antonie cel Mare", priestName: "Părintele Lucian" },
  { country: "Italia", city: "Milano", parishName: "Parohia Sfântul Mucenic Gheorghe" },
  { country: "Italia", city: "Torino", parishName: "Parohia Sfânta Treime" },
  { country: "Italia", city: "Padova", parishName: "Parohia Sfântul Cuvios Antipa" },
  { country: "Italia", city: "Bologna", parishName: "Parohia Sfânta Cuvioasa Parascheva" },

  // Spain
  { country: "Spania", city: "Madrid", parishName: "Catedrala Sfinții Părinți Brâncoveanu" },
  { country: "Spania", city: "Barcelona", parishName: "Parohia Sfântul Apostol Andrei" },
  { country: "Spania", city: "Castellón", parishName: "Parohia Sfântul Nicolae" },
  { country: "Spania", city: "Valencia", parishName: "Parohia Sfânta Treime" },

  // Germany
  { country: "Germania", city: "München", parishName: "Catedrala Sfinții Arhangheli Mihail și Gavriil" },
  { country: "Germania", city: "Berlin", parishName: "Parohia Sfântul Andrei" },
  { country: "Germania", city: "Stuttgart", parishName: "Parohia Sfântul Mare Mucenic Dimitrie" },
  { country: "Germania", city: "Frankfurt", parishName: "Parohia Sfânta Treime" },
  { country: "Germania", city: "Köln", parishName: "Parohia Sfântul Nectarie" },

  // UK
  { country: "Marea Britanie", city: "Londra", parishName: "Catedrala Sfântul Gheorghe" },
  { country: "Marea Britanie", city: "Manchester", parishName: "Parohia Sfântul Nicolae" },
  { country: "Marea Britanie", city: "Birmingham", parishName: "Parohia Sfinții Constantin și Elena" },
  { country: "Marea Britanie", city: "Glasgow", parishName: "Parohia Sfânta Cuvioasa Parascheva" },

  // Ireland
  { country: "Irlanda", city: "Dublin", parishName: "Parohia Sfântul Apostol Andrei" },
  { country: "Irlanda", city: "Cork", parishName: "Parohia Sfântul Mucenic Dimitrie" },
  { country: "Irlanda", city: "Limerick", parishName: "Parohia Sfânta Cuvioasa Parascheva" },

  // France & Belgium
  { country: "Franța", city: "Paris", parishName: "Catedrala Sfinții Arhangheli" },
  { country: "Franța", city: "Lyon", parishName: "Parohia Sfântul Iosif cel Nou" },
  { country: "Belgia", city: "Bruxelles", parishName: "Parohia Sfântul Nicolae" },

  // Austria
  { country: "Austria", city: "Viena", parishName: "Parohia Sfânta Înviere" },
];

export const TRANSPORT_COMPANIES: TransportCompany[] = [
  { name: "Atlassib", country: "Mai multe țări", routes: ["UK - RO", "DE - RO", "ES - RO", "IT - RO"], website: "https://www.atlassib.com" },
  { name: "Eurolines România", country: "Mai multe țări", routes: ["IT - RO", "FR - RO", "DE - RO"], website: "https://www.eurolines.ro" },
  { name: "Nextour", country: "România", routes: ["RO transport intern + diaspora"], website: "https://www.nextour.ro" },
  { name: "Mega Tours Iași", country: "Mai multe țări", routes: ["UK - Moldova RO", "IT - Moldova RO"] },
  { name: "Sintransport", country: "Mai multe țări", routes: ["DE - Moldova RO", "AT - Moldova RO"] },
  { name: "FlixBus", country: "Pan-European", routes: ["EU - Iași", "EU - Bacău"], website: "https://www.flixbus.ro" },
];

// =================== TEMPLATES ===================

export function parishPriestEmail(parish: DiasporaParish): { subject: string; body: string } {
  const greeting = parish.priestName
    ? `Părinte ${parish.priestName}, vă sărut dreapta,`
    : `Părinte slujitor, vă sărut dreapta,`;
  return {
    subject: `Mănăstirea Neamț pentru enoriașii din ${parish.city} — invitație la pelerinaj`,
    body: `${greeting}

Vă scrie Vasile Jiboc, fiu al pământului nemțean. Avem o vilă boutique chiar în Târgu Neamț — Vila Vaias Aparts — la 15 minute de Mănăstirea Agapia, Văratec, Neamț și Sihăstria. 7 apartamente, capacitate 22-28 persoane.

Pentru enoriașii dvs. — fie din ${parish.city}, fie de oriunde din diaspora — ar fi o bucurie să le putem oferi un sejur ca acasă atunci când vin la închinare. Cu părintescul dvs. binecuvântare, am putea organiza:

  • Tarife preferențiale pentru grupuri de pelerini (10% reducere)
  • Asistență la sosirea pe aeroportul Iași (200 km) sau Bacău (90 km)
  • Cazare cu comuniune cu Sfinții Părinți din mănăstirile dimprejur
  • Ghid de pelerinaj (4 ore, ortodox, român)
  • Mâncare tradițională cu binecuvântare — Han Rustic, recomandare directă

Vă pot trimite o broșură pentru a o pune la avizier sau a o distribui enoriașilor care plănuiesc o pelerinaj la Mănăstirile Nordului Moldovei.

Domnul să vă binecuvânteze slujirea în ${parish.parishName} din ${parish.city}!

Cu plecăciune și fiu evlavios,
Vasile Jiboc — Vila Vaias Aparts
www.vaiasaparts.ro · WhatsApp: +40 743 456 789
Echipa Vaias Aparts`,
  };
}

export function transportCompanyEmail(t: TransportCompany): { subject: string; body: string } {
  return {
    subject: `Parteneriat ${t.name} ↔ Vila Vaias Aparts — beneficii pentru pasagerii voștri`,
    body: `Bună ziua, echipa ${t.name},

Mă numesc Vasile Jiboc, fondator al Vilei Vaias Aparts — 7 apartamente boutique în Târgu Neamț, perfect amplasate pentru diaspora care vine la închinare la mănăstirile Agapia, Văratec, Neamț, Sihăstria.

Cunoaștem că ${t.name} face transport între diaspora și România, inclusiv pe rutele: ${t.routes.join(", ")}. Mulți dintre pasagerii voștri vin în Moldova — și au nevoie de cazare confortabilă la prețuri corecte.

Propunere de parteneriat:

  • 10% discount pentru pasagerii care prezintă biletul ${t.name} (verificare digitală)
  • Coduri promo unice cu tracking (rezervări reale = comision lunar)
  • Listarea Vila Vaias Aparts pe materialele voastre (broșuri, site)
  • Bani pentru ${t.name}: 8-10% comision pe rezervările confirmate
  • Asistență WhatsApp 24/7 pentru pasagerii voștri

Puteți să-mi spuneți cine se ocupă de parteneriatele B2B la voi? Sau, dacă vă convine, vă invit la un call de 15 minute.

Cu drag,
Vasile Jiboc
Vila Vaias Aparts · www.vaiasaparts.ro
WhatsApp: +40 743 456 789
Echipa Vaias Aparts`,
  };
}

export function getParishesByCountry(country: string): DiasporaParish[] {
  return DIASPORA_PARISHES.filter(p => p.country.toLowerCase() === country.toLowerCase());
}

export function getCountries(): string[] {
  const set = new Set(DIASPORA_PARISHES.map(p => p.country));
  return Array.from(set);
}
