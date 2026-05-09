const OWNER_WHATSAPP = process.env.OWNER_WHATSAPP || "+40738345330";
const OWNER_EMAIL = process.env.OWNER_EMAIL || "contact@VaiasAparts.ro";

export type BookingNotification = {
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  apartment: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalEUR: number;
  specialRequests?: string;
};

export async function sendOwnerWhatsApp(data: BookingNotification): Promise<boolean> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;

  if (!accountSid || !authToken || !from) return false;

  const msg = [
    `🏨 *CERERE REZERVARE NOUĂ*`,
    ``,
    `*Oaspete:* ${data.guestName}`,
    `*Telefon:* ${data.guestPhone}`,
    data.guestEmail ? `*Email:* ${data.guestEmail}` : null,
    ``,
    `*Apartament:* ${data.apartment}`,
    `*Check-in:* ${data.checkIn}`,
    `*Check-out:* ${data.checkOut}`,
    `*Nopți:* ${data.nights}`,
    `*Oaspeți:* ${data.guests}`,
    `*Total estimativ:* €${data.totalEUR}`,
    data.specialRequests ? `\n*Cerințe speciale:*\n${data.specialRequests}` : null,
    ``,
    `_Echipa Vaias Aparts_`
  ].filter(Boolean).join("\n");

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const body = new URLSearchParams({
      From: `whatsapp:${from}`,
      To: `whatsapp:${OWNER_WHATSAPP}`,
      Body: msg
    });

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body.toString()
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function sendOwnerEmail(data: BookingNotification): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#1a2820">🏨 Cerere rezervare nouă — Vaias Aparts</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Oaspete</td><td style="padding:8px;border-bottom:1px solid #eee">${data.guestName}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="tel:${data.guestPhone}">${data.guestPhone}</a></td></tr>
        ${data.guestEmail ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${data.guestEmail}">${data.guestEmail}</a></td></tr>` : ""}
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Apartament</td><td style="padding:8px;border-bottom:1px solid #eee">${data.apartment}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Check-in</td><td style="padding:8px;border-bottom:1px solid #eee">${data.checkIn}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Check-out</td><td style="padding:8px;border-bottom:1px solid #eee">${data.checkOut}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Nopți</td><td style="padding:8px;border-bottom:1px solid #eee">${data.nights}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Oaspeți</td><td style="padding:8px;border-bottom:1px solid #eee">${data.guests}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Total estimativ</td><td style="padding:8px;border-bottom:1px solid #eee;font-size:1.2em;color:#8c5832">€${data.totalEUR}</td></tr>
        ${data.specialRequests ? `<tr><td style="padding:8px;font-weight:bold">Cerințe speciale</td><td style="padding:8px">${data.specialRequests}</td></tr>` : ""}
      </table>
      <div style="margin-top:24px;padding:16px;background:#f5f3ee;border-radius:8px">
        <a href="https://wa.me/${data.guestPhone?.replace(/[^0-9]/g, "")}" style="background:#25D366;color:white;padding:10px 20px;border-radius:20px;text-decoration:none;font-weight:bold">
          Răspunde pe WhatsApp
        </a>
      </div>
      <p style="color:#888;font-size:12px;margin-top:24px">Vaias Aparts · Strada Sfântul Lazăr Nr. 1, Târgu Neamț</p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Vaias Aparts <noreply@vaiasaparts.ro>",
        to: [OWNER_EMAIL],
        subject: `🏨 Rezervare nouă: ${data.guestName} — ${data.apartment} (${data.checkIn})`,
        html
      })
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function sendGuestConfirmationEmail(
  guestEmail: string,
  data: BookingNotification
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !guestEmail) return false;

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#1a2820;padding:32px;text-align:center;border-radius:12px 12px 0 0">
        <h1 style="color:#faf6e9;font-family:Georgia,serif;margin:0">Vaias Aparts</h1>
        <p style="color:#c4d0c6;margin:8px 0 0">Boutique · Târgu Neamț</p>
      </div>
      <div style="background:#fdfcf7;padding:32px;border:1px solid #e8e3d8;border-top:0;border-radius:0 0 12px 12px">
        <h2 style="color:#1a2820">Cererea dvs. a fost primită!</h2>
        <p style="color:#555">Dragă ${data.guestName},</p>
        <p style="color:#555">Vă mulțumim pentru cererea de rezervare. O vom verifica și vă vom contacta în maxim 4 ore pentru confirmare.</p>

        <div style="background:#f5f3ee;padding:20px;border-radius:8px;margin:20px 0">
          <h3 style="margin:0 0 12px;color:#1a2820">Detalii rezervare</h3>
          <p style="margin:4px 0"><strong>Apartament:</strong> ${data.apartment}</p>
          <p style="margin:4px 0"><strong>Check-in:</strong> ${data.checkIn} (după ora 14:00)</p>
          <p style="margin:4px 0"><strong>Check-out:</strong> ${data.checkOut} (până la ora 11:00)</p>
          <p style="margin:4px 0"><strong>Nopți:</strong> ${data.nights}</p>
          <p style="margin:4px 0"><strong>Oaspeți:</strong> ${data.guests}</p>
          <p style="margin:8px 0 0;font-size:1.1em"><strong>Total estimativ: €${data.totalEUR}</strong></p>
        </div>

        <p style="color:#555">Dacă aveți întrebări, ne puteți contacta oricând:</p>
        <p style="margin:4px 0"><strong>Tel/WhatsApp:</strong> <a href="tel:+40738345330">+40 738 345 330</a></p>
        <p style="margin:4px 0"><strong>Email:</strong> <a href="mailto:contact@VaiasAparts.ro">contact@VaiasAparts.ro</a></p>

        <p style="color:#555;margin-top:24px">Cu drag,<br><strong>Echipa Vaias Aparts</strong></p>
      </div>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Vaias Aparts <contact@vaiasaparts.ro>",
        to: [guestEmail],
        subject: `Cerere de rezervare primită — ${data.apartment}`,
        html
      })
    });
    return res.ok;
  } catch {
    return false;
  }
}
