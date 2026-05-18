/**
 * VAIA OS — Guest language detection.
 *
 * Master-prompt rule:
 *   • +40 (Romania)  → Romanian only.
 *   • Everything else → Romanian + English + guest's native language (when supported).
 *
 * The agent uses {@link detectGuestLanguages} to decide which renderings to
 * stack in a single outbound WhatsApp/email message.
 */

export type Language = "ro" | "en" | "fr" | "de" | "it" | "es" | "hu";

/** Convenience union for native-language renderers. */
export type SupportedLanguage = Language;

/**
 * Phone-prefix → primary language guess.  When the prefix is unknown we
 * default to English (international fallback) rather than Romanian so
 * non-RO guests do not receive RO-only content by accident.
 */
const PREFIX_TO_LANGUAGE: Array<{ prefix: string; lang: Language }> = [
  // Romanian
  { prefix: "+40", lang: "ro" },
  { prefix: "0040", lang: "ro" },

  // German-speaking
  { prefix: "+49", lang: "de" }, // DE
  { prefix: "+43", lang: "de" }, // AT
  { prefix: "+41", lang: "de" }, // CH (de default — could be fr/it)

  // French-speaking
  { prefix: "+33", lang: "fr" }, // FR
  { prefix: "+32", lang: "fr" }, // BE
  { prefix: "+352", lang: "fr" }, // LU

  // Italian
  { prefix: "+39", lang: "it" },

  // Spanish
  { prefix: "+34", lang: "es" },

  // Hungarian
  { prefix: "+36", lang: "hu" },

  // English-default
  { prefix: "+44", lang: "en" }, // UK
  { prefix: "+353", lang: "en" }, // IE
  { prefix: "+1", lang: "en" }, // US/CA
  { prefix: "+61", lang: "en" }, // AU
  { prefix: "+64", lang: "en" }, // NZ
  { prefix: "+27", lang: "en" }, // ZA

  // Portuguese / Dutch / Nordics → English
  { prefix: "+351", lang: "en" },
  { prefix: "+31", lang: "en" },
  { prefix: "+45", lang: "en" },
  { prefix: "+46", lang: "en" },
  { prefix: "+47", lang: "en" },
  { prefix: "+358", lang: "en" },
];

function normalizePhone(phone?: string | null): string {
  if (!phone) return "";
  const cleaned = phone.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("00")) return "+" + cleaned.slice(2);
  if (cleaned.startsWith("0") && !cleaned.startsWith("+")) return "+40" + cleaned.slice(1);
  return cleaned;
}

/**
 * Primary language inferred from a phone number alone.  Unknown numbers
 * (or empty input) default to English so we never leak RO-only content
 * to a foreign guest by accident.
 */
export function detectPrimaryLanguage(phone?: string | null): Language {
  const normalized = normalizePhone(phone);
  if (!normalized) return "en";
  const match = PREFIX_TO_LANGUAGE.find((p) => normalized.startsWith(p.prefix));
  return match?.lang ?? "en";
}

/**
 * Languages that should appear in a single multilingual message,
 * in the order they should be stacked.
 *
 *   • +40 →            ["ro"]
 *   • EN-default →     ["ro", "en"]
 *   • DE/FR/IT/ES/HU → ["ro", "en", <native>]
 *
 * The list is deduplicated and stable.
 */
export function detectGuestLanguages(phone?: string | null): Language[] {
  const primary = detectPrimaryLanguage(phone);
  if (primary === "ro") return ["ro"];
  if (primary === "en") return ["ro", "en"];
  return ["ro", "en", primary];
}

/** Human-readable label for the chosen language stack (admin UI). */
export function languageStackLabel(langs: Language[]): string {
  const labels: Record<Language, string> = {
    ro: "Română",
    en: "English",
    fr: "Français",
    de: "Deutsch",
    it: "Italiano",
    es: "Español",
    hu: "Magyar",
  };
  return langs.map((l) => labels[l]).join(" + ");
}

/**
 * Time-aware greeting per language. Uses Europe/Bucharest hour so the
 * cron-driven send time aligns with the local clock regardless of which
 * Vercel region runs the function.
 */
export function timeGreeting(lang: Language, now: Date = new Date()): string {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      hour12: false,
      timeZone: "Europe/Bucharest",
    }).format(now),
  );

  const greetings: Record<Language, [string, string, string]> = {
    ro: ["Bună dimineața", "Bună ziua", "Bună seara"],
    en: ["Good morning", "Good afternoon", "Good evening"],
    fr: ["Bonjour", "Bonjour", "Bonsoir"],
    de: ["Guten Morgen", "Guten Tag", "Guten Abend"],
    it: ["Buongiorno", "Buongiorno", "Buonasera"],
    es: ["Buenos días", "Buenas tardes", "Buenas noches"],
    hu: ["Jó reggelt", "Jó napot", "Jó estét"],
  };

  const slot = hour < 12 ? 0 : hour < 18 ? 1 : 2;
  return greetings[lang][slot];
}

/** Date formatter using the language's BCP-47 locale. */
export function formatGuestDate(d: Date, lang: Language): string {
  const locale: Record<Language, string> = {
    ro: "ro-RO",
    en: "en-GB",
    fr: "fr-FR",
    de: "de-DE",
    it: "it-IT",
    es: "es-ES",
    hu: "hu-HU",
  };
  return d.toLocaleDateString(locale[lang], {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
