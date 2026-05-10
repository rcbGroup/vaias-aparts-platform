import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  if (!getAdminSession(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const settings = await prisma.setting.findMany();
  const settingsMap: Record<string, string> = {};
  for (const s of settings) settingsMap[s.key] = s.value;

  const serviceStatus = {
    twilio: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_WHATSAPP_FROM),
    resend: !!process.env.RESEND_API_KEY,
    database: !!process.env.DATABASE_URL,
  };

  return NextResponse.json({ settings: settingsMap, serviceStatus });
}

export async function PUT(req: NextRequest) {
  if (!getAdminSession(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const { settings } = await req.json() as { settings: Record<string, string> };

  if (!settings || typeof settings !== "object") {
    return NextResponse.json({ error: "Format invalid" }, { status: 400 });
  }

  await Promise.all(
    Object.entries(settings).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    )
  );

  return NextResponse.json({ ok: true });
}
