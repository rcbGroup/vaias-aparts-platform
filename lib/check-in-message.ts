/**
 * VAIA OS — Guest check-in message generator.
 *
 * Generates the full pre-arrival WhatsApp/email message per master-prompt rules:
 *   - Time-appropriate greeting (RO/EN/FR/DE auto-detected from phone prefix)
 *   - Apartment-specific details (floor, bed type, AC, kitchen access)
 *   - Parking + gate code 0623#
 *   - WiFi access
 *   - City tax calculation (3 RON per adult per night)
 *   - Boiler/thermostat warning
 *   - Key return instructions
 *   - Virtual tour link (Matterport when available)
 *   - Signature "Echipa Vaias Aparts"
 *
 * SECURITY: The key-box code is NEVER included in this file or its output.
 * It is delivered verbally by the host on arrival only.
 */

import { apartments, getApartmentBySlug, type Apartment } from "./apartments";

export type Language = "ro" | "en" | "fr" | "de";

export type CheckInRequest = {
  guestName: string;
  apartmentSlug: string;
  checkIn: string | Date;
  checkOut: string | Date;
  adults: number;
  children?: number;
  phonePrefix?: string;
  guestPhone?: string;
  source?: string;
  language?: Language;
};

export type CheckInMessageResult = {
  language: Language;
  apartment: string;
  message: string;
  cityTaxRON: number;
  nights: number;
  metadata: {
    floor: string;
    hasAC: boolean;
    accessible: boolean;
    hasPrivateKitchen: boolean;
    matterportId?: string;
  };
};

const CITY_TAX_RON_PER_ADULT_PER_NIGHT = 3;
const GATE_CODE = "0623#";
const WIFI_SSID = "VaiasAparts";
const WIFI_PASSWORD = "vaias2026";

// =============================================================================
// Language detection
// =============================================================================

/**
 * Phone prefix -> probable guest language.
 * Falls back to Romanian when unknown.
 */
export function detectLanguageFromPhone(phone?: string): Language {
  if (!phone) return "ro";
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Romanian
  if (cleaned.startsWith("+40") || cleaned.startsWith("0040") || cleaned.startsWith("0")) return "ro";

  // German-speaking
  if (cleaned.startsWith("+49") || cleaned.startsWith("+43") || cleaned.startsWith("+41")) return "de";

  // French-speaking
  if (cleaned.startsWith("+33") || cleaned.startsWith("+32") || cleaned.startsWith("+352")) return "fr";

  // English defaults for UK / IE / US / CA / AU / NZ
  if (
    cleaned.startsWith("+44") ||
    cleaned.startsWith("+353") ||
    cleaned.startsWith("+1") ||
    cleaned.startsWith("+61") ||
    cleaned.startsWith("+64")
  ) {
    return "en";
  }

  // Italy / Spain / Portugal / NL / others — default to English
  if (
    cleaned.startsWith("+39") ||
    cleaned.startsWith("+34") ||
    cleaned.startsWith("+351") ||
    cleaned.startsWith("+31") ||
    cleaned.startsWith("+45") ||
    cleaned.startsWith("+46") ||
    cleaned.startsWith("+47") ||
    cleaned.startsWith("+358")
  ) {
    return "en";
  }

  return "ro";
}

// =============================================================================
// Time-aware greeting
// =============================================================================

function timeOfDayGreeting(language: Language, now = new Date()): string {
  const hour = now.getHours();
  if (language === "ro") {
    if (hour < 12) return "Bună dimineața";
    if (hour < 18) return "Bună ziua";
    return "Bună seara";
  }
  if (language === "en") {
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }
  if (language === "fr") {
    if (hour < 18) return "Bonjour";
    return "Bonsoir";
  }
  // de
  if (hour < 11) return "Guten Morgen";
  if (hour < 18) return "Guten Tag";
  return "Guten Abend";
}

// =============================================================================
// Helpers
// =============================================================================

function toDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(value);
}

function formatDate(d: Date, language: Language): string {
  const locale = { ro: "ro-RO", en: "en-GB", fr: "fr-FR", de: "de-DE" }[language];
  return d.toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" });
}

function nightCount(checkIn: Date, checkOut: Date): number {
  const ms = checkOut.getTime() - checkIn.getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}

function bedDescription(apt: Apartment, language: Language): string {
  if (apt.slug === "apartament-7") {
    return {
      ro: "pat dublu standard",
      en: "standard double bed",
      fr: "lit double standard",
      de: "Standard-Doppelbett",
    }[language];
  }
  return {
    ro: "pat Emperor 2m × 2m",
    en: "Emperor bed 2m × 2m",
    fr: "lit Emperor 2m × 2m",
    de: "Emperor-Bett 2m × 2m",
  }[language];
}

function kitchenDescription(apt: Apartment, language: Language): string {
  if (apt.slug === "apartament-7") {
    return {
      ro: "frigider propriu în apartament și acces la Bucătăria pentru Toți (parter, complet utilată)",
      en: "your own fridge in the apartment and access to Kitchen for All (ground floor, fully equipped)",
      fr: "un réfrigérateur dans l'appartement et accès à la Cuisine pour Tous (rez-de-chaussée, entièrement équipée)",
      de: "ein eigener Kühlschrank im Apartment und Zugang zur Küche für Alle (Erdgeschoss, voll ausgestattet)",
    }[language];
  }
  return {
    ro: "bucătărie privată complet utilată (frigider, microunde, fierbător, prăjitor)",
    en: "private fully equipped kitchenette (fridge, microwave, kettle, toaster)",
    fr: "kitchenette privée entièrement équipée (réfrigérateur, micro-ondes, bouilloire, grille-pain)",
    de: "private voll ausgestattete Küchenzeile (Kühlschrank, Mikrowelle, Wasserkocher, Toaster)",
  }[language];
}

function floorLabel(apt: Apartment, language: Language): string {
  // Internal floor strings are Romanian; translate user-visible label.
  const map: Record<string, Record<Language, string>> = {
    Parter: { ro: "Parter", en: "Ground floor", fr: "Rez-de-chaussée", de: "Erdgeschoss" },
    "Etaj 1": { ro: "Etaj 1", en: "First floor", fr: "Premier étage", de: "Erste Etage" },
    "Etaj 2": { ro: "Etaj 2", en: "Second floor", fr: "Deuxième étage", de: "Zweite Etage" },
  };
  return map[apt.floor]?.[language] ?? apt.floor;
}

// =============================================================================
// Message templates
// =============================================================================

type TemplateContext = {
  greeting: string;
  guestName: string;
  apartmentName: string;
  apartmentNumber: number;
  floor: string;
  bed: string;
  kitchen: string;
  hasAC: boolean;
  isAccessible: boolean;
  checkInLabel: string;
  checkOutLabel: string;
  nights: number;
  adults: number;
  children: number;
  cityTaxRON: number;
  matterportUrl?: string;
};

function renderRO(ctx: TemplateContext): string {
  const acLine = ctx.hasAC ? "• Aer condiționat în apartament — telecomandă pe noptieră\n" : "";
  const accessLine = ctx.isAccessible
    ? "• Acces fără trepte — apartamentul este prietenos pentru mobilitate redusă\n"
    : "";
  const tourLine = ctx.matterportUrl
    ? `\n🎬 *Tur virtual al apartamentului:* ${ctx.matterportUrl}\n`
    : "";

  return `${ctx.greeting}, ${ctx.guestName}! 🌿

Vă mulțumim pentru rezervarea făcută la Vila Vaias Aparts. Suntem bucuroși să vă primim în apartamentul nostru *${ctx.apartmentName}* și v-am pregătit toate informațiile pentru un check-in cât mai liniștit.

📅 *Rezervarea dumneavoastră*
• Check-in: ${ctx.checkInLabel} (după ora 14:00)
• Check-out: ${ctx.checkOutLabel} (până la ora 11:00)
• Nopți: ${ctx.nights}
• Adulți: ${ctx.adults}${ctx.children ? ` · Copii: ${ctx.children}` : ""}

🏠 *Despre apartament*
• ${ctx.floor} — ${ctx.apartmentName}
• Dormitor cu ${ctx.bed}
${acLine}• ${ctx.kitchen}
• Smart TV, baie privată, terasă privată
• Lenjerie de bumbac premium și prosoape proaspete
${accessLine}
🚗 *Cum ajungeți la noi*
Adresa: Strada Sfântul Lazăr Nr. 1, Târgu Neamț (poarta verde de lemn).
Parcarea este gratuită, în curtea vilei.
*Codul de la poarta auto:* ${GATE_CODE} (tastați și apăsați tasta verde).

🔑 *Self check-in*
Vila are check-in autonom — vă vom trimite codul de la cutia cu chei doar după confirmarea sosirii și a actelor de identitate, prin mesaj sau verbal la sosire. Vă rugăm să ne anunțați cu 30-60 de minute înainte de a ajunge.

📶 *WiFi*
Rețea: ${WIFI_SSID}
Parolă: ${WIFI_PASSWORD}

♨️ *Boiler și termostat — important*
Apa caldă vine din boilere proprii — vă rugăm să nu modificați setarea termostatului (este reglat la temperatura optimă). Dacă observați ceva neobișnuit, anunțați-ne imediat.

💶 *Taxa de stațiune*
Conform legislației locale, taxa este de 3 RON / adult / noapte și se achită la fața locului în RON, numerar sau card.
Total taxă stațiune pentru sejur: *${ctx.cityTaxRON} RON*

🔐 *La plecare*
• Lăsați cheile pe masa din living sau înapoi în cutia cu chei
• Închideți ferestrele și ușa principală
• Nu este nevoie să spălați vasele sau să faceți curățenie — echipa noastră se ocupă
${tourLine}
📞 *Suntem aici pentru dumneavoastră*
Tel/WhatsApp: +40 738 345 330 sau +40 752 388 388
Email: contact@VaiasAparts.ro

Vă așteptăm cu drag!

— Echipa Vaias Aparts`;
}

function renderEN(ctx: TemplateContext): string {
  const acLine = ctx.hasAC ? "• Air conditioning in the apartment — remote on the bedside table\n" : "";
  const accessLine = ctx.isAccessible
    ? "• Step-free access — the apartment is mobility-friendly\n"
    : "";
  const tourLine = ctx.matterportUrl
    ? `\n🎬 *Virtual tour of the apartment:* ${ctx.matterportUrl}\n`
    : "";

  return `${ctx.greeting}, ${ctx.guestName}! 🌿

Thank you for booking with Vila Vaias Aparts. We are delighted to welcome you to *${ctx.apartmentName}* and have prepared everything you need for a smooth check-in.

📅 *Your reservation*
• Check-in: ${ctx.checkInLabel} (from 14:00)
• Check-out: ${ctx.checkOutLabel} (until 11:00)
• Nights: ${ctx.nights}
• Adults: ${ctx.adults}${ctx.children ? ` · Children: ${ctx.children}` : ""}

🏠 *About your apartment*
• ${ctx.floor} — ${ctx.apartmentName}
• Bedroom with a ${ctx.bed}
${acLine}• ${ctx.kitchen}
• Smart TV, private bathroom, private terrace
• Premium cotton bedding and fresh towels
${accessLine}
🚗 *How to find us*
Address: Strada Sfântul Lazăr No. 1, Târgu Neamț (green wooden gate).
Parking is free, inside the villa courtyard.
*Vehicle gate code:* ${GATE_CODE} (enter the digits and press the green button).

🔑 *Self check-in*
The villa uses contactless self check-in — we will share the key-box code only after we confirm your arrival window and ID details, by message or verbally on arrival. Please let us know 30–60 minutes before you arrive.

📶 *WiFi*
Network: ${WIFI_SSID}
Password: ${WIFI_PASSWORD}

♨️ *Hot water boiler & thermostat — important*
Hot water is supplied by dedicated boilers — please do not change the thermostat setting (it is already calibrated for optimal temperature). If anything looks unusual, message us right away.

💶 *Local city tax*
By Romanian law the city tax is 3 RON / adult / night and is paid on arrival in RON cash or by card.
Total for your stay: *${ctx.cityTaxRON} RON*

🔐 *When you leave*
• Place the keys on the living room table or back inside the key box
• Close the windows and front door
• No need to wash dishes or clean — our team handles everything
${tourLine}
📞 *We're here for you*
Phone/WhatsApp: +40 738 345 330 or +40 752 388 388
Email: contact@VaiasAparts.ro

Looking forward to welcoming you!

— Echipa Vaias Aparts`;
}

function renderFR(ctx: TemplateContext): string {
  const acLine = ctx.hasAC ? "• Climatisation dans l'appartement — télécommande sur la table de nuit\n" : "";
  const accessLine = ctx.isAccessible
    ? "• Accès sans marches — appartement adapté à la mobilité réduite\n"
    : "";
  const tourLine = ctx.matterportUrl
    ? `\n🎬 *Visite virtuelle de l'appartement :* ${ctx.matterportUrl}\n`
    : "";

  return `${ctx.greeting}, ${ctx.guestName} ! 🌿

Merci d'avoir réservé à la Vila Vaias Aparts. Nous sommes ravis de vous accueillir dans *${ctx.apartmentName}* et avons préparé toutes les informations pour un arrivée en douceur.

📅 *Votre réservation*
• Arrivée : ${ctx.checkInLabel} (à partir de 14h00)
• Départ : ${ctx.checkOutLabel} (avant 11h00)
• Nuits : ${ctx.nights}
• Adultes : ${ctx.adults}${ctx.children ? ` · Enfants : ${ctx.children}` : ""}

🏠 *À propos de l'appartement*
• ${ctx.floor} — ${ctx.apartmentName}
• Chambre avec ${ctx.bed}
${acLine}• ${ctx.kitchen}
• Smart TV, salle de bain privée, terrasse privée
• Linge de lit en coton premium et serviettes fraîches
${accessLine}
🚗 *Comment nous trouver*
Adresse : Strada Sfântul Lazăr nr. 1, Târgu Neamț (portail vert en bois).
Le parking est gratuit, dans la cour de la villa.
*Code du portail :* ${GATE_CODE} (tapez les chiffres puis la touche verte).

🔑 *Self check-in*
La villa fonctionne en arrivée autonome — nous vous communiquerons le code de la boîte à clés uniquement après confirmation de votre heure d'arrivée et de vos documents d'identité, par message ou oralement à votre arrivée. Merci de nous prévenir 30 à 60 minutes avant.

📶 *WiFi*
Réseau : ${WIFI_SSID}
Mot de passe : ${WIFI_PASSWORD}

♨️ *Chaudière et thermostat — important*
L'eau chaude provient de chaudières dédiées — merci de ne pas modifier le thermostat (il est déjà réglé à la température optimale). Si quelque chose vous semble anormal, contactez-nous immédiatement.

💶 *Taxe de séjour*
Conformément à la législation roumaine, la taxe est de 3 RON / adulte / nuit, à régler sur place en RON, espèces ou carte.
Total pour votre séjour : *${ctx.cityTaxRON} RON*

🔐 *Au départ*
• Laissez les clés sur la table du salon ou dans la boîte à clés
• Fermez les fenêtres et la porte d'entrée
• Inutile de faire la vaisselle ou le ménage — notre équipe s'en charge
${tourLine}
📞 *Nous sommes à votre disposition*
Téléphone/WhatsApp : +40 738 345 330 ou +40 752 388 388
Email : contact@VaiasAparts.ro

Au plaisir de vous accueillir !

— Echipa Vaias Aparts`;
}

function renderDE(ctx: TemplateContext): string {
  const acLine = ctx.hasAC ? "• Klimaanlage im Apartment — Fernbedienung auf dem Nachttisch\n" : "";
  const accessLine = ctx.isAccessible
    ? "• Stufenloser Zugang — barrierefreundliches Apartment\n"
    : "";
  const tourLine = ctx.matterportUrl
    ? `\n🎬 *Virtuelle Apartmenttour:* ${ctx.matterportUrl}\n`
    : "";

  return `${ctx.greeting}, ${ctx.guestName}! 🌿

Vielen Dank für Ihre Buchung bei Vila Vaias Aparts. Wir freuen uns, Sie in *${ctx.apartmentName}* begrüßen zu dürfen, und haben alle Informationen für einen reibungslosen Check-in vorbereitet.

📅 *Ihre Reservierung*
• Check-in: ${ctx.checkInLabel} (ab 14:00 Uhr)
• Check-out: ${ctx.checkOutLabel} (bis 11:00 Uhr)
• Nächte: ${ctx.nights}
• Erwachsene: ${ctx.adults}${ctx.children ? ` · Kinder: ${ctx.children}` : ""}

🏠 *Über Ihr Apartment*
• ${ctx.floor} — ${ctx.apartmentName}
• Schlafzimmer mit ${ctx.bed}
${acLine}• ${ctx.kitchen}
• Smart TV, eigenes Bad, eigene Terrasse
• Premium-Baumwollbettwäsche und frische Handtücher
${accessLine}
🚗 *So finden Sie uns*
Adresse: Strada Sfântul Lazăr Nr. 1, Târgu Neamț (grünes Holztor).
Parken ist kostenlos im Innenhof der Villa.
*Tor-Code:* ${GATE_CODE} (Ziffern eingeben und grüne Taste drücken).

🔑 *Self-Check-in*
Die Villa nutzt kontaktlosen Self-Check-in — wir senden den Code des Schlüsselkastens erst, nachdem Ihre Ankunftszeit und Ausweisdaten bestätigt sind, per Nachricht oder mündlich bei Ankunft. Bitte melden Sie sich 30–60 Minuten vor Ankunft bei uns.

📶 *WLAN*
Netzwerk: ${WIFI_SSID}
Passwort: ${WIFI_PASSWORD}

♨️ *Boiler und Thermostat — wichtig*
Das Warmwasser kommt aus eigenen Boilern — bitte ändern Sie die Thermostat-Einstellung nicht (sie ist bereits optimal eingestellt). Falls etwas ungewöhnlich erscheint, melden Sie sich bitte sofort bei uns.

💶 *Kurtaxe*
Gemäß rumänischem Recht beträgt die Kurtaxe 3 RON pro Erwachsener pro Nacht und wird vor Ort in RON, bar oder mit Karte bezahlt.
Gesamt für Ihren Aufenthalt: *${ctx.cityTaxRON} RON*

🔐 *Bei der Abreise*
• Legen Sie die Schlüssel auf den Wohnzimmertisch oder zurück in den Schlüsselkasten
• Schließen Sie Fenster und Haustür
• Geschirr spülen oder reinigen ist nicht nötig — unser Team kümmert sich darum
${tourLine}
📞 *Wir sind für Sie da*
Telefon/WhatsApp: +40 738 345 330 oder +40 752 388 388
E-Mail: contact@VaiasAparts.ro

Wir freuen uns auf Ihren Aufenthalt!

— Echipa Vaias Aparts`;
}

// =============================================================================
// Public API
// =============================================================================

export function buildCheckInMessage(req: CheckInRequest): CheckInMessageResult {
  const apt = getApartmentBySlug(req.apartmentSlug);
  if (!apt) {
    throw new Error(`Unknown apartment: ${req.apartmentSlug}`);
  }

  const language: Language =
    req.language ?? detectLanguageFromPhone(req.phonePrefix || req.guestPhone);

  const checkInDate = toDate(req.checkIn);
  const checkOutDate = toDate(req.checkOut);
  const nights = nightCount(checkInDate, checkOutDate);
  const adults = Math.max(1, req.adults);
  const children = req.children ?? 0;
  const cityTaxRON = adults * nights * CITY_TAX_RON_PER_ADULT_PER_NIGHT;

  const aptNumber = parseInt(apt.slug.replace(/[^\d]/g, ""), 10) || 0;
  const matterportUrl = apt.matterportId
    ? `https://my.matterport.com/show/?m=${apt.matterportId}`
    : undefined;

  const ctx: TemplateContext = {
    greeting: timeOfDayGreeting(language),
    guestName: req.guestName.trim(),
    apartmentName: apt.name,
    apartmentNumber: aptNumber,
    floor: floorLabel(apt, language),
    bed: bedDescription(apt, language),
    kitchen: kitchenDescription(apt, language),
    hasAC: apt.hasAC,
    isAccessible: apt.accessible,
    checkInLabel: formatDate(checkInDate, language),
    checkOutLabel: formatDate(checkOutDate, language),
    nights,
    adults,
    children,
    cityTaxRON,
    matterportUrl,
  };

  const message =
    language === "en"
      ? renderEN(ctx)
      : language === "fr"
      ? renderFR(ctx)
      : language === "de"
      ? renderDE(ctx)
      : renderRO(ctx);

  return {
    language,
    apartment: apt.name,
    message,
    cityTaxRON,
    nights,
    metadata: {
      floor: apt.floor,
      hasAC: apt.hasAC,
      accessible: apt.accessible,
      hasPrivateKitchen: apt.hasPrivateKitchen,
      matterportId: apt.matterportId,
    },
  };
}

// Expose apartment list for callers
export function listApartmentSlugs(): string[] {
  return apartments.map((a) => a.slug);
}
