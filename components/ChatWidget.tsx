"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Message = { role: "user" | "assistant"; content: string };

type LeadForm = { name: string; email: string; phone: string };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function detectLanguage(): string {
  if (typeof navigator === "undefined") return "ro";
  const lang = navigator.language ?? "ro";
  return lang.slice(0, 2).toLowerCase();
}

function scrollToBottom(el: HTMLDivElement | null) {
  if (el) el.scrollTop = el.scrollHeight;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-[#2d5a27] flex items-center justify-center text-white text-xs font-bold shrink-0">
        V
      </div>
      <div className="bg-white border border-[#e8e0d0] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
        <span className="w-2 h-2 bg-[#2d5a27] rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-[#2d5a27] rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-[#2d5a27] rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex items-end gap-2 mb-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-[#2d5a27] flex items-center justify-center text-white text-xs font-bold shrink-0">
          V
        </div>
      )}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? "bg-[#2d5a27] text-white rounded-br-sm"
            : "bg-white border border-[#e8e0d0] text-[#3a2e1e] rounded-bl-sm"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Lead capture form
// ---------------------------------------------------------------------------
function LeadCaptureCard({
  onSubmit,
  onDismiss,
}: {
  onSubmit: (data: LeadForm) => void;
  onDismiss: () => void;
}) {
  const [form, setForm] = useState<LeadForm>({ name: "", email: "", phone: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name && !form.email && !form.phone) return;
    setSending(true);
    try {
      await fetch("/api/chat/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "chat" }),
      });
      setSent(true);
      onSubmit(form);
    } catch {
      // silent fail — lead capture is best-effort
      setSent(true);
      onSubmit(form);
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="mx-3 mb-3 rounded-xl bg-[#eef5ec] border border-[#c5dfc0] p-3 text-sm text-[#2d5a27] font-medium text-center">
        Mulțumim! Vă vom contacta curând. 🌿
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-3 mb-3 rounded-xl bg-[#faf6ef] border border-[#e8dcc8] p-3"
    >
      <p className="text-xs text-[#5a4a32] mb-2 font-medium">
        Lăsați datele dvs. pentru a fi notificat de disponibilitate:
      </p>
      <input
        type="text"
        placeholder="Nume (opțional)"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        className="w-full mb-1.5 px-3 py-1.5 rounded-lg border border-[#d5c9b0] text-sm bg-white focus:outline-none focus:border-[#2d5a27]"
      />
      <input
        type="email"
        placeholder="Email (opțional)"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        className="w-full mb-1.5 px-3 py-1.5 rounded-lg border border-[#d5c9b0] text-sm bg-white focus:outline-none focus:border-[#2d5a27]"
      />
      <input
        type="tel"
        placeholder="Telefon (opțional)"
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        className="w-full mb-2 px-3 py-1.5 rounded-lg border border-[#d5c9b0] text-sm bg-white focus:outline-none focus:border-[#2d5a27]"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={sending || (!form.name && !form.email && !form.phone)}
          className="flex-1 bg-[#2d5a27] text-white text-xs font-semibold rounded-lg py-1.5 disabled:opacity-50 hover:bg-[#234820] transition-colors"
        >
          {sending ? "Se trimite…" : "Trimite"}
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="px-3 text-xs text-[#8a7a62] hover:text-[#5a4a32] transition-colors"
        >
          Renunț
        </button>
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Main widget
// ---------------------------------------------------------------------------
const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Bună ziua! 🌿 Sunt asistentul virtual al Vila Vaias Aparts. Cum vă pot ajuta astăzi?\n\nBună dimineața / Hello / Hallo / Bonjour — răspund în limba dumneavoastră.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadCaptureShown, setLeadCaptureShown] = useState(false);
  const [leadDismissed, setLeadDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const language = useRef<string>(detectLanguage());

  // Count user messages for lead capture trigger
  const userMessageCount = messages.filter((m) => m.role === "user").length;

  useEffect(() => {
    if (
      !leadCaptureShown &&
      !leadDismissed &&
      userMessageCount >= 3
    ) {
      setShowLeadCapture(true);
      setLeadCaptureShown(true);
    }
  }, [userMessageCount, leadCaptureShown, leadDismissed]);

  useEffect(() => {
    if (open) {
      scrollToBottom(messagesEndRef.current?.parentElement as HTMLDivElement | null);
      inputRef.current?.focus();
    }
  }, [open, messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || streaming) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setStreaming(true);

    // Placeholder for streaming assistant reply
    const assistantPlaceholder: Message = { role: "assistant", content: "" };
    setMessages([...newMessages, assistantPlaceholder]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          language: language.current,
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullReply = "";

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
                fullReply += parsed.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: "assistant", content: fullReply };
                  return updated;
                });
              }
            } catch {
              // skip malformed chunk
            }
          }
        }
      }

      // Ensure final state is set even if last chunk was partial
      if (fullReply) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: fullReply };
          return updated;
        });
      }
    } catch (err) {
      console.error("[ChatWidget] stream error:", err);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "Ne pare rău, a apărut o eroare. Vă rugăm sunați-ne la +40 738 345 330 sau scrieți pe WhatsApp.",
        };
        return updated;
      });
    } finally {
      setStreaming(false);
      setTimeout(() => scrollToBottom(messagesEndRef.current?.parentElement as HTMLDivElement | null), 50);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  }

  return (
    <>
      {/* Floating action button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Închide chat" : "Deschide chat"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#2d5a27] text-white shadow-lg flex items-center justify-center hover:bg-[#234820] transition-all duration-200 hover:scale-105 active:scale-95"
      >
        {open ? (
          // X icon
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          // Chat bubble icon
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {/* Unread badge when closed */}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c8a44a] text-[9px] font-bold flex items-center justify-center">
            1
          </span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ height: "min(560px, calc(100vh - 110px))" }}
        >
          {/* Header */}
          <div className="bg-[#2d5a27] px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
              VA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight">Vila Vaias Aparts</p>
              <p className="text-white/70 text-xs">Asistent virtual · răspunde instant</p>
            </div>
            <a
              href="https://wa.me/40738345330"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-white/80 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {/* WhatsApp icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-[#f7f2ea] px-3 pt-4 pb-2">
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            {streaming && messages[messages.length - 1]?.content === "" && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Lead capture card */}
          {showLeadCapture && !leadDismissed && (
            <LeadCaptureCard
              onSubmit={() => {
                setShowLeadCapture(false);
              }}
              onDismiss={() => {
                setShowLeadCapture(false);
                setLeadDismissed(true);
              }}
            />
          )}

          {/* Input area */}
          <div className="bg-white border-t border-[#e8dcc8] px-3 py-2 flex items-end gap-2 shrink-0">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Scrieți un mesaj…"
              rows={1}
              disabled={streaming}
              className="flex-1 resize-none rounded-xl border border-[#d5c9b0] bg-[#faf6ef] px-3 py-2 text-sm text-[#3a2e1e] placeholder-[#b0a08a] focus:outline-none focus:border-[#2d5a27] disabled:opacity-60 max-h-28 overflow-y-auto"
              style={{ lineHeight: "1.4" }}
            />
            <button
              onClick={() => void sendMessage(input)}
              disabled={!input.trim() || streaming}
              aria-label="Trimite mesaj"
              className="w-9 h-9 rounded-full bg-[#2d5a27] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#234820] transition-colors shrink-0 self-end mb-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div className="bg-white px-3 pb-2 text-center">
            <p className="text-[10px] text-[#b0a08a]">
              Vila Vaias Aparts · +40 738 345 330 ·{" "}
              <a href="/rezervare" className="underline hover:text-[#2d5a27]">
                Rezervați direct
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
