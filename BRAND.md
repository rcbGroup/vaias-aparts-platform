# Vila Vaias Aparts — Brand File

Status: DRAFT v0.1 · FOR REVIEW (owner) · 10 Oct 2026 · Supersedes: none (first brand file)
Scope: www.vaiasaparts.ro, direct-booking funnel, guest messaging, social.
Hand this file to Claude at the start of any design, copy or front-end task.

## 1. Identity

- Name: **Vila Vaias Aparts** (short: Vaias Aparts; URL brand VaiasAparts.ro).
- What it is: a 7-apartment villa guesthouse with a lake and restaurant ecosystem, plus Han Rustic (coming soon).
- Audiences: Romanian families and couples; diaspora visiting home; pilgrims; small groups booking the whole villa; wellness retreats.
- Direct-booking first: every "Rezervă" CTA goes to the 5StarDesk engine (`BOOKING_URL` in `lib/site.ts`), never to Booking.com or Airbnb.
- Proof points (verify before each use): 97 Google reviews, Booking.com 9.4. Keep the counts current; never round up.

## 2. How it should feel

Rested. Warm. Unhurried. Honest.
Rustic-premium: natural materials, daylight, long serif headlines, generous white space, photographs that show the real rooms and the real view. Not a hotel chain, not a hostel.
Reference points (structure only): small Alpine and Tuscan guesthouse sites; the calm of a good spa booking page.

## 3. Colour

| Token | Hex | Use |
|---|---|---|
| forest-900 | #1F2E23 | Headlines, footer, dark overlays |
| forest-700 | #324C37 | Primary button fill, links on light |
| forest-500 | #4F7553 | Icons, secondary accents |
| walnut-500 | #A96F3E | Eyebrows, dividers, price accents |
| walnut-300 | #CDA77A | Walnut on dark backgrounds |
| cream-50 | #FDFCF7 | Page background |
| cream-100 | #FAF6E9 | Alternating section background |
| stone-200 | #DCD9D0 | Borders, dividers |
| stone-500 | #7E7464 | Muted text (min 16px) |
| whatsapp | #25D366 | WhatsApp button only |

Rules
- Forest is the structural colour (buttons, headlines); walnut is the accent (≤10% of a screen); cream is the canvas.
- Text on photos: cream-50 only on a forest-900 gradient overlay ≥55% at the text position. Never cream text directly on a bright photo.
- No new colours. Green WhatsApp pill is the only exception.
- Tailwind tokens already exist (`forest`, `walnut`, `cream`, `stone`). Do not add hex values in components.

## 4. Typography

- Display / headings: **Playfair Display** (variable, 500–700; italic 400 for pull quotes).
- Body / UI: **Inter** (variable, 400–600).
- Cormorant Garamond is **retired** (three faces was one too many). Any `font-serif` usage maps to Playfair Display italic.
- Loaded locally with `@fontsource-variable/playfair-display` and `@fontsource-variable/inter`. The Google Fonts `@import` in `globals.css` is removed (it blocks first paint).

Scale: H1 34 → 60px · H2 28 → 42px · H3 22 → 26px · Body 16 → 17px · Eyebrow 12px uppercase tracking 0.28em walnut-500.
Line length ≤70 characters. Romanian diacritics must render (Playfair and Inter both cover ă â î ș ț).

## 5. Logo

- Current: text wordmark in the header ("Vila Vaias Aparts" in Playfair). No graphic mark exists in the repo.
- NEEDS DECISION (owner): commission or generate a simple monoline mark (roof line + lake wave) in forest-700, 1-colour, usable at 24px. Until then the wordmark stands alone; never add clip-art.

## 6. Imagery

- Real property photographs only (`public/gallery`, `public/slideshow`, `public/villa-hero`). The `public/unsplash` folder is for placeholders during development and must not ship on public pages.
- Treatment: consistent warm grade across all 7 apartments (white balance ~5000K, mild contrast, no HDR halos). Crops: 16:10 for cards, 4:5 portrait for feature tiles, 21:9 for page heroes.
- Every hero image ≤250 KB (WebP/AVIF via `next/image`); the homepage LCP image uses `priority` and `sizes="100vw"`.
- Ken Burns only on desktop; static image on phones (battery and LCP).

## 7. Layout and spacing

- Container 1280px; gutters 20/32/40px. Section padding 80/112/128px (already in `.section`).
- Header ≤64px on phones including the contact bar; the two phone pills collapse into one "Sună" button and one WhatsApp button on screens <640px.
- Desktop nav: 7 items maximum. Everything else goes under "Descoperă" (dropdown) or the footer.
- Apartment cards: image, name, "Dormi X · Pat Y · Etaj Z", from-price, one button. Nothing else.
- Booking page: price summary sticky on desktop, bottom sheet on mobile; discount tiers (2–3 nights −10%, 4–6 −15%, 7+ −25%) always visible.

## 8. Components

- Primary button: forest-700 fill, cream-50 text, pill, uppercase tracking 0.18em (existing `.btn-primary`). Hero CTA may use the Magic UI ShimmerButton with a cream shimmer.
- Secondary: forest outline. On photos: cream outline (`.btn-outline-light`).
- Trust strip: Marquee of real review excerpts (name initial + platform + score). No invented reviews.
- Stats: NumberTicker for review count, score, apartments (7), beds. Source every figure in a code comment.
- Cards: cream-50 surface, stone-200 border, radius 16px, `shadow-card`. Hover: lift 2px.
- Icons: existing `AmenityIcon` set (lucide-style 1.5px). No emoji in UI (allowed in WhatsApp messages).
- Chat widget and MobileBookFab must not overlap: FAB bottom-left, chat bottom-right on phones.

## 9. Motion

- Allowed: BlurFade on scroll (existing `ScrollFade` is equivalent and stays), Marquee for reviews, NumberTicker, ShimmerButton on the hero CTA, Ken Burns on desktop hero.
- ≤3 moving elements per viewport. All respect `prefers-reduced-motion`.

## 10. Voice and copy

Romanian first (formal "dumneavoastră" in booking and legal, warm "tu" in blog and social). English, German and other languages via the existing i18n; translations are reviewed, never machine-only on the booking page.

Write with specifics
- Banned: "experiență unică", "locație de vis", "servicii de calitate", "cele mai bune prețuri", "relaxare totală", "oază de liniște", superlatives without a number.
- Replace with: what the guest gets (bed size 2×2 m, which apartments have air conditioning, kitchen access, parking count, distance to the lake in metres, check-in time).
- Prices always "de la X lei / noapte", VAT included, with the discount tiers next to them.
- CTAs: "Verifică disponibilitatea", "Rezervă direct", "Scrie-ne pe WhatsApp". Never "Află mai multe".
- Numbers in tables or on their own line. Max 6 sentences per paragraph.

## 11. Contacts (public)

+40 752 388 388 (Vasi, primary) · +40 738 345 330 (Anca) · contact@vaiasaparts.ro · WhatsApp on both numbers.

## 12. Family note

Separate brand from rcbGroup and Dwellinger. Shares the component kit, Inter body face, spacing scale and copy rules. Does not share colours or display face with rcbGroup.

## 13. Change control

Changes to sections 1, 3, 4 or 5 need the owner's approval and a version bump. Record what changed / what it affects / what does not change / what must update (site, booking engine branding, guest messages, social).
