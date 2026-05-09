import { NextRequest } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "contact@vaiasaparts.ro";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "VaiasAdmin2026!";

export function getAdminSession(req: NextRequest): boolean {
  const cookie = req.cookies.get("admin_session");
  return cookie?.value === process.env.ADMIN_SESSION_SECRET || cookie?.value === "vaias_admin_2026";
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}
