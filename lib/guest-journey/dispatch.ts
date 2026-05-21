/**
 * VAIA OS — Outbound channel dispatch (WhatsApp via Twilio, email via Resend).
 *
 * Single source of truth for the network calls that actually deliver a guest
 * message. Both the Guest Communication Agent and the Review Request Agent
 * call these so the Twilio/Resend wiring lives in exactly one place.
 *
 * These helpers are pure transport: they take a recipient + rendered body and
 * return an outcome. Idempotency, persistence, language stacking and the
 * banned-secret guard are the caller's responsibility.
 */

export type DispatchOutcome = {
  ok: boolean;
  providerId?: string;
  error?: string;
};

export async function sendWhatsApp(to: string, body: string): Promise<DispatchOutcome> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  if (!accountSid || !authToken || !from) {
    return { ok: false, error: "twilio credentials missing" };
  }
  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const params = new URLSearchParams({
      From: `whatsapp:${from}`,
      To: `whatsapp:${to}`,
      Body: body,
    });
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `twilio http ${res.status}: ${text.slice(0, 200)}` };
    }
    const json = (await res.json().catch(() => ({}))) as { sid?: string };
    return { ok: true, providerId: json.sid };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "fetch failed" };
  }
}

export async function sendEmail(
  to: string,
  subject: string,
  body: string,
): Promise<DispatchOutcome> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "resend api key missing" };
  try {
    const html = bodyToEmailHtml(body);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Vila Vaias Aparts <contact@vaiasaparts.ro>",
        to: [to],
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `resend http ${res.status}: ${text.slice(0, 200)}` };
    }
    const json = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, providerId: json.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "fetch failed" };
  }
}

/** Wrap a WhatsApp-style plaintext body (with *bold* markers) in branded HTML. */
export function bodyToEmailHtml(body: string): string {
  const escaped = body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const withBold = escaped.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");
  const withLineBreaks = withBold.replace(/\n/g, "<br/>");
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 640px; margin: 0 auto; background:#fdfcf7; padding:24px; border:1px solid #e8e3d8; border-radius:12px; color:#1a2820; line-height:1.55">
      ${withLineBreaks}
    </div>
  `;
}
