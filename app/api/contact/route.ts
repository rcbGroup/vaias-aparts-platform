import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();
    if (!name || !message) {
      return NextResponse.json({ error: "Date incomplete" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const html = `
        <h2>Mesaj nou de contact — Vaias Aparts</h2>
        <p><strong>Nume:</strong> ${name}</p>
        ${email ? `<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>` : ""}
        ${phone ? `<p><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></p>` : ""}
        ${subject ? `<p><strong>Subiect:</strong> ${subject}</p>` : ""}
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "Vaias Aparts Website <noreply@vaiasaparts.ro>",
          to: ["contact@VaiasAparts.ro"],
          replyTo: email || undefined,
          subject: `Mesaj contact: ${name}${subject ? ` — ${subject}` : ""}`,
          html
        })
      }).catch(() => {});
    }

    const waToken = process.env.TWILIO_ACCOUNT_SID;
    if (waToken) {
      const msg = `📩 *Mesaj nou de contact*\n\n*Nume:* ${name}\n${phone ? `*Tel:* ${phone}\n` : ""}${email ? `*Email:* ${email}\n` : ""}${subject ? `*Subiect:* ${subject}\n` : ""}\n*Mesaj:*\n${message}`;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const from = process.env.TWILIO_WHATSAPP_FROM;
      const owner = process.env.OWNER_WHATSAPP || "+40738345330";
      const url = `https://api.twilio.com/2010-04-01/Accounts/${waToken}/Messages.json`;
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Basic " + Buffer.from(`${waToken}:${authToken}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ From: `whatsapp:${from}`, To: `whatsapp:${owner}`, Body: msg }).toString()
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }
}
