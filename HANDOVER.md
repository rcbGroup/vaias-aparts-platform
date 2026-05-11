# VAIA Platform v2 — Handover Document

**Built:** May 2026  
**Platform:** Vila Vaias Aparts — VAIA Distribution Autopilot  
**Status:** ✅ Live in production

---

## Live URLs

| Environment | URL |
|-------------|-----|
| **Production** | https://www.vaiasaparts.ro |
| **Admin Dashboard** | https://www.vaiasaparts.ro/admin |
| **GitHub Repository** | https://github.com/rcbGroup/vaias-aparts-platform |

---

## Admin Credentials

| Field | Value |
|-------|-------|
| Email | vaiasaparts@gmail.com |
| Password | VaiasAdmin2026! |
| Admin URL | /admin |

---

## What Was Built

### Module 1 — Public Website
- Homepage with real villa hero image (from vaiasaparts.ro), 7-apartment grid, ecosystem pillars, trust bar (97 Google reviews, 9.4 Booking.com)
- 7 apartment pages with **real property photos** from vaiasaparts.ro (96 photos total)
- Correct apartment data: AC only in Apt 5 & 6, Apt 7 uses Kitchen for All (not private kitchen), all Emperor beds 2m×2m, correct floor assignments
- Han Rustic page (/han-rustic) — cinematic coming-soon with reservation form
- Experiente page (/experiente) — three ecosystem pillars (Vila, Lake, Restaurant)
- Blog with 10 published articles, Zone turistice, Galerie, Recenzii, Despre noi, Contact pages
- GDPR-compliant legal pages, Diaspora + Pelerini audience landing pages

### Module 2 — AI Guest Chat
- **Files:** `components/ChatWidget.tsx` + `app/api/chat/route.ts`
- OpenAI GPT-4o powered chat widget (fixed bottom-right)
- Multilingual: Romanian, English, German, French, Italian, Spanish, Hungarian (auto-detect)
- Full property knowledge encoded in system prompt — correct apartment facts
- Lead capture after 3 messages (name/email/phone → `/api/chat/leads`)
- SSE streaming for real-time responses
- **Requires:** `OPENAI_API_KEY` env var

### Module 3 — Booking Engine
- **Files:** `app/rezervare/page.tsx` + `app/api/booking/route.ts`
- Discount tiers: 1 night standard, 2-3 nights 10%, 4-6 nights 15%, 7+ nights 25%
- iCal sync configuration via FIVESTARDESK_ICAL_APT1-7 env vars
- **Requires:** Netopia or Stripe credentials (see env vars below)

### Module 4 — VAIA Distribution Autopilot
- **Admin path:** `/admin/autopilot`
- **7 AI Agents** powered by OpenAI GPT-4o with safety constraints:
  1. Distribution Manager — strategy and prioritization
  2. Platform Audit Agent — inspect platforms, report only, never change anything
  3. Platform Setup Agent — prepare safe draft content only
  4. SEO & Translation Agent — multilingual accommodation copy (RO/EN/DE/FR/IT/ES/HU)
  5. Outreach Agent — travel agency and diaspora outreach emails
  6. QA Safety Agent — verify all content before going live
  7. Weekly Reporting Agent — weekly summary reports
- **Platform Tracker** — 24 platforms (Booking.com through Google Hotels) with inline edit
- **Approval Queue** — risk-based workflow (Medium/High risk requires owner approval)
- **API:** `app/api/admin/autopilot/route.ts`

### Module 5 — Guest Messaging
- **File:** `lib/notifications.ts`
- Templates for all automation triggers
- Twilio WhatsApp + Resend email delivery
- **Requires:** TWILIO_* and RESEND_API_KEY env vars

### Other Features Built
- Google Analytics 4, Meta Pixel, schema.org LodgingBusiness structured data in layout
- Prisma ORM with PostgreSQL schema (19 models including CRM, Affiliate, Experience, Blog, etc.)
- Admin: CRM, Blog management, Affiliate management, Restaurant partners with QR codes
- Newsletter subscription API
- Contact form API

---

## Environment Variables — Complete Setup Guide

Add these in Vercel: Dashboard → Project → Settings → Environment Variables

```bash
# DATABASE (Supabase)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
# Get from: https://supabase.com → Project Settings → Database → Connection String

# NEXTAUTH
NEXTAUTH_SECRET="[generate: openssl rand -base64 32]"
NEXTAUTH_URL="https://www.vaiasaparts.ro"

# OPENAI (required for AI Chat widget + all 7 Distribution Autopilot agents)
OPENAI_API_KEY="sk-..."
# Get from: https://platform.openai.com/api-keys

# STRIPE
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
# Get from: https://dashboard.stripe.com/apikeys

# NETOPIA (primary payment processor for Romania)
NETOPIA_API_KEY="..."
NETOPIA_MERCHANT_ID="..."
NETOPIA_PUBLIC_KEY="..."
NETOPIA_PRIVATE_KEY="..."
NETOPIA_SANDBOX="false"
# Get from: https://netopia-payments.com → Account → API Credentials

# TWILIO (WhatsApp & SMS guest messaging)
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="..."
TWILIO_WHATSAPP_FROM="whatsapp:+40738345330"
TWILIO_SMS_FROM="+40738345330"
OWNER_WHATSAPP="+40738345330"
# Get from: https://console.twilio.com

# RESEND (transactional email)
RESEND_API_KEY="re_..."
EMAIL_FROM="Vaias Aparts <contact@vaiasaparts.ro>"
OWNER_EMAIL="contact@VaiasAparts.ro"
# Get from: https://resend.com/api-keys

# 5STARDESK iCal sync (get from 5stardesk.net → Settings → Calendar → iCal Export)
FIVESTARDESK_ICAL_APT1="https://5stardesk.net/ical/APARTMENT_1_TOKEN"
FIVESTARDESK_ICAL_APT2="https://5stardesk.net/ical/APARTMENT_2_TOKEN"
FIVESTARDESK_ICAL_APT3="https://5stardesk.net/ical/APARTMENT_3_TOKEN"
FIVESTARDESK_ICAL_APT4="https://5stardesk.net/ical/APARTMENT_4_TOKEN"
FIVESTARDESK_ICAL_APT5="https://5stardesk.net/ical/APARTMENT_5_TOKEN"
FIVESTARDESK_ICAL_APT6="https://5stardesk.net/ical/APARTMENT_6_TOKEN"
FIVESTARDESK_ICAL_APT7="https://5stardesk.net/ical/APARTMENT_7_TOKEN"

# Google APIs
GOOGLE_BUSINESS_API_KEY="..."
GOOGLE_PLACE_ID="ChIJ..."
BOOKING_COM_HOTEL_ID="25248068"

# Analytics (all NEXT_PUBLIC_ vars must be set in Vercel too)
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"
NEXT_PUBLIC_META_PIXEL_ID="XXXXXXXXXXXXXXXX"
NEXT_PUBLIC_CLARITY_ID="XXXXXXXXXX"
NEXT_PUBLIC_SITE_URL="https://www.vaiasaparts.ro"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."

# Admin
ADMIN_EMAIL="vaiasaparts@gmail.com"
ADMIN_PASSWORD="VaiasAdmin2026!"
ADMIN_SESSION_SECRET="[generate: openssl rand -base64 32]"

# Property constants
PROPERTY_NAME="Vila Vaias Aparts"
PROPERTY_PHONE_1="+40738345330"
PROPERTY_PHONE_2="+40752388388"
PROPERTY_EMAIL="contact@VaiasAparts.ro"

# Cron
CRON_SECRET="[generate: openssl rand -base64 32]"
```

---

## 5StarDesk iCal Configuration

1. Log into 5stardesk.net with your credentials
2. Go to Settings → Calendar Sync → iCal Export
3. Find the iCal URL for each of the 7 apartments
4. Copy each URL into the corresponding Vercel environment variable (FIVESTARDESK_ICAL_APT1 through 7)
5. Sync runs automatically on the `/api/cron/ical-sync` endpoint

---

## Netopia Payments Integration

1. Create merchant account at https://netopia-payments.com
2. Go to Account Settings → API Credentials
3. Copy Merchant ID, API Key, Public Key, Private Key → Vercel env vars
4. Set NETOPIA_SANDBOX="false" for production
5. Configure webhook URL in Netopia dashboard: `https://www.vaiasaparts.ro/api/webhooks/netopia`

---

## Database Setup (Supabase)

1. Create project at https://supabase.com
2. Project Settings → Database → Connection String
3. Copy the Connection Pooling URL (with pgbouncer=true) → DATABASE_URL
4. Copy the Direct Connection URL → DIRECT_URL
5. Schema auto-deploys on Vercel build via `prisma db push`

Manual schema push (from local, with real DATABASE_URL in .env.local):
```bash
npx prisma db push
```

---

## Twilio WhatsApp Business Activation

1. Create account at https://console.twilio.com
2. Messaging → Try WhatsApp → Get Started
3. Request WhatsApp Business Profile approval for +40738345330
4. Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN to Vercel env vars
5. Test in sandbox before going live

---

## DNS Configuration (www.vaiasaparts.ro → Vercel)

1. In Vercel: Project → Settings → Domains → Add `www.vaiasaparts.ro` and `vaiasaparts.ro`
2. In your DNS registrar:
   - CNAME: `www` → `cname.vercel-dns.com`
   - A record: `@` → `76.76.21.21`
3. Wait up to 24 hours for DNS propagation
4. Update NEXT_PUBLIC_SITE_URL and NEXTAUTH_URL to `https://www.vaiasaparts.ro`

---

## Photography Gap Analysis

**Available:** 96 real property photos used throughout the platform

| Apartment | Photos | Status |
|-----------|--------|--------|
| Apartament 1 | 19 | ✅ Excellent |
| Apartament 2 | 14 | ✅ Good |
| Apartament 3 | 17 | ✅ Excellent |
| Apartament 4 | 10 | ✅ Good |
| Apartament 5 | 17 | ✅ Excellent |
| Apartament 6 | 11 | ⚠️ Missing _01 hero photo |
| Apartament 7 | 6 | ⚠️ Only social media photos, needs professional shoot |

**Priority gaps:**
- Apartament 6: missing first photo (_01) — needs to be shot
- Apartament 7: needs professional photography session
- Kitchen for All (shared kitchen) — no dedicated photos
- Salt-water hot tub — no photos
- BBQ grill courtyard — no photos
- Villa exterior at different times of day — limited
- Han Rustic restaurant — needs professional photos for launch

---

## 90-Day Post-Launch Marketing Plan

### Month 1: Technical Foundation + SEO

**Week 1:** Analytics & tracking setup
- Configure GA4 events, Meta Pixel custom events, Clarity heatmaps
- Verify all 7 apartments correct on Booking.com (use Agent 2 — Platform Audit)
- Submit sitemap to Google Search Console

**Week 2:** Content SEO launch
- Publish 4 blog articles targeting primary Romanian keywords
- Google My Business: weekly posts, add photos
- Use Agent 4 to create EN/DE descriptions for all 7 apartments

**Week 3:** Distribution expansion
- Use Agent 3 (Platform Setup) to prepare Airbnb content
- Run Agent 6 (QA Safety) on all content before submission
- Submit to Google Free Booking Links (Hotel Center)

**Week 4:** Romanian market platforms
- Set up Travelminit.ro listing
- Apply to Pensiuni.ro and Cazare.ro
- Apply for vacation voucher acceptance: Pluxee, Up Romania, Edenred

### Month 2: Paid Acquisition + Diaspora Outreach

**Week 5-6:** Google Ads launch
- Search campaigns: "cazare Targu Neamt", "apartamente Neamt", "cazare langa manastiri"
- Google Hotel Ads activation
- Retargeting campaigns for site visitors

**Week 7-8:** Meta Ads + diaspora
- Facebook campaigns targeting Romanians in Italy, Spain, UK, Germany (age 30-60)
- Use Agent 5 (Outreach) to write 20 emails for Romanian Orthodox parishes abroad
- Send outreach to Romanian community associations in diaspora cities

### Month 3: Niche Markets + Review Generation

**Week 9-10:** Religious tourism
- Use Agent 5 for pilgrimage operator outreach (Romania + Greece/Cyprus Orthodox)
- Contact Jewish heritage tour operators (Neamt region has significant history)
- Optimize /pelerini landing page with Agent 4 translations

**Week 11-12:** Corporate + review strategy
- Corporate retreat operator outreach via Agent 5
- Send WhatsApp review requests to all 2026 guests who haven't left reviews
- Target 120+ Google reviews by end of quarter

**Ongoing monthly:**
- Weekly Report from Agent 7 every Monday
- Monthly Platform Audit from Agent 2
- 4 blog posts/month (SEO content calendar)
- WhatsApp broadcasts for Romanian holidays:
  - 1 Martie (Mărțișor)
  - Easter (2-3 days before)
  - 1 Iunie (Children's Day)
  - 15 August (Adormirea Maicii Domnului)
  - 30 Noiembrie (Sf. Andrei)
  - 1 Decembrie (National Day)
  - Christmas (Dec 24-25)

---

## Company Legal Details

| Field | Value |
|-------|-------|
| Property | Vila Vaias Aparts |
| Company | Vaia Rustic SRL |
| CUI | 36258605 |
| Classification | Certificate 35332, dated 20.07.2023 |
| Address | Strada Sfântul Lazăr Nr. 1, Târgu Neamț, jud. Neamț, România, 615200 |
| Primary phone | +40 738 345 330 |
| Secondary phone | +40 752 388 388 |
| WhatsApp | https://wa.me/40738345330 |
| Email | contact@VaiasAparts.ro |
| Admin email | vaiasaparts@gmail.com |
| Facebook | https://www.facebook.com/VaiasAparts |
| YouTube | https://www.youtube.com/@VaiasAparts/videos |
| Original site | https://www.vaiasaparts.ro |
| Booking.com | https://www.booking.com/hotel/ro/vaias-aparts-targu-neamt.html (score: 9.4) |
| Google Reviews | 97 reviews at 5.0 stars |

---

*Built autonomously by Claude Code (Anthropic) — May 2026*  
*For: Vasi (Vaia Rustic SRL / Rankitt)*
