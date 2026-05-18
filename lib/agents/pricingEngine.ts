import { prisma } from "@/lib/prisma";
import { apartments as APARTMENT_INFO } from "@/lib/apartments";
import { classifyDate } from "./calendar";
import type { PricingSuggestion } from "./types";

type RuleRow = {
  id: number;
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  multiplier: number;
  active: boolean;
};

async function loadActiveRules(): Promise<RuleRow[]> {
  try {
    return await prisma.pricingRule.findMany({ where: { active: true } });
  } catch {
    return [];
  }
}

function classificationMultiplier(date: Date): { mult: number; reason: string } {
  const c = classifyDate(date);
  switch (c) {
    case "peak":
      return { mult: 1.25, reason: "peak season" };
    case "holiday":
      return { mult: 1.2, reason: "holiday window" };
    case "weekend":
      return { mult: 1.1, reason: "weekend" };
    case "shoulder":
      return { mult: 1.0, reason: "shoulder" };
    default:
      return { mult: 0.95, reason: "weekday" };
  }
}

export async function suggestPriceFor(
  apartmentSlug: string,
  date: Date,
): Promise<PricingSuggestion> {
  const meta = APARTMENT_INFO.find((a) => a.slug === apartmentSlug);
  const base = meta?.pricePerNightRON ?? 297;

  const { mult: classMult, reason: classReason } = classificationMultiplier(date);

  const rules = await loadActiveRules();
  const ruleHits: string[] = [];
  let ruleMult = 1;
  for (const r of rules) {
    if (r.startDate && date < r.startDate) continue;
    if (r.endDate && date > r.endDate) continue;
    ruleMult *= r.multiplier;
    ruleHits.push(`${r.name} ×${r.multiplier}`);
  }

  const finalMult = classMult * ruleMult;
  const suggested = Math.round(base * finalMult);

  const reasonParts = [classReason];
  if (ruleHits.length) reasonParts.push(...ruleHits);

  return {
    apartmentSlug,
    basePrice: base,
    suggestedPrice: suggested,
    multiplier: Number(finalMult.toFixed(3)),
    reason: reasonParts.join(", "),
    ruleHits,
  };
}

export function applyStayDiscount(
  basePrice: number,
  nights: number,
): { pct: number; total: number; label: string } {
  let pct = 0;
  let label = "";
  if (nights >= 7) {
    pct = 25;
    label = "7+ nopți";
  } else if (nights >= 4) {
    pct = 15;
    label = "4-6 nopți";
  } else if (nights >= 2) {
    pct = 10;
    label = "2-3 nopți";
  }
  const beforeDiscount = basePrice * nights;
  const total = Math.round(beforeDiscount * (1 - pct / 100));
  return { pct, total, label };
}

// 5% local tourist tax per adult per night — quoted to guests pre-payment.
export function tourismTax(adults: number, nights: number, basePerNight: number): number {
  return Math.round(basePerNight * 0.05 * adults * nights);
}

// 30% deposit for direct bookings (master prompt rule).
export const DIRECT_BOOKING_DEPOSIT_PCT = 30;
