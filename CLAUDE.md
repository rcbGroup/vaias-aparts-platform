# CLAUDE.md — Vila Vaias Aparts (vaias-aparts-platform)

This file governs how Claude Code agents work in this repository.

## Fixed facts — never contradict these

- **Exactly 7 apartments (1–7).** There is no Apartment 8 and no "Han Maria".
- **Apartment 7 has a standard double bed** (about 2.00 × 1.60 m). Never call it "Emperor". Never write "all apartments / every apartment" in a way that implies 7.
- **Email signature:** "Cu respect, Echipa Vaias Aparts" — never a person's full name.
- **Operator:** Vaia Rustic SRL, CUI 36258605, J27/603/2016.
- **Guest address:** Str. Sfântul Lazăr nr. 1, Târgu Neamț 615200, jud. Neamț. This is the accommodation unit, not the registered office.
- **Classification:** 4 stele, certificate nr. 35332/20.07.2023.
- **Han Rustic:** under refurbishment, NOT open. Do not sell or book it as operating.
- **The lake and wellness programmes:** not confirmed as operating. Do not sell as operating.
- **Source of truth:** all prices, capacities, distances and confirmed amenities live in `lib/property-facts.ts` (to be created in WP2). Until then, use the existing data files but flag conflicts.

## DANGER rules — absolute

1. NEVER call `/api/cron/*`, `/api/booking`, `/api/contact`, `/api/enquiry`, `/api/newsletter`, `/api/messages*` or `/api/admin/*` on production or a preview deployment. Previews share the production database.
2. NEVER run `/api/admin/seed` or `prisma db push` against production.
3. No Prisma schema changes without owner approval and a named person to run `prisma db push`.
4. NEVER submit forms, send real messages, emails, SMS, WhatsApp or bookings in tests.
5. NEVER print or copy the gate code, WiFi passwords or IBAN — not in logs, PRs, commits or chat.
6. NEVER merge PR #3 (`design/brand-kit-v1`) or `claude/vigilant-meitner-94a0dc`. PR #3 adds false Emperor claims and unverified ratings. The other branch removes quiet-hours gates and would cause 24/7 guest messaging.

## What never goes in copy or schema

- `aggregateRating` in JSON-LD (self-published ratings earn no stars and may breach OUG 18/2026)
- "Emperor" bed for Apartment 7
- "Apartment 8" or "Han Maria"
- "#1 TripAdvisor" without a verified property listing URL and rank
- "cea mai bine notată" without a dated, sourced fact
- "garantat" or "guarantee" within 80 characters of a price
- "20% mai ieftin" or similar unverifiable comparative claims
- Composite reviews (authored to represent real reviews but not sourced from a specific platform post)
- CCTV, wheelchair accessibility, pets accepted, or Credit Card payment — until confirmed by owner
- Health claims (weight loss, diabetes control)

## Branch and PR rules

- Work on branches: `wo4/<pkg>-<slug>`. Never push to `main` directly.
- Keep PRs to 25 files or fewer.
- Commit message format: `WO4 <PKG>: <description>`
- All WO-4 work order files and the WORKLOG stay OUTSIDE the repo at `../WO-TEMP/`.

## Test runner

```
npm test   # node --import tsx --test "tests/**/*.test.ts"
```

Unit tests import pure modules only. They never import route files that import `@/lib/prisma`. Tests use obviously-fake values that don't match the secret-detection patterns.

## Unresolved as of WO-4 start (15 Oct 2026)

See `../WO-TEMP/WORKLOG-WO4.md` for the full status of all work packages and pending §8 decisions.
