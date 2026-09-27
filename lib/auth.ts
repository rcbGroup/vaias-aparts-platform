import { NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";

function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  if (x.length !== y.length) return false;
  return timingSafeEqual(x, y);
}

export function getAdminSession(req: NextRequest): boolean {
  const cookie = req.cookies.get("admin_session");
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!cookie?.value || !secret) return false;
  return safeEqual(cookie.value, secret);
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword || typeof email !== "string" || typeof password !== "string") return false;
  const okEmail = safeEqual(email.trim().toLowerCase(), adminEmail.trim().toLowerCase());
  const okPass = safeEqual(password, adminPassword);
  return okEmail && okPass;
}

// Simple per-instance login throttle: 5 failed attempts per IP per 15 minutes.
const FAILS = new Map<string, { n: number; t: number }>();
export function loginBlocked(ip: string): boolean {
  const r = FAILS.get(ip);
  if (!r) return false;
  if (Date.now() - r.t > 15 * 60 * 1000) { FAILS.delete(ip); return false; }
  return r.n >= 5;
}
export function recordLoginFail(ip: string): void {
  const r = FAILS.get(ip);
  if (!r || Date.now() - r.t > 15 * 60 * 1000) FAILS.set(ip, { n: 1, t: Date.now() });
  else r.n++;
}
