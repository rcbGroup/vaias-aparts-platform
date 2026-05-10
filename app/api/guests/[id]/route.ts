import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!getAdminSession(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const guest = await prisma.guest.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      bookings: { include: { apartment: true }, orderBy: { checkIn: "desc" } },
      messages: { orderBy: { sentAt: "desc" }, take: 20 },
    },
  });

  if (!guest) return NextResponse.json({ error: "Oaspete negăsit" }, { status: 404 });
  return NextResponse.json(guest);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!getAdminSession(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const { notes, isVIP, nationality } = await req.json();

  const guest = await prisma.guest.update({
    where: { id: parseInt(params.id) },
    data: {
      ...(notes !== undefined && { notes }),
      ...(isVIP !== undefined && { isVIP }),
      ...(nationality !== undefined && { nationality }),
    },
  });

  return NextResponse.json({ ok: true, guest });
}
