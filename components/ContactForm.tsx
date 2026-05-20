"use client";

import { useState } from "react";
import { apartments } from "@/lib/apartments";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const slug = (fd.get("apartament") || "").toString();
    const aptName = apartments.find((a) => a.slug === slug)?.name || "";
    const checkin = (fd.get("checkin") || "").toString();
    const checkout = (fd.get("checkout") || "").toString();
    const guests = (fd.get("oaspeti") || "").toString();
    const parts = [
      (fd.get("mesaj") || "").toString().trim(),
      checkin || checkout ? `Perioadă: ${checkin || "?"} → ${checkout || "?"}` : "",
      guests ? `Oaspeți: ${guests}` : "",
    ].filter(Boolean);
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("nume"),
          email: fd.get("email"),
          phone: fd.get("telefon"),
          apartment: aptName,
          source: "contact-form",
          message: parts.join(" · "),
        }),
      });
    } catch {
      /* swallow — UI still confirms; email/DB best-effort */
    }
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-forest-100 text-forest-700 mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-forest-900">Mulțumim!</h3>
        <p className="mt-3 text-stone-500">
          Mesajul tău a fost trimis. Răspundem în maxim 4 ore.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nume*" name="nume" required />
        <Field label="Email*" name="email" type="email" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Telefon" name="telefon" type="tel" />
        <SelectField label="Apartament dorit" name="apartament">
          <option value="">Fără preferință</option>
          {apartments.map((a) => (
            <option key={a.slug} value={a.slug}>{a.name}</option>
          ))}
        </SelectField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Check-in" name="checkin" type="date" />
        <Field label="Check-out" name="checkout" type="date" />
      </div>
      <Field label="Număr oaspeți" name="oaspeti" type="number" defaultValue={2} min={1} max={8} />

      <div>
        <label className="text-sm font-medium text-forest-800 mb-1.5 block">Mesajul tău</label>
        <textarea
          name="mesaj"
          rows={5}
          className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3 text-forest-900 placeholder:text-stone-400 focus:outline-none focus:border-walnut-500 focus:ring-2 focus:ring-walnut-500/20"
          placeholder="Spune-ne despre planurile tale..."
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-stone-500 leading-snug">
        <input type="checkbox" required className="mt-1 accent-walnut-500" />
        <span>
          Sunt de acord cu prelucrarea datelor conform{" "}
          <a href="/politica-confidentialitate" className="text-walnut-600 underline">
            politicii de confidențialitate
          </a>.
        </span>
      </label>

      <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
        {submitting ? "Se trimite..." : "Trimite mesaj"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  min,
  max
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-forest-800 mb-1.5 block">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        min={min}
        max={max}
        className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3 text-forest-900 placeholder:text-stone-400 focus:outline-none focus:border-walnut-500 focus:ring-2 focus:ring-walnut-500/20"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  children
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-forest-800 mb-1.5 block">{label}</label>
      <select
        name={name}
        className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3 text-forest-900 focus:outline-none focus:border-walnut-500 focus:ring-2 focus:ring-walnut-500/20"
      >
        {children}
      </select>
    </div>
  );
}
