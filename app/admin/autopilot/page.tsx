"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Agent = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
};

const agents: Agent[] = [
  {
    id: "distribution-manager",
    name: "Distribution Manager",
    description: "Controls overall distribution strategy across all platforms. Decides which channels to prioritise, commission thresholds, and market positioning.",
    icon: "🗺️",
    color: "bg-forest-700"
  },
  {
    id: "platform-audit",
    name: "Platform Audit Agent",
    description: "Inspects all connected platforms and generates audit reports. Read-only — never modifies listings. Flags inconsistencies and missing data.",
    icon: "🔍",
    color: "bg-walnut-600"
  },
  {
    id: "platform-setup",
    name: "Platform Setup Agent",
    description: "Prepares safe draft content for new platform listings. All output goes to the Approval Queue before any live changes are made.",
    icon: "⚙️",
    color: "bg-forest-600"
  },
  {
    id: "seo-translation",
    name: "SEO & Translation Agent",
    description: "Creates multilingual accommodation copy optimised for search. Covers Romanian, English, German, Italian, and French markets.",
    icon: "🌍",
    color: "bg-walnut-500"
  },
  {
    id: "outreach",
    name: "Outreach Agent",
    description: "Prepares outreach emails for travel agencies, diaspora organisations, and corporate clients. Drafts only — all messages require approval.",
    icon: "📧",
    color: "bg-forest-500"
  },
  {
    id: "qa-safety",
    name: "QA Safety Agent",
    description: "Verifies all generated content before it reaches the Approval Queue. Checks for accuracy, brand consistency, legal compliance, and safety.",
    icon: "🛡️",
    color: "bg-walnut-700"
  },
  {
    id: "weekly-reporting",
    name: "Weekly Reporting Agent",
    description: "Generates weekly summary reports covering occupancy, revenue, platform performance, and distribution health across all 7 apartments.",
    icon: "📊",
    color: "bg-forest-800"
  }
];

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type ChatState = {
  [agentId: string]: Message[];
};

type Tab = "autopilot" | "platform-tracker" | "approval-queue";

// Maps agent string IDs to numeric IDs expected by the API
const AGENT_NUMERIC_ID: Record<string, 1 | 2 | 3 | 4 | 5 | 6 | 7> = {
  "distribution-manager": 1,
  "platform-audit": 2,
  "platform-setup": 3,
  "seo-translation": 4,
  "outreach": 5,
  "qa-safety": 6,
  "weekly-reporting": 7,
};

export default function AutopilotPage() {
  const [activeTab, setActiveTab] = useState<Tab>("autopilot");
  const [openChatAgent, setOpenChatAgent] = useState<Agent | null>(null);
  const [chatState, setChatState] = useState<ChatState>({});
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentMessages = openChatAgent ? (chatState[openChatAgent.id] ?? []) : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages, isTyping]);

  function openChat(agent: Agent) {
    setOpenChatAgent(agent);
    setInputValue("");
    if (!chatState[agent.id]) {
      setChatState((prev) => ({
        ...prev,
        [agent.id]: [
          {
            role: "assistant",
            content: `Bună ziua! Sunt **${agent.name}**. ${agent.description} Cum te pot ajuta?`,
            timestamp: new Date()
          }
        ]
      }));
    }
  }

  function closeChat() {
    setOpenChatAgent(null);
    setInputValue("");
  }

  async function sendMessage() {
    if (!inputValue.trim() || !openChatAgent || isTyping) return;

    const userMsg: Message = {
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date()
    };

    // Build the updated message history (excluding the initial greeting)
    const history = (chatState[openChatAgent.id] ?? []).filter(
      (m) => !(m.role === "assistant" && m === (chatState[openChatAgent.id] ?? [])[0])
    );
    const apiMessages = [...history, userMsg].map((m) => ({
      role: m.role,
      content: m.content
    }));

    setChatState((prev) => ({
      ...prev,
      [openChatAgent.id]: [...(prev[openChatAgent.id] ?? []), userMsg]
    }));
    setInputValue("");
    setIsTyping(true);

    const agentNumericId = AGENT_NUMERIC_ID[openChatAgent.id];
    let assistantContent = "";

    try {
      const res = await fetch("/api/admin/autopilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: agentNumericId, messages: apiMessages })
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      // Add an empty assistant message placeholder to stream into
      const placeholderMsg: Message = {
        role: "assistant",
        content: "",
        timestamp: new Date()
      };
      setChatState((prev) => ({
        ...prev,
        [openChatAgent.id]: [...(prev[openChatAgent.id] ?? []), placeholderMsg]
      }));
      setIsTyping(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === "data: [DONE]") continue;
          if (trimmed.startsWith("data: ")) {
            try {
              const parsed = JSON.parse(trimmed.slice(6)) as { content?: string };
              if (parsed.content) {
                assistantContent += parsed.content;
                // Update the last (placeholder) message in place
                setChatState((prev) => {
                  const agentMsgs = prev[openChatAgent.id] ?? [];
                  const updated = [...agentMsgs];
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    content: assistantContent
                  };
                  return { ...prev, [openChatAgent.id]: updated };
                });
              }
            } catch {
              // skip malformed chunk
            }
          }
        }
      }
    } catch (err) {
      console.error("[autopilot] sendMessage error:", err);
      const errorMsg: Message = {
        role: "assistant",
        content: "A apărut o eroare. Te rog încearcă din nou.",
        timestamp: new Date()
      };
      setChatState((prev) => ({
        ...prev,
        [openChatAgent.id]: [...(prev[openChatAgent.id] ?? []), errorMsg]
      }));
      setIsTyping(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Admin header */}
      <header className="bg-forest-950 text-cream-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-cream-50/10 grid place-items-center">
            <span className="font-display text-sm">V</span>
          </div>
          <span className="font-display text-lg">Vaias Aparts — Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-sm text-cream-100/60 hover:text-cream-50">
            ← Dashboard
          </Link>
          <Link href="/" target="_blank" className="text-sm text-cream-100/60 hover:text-cream-50">
            Site →
          </Link>
        </div>
      </header>

      {/* Page title */}
      <div className="bg-forest-900 text-cream-50 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-2xl">VAIA Distribution Autopilot</h1>
          <p className="text-cream-100/60 text-sm mt-1">
            Sistem AI de management distribuție — 7 agenți specializați, 24 platforme
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-cream-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-0">
            {(
              [
                { id: "autopilot", label: "Autopilot AI", href: null },
                { id: "platform-tracker", label: "Platform Tracker", href: "/admin/autopilot/platform-tracker" },
                { id: "approval-queue", label: "Approval Queue", href: "/admin/autopilot/approval-queue" }
              ] as { id: Tab; label: string; href: string | null }[]
            ).map((tab) =>
              tab.href ? (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className="px-5 py-4 text-sm font-medium border-b-2 border-transparent text-stone-500 hover:text-forest-900 hover:border-stone-300 transition"
                >
                  {tab.label}
                </Link>
              ) : (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-4 text-sm font-medium border-b-2 transition ${
                    activeTab === tab.id
                      ? "border-forest-700 text-forest-900"
                      : "border-transparent text-stone-500 hover:text-forest-900 hover:border-stone-300"
                  }`}
                >
                  {tab.label}
                </button>
              )
            )}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "autopilot" && (
          <>
            <div className="mb-6">
              <p className="text-stone-500 text-sm">
                Selectează un agent și apasă <strong>Chat</strong> pentru a interacționa direct. Toți agenții operează în modul sigur — acțiunile cu risc ridicat sunt trimise la Coada de Aprobare.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="rounded-2xl bg-cream-50 border border-stone-200 shadow-sm overflow-hidden flex flex-col"
                >
                  <div className={`${agent.color} px-5 py-4 flex items-center gap-3`}>
                    <span className="text-2xl">{agent.icon}</span>
                    <h3 className="font-display text-base text-cream-50 leading-tight">{agent.name}</h3>
                  </div>
                  <div className="px-5 py-4 flex flex-col flex-1 gap-4">
                    <p className="text-xs text-stone-500 leading-relaxed flex-1">{agent.description}</p>
                    <button
                      onClick={() => openChat(agent)}
                      className="w-full rounded-xl bg-forest-900 text-cream-50 text-sm font-medium py-2.5 hover:bg-forest-800 transition"
                    >
                      Chat →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Chat Modal */}
      {openChatAgent && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-forest-950/50 backdrop-blur-sm"
            onClick={closeChat}
          />

          {/* Panel */}
          <div className="relative w-full max-w-lg h-[600px] bg-cream-50 rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden">
            {/* Chat header */}
            <div className={`${openChatAgent.color} px-5 py-4 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <span className="text-xl">{openChatAgent.icon}</span>
                <div>
                  <div className="font-display text-base text-cream-50">{openChatAgent.name}</div>
                  <div className="text-xs text-cream-100/70">VAIA Autopilot Agent</div>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="h-8 w-8 rounded-full bg-cream-50/10 hover:bg-cream-50/20 flex items-center justify-center text-cream-50 transition"
                aria-label="Închide chat"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {currentMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-forest-900 text-cream-50 rounded-br-sm"
                        : "bg-stone-100 text-forest-900 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                    <div className={`text-xs mt-1.5 ${msg.role === "user" ? "text-cream-100/50" : "text-stone-400"}`}>
                      {msg.timestamp.toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-stone-100 rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-stone-400">
                    <span className="inline-flex gap-1">
                      <span className="animate-bounce" style={{ animationDelay: "0ms" }}>•</span>
                      <span className="animate-bounce" style={{ animationDelay: "150ms" }}>•</span>
                      <span className="animate-bounce" style={{ animationDelay: "300ms" }}>•</span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-stone-200 px-4 py-3 flex items-end gap-3">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Scrie un mesaj... (Enter pentru trimitere)"
                rows={2}
                className="flex-1 resize-none rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 text-sm text-forest-900 placeholder:text-stone-400 focus:outline-none focus:border-walnut-500 focus:ring-2 focus:ring-walnut-500/15"
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="h-10 w-10 rounded-xl bg-forest-900 text-cream-50 flex items-center justify-center hover:bg-forest-800 disabled:opacity-40 transition flex-shrink-0"
                aria-label="Trimite"
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
