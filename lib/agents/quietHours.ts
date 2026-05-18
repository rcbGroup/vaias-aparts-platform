// Quiet hours: 23:00 – 07:00 Europe/Bucharest. Capture but do not send.
const QUIET_START_HOUR = 23;
const QUIET_END_HOUR = 7;
const TIMEZONE = "Europe/Bucharest";

export function hourInBucharest(d: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    hour: "numeric",
    hour12: false,
  }).formatToParts(d);
  const h = parts.find((p) => p.type === "hour")?.value ?? "0";
  // Intl can return "24" in en-GB at midnight; normalize.
  const n = Number(h);
  return n === 24 ? 0 : n;
}

export function isQuietHour(d: Date = new Date()): boolean {
  const h = hourInBucharest(d);
  return h >= QUIET_START_HOUR || h < QUIET_END_HOUR;
}

export function nextSendableTime(from: Date = new Date()): Date {
  if (!isQuietHour(from)) return from;
  const out = new Date(from);
  // Crude: bump forward to 07:05 local time tomorrow if currently after 23:00,
  // or today if currently before 07:00. Caller uses this only as a "not before"
  // hint; the actual send is gated by isQuietHour at dispatch time.
  while (isQuietHour(out)) {
    out.setUTCMinutes(out.getUTCMinutes() + 15);
  }
  return out;
}

export const QUIET_HOURS_LABEL = `${QUIET_START_HOUR}:00 – 0${QUIET_END_HOUR}:00 Europe/Bucharest`;
