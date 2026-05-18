import { NextRequest, NextResponse } from "next/server";
import { AGENT_REGISTRY, getAgentByNumericId } from "@/lib/agents/registry";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type AutopilotRequest = {
  agentId: number;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
};

const VALID_AGENT_IDS = AGENT_REGISTRY.map((a) => a.numericId);

function isValidAgentId(id: unknown): id is number {
  return typeof id === "number" && VALID_AGENT_IDS.includes(id);
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<AutopilotRequest>;

    const { agentId, messages } = body;
    if (!isValidAgentId(agentId)) {
      return NextResponse.json(
        {
          error: `agentId must be one of: ${VALID_AGENT_IDS.join(", ")}`,
        },
        { status: 400 },
      );
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages must be a non-empty array" },
        { status: 400 },
      );
    }

    for (const m of messages) {
      if (!m.role || !m.content || typeof m.content !== "string") {
        return NextResponse.json({ error: "Invalid message shape" }, { status: 400 });
      }
      if (m.role !== "user" && m.role !== "assistant") {
        return NextResponse.json(
          { error: "message role must be 'user' or 'assistant'" },
          { status: 400 },
        );
      }
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      console.error("[autopilot] OPENAI_API_KEY not set");
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    const agent = getAgentByNumericId(agentId)!;
    let systemPrompt = agent.systemPrompt;

    // For the Booking Agent, inject live context (occupancy, gaps, metrics) so
    // the LLM grounds its answers in real numbers rather than guessing.
    if (agent.api && "status" in agent.api && typeof agent.api.status === "function") {
      try {
        const status = await agent.api.status();
        systemPrompt +=
          `\n\n[LIVE CONTEXT @ ${new Date().toISOString()}]\n` +
          `Occupancy 30d: ${status.metrics.occupancyPct}% · ` +
          `Upcoming gaps: ${status.upcomingGaps.length} (critical: ${status.metrics.criticalGaps}) · ` +
          `Bookings MTD: ${status.metrics.bookingsThisMonth} · ` +
          `Revenue MTD: ${status.metrics.revenueThisMonth} RON · ` +
          `Leads/7d: ${status.metrics.leadsThisWeek} · ` +
          `Paused: ${status.state.paused ? "YES" : "no"} · ` +
          `Quiet hours: ${status.quietHours ? "ACTIVE" : "inactive"}.\n` +
          `Top gaps:\n` +
          status.upcomingGaps
            .slice(0, 6)
            .map(
              (g) =>
                `  - ${g.apartmentName} ${g.startDate}→${g.endDate} (${g.nights}n, ${g.severity}, ${g.classification}, suggest ${g.suggestedPrice} RON @ -${g.suggestedDiscountPct}%)`,
            )
            .join("\n");
      } catch (err) {
        console.warn("[autopilot] live-context inject failed:", err);
      }
    }

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
        messages: [{ role: "system", content: systemPrompt }, ...messages],
      }),
    });

    if (!openaiResponse.ok) {
      const errText = await openaiResponse.text();
      console.error("[autopilot] OpenAI error:", openaiResponse.status, errText);
      return NextResponse.json({ error: "AI service error" }, { status: 502 });
    }

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
                      encoder.encode(`data: ${JSON.stringify({ content: delta })}\n\n`),
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
