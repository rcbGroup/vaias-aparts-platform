/**
 * Lightweight iCal fetch + parse for 5StarDesk availability sync.
 * Returns blocked date ranges per apartment, without DB persistence — callers
 * decide whether to cache results.
 */

export type ICalRange = {
  from: string;
  to: string;
  summary?: string;
  uid?: string;
};

const FIVESTARDESK_ENV_KEYS = [
  "FIVESTARDESK_ICAL_APT1",
  "FIVESTARDESK_ICAL_APT2",
  "FIVESTARDESK_ICAL_APT3",
  "FIVESTARDESK_ICAL_APT4",
  "FIVESTARDESK_ICAL_APT5",
  "FIVESTARDESK_ICAL_APT6",
  "FIVESTARDESK_ICAL_APT7",
] as const;

export function iCalUrlForApartment(slug: string): string | null {
  const match = slug.match(/^apartament-(\d)$/);
  if (!match) return null;
  const key = FIVESTARDESK_ENV_KEYS[parseInt(match[1], 10) - 1];
  return key ? process.env[key] ?? null : null;
}

function parseICalDate(value: string): string | null {
  // Handles "20260520" and "20260520T143000Z"
  const m = value.match(/^(\d{4})(\d{2})(\d{2})/);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

export function parseICal(body: string): ICalRange[] {
  const events: ICalRange[] = [];
  const lines = body.replace(/\r\n[ \t]/g, "").split(/\r?\n/);

  let current: Partial<ICalRange> | null = null;
  for (const raw of lines) {
    const line = raw.trim();
    if (line === "BEGIN:VEVENT") {
      current = {};
      continue;
    }
    if (line === "END:VEVENT") {
      if (current?.from && current.to) {
        events.push(current as ICalRange);
      }
      current = null;
      continue;
    }
    if (!current) continue;

    const colon = line.indexOf(":");
    if (colon < 0) continue;
    const keyPart = line.slice(0, colon);
    const value = line.slice(colon + 1);
    const keyName = keyPart.split(";")[0];

    if (keyName === "DTSTART") {
      const d = parseICalDate(value);
      if (d) current.from = d;
    } else if (keyName === "DTEND") {
      const d = parseICalDate(value);
      if (d) current.to = d;
    } else if (keyName === "SUMMARY") {
      current.summary = value;
    } else if (keyName === "UID") {
      current.uid = value;
    }
  }

  return events;
}

export async function fetchICalForApartment(slug: string): Promise<ICalRange[]> {
  const url = iCalUrlForApartment(slug);
  if (!url) return [];

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const body = await res.text();
    return parseICal(body);
  } catch {
    return [];
  }
}

/**
 * Given a date and a list of ranges, returns true if the date falls inside any
 * range (treating DTEND as exclusive per iCal spec).
 */
export function isDateBlocked(dateISO: string, ranges: ICalRange[]): boolean {
  return ranges.some((r) => dateISO >= r.from && dateISO < r.to);
}
