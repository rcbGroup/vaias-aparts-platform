// VERIFIED REVIEW DATA — only use figures confirmed from real platforms
// Google: 99 reviews, 5.0 stars (owner-confirmed May 2026)
// Booking.com: 9.4 score (verified)
// Do NOT add review quotes, names, or counts that are not verified from official sources

export type PlatformBadge = {
  platform: "Google" | "Booking.com" | "TripAdvisor" | "Airbnb";
  score: number;
  maxScore: number;
  reviewCount?: number;
  label: string;
  url: string;
};

export type GuestHighlight = {
  theme: string;
  icon: string;
  titleRO: string;
  descriptionRO: string;
};

// Verified platform badges — sourced from real platforms only
export const platformBadges: PlatformBadge[] = [
  {
    platform: "Google",
    score: 5.0,
    maxScore: 5.0,
    reviewCount: 99,
    label: "99 recenzii · 5.0 ★",
    url: "https://share.google/iFsW4iUjwIDgkgwZm"
  },
  {
    platform: "Booking.com",
    score: 9.4,
    maxScore: 10,
    label: "Scor 9.4 / 10",
    url: "https://www.booking.com/hotel/ro/vaias-aparts-targu-neamt.html"
  }
];

// Guest experience themes — based on property characteristics, NOT invented testimonials
// Use these as benefit cards, not fake quotes
export const guestHighlights: GuestHighlight[] = [
  {
    theme: "curatenie",
    icon: "✨",
    titleRO: "Curățenie impecabilă",
    descriptionRO: "Lenjerie de bumbac fin, prosoape curate, apartament pregătit cu atenție pentru fiecare oaspete."
  },
  {
    theme: "locatie",
    icon: "📍",
    titleRO: "Locație ultracentrală",
    descriptionRO: "În inima Târgu Neamț, la câteva minute de Cetatea Neamțului, Agapia, Văratec și Ceahlău."
  },
  {
    theme: "parcare",
    icon: "🚗",
    titleRO: "Parcare gratuită",
    descriptionRO: "Parcare privată în curtea vilei — fără grija locului de parcare."
  },
  {
    theme: "liniste",
    icon: "🌿",
    titleRO: "Liniște și intimitate",
    descriptionRO: "7 apartamente independente, fără recepție, fără zgomot de hotel. Confort autentic de acasă."
  },
  {
    theme: "pat",
    icon: "🛏️",
    titleRO: "Pat Emperor 2m×2m",
    descriptionRO: "Fiecare apartament are pat Emperor de 2m×2m — cel mai mare pat standard, pentru un somn perfect."
  },
  {
    theme: "animale",
    icon: "🐾",
    titleRO: "Animale acceptate",
    descriptionRO: "Animalele de companie sunt binevenite la cerere, fără cost suplimentar, în toate apartamentele."
  }
];

// Legacy export for backward compatibility — empty, no invented reviews
export type Review = {
  name: string;
  city: string;
  date: string;
  rating: number;
  apartment?: string;
  text: string;
  source: "Google" | "TripAdvisor" | "Booking" | "Direct";
  platform?: string;
};

export const reviews: Review[] = [];
