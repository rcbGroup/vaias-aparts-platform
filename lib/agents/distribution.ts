// Channel distribution helpers. Sending is gated by:
//  (a) the agent not being paused,
//  (b) per-channel env credentials being present.
//
// 24/7/365 — no quiet hours. The agent responds at any hour, instantly.
// Where credentials are missing we return a "skipped" result with the
// rendered message so the admin UI can still preview what would have gone
// out and operators can copy-send manually.

import { prisma } from "@/lib/prisma";
import type { CampaignChannel, CampaignDraft } from "./types";

export type DispatchResult = {
  channel: CampaignChannel;
  campaignId: string;
  status: "sent" | "queued" | "skipped" | "error";
  reason?: string;
  preview: string;
};

function maskKeyBoxCode(text: string): string {
  // Master prompt rule: never include the key-box code in outbound messages.
  // 0623# is the canonical value; mask any 4-digit + # sequence as a defence.
  return text.replace(/0623#/g, "[cod la check-in]").replace(/\b\d{4}#/g, "[cod la check-in]");
}

async function sendWhatsApp(to: string, body: string): Promise<boolean> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  if (!accountSid || !authToken || !from) return false;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const params = new URLSearchParams({
    From: `whatsapp:${from}`,
    To: `whatsapp:${to}`,
    Body: maskKeyBoxCode(body),
  });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Vaias Aparts <contact@vaiasaparts.ro>",
        to: [to],
        subject,
        html: maskKeyBoxCode(html),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function logMessage(channel: string, content: string, direction: "OUTBOUND" | "INBOUND" = "OUTBOUND"): Promise<void> {
  try {
    await prisma.guestMessage.create({
      data: { direction, channel, content: maskKeyBoxCode(content) },
    });
  } catch (err) {
    console.warn("[distribution] DB log failed:", err);
  }
}

export async function dispatchCampaign(
  campaign: CampaignDraft,
  options: { recipient?: string; lang?: "ro" | "en"; dryRun?: boolean } = {},
): Promise<DispatchResult> {
  const lang = options.lang ?? "ro";
  const messageRO = campaign.whatsappMessageRO || campaign.messageRO;
  const messageEN = campaign.whatsappMessageEN || campaign.messageEN;
  const body = lang === "ro" ? messageRO : messageEN;

  // 24/7/365 — quiet-hours gate intentionally removed per owner directive.

  if (options.dryRun) {
    return {
      channel: campaign.channel,
      campaignId: campaign.id,
      status: "queued",
      reason: "Dry-run preview only.",
      preview: body,
    };
  }

  if (campaign.channel === "whatsapp") {
    if (!options.recipient) {
      // Broadcast intent without a recipient — log for owner triage.
      await logMessage("whatsapp", `[BROADCAST DRAFT] ${body}`);
      return {
        channel: "whatsapp",
        campaignId: campaign.id,
        status: "queued",
        reason: "No recipient supplied — queued for owner approval.",
        preview: body,
      };
    }
    const ok = await sendWhatsApp(options.recipient, body);
    if (ok) await logMessage("whatsapp", body);
    return {
      channel: "whatsapp",
      campaignId: campaign.id,
      status: ok ? "sent" : "error",
      reason: ok ? undefined : "Twilio credentials missing or send failed.",
      preview: body,
    };
  }

  if (campaign.channel === "email") {
    if (!options.recipient) {
      await logMessage("email", `[BROADCAST DRAFT] ${body}`);
      return {
        channel: "email",
        campaignId: campaign.id,
        status: "queued",
        reason: "No recipient — queued for batch send.",
        preview: body,
      };
    }
    const ok = await sendEmail(
      options.recipient,
      `Vaias Aparts — ${campaign.type.replace("_", " ")}`,
      `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a2820"><p>${body.replace(/\n/g, "<br>")}</p></div>`,
    );
    return {
      channel: "email",
      campaignId: campaign.id,
      status: ok ? "sent" : "error",
      reason: ok ? undefined : "Resend credentials missing or send failed.",
      preview: body,
    };
  }

  // social / OTA channels are flagged for manual action (require human approval).
  await logMessage(
    campaign.channel,
    `[REQUIRES OWNER APPROVAL — ${campaign.channel}] ${body}`,
  );
  return {
    channel: campaign.channel,
    campaignId: campaign.id,
    status: "queued",
    reason: `Channel ${campaign.channel} requires owner approval before posting.`,
    preview: body,
  };
}

// Rate parity monitoring — best-effort. We can't crawl Booking/Airbnb without
// integrations, so we expose a "parity check" record the operator updates.
export type ParityCheck = {
  channel: "booking_com" | "airbnb";
  apartmentSlug: string;
  externalPriceRON: number | null;
  directPriceRON: number;
  parityOK: boolean;
  notes: string;
};

export function checkRateParity(
  channel: "booking_com" | "airbnb",
  apartmentSlug: string,
  externalPriceRON: number | null,
  directPriceRON: number,
): ParityCheck {
  // Rule of thumb: direct rate should not exceed external rate (which would
  // break OTA parity clauses), but should be at least 10% below to incentivise
  // direct bookings after the OTA commission (15-25%).
  const parityOK =
    externalPriceRON === null
      ? true
      : directPriceRON <= externalPriceRON && directPriceRON >= externalPriceRON * 0.75;
  return {
    channel,
    apartmentSlug,
    externalPriceRON,
    directPriceRON,
    parityOK,
    notes: parityOK
      ? "Parity within healthy band (direct ≤ external, max 25% below)."
      : externalPriceRON !== null && directPriceRON > externalPriceRON
      ? "ALERT: direct price ABOVE OTA — fix immediately."
      : "Direct rate too far below OTA — risk of margin loss.",
  };
}
