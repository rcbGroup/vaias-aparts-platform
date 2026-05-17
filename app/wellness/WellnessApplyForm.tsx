"use client";

import { useState } from "react";

export default function WellnessApplyForm({
  programSlug,
  programName,
}: {
  programSlug: string;
  programName: string;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<null | "ok" | "err">(null);
  const [errMsg, setErrMsg] = useState("");

  if (!open) {
    return (
      <button
        type="button"
        className="btn-primary w-full text-sm"
        onClick={() => setOpen(true)}
      >
        Aplică la „{programName}"
      </button>
    );
  }

  if (done === "ok") {
    return (
      <div className="rounded-xl bg-forest-50 border border-forest-200 p-4 text-sm text-forest-900">
        Mulțumim! Aplicația a fost primită. Vă contactăm pe WhatsApp în maxim 24 ore.
      </div>
    );
  }

  return (
    <form
      className="space-y-3 text-sm"
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setDone(null);
        const fd = new FormData(e.currentTarget);
        const payload = {
          programSlug,
          guestName: String(fd.get("guestName") || ""),
          guestEmail: String(fd.get("guestEmail") || ""),
          guestPhone: String(fd.get("guestPhone") || ""),
          preferredFrom: String(fd.get("preferredFrom") || "") || undefined,
          message: String(fd.get("message") || "") || undefined,
        };
        try {
          const res = await fetch("/api/wellness/apply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const j = await res.json();
          if (j.ok) setDone("ok");
          else {
            setDone("err");
            setErrMsg(JSON.stringify(j.error ?? "Eroare necunoscută"));
          }
        } catch (err: any) {
          setDone("err");
          setErrMsg(err.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <input
        name="guestName"
        required
        placeholder="Numele dvs."
        className="w-full rounded-lg border border-stone-300 px-3 py-2"
      />
      <input
        name="guestEmail"
        required
        type="email"
        placeholder="Email"
        className="w-full rounded-lg border border-stone-300 px-3 py-2"
      />
      <input
        name="guestPhone"
        required
        type="tel"
        placeholder="Telefon (WhatsApp)"
        className="w-full rounded-lg border border-stone-300 px-3 py-2"
      />
      <input
        name="preferredFrom"
        type="date"
        className="w-full rounded-lg border border-stone-300 px-3 py-2"
      />
      <textarea
        name="message"
        placeholder="Mesaj / detalii medicale (opțional)"
        rows={3}
        className="w-full rounded-lg border border-stone-300 px-3 py-2"
      />
      <div className="flex gap-2">
        <button type="submit" disabled={submitting} className="btn-primary flex-1">
          {submitting ? "Se trimite..." : "Trimite aplicația"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-stone-500 px-3"
        >
          Anulează
        </button>
      </div>
      {done === "err" && (
        <div className="text-rose-600 text-xs">Eroare: {errMsg}</div>
      )}
    </form>
  );
}
