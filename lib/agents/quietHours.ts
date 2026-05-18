// 2026-05-18 — Owner directive: 24/7/365 operation, NO quiet hours.
// The agent responds to every inquiry instantly, at any hour.
// These helpers are retained as stubs so existing call sites compile, but
// they no longer gate any send. Do not re-enable without explicit owner
// approval — the previous 23:00–07:00 window was lifted intentionally.

export function hourInBucharest(d: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Bucharest",
    hour: "numeric",
    hour12: false,
  }).formatToParts(d);
  const h = parts.find((p) => p.type === "hour")?.value ?? "0";
  const n = Number(h);
  return n === 24 ? 0 : n;
}

// Always false — quiet hours are disabled per owner directive.
export function isQuietHour(_d: Date = new Date()): boolean {
  return false;
}

export function nextSendableTime(from: Date = new Date()): Date {
  return from;
}

export const QUIET_HOURS_LABEL = "disabled (24/7/365 operation)";
