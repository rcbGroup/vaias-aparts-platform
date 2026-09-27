import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials, loginBlocked, recordLoginFail } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (loginBlocked(ip)) {
    return NextResponse.json({ error: "Prea multe încercări. Încercați din nou peste 15 minute." }, { status: 429 });
  }
  const { email, password } = await req.json().catch(() => ({ email: "", password: "" }));

  if (!verifyAdminCredentials(email, password)) {
    recordLoginFail(ip);
    return NextResponse.json({ error: "Credențiale incorecte" }, { status: 401 });
  }

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Configurare incompletă (ADMIN_SESSION_SECRET lipsă)" }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin_session");
  return res;
}
