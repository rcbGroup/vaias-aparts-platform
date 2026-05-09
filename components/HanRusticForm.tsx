"use client";

import { useState } from "react";

interface FormState {
  name: string;
  phone: string;
  email: string;
  date: string;
  persons: string;
  requests: string;
}

const INITIAL: FormState = {
  name: "",
  phone: "",
  email: "",
  date: "",
  persons: "2",
  requests: "",
};

export default function HanRusticForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const message =
        `Rezervare Han Rustic\n` +
        `Data: ${form.date}\n` +
        `Persoane: ${form.persons}\n` +
        (form.requests ? `Solicitări speciale: ${form.requests}` : "");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          subject: "Rezervare Han Rustic",
          message,
        }),
      });

      if (!res.ok) throw new Error("server error");
      setStatus("sent");
      setForm(INITIAL);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-12">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-forest-800/60 text-cream-100">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-cream-50">Mulțumim!</h3>
        <p className="mt-3 font-serif text-lg text-cream-100/80">
          Cererea dvs. de rezervare a fost primită. Vă vom contacta în scurt timp.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-cream-50/20 bg-forest-900/60 px-4 py-3 text-cream-50 placeholder:text-cream-100/40 focus:outline-none focus:border-walnut-400 focus:ring-2 focus:ring-walnut-400/25 transition";
  const labelClass = "block text-xs uppercase tracking-[0.2em] text-cream-100/70 font-semibold mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Nume *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Numele dvs."
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Telefon *</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="+40 7xx xxx xxx"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="adresa@email.com"
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Data rezervării *</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Număr persoane *</label>
          <select
            name="persons"
            value={form.persons}
            onChange={handleChange}
            required
            className={inputClass}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "persoană" : "persoane"}</option>
            ))}
            <option value="20+">Peste 20 persoane</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Solicitări speciale</label>
        <textarea
          name="requests"
          value={form.requests}
          onChange={handleChange}
          rows={4}
          placeholder="Meniu fix, cânt live, decor festiv, alergii alimentare..."
          className={inputClass}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">
          A apărut o eroare. Vă rugăm sunați la{" "}
          <a href="tel:+40752388388" className="underline">+40 752 388 388</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full disabled:opacity-50"
      >
        {status === "sending" ? "Se trimite..." : "Faceți o rezervare"}
      </button>
    </form>
  );
}
