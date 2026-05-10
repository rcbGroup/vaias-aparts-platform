import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!getAdminSession(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const booking = await prisma.booking.findUnique({
    where: { id: parseInt(params.id) },
    include: { apartment: true, guest: true, messages: true },
  });

  if (!booking) return NextResponse.json({ error: "Rezervare negăsită" }, { status: 404 });
  return NextResponse.json(booking);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!getAdminSession(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const { status, internalNotes } = await req.json();
  const allowedStatuses = ["PENDING", "CONFIRMED", "PAID", "CANCELLED", "COMPLETED"];

  if (status && !allowedStatuses.includes(status)) {
    return NextResponse.json({ error: "Status invalid" }, { status: 400 });
  }

  const booking = await prisma.booking.update({
    where: { id: parseInt(params.id) },
    data: {
      ...(status && { status }),
      ...(internalNotes !== undefined && { internalNotes }),
      ...(status === "PAID" && { paidAt: new Date() }),
    },
    include: { apartment: true },
  });

  return NextResponse.json({ ok: true, booking });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!getAdminSession(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  await prisma.booking.update({
    where: { id: parseInt(params.id) },
    data: { status: "CANCELLED" },
  });

  return NextResponse.json({ ok: true });
}
