/**
 * VAIA OS — Agent 8: Direct Booking Optimizer.
 *
 * Goals:
 *   1. Best Rate Guarantee — direct price always at parity-or-below vs OTAs.
 *   2. Direct-exclusive benefits stack to make direct booking measurably better.
 *   3. Public API the website + WhatsApp bot can quote.
 */
export type DirectBenefit = {
  key: string;
  labelRO: string;
  labelEN: string;
  detailRO: string;
  detailEN: string;
  conditionRO?: string;
  conditionEN?: string;
  estimatedValueRON?: number;
};

export const DIRECT_BENEFITS: DirectBenefit[] = [
  {
    key: "best_rate_guarantee",
    labelRO: "Best Rate Guarantee",
    labelEN: "Best Rate Guarantee",
    detailRO: "Garantăm cel mai mic preț disponibil. Dacă găsiți același apartament mai ieftin în altă parte, vă oferim diferența + 5%.",
    detailEN: "We guarantee the lowest available price. Find the same apartment cheaper elsewhere and we refund the difference + 5%.",
    estimatedValueRON: 0,
  },
  {
    key: "no_ota_fees",
    labelRO: "Fără comisioane OTA (15–25%)",
    labelEN: "No OTA fees (15–25%)",
    detailRO: "Rezervare directă = banii rămân pentru servicii mai bune, nu pentru comisioane Booking/Airbnb.",
    detailEN: "Direct booking = money stays for better service, not Booking/Airbnb fees.",
    estimatedValueRON: 0,
  },
  {
    key: "late_checkout_12",
    labelRO: "Check-out târziu — până la 12:00",
    labelEN: "Late check-out — until 12:00",
    detailRO: "Plecare relaxată după prânz, disponibil pentru rezervări directe (sub-rezerva disponibilității).",
    detailEN: "Relaxed departure, included with direct bookings (subject to availability).",
    estimatedValueRON: 50,
  },
  {
    key: "preferred_apartment",
    labelRO: "Apartament preferat (când e posibil)",
    labelEN: "Preferred apartment (when possible)",
    detailRO: "Ne spuneți care apartament vă place — facem tot ce putem să-l păstrăm pentru voi.",
    detailEN: "Tell us which apartment you prefer — we'll do our best to hold it for you.",
    estimatedValueRON: 0,
  },
  {
    key: "welcome_basket_long_stay",
    labelRO: "Coș de bun venit gratuit (3+ nopți)",
    labelEN: "Free welcome basket (3+ nights)",
    detailRO: "Vin local, brânză de Neamț, pâine de casă — pregătit pentru sosirea voastră.",
    detailEN: "Local wine, Neamț cheese, home bread — ready upon arrival.",
    conditionRO: "Minim 3 nopți",
    conditionEN: "Min 3 nights",
    estimatedValueRON: 80,
  },
  {
    key: "han_rustic_priority",
    labelRO: "Rezervare prioritară Han Rustic",
    labelEN: "Priority Han Rustic reservation",
    detailRO: "Vă rezervăm noi masa la Han Rustic — fără să stați la coadă.",
    detailEN: "We book your table at Han Rustic — skip the queue.",
    estimatedValueRON: 0,
  },
  {
    key: "long_stay_discount",
    labelRO: "Discount sejur lung (4+ nopți)",
    labelEN: "Long-stay discount (4+ nights)",
    detailRO: "15% pentru 4–6 nopți, 25% pentru 7+ nopți — rezervare directă.",
    detailEN: "15% off for 4–6 nights, 25% off for 7+ nights — direct booking only.",
    conditionRO: "Minim 4 nopți",
    conditionEN: "Min 4 nights",
    estimatedValueRON: 0,
  },
  {
    key: "whatsapp_concierge",
    labelRO: "Concierge WhatsApp 24/7",
    labelEN: "WhatsApp concierge 24/7",
    detailRO: "Răspuns direct și rapid pe WhatsApp — de la sfaturi turistice până la rezervări restaurante.",
    detailEN: "Direct, fast WhatsApp support — from local tips to restaurant bookings.",
    estimatedValueRON: 0,
  },
];

export type DirectBookingComparison = {
  direct: { priceRON: number; benefits: DirectBenefit[]; totalValueRON: number };
  ota: { priceRON: number; estimatedFeesPct: number };
  yourSaving: { vsOTA: number; plusBenefitsValue: number; total: number };
};

export function compareWithOTA(directPriceRON: number, otaPriceRON?: number): DirectBookingComparison {
  // If we don't have an OTA quote, assume parity + 20% (typical OTA mark-up).
  const ota = typeof otaPriceRON === "number" ? otaPriceRON : Math.round(directPriceRON * 1.2);
  const benefitsValue = DIRECT_BENEFITS.reduce((s, b) => s + (b.estimatedValueRON ?? 0), 0);
  const otaDiff = Math.max(0, ota - directPriceRON);

  return {
    direct: { priceRON: directPriceRON, benefits: DIRECT_BENEFITS, totalValueRON: benefitsValue },
    ota: { priceRON: ota, estimatedFeesPct: 20 },
    yourSaving: {
      vsOTA: otaDiff,
      plusBenefitsValue: benefitsValue,
      total: otaDiff + benefitsValue,
    },
  };
}

/**
 * Best Rate Guarantee check — given an external (OTA) price snapshot, decide if a claim is valid.
 */
export type BRGClaim = {
  apartmentSlug: string;
  checkIn: string;
  checkOut: string;
  competitorName: string;
  competitorPriceRON: number;
  ourPriceRON: number;
  guestEmail?: string;
};

export type BRGDecision = {
  valid: boolean;
  reason: string;
  refundRON: number;
  bonusRON: number; // extra 5%
  totalCompensationRON: number;
};

export function evaluateBRG(claim: BRGClaim): BRGDecision {
  if (claim.competitorPriceRON >= claim.ourPriceRON) {
    return {
      valid: false,
      reason: "Tariful nostru este deja egal sau mai mic decât competitorul.",
      refundRON: 0,
      bonusRON: 0,
      totalCompensationRON: 0,
    };
  }
  const diff = claim.ourPriceRON - claim.competitorPriceRON;
  const bonus = Math.round(claim.ourPriceRON * 0.05);
  return {
    valid: true,
    reason: "Tarif mai mic confirmat — aplicăm garanția de cel mai bun preț.",
    refundRON: diff,
    bonusRON: bonus,
    totalCompensationRON: diff + bonus,
  };
}
