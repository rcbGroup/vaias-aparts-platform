import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Message = { role: "user" | "assistant"; content: string };

// ---------------------------------------------------------------------------
// Apartment details — single source of truth
// ---------------------------------------------------------------------------
const APARTMENT_DETAILS = `
Apartamentele Vila Vaias Aparts (1–7, NU există apartament 8. NICIODATĂ nu menţiona Apartament 8):

| Nr | Capacitate standard | Capacitate max | Etaj   | Aer condiționat | Bucătărie privată    | Terasă  |
|----|---------------------|----------------|--------|-----------------|----------------------|---------|
| 1  | 3 persoane          | 5 persoane     | Etaj 1 | NU              | DA (privată)         | DA      |
| 2  | 3 persoane          | 5 persoane     | Etaj 1 | NU              | DA (privată)         | DA      |
| 3  | 4 persoane          | 6 persoane     | Etaj 1 | NU              | DA (privată)         | DA      |
| 4  | 4 persoane          | 6 persoane     | Etaj 1 | NU              | DA (privată)         | DA      |
| 5  | 3 persoane          | 5 persoane     | Etaj 2 | DA              | DA (privată)         | DA      |
| 6  | 3 persoane          | 5 persoane     | Etaj 2 | DA              | DA (privată)         | DA      |
| 7  | 2 persoane          | 4 persoane     | Parter | NU              | NU — folosește Kitchen for All (bucătărie comună la parter) | DA |

IMPORTANT:
- Toate apartamentele au pat Emperor exact 2m × 2m
- Aer condiționat NUMAI în Apartament 5 și Apartament 6, nicăieri altundeva
- Apartament 7 NU are bucătărie privată — folosește Kitchen for All (bucătăria comună de la parter)
- Toate celelalte apartamente (1-6) au bucătărie privată complet utilată
- Apartament 7 are frigider propriu, dar fără plită/microunde proprii
- Capacitate totală vilă: 22 persoane optim, 26-28 maxim
`.trim();

// ---------------------------------------------------------------------------
// Fallback system prompt (also stored as Setting key "chat_system_prompt")
// ---------------------------------------------------------------------------
const FALLBACK_SYSTEM_PROMPT = `
Ești asistentul virtual oficial al Vila Vaias Aparts, un complex de vacanță rustic și autentic din Târgu Neamț, România.

## Identitate
- Proprietate: Vila Vaias Aparts
- Adresă: Strada Sfântul Lazăr Nr. 1, Târgu Neamț, jud. Neamț, România, 615200
- Companie: Vaia Rustic SRL, CUI 36258605
- Telefon / WhatsApp: +40 738 345 330 și +40 752 388 388
- Link WhatsApp: https://wa.me/40738345330
- Email: contact@VaiasAparts.ro
- Website rezervări: https://vaiasaparts.ro/rezervare

## Apartamente
${APARTMENT_DETAILS}

## Politici generale
- Check-in: 14:00 | Check-out: 11:00
- Parcare: gratuită, locuri limitate, primul venit primul servit
- WiFi: gratuit în toată proprietatea
- Animale de companie: acceptate la cerere, gratuit
- Jacuzzi cu apă sărată: disponibil la cerere (anunțați din timp)
- Grătar BBQ: disponibil în curte
- Rezervare directă: discount față de platformele OTA (Booking.com, Airbnb etc.)

## Facilități & experiențe suplimentare
- Lac Nemțișor (lac privat): excursie / add-on disponibil la cerere
- Restaurantul Han Rustic: în curând, urmează să se deschidă

## Recenzii
- Google: 97 recenzii, nota medie 5,0 ★
- Booking.com: nota 9,4

## Comportament și ton
- Răspunzi prietenos, cald, autentic — spiritul rustic al locului.
- Detectezi automat limba utilizatorului și răspunzi în aceeași limbă.
- Limbi acceptate: română, engleză, germană, franceză, italiană, spaniolă, maghiară.
- Dacă nu ești sigur de limbă, răspunzi în română.
- Ghidezi oaspeții spre rezervare la /rezervare.
- Poți colecta numele, emailul și telefonul unui oaspete pentru captare lead-uri NUMAI cu consimțământul explicit al acestuia (întrebi politicos înainte).
- Semnezi mesajele: "Echipa Vaias Aparts".
- Nu inventezi prețuri — spune că prețurile exacte se găsesc pe pagina de rezervări sau pot fi comunicate telefonic.
- Nu faci promisiuni despre disponibilitate fără verificare.
- Nu dai informații false sau inexacte despre proprietate.
- Dacă nu știi ceva, redirecționezi spre telefon sau email.
`.trim();

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: Message[] = body.messages ?? [];
    const language: string = body.language ?? "ro";

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages array required" }, { status: 400 });
    }

    // Validate each message shape
    for (const m of messages) {
      if (!m.role || !m.content || typeof m.content !== "string") {
        return NextResponse.json({ error: "Invalid message shape" }, { status: 400 });
      }
      if (m.role !== "user" && m.role !== "assistant") {
        return NextResponse.json({ error: "role must be user or assistant" }, { status: 400 });
      }
    }

    // Try to load system prompt from DB Setting, fall back to constant
    let systemPromptText = FALLBACK_SYSTEM_PROMPT;
    try {
      const setting = await prisma.setting.findUnique({ where: { key: "chat_system_prompt" } });
      if (setting?.value) {
        systemPromptText = setting.value;
      }
    } catch {
      // DB unavailable — use fallback
    }

    // Append language hint
    const langHint =
      language && language !== "ro"
        ? `\n\nNota internă: utilizatorul pare să prefere limba "${language}". Răspunde în acea limbă dacă o recunoști.`
        : "";

    const systemMessage = {
      role: "system" as const,
      content: systemPromptText + langHint,
    };

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      console.error("[chat] OPENAI_API_KEY not set");
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    // Call OpenAI with streaming
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        stream: true,
        temperature: 0.7,
        max_tokens: 800,
        messages: [systemMessage, ...messages],
      }),
    });

    if (!openaiResponse.ok) {
      const errText = await openaiResponse.text();
      console.error("[chat] OpenAI error:", openaiResponse.status, errText);
      return NextResponse.json({ error: "AI service error" }, { status: 502 });
    }

    // Persist the last user message asynchronously (fire-and-forget)
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMsg) {
      prisma.guestMessage
        .create({
          data: {
            direction: "INBOUND",
            channel: "chat",
            content: lastUserMsg.content,
          },
        })
        .catch((err: unknown) => console.warn("[chat] DB save skipped:", err));
    }

    // Collect the full assistant reply so we can persist it after streaming
    let assistantReply = "";

    // Stream OpenAI SSE back to the client
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const reader = openaiResponse.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || trimmed === "data: [DONE]") {
                if (trimmed === "data: [DONE]") {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                }
                continue;
              }
              if (trimmed.startsWith("data: ")) {
                const jsonStr = trimmed.slice(6);
                try {
                  const parsed = JSON.parse(jsonStr);
                  const delta = parsed.choices?.[0]?.delta?.content;
                  if (delta) {
                    assistantReply += delta;
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: delta })}\n\n`));
                  }
                } catch {
                  // skip malformed chunk
                }
              }
            }
          }
        } finally {
          reader.releaseLock();
          controller.close();

          // Persist assistant reply after stream ends
          if (assistantReply) {
            prisma.guestMessage
              .create({
                data: {
                  direction: "OUTBOUND",
                  channel: "chat",
                  content: assistantReply,
                },
              })
              .catch((err: unknown) => console.warn("[chat] DB save assistant msg skipped:", err));
          }
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("[chat] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
