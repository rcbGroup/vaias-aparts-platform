import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalid" }, { status: 400 });
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
