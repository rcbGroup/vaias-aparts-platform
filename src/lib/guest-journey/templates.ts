/**
 * VAIA OS — Guest Journey Templates.
 *
 * 7 stages, each in Romanian + English, structured for WhatsApp + email.
 * The Agent layer composes these with booking + apartment data.
 *
 * Stages:
 *   1. PRE_ARRIVAL_7D — 7 days before check-in
 *   2. PRE_ARRIVAL_48H — 48 hours before check-in
 *   3. CHECK_IN_DAY — morning of arrival
 *   4. IN_STAY_DAY2 — pulse check on day 2
 *   5. PRE_CHECKOUT_24H — 24 hours before checkout
 *   6. POST_STAY_REVIEW — day after checkout
 *   7. BIRTHDAY_NAMEDAY — celebration trigger
 */

import { type Apartment } from "../../../lib/apartments";

export type JourneyStage =
  | "pre_arrival_7d"
  | "pre_arrival_48h"
  | "check_in_day"
  | "in_stay_day2"
  | "pre_checkout_24h"
  | "post_stay_review"
  | "birthday_nameday";

export type JourneyLanguage = "ro" | "en";

export type JourneyContext = {
  guestName: string;
  apartmentName?: string;
  apartmentSlug?: string;
  checkInDate?: string;
  checkOutDate?: string;
  nights?: number;
  bookingSource?: string; // direct | booking | airbnb | etc.
  language?: JourneyLanguage;
  occasion?: "birthday" | "nameday";
};

/* ============================ TEMPLATES ============================ */

function preArrival7d_RO(ctx: JourneyContext): string {
  return `Bună, ${ctx.guestName}! 👋

Suntem Echipa Vaias Aparts. Vă scriem ca să vă confirmăm că vă așteptăm cu drag la ${ctx.apartmentName ?? "apartamentul rezervat"} pe ${ctx.checkInDate}.

Câteva detalii utile pentru pregătire:

🚗 *Cum ajungeți*
Strada Sfântul Lazăr nr. 1, Târgu Neamț — 2 minute de Cetatea Neamțului. Parcare gratuită în curte.

🏠 *Check-in*
De la ora 14:00. Vă vom trimite codul de poartă (0623#) și instrucțiunile de self check-in cu 48h înainte.

💡 *Vă putem ajuta cu*
• Coș de bun venit cu produse locale (80 lei)
• Rezervare la Han Rustic (la 200 m, recomandare 5⭐)
• Tur ghidat mănăstiri (Agapia, Văratec, Neamț)
• Transfer aeroport Iași

Aveți întrebări? Răspundeți direct la acest mesaj sau pe WhatsApp 0743 456 789.

Cu drag,
Echipa Vaias Aparts`;
}

function preArrival7d_EN(ctx: JourneyContext): string {
  return `Hi ${ctx.guestName}! 👋

This is the Vaias Aparts team. We're writing to confirm that we look forward to welcoming you at ${ctx.apartmentName ?? "your booked apartment"} on ${ctx.checkInDate}.

A few useful details to prepare:

🚗 *How to find us*
Strada Sfântul Lazăr nr. 1, Târgu Neamț — 2 minutes from Neamț Citadel. Free parking in the courtyard.

🏠 *Check-in*
From 14:00. We'll send the gate code (0623#) and self check-in instructions 48 hours before.

💡 *We can help you with*
• Welcome basket of local products (80 RON)
• Han Rustic reservation (200 m away, 5-star recommendation)
• Guided monastery tour (Agapia, Văratec, Neamț)
• Iași airport transfer

Questions? Reply to this message or WhatsApp +40 743 456 789.

Warmly,
Echipa Vaias Aparts`;
}

function preArrival48h_RO(ctx: JourneyContext): string {
  return `Bună, ${ctx.guestName}! 👋

Mai sunt 2 zile până vă așteptăm la Vaias Aparts!

📍 *Adresa exactă*
Strada Sfântul Lazăr nr. 1, Târgu Neamț
Pin GPS: https://maps.app.goo.gl/vaiasaparts

🔑 *Cod poartă curte*: 0623#
🛏 *Apartamentul dvs.*: ${ctx.apartmentName ?? "(confirmare separată)"}

📲 *La sosire*:
1. Apelați-ne pe WhatsApp (0743 456 789) cu 30 min înainte de sosire
2. Folosiți codul 0623# pentru poarta curții
3. Vă întâmpinăm la apartament — vă oferim cheia direct
4. Plata taxei de oraș (3 lei / adult / noapte) — cash sau card la check-in

Check-in: după 14:00 (early check-in disponibil la cerere, +50 lei).

Aveți orele de sosire? Răspundeți-ne ca să fim pregătiți.

Cu drag,
Echipa Vaias Aparts`;
}

function preArrival48h_EN(ctx: JourneyContext): string {
  return `Hi ${ctx.guestName}! 👋

Only 2 days until we welcome you at Vaias Aparts!

📍 *Exact address*
Strada Sfântul Lazăr nr. 1, Târgu Neamț
GPS pin: https://maps.app.goo.gl/vaiasaparts

🔑 *Courtyard gate code*: 0623#
🛏 *Your apartment*: ${ctx.apartmentName ?? "(separate confirmation)"}

📲 *On arrival*:
1. WhatsApp us (+40 743 456 789) 30 minutes before arrival
2. Use code 0623# for the courtyard gate
3. We'll meet you at the apartment — we give you the key in person
4. City tax (3 RON / adult / night) paid at check-in — cash or card

Check-in: after 14:00 (early check-in available on request, +50 RON).

Got your arrival time? Reply so we can be ready.

Warmly,
Echipa Vaias Aparts`;
}

function checkInDay_RO(ctx: JourneyContext): string {
  return `Bună dimineața, ${ctx.guestName}! ☀️

Astăzi e ziua! Vă așteptăm cu drag la Vaias Aparts.

📍 Strada Sfântul Lazăr nr. 1, Târgu Neamț
🔑 Cod poartă: 0623#
🕐 Check-in: după ora 14:00

📲 Apelați-ne pe WhatsApp 0743 456 789 cu 30 min înainte de sosire — venim la apartament să vă dăm cheia și să vă arătăm tot.

Drum bun și ne vedem curând!

Cu drag,
Echipa Vaias Aparts`;
}

function checkInDay_EN(ctx: JourneyContext): string {
  return `Good morning, ${ctx.guestName}! ☀️

Today's the day! We're looking forward to welcoming you at Vaias Aparts.

📍 Strada Sfântul Lazăr nr. 1, Târgu Neamț
🔑 Gate code: 0623#
🕐 Check-in: after 14:00

📲 WhatsApp us (+40 743 456 789) 30 minutes before arrival — we'll meet you at the apartment with the key and a quick walkthrough.

Safe travels — see you soon!

Warmly,
Echipa Vaias Aparts`;
}

function inStayDay2_RO(ctx: JourneyContext): string {
  return `Bună, ${ctx.guestName}! 👋

Sper că vă bucurați de timpul petrecut la Vaias Aparts. Cum a fost prima zi?

Câteva sugestii pentru azi:

🏛 *Cetatea Neamțului* — la 2 minute de vilă, deschis 9:00-18:00 (15 lei adult)
🛕 *Mănăstirea Neamț* — 15 minute cu mașina, slujbă serală la 17:00
🍽 *Han Rustic* — la 200 m, le-am spus că veniți, vă așteaptă

💡 *Putem face pentru voi azi*
• Rezervare masa la Han Rustic
• Ghid de pelerinaj (4 ore, 350 lei/grup)
• După-amiază la lac (Refugiul Vaias, 200 lei/grup)

Aveți tot ce vă trebuie? Lenjerie, prosoape, internet, cafea — toate funcționează cum trebuie?

Răspundeți-ne dacă aveți orice nelămurire.

Cu drag,
Echipa Vaias Aparts`;
}

function inStayDay2_EN(ctx: JourneyContext): string {
  return `Hi ${ctx.guestName}! 👋

Hope you're enjoying your time at Vaias Aparts. How was your first day?

Some ideas for today:

🏛 *Neamț Citadel* — 2 min from villa, open 9:00–18:00 (15 RON adult)
🛕 *Neamț Monastery* — 15 min by car, evening service at 17:00
🍽 *Han Rustic* — 200 m away, they're expecting you

💡 *Things we can arrange today*
• Han Rustic table reservation
• Pilgrimage guide (4 hours, 350 RON / group)
• Afternoon at the lake (Refugiul Vaias, 200 RON / group)

Everything okay? Linens, towels, internet, coffee — all working as expected?

Reply if you need anything.

Warmly,
Echipa Vaias Aparts`;
}

function preCheckout24h_RO(ctx: JourneyContext): string {
  return `Bună, ${ctx.guestName}! 👋

Mâine este ultima zi cu noi la Vaias Aparts. Câteva detalii:

🕚 *Check-out standard*: până la 11:00
⏰ *Late check-out* (până la 12:00): disponibil la rezervare directă, gratuit
🌅 *Mai târziu de 12:00*: +50 lei (cu confirmare prealabilă)

🔑 *La plecare*:
• Lăsați cheia pe masă din living
• Închideți ușa apartamentului (se închide singură)
• Plecați liniștiți — venim noi să facem curățenie

💎 *Înainte de plecare*:
• Verificați să nu uitați nimic (mai ales pe noptieră / în baie / la priza încărcătorului)
• Dacă aveți o impresie de împărtășit, ne-ar bucura un mesaj scurt

Vă mulțumim că ne-ați ales și sperăm să ne revedem!

Cu drag,
Echipa Vaias Aparts`;
}

function preCheckout24h_EN(ctx: JourneyContext): string {
  return `Hi ${ctx.guestName}! 👋

Tomorrow is your last day with us at Vaias Aparts. A few details:

🕚 *Standard check-out*: until 11:00
⏰ *Late check-out* (until 12:00): free with direct bookings
🌅 *Later than 12:00*: +50 RON (with prior confirmation)

🔑 *On departure*:
• Leave the key on the living-room table
• Close the apartment door (it locks itself)
• Leave at peace — we'll come for cleaning

💎 *Before you leave*:
• Check you haven't forgotten anything (especially nightstand / bathroom / charger socket)
• If you have feedback, a short message would mean a lot

Thank you for choosing us — hope to see you again!

Warmly,
Echipa Vaias Aparts`;
}

/**
 * Post-stay review request — platform-aware:
 *  • direct → Google Business + private NPS
 *  • booking → Booking review only
 *  • airbnb → Airbnb review only
 */
function postStayReview_RO(ctx: JourneyContext): string {
  const src = (ctx.bookingSource ?? "direct").toLowerCase();
  let cta = "";
  if (src === "direct" || src === "website" || src === "whatsapp") {
    cta = `📝 *O recenzie ar însemna mult pentru noi*

🌐 Google: https://g.page/vaias-aparts/review
📩 Sau scrieți-ne direct — preferăm sinceritatea oricărui review public`;
  } else if (src === "booking") {
    cta = `📝 *O recenzie pe Booking ne-ar ajuta enorm*

Veți primi automat o cerere de recenzie de la Booking în următoarele 14 zile. Răspundeți acolo, vă rugăm.`;
  } else if (src === "airbnb") {
    cta = `📝 *O recenzie pe Airbnb ar conta enorm pentru noi*

Aveți 14 zile să lăsați recenzia pe Airbnb. Noi v-am dat deja una bună! 😊`;
  } else {
    cta = `📝 *O recenzie ne-ar ajuta enorm*

Răspundeți la acest mesaj — orice impresie ne ajută să creștem.`;
  }

  return `Bună, ${ctx.guestName}! 👋

Sperăm că ați ajuns cu bine acasă. A fost o bucurie să vă fi avut oaspeți la Vaias Aparts.

${cta}

💝 *Mic cadou de mulțumire*
Codul *VINEINAPOI10* vă oferă 10% discount la următoarea rezervare directă pe vaiasaparts.ro sau WhatsApp. Valabil 12 luni.

Vă așteptăm cu drag oricând!

Cu drag,
Echipa Vaias Aparts`;
}

function postStayReview_EN(ctx: JourneyContext): string {
  const src = (ctx.bookingSource ?? "direct").toLowerCase();
  let cta = "";
  if (src === "direct" || src === "website" || src === "whatsapp") {
    cta = `📝 *A review would mean a lot to us*

🌐 Google: https://g.page/vaias-aparts/review
📩 Or write to us directly — we value honest feedback above any public review`;
  } else if (src === "booking") {
    cta = `📝 *A Booking review would help us enormously*

Booking will send you a review request automatically in the next 14 days. Please answer it there.`;
  } else if (src === "airbnb") {
    cta = `📝 *An Airbnb review would mean so much*

You have 14 days to leave a review on Airbnb. We've already left you a glowing one! 😊`;
  } else {
    cta = `📝 *A review would help us grow*

Reply to this message — any impression is useful to us.`;
  }

  return `Hi ${ctx.guestName}! 👋

Hope you got home safely. It was a joy to have you at Vaias Aparts.

${cta}

💝 *A small thank-you gift*
The code *COMEBACK10* gives you 10% off your next direct booking on vaiasaparts.ro or WhatsApp. Valid 12 months.

We'd love to see you again any time!

Warmly,
Echipa Vaias Aparts`;
}

function birthdayNameday_RO(ctx: JourneyContext): string {
  const occ = ctx.occasion === "nameday" ? "de ziua numelui" : "de ziua de naștere";
  return `${ctx.guestName} dragă! 🎉

Echipa Vaias Aparts vă urează ${occ} multă sănătate, bucurie și împliniri.

Vă păstrăm un loc preferat la Vaias Aparts atunci când vreți să sărbătoriți cu cei dragi.

🎁 *Cadou aniversare*: codul *LA_MULTI_ANI* vă oferă 15% discount la următoarea rezervare directă. Valabil 3 luni de la primirea acestui mesaj.

La mulți ani! 🥂

Cu drag,
Echipa Vaias Aparts`;
}

function birthdayNameday_EN(ctx: JourneyContext): string {
  const occ = ctx.occasion === "nameday" ? "on your name day" : "on your birthday";
  return `Dear ${ctx.guestName}! 🎉

The Vaias Aparts team wishes you ${occ} health, joy, and many blessings.

We're keeping a favourite spot for you at Vaias Aparts whenever you want to celebrate with loved ones.

🎁 *Anniversary gift*: code *MANY_HAPPY_RETURNS* gives 15% off your next direct booking. Valid 3 months from receiving this message.

Many happy returns! 🥂

Warmly,
Echipa Vaias Aparts`;
}

/* ============================ DISPATCH ============================ */

export function renderJourneyMessage(stage: JourneyStage, ctx: JourneyContext): string {
  const lang = ctx.language ?? "ro";
  const map: Record<JourneyStage, Record<JourneyLanguage, (c: JourneyContext) => string>> = {
    pre_arrival_7d: { ro: preArrival7d_RO, en: preArrival7d_EN },
    pre_arrival_48h: { ro: preArrival48h_RO, en: preArrival48h_EN },
    check_in_day: { ro: checkInDay_RO, en: checkInDay_EN },
    in_stay_day2: { ro: inStayDay2_RO, en: inStayDay2_EN },
    pre_checkout_24h: { ro: preCheckout24h_RO, en: preCheckout24h_EN },
    post_stay_review: { ro: postStayReview_RO, en: postStayReview_EN },
    birthday_nameday: { ro: birthdayNameday_RO, en: birthdayNameday_EN },
  };
  const fn = map[stage]?.[lang];
  if (!fn) throw new Error(`No template for stage=${stage}, lang=${lang}`);
  return fn(ctx);
}

export const ALL_STAGES: JourneyStage[] = [
  "pre_arrival_7d",
  "pre_arrival_48h",
  "check_in_day",
  "in_stay_day2",
  "pre_checkout_24h",
  "post_stay_review",
  "birthday_nameday",
];
