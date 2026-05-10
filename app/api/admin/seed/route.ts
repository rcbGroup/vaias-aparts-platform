import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// POST /api/admin/seed — idempotent, safe to run multiple times
export async function POST(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const results: string[] = [];

  // Seed 7 apartments
  const apartmentData = [
    { slug: "apartament-1", name: "Apartament 1", priceRON: 280, capacity: 2, capacityMax: 5, floor: "Etaj 1", hasAC: false, accessible: false },
    { slug: "apartament-2", name: "Apartament 2", priceRON: 280, capacity: 2, capacityMax: 5, floor: "Etaj 1", hasAC: false, accessible: false },
    { slug: "apartament-3", name: "Apartament 3", priceRON: 350, capacity: 4, capacityMax: 6, floor: "Etaj 1", hasAC: false, accessible: false },
    { slug: "apartament-4", name: "Apartament 4", priceRON: 350, capacity: 4, capacityMax: 6, floor: "Etaj 1", hasAC: false, accessible: false },
    { slug: "apartament-5", name: "Apartament 5", priceRON: 310, capacity: 3, capacityMax: 5, floor: "Etaj 2", hasAC: true,  accessible: false },
    { slug: "apartament-6", name: "Apartament 6", priceRON: 310, capacity: 2, capacityMax: 4, floor: "Etaj 2", hasAC: true,  accessible: false },
    { slug: "apartament-7", name: "Apartament 7", priceRON: 250, capacity: 2, capacityMax: 4, floor: "Parter", hasAC: false, accessible: true  },
  ];

  for (const apt of apartmentData) {
    await prisma.apartment.upsert({
      where: { slug: apt.slug },
      update: { priceRON: apt.priceRON, capacity: apt.capacity, capacityMax: apt.capacityMax },
      create: apt,
    });
  }
  results.push("✓ 7 apartamente create/actualizate");

  // Seed notification settings
  const defaultSettings = [
    { key: "owner_wa_booking",          value: "true"  },
    { key: "owner_email_booking",       value: "true"  },
    { key: "guest_sms_received",        value: "true"  },
    { key: "guest_wa_confirmed",        value: "true"  },
    { key: "guest_email_confirmed",     value: "true"  },
    { key: "guest_wa_minus7",           value: "true"  },
    { key: "guest_wa_minus1",           value: "true"  },
    { key: "guest_email_minus1",        value: "true"  },
    { key: "guest_wa_checkin",          value: "true"  },
    { key: "guest_wa_checkout_reminder", value: "true" },
    { key: "guest_wa_review",           value: "true"  },
    { key: "guest_email_return",        value: "false" },
  ];

  for (const s of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }
  results.push("✓ Setări notificări inițializate");

  // Seed admin user
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const hashed = await bcrypt.hash(adminPassword, 12);
    await prisma.adminUser.upsert({
      where: { email: adminEmail },
      update: {},
      create: { email: adminEmail, password: hashed, name: "Admin Vaias Aparts" },
    });
    results.push("✓ Admin user creat/verificat");
  }

  return NextResponse.json({ ok: true, results });
}
