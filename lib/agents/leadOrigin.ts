// Maps IATA airport codes and city names from /cum-ajungi to a likely
// origin city, language, and a personalised hook the engagement engine can
// quote.

export type OriginProfile = {
  code: string;
  city: string;
  country: string;
  countryCode: string;
  lang: "ro" | "en" | "it" | "de" | "fr" | "es" | "hu";
  // distance/route hint for the message
  routeHint: string;
  diasporaAngle?: string;
};

// 22 airports + 13 city break origins that the /cum-ajungi page covers.
export const ORIGIN_PROFILES: OriginProfile[] = [
  // Romanian airports
  { code: "IAS", city: "Iași", country: "România", countryCode: "RO", lang: "ro", routeHint: "1.5h cu mașina sau microbuz" },
  { code: "BCM", city: "Bacău", country: "România", countryCode: "RO", lang: "ro", routeHint: "1h 15m cu mașina" },
  { code: "OTP", city: "București", country: "România", countryCode: "RO", lang: "ro", routeHint: "5h cu mașina sau tren" },
  { code: "SCV", city: "Suceava", country: "România", countryCode: "RO", lang: "ro", routeHint: "1h cu mașina" },
  { code: "CLJ", city: "Cluj-Napoca", country: "România", countryCode: "RO", lang: "ro", routeHint: "5h prin Bistrița" },
  { code: "TGM", city: "Târgu Mureș", country: "România", countryCode: "RO", lang: "ro", routeHint: "4h cu mașina" },
  { code: "SBZ", city: "Sibiu", country: "România", countryCode: "RO", lang: "ro", routeHint: "5h cu mașina" },
  { code: "TSR", city: "Timișoara", country: "România", countryCode: "RO", lang: "ro", routeHint: "8h cu mașina sau tren de noapte" },
  // Diaspora — Italy
  { code: "MXP", city: "Milano", country: "Italia", countryCode: "IT", lang: "it", routeHint: "zbor 2h la IAS + 1.5h auto", diasporaAngle: "comunitatea românească din Lombardia" },
  { code: "BGY", city: "Bergamo", country: "Italia", countryCode: "IT", lang: "it", routeHint: "zbor low-cost spre IAS sau OTP", diasporaAngle: "diaspora din nordul Italiei" },
  { code: "FCO", city: "Roma", country: "Italia", countryCode: "IT", lang: "it", routeHint: "zbor 2h la IAS + 1.5h auto", diasporaAngle: "parohiile ortodoxe din Lazio" },
  { code: "TRN", city: "Torino", country: "Italia", countryCode: "IT", lang: "it", routeHint: "zbor cu escală la IAS sau BCM", diasporaAngle: "diaspora din Piemont" },
  { code: "VRN", city: "Verona", country: "Italia", countryCode: "IT", lang: "it", routeHint: "zbor sezonier spre IAS", diasporaAngle: "diaspora din Veneto" },
  // Diaspora — Spain
  { code: "MAD", city: "Madrid", country: "Spania", countryCode: "ES", lang: "es", routeHint: "zbor 3h la OTP + tren spre Neamț", diasporaAngle: "comunitatea românească din Madrid" },
  { code: "BCN", city: "Barcelona", country: "Spania", countryCode: "ES", lang: "es", routeHint: "zbor 3h la OTP + tren spre Neamț", diasporaAngle: "diaspora din Catalonia" },
  // Diaspora — UK
  { code: "LTN", city: "Londra (Luton)", country: "Marea Britanie", countryCode: "GB", lang: "en", routeHint: "zbor 3h la IAS sau BCM", diasporaAngle: "comunitatea românească din UK" },
  { code: "STN", city: "Londra (Stansted)", country: "Marea Britanie", countryCode: "GB", lang: "en", routeHint: "zbor 3h la IAS sau BCM", diasporaAngle: "diaspora din Londra" },
  { code: "BHX", city: "Birmingham", country: "Marea Britanie", countryCode: "GB", lang: "en", routeHint: "zbor cu escală la OTP", diasporaAngle: "diaspora din Midlands" },
  // Diaspora — Germany
  { code: "MUC", city: "München", country: "Germania", countryCode: "DE", lang: "de", routeHint: "zbor 2h la IAS sau OTP", diasporaAngle: "comunitatea românească din Bavaria" },
  { code: "FRA", city: "Frankfurt", country: "Germania", countryCode: "DE", lang: "de", routeHint: "zbor direct la IAS", diasporaAngle: "diaspora din Hessen" },
  // Diaspora — France
  { code: "CDG", city: "Paris (CDG)", country: "Franța", countryCode: "FR", lang: "fr", routeHint: "zbor 3h la OTP + tren spre Neamț", diasporaAngle: "diaspora din Île-de-France" },
  // Hungary
  { code: "BUD", city: "Budapesta", country: "Ungaria", countryCode: "HU", lang: "hu", routeHint: "tren de noapte spre Iași sau Cluj", diasporaAngle: "vecinii noștri maghiari" },
];

// City-break origins beyond airports — e.g. domestic road trips.
export const CITY_BREAK_ORIGINS = [
  "București", "Brașov", "Cluj-Napoca", "Iași", "Suceava", "Bacău",
  "Galați", "Constanța", "Sibiu", "Oradea", "Chișinău", "Timișoara", "Craiova",
];

export function resolveOrigin(input: {
  airportCode?: string;
  city?: string;
  countryCode?: string;
}): OriginProfile | null {
  if (input.airportCode) {
    const hit = ORIGIN_PROFILES.find(
      (o) => o.code.toLowerCase() === input.airportCode!.toLowerCase(),
    );
    if (hit) return hit;
  }
  if (input.city) {
    const c = input.city.toLowerCase();
    const hit = ORIGIN_PROFILES.find((o) => o.city.toLowerCase().includes(c));
    if (hit) return hit;
  }
  if (input.countryCode) {
    const hit = ORIGIN_PROFILES.find(
      (o) => o.countryCode === input.countryCode!.toUpperCase(),
    );
    if (hit) return hit;
  }
  return null;
}
