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
- Apartamentele 1-6 au pat Emperor exact 2m × 2m
- Apartament 7 are un pat dublu standard (nu menționa dimensiunile specifice)
- Aer condiționat NUMAI în Apartament 5 și Apartament 6, nicăieri altundeva
- Apartament 7 NU are bucătărie privată — folosește Bucătăria pentru Toți (bucătăria comună de la parter)
- Toate celelalte apartamente (1-6) au bucătărie privată complet utilată
- Apartament 7 are frigider propriu, dar fără plită/microunde proprii
- Capacitate totală vilă: 22 persoane optim, 24 confortabil, 26-28 maxim (NICIODATĂ 30-33)
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
// -----------------------------------------------------------------------
// Rule-based fallback — used when OPENAI_API_KEY is not configured
// -----------------------------------------------------------------------
function ruleBasedResponse(messages: Message[], language: string): Response {
  const lastMsg = [...messages].reverse().find((m) => m.role === "user");
  const text = (lastMsg?.content ?? "").toLowerCase().trim();

  const isRo = ["ro", ""].includes(language);
  const isFr = language === "fr";
  const isDe = language === "de";
  const isIt = language === "it";
  const isEs = language === "es";

  // Greetings
  const greetings = ["salut", "buna", "bună", "hello", "hi", "hey", "bonjour", "hallo", "ciao", "hola", "buna ziua", "bună ziua"];
  if (greetings.some((g) => text.includes(g))) {
    const reply = isRo
      ? "Bună! 👋 Bine ați venit la Vaias Aparts! Sunt asistentul virtual al vilei noastre din Târgu Neamț. Cu ce vă pot ajuta? Rezervări, informații despre apartamente sau facilități?"
      : isFr
      ? "Bonjour! 👋 Bienvenue chez Vaias Aparts! Comment puis-je vous aider? Réservations, informations sur les appartements ou les équipements?"
      : isDe
      ? "Hallo! 👋 Willkommen bei Vaias Aparts! Wie kann ich Ihnen helfen? Buchungen, Informationen zu Apartments oder Einrichtungen?"
      : isIt
      ? "Ciao! 👋 Benvenuti a Vaias Aparts! Come posso aiutarvi? Prenotazioni, informazioni sugli appartamenti o sui servizi?"
      : isEs
      ? "¡Hola! 👋 ¡Bienvenido a Vaias Aparts! ¿En qué puedo ayudarle? Reservas, información sobre apartamentos o instalaciones?"
      : "Hello! 👋 Welcome to Vaias Aparts! How can I help you? Bookings, information about apartments or facilities?";
    return buildSSEResponse(reply);
  }

  // Booking / rezervare
  const bookingKw = ["rezerv", "booking", "book", "reserv", "réserv", "buchung", "prenotaz", "disponibil", "available", "liber", "free", "price", "preț", "cost", "tarif", "pret"];
  if (bookingKw.some((k) => text.includes(k))) {
    const reply = isRo
      ? "Pentru rezervări și prețuri actuale vă rugăm să ne contactați direct:

📞 +40 752 388 388 sau +40 738 345 330
💬 WhatsApp: https://wa.me/40752388388
🌐 Rezervare online: https://vaiasaparts.ro/rezervare

Răspundem rapid și vă oferim cel mai mic preț garantat! 🏡"
      : isFr
      ? "Pour les réservations et les tarifs actuels, veuillez nous contacter directement:

📞 +40 752 388 388 ou +40 738 345 330
💬 WhatsApp: https://wa.me/40752388388
🌐 Réservation en ligne: https://vaiasaparts.ro/rezervare"
      : isDe
      ? "Für Buchungen und aktuelle Preise kontaktieren Sie uns bitte direkt:

📞 +40 752 388 388 oder +40 738 345 330
💬 WhatsApp: https://wa.me/40752388388
🌐 Online-Buchung: https://vaiasaparts.ro/rezervare"
      : isIt
      ? "Per prenotazioni e prezzi attuali, contattateci direttamente:

📞 +40 752 388 388 o +40 738 345 330
💬 WhatsApp: https://wa.me/40752388388
🌐 Prenotazione online: https://vaiasaparts.ro/rezervare"
      : isEs
      ? "Para reservas y precios actuales, contáctenos directamente:

📞 +40 752 388 388 o +40 738 345 330
💬 WhatsApp: https://wa.me/40752388388
🌐 Reserva online: https://vaiasaparts.ro/rezervare"
      : "For bookings and current prices, please contact us directly:

📞 +40 752 388 388 or +40 738 345 330
💬 WhatsApp: https://wa.me/40752388388
🌐 Book online: https://vaiasaparts.ro/rezervare

We reply fast and guarantee the lowest price! 🏡";
    return buildSSEResponse(reply);
  }

  // Apartment info
  const aptKw = ["apartament", "apartment", "cameră", "camera", "room", "chambre", "zimmer", "stanza", "habitacion", "dormitor", "bedroom", "pat", "bed", "persoane", "guests", "capacitate", "capacity"];
  if (aptKw.some((k) => text.includes(k))) {
    const reply = isRo
      ? "Vila Vaias Aparts are 7 apartamente boutique (nu există apartament 8) în Târgu Neamț:

• Apartamentele 1–6: bucătărie privată, terasă, pat Emperor 2m×2m
• Apartament 7: frigider propriu, Bucătăria pentru Toți la parter
• Capacitate: 22 persoane standard, până la 28 maxim
• Aer condiționat: DOAR în Apt. 5 și 6

Pentru detalii sau rezervare: +40 752 388 388 📞"
      : "Vaias Aparts has 7 boutique apartments (there is NO apartment 8) in Târgu Neamț:

• Apartments 1–6: private kitchen, terrace, Emperor bed 2m×2m
• Apartment 7: own fridge, shared Kitchen for All on ground floor
• Capacity: 22 guests standard, up to 28 maximum
• Air conditioning: ONLY in Apt. 5 and 6

For details or booking: +40 752 388 388 📞";
    return buildSSEResponse(reply);
  }

  // Location / directions
  const locKw = ["adresă", "adresa", "address", "location", "unde", "where", "cum ajung", "how to get", "directions", "harta", "map", "targu", "târgu", "neamț", "bacau", "iași"];
  if (locKw.some((k) => text.includes(k))) {
    const reply = isRo
      ? "Ne găsiți la:
📍 Strada Sfântul Lazăr Nr. 1, Târgu Neamț, jud. Neamț, România, 615200

Suntem ultracentral, la câteva minute de Cetatea Neamțului și mănăstirile Agapia și Văratec.

Pentru indicații exacte: https://vaiasaparts.ro/cum-ajungi"
      : "You can find us at:
📍 Strada Sfântul Lazăr Nr. 1, Târgu Neamț, Neamț County, Romania, 615200

Centrally located, minutes from Neamț Fortress and Agapia & Văratec monasteries.

For directions: https://vaiasaparts.ro/cum-ajungi";
    return buildSSEResponse(reply);
  }

  // Default fallback
  const reply = isRo
    ? "Mulțumim pentru mesaj! 😊 Echipa Vaias Aparts vă stă la dispoziție:

📞 +40 752 388 388 (disponibil și pe WhatsApp)
📧 contact@VaiasAparts.ro
🌐 https://vaiasaparts.ro

Vă răspundem în cel mai scurt timp!"
    : isFr
    ? "Merci pour votre message! 😊 L'équipe Vaias Aparts est à votre disposition:

📞 +40 752 388 388 (aussi sur WhatsApp)
📧 contact@VaiasAparts.ro"
    : isDe
    ? "Danke für Ihre Nachricht! 😊 Das Team von Vaias Aparts steht Ihnen zur Verfügung:

📞 +40 752 388 388 (auch auf WhatsApp)
📧 contact@VaiasAparts.ro"
    : isIt
    ? "Grazie per il vostro messaggio! 😊 Il team di Vaias Aparts è a vostra disposizione:

📞 +40 752 388 388 (anche su WhatsApp)
📧 contact@VaiasAparts.ro"
    : isEs
    ? "¡Gracias por su mensaje! 😊 El equipo de Vaias Aparts está a su disposición:

📞 +40 752 388 388 (también en WhatsApp)
📧 contact@VaiasAparts.ro"
    : "Thank you for your message! 😊 The Vaias Aparts team is here for you:

📞 +40 752 388 388 (also on WhatsApp)
📧 contact@VaiasAparts.ro
🌐 https://vaiasaparts.ro";
  return buildSSEResponse(reply);
}

function buildSSEResponse(text: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      // Stream the reply word by word for a natural feel
      const words = text.split(" ");
      let i = 0;
      const interval = setInterval(() => {
        if (i < words.length) {
          const chunk = (i === 0 ? "" : " ") + words[i];
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
          i++;
        } else {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
          clearInterval(interval);
        }
      }, 30);
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
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: Message[] = (Array.isArray(body.messages) ? body.messages : []).slice(-20);
    const language: string = body.language ?? "ro";

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages array required" }, { status: 400 });
    }

    // Validate each message shape
    for (const m of messages) {
      if (!m.role || !m.content || typeof m.content !== "string" || m.content.length > 2000 || !["user", "assistant"].includes(m.role)) {
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
      console.warn("[chat] OPENAI_API_KEY not set — using rule-based fallback");
      return ruleBasedResponse(messages, language);
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
      // Graceful fallback — never show raw error to user
      return ruleBasedResponse(messages, language);
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
