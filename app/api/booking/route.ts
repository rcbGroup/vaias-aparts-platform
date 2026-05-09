import { NextRequest, NextResponse } from "next/server";
import { sendOwnerWhatsApp, sendOwnerEmail, sendGuestConfirmationEmail } from "@/lib/notifications";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      apartmentName,
      apartmentSlug,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      nights,
      guests,
      totalEUR,
      specialRequests
    } = body;

    if (!guestName || !guestPhone || !apartmentName || !checkIn || !checkOut) {
      return NextResponse.json({ error: "Date incomplete" }, { status: 400 });
    }

    const notifData = {
      guestName,
      guestPhone,
      guestEmail,
      apartment: apartmentName,
      checkIn,
      checkOut,
      nights: Number(nights),
      guests: Number(guests),
      totalEUR: Number(totalEUR),
      specialRequests
    };

    const [waSent, emailSent] = await Promise.allSettled([
      sendOwnerWhatsApp(notifData),
      sendOwnerEmail(notifData)
    ]);

    if (guestEmail) {
      sendGuestConfirmationEmail(guestEmail, notifData).catch(() => {});
    }

    return NextResponse.json({
      ok: true,
      whatsapp: waSent.status === "fulfilled" ? waSent.value : false,
      email: emailSent.status === "fulfilled" ? emailSent.value : false
    });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }
}
