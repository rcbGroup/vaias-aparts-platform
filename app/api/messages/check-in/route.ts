import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { buildCheckInMessage, type Language } from "@/lib/check-in-message";
import { prisma } from "@/lib/prisma";

const PayloadSchema = z.object({
  guestName: z.string().min(1).max(120),
  apartmentSlug: z.string().regex(/^apartament-[1-7]$/),
  checkIn: z.string().min(8),
  checkOut: z.string().min(8),
  adults: z.number().int().min(1).max(10),
  children: z.number().int().min(0).max(10).optional(),
  phonePrefix: z.string().max(8).optional(),
  guestPhone: z.string().max(32).optional(),
  guestEmail: z.string().email().optional(),
  bookingRef: z.string().max(80).optional(),
  source: z
    .enum(["direct", "booking.com", "airbnb", "expedia", "vrbo", "5stardesk", "other"])
    .optional(),
  language: z.enum(["ro", "en", "fr", "de"]).optional(),
  persist: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON invalid" }, { status: 400 });
  }

  const parsed = PayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Date invalide", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const input = parsed.data;
  const checkInDate = new Date(input.checkIn);
  const checkOutDate = new Date(input.checkOut);
  if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
    return NextResponse.json({ error: "Date check-in/check-out invalide" }, { status: 400 });
  }
  if (checkOutDate.getTime() <= checkInDate.getTime()) {
    return NextResponse.json(
      { error: "Check-out trebuie să fie după check-in" },
      { status: 400 }
    );
  }

  let result;
  try {
    result = buildCheckInMessage({
      guestName: input.guestName,
      apartmentSlug: input.apartmentSlug,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      adults: input.adults,
      children: input.children,
      phonePrefix: input.phonePrefix,
      guestPhone: input.guestPhone,
      language: input.language as Language | undefined,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Eroare generare mesaj" },
      { status: 400 }
    );
  }

  // Optional persistence to MessageSent log
  if (input.persist) {
    try {
      await prisma.messageSent.create({
        data: {
          bookingRef: input.bookingRef,
          guestName: input.guestName,
          guestPhone: input.guestPhone,
          guestEmail: input.guestEmail,
          apartment: result.apartment,
          templateKey: "check-in",
          language: result.language,
          channel: "whatsapp",
          content: result.message,
          status: "drafted",
        },
      });
    } catch {
      // ignore log failures — message generation is the primary success
    }
  }

  return NextResponse.json({
    ok: true,
    language: result.language,
    apartment: result.apartment,
    nights: result.nights,
    cityTaxRON: result.cityTaxRON,
    message: result.message,
    metadata: result.metadata,
  });
}
