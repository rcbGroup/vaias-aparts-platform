// Minimal RFC 5545 iCal parser — extracts VEVENT date ranges as blocked
// intervals. Covers what 5StarDesk, Booking.com, and Airbnb emit for sync.

export type ICalEvent = {
  uid: string;
  start: Date;
  end: Date; // exclusive (iCal DTEND is exclusive for VALUE=DATE)
  summary?: string;
  status?: string;
};

function parseICalDate(value: string): Date | null {
  // Date-only: YYYYMMDD
  if (/^\d{8}$/.test(value)) {
    const y = Number(value.slice(0, 4));
    const m = Number(value.slice(4, 6)) - 1;
    const d = Number(value.slice(6, 8));
    return new Date(Date.UTC(y, m, d));
  }
  // Date-time: YYYYMMDDTHHMMSSZ or YYYYMMDDTHHMMSS
  const m = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z?)$/);
  if (m) {
    const [, y, mo, d, h, mi, s, z] = m;
    if (z === "Z") {
      return new Date(
        Date.UTC(+y, +mo - 1, +d, +h, +mi, +s),
      );
    }
    return new Date(+y, +mo - 1, +d, +h, +mi, +s);
  }
  return null;
}

function unfold(lines: string[]): string[] {
  const out: string[] = [];
  for (const raw of lines) {
    if (out.length && (raw.startsWith(" ") || raw.startsWith("\t"))) {
      out[out.length - 1] += raw.slice(1);
    } else {
      out.push(raw);
    }
  }
  return out;
}

export function parseICal(text: string): ICalEvent[] {
  const lines = unfold(text.replace(/\r\n/g, "\n").split("\n"));
  const events: ICalEvent[] = [];
  let cur: Partial<ICalEvent> | null = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      cur = {};
      continue;
    }
    if (line === "END:VEVENT") {
      if (cur && cur.uid && cur.start && cur.end) {
        events.push({
          uid: cur.uid,
          start: cur.start,
          end: cur.end,
          summary: cur.summary,
          status: cur.status,
        });
      }
      cur = null;
      continue;
    }
    if (!cur) continue;

    const colon = line.indexOf(":");
    if (colon < 0) continue;
    const rawKey = line.slice(0, colon);
    const value = line.slice(colon + 1);
    const key = rawKey.split(";")[0];

    if (key === "UID") cur.uid = value;
    else if (key === "SUMMARY") cur.summary = value;
    else if (key === "STATUS") cur.status = value;
    else if (key === "DTSTART") cur.start = parseICalDate(value) ?? undefined;
    else if (key === "DTEND") cur.end = parseICalDate(value) ?? undefined;
  }

  return events.filter((e) => e.status !== "CANCELLED");
}

export async function fetchICal(
  url: string,
  options: { timeoutMs?: number } = {},
): Promise<ICalEvent[]> {
  const timeoutMs = options.timeoutMs ?? 15_000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "VaiasBookingAgent/1.0" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`iCal fetch ${res.status}`);
    const text = await res.text();
    return parseICal(text);
  } finally {
    clearTimeout(timer);
  }
}
