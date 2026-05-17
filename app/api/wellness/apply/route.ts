import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { WELLNESS_PROGRAMS, getWellnessProgramBySlug } from "@/src/lib/agents/wellnessRetreat";

export const dynamic = "force-dynamic";

const schema = z.object({
  programSlug: z.string(),
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  guestPhone: z.string().min(6),
  preferredFrom: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues }, { status: 400 });
  }
  const program = getWellnessProgramBySlug(parsed.data.programSlug);
  if (!program) {
    return NextResponse.json({ ok: false, error: "Program necunoscut" }, { status: 404 });
  }

  try {
    // Ensure the program exists in DB (create-on-demand).
    let dbProgram = await prisma.wellnessProgram.findUnique({ where: { slug: program.slug } });
    if (!dbProgram) {
      dbProgram = await prisma.wellnessProgram.create({
        data: {
          slug: program.slug,
          nameRO: program.nameRO,
          nameEN: program.nameEN,
          category: program.category,
          durationDays: program.durationDays,
          priceRON: program.priceRON,
          descriptionRO: program.descriptionRO,
          descriptionEN: program.descriptionEN,
          inclusions: program.inclusions,
        },
      });
    }

    const application = await prisma.wellnessApplication.create({
      data: {
        programId: dbProgram.id,
        guestName: parsed.data.guestName,
        guestEmail: parsed.data.guestEmail,
        guestPhone: parsed.data.guestPhone,
        preferredFrom: parsed.data.preferredFrom ? new Date(parsed.data.preferredFrom) : null,
        message: parsed.data.message,
      },
    });

    return NextResponse.json({
      ok: true,
      applicationId: application.id,
      program: { slug: program.slug, nameRO: program.nameRO, priceRON: program.priceRON },
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, programs: WELLNESS_PROGRAMS });
}
