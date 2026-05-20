import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Central enquiry logger. Captures every enquiry (form, gallery, whatsapp click
 * context) so nothing is lost before the CRM is wired up. Persists a Lead row,
 * emails contact@vaiasaparts.ro, and pings both owner WhatsApp numbers.
 *
 * Body: { name, phone, email, message, apartment, source }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = (body.name ?? "").toString().trim();
    const phone = (body.phone ?? "").toString().trim();
    const email = (body.email ?? "").toString().trim();
    const message = (body.message ?? "").toString().trim();
    const apartment = (body.apartment ?? "").toString().trim();
    const source = (body.source ?? "website").toString().trim();
    const createdAt = new Date().toISOString();

    if (!name && !phone && !email && !message) {
      return NextResponse.json({ error: "Date incomplete" }, { status: 400 });
    }

    const notes = [
      apartment ? `Apartament: ${apartment}` : "",
      message ? `Mesaj: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    // Persist to DB (non-fatal — email is the durable fallback).
    try {
      await prisma.lead.create({
        data: {
          name: name || null,
          email: email || null,
          phone: phone || null,
          source: `enquiry:${source}`,
          notes: notes || null,
        },
      });
    } catch (dbErr) {
      console.error("Enquiry DB save error (non-fatal):", dbErr);
    }

    // Email to contact@vaiasaparts.ro — durable record for later CRM import.
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const html = `
        <h2>Cerere nouă — Vaias Aparts</h2>
        <p><strong>Sursă:</strong> ${source}</p>
        ${apartment ? `<p><strong>Apartament:</strong> ${apartment}</p>` : ""}
        <p><strong>Nume:</strong> ${name || "—"}</p>
        ${phone ? `<p><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></p>` : ""}
        ${email ? `<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>` : ""}
        ${message ? `<p><strong>Mesaj:</strong><br>${message.replace(/\n/g, "<br>")}</p>` : ""}
        <p style="color:#888;font-size:12px">${createdAt}</p>
      `;
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Vaias Aparts Website <noreply@vaiasaparts.ro>",
          to: ["contact@vaiasaparts.ro"],
          replyTo: email || undefined,
          subject: `Cerere nouă${apartment ? ` — ${apartment}` : ""}: ${name || phone || email}`,
          html,
        }),
      }).catch(() => {});
    }

    // Notify both owner WhatsApp numbers (Vasi primary, Anca secondary).
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_WHATSAPP_FROM;
    if (sid && authToken && from) {
      const msg = `🏡 *Cerere nouă — Vaias Aparts*\n*Sursă:* ${source}\n${apartment ? `*Apartament:* ${apartment}\n` : ""}*Nume:* ${name || "—"}\n${phone ? `*Tel:* ${phone}\n` : ""}${email ? `*Email:* ${email}\n` : ""}${message ? `\n${message}` : ""}`;
      const recipients = ["+40752388388", "+40738345330"];
      const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
      await Promise.all(
        recipients.map((to) =>
          fetch(url, {
            method: "POST",
            headers: {
              Authorization: "Basic " + Buffer.from(`${sid}:${authToken}`).toString("base64"),
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ From: `whatsapp:${from}`, To: `whatsapp:${to}`, Body: msg }).toString(),
          }).catch(() => {})
        )
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }
}
