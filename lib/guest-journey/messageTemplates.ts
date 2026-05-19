/**
 * VAIA OS — Guest journey message templates (compressed 5-message flow).
 *
 * Standard stay (3+ nights) → exactly 5 messages:
 *   1. A1_confirmation        — booking confirmation, immediate
 *   2. A2_pre_arrival         — practical info bundle, 24h before, 10:00 local
 *   3. A3_welcome_check       — "settled in OK?", Day 1 evening 20:00 (skipped
 *                                by the agent if the guest already messaged)
 *   4. A4_checkout_reminder   — checkout procedure, evening before, 20:00
 *   5. A5_review_request      — thank-you + platform-specific links, 48h after
 *
 * Same-day booking (≤36h to check-in) → 4 messages:
 *   B1_combined_confirm_arrival (immediate, fuses A1 + A2), then A3, A4, A5
 *
 * One-night stay → 3 messages:
 *   C1_combined_confirm_arrival (immediate), A4 (20:00 same evening), A5 (48h)
 *
 * Returning guests, groups, international: same template keys with the
 * scenario flag set so renderers can warm the tone, add coordination details,
 * or stack additional languages.
 *
 * SECURITY:
 *   • The vehicle gate code 0623# IS allowed in messages.
 *   • The door / key-box code is NEVER in this file or any template — it is
 *     delivered verbally on arrival.
 */

import {
  formatGuestDate,
  type Language,
  timeGreeting,
} from "./languageDetection";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const GATE_CODE = "0623#";
export const WIFI_SSID = "Vaias Aparts";
export const WIFI_PASSWORD = "VaiasAparts";
export const CITY_TAX_PER_ADULT_PER_NIGHT = 5; // lei
// Anca is the primary host contact; Vasi is the secondary.
export const HOST_PHONE_PRIMARY = "+40 752 388 388";
export const HOST_PHONE_SECONDARY = "+40 738 345 330";
export const HOST_EMAIL = "contact@VaiasAparts.ro";
export const ADDRESS = "Strada Sfântul Lazăr Nr. 1, Târgu Neamț";
export const SIGNATURE = "— Echipa Vaias Aparts";

export const KEY_RETURN_INSTRUCTIONS: Record<Language, string> = {
  ro:
    "La plecare, vă rugăm să lăsați cheile în cutia poștală metalică maro " +
    "de la parter, lângă „Bucătăria pentru Toți”, sub Apartamentul 2.",
  en:
    "When you leave, please drop the keys in the brown metal post box on the " +
    "ground floor, next to the “Kitchen for All”, beneath Apartment 2.",
  fr:
    "À votre départ, merci de déposer les clés dans la boîte aux lettres " +
    "métallique marron au rez-de-chaussée, à côté de « Cuisine pour Tous », sous l'Appartement 2.",
  de:
    "Bei Ihrer Abreise legen Sie die Schlüssel bitte in den braunen " +
    "Metall-Postkasten im Erdgeschoss, neben der „Küche für Alle”, unter Apartment 2.",
  it:
    "Alla partenza, lasciate le chiavi nella cassetta postale metallica marrone " +
    "al piano terra, accanto a „Cucina per Tutti”, sotto l'Appartamento 2.",
  es:
    "Al salir, deje las llaves en el buzón metálico marrón de la planta baja, " +
    "junto a „Cocina para Todos”, debajo del Apartamento 2.",
  hu:
    "Távozáskor kérjük, hagyja a kulcsokat a barna fém postaládában a " +
    "földszinten, a „Mindenki Konyhája” mellett, a 2. apartman alatt.",
};

// ---------------------------------------------------------------------------
// Variables passed into each template
// ---------------------------------------------------------------------------

export type TemplateVars = {
  guestName: string;
  apartmentName: string;
  apartmentFloor?: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  adults: number;
  children: number;
  cityTaxTotal: number; // adults * nights * 5
  source?: string; // "direct" | "booking" | "airbnb" | "travelminit" | "h2b"
  reviewLinksBlock?: string; // pre-rendered, language-aware
  // Scenario modifiers — renderer adjusts tone/content but keeps the same template key.
  isReturning?: boolean;
  isGroup?: boolean;
  groupApartments?: string[];
  totalPrice?: number;
  currency?: string; // defaults to "RON"
};

// ---------------------------------------------------------------------------
// Template keys (compressed)
// ---------------------------------------------------------------------------

export type TemplateKey =
  // Standard 5-message flow (used by all scenarios; tone modulated via flags)
  | "A1_confirmation"
  | "A2_pre_arrival"
  | "A3_welcome_check"
  | "A4_checkout_reminder"
  | "A5_review_request"
  // Same-day fused message (immediate; replaces A1+A2)
  | "B1_combined_confirm_arrival"
  // One-night fused arrival message (immediate; replaces A1+A2)
  | "C1_combined_confirm_arrival";

export const TEMPLATE_KEYS: TemplateKey[] = [
  "A1_confirmation",
  "A2_pre_arrival",
  "A3_welcome_check",
  "A4_checkout_reminder",
  "A5_review_request",
  "B1_combined_confirm_arrival",
  "C1_combined_confirm_arrival",
];

// ---------------------------------------------------------------------------
// Per-language renderers
// ---------------------------------------------------------------------------

type Renderer = (vars: TemplateVars, lang: Language) => string;

const r = (s: string) => s.trim();

const priceLine = (v: TemplateVars, lang: Language): string => {
  if (!v.totalPrice) return "";
  const ccy = v.currency ?? "RON";
  switch (lang) {
    case "ro":
      return `• Total: ${v.totalPrice} ${ccy}`;
    case "en":
      return `• Total: ${v.totalPrice} ${ccy}`;
    case "fr":
      return `• Total : ${v.totalPrice} ${ccy}`;
    case "de":
      return `• Gesamt: ${v.totalPrice} ${ccy}`;
    case "it":
      return `• Totale: ${v.totalPrice} ${ccy}`;
    case "es":
      return `• Total: ${v.totalPrice} ${ccy}`;
    case "hu":
      return `• Összesen: ${v.totalPrice} ${ccy}`;
  }
};

// Practical info bundle reused by A2, B1, C1.
const practicalInfoBlock = (v: TemplateVars, lang: Language): string => {
  const groupExtra: Record<Language, string> = {
    ro:
      "👥 *Pentru grupul dvs.:* aveți la dispoziție mai multe locuri de parcare " +
      "în curte; vă rugăm să țineți cont de liniștea celorlalți oaspeți, mai ales " +
      "după ora 22:00. Bucătăria de la parter („Bucătăria pentru Toți”) este " +
      "comună — folosiți-o liber.",
    en:
      "👥 *For your group:* there are several parking spots in the courtyard; " +
      "please keep noise down after 22:00 out of consideration for other guests. " +
      "The ground-floor kitchen (“Kitchen for All”) is shared — feel free to use it.",
    fr:
      "👥 *Pour votre groupe :* plusieurs places de parking dans la cour ; merci " +
      "de respecter le calme après 22h. La cuisine du rez-de-chaussée est partagée.",
    de:
      "👥 *Für Ihre Gruppe:* mehrere Parkplätze im Innenhof; bitte nach 22:00 Uhr " +
      "Rücksicht nehmen. Die Küche im Erdgeschoss ist Gemeinschaftsküche.",
    it:
      "👥 *Per il vostro gruppo:* diversi posti auto in cortile; per favore " +
      "rispettate il silenzio dopo le 22:00. Cucina al piano terra in condivisione.",
    es:
      "👥 *Para su grupo:* varias plazas de aparcamiento en el patio; por favor " +
      "respeten el silencio después de las 22:00. Cocina compartida en planta baja.",
    hu:
      "👥 *A csoportja számára:* több parkolóhely az udvarban; kérjük, 22:00 " +
      "után tartsák tiszteletben a csendet. Földszinti közös konyha.",
  };

  switch (lang) {
    case "ro":
      return r(`
📋 *Tot ce aveți nevoie pentru sosire*

🚪 *Cod poartă auto (glisantă, automată):* ${GATE_CODE}
🚗 *Parcare:* gratuită în curte, intrare prin poarta principală.
📍 *Adresa:* ${ADDRESS}.
🕑 *Check-in:* după ora 14:00.
🔑 *Cheile / accesul în apartament* — vă vom înmâna codul la sosire (din motive de siguranță nu îl trimitem pe mesaj).
📶 *WiFi:* ${WIFI_SSID} / parolă: ${WIFI_PASSWORD}
🧾 *Taxă oraș:* ${CITY_TAX_PER_ADULT_PER_NIGHT} lei/adult/noapte (${v.cityTaxTotal} lei pentru sejurul dvs.), se achită la check-in.
📞 *Contact:* ${HOST_PHONE_PRIMARY} (Anca, principal) / ${HOST_PHONE_SECONDARY} (Vasi)
${v.isGroup ? "\n" + groupExtra.ro : ""}`);
    case "en":
      return r(`
📋 *Everything you need for arrival*

🚪 *Vehicle gate code (auto sliding):* ${GATE_CODE}
🚗 *Parking:* free in the courtyard, enter through the main gate.
📍 *Address:* ${ADDRESS}.
🕑 *Check-in:* from 14:00.
🔑 *Apartment access code* — we will give it to you on arrival (for security we never send it by message).
📶 *WiFi:* ${WIFI_SSID} / password: ${WIFI_PASSWORD}
🧾 *City tax:* ${CITY_TAX_PER_ADULT_PER_NIGHT} lei/adult/night (${v.cityTaxTotal} lei for your stay), paid at check-in.
📞 *Contact:* ${HOST_PHONE_PRIMARY} (Anca, primary) / ${HOST_PHONE_SECONDARY} (Vasi)
${v.isGroup ? "\n" + groupExtra.en : ""}`);
    case "fr":
      return r(`
📋 *Tout ce qu'il vous faut pour l'arrivée*

🚪 *Code portail (coulissant automatique) :* ${GATE_CODE}
🚗 *Parking :* gratuit dans la cour.
📍 *Adresse :* ${ADDRESS}.
🕑 *Arrivée :* à partir de 14h00.
🔑 *Code de l'appartement* — remis à l'arrivée (jamais par message, par sécurité).
📶 *WiFi :* ${WIFI_SSID} / ${WIFI_PASSWORD}
🧾 *Taxe de séjour :* ${CITY_TAX_PER_ADULT_PER_NIGHT} lei/adulte/nuit (${v.cityTaxTotal} lei), à l'arrivée.
📞 *Contact :* ${HOST_PHONE_PRIMARY} (Anca) / ${HOST_PHONE_SECONDARY} (Vasi)
${v.isGroup ? "\n" + groupExtra.fr : ""}`);
    case "de":
      return r(`
📋 *Alles für Ihre Ankunft*

🚪 *Toröffnungscode (automatisches Schiebetor):* ${GATE_CODE}
🚗 *Parken:* kostenlos im Innenhof.
📍 *Adresse:* ${ADDRESS}.
🕑 *Check-in:* ab 14:00 Uhr.
🔑 *Apartment-Zugangscode* — wird bei der Ankunft persönlich übergeben (aus Sicherheitsgründen nie per Nachricht).
📶 *WiFi:* ${WIFI_SSID} / ${WIFI_PASSWORD}
🧾 *Kurtaxe:* ${CITY_TAX_PER_ADULT_PER_NIGHT} lei/Erwachsener/Nacht (${v.cityTaxTotal} lei).
📞 *Kontakt:* ${HOST_PHONE_PRIMARY} (Anca) / ${HOST_PHONE_SECONDARY} (Vasi)
${v.isGroup ? "\n" + groupExtra.de : ""}`);
    case "it":
      return r(`
📋 *Tutto per il vostro arrivo*

🚪 *Codice cancello (scorrevole automatico):* ${GATE_CODE}
🚗 *Parcheggio:* gratuito nel cortile.
📍 *Indirizzo:* ${ADDRESS}.
🕑 *Check-in:* dalle 14:00.
🔑 *Codice dell'appartamento* — vi sarà consegnato all'arrivo (mai via messaggio, per sicurezza).
📶 *WiFi:* ${WIFI_SSID} / ${WIFI_PASSWORD}
🧾 *Tassa di soggiorno:* ${CITY_TAX_PER_ADULT_PER_NIGHT} lei/adulto/notte (${v.cityTaxTotal} lei).
📞 *Contatto:* ${HOST_PHONE_PRIMARY} (Anca) / ${HOST_PHONE_SECONDARY} (Vasi)
${v.isGroup ? "\n" + groupExtra.it : ""}`);
    case "es":
      return r(`
📋 *Todo para su llegada*

🚪 *Código del portón (corredera automática):* ${GATE_CODE}
🚗 *Aparcamiento:* gratuito en el patio.
📍 *Dirección:* ${ADDRESS}.
🕑 *Check-in:* a partir de las 14:00.
🔑 *Código del apartamento* — se entrega a la llegada (nunca por mensaje, por seguridad).
📶 *WiFi:* ${WIFI_SSID} / ${WIFI_PASSWORD}
🧾 *Tasa turística:* ${CITY_TAX_PER_ADULT_PER_NIGHT} lei/adulto/noche (${v.cityTaxTotal} lei).
📞 *Contacto:* ${HOST_PHONE_PRIMARY} (Anca) / ${HOST_PHONE_SECONDARY} (Vasi)
${v.isGroup ? "\n" + groupExtra.es : ""}`);
    case "hu":
      return r(`
📋 *Minden, amire az érkezéshez szüksége van*

🚪 *Autóskapu kódja (automata toló):* ${GATE_CODE}
🚗 *Parkolás:* ingyenes az udvarban.
📍 *Cím:* ${ADDRESS}.
🕑 *Bejelentkezés:* 14:00 után.
🔑 *Apartman belépőkód* — érkezéskor adjuk át (biztonsági okból soha nem üzenetben).
📶 *WiFi:* ${WIFI_SSID} / ${WIFI_PASSWORD}
🧾 *Idegenforgalmi adó:* ${CITY_TAX_PER_ADULT_PER_NIGHT} lej/felnőtt/éj (${v.cityTaxTotal} lej).
📞 *Kapcsolat:* ${HOST_PHONE_PRIMARY} (Anca) / ${HOST_PHONE_SECONDARY} (Vasi)
${v.isGroup ? "\n" + groupExtra.hu : ""}`);
  }
};

const renderers: Record<TemplateKey, Record<Language, Renderer>> = {
  // =========================================================================
  // A1 — Booking confirmation (immediate)
  // =========================================================================
  A1_confirmation: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

${v.isReturning ? "Ce bucurie să vă revedem!" : "Vă mulțumim pentru rezervarea la *Vila Vaias Aparts*."}
Confirmare pentru *${v.apartmentName}*${v.apartmentFloor ? ` (${v.apartmentFloor})` : ""}.

📅 *Sejurul dumneavoastră*
• Check-in: ${formatGuestDate(v.checkIn, l)} (după ora 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (până la ora 11:00)
• Nopți: ${v.nights}
• Adulți: ${v.adults}${v.children ? ` · Copii: ${v.children}` : ""}
${priceLine(v, l)}

Cu 24 de ore înainte de sosire vă vom trimite toate detaliile practice (cod poartă, WiFi, parcare, contact).

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

${v.isReturning ? "Wonderful to welcome you back!" : "Thank you for booking *Vila Vaias Aparts*."}
Confirmation for *${v.apartmentName}*${v.apartmentFloor ? ` (${v.apartmentFloor})` : ""}.

📅 *Your stay*
• Check-in: ${formatGuestDate(v.checkIn, l)} (from 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (until 11:00)
• Nights: ${v.nights}
• Adults: ${v.adults}${v.children ? ` · Children: ${v.children}` : ""}
${priceLine(v, l)}

24 hours before arrival we'll send everything you need (gate code, WiFi, parking, contact).

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! 🌿

Merci pour votre réservation à *Vila Vaias Aparts* — *${v.apartmentName}*.

📅 *Votre séjour*
• Arrivée : ${formatGuestDate(v.checkIn, l)} (à partir de 14h00)
• Départ : ${formatGuestDate(v.checkOut, l)} (avant 11h00)
• Nuits : ${v.nights}
${priceLine(v, l)}

24 heures avant l'arrivée nous vous enverrons toutes les informations pratiques.

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Vielen Dank für Ihre Buchung bei *Vila Vaias Aparts* — *${v.apartmentName}*.

📅 *Ihr Aufenthalt*
• Check-in: ${formatGuestDate(v.checkIn, l)} (ab 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (bis 11:00)
• Nächte: ${v.nights}
${priceLine(v, l)}

24 Stunden vor Anreise senden wir Ihnen alle praktischen Infos.

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Grazie per aver prenotato *Vila Vaias Aparts* — *${v.apartmentName}*.

📅 *Il vostro soggiorno*
• Check-in: ${formatGuestDate(v.checkIn, l)} (dalle 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (entro le 11:00)
• Notti: ${v.nights}
${priceLine(v, l)}

24 ore prima dell'arrivo vi invieremo tutte le informazioni pratiche.

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. 🌿

Gracias por reservar en *Vila Vaias Aparts* — *${v.apartmentName}*.

📅 *Su estancia*
• Check-in: ${formatGuestDate(v.checkIn, l)} (a partir de las 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (hasta las 11:00)
• Noches: ${v.nights}
${priceLine(v, l)}

24 horas antes de la llegada le enviaremos toda la información práctica.

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Köszönjük a foglalást a *Vila Vaias Aparts*-nál — *${v.apartmentName}*.

📅 *Az Ön tartózkodása*
• Bejelentkezés: ${formatGuestDate(v.checkIn, l)} (14:00 után)
• Kijelentkezés: ${formatGuestDate(v.checkOut, l)} (11:00-ig)
• Éjszakák: ${v.nights}
${priceLine(v, l)}

24 órával az érkezés előtt minden gyakorlati információt elküldünk.

${SIGNATURE}
`),
  },

  // =========================================================================
  // A2 — Pre-arrival info bundle (24h before, 10:00 local)
  // =========================================================================
  A2_pre_arrival: {
    ro: (v, l) =>
      v.isReturning
        ? r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Mâine vă așteptăm din nou la *Vila Vaias Aparts* — *${v.apartmentName}*.
Aceleași detalii ca data trecută: cod poartă *${GATE_CODE}*, parcare în curte, check-in după 14:00.
Codul de acces în apartament vi-l dăm la sosire.

Dacă aveți nevoie de ceva, suntem la ${HOST_PHONE_PRIMARY} (Anca) sau ${HOST_PHONE_SECONDARY} (Vasi).
Drum bun!

${SIGNATURE}
`)
        : r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Mâine vă așteptăm la *Vila Vaias Aparts* — *${v.apartmentName}*.

${practicalInfoBlock(v, l)}

Drum bun! Pe mâine!

${SIGNATURE}
`),
    en: (v, l) =>
      v.isReturning
        ? r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

We're looking forward to having you back tomorrow at *Vila Vaias Aparts* — *${v.apartmentName}*.
Same as last time: gate code *${GATE_CODE}*, courtyard parking, check-in from 14:00.
We'll hand you the apartment access code on arrival.

Anything you need, we're at ${HOST_PHONE_PRIMARY} (Anca) or ${HOST_PHONE_SECONDARY} (Vasi).
Safe travels!

${SIGNATURE}
`)
        : r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

We're looking forward to welcoming you tomorrow at *Vila Vaias Aparts* — *${v.apartmentName}*.

${practicalInfoBlock(v, l)}

Safe travels — see you tomorrow!

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! 🌿

Nous vous attendons demain à *Vila Vaias Aparts* — *${v.apartmentName}*.

${practicalInfoBlock(v, l)}

Bon voyage — à demain !

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Wir freuen uns auf Sie morgen bei *Vila Vaias Aparts* — *${v.apartmentName}*.

${practicalInfoBlock(v, l)}

Gute Reise — bis morgen!

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Vi aspettiamo domani a *Vila Vaias Aparts* — *${v.apartmentName}*.

${practicalInfoBlock(v, l)}

Buon viaggio — a domani!

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. 🌿

Le esperamos mañana en *Vila Vaias Aparts* — *${v.apartmentName}*.

${practicalInfoBlock(v, l)}

¡Buen viaje — hasta mañana!

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Holnap várjuk a *Vila Vaias Aparts*-ban — *${v.apartmentName}*.

${practicalInfoBlock(v, l)}

Jó utat — viszlát holnap!

${SIGNATURE}
`),
  },

  // =========================================================================
  // A3 — Welcome check (Day 1 evening, 20:00; SKIPPED if guest messaged us)
  // =========================================================================
  A3_welcome_check: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

V-ați instalat bine în *${v.apartmentName}*? Aveți nevoie de ceva?
Suntem la un mesaj distanță: ${HOST_PHONE_PRIMARY} (Anca) sau ${HOST_PHONE_SECONDARY} (Vasi).

Seară plăcută!

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Are you settled in OK at *${v.apartmentName}*? Anything you need?
We're a message away on ${HOST_PHONE_PRIMARY} (Anca) or ${HOST_PHONE_SECONDARY} (Vasi).

Have a lovely evening!

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! 🌿

Vous êtes bien installés à *${v.apartmentName}* ? Besoin de quelque chose ?
Nous sommes joignables : ${HOST_PHONE_PRIMARY} (Anca) / ${HOST_PHONE_SECONDARY} (Vasi).

Bonne soirée !

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Sind Sie gut in *${v.apartmentName}* angekommen? Brauchen Sie etwas?
Wir sind erreichbar: ${HOST_PHONE_PRIMARY} (Anca) / ${HOST_PHONE_SECONDARY} (Vasi).

Einen schönen Abend!

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Vi siete sistemati bene a *${v.apartmentName}*? Avete bisogno di qualcosa?
Siamo a un messaggio: ${HOST_PHONE_PRIMARY} (Anca) / ${HOST_PHONE_SECONDARY} (Vasi).

Buona serata!

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. 🌿

¿Se han instalado bien en *${v.apartmentName}*? ¿Necesitan algo?
Estamos a un mensaje: ${HOST_PHONE_PRIMARY} (Anca) / ${HOST_PHONE_SECONDARY} (Vasi).

¡Buena noche!

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Jól berendezkedtek a *${v.apartmentName}*-ban? Szükségük van valamire?
Egy üzenetnyire vagyunk: ${HOST_PHONE_PRIMARY} (Anca) / ${HOST_PHONE_SECONDARY} (Vasi).

Kellemes estét!

${SIGNATURE}
`),
  },

  // =========================================================================
  // A4 — Checkout reminder (evening before checkout, 20:00)
  // =========================================================================
  A4_checkout_reminder: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Vă reamintim cu drag: check-out mâine, *${formatGuestDate(v.checkOut, l)}*, până la ora *11:00*.

🔑 ${KEY_RETURN_INSTRUCTIONS.ro}

Vă mulțumim că ați ales *Vila Vaias Aparts*. Sperăm că v-a plăcut sejurul!
Drum bun spre casă.

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

A friendly reminder: check-out is tomorrow, *${formatGuestDate(v.checkOut, l)}*, by *11:00*.

🔑 ${KEY_RETURN_INSTRUCTIONS.en}

Thank you for choosing *Vila Vaias Aparts*. We hope you enjoyed your stay!
Safe trip home.

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! 🌿

Petit rappel : départ demain, *${formatGuestDate(v.checkOut, l)}*, avant *11h00*.

🔑 ${KEY_RETURN_INSTRUCTIONS.fr}

Merci d'avoir choisi *Vila Vaias Aparts*. Bon retour !

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Kurze Erinnerung: Check-out morgen, *${formatGuestDate(v.checkOut, l)}*, bis *11:00 Uhr*.

🔑 ${KEY_RETURN_INSTRUCTIONS.de}

Vielen Dank, dass Sie sich für *Vila Vaias Aparts* entschieden haben. Gute Heimreise!

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Un piccolo promemoria: check-out domani, *${formatGuestDate(v.checkOut, l)}*, entro le *11:00*.

🔑 ${KEY_RETURN_INSTRUCTIONS.it}

Grazie per aver scelto *Vila Vaias Aparts*. Buon viaggio di ritorno!

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. 🌿

Recordatorio: salida mañana, *${formatGuestDate(v.checkOut, l)}*, antes de las *11:00*.

🔑 ${KEY_RETURN_INSTRUCTIONS.es}

Gracias por elegir *Vila Vaias Aparts*. ¡Buen viaje de vuelta!

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Emlékeztető: kijelentkezés holnap, *${formatGuestDate(v.checkOut, l)}*, *11:00*-ig.

🔑 ${KEY_RETURN_INSTRUCTIONS.hu}

Köszönjük, hogy a *Vila Vaias Aparts*-t választotta. Jó utat haza!

${SIGNATURE}
`),
  },

  // =========================================================================
  // A5 — Review request (48h after checkout)
  // =========================================================================
  A5_review_request: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Vă mulțumim încă o dată că ați ales *Vila Vaias Aparts* — *${v.apartmentName}*.
Sperăm din suflet că v-a plăcut sejurul.

Dacă aveți două minute, o recenzie ne ajută enorm:

${v.reviewLinksBlock ?? ""}

📸 Trimiteți-ne și captură cu recenzia — toate platformele cu recenzie vă intră automat în tombola lunară pentru un sejur gratuit la Vila Vaias Aparts.

Vă așteptăm cu drag înapoi.

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Thank you once again for choosing *Vila Vaias Aparts* — *${v.apartmentName}*.
We hope you genuinely enjoyed your stay.

If you have two minutes, a review helps us enormously:

${v.reviewLinksBlock ?? ""}

📸 Send us a screenshot of your reviews too — every platform you review on enters you in our monthly raffle for a free stay at Vila Vaias Aparts.

We'd love to welcome you back.

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! 🌿

Merci encore d'avoir choisi *Vila Vaias Aparts* — *${v.apartmentName}*.

Si vous avez deux minutes, un avis nous aide énormément :

${v.reviewLinksBlock ?? ""}

📸 Envoyez-nous une capture de l'avis — chaque plateforme = participation à la tombola mensuelle (séjour offert).

À très bientôt !

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Nochmals vielen Dank für Ihren Aufenthalt bei *Vila Vaias Aparts* — *${v.apartmentName}*.

Wenn Sie zwei Minuten haben, hilft uns eine Bewertung sehr:

${v.reviewLinksBlock ?? ""}

📸 Schicken Sie uns gern einen Screenshot — jede Plattform = Teilnahme an der monatlichen Verlosung (kostenloser Aufenthalt).

Wir freuen uns auf Ihren nächsten Besuch.

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Grazie ancora per aver scelto *Vila Vaias Aparts* — *${v.apartmentName}*.

Se avete due minuti, una recensione ci aiuta moltissimo:

${v.reviewLinksBlock ?? ""}

📸 Inviateci uno screenshot — ogni piattaforma = partecipazione all'estrazione mensile (soggiorno gratuito).

A presto!

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. 🌿

Gracias de nuevo por elegir *Vila Vaias Aparts* — *${v.apartmentName}*.

Si tiene dos minutos, una reseña nos ayuda muchísimo:

${v.reviewLinksBlock ?? ""}

📸 Envíenos una captura — cada plataforma = participación en el sorteo mensual (estancia gratis).

¡Hasta pronto!

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Köszönjük újra, hogy a *Vila Vaias Aparts*-t választotta — *${v.apartmentName}*.

Ha van két perce, egy értékelés sokat segít:

${v.reviewLinksBlock ?? ""}

📸 Küldjön egy képernyőképet — minden platform = részvétel a havi sorsoláson (ingyenes tartózkodás).

Várjuk vissza!

${SIGNATURE}
`),
  },

  // =========================================================================
  // B1 — Same-day combined confirm + arrival (immediate, fuses A1 + A2)
  // =========================================================================
  B1_combined_confirm_arrival: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Confirmare rezervare *Vila Vaias Aparts* — *${v.apartmentName}*.
• Check-in astăzi/curând (după ora 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (până la 11:00)
• ${v.nights} nopți · ${v.adults} adulți${v.children ? ` · ${v.children} copii` : ""}
${priceLine(v, l)}

${practicalInfoBlock(v, l)}

Vă așteptăm cu drag!

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Booking confirmed at *Vila Vaias Aparts* — *${v.apartmentName}*.
• Check-in today/soon (from 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (by 11:00)
• ${v.nights} nights · ${v.adults} adults${v.children ? ` · ${v.children} children` : ""}
${priceLine(v, l)}

${practicalInfoBlock(v, l)}

See you soon!

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! 🌿

Réservation confirmée à *Vila Vaias Aparts* — *${v.apartmentName}*.
• Arrivée aujourd'hui (à partir de 14h00)
• Départ : ${formatGuestDate(v.checkOut, l)} (avant 11h00)
${priceLine(v, l)}

${practicalInfoBlock(v, l)}

À tout de suite !

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Buchung bestätigt — *Vila Vaias Aparts* — *${v.apartmentName}*.
• Check-in heute (ab 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (bis 11:00)
${priceLine(v, l)}

${practicalInfoBlock(v, l)}

Bis bald!

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Prenotazione confermata — *Vila Vaias Aparts* — *${v.apartmentName}*.
• Check-in oggi (dalle 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (entro le 11:00)
${priceLine(v, l)}

${practicalInfoBlock(v, l)}

A presto!

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. 🌿

Reserva confirmada — *Vila Vaias Aparts* — *${v.apartmentName}*.
• Check-in hoy (a partir de las 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (antes de las 11:00)
${priceLine(v, l)}

${practicalInfoBlock(v, l)}

¡Hasta pronto!

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Foglalás megerősítve — *Vila Vaias Aparts* — *${v.apartmentName}*.
• Bejelentkezés ma (14:00 után)
• Kijelentkezés: ${formatGuestDate(v.checkOut, l)} (11:00-ig)
${priceLine(v, l)}

${practicalInfoBlock(v, l)}

Hamarosan találkozunk!

${SIGNATURE}
`),
  },

  // =========================================================================
  // C1 — One-night combined confirm + arrival (immediate, fuses A1 + A2)
  // =========================================================================
  C1_combined_confirm_arrival: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Confirmare rezervare *Vila Vaias Aparts* — *${v.apartmentName}* pentru o noapte.
• Check-in: ${formatGuestDate(v.checkIn, l)} (după ora 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (până la ora 11:00)
${priceLine(v, l)}

${practicalInfoBlock(v, l)}

Sejur plăcut!

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Booking confirmed at *Vila Vaias Aparts* — *${v.apartmentName}* for one night.
• Check-in: ${formatGuestDate(v.checkIn, l)} (from 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (until 11:00)
${priceLine(v, l)}

${practicalInfoBlock(v, l)}

Enjoy your stay!

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! 🌿

Réservation confirmée à *Vila Vaias Aparts* — *${v.apartmentName}* pour une nuit.
• Arrivée : ${formatGuestDate(v.checkIn, l)} (dès 14h00)
• Départ : ${formatGuestDate(v.checkOut, l)} (avant 11h00)
${priceLine(v, l)}

${practicalInfoBlock(v, l)}

Bon séjour !

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Buchung bestätigt — *Vila Vaias Aparts* — *${v.apartmentName}* für eine Nacht.
• Check-in: ${formatGuestDate(v.checkIn, l)} (ab 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (bis 11:00)
${priceLine(v, l)}

${practicalInfoBlock(v, l)}

Angenehmen Aufenthalt!

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Prenotazione confermata — *Vila Vaias Aparts* — *${v.apartmentName}* per una notte.
• Check-in: ${formatGuestDate(v.checkIn, l)} (dalle 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (entro le 11:00)
${priceLine(v, l)}

${practicalInfoBlock(v, l)}

Buon soggiorno!

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. 🌿

Reserva confirmada — *Vila Vaias Aparts* — *${v.apartmentName}* por una noche.
• Check-in: ${formatGuestDate(v.checkIn, l)} (a partir de las 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (hasta las 11:00)
${priceLine(v, l)}

${practicalInfoBlock(v, l)}

¡Disfrute de su estancia!

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Foglalás megerősítve — *Vila Vaias Aparts* — *${v.apartmentName}* egy éjszakára.
• Bejelentkezés: ${formatGuestDate(v.checkIn, l)} (14:00 után)
• Kijelentkezés: ${formatGuestDate(v.checkOut, l)} (11:00-ig)
${priceLine(v, l)}

${practicalInfoBlock(v, l)}

Kellemes tartózkodást!

${SIGNATURE}
`),
  },
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Render a single-language version of the template.  The main agent stacks
 * multiple languages with {@link renderTemplate}.
 */
export function renderTemplateForLang(
  key: TemplateKey,
  vars: TemplateVars,
  lang: Language,
): string {
  return renderers[key][lang](vars, lang);
}

/**
 * Render the full multilingual body for a template.  Languages are stacked
 * with a thin separator so guests can read whichever section they prefer.
 */
export function renderTemplate(
  key: TemplateKey,
  vars: TemplateVars,
  languages: Language[],
): string {
  const sections = languages.map((l) => renderTemplateForLang(key, vars, l));
  return sections.join("\n\n──────────\n\n");
}

/** Sanity check used by the API route — make sure the door code never leaks. */
export function containsBannedSecrets(body: string): boolean {
  const bannedPatterns = [
    /\bkeybox\s*code\b/i,
    /\bcutia?\s*cu\s*chei\s*[:=]/i,
    /\bcod\s*ușă\b/i,
    /\bdoor\s*code\b/i,
  ];
  return bannedPatterns.some((p) => p.test(body));
}
