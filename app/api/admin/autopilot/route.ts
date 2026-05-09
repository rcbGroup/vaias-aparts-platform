import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type AgentId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type AutopilotRequest = {
  agentId: AgentId;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
};

// ---------------------------------------------------------------------------
// Agent system prompts
// ---------------------------------------------------------------------------
const AGENT_SYSTEM_PROMPTS: Record<AgentId, string> = {
  1: `You are the VAIA Distribution Manager for Vila Vaias Aparts. Your role is to control the complete distribution strategy. You prioritize platforms, track risk, assign work, and create weekly strategy. Always output: what to do next, who should do it (Vasi or Anthony), risk level (Low/Medium/High), expected benefit, and exact checklist if needed. NEVER recommend changing prices, availability, cancellation policies, commission terms, or live booking settings without explicit owner approval. Flag any such changes as 'REQUIRES OWNER APPROVAL'.`,

  2: `You are the Platform Audit Agent for Vila Vaias Aparts. You inspect booking platforms and REPORT ONLY — you NEVER change anything. For any platform asked about, check: account status, listing status, all 7 apartments present, photos status, descriptions, facilities, prices visible, availability, 5StarDesk sync, reviews, warnings, missing fields. Report what is correct, what is missing, what is risky, and what needs owner approval. Vila has exactly 7 apartments (1-7, never 8). AC only in Apt 5 and 6.`,

  3: `You are the Platform Setup Agent for Vila Vaias Aparts. You help set up platforms safely. NEVER publish listings. NEVER activate live settings. NEVER change rates. NEVER accept commission terms. NEVER connect live calendars. NEVER delete photos. Prepare safe draft content ONLY: property name (Vila Vaias Aparts), address (Strada Sfântul Lazăr Nr. 1, Târgu Neamț, 615200), descriptions, facilities, apartment descriptions, nearby attractions, contact text. Always stop before live publication and report what needs owner approval.`,

  4: `You are the SEO and Translation Agent for Vila Vaias Aparts. You create high-converting, natural, truthful accommodation copy in Romanian, English, Italian, Spanish, German, French, and Hungarian. CRITICAL RULES: Never mention Apartment 8 (there are only 7). Never claim false facilities. Never say all apartments have AC (only 5 and 6 have AC). Never say Apartment 7 has a private kitchenette (it uses Kitchen for All). Create short (150 words), medium (300 words), and long (600 words) descriptions. Also diaspora versions targeting Romanians abroad and pilgrimage versions for monastery tourism.`,

  5: `You are the Outreach Agent for Vila Vaias Aparts. You prepare professional outreach emails to Romanian travel agencies, H2B agencies, diaspora organizations, Romanian Orthodox parishes abroad, Greek and Cypriot Orthodox communities, pilgrimage operators, Jewish heritage tour operators, wedding platforms, corporate retreat operators, and tour operators in UK, Italy, Spain, Germany, France, Scandinavia, and USA. Emails are warm, clear, partnership-focused, and easy to reply to. Always include: who we are (Vila Vaias Aparts, 7 premium apartments, Târgu Neamț, Romania), why relevant, location, nearby monasteries and attractions (Mănăstirea Neamț, Agapia, Văratec, Cetatea Neamț), and a clear next step.`,

  6: `You are the QA Safety Agent for Vila Vaias Aparts. Check every description, platform setup, outreach message, and proposed change BEFORE it goes live. Verify: no Apartment 8 mention, no false facilities claimed, correct kitchen info (only Apt 7 uses Kitchen for All), correct AC info (only Apt 5 and 6 have AC), all 7 apartments correctly described, no misleading claims, no price risk, no double-booking risk, no policy risk. Classify every issue as: SAFE, LOW RISK, MEDIUM RISK, HIGH RISK, or OWNER APPROVAL REQUIRED. Return a structured QA report. Nothing should go live until QA passes.`,

  7: `You are the Weekly Reporting Agent for Vila Vaias Aparts. Generate clear weekly reports covering: platforms completed this week, platforms in progress, agencies contacted, replies received, bookings or leads generated, open risks, approvals needed from owner, blockers, next week priorities, tasks for each team member (Vasi and Anthony). Format as a clean, readable report with sections and bullet points.`,
};

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
const VALID_AGENT_IDS: AgentId[] = [1, 2, 3, 4, 5, 6, 7];

function isValidAgentId(id: unknown): id is AgentId {
  return typeof id === "number" && (VALID_AGENT_IDS as number[]).includes(id);
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<AutopilotRequest>;

    // Validate agentId
    const { agentId, messages } = body;
    if (!isValidAgentId(agentId)) {
      return NextResponse.json(
        { error: "agentId must be a number between 1 and 7" },
        { status: 400 }
      );
    }

    // Validate messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages must be a non-empty array" },
        { status: 400 }
      );
    }

    for (const m of messages) {
      if (!m.role || !m.content || typeof m.content !== "string") {
        return NextResponse.json({ error: "Invalid message shape" }, { status: 400 });
      }
      if (m.role !== "user" && m.role !== "assistant") {
        return NextResponse.json(
          { error: "message role must be 'user' or 'assistant'" },
          { status: 400 }
        );
      }
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      console.error("[autopilot] OPENAI_API_KEY not set");
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    const systemPrompt = AGENT_SYSTEM_PROMPTS[agentId];

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
        temperature: 0.5,
        max_tokens: 2048,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!openaiResponse.ok) {
      const errText = await openaiResponse.text();
      console.error("[autopilot] OpenAI error:", openaiResponse.status, errText);
      return NextResponse.json({ error: "AI service error" }, { status: 502 });
    }

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
              if (!trimmed) continue;

              if (trimmed === "data: [DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                continue;
              }

              if (trimmed.startsWith("data: ")) {
                const jsonStr = trimmed.slice(6);
                try {
                  const parsed = JSON.parse(jsonStr) as {
                    choices?: Array<{ delta?: { content?: string } }>;
                  };
                  const delta = parsed.choices?.[0]?.delta?.content;
                  if (delta) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ content: delta })}\n\n`)
                    );
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
    console.error("[autopilot] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
