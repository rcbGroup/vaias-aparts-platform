import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  if (!getAdminSession(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const channel = searchParams.get("channel");

  const where: Record<string, unknown> = {};
  if (channel && channel !== "ALL") where.channel = channel.toLowerCase();

  const messages = await prisma.guestMessage.findMany({
    where,
    include: {
      booking: { include: { apartment: true } },
      guest: true,
    },
    orderBy: { sentAt: "desc" },
    take: 100,
  });

  const data = messages.map((m) => ({
    id: m.id,
    guest: m.guest ? `${m.guest.firstName} ${m.guest.lastName}` : m.booking?.guestName ?? "—",
    phone: m.guest?.phone ?? m.booking?.guestPhone ?? "",
    apartment: m.booking?.apartment?.name ?? "—",
    channel: m.channel,
    direction: m.direction,
    content: m.content,
    sentAt: m.sentAt.toISOString(),
    delivered: m.delivered,
    read: m.read,
  }));

  // Filter by status approximation
  const filtered = status === "SENT"
    ? data.filter((m) => m.delivered)
    : status === "FAILED"
    ? data.filter((m) => !m.delivered)
    : data;

  return NextResponse.json({ messages: filtered, total: filtered.length });
}

export async function POST(req: NextRequest) {
  if (!getAdminSession(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const { bookingId, guestId, channel, content } = await req.json();

  if (!content || !channel) {
    return NextResponse.json({ error: "Conținut și canal obligatorii" }, { status: 400 });
  }

  // Get guest phone / email for sending
  let phone: string | null = null;
  let email: string | null = null;

  if (guestId) {
    const guest = await prisma.guest.findUnique({ where: { id: parseInt(guestId) } });
    phone = guest?.phone ?? null;
    email = guest?.email ?? null;
  } else if (bookingId) {
    const booking = await prisma.booking.findUnique({ where: { id: parseInt(bookingId) } });
    phone = booking?.guestPhone ?? null;
    email = booking?.guestEmail ?? null;
  }

  let delivered = false;
  const fullContent = `${content}\n\n— Echipa Vaias Aparts`;

  if (channel === "whatsapp" && phone) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_WHATSAPP_FROM;
    if (accountSid && authToken && from) {
      try {
        const res = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
          {
            method: "POST",
            headers: {
              Authorization: "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              From: `whatsapp:${from}`,
              To: `whatsapp:${phone}`,
              Body: fullContent,
            }).toString(),
          }
        );
        delivered = res.ok;
      } catch { /* silent */ }
    }
  } else if (channel === "email" && email) {
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "Vaias Aparts <contact@vaiasaparts.ro>",
            to: [email],
            subject: "Mesaj de la Vaias Aparts",
            text: fullContent,
          }),
        });
        delivered = res.ok;
      } catch { /* silent */ }
    }
  }

  // Log message in DB
  const msg = await prisma.guestMessage.create({
    data: {
      bookingId: bookingId ? parseInt(bookingId) : null,
      guestId: guestId ? parseInt(guestId) : null,
      direction: "OUTBOUND",
      channel,
      content: fullContent,
      delivered,
    },
  });

  return NextResponse.json({ ok: true, delivered, messageId: msg.id });
}
