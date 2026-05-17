import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { renderJourneyMessage, ALL_STAGES, type JourneyStage } from "@/src/lib/guest-journey/templates";

const STAGE_KEYS = new Set<string>(ALL_STAGES);

const schema = z.object({
  guestName: z.string().min(1),
  apartmentName: z.string().optional(),
  apartmentSlug: z.string().optional(),
  checkInDate: z.string().optional(),
  checkOutDate: z.string().optional(),
  nights: z.number().int().optional(),
  bookingSource: z.string().optional(),
  bookingRef: z.string().optional(),
  language: z.enum(["ro", "en"]).optional(),
  occasion: z.enum(["birthday", "nameday"]).optional(),
  persist: z.boolean().optional(),
  guestPhone: z.string().optional(),
});

export async function POST(req: NextRequest, { params }: { params: { type: string } }) {
  const stage = params.type as JourneyStage;
  if (!STAGE_KEYS.has(stage)) {
    return NextResponse.json(
      { ok: false, error: `Stage necunoscut: ${stage}. Etape valide: ${Array.from(STAGE_KEYS).join(", ")}` },
      { status: 400 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues }, { status: 400 });
  }

  const message = renderJourneyMessage(stage, parsed.data);

  if (parsed.data.persist) {
    try {
      await prisma.messageSent.create({
        data: {
          bookingRef: parsed.data.bookingRef ?? null,
          guestName: parsed.data.guestName,
          guestPhone: parsed.data.guestPhone ?? null,
          apartment: parsed.data.apartmentName ?? null,
          templateKey: stage,
          language: parsed.data.language ?? "ro",
          channel: "whatsapp",
          content: message,
          status: "queued",
        },
      });
    } catch {
      /* DB may not be up — non-fatal */
    }
  }

  return NextResponse.json({
    ok: true,
    stage,
    language: parsed.data.language ?? "ro",
    message,
  });
}

export async function GET(_req: NextRequest, { params }: { params: { type: string } }) {
  if (params.type === "list") {
    return NextResponse.json({ ok: true, stages: ALL_STAGES });
  }
  const stage = params.type as JourneyStage;
  if (!STAGE_KEYS.has(stage)) {
    return NextResponse.json({ ok: false, error: `Unknown stage ${stage}` }, { status: 400 });
  }
  // Return a preview with placeholder data.
  const preview = renderJourneyMessage(stage, {
    guestName: "Maria",
    apartmentName: "Apartament 3",
    apartmentSlug: "apartament-3",
    checkInDate: "15 iulie",
    checkOutDate: "18 iulie",
    nights: 3,
    bookingSource: "direct",
    language: "ro",
    occasion: "birthday",
  });
  return NextResponse.json({ ok: true, stage, preview });
}
