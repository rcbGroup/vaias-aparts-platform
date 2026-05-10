import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalid" }, { status: 400 });
    }

    // Persist subscriber to DB
    try {
      await prisma.newsletterSubscriber.upsert({
        where: { email },
        update: { active: true },
        create: { email, name: name ?? null, lang: "ro" }
      });
    } catch (dbErr) {
      console.error("DB newsletter save error (non-fatal):", dbErr);
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "Vaias Aparts <contact@vaiasaparts.ro>",
          to: ["contact@VaiasAparts.ro"],
          subject: `Newsletter: abonare nouă — ${email}`,
          text: `Email nou abonat la newsletter: ${email}${name ? ` (${name})` : ""}`
        })
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }
}
