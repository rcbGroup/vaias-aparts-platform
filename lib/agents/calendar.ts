// Romanian holiday / peak-season calendar — used to classify gaps and to
// drive seasonal campaigns. Easter dates listed explicitly because the
// Orthodox Easter calculation is non-trivial and we only need a small window.

export type HolidayHint = {
  date: string; // yyyy-mm-dd
  name: string;
  category: "holiday" | "peak" | "shoulder" | "weekend" | "school";
  durationDays?: number;
};

// Anchors. Years covered: 2026–2028 (current scope; refresh annually).
export const ROMANIAN_HOLIDAYS: HolidayHint[] = [
  { date: "2026-01-01", name: "Anul Nou", category: "holiday", durationDays: 2 },
  { date: "2026-01-24", name: "Unirea Principatelor", category: "holiday" },
  { date: "2026-04-10", name: "Vinerea Mare (orto)", category: "holiday" },
  { date: "2026-04-12", name: "Paștele Ortodox", category: "peak", durationDays: 3 },
  { date: "2026-05-01", name: "Ziua Muncii / 1 Mai", category: "peak", durationDays: 3 },
  { date: "2026-05-31", name: "Rusalii", category: "peak", durationDays: 2 },
  { date: "2026-08-15", name: "Sfânta Maria", category: "peak", durationDays: 2 },
  { date: "2026-11-30", name: "Sfântul Andrei", category: "holiday" },
  { date: "2026-12-01", name: "Ziua Națională", category: "peak", durationDays: 2 },
  { date: "2026-12-24", name: "Ajun Crăciun", category: "peak", durationDays: 3 },
  { date: "2026-12-31", name: "Revelion", category: "peak", durationDays: 3 },
  { date: "2027-01-01", name: "Anul Nou", category: "holiday", durationDays: 2 },
  { date: "2027-04-30", name: "Vinerea Mare (orto)", category: "holiday" },
  { date: "2027-05-02", name: "Paștele Ortodox", category: "peak", durationDays: 3 },
  { date: "2027-05-01", name: "1 Mai", category: "peak", durationDays: 3 },
  { date: "2027-06-20", name: "Rusalii", category: "peak", durationDays: 2 },
  { date: "2027-08-15", name: "Sfânta Maria", category: "peak", durationDays: 2 },
  { date: "2027-12-01", name: "Ziua Națională", category: "peak", durationDays: 2 },
  { date: "2027-12-24", name: "Ajun Crăciun", category: "peak", durationDays: 3 },
];

// School holiday windows (vacanțe școlare) — drive family-targeted campaigns.
export const SCHOOL_HOLIDAYS: { from: string; to: string; name: string }[] = [
  { from: "2026-02-21", to: "2026-03-01", name: "Vacanța de schi" },
  { from: "2026-04-04", to: "2026-04-19", name: "Vacanța de Paști" },
  { from: "2026-06-22", to: "2026-09-07", name: "Vacanța de vară" },
  { from: "2026-10-24", to: "2026-11-01", name: "Vacanța de toamnă" },
  { from: "2026-12-19", to: "2027-01-10", name: "Vacanța de iarnă" },
];

// Peak summer window — even outside holidays, July+August are high-demand.
export function isPeakSeason(date: Date): boolean {
  const m = date.getUTCMonth();
  return m === 6 || m === 7; // Jul, Aug
}

export function isShoulderSeason(date: Date): boolean {
  const m = date.getUTCMonth();
  return m === 4 || m === 5 || m === 8 || m === 9; // May, Jun, Sep, Oct
}

export function isWeekend(date: Date): boolean {
  const d = date.getUTCDay();
  return d === 5 || d === 6 || d === 0; // Fri night, Sat night, Sun night
}

export function isHoliday(date: Date): HolidayHint | null {
  const iso = date.toISOString().slice(0, 10);
  const direct = ROMANIAN_HOLIDAYS.find((h) => h.date === iso);
  if (direct) return direct;
  // Multi-day windows
  for (const h of ROMANIAN_HOLIDAYS) {
    if (!h.durationDays || h.durationDays < 2) continue;
    const start = new Date(h.date + "T00:00:00Z");
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + h.durationDays);
    if (date >= start && date < end) return h;
  }
  return null;
}

export function isSchoolHoliday(date: Date): string | null {
  const iso = date.toISOString().slice(0, 10);
  for (const w of SCHOOL_HOLIDAYS) {
    if (iso >= w.from && iso <= w.to) return w.name;
  }
  return null;
}

export function classifyDate(
  date: Date,
): "peak" | "holiday" | "weekend" | "shoulder" | "weekday" {
  if (isHoliday(date)) return "holiday";
  if (isPeakSeason(date)) return "peak";
  if (isWeekend(date)) return "weekend";
  if (isShoulderSeason(date)) return "shoulder";
  return "weekday";
}

export function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

export function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setUTCDate(out.getUTCDate() + n);
  return out;
}
