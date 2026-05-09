import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone } = body as {
      name?: string;
      email?: string;
      phone?: string;
    };

    // At least one contact field is required
    if (!name && !email && !phone) {
      return NextResponse.json(
        { error: "Cel puțin un câmp de contact este necesar (name, email sau phone)" },
        { status: 400 }
      );
    }

    // Basic email format check
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Format email invalid" }, { status: 400 });
    }

    await prisma.lead.create({
      data: {
        name: name ?? null,
        email: email ?? null,
        phone: phone ?? null,
        source: "chat",
        status: "new",
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[chat/leads] Error saving lead:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
