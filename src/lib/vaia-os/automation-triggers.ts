export type VAIAScenario = 'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'I'|'J'|'K'|'L'|'M'|'N'|'O'|'P'|'Q'|'R'|'S'|'T'|'U'|'V'|'W'|'X'|'Y'|'Z'|'AA'|'AB'|'AC'|'AD'
export interface VAIATrigger { scenario: VAIAScenario; name: string; trigger: string; timingOffset: string; channel: 'whatsapp'|'email'|'sms'|'booking_platform'; language: 'auto'|'ro'|'ro+en'|'ro+en+country'; active: boolean }
export const VAIA_TRIGGERS: VAIATrigger[] = [
  { scenario: 'A', name: 'Booking confirmation — Booking.com / Airbnb', trigger: 'booking_received', timingOffset: 'immediate', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'B', name: 'Booking confirmation — direct booking', trigger: 'direct_booking_payment_confirmed', timingOffset: 'immediate', channel: 'email', language: 'auto', active: true },
  { scenario: 'C', name: 'Pre-arrival message — 7 days before', trigger: 'checkin_date', timingOffset: '-7 days', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'D', name: 'Pre-arrival message — 2 days before (arrival instructions)', trigger: 'checkin_date', timingOffset: '-2 days', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'E', name: 'Check-in day reminder (morning)', trigger: 'checkin_date', timingOffset: 'same day 09:00', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'F', name: 'Welcome message after check-in', trigger: 'checkin_completed', timingOffset: '+1 hour', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'G', name: 'WiFi and facility info', trigger: 'checkin_completed', timingOffset: '+2 hours', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'H', name: 'Mid-stay check-in (stays 3+ nights)', trigger: 'checkin_date', timingOffset: '+2 days', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'I', name: 'Restaurant / local area recommendation', trigger: 'checkin_completed', timingOffset: '+4 hours', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'J', name: 'City tax reminder / payment (where applicable)', trigger: 'checkin_completed', timingOffset: '+1 day', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'K', name: 'Check-out reminder (evening before)', trigger: 'checkout_date', timingOffset: '-1 day 20:00', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'L', name: 'Check-out day instructions', trigger: 'checkout_date', timingOffset: 'same day 08:00', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'M', name: 'Key return reminder (brown post box location)', trigger: 'checkout_date', timingOffset: 'same day 09:00', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'N', name: 'Departure thanks', trigger: 'checkout_completed', timingOffset: '+2 hours', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'O', name: 'Review request (primary) — Google + Booking.com', trigger: 'checkout_completed', timingOffset: '+6 hours', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'P', name: 'Review request (secondary) — Facebook + TripAdvisor', trigger: 'checkout_completed', timingOffset: '+2 days', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'Q', name: 'Tombola reminder (all 4 platforms review)', trigger: 'checkout_completed', timingOffset: '+4 days', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'R', name: 'Extended stay offer (last night of stay)', trigger: 'checkout_date', timingOffset: '-1 day', channel: 'whatsapp', language: 'auto', active: false },
  { scenario: 'S', name: 'Return booking offer (post-checkout)', trigger: 'checkout_completed', timingOffset: '+7 days', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'T', name: 'Re-engagement — past guest (90 days post-checkout)', trigger: 'checkout_completed', timingOffset: '+90 days', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'U', name: 'Re-engagement — no response (30 days after booking inquiry)', trigger: 'inquiry_no_booking', timingOffset: '+30 days', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'V', name: 'Birthday message (if date known in CRM)', trigger: 'guest_birthday', timingOffset: 'same day 09:00', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'W', name: 'Name day message (Romanian/Orthodox calendar)', trigger: 'guest_name_day', timingOffset: 'same day 09:00', channel: 'whatsapp', language: 'ro', active: true },
  { scenario: 'X', name: 'Christmas / New Year campaign', trigger: 'date_december_20', timingOffset: 'fixed: 20 Dec', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'Y', name: 'Easter / Spring campaign', trigger: 'date_easter_minus_14', timingOffset: '14 days before Easter', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'Z', name: 'Summer season opening (May)', trigger: 'date_may_01', timingOffset: 'fixed: 1 May', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'AA', name: 'City tax collection reminder', trigger: 'checkin_date', timingOffset: '+1 day 10:00', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'AB', name: 'Late check-in coordination (arrival after 20:00)', trigger: 'checkin_date', timingOffset: 'same day 17:00 (if late checkin flagged)', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'AC', name: 'Direct booking payment reminder', trigger: 'direct_booking_created', timingOffset: '+48 hours if unpaid', channel: 'whatsapp', language: 'auto', active: true },
  { scenario: 'AD', name: 'Tombola winner announcement (monthly draw)', trigger: 'monthly_cron_first_of_month', timingOffset: '1st of each month', channel: 'whatsapp', language: 'auto', active: true },
]

export const VAIA_CONSTANTS = {
  property_address: 'Str. Sfântul Lazăr nr. 1, Târgu Neamț, România, 615200',
  // gate_code: NEVER IN WRITING — verbal only
  wifi_network: 'Vaias Aparts',
  wifi_password: 'VaiasAparts',
  city_tax: '5 lei/adult/night',
  key_return_location: 'Brown metal post box, ground floor, next to Bucătăria pentru Toți, under Apartment 2',
  max_capacity: 28,
  apartment_count: 7,
  iban: 'RO56 RNCB 0199 1513 6887 0002',
  company: 'Vaia Rustic SRL',
  primary_contact: '+40 752 388 388 (Anca)',
  secondary_contact: '+40 738 345 330 (Vasi)',
  signature: 'Echipa Vaias Aparts',
  review_platforms: {
    google: 'https://g.page/r/[GOOGLE_REVIEW_LINK]',
    facebook: 'https://www.facebook.com/vaiasaparts/reviews',
    tripadvisor: 'https://www.tripadvisor.com/[LINK]',
    turist_info: 'https://www.turist.info/[LINK]',
    travelminit: 'https://www.travelminit.ro/[LINK]',
  },
  trust_scores: {
    booking_com: '9.4',
    google: '5.0',
    google_review_count: 99,
  },
}

export function detectLanguage(phone: string): string[] {
  if (phone.startsWith('+40') || phone.startsWith('0040')) return ['ro']
  const countryMap: Record<string, string> = {
    '+44': 'en',
    '+49': 'de',
    '+33': 'fr',
    '+39': 'it',
    '+34': 'es',
    '+31': 'nl',
    '+32': 'fr',
    '+43': 'de',
    '+41': 'de',
    '+972': 'he',
  }
  for (const [prefix, lang] of Object.entries(countryMap)) {
    if (phone.startsWith(prefix)) return lang === 'en' ? ['ro', 'en'] : ['ro', 'en', lang]
  }
  return ['ro', 'en']
}
