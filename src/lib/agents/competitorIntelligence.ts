/**
 * VAIA OS — Agent 21: Competitor Intelligence.
 *
 * Tracks 17 named competitors in the Târgu Neamț + Neamț county area:
 *   • Hotels, pensions, apartments, vilas
 * Provides a structured competitor catalog + price-monitoring framework.
 * Actual scraping is operational glue — this module exposes the contract.
 */

export type Competitor = {
  name: string;
  category: "hotel" | "pension" | "apartments" | "villa" | "monastery_guesthouse";
  city: string;
  website?: string;
  basePriceRON?: number;
  capacity?: number;
  notes?: string;
};

export const COMPETITORS: Competitor[] = [
  // Hotels in Târgu Neamț
  { name: "Casa Arcașului", category: "hotel", city: "Târgu Neamț", basePriceRON: 280, capacity: 40, website: "https://www.casaarcasului.ro" },
  { name: "Hotel Domino", category: "hotel", city: "Târgu Neamț", basePriceRON: 250, capacity: 35 },
  { name: "Hotel Concordia", category: "hotel", city: "Târgu Neamț", basePriceRON: 320, capacity: 50, notes: "Renovat 2023" },
  { name: "Domeniile Panciu Neamț", category: "villa", city: "Târgu Neamț", basePriceRON: 350, capacity: 30 },

  // Pensions
  { name: "Pensiunea La Conac", category: "pension", city: "Vânători-Neamț", basePriceRON: 220, capacity: 16 },
  { name: "Pensiunea Casa Maria", category: "pension", city: "Târgu Neamț", basePriceRON: 200, capacity: 14 },
  { name: "Pensiunea Cuibul Vișinei", category: "pension", city: "Agapia", basePriceRON: 240, capacity: 20 },
  { name: "Pensiunea Bunavestire", category: "pension", city: "Agapia", basePriceRON: 230, capacity: 18 },
  { name: "Pensiunea Bujor", category: "pension", city: "Văratec", basePriceRON: 210, capacity: 14 },

  // Apartments
  { name: "Apartamente Cetate", category: "apartments", city: "Târgu Neamț", basePriceRON: 290, capacity: 24 },
  { name: "Studio Central Neamț", category: "apartments", city: "Târgu Neamț", basePriceRON: 220, capacity: 8 },
  { name: "City Apartments Neamț", category: "apartments", city: "Târgu Neamț", basePriceRON: 270, capacity: 18 },

  // Monastery guesthouses
  { name: "Casa de oaspeți Agapia", category: "monastery_guesthouse", city: "Agapia", basePriceRON: 120, capacity: 30, notes: "Tarif simbolic, pelerini" },
  { name: "Casa de oaspeți Văratec", category: "monastery_guesthouse", city: "Văratec", basePriceRON: 100, capacity: 25 },
  { name: "Arhondaric Mănăstirea Neamț", category: "monastery_guesthouse", city: "Mănăstirea Neamț", basePriceRON: 110, capacity: 40 },

  // Premium / regional
  { name: "Anastasia Resort", category: "villa", city: "Vânători-Neamț", basePriceRON: 480, capacity: 28, notes: "Spa și piscină" },
  { name: "Vila Bicaz", category: "villa", city: "Bicaz", basePriceRON: 380, capacity: 22, notes: "Lac Bicaz proximity" },
];

export type CompetitorSnapshot = {
  competitorName: string;
  capturedAt: string;
  priceRON: number;
  availability?: string;
  source?: string;
};

export type CompetitorAnalysis = {
  competitor: string;
  ourPosition: "below" | "parity" | "above";
  ourPriceRON: number;
  theirPriceRON: number;
  diffRON: number;
  diffPct: number;
  recommendation: string;
};

/**
 * Compare our base price (297 lei standard apartment) against each competitor
 * and recommend tactical positioning.
 */
export function analyzeAgainstCompetitors(
  ourBasePriceRON: number,
  snapshots: CompetitorSnapshot[]
): CompetitorAnalysis[] {
  return snapshots.map(s => {
    const diff = ourBasePriceRON - s.priceRON;
    const diffPct = s.priceRON > 0 ? Math.round((diff / s.priceRON) * 1000) / 10 : 0;
    let position: "below" | "parity" | "above";
    if (Math.abs(diffPct) < 5) position = "parity";
    else if (diffPct < 0) position = "below";
    else position = "above";

    let recommendation: string;
    if (position === "above" && diffPct > 20) {
      recommendation = `Suntem cu ${diffPct}% peste ${s.competitorName}. Justifică prin valoare — Best Rate Guarantee, beneficii directe.`;
    } else if (position === "below" && diffPct < -15) {
      recommendation = `Suntem cu ${Math.abs(diffPct)}% sub ${s.competitorName}. Poți ridica tariful direct cu 5-8% fără pierdere de cerere.`;
    } else if (position === "parity") {
      recommendation = `Parity cu ${s.competitorName}. Direct booking benefits sunt diferențiatorul cheie.`;
    } else {
      recommendation = `Poziționare OK vs ${s.competitorName}. Monitorizează lunar.`;
    }

    return {
      competitor: s.competitorName,
      ourPosition: position,
      ourPriceRON: ourBasePriceRON,
      theirPriceRON: s.priceRON,
      diffRON: diff,
      diffPct,
      recommendation,
    };
  });
}

/**
 * Generate baseline snapshot from the static catalog (used when DB is empty).
 */
export function baselineSnapshots(): CompetitorSnapshot[] {
  return COMPETITORS
    .filter(c => typeof c.basePriceRON === "number")
    .map(c => ({
      competitorName: c.name,
      capturedAt: new Date().toISOString(),
      priceRON: c.basePriceRON!,
      source: "catalog_baseline",
    }));
}

export function competitorSummary() {
  const byCategory: Record<string, number> = {};
  for (const c of COMPETITORS) byCategory[c.category] = (byCategory[c.category] ?? 0) + 1;
  const validPrices = COMPETITORS.filter(c => c.basePriceRON).map(c => c.basePriceRON!);
  const avg = validPrices.reduce((s, p) => s + p, 0) / Math.max(1, validPrices.length);
  return {
    totalCompetitors: COMPETITORS.length,
    byCategory,
    averageMarketPriceRON: Math.round(avg),
    competitors: COMPETITORS,
  };
}
