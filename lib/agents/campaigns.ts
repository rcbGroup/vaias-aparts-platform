import { addDays, classifyDate, toISODate } from "./calendar";
import { resolveOrigin } from "./leadOrigin";
import type {
  CampaignDraft,
  CampaignType,
  EngagementSequence,
  OccupancyGap,
} from "./types";

let counter = 0;
function nextId(prefix: string): string {
  counter += 1;
  return `${prefix}_${Date.now().toString(36)}_${counter.toString(36)}`;
}

const WA_FOOTER_RO = "— Echipa Vaias Aparts · Târgu Neamț";
const WA_FOOTER_EN = "— The Vaias Aparts team · Târgu Neamț";

function fmtDateRO(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("ro-RO", { day: "numeric", month: "long" });
}

function fmtDateEN(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

export function lastMinuteCampaign(gap: OccupancyGap): CampaignDraft {
  const startRO = fmtDateRO(gap.startDate);
  const endRO = fmtDateRO(gap.endDate);
  const startEN = fmtDateEN(gap.startDate);
  const endEN = fmtDateEN(gap.endDate);

  const messageRO =
    `🏠 Last-minute la Vila Vaias Aparts — ${gap.apartmentName}\n` +
    `${startRO} → ${endRO} (${gap.nights} ${gap.nights === 1 ? "noapte" : "nopți"})\n` +
    `Tarif redus: ${gap.suggestedPrice} RON/noapte (-${gap.suggestedDiscountPct}%).\n` +
    `Rezervare directă pe WhatsApp +40 738 345 330 — fără comision OTA.`;

  const messageEN =
    `🏠 Last-minute at Vila Vaias Aparts — ${gap.apartmentName}\n` +
    `${startEN} → ${endEN} (${gap.nights} ${gap.nights === 1 ? "night" : "nights"})\n` +
    `Promo rate: ${gap.suggestedPrice} RON/night (-${gap.suggestedDiscountPct}%).\n` +
    `Direct booking on WhatsApp +40 738 345 330 — no OTA fees.`;

  return {
    id: nextId("lm"),
    type: "last_minute",
    channel: "whatsapp",
    apartmentSlugs: [gap.apartmentSlug],
    startDate: gap.startDate,
    endDate: gap.endDate,
    discountPct: gap.suggestedDiscountPct,
    messageRO,
    messageEN,
    whatsappMessageRO:
      `Bună ziua! Vă scriu de la Vaias Aparts — ${gap.apartmentName} este liber ` +
      `între ${startRO} și ${endRO}. Aplicăm un tarif special last-minute: ` +
      `${gap.suggestedPrice} RON/noapte. Doriți să confirm rezervarea? ${WA_FOOTER_RO}`,
    whatsappMessageEN:
      `Hello! Quick note from Vaias Aparts — ${gap.apartmentName} is open ` +
      `${startEN}–${endEN}. We can offer a last-minute rate of ` +
      `${gap.suggestedPrice} RON/night. Shall I hold it for you? ${WA_FOOTER_EN}`,
    rationale:
      `${gap.severity.toUpperCase()} severity gap, ${gap.daysUntilStart} day(s) out, ` +
      `${gap.classification} pricing tier.`,
    estimatedReach: 50,
    estimatedRevenue: gap.suggestedPrice * gap.nights,
    status: "draft",
    createdAt: new Date().toISOString(),
  };
}

export function extendedStayCampaign(gap: OccupancyGap): CampaignDraft | null {
  if (gap.nights < 5) return null;
  const startRO = fmtDateRO(gap.startDate);
  const endRO = fmtDateRO(gap.endDate);
  const startEN = fmtDateEN(gap.startDate);
  const endEN = fmtDateEN(gap.endDate);
  const stayDiscount = gap.nights >= 7 ? 25 : 15;
  const total = Math.round(gap.basePrice * gap.nights * (1 - stayDiscount / 100));

  return {
    id: nextId("ext"),
    type: "extended_stay",
    channel: "whatsapp",
    apartmentSlugs: [gap.apartmentSlug],
    startDate: gap.startDate,
    endDate: gap.endDate,
    discountPct: stayDiscount,
    messageRO:
      `Sejur lung la Vaias Aparts: ${gap.nights} nopți în ${gap.apartmentName}, ` +
      `${startRO}-${endRO}. Reducere automată ${stayDiscount}% — total ${total} RON.`,
    messageEN:
      `Long stay at Vaias Aparts: ${gap.nights} nights in ${gap.apartmentName}, ` +
      `${startEN}-${endEN}. Auto discount ${stayDiscount}% — total ${total} RON.`,
    whatsappMessageRO:
      `Bună ziua! Pentru ${gap.nights} nopți la ${gap.apartmentName} aplicăm ` +
      `reducerea de sejur lung (${stayDiscount}%). Total ${total} RON pentru ` +
      `${startRO}-${endRO}. ${WA_FOOTER_RO}`,
    whatsappMessageEN:
      `Hello! For ${gap.nights} nights at ${gap.apartmentName} we apply our ` +
      `long-stay discount (${stayDiscount}%). Total ${total} RON for ` +
      `${startEN}-${endEN}. ${WA_FOOTER_EN}`,
    rationale: `Long-stay opportunity (${gap.nights} nights) — apply ${stayDiscount}%.`,
    estimatedReach: 30,
    estimatedRevenue: total,
    status: "draft",
    createdAt: new Date().toISOString(),
  };
}

export function weekendPackageCampaign(gap: OccupancyGap): CampaignDraft | null {
  const startDay = new Date(gap.startDate + "T00:00:00Z").getUTCDay();
  if (gap.classification !== "weekend" && startDay !== 5) return null;
  if (gap.nights < 2 || gap.nights > 3) return null;

  return {
    id: nextId("we"),
    type: "weekend_package",
    channel: "whatsapp",
    apartmentSlugs: [gap.apartmentSlug],
    startDate: gap.startDate,
    endDate: gap.endDate,
    discountPct: 10,
    messageRO:
      `Pachet weekend ${gap.apartmentName}: Vin-Dum, 2 nopți, ` +
      `tarif ${gap.basePrice * 2 - Math.round(gap.basePrice * 2 * 0.1)} RON + ` +
      `recomandări locale: Cetatea Neamțului, mănăstirea Agapia.`,
    messageEN:
      `Weekend package ${gap.apartmentName}: Fri-Sun, 2 nights, ` +
      `${gap.basePrice * 2 - Math.round(gap.basePrice * 2 * 0.1)} RON + ` +
      `local picks: Neamț Citadel, Agapia monastery.`,
    whatsappMessageRO:
      `Vă propunem pachetul weekend la ${gap.apartmentName}, ${fmtDateRO(gap.startDate)}–${fmtDateRO(gap.endDate)}. ` +
      `Tarif redus + ghid local pentru Cetatea Neamțului. ${WA_FOOTER_RO}`,
    whatsappMessageEN:
      `Weekend offer at ${gap.apartmentName}, ${fmtDateEN(gap.startDate)}–${fmtDateEN(gap.endDate)}. ` +
      `Discounted rate + local guide to Neamț Citadel. ${WA_FOOTER_EN}`,
    rationale: "Weekend gap — bundle local experiences.",
    estimatedReach: 80,
    estimatedRevenue: gap.basePrice * gap.nights,
    status: "draft",
    createdAt: new Date().toISOString(),
  };
}

export function seasonalCampaign(gap: OccupancyGap): CampaignDraft | null {
  if (gap.classification !== "holiday" && gap.classification !== "peak") return null;
  return {
    id: nextId("seas"),
    type: "seasonal",
    channel: "email",
    apartmentSlugs: [gap.apartmentSlug],
    startDate: gap.startDate,
    endDate: gap.endDate,
    discountPct: Math.min(gap.suggestedDiscountPct, 10),
    messageRO:
      `Disponibilitate de sărbători: ${gap.apartmentName}, ${fmtDateRO(gap.startDate)}-${fmtDateRO(gap.endDate)}. ` +
      `Rezervări limitate — confirmăm în câteva ore.`,
    messageEN:
      `Holiday window opening: ${gap.apartmentName}, ${fmtDateEN(gap.startDate)}-${fmtDateEN(gap.endDate)}. ` +
      `Limited availability — confirmed within hours.`,
    whatsappMessageRO:
      `Avem disponibilitate pentru sărbători la ${gap.apartmentName} ` +
      `(${fmtDateRO(gap.startDate)}–${fmtDateRO(gap.endDate)}). Doriți o ofertă? ${WA_FOOTER_RO}`,
    whatsappMessageEN:
      `We have holiday availability at ${gap.apartmentName} ` +
      `(${fmtDateEN(gap.startDate)}–${fmtDateEN(gap.endDate)}). Want a quote? ${WA_FOOTER_EN}`,
    rationale: "Peak/holiday window — push to past-guest list, not discount-heavy.",
    estimatedReach: 200,
    estimatedRevenue: gap.suggestedPrice * gap.nights,
    status: "draft",
    createdAt: new Date().toISOString(),
  };
}

export function diasporaCampaign(originAirport: string, gap?: OccupancyGap): CampaignDraft {
  const o = resolveOrigin({ airportCode: originAirport });
  const city = o?.city ?? originAirport;
  const angle = o?.diasporaAngle ?? "comunitatea românească din străinătate";
  const langTag = o?.lang ?? "en";
  const dateRO = gap ? `${fmtDateRO(gap.startDate)} – ${fmtDateRO(gap.endDate)}` : "în următoarele 60 de zile";
  const dateEN = gap ? `${fmtDateEN(gap.startDate)} – ${fmtDateEN(gap.endDate)}` : "in the next 60 days";

  return {
    id: nextId("dia"),
    type: "diaspora",
    channel: "whatsapp",
    apartmentSlugs: gap ? [gap.apartmentSlug] : ["apartament-3"],
    startDate: gap?.startDate ?? toISODate(new Date()),
    endDate: gap?.endDate ?? toISODate(addDays(new Date(), 60)),
    discountPct: 25,
    messageRO:
      `Salut, român plecat la ${city}! Te aștept acasă la Vaias Aparts. ` +
      `Reducere 25% pentru sejururi de 7+ nopți, ${dateRO}. Vorbim ${langTag.toUpperCase()}.`,
    messageEN:
      `Hi! Romanian abroad in ${city}? Come home to Vaias Aparts. ` +
      `25% off for 7+ night stays, ${dateEN}. We speak ${langTag.toUpperCase()}.`,
    whatsappMessageRO:
      `Bună ziua! Mă numesc Anca, de la Vaias Aparts (Târgu Neamț). ` +
      `Pentru ${angle}, păstrăm un apartament cu reducere pentru sejururi lungi. ${WA_FOOTER_RO}`,
    whatsappMessageEN:
      `Hello! I'm Anca from Vaias Aparts (Târgu Neamț, Romania). ` +
      `For ${angle}, we hold an apartment with a long-stay discount. ${WA_FOOTER_EN}`,
    rationale: `Diaspora targeting (${city}) — long-stay incentive.`,
    estimatedReach: 120,
    estimatedRevenue: (gap?.suggestedPrice ?? 297) * 7,
    status: "draft",
    createdAt: new Date().toISOString(),
  };
}

export function corporateRetreatCampaign(gaps: OccupancyGap[]): CampaignDraft | null {
  // Only meaningful when multiple apartments are free across the same midweek window.
  const midweek = gaps.filter((g) => g.classification === "weekday" && g.nights >= 2);
  if (midweek.length < 3) return null;
  const startDates = midweek.map((g) => g.startDate).sort();
  const endDates = midweek.map((g) => g.endDate).sort();
  const start = startDates[0];
  const end = endDates[endDates.length - 1];
  const slugs = Array.from(new Set(midweek.map((g) => g.apartmentSlug)));

  return {
    id: nextId("corp"),
    type: "corporate_retreat",
    channel: "email",
    apartmentSlugs: slugs,
    startDate: start,
    endDate: end,
    discountPct: 15,
    messageRO:
      `Pachet retreat corporate Vaias Aparts (${slugs.length} apartamente disponibile, ` +
      `${fmtDateRO(start)}-${fmtDateRO(end)}). Sală comună Bucătăria pentru Toți, ` +
      `parcare autocar, reducere 15% mid-week.`,
    messageEN:
      `Corporate retreat at Vaias Aparts (${slugs.length} apartments available, ` +
      `${fmtDateEN(start)}-${fmtDateEN(end)}). Shared common kitchen, coach parking, ` +
      `15% midweek discount.`,
    whatsappMessageRO:
      `Bună ziua! Avem ${slugs.length} apartamente libere mid-week la Vaias Aparts ` +
      `(${fmtDateRO(start)}-${fmtDateRO(end)}). Vă pregătim ofertă retreat corporate? ${WA_FOOTER_RO}`,
    whatsappMessageEN:
      `Hello! We have ${slugs.length} apartments open midweek at Vaias Aparts ` +
      `(${fmtDateEN(start)}-${fmtDateEN(end)}). Want a corporate retreat quote? ${WA_FOOTER_EN}`,
    rationale: "Multiple midweek vacancies — pitch corporate/team-building groups.",
    estimatedReach: 60,
    estimatedRevenue: slugs.length * 297 * 3,
    status: "draft",
    createdAt: new Date().toISOString(),
  };
}

export function generateCampaignsForGap(gap: OccupancyGap): CampaignDraft[] {
  const out: CampaignDraft[] = [];
  if (gap.daysUntilStart <= 7) out.push(lastMinuteCampaign(gap));
  const ext = extendedStayCampaign(gap);
  if (ext) out.push(ext);
  const we = weekendPackageCampaign(gap);
  if (we) out.push(we);
  const seas = seasonalCampaign(gap);
  if (seas) out.push(seas);
  return out;
}

export const STANDARD_ENGAGEMENT_SEQUENCE: EngagementSequence[] = [
  {
    step: 1,
    channel: "whatsapp",
    triggerHoursAfter: 0,
    messageRO:
      `Bună ziua și bine ați găsit pe pagina noastră! Suntem Vaias Aparts ` +
      `din Târgu Neamț. Vă putem ajuta cu o ofertă personalizată pentru sejurul dvs.? ${WA_FOOTER_RO}`,
    messageEN:
      `Hello and welcome! This is the Vaias Aparts team in Târgu Neamț, Romania. ` +
      `Want a personalised quote for your stay? ${WA_FOOTER_EN}`,
  },
  {
    step: 2,
    channel: "whatsapp",
    triggerHoursAfter: 72,
    messageRO:
      `Bună ziua! Revin cu disponibilitatea actualizată pentru perioada solicitată. ` +
      `Răspundem rapid pe WhatsApp între 07:00 și 23:00. ${WA_FOOTER_RO}`,
    messageEN:
      `Hello again — sharing the latest availability for your dates. ` +
      `We answer between 07:00 and 23:00 (Bucharest). ${WA_FOOTER_EN}`,
  },
  {
    step: 3,
    channel: "whatsapp",
    triggerHoursAfter: 168,
    messageRO:
      `Salutare! Avem o ofertă specială pentru rezervări directe — ` +
      `evitați comisionul OTA (15-25%) și beneficiați de tarif mai bun. ${WA_FOOTER_RO}`,
    messageEN:
      `Hi there! Special offer for direct bookings — skip the 15–25% OTA fee ` +
      `and book at our best rate. ${WA_FOOTER_EN}`,
  },
];

// Re-engagement: birthday / name-day / seasonal invites for past guests.
export function reEngagementCampaign(args: {
  guestName: string;
  reason: "birthday" | "name_day" | "seasonal";
  season?: string;
}): CampaignDraft {
  const reasonRO =
    args.reason === "birthday"
      ? "La mulți ani"
      : args.reason === "name_day"
      ? "La mulți ani de ziua numelui"
      : `Salutări pentru ${args.season ?? "sezonul nou"}`;
  const reasonEN =
    args.reason === "birthday"
      ? "Happy birthday"
      : args.reason === "name_day"
      ? "Happy name day"
      : `${args.season ?? "Season"} greetings`;

  return {
    id: nextId("re"),
    type: "re_engagement",
    channel: "whatsapp",
    apartmentSlugs: [],
    startDate: toISODate(new Date()),
    endDate: toISODate(addDays(new Date(), 60)),
    discountPct: 10,
    messageRO:
      `${reasonRO}, ${args.guestName}! Vă așteptăm înapoi la Vaias Aparts ` +
      `cu reducere 10% pentru orice rezervare în 60 de zile. ${WA_FOOTER_RO}`,
    messageEN:
      `${reasonEN}, ${args.guestName}! Come back to Vaias Aparts with 10% off ` +
      `any booking in the next 60 days. ${WA_FOOTER_EN}`,
    whatsappMessageRO:
      `${reasonRO}, ${args.guestName}! Vă mulțumim că ați fost oaspetele nostru. ` +
      `10% reducere pentru o nouă rezervare. ${WA_FOOTER_RO}`,
    whatsappMessageEN:
      `${reasonEN}, ${args.guestName}! Thanks for staying with us before — ` +
      `10% off your next booking. ${WA_FOOTER_EN}`,
    rationale: `Re-engagement: ${args.reason}.`,
    estimatedReach: 1,
    estimatedRevenue: 297,
    status: "draft",
    createdAt: new Date().toISOString(),
  };
}

export function campaignTypeLabel(type: CampaignType): string {
  switch (type) {
    case "last_minute":
      return "Last-minute";
    case "extended_stay":
      return "Sejur lung";
    case "weekend_package":
      return "Pachet weekend";
    case "seasonal":
      return "Sezonier";
    case "diaspora":
      return "Diaspora";
    case "corporate_retreat":
      return "Retreat corporate";
    case "re_engagement":
      return "Re-engagement";
  }
}
