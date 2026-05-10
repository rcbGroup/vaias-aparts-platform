import { NextRequest } from "next/server";

export function getAdminSession(req: NextRequest): boolean {
  const cookie = req.cookies.get("admin_session");
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!cookie?.value || !secret) return false;
  return cookie.value === secret;
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return false;
  return email === adminEmail && password === adminPassword;
}
