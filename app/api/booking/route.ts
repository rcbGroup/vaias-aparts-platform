import { NextRequest, NextResponse } from "next/server";
import { sendOwnerWhatsApp, sendOwnerEmail, sendGuestConfirmationEmail } from "@/lib/notifications";
import { prisma } from "@/lib/prisma";

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

    // Persist to database (graceful — doesn't break if DB is unavailable)
    let bookingRef: string | null = null;
    try {
      const apartment = apartmentSlug
        ? await prisma.apartment.findUnique({ where: { slug: apartmentSlug } })
        : null;

      const [firstName, ...rest] = guestName.trim().split(" ");
      const lastName = rest.join(" ") || firstName;

      let guest = await prisma.guest.findFirst({ where: { phone: guestPhone } });
      if (!guest) {
        guest = await prisma.guest.create({
          data: { firstName, lastName, phone: guestPhone, email: guestEmail ?? null, visits: 1 }
        });
      } else {
        await prisma.guest.update({
          where: { id: guest.id },
          data: { visits: { increment: 1 }, lastVisit: new Date() }
        });
      }

      if (apartment) {
        const pricePerNight = apartment.priceRON / 5;
        const totalRON = apartment.priceRON * Number(nights);
        const finalEUR = Number(totalEUR) || Math.round(totalRON / 5);

        const booking = await prisma.booking.create({
          data: {
            apartmentId: apartment.id,
            guestId: guest.id,
            guestName,
            guestEmail: guestEmail ?? null,
            guestPhone,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            nights: Number(nights),
            adults: Number(guests),
            pricePerNight,
            totalPrice: finalEUR,
            finalPrice: finalEUR,
            currency: "EUR",
            source: "direct",
            specialRequests: specialRequests ?? null,
            status: "PENDING"
          }
        });
        bookingRef = booking.bookingRef;

        // Log message sent to owner
        await prisma.guestMessage.create({
          data: {
            bookingId: booking.id,
            guestId: guest.id,
            direction: "OUTBOUND",
            channel: "whatsapp",
            content: `Cerere rezervare: ${apartmentName}, ${checkIn}–${checkOut}`,
            delivered: waSent.status === "fulfilled" ? Boolean(waSent.value) : false,
          }
        });
      }
    } catch (dbErr) {
      console.error("DB save error (non-fatal):", dbErr);
    }

    return NextResponse.json({
      ok: true,
      bookingRef,
      whatsapp: waSent.status === "fulfilled" ? waSent.value : false,
      email: emailSent.status === "fulfilled" ? emailSent.value : false
    });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }
}
