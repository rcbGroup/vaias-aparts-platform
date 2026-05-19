/**
 * VAIA OS — Guest journey message templates.
 *
 * Each template is keyed by scenario (A/B/C/D/E/F) + step (A1..F1) and is
 * rendered through {@link renderTemplate} which stacks Romanian + English
 * (+ native language when applicable) in a single WhatsApp/email body.
 *
 * SECURITY:
 *   • The vehicle gate code 0623# IS allowed in messages.
 *   • The door / key-box code is NEVER in this file or any template — it is
 *     delivered verbally by the host once arrival + ID are confirmed.
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
export const HOST_PHONE_PRIMARY = "+40 738 345 330";
export const HOST_PHONE_SECONDARY = "+40 752 388 388";
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
  expectedArrivalLabel?: string;
  matterportUrl?: string;
  source?: string; // "direct" | "booking" | "airbnb" | "travelminit" | "h2b"
  previousVisits?: number;
  reviewLinksBlock?: string; // pre-rendered, language-aware
  groupApartments?: string[]; // for Scenario E
  ownerName?: string; // optional human signing the message
};

// ---------------------------------------------------------------------------
// Template keys
// ---------------------------------------------------------------------------

export type TemplateKey =
  // Scenario A — standard reservation (9 messages)
  | "A1_booking_confirmed"
  | "A2_week_before"
  | "A3_three_days"
  | "A4_day_before"
  | "A5_arrival_morning"
  | "A6_post_checkin"
  | "A7_mid_stay"
  | "A8_checkout_morning"
  | "A9_post_stay_review"
  // Scenario B — same-day / last-minute (4 messages)
  | "B1_lastminute_confirmed"
  | "B2_arrival_imminent"
  | "B3_post_checkin"
  | "B4_post_stay_review"
  // Scenario C — one-night stay (4 messages)
  | "C1_booking_confirmed"
  | "C2_arrival_morning"
  | "C3_post_checkin"
  | "C4_post_stay_review"
  // Scenario D — returning guest
  | "D1_returning_welcome_back"
  // Scenario E — group / full villa
  | "E1_group_coordinator"
  // Scenario F — international (multilingual welcome)
  | "F1_intl_pre_arrival";

// ---------------------------------------------------------------------------
// Per-language renderers
// ---------------------------------------------------------------------------

type Renderer = (vars: TemplateVars, lang: Language) => string;

const r = (s: string) => s.trim();

const renderers: Record<TemplateKey, Record<Language, Renderer>> = {
  // =========================================================================
  // A1 — Booking confirmation
  // =========================================================================
  A1_booking_confirmed: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Vă confirmăm rezervarea la *Vila Vaias Aparts* — ${v.apartmentName}.

📅 *Detalii*
• Check-in: ${formatGuestDate(v.checkIn, l)} (după ora 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (până la ora 11:00)
• Nopți: ${v.nights}
• Adulți: ${v.adults}${v.children ? ` · Copii: ${v.children}` : ""}

📍 Adresa: ${ADDRESS}.
Cu câteva zile înainte de sosire vă vom trimite toate detaliile pentru un check-in cât mai liniștit.

Dacă aveți întrebări, ne găsiți oricând la ${HOST_PHONE_PRIMARY} (WhatsApp) sau ${HOST_EMAIL}.

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

We're confirming your booking at *Vila Vaias Aparts* — ${v.apartmentName}.

📅 *Your stay*
• Check-in: ${formatGuestDate(v.checkIn, l)} (from 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (until 11:00)
• Nights: ${v.nights}
• Adults: ${v.adults}${v.children ? ` · Children: ${v.children}` : ""}

📍 Address: ${ADDRESS}.
A few days before arrival we'll send you everything you need for a smooth check-in.

You can reach us anytime at ${HOST_PHONE_PRIMARY} (WhatsApp) or ${HOST_EMAIL}.

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! 🌿

Nous confirmons votre réservation à *Vila Vaias Aparts* — ${v.apartmentName}.

📅 *Votre séjour*
• Arrivée : ${formatGuestDate(v.checkIn, l)} (à partir de 14h00)
• Départ : ${formatGuestDate(v.checkOut, l)} (avant 11h00)
• Nuits : ${v.nights}
• Adultes : ${v.adults}${v.children ? ` · Enfants : ${v.children}` : ""}

📍 Adresse : ${ADDRESS}.
Quelques jours avant l'arrivée, nous vous enverrons toutes les informations nécessaires.

À tout moment : ${HOST_PHONE_PRIMARY} (WhatsApp) ou ${HOST_EMAIL}.

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Wir bestätigen Ihre Buchung bei *Vila Vaias Aparts* — ${v.apartmentName}.

📅 *Ihr Aufenthalt*
• Check-in: ${formatGuestDate(v.checkIn, l)} (ab 14:00 Uhr)
• Check-out: ${formatGuestDate(v.checkOut, l)} (bis 11:00 Uhr)
• Nächte: ${v.nights}
• Erwachsene: ${v.adults}${v.children ? ` · Kinder: ${v.children}` : ""}

📍 Adresse: ${ADDRESS}.
Wenige Tage vor Ihrer Ankunft senden wir Ihnen alle Details für einen reibungslosen Check-in.

Sie erreichen uns jederzeit unter ${HOST_PHONE_PRIMARY} (WhatsApp) oder ${HOST_EMAIL}.

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Confermiamo la sua prenotazione presso *Vila Vaias Aparts* — ${v.apartmentName}.

📅 *Il suo soggiorno*
• Check-in: ${formatGuestDate(v.checkIn, l)} (dalle 14:00)
• Check-out: ${formatGuestDate(v.checkOut, l)} (entro le 11:00)
• Notti: ${v.nights}
• Adulti: ${v.adults}${v.children ? ` · Bambini: ${v.children}` : ""}

📍 Indirizzo: ${ADDRESS}.
Pochi giorni prima dell'arrivo le invieremo tutte le informazioni utili.

In qualunque momento: ${HOST_PHONE_PRIMARY} (WhatsApp) o ${HOST_EMAIL}.

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. 🌿

Le confirmamos su reserva en *Vila Vaias Aparts* — ${v.apartmentName}.

📅 *Su estancia*
• Llegada: ${formatGuestDate(v.checkIn, l)} (desde las 14:00)
• Salida: ${formatGuestDate(v.checkOut, l)} (antes de las 11:00)
• Noches: ${v.nights}
• Adultos: ${v.adults}${v.children ? ` · Niños: ${v.children}` : ""}

📍 Dirección: ${ADDRESS}.
Unos días antes de la llegada le enviaremos toda la información para un check-in tranquilo.

Estamos disponibles en ${HOST_PHONE_PRIMARY} (WhatsApp) o ${HOST_EMAIL}.

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Megerősítjük foglalását a *Vila Vaias Aparts* — ${v.apartmentName} apartmanban.

📅 *Tartózkodás*
• Érkezés: ${formatGuestDate(v.checkIn, l)} (14:00-tól)
• Távozás: ${formatGuestDate(v.checkOut, l)} (11:00-ig)
• Éjszakák: ${v.nights}
• Felnőttek: ${v.adults}${v.children ? ` · Gyermekek: ${v.children}` : ""}

📍 Cím: ${ADDRESS}.
Néhány nappal az érkezés előtt elküldjük az összes részletet a zökkenőmentes érkezéshez.

Bármikor elérhetők vagyunk: ${HOST_PHONE_PRIMARY} (WhatsApp) vagy ${HOST_EMAIL}.

${SIGNATURE}
`),
  },

  // =========================================================================
  // A2 — 7 days before
  // =========================================================================
  A2_week_before: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Mai sunt 7 zile până la sosirea dumneavoastră în ${v.apartmentName} (${formatGuestDate(v.checkIn, l)}). 🗓️

• Doriți să rezervăm o experiență locală — mănăstiri, Cetatea Neamț, masaj, jacuzzi sau BBQ pe terasă?
• Aveți alergii, restricții alimentare sau cerințe speciale de care să știm?
• Călătoriți cu un cățel? Acceptăm animale de companie fără cost suplimentar.

Vă răspundem cu plăcere oricând la ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

There are 7 days left until your arrival at ${v.apartmentName} (${formatGuestDate(v.checkIn, l)}). 🗓️

• Would you like us to arrange a local experience — monasteries, Neamț Citadel, massage, jacuzzi, or terrace BBQ?
• Any allergies, dietary needs or special requests we should know about?
• Travelling with a pet? They're welcome at no extra cost.

We're always happy to help — ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} !

Plus que 7 jours avant votre arrivée à ${v.apartmentName} (${formatGuestDate(v.checkIn, l)}). 🗓️

• Souhaitez-vous une expérience locale — monastères, Citadelle de Neamț, massage, jacuzzi ou BBQ ?
• Allergies, restrictions alimentaires ou demandes spéciales ?
• Vous voyagez avec un animal ? Bienvenue, sans frais supplémentaires.

À votre service : ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Noch 7 Tage bis zu Ihrer Ankunft in ${v.apartmentName} (${formatGuestDate(v.checkIn, l)}). 🗓️

• Möchten Sie ein lokales Erlebnis — Klöster, Festung Neamț, Massage, Whirlpool oder BBQ?
• Allergien, Ernährungswünsche oder besondere Bitten?
• Reisen Sie mit Haustier? Wir freuen uns, ohne Aufpreis.

Wir sind für Sie da: ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Mancano 7 giorni al suo arrivo a ${v.apartmentName} (${formatGuestDate(v.checkIn, l)}). 🗓️

• Desidera che organizziamo un'esperienza locale — monasteri, Cittadella di Neamț, massaggio, jacuzzi o BBQ?
• Allergie, esigenze alimentari o richieste speciali?
• Viaggia con un animale? È il benvenuto, senza costi aggiuntivi.

A sua disposizione: ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}.

Faltan 7 días para su llegada a ${v.apartmentName} (${formatGuestDate(v.checkIn, l)}). 🗓️

• ¿Le organizamos una experiencia local — monasterios, Ciudadela de Neamț, masaje, jacuzzi o BBQ?
• ¿Alergias, restricciones alimentarias o solicitudes especiales?
• ¿Viaja con mascota? Bienvenida, sin coste adicional.

A su disposición: ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

7 nap van hátra az érkezéséig (${formatGuestDate(v.checkIn, l)}, ${v.apartmentName}). 🗓️

• Szeretne helyi élményt — kolostorok, Neamț Vára, masszázs, pezsgőfürdő, BBQ?
• Allergia, étrend, különleges kérés?
• Háziállattal érkezik? Szívesen látjuk, díjmentesen.

Rendelkezésére állunk: ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
  },

  // =========================================================================
  // A3 — 3 days before
  // =========================================================================
  A3_three_days: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! ✨

Mai sunt 3 zile până vă întâmpinăm la ${v.apartmentName}. Iată informațiile esențiale:

📍 *Adresa & parcare*
${ADDRESS} — poarta verde de lemn.
Parcare gratuită în curte. Codul porții auto: *${GATE_CODE}* (tastați și apăsați tasta verde).

🔑 *Self check-in*
Codul de la cutia cu chei vă va fi comunicat verbal sau prin mesaj imediat ce confirmați sosirea (după 14:00). Vă rugăm anunțați-ne cu 30–60 minute înainte.

📶 *WiFi*
Rețea: ${WIFI_SSID} · Parolă: ${WIFI_PASSWORD}

💶 *Taxa de stațiune*
${CITY_TAX_PER_ADULT_PER_NIGHT} lei / adult / noapte · achitabilă la sosire (numerar sau card). Total estimat: ${v.cityTaxTotal} lei.

🍽️ *Mic dejun & dineu*
Putem comanda mâncare proaspătă pregătită de bucătăriile noastre partenere — anunțați-ne dacă doriți.

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! ✨

3 days until we welcome you to ${v.apartmentName}. Here are the essentials:

📍 *Address & parking*
${ADDRESS} — green wooden gate.
Free parking inside the courtyard. Vehicle gate code: *${GATE_CODE}* (enter the digits, press the green key).

🔑 *Self check-in*
The key-box code is shared verbally or by message once you confirm your arrival window (from 14:00). Please let us know 30–60 minutes before arrival.

📶 *WiFi*
Network: ${WIFI_SSID} · Password: ${WIFI_PASSWORD}

💶 *City tax*
${CITY_TAX_PER_ADULT_PER_NIGHT} lei / adult / night · paid on arrival (cash or card). Estimated total: ${v.cityTaxTotal} lei.

🍽️ *Food & drinks*
We can arrange fresh meals from our partner kitchens — just let us know.

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! ✨

J-3 avant votre arrivée à ${v.apartmentName}. Voici l'essentiel :

📍 *Adresse & stationnement*
${ADDRESS} — portail vert en bois. Parking gratuit dans la cour. Code du portail : *${GATE_CODE}*.

🔑 *Self check-in*
Le code de la boîte à clés sera communiqué oralement ou par message dès que vous confirmez l'heure d'arrivée (à partir de 14h00). Merci de prévenir 30 à 60 minutes avant.

📶 *WiFi*
Réseau : ${WIFI_SSID} · Mot de passe : ${WIFI_PASSWORD}

💶 *Taxe de séjour*
${CITY_TAX_PER_ADULT_PER_NIGHT} lei / adulte / nuit · à payer à l'arrivée. Total estimé : ${v.cityTaxTotal} lei.

🍽️ *Repas*
Nous pouvons commander des plats frais auprès de nos cuisines partenaires — n'hésitez pas.

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! ✨

Noch 3 Tage bis zu Ihrer Ankunft in ${v.apartmentName}. Das Wichtigste:

📍 *Adresse & Parken*
${ADDRESS} — grünes Holztor. Kostenfreies Parken im Innenhof. Tor-Code: *${GATE_CODE}*.

🔑 *Self-Check-in*
Den Code des Schlüsselkastens senden wir mündlich oder per Nachricht, sobald Sie die Ankunftszeit bestätigen (ab 14:00 Uhr). Bitte 30–60 Minuten vor Ankunft Bescheid geben.

📶 *WLAN*
Netzwerk: ${WIFI_SSID} · Passwort: ${WIFI_PASSWORD}

💶 *Kurtaxe*
${CITY_TAX_PER_ADULT_PER_NIGHT} Lei / Erwachsener / Nacht · Zahlung bei Ankunft. Geschätzte Summe: ${v.cityTaxTotal} Lei.

🍽️ *Essen*
Wir organisieren frische Speisen aus unseren Partner­küchen — sagen Sie uns Bescheid.

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! ✨

3 giorni al suo arrivo a ${v.apartmentName}. Le informazioni essenziali:

📍 *Indirizzo & parcheggio*
${ADDRESS} — cancello verde in legno. Parcheggio gratuito nel cortile. Codice cancello: *${GATE_CODE}*.

🔑 *Self check-in*
Il codice della cassetta delle chiavi le sarà comunicato verbalmente o via messaggio non appena confermerà l'orario di arrivo (dalle 14:00). Ci avvisi 30–60 minuti prima.

📶 *WiFi*
Rete: ${WIFI_SSID} · Password: ${WIFI_PASSWORD}

💶 *Tassa di soggiorno*
${CITY_TAX_PER_ADULT_PER_NIGHT} lei / adulto / notte · pagamento all'arrivo. Totale stimato: ${v.cityTaxTotal} lei.

🍽️ *Pasti*
Possiamo organizzare pasti freschi dalle cucine partner — ce lo faccia sapere.

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. ✨

Faltan 3 días para su llegada a ${v.apartmentName}. Información esencial:

📍 *Dirección & aparcamiento*
${ADDRESS} — portón verde de madera. Aparcamiento gratuito en el patio. Código del portón: *${GATE_CODE}*.

🔑 *Self check-in*
Le enviaremos el código del buzón de llaves verbalmente o por mensaje en cuanto confirme la hora de llegada (desde las 14:00). Avísenos 30–60 minutos antes.

📶 *WiFi*
Red: ${WIFI_SSID} · Contraseña: ${WIFI_PASSWORD}

💶 *Tasa turística*
${CITY_TAX_PER_ADULT_PER_NIGHT} lei / adulto / noche · pago a la llegada. Total estimado: ${v.cityTaxTotal} lei.

🍽️ *Comidas*
Podemos organizar platos frescos de nuestras cocinas asociadas — háganoslo saber.

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! ✨

3 nap az érkezéséig (${v.apartmentName}). A lényeg:

📍 *Cím & parkolás*
${ADDRESS} — zöld fakapu. Ingyenes parkolás az udvarban. Kapukód: *${GATE_CODE}*.

🔑 *Self check-in*
A kulcsdoboz kódját szóban vagy üzenetben küldjük, miután megerősíti az érkezési időt (14:00-tól). Kérjük, érkezés előtt 30–60 perccel jelezze.

📶 *WiFi*
Hálózat: ${WIFI_SSID} · Jelszó: ${WIFI_PASSWORD}

💶 *Idegenforgalmi adó*
${CITY_TAX_PER_ADULT_PER_NIGHT} lej / felnőtt / éjszaka · érkezéskor fizetendő. Becsült összeg: ${v.cityTaxTotal} lej.

🍽️ *Étkezés*
Friss ételeket tudunk szervezni partner­konyháinkból — szóljon, ha érdekli.

${SIGNATURE}
`),
  },

  // =========================================================================
  // A4 — Day before
  // =========================================================================
  A4_day_before: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🚪

Mâine vă întâmpinăm la ${v.apartmentName}.

• Check-in: după ora 14:00. Vă rugăm să ne anunțați estimativ ora sosirii.
• Adresa: ${ADDRESS}. Cod poartă auto: *${GATE_CODE}*.
• La sosire, vă vom trimite codul cutiei cu chei prin mesaj sau verbal.

Drum bun și ne vedem mâine!

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🚪

Tomorrow we welcome you to ${v.apartmentName}.

• Check-in: from 14:00. Could you share an estimated arrival time?
• Address: ${ADDRESS}. Vehicle gate code: *${GATE_CODE}*.
• On arrival we'll share the key-box code by message or verbally.

Safe travels — see you tomorrow!

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! 🚪

Demain, nous vous accueillons à ${v.apartmentName}.

• Arrivée : à partir de 14h00. Pouvez-vous nous indiquer une heure approximative ?
• Adresse : ${ADDRESS}. Code du portail : *${GATE_CODE}*.
• À l'arrivée, nous vous communiquerons le code de la boîte à clés.

Bon voyage — à demain !

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🚪

Morgen begrüßen wir Sie in ${v.apartmentName}.

• Check-in: ab 14:00 Uhr. Können Sie eine ungefähre Ankunftszeit nennen?
• Adresse: ${ADDRESS}. Tor-Code: *${GATE_CODE}*.
• Bei Ankunft senden wir den Schlüsselkasten-Code per Nachricht oder mündlich.

Gute Reise — bis morgen!

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🚪

Domani la accogliamo a ${v.apartmentName}.

• Check-in: dalle 14:00. Può indicarci un orario approssimativo?
• Indirizzo: ${ADDRESS}. Codice cancello: *${GATE_CODE}*.
• All'arrivo le comunicheremo il codice della cassetta delle chiavi.

Buon viaggio — a domani!

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. 🚪

Mañana le damos la bienvenida a ${v.apartmentName}.

• Check-in: desde las 14:00. ¿Puede indicarnos la hora estimada?
• Dirección: ${ADDRESS}. Código del portón: *${GATE_CODE}*.
• A la llegada le enviaremos el código del buzón de llaves.

¡Buen viaje — hasta mañana!

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🚪

Holnap fogadjuk Önt itt: ${v.apartmentName}.

• Érkezés: 14:00-tól. Meg tudja becsülni az érkezési időt?
• Cím: ${ADDRESS}. Kapukód: *${GATE_CODE}*.
• Érkezéskor üzenetben vagy szóban közöljük a kulcsdoboz kódját.

Jó utat — holnap találkozunk!

${SIGNATURE}
`),
  },

  // =========================================================================
  // A5 — Arrival morning
  // =========================================================================
  A5_arrival_morning: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌞

Ne bucurăm că vă vom întâmpina astăzi la ${v.apartmentName}.
• Apartamentul este pregătit începând cu ora 14:00.
• Adresa: ${ADDRESS}. Cod poartă auto: *${GATE_CODE}*.
• Anunțați-ne 30–60 minute înainte de sosire pentru codul cutiei cu chei.

WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.
Drum bun!

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌞

We can't wait to welcome you today at ${v.apartmentName}.
• Apartment ready from 14:00.
• Address: ${ADDRESS}. Vehicle gate code: *${GATE_CODE}*.
• Please ping us 30–60 minutes before arrival for the key-box code.

WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.
Safe travels!

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! 🌞

Heureux de vous accueillir aujourd'hui à ${v.apartmentName}.
• Appartement prêt à partir de 14h00.
• Adresse : ${ADDRESS}. Code portail : *${GATE_CODE}*.
• Prévenez-nous 30 à 60 minutes avant pour le code de la boîte à clés.

WiFi : ${WIFI_SSID} / ${WIFI_PASSWORD}.
Bon voyage !

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌞

Wir freuen uns auf Ihre Ankunft heute in ${v.apartmentName}.
• Apartment ab 14:00 Uhr bezugsfertig.
• Adresse: ${ADDRESS}. Tor-Code: *${GATE_CODE}*.
• 30–60 Minuten vor Ankunft melden für den Schlüsselkasten-Code.

WLAN: ${WIFI_SSID} / ${WIFI_PASSWORD}.
Gute Reise!

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌞

Felici di accoglierla oggi a ${v.apartmentName}.
• Appartamento pronto dalle 14:00.
• Indirizzo: ${ADDRESS}. Codice cancello: *${GATE_CODE}*.
• Ci avvisi 30–60 minuti prima dell'arrivo per il codice della cassetta delle chiavi.

WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.
Buon viaggio!

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. 🌞

Felices de recibirle hoy en ${v.apartmentName}.
• Apartamento listo desde las 14:00.
• Dirección: ${ADDRESS}. Código del portón: *${GATE_CODE}*.
• Avísenos 30–60 minutos antes para el código del buzón de llaves.

WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.
¡Buen viaje!

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌞

Várjuk Önt ma a ${v.apartmentName} apartmanban.
• Az apartman 14:00-tól készen áll.
• Cím: ${ADDRESS}. Kapukód: *${GATE_CODE}*.
• Érkezés előtt 30–60 perccel jelezze a kulcsdoboz kódjához.

WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.
Jó utat!

${SIGNATURE}
`),
  },

  // =========================================================================
  // A6 — Post check-in (within 2-4h)
  // =========================================================================
  A6_post_checkin: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

V-ați acomodat? 🌿
• Apa caldă vine din boilere proprii — vă rugăm nu modificați termostatul (este reglat optim).
• Smart TV, baie privată, terasă. Lenjerie premium și prosoape proaspete.
• WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.

Dacă aveți nevoie de ceva, scrieți-ne oricând — suntem aici 24/7 la ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

All settled in? 🌿
• Hot water is supplied by dedicated boilers — please don't change the thermostat (already optimised).
• Smart TV, private bathroom, terrace. Premium bedding and fresh towels.
• WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.

If you need anything, write us anytime — we're here 24/7 on ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} !

Bien installés ? 🌿
• L'eau chaude vient de chaudières dédiées — merci de ne pas toucher au thermostat.
• Smart TV, salle de bain privée, terrasse. Linge premium et serviettes fraîches.
• WiFi : ${WIFI_SSID} / ${WIFI_PASSWORD}.

À tout moment au ${HOST_PHONE_PRIMARY} — nous sommes disponibles 24h/24.

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Gut angekommen? 🌿
• Das Warmwasser kommt aus eigenen Boilern — bitte den Thermostat nicht verändern.
• Smart TV, eigenes Bad, Terrasse. Premium-Bettwäsche und frische Handtücher.
• WLAN: ${WIFI_SSID} / ${WIFI_PASSWORD}.

Bei Fragen rund um die Uhr unter ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Tutto a posto? 🌿
• L'acqua calda viene da boiler dedicati — non modifichi il termostato.
• Smart TV, bagno privato, terrazza. Biancheria premium e asciugamani freschi.
• WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.

Siamo a disposizione 24/7 al ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}.

¿Todo bien? 🌿
• El agua caliente proviene de calderas propias — por favor, no modifique el termostato.
• Smart TV, baño privado, terraza. Ropa de cama premium y toallas frescas.
• WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.

Disponibles 24/7 en ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Minden rendben? 🌿
• A meleg vizet saját bojlerek adják — kérjük, ne állítsa át a termosztátot.
• Smart TV, saját fürdőszoba, terasz. Prémium ágynemű és friss törölközők.
• WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.

Bármikor elérhetők vagyunk: ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
  },

  // =========================================================================
  // A7 — Mid-stay
  // =========================================================================
  A7_mid_stay: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Sperăm că vă bucurați de ședere. Câteva idei dacă vă doriți să explorați:
• Mănăstirile Neamț, Agapia, Văratec, Sihăstria — la 20–40 minute.
• Cetatea Neamț — punct istoric, vedere panoramică.
• Masaj relaxant, jacuzzi sau BBQ pe terasă — putem organiza azi sau mâine.
• Mâncare proaspătă din bucătăriile partenere — vă recomandăm cu plăcere.

Doriți ceva? Un mesaj e suficient.

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

We hope you're enjoying your stay. A few ideas if you want to explore:
• Neamț, Agapia, Văratec, Sihăstria monasteries — 20–40 minutes away.
• Neamț Citadel — historic landmark with panoramic views.
• Relaxing massage, jacuzzi or terrace BBQ — we can organise today or tomorrow.
• Fresh meals from our partner kitchens — happy to recommend.

Want anything? Just message us.

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! 🌿

Quelques idées si vous souhaitez explorer :
• Monastères de Neamț, Agapia, Văratec, Sihăstria — 20–40 minutes.
• Citadelle de Neamț — site historique avec vue panoramique.
• Massage, jacuzzi ou BBQ — organisable aujourd'hui ou demain.
• Repas frais des cuisines partenaires — sur demande.

À votre disposition !

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Ein paar Ideen für Ihren Aufenthalt:
• Klöster Neamț, Agapia, Văratec, Sihăstria — 20–40 Minuten entfernt.
• Festung Neamț — historisches Wahrzeichen mit Panoramablick.
• Massage, Whirlpool oder BBQ — heute oder morgen möglich.
• Frische Speisen aus den Partner­küchen — gerne.

Sagen Sie einfach Bescheid.

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Qualche idea per il suo soggiorno:
• Monasteri di Neamț, Agapia, Văratec, Sihăstria — 20–40 minuti.
• Cittadella di Neamț — sito storico con vista panoramica.
• Massaggio, jacuzzi o BBQ — organizzabile oggi o domani.
• Piatti freschi dalle cucine partner — su richiesta.

Ci faccia sapere!

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. 🌿

Algunas ideas para su estancia:
• Monasterios de Neamț, Agapia, Văratec, Sihăstria — a 20–40 minutos.
• Ciudadela de Neamț — sitio histórico con vistas panorámicas.
• Masaje, jacuzzi o BBQ — hoy o mañana.
• Comidas frescas de las cocinas asociadas — bajo demanda.

¡Cuéntenos!

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Néhány ötlet a tartózkodásra:
• Neamț, Agapia, Văratec, Sihăstria kolostorok — 20–40 perc.
• Neamț vára — történelmi nevezetesség panoráma kilátással.
• Masszázs, jakuzzi vagy BBQ — ma vagy holnap.
• Friss ételek partner­konyháinkból — szívesen ajánljuk.

Jelezzen, ha kér valamit!

${SIGNATURE}
`),
  },

  // =========================================================================
  // A8 — Check-out morning
  // =========================================================================
  A8_checkout_morning: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Astăzi e ziua plecării — vă mulțumim că ne-ați ales. 🌿

• Check-out: până la ora 11:00. Dacă aveți nevoie de câteva ore în plus, scrieți-ne.
• ${KEY_RETURN_INSTRUCTIONS.ro}
• Închideți ferestrele și ușa principală. Nu trebuie să spălați vase sau să faceți curățenie — echipa noastră se ocupă.
• Drum bun! Sperăm să vă revedem curând.

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Today is departure day — thank you for choosing us. 🌿

• Check-out: by 11:00. Need a couple of extra hours? Just ask.
• ${KEY_RETURN_INSTRUCTIONS.en}
• Close windows and the main door. No need to wash dishes or tidy — our team handles it.
• Safe travels! We hope to see you again soon.

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} !

Aujourd'hui c'est le départ — merci pour votre confiance. 🌿

• Départ : avant 11h00. Besoin de quelques heures supplémentaires ? Écrivez-nous.
• ${KEY_RETURN_INSTRUCTIONS.fr}
• Fermez les fenêtres et la porte. Inutile de faire le ménage — notre équipe s'en charge.
• Bon voyage ! À très bientôt.

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Heute ist Abreisetag — vielen Dank, dass Sie uns gewählt haben. 🌿

• Check-out: bis 11:00 Uhr. Brauchen Sie ein paar Stunden mehr? Sagen Sie Bescheid.
• ${KEY_RETURN_INSTRUCTIONS.de}
• Fenster und Haustür schließen. Geschirr und Reinigung übernimmt unser Team.
• Gute Reise — auf Wiedersehen!

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Oggi è il giorno della partenza — grazie per averci scelto. 🌿

• Check-out: entro le 11:00. Le servono un paio d'ore in più? Ce lo dica.
• ${KEY_RETURN_INSTRUCTIONS.it}
• Chiuda finestre e porta principale. Niente piatti o pulizie — al resto ci pensa il nostro team.
• Buon viaggio — a presto!

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}.

Hoy es el día de salida — gracias por elegirnos. 🌿

• Check-out: antes de las 11:00. ¿Necesita unas horas más? Avísenos.
• ${KEY_RETURN_INSTRUCTIONS.es}
• Cierre ventanas y puerta principal. No es necesario lavar platos ni limpiar — nuestro equipo se encarga.
• ¡Buen viaje — hasta pronto!

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Ma a távozás napja — köszönjük, hogy minket választott. 🌿

• Távozás: 11:00-ig. Ha pár órával később indul, szóljon.
• ${KEY_RETURN_INSTRUCTIONS.hu}
• Csukja be az ablakokat és a bejárati ajtót. Mosogatás és takarítás nem szükséges.
• Jó utat — viszontlátásra!

${SIGNATURE}
`),
  },

  // =========================================================================
  // A9 — Post-stay review request
  // =========================================================================
  A9_post_stay_review: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Vă mulțumim că ne-ați vizitat la Vila Vaias Aparts. Sperăm că ${v.apartmentName} a fost pe placul dumneavoastră.

O recenzie sinceră ne ajută enorm să creștem și să ajungem la și mai mulți oaspeți frumoși ca dumneavoastră:

${v.reviewLinksBlock ?? ""}

🎁 *Tombola lunară:* dacă lăsați recenzii pe 2 sau mai multe platforme, intrați automat în extragerea pentru un sejur gratuit la noi.

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Thank you for staying with us at Vila Vaias Aparts. We hope ${v.apartmentName} felt like home.

A short, honest review helps us hugely — and helps other guests find us:

${v.reviewLinksBlock ?? ""}

🎁 *Monthly raffle:* leave reviews on 2 or more platforms and you're entered into our draw for a free stay.

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! 🌿

Merci pour votre séjour à la Vila Vaias Aparts. Nous espérons que ${v.apartmentName} vous a plu.

Un avis sincère nous aide énormément :

${v.reviewLinksBlock ?? ""}

🎁 *Tombola mensuelle :* laissez un avis sur 2 plateformes ou plus pour participer au tirage d'un séjour gratuit.

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Danke für Ihren Aufenthalt bei Vila Vaias Aparts. Wir hoffen, ${v.apartmentName} hat Ihnen gefallen.

Eine ehrliche Bewertung hilft uns sehr:

${v.reviewLinksBlock ?? ""}

🎁 *Monatliche Verlosung:* Bewertungen auf 2 oder mehr Plattformen nehmen automatisch an unserer Verlosung für einen kostenlosen Aufenthalt teil.

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Grazie per il suo soggiorno a Vila Vaias Aparts. Speriamo che ${v.apartmentName} le sia piaciuto.

Una recensione sincera ci aiuta moltissimo:

${v.reviewLinksBlock ?? ""}

🎁 *Estrazione mensile:* recensioni su 2 o più piattaforme partecipano automaticamente al sorteggio di un soggiorno gratuito.

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. 🌿

Gracias por su estancia en Vila Vaias Aparts. Esperamos que ${v.apartmentName} le haya gustado.

Una reseña sincera nos ayuda muchísimo:

${v.reviewLinksBlock ?? ""}

🎁 *Sorteo mensual:* las reseñas en 2 o más plataformas entran automáticamente al sorteo de una estancia gratis.

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌿

Köszönjük, hogy a Vila Vaias Aparts vendége volt. Reméljük, élvezte a ${v.apartmentName} apartmant.

Egy őszinte értékelés sokat segít:

${v.reviewLinksBlock ?? ""}

🎁 *Havi sorsolás:* 2 vagy több platformon hagyott értékeléssel automatikusan részt vesz egy ingyenes tartózkodás sorsolásán.

${SIGNATURE}
`),
  },

  // =========================================================================
  // B1 — Last-minute confirmation
  // =========================================================================
  B1_lastminute_confirmed: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! ⚡

Confirmare rezervare last-minute la Vila Vaias Aparts — ${v.apartmentName}.

📅 Check-in azi, după ora 14:00 · Check-out ${formatGuestDate(v.checkOut, l)} (până la 11:00).
📍 ${ADDRESS} · Cod poartă auto: *${GATE_CODE}*
📶 WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}
💶 Taxă de stațiune: ${v.cityTaxTotal} lei (${CITY_TAX_PER_ADULT_PER_NIGHT} lei/adult/noapte) la sosire.

Codul cutiei cu chei vi-l trimitem direct când sunteți la 30–60 minute distanță. Anunțați-ne!

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! ⚡

Last-minute booking confirmed at Vila Vaias Aparts — ${v.apartmentName}.

📅 Check-in today from 14:00 · Check-out ${formatGuestDate(v.checkOut, l)} (by 11:00).
📍 ${ADDRESS} · Vehicle gate code: *${GATE_CODE}*
📶 WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}
💶 City tax: ${v.cityTaxTotal} lei (${CITY_TAX_PER_ADULT_PER_NIGHT} lei/adult/night) on arrival.

We'll send the key-box code once you're 30–60 minutes away. Let us know!

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! ⚡

Réservation de dernière minute confirmée — ${v.apartmentName}.

📅 Arrivée aujourd'hui dès 14h00 · Départ ${formatGuestDate(v.checkOut, l)} (avant 11h00).
📍 ${ADDRESS} · Code portail : *${GATE_CODE}*
📶 WiFi : ${WIFI_SSID} / ${WIFI_PASSWORD}
💶 Taxe de séjour : ${v.cityTaxTotal} lei à l'arrivée.

Code de la boîte à clés envoyé à 30–60 minutes de l'arrivée.

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! ⚡

Last-Minute-Buchung bestätigt — ${v.apartmentName}.

📅 Check-in heute ab 14:00 Uhr · Check-out ${formatGuestDate(v.checkOut, l)} (bis 11:00 Uhr).
📍 ${ADDRESS} · Tor-Code: *${GATE_CODE}*
📶 WLAN: ${WIFI_SSID} / ${WIFI_PASSWORD}
💶 Kurtaxe: ${v.cityTaxTotal} Lei bei Ankunft.

Den Schlüsselkasten-Code senden wir 30–60 Minuten vor Ankunft.

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! ⚡

Prenotazione last-minute confermata — ${v.apartmentName}.

📅 Check-in oggi dalle 14:00 · Check-out ${formatGuestDate(v.checkOut, l)} (entro le 11:00).
📍 ${ADDRESS} · Codice cancello: *${GATE_CODE}*
📶 WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}
💶 Tassa di soggiorno: ${v.cityTaxTotal} lei all'arrivo.

Codice cassetta chiavi inviato a 30–60 minuti dall'arrivo.

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. ⚡

Reserva de última hora confirmada — ${v.apartmentName}.

📅 Llegada hoy desde las 14:00 · Salida ${formatGuestDate(v.checkOut, l)} (antes de las 11:00).
📍 ${ADDRESS} · Código del portón: *${GATE_CODE}*
📶 WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}
💶 Tasa turística: ${v.cityTaxTotal} lei a la llegada.

Le enviaremos el código del buzón cuando esté a 30–60 minutos.

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! ⚡

Last-minute foglalás megerősítve — ${v.apartmentName}.

📅 Érkezés ma 14:00-tól · Távozás ${formatGuestDate(v.checkOut, l)} (11:00-ig).
📍 ${ADDRESS} · Kapukód: *${GATE_CODE}*
📶 WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}
💶 Idegenforgalmi adó: ${v.cityTaxTotal} lej érkezéskor.

A kulcsdoboz kódját 30–60 perccel az érkezés előtt küldjük.

${SIGNATURE}
`),
  },

  // =========================================================================
  // B2 — Arrival imminent
  // =========================================================================
  B2_arrival_imminent: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Suntem pregătiți pentru sosirea dumneavoastră la ${v.apartmentName}.
• Cod poartă auto: *${GATE_CODE}*
• Confirmați-ne acum, vă rugăm, ora estimată — vă trimitem codul cutiei cu chei.

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

We're ready for your arrival at ${v.apartmentName}.
• Vehicle gate code: *${GATE_CODE}*
• Please confirm your ETA — we'll send the key-box code right after.

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} !

Tout est prêt pour votre arrivée à ${v.apartmentName}.
• Code portail : *${GATE_CODE}*
• Confirmez-nous votre heure d'arrivée — nous enverrons le code de la boîte à clés.

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Wir sind bereit für Ihre Ankunft in ${v.apartmentName}.
• Tor-Code: *${GATE_CODE}*
• Bitte bestätigen Sie die Ankunftszeit — danach senden wir den Schlüsselkasten-Code.

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Siamo pronti ad accoglierla a ${v.apartmentName}.
• Codice cancello: *${GATE_CODE}*
• Confermi l'orario di arrivo — invieremo il codice della cassetta delle chiavi.

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}.

Listos para recibirle en ${v.apartmentName}.
• Código del portón: *${GATE_CODE}*
• Confirme la hora estimada y le enviaremos el código del buzón.

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Készen állunk: ${v.apartmentName}.
• Kapukód: *${GATE_CODE}*
• Erősítse meg az érkezési időt — utána küldjük a kulcsdoboz kódját.

${SIGNATURE}
`),
  },

  // =========================================================================
  // B3 — Post check-in (same-day flow)
  // =========================================================================
  B3_post_checkin: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

V-ați acomodat la ${v.apartmentName}? 🌿
WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.
Boilerul are termostat reglat — vă rugăm nu îl modificați.

Suntem aici 24/7 la ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

All settled in at ${v.apartmentName}? 🌿
WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.
The boiler thermostat is pre-set — please don't change it.

Here 24/7 on ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} !

Bien installés à ${v.apartmentName} ? 🌿
WiFi : ${WIFI_SSID} / ${WIFI_PASSWORD}.
Le thermostat du chauffe-eau est préréglé — merci de ne pas y toucher.

Disponibles 24h/24 au ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Gut angekommen in ${v.apartmentName}? 🌿
WLAN: ${WIFI_SSID} / ${WIFI_PASSWORD}.
Der Boiler-Thermostat ist voreingestellt — bitte nicht verändern.

24/7 erreichbar unter ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Tutto a posto a ${v.apartmentName}? 🌿
WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.
Il termostato del boiler è impostato — non lo modifichi.

24/7 al ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}.

¿Todo bien en ${v.apartmentName}? 🌿
WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.
El termostato del calentador está ajustado — por favor, no lo modifique.

Disponibles 24/7 en ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Minden rendben a ${v.apartmentName} apartmanban? 🌿
WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.
A bojler termosztátja be van állítva — kérjük, ne állítsa át.

24/7 elérhetők: ${HOST_PHONE_PRIMARY}.

${SIGNATURE}
`),
  },

  // =========================================================================
  // B4 — Post-stay review (same as A9, used by B/C flows)
  // =========================================================================
  B4_post_stay_review: {
    ro: (v, l) => renderers.A9_post_stay_review.ro(v, l),
    en: (v, l) => renderers.A9_post_stay_review.en(v, l),
    fr: (v, l) => renderers.A9_post_stay_review.fr(v, l),
    de: (v, l) => renderers.A9_post_stay_review.de(v, l),
    it: (v, l) => renderers.A9_post_stay_review.it(v, l),
    es: (v, l) => renderers.A9_post_stay_review.es(v, l),
    hu: (v, l) => renderers.A9_post_stay_review.hu(v, l),
  },

  // =========================================================================
  // C1 — One-night confirmation
  // =========================================================================
  C1_booking_confirmed: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌙

Confirmare pentru o noapte la Vila Vaias Aparts — ${v.apartmentName}.

📅 Sosire: ${formatGuestDate(v.checkIn, l)} (după 14:00).
📅 Plecare: ${formatGuestDate(v.checkOut, l)} (până la 11:00).
📍 ${ADDRESS} · Cod poartă: *${GATE_CODE}*.

Dimineață vă vom trimite ultimele detalii pentru un check-in cât mai liniștit.

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌙

One-night stay confirmed at Vila Vaias Aparts — ${v.apartmentName}.

📅 Arrival: ${formatGuestDate(v.checkIn, l)} (from 14:00).
📅 Departure: ${formatGuestDate(v.checkOut, l)} (by 11:00).
📍 ${ADDRESS} · Gate code: *${GATE_CODE}*.

We'll send the final details in the morning.

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! 🌙

Confirmation pour une nuit — ${v.apartmentName}.
📅 Arrivée : ${formatGuestDate(v.checkIn, l)} · Départ : ${formatGuestDate(v.checkOut, l)}.
📍 ${ADDRESS} · Code portail : *${GATE_CODE}*.

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌙

Eine Übernachtung bestätigt — ${v.apartmentName}.
📅 Ankunft: ${formatGuestDate(v.checkIn, l)} · Abreise: ${formatGuestDate(v.checkOut, l)}.
📍 ${ADDRESS} · Tor-Code: *${GATE_CODE}*.

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌙

Una notte confermata — ${v.apartmentName}.
📅 Arrivo: ${formatGuestDate(v.checkIn, l)} · Partenza: ${formatGuestDate(v.checkOut, l)}.
📍 ${ADDRESS} · Codice cancello: *${GATE_CODE}*.

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. 🌙

Una noche confirmada — ${v.apartmentName}.
📅 Llegada: ${formatGuestDate(v.checkIn, l)} · Salida: ${formatGuestDate(v.checkOut, l)}.
📍 ${ADDRESS} · Código del portón: *${GATE_CODE}*.

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🌙

Egy éjszaka megerősítve — ${v.apartmentName}.
📅 Érkezés: ${formatGuestDate(v.checkIn, l)} · Távozás: ${formatGuestDate(v.checkOut, l)}.
📍 ${ADDRESS} · Kapukód: *${GATE_CODE}*.

${SIGNATURE}
`),
  },

  // =========================================================================
  // C2 — One-night arrival morning (same template as A5, dedicated key)
  // =========================================================================
  C2_arrival_morning: {
    ro: (v, l) => renderers.A5_arrival_morning.ro(v, l),
    en: (v, l) => renderers.A5_arrival_morning.en(v, l),
    fr: (v, l) => renderers.A5_arrival_morning.fr(v, l),
    de: (v, l) => renderers.A5_arrival_morning.de(v, l),
    it: (v, l) => renderers.A5_arrival_morning.it(v, l),
    es: (v, l) => renderers.A5_arrival_morning.es(v, l),
    hu: (v, l) => renderers.A5_arrival_morning.hu(v, l),
  },

  // =========================================================================
  // C3 — One-night post check-in
  // =========================================================================
  C3_post_checkin: {
    ro: (v, l) => renderers.A6_post_checkin.ro(v, l),
    en: (v, l) => renderers.A6_post_checkin.en(v, l),
    fr: (v, l) => renderers.A6_post_checkin.fr(v, l),
    de: (v, l) => renderers.A6_post_checkin.de(v, l),
    it: (v, l) => renderers.A6_post_checkin.it(v, l),
    es: (v, l) => renderers.A6_post_checkin.es(v, l),
    hu: (v, l) => renderers.A6_post_checkin.hu(v, l),
  },

  // =========================================================================
  // C4 — One-night review (same template as A9)
  // =========================================================================
  C4_post_stay_review: {
    ro: (v, l) => renderers.A9_post_stay_review.ro(v, l),
    en: (v, l) => renderers.A9_post_stay_review.en(v, l),
    fr: (v, l) => renderers.A9_post_stay_review.fr(v, l),
    de: (v, l) => renderers.A9_post_stay_review.de(v, l),
    it: (v, l) => renderers.A9_post_stay_review.it(v, l),
    es: (v, l) => renderers.A9_post_stay_review.es(v, l),
    hu: (v, l) => renderers.A9_post_stay_review.hu(v, l),
  },

  // =========================================================================
  // D1 — Returning guest
  // =========================================================================
  D1_returning_welcome_back: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 💚

Ce bucurie să vă revedem la Vila Vaias Aparts — a ${v.previousVisits ?? 2}-a ședere alături de noi.

V-am rezervat ${v.apartmentName} pentru ${formatGuestDate(v.checkIn, l)} — ${formatGuestDate(v.checkOut, l)}.
Detaliile sosirii sunt aceleași (cod poartă *${GATE_CODE}*, WiFi ${WIFI_SSID} / ${WIFI_PASSWORD}), iar pentru fidelitate vă oferim atenția obișnuită — vă vom contacta zilele acestea.

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 💚

Wonderful to have you back at Vila Vaias Aparts — your ${v.previousVisits ?? 2}${ordinalSuffix(v.previousVisits ?? 2)} stay with us.

We've reserved ${v.apartmentName} for ${formatGuestDate(v.checkIn, l)} — ${formatGuestDate(v.checkOut, l)}.
The basics are unchanged (gate *${GATE_CODE}*, WiFi ${WIFI_SSID} / ${WIFI_PASSWORD}), and we'll be in touch with a small returning-guest gesture.

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! 💚

Quel plaisir de vous revoir — votre ${v.previousVisits ?? 2}e séjour à la Vila Vaias Aparts.
${v.apartmentName} vous attend du ${formatGuestDate(v.checkIn, l)} au ${formatGuestDate(v.checkOut, l)}.
Code portail *${GATE_CODE}* · WiFi ${WIFI_SSID} / ${WIFI_PASSWORD}.

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 💚

Schön, Sie wiederzusehen — Ihr ${v.previousVisits ?? 2}. Aufenthalt bei Vila Vaias Aparts.
${v.apartmentName} vom ${formatGuestDate(v.checkIn, l)} bis ${formatGuestDate(v.checkOut, l)}.
Tor-Code *${GATE_CODE}* · WLAN ${WIFI_SSID} / ${WIFI_PASSWORD}.

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 💚

Che gioia rivederla — il suo ${v.previousVisits ?? 2}° soggiorno alla Vila Vaias Aparts.
${v.apartmentName} dal ${formatGuestDate(v.checkIn, l)} al ${formatGuestDate(v.checkOut, l)}.
Codice cancello *${GATE_CODE}* · WiFi ${WIFI_SSID} / ${WIFI_PASSWORD}.

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. 💚

Qué alegría volver a verle — su ${v.previousVisits ?? 2}.ª estancia en Vila Vaias Aparts.
${v.apartmentName} del ${formatGuestDate(v.checkIn, l)} al ${formatGuestDate(v.checkOut, l)}.
Código del portón *${GATE_CODE}* · WiFi ${WIFI_SSID} / ${WIFI_PASSWORD}.

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 💚

De jó újra látni — ez a ${v.previousVisits ?? 2}. tartózkodása nálunk.
${v.apartmentName}: ${formatGuestDate(v.checkIn, l)} — ${formatGuestDate(v.checkOut, l)}.
Kapukód *${GATE_CODE}* · WiFi ${WIFI_SSID} / ${WIFI_PASSWORD}.

${SIGNATURE}
`),
  },

  // =========================================================================
  // E1 — Group / full villa
  // =========================================================================
  E1_group_coordinator: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🏡

Vă mulțumim că ați ales Vila Vaias Aparts pentru întregul grup.
Apartamente rezervate: ${(v.groupApartments ?? []).join(", ") || v.apartmentName}.

📅 ${formatGuestDate(v.checkIn, l)} — ${formatGuestDate(v.checkOut, l)} · ${v.nights} nopți.
📍 ${ADDRESS} · Cod poartă auto: *${GATE_CODE}*.
📶 WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.
💶 Taxă de stațiune: ${CITY_TAX_PER_ADULT_PER_NIGHT} lei / adult / noapte, total estimat ${v.cityTaxTotal} lei.

Pentru grupuri putem coordona check-in scalat, mâncare proaspătă pentru toți și activități comune (BBQ, jacuzzi, vizite la mănăstiri). Confirmați-ne ora aproximativă pentru fiecare echipaj.

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🏡

Thank you for choosing Vila Vaias Aparts for the whole group.
Reserved apartments: ${(v.groupApartments ?? []).join(", ") || v.apartmentName}.

📅 ${formatGuestDate(v.checkIn, l)} — ${formatGuestDate(v.checkOut, l)} · ${v.nights} nights.
📍 ${ADDRESS} · Vehicle gate code: *${GATE_CODE}*.
📶 WiFi: ${WIFI_SSID} / ${WIFI_PASSWORD}.
💶 City tax: ${CITY_TAX_PER_ADULT_PER_NIGHT} lei / adult / night, estimated total ${v.cityTaxTotal} lei.

For groups we can stagger check-in, organise fresh meals for everyone and run shared activities (BBQ, jacuzzi, monastery visits). Please share approximate arrival times per car/family.

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} ! 🏡

Merci d'avoir choisi la Vila Vaias Aparts pour tout le groupe.
Appartements réservés : ${(v.groupApartments ?? []).join(", ") || v.apartmentName}.
📅 ${formatGuestDate(v.checkIn, l)} — ${formatGuestDate(v.checkOut, l)} · ${v.nights} nuits.
📍 ${ADDRESS} · Code portail : *${GATE_CODE}*.

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🏡

Danke, dass Sie Vila Vaias Aparts für die gesamte Gruppe gewählt haben.
Reservierte Apartments: ${(v.groupApartments ?? []).join(", ") || v.apartmentName}.
📅 ${formatGuestDate(v.checkIn, l)} — ${formatGuestDate(v.checkOut, l)} · ${v.nights} Nächte.
📍 ${ADDRESS} · Tor-Code: *${GATE_CODE}*.

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🏡

Grazie per aver scelto Vila Vaias Aparts per tutto il gruppo.
Appartamenti riservati: ${(v.groupApartments ?? []).join(", ") || v.apartmentName}.
📅 ${formatGuestDate(v.checkIn, l)} — ${formatGuestDate(v.checkOut, l)} · ${v.nights} notti.
📍 ${ADDRESS} · Codice cancello: *${GATE_CODE}*.

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}. 🏡

Gracias por elegir Vila Vaias Aparts para todo el grupo.
Apartamentos reservados: ${(v.groupApartments ?? []).join(", ") || v.apartmentName}.
📅 ${formatGuestDate(v.checkIn, l)} — ${formatGuestDate(v.checkOut, l)} · ${v.nights} noches.
📍 ${ADDRESS} · Código del portón: *${GATE_CODE}*.

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}! 🏡

Köszönjük, hogy a teljes csoport számára a Vila Vaias Aparts-t választotta.
Lefoglalt apartmanok: ${(v.groupApartments ?? []).join(", ") || v.apartmentName}.
📅 ${formatGuestDate(v.checkIn, l)} — ${formatGuestDate(v.checkOut, l)} · ${v.nights} éjszaka.
📍 ${ADDRESS} · Kapukód: *${GATE_CODE}*.

${SIGNATURE}
`),
  },

  // =========================================================================
  // F1 — International multilingual pre-arrival
  // =========================================================================
  F1_intl_pre_arrival: {
    ro: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

Vă întâmpinăm cu drag la Vila Vaias Aparts. Mai jos găsiți esențialele pentru sosire — în mai multe limbi.
${KEY_RETURN_INSTRUCTIONS.ro}

${SIGNATURE}
`),
    en: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!

A warm welcome to Vila Vaias Aparts. Below are the essentials for arrival.
${KEY_RETURN_INSTRUCTIONS.en}

${SIGNATURE}
`),
    fr: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName} !
${KEY_RETURN_INSTRUCTIONS.fr}

${SIGNATURE}
`),
    de: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!
${KEY_RETURN_INSTRUCTIONS.de}

${SIGNATURE}
`),
    it: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!
${KEY_RETURN_INSTRUCTIONS.it}

${SIGNATURE}
`),
    es: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}.
${KEY_RETURN_INSTRUCTIONS.es}

${SIGNATURE}
`),
    hu: (v, l) => r(`
${timeGreeting(l)}, ${v.guestName}!
${KEY_RETURN_INSTRUCTIONS.hu}

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
  // Examples of the (private) door-code patterns we never allow.
  const bannedPatterns = [
    /\bkeybox\s*code\b/i,
    /\bcutia?\s*cu\s*chei\s*[:=]/i,
    /\bcod\s*ușă\b/i,
    /\bdoor\s*code\b/i,
  ];
  return bannedPatterns.some((p) => p.test(body));
}

function ordinalSuffix(n: number): string {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}

export const TEMPLATE_KEYS: TemplateKey[] = [
  "A1_booking_confirmed",
  "A2_week_before",
  "A3_three_days",
  "A4_day_before",
  "A5_arrival_morning",
  "A6_post_checkin",
  "A7_mid_stay",
  "A8_checkout_morning",
  "A9_post_stay_review",
  "B1_lastminute_confirmed",
  "B2_arrival_imminent",
  "B3_post_checkin",
  "B4_post_stay_review",
  "C1_booking_confirmed",
  "C2_arrival_morning",
  "C3_post_checkin",
  "C4_post_stay_review",
  "D1_returning_welcome_back",
  "E1_group_coordinator",
  "F1_intl_pre_arrival",
];
