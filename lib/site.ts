/**
 * Shared site-wide contact + booking constants.
 *
 * Phone owners (confirmed): +40 752 388 388 = Vasi (primary),
 * +40 738 345 330 = Anca (secondary). Both receive enquiries.
 */

/** 5StarDesk direct-booking engine — branded to match Vaias. Same URL the
 * original vaiasaparts.ro used. Every "Rezervă acum / Verifică disponibilitate"
 * CTA points here (never Booking.com/Airbnb for the main CTA). */
export const BOOKING_URL = "https://www.5stardesk.net/b/vaias-aparts";

export const WHATSAPP_PRIMARY = "40752388388"; // Vasi
export const WHATSAPP_SECONDARY = "40738345330"; // Anca
export const PHONE_PRIMARY_DISPLAY = "+40 752 388 388"; // Vasi
export const PHONE_SECONDARY_DISPLAY = "+40 738 345 330"; // Anca
export const CONTACT_EMAIL = "contact@vaiasaparts.ro";

export function whatsappLink(text: string, number: string = WHATSAPP_PRIMARY): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
