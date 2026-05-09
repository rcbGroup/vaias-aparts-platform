"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Email sau parolă incorectă.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-forest-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-cream-200/30 bg-cream-50/10 mb-4">
            <span className="font-display text-2xl text-cream-50">V</span>
          </div>
          <h1 className="font-display text-3xl text-cream-50">Vaias Aparts</h1>
          <p className="text-cream-100/60 text-sm mt-1">Panou de administrare</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-cream-50 rounded-2xl p-8 shadow-card"
        >
          <h2 className="font-display text-2xl text-forest-900 mb-6">Autentificare</h2>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-forest-800 mb-1.5 block uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-forest-900 focus:outline-none focus:border-walnut-500 focus:ring-2 focus:ring-walnut-500/15"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-forest-800 mb-1.5 block uppercase tracking-wider">
                Parolă
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-forest-900 focus:outline-none focus:border-walnut-500 focus:ring-2 focus:ring-walnut-500/15"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? "Se autentifică..." : "Intră în panou"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
