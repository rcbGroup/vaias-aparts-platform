"use client";

import { useState } from "react";
import Link from "next/link";

type RiskLevel = "Low" | "Medium" | "High";
type ItemStatus = "pending" | "approved" | "rejected";

type ApprovalItem = {
  id: string;
  action: string;
  description: string;
  riskLevel: RiskLevel;
  agent: string;
  agentIcon: string;
  timestamp: string;
  status: ItemStatus;
  notes: string;
};

const initialItems: ApprovalItem[] = [
  {
    id: "1",
    action: "Publicare listing complet pe Airbnb",
    description: "Publicare listing complet pe Airbnb pentru toate cele 7 apartamente, inclusiv descrieri în română și engleză, fotografii, prețuri și politici de anulare.",
    riskLevel: "High",
    agent: "Platform Setup Agent",
    agentIcon: "⚙️",
    timestamp: "2026-05-10 09:14",
    status: "pending",
    notes: ""
  },
  {
    id: "2",
    action: "Modificare comision pe Booking.com",
    description: "Modificare comision pe Booking.com de la 15% la 12% pentru toate cele 7 apartamente. Schimbarea va afecta vizibilitatea în rezultatele de căutare Booking.",
    riskLevel: "High",
    agent: "Distribution Manager",
    agentIcon: "🗺️",
    timestamp: "2026-05-10 08:47",
    status: "pending",
    notes: ""
  },
  {
    id: "3",
    action: "Traducere descrieri în germană pentru TripAdvisor",
    description: "Traducere și optimizare SEO a descrierilor pentru toate cele 7 apartamente în limba germană, targetând piața germanofonă (Germania, Austria, Elveția).",
    riskLevel: "Low",
    agent: "SEO & Translation Agent",
    agentIcon: "🌍",
    timestamp: "2026-05-10 07:30",
    status: "pending",
    notes: ""
  }
];

const RISK_STYLES: Record<RiskLevel, string> = {
  High: "bg-red-100 text-red-700 border-red-200",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Low: "bg-green-100 text-green-700 border-green-200"
};

const RISK_ICONS: Record<RiskLevel, string> = {
  High: "⚠️",
  Medium: "⚡",
  Low: "✓"
};

const STATUS_LABELS: Record<ItemStatus, string> = {
  pending: "În așteptare",
  approved: "Aprobat",
  rejected: "Respins"
};

export default function ApprovalQueuePage() {
  const [items, setItems] = useState<ApprovalItem[]>(initialItems);
  const [filterStatus, setFilterStatus] = useState<ItemStatus | "all">("all");
  const [confirmDialog, setConfirmDialog] = useState<{
    itemId: string;
    action: "approve" | "reject";
  } | null>(null);
  const [dialogNotes, setDialogNotes] = useState("");

  const filtered = items.filter(
    (item) => filterStatus === "all" || item.status === filterStatus
  );

  const pendingCount = items.filter((i) => i.status === "pending").length;
  const approvedCount = items.filter((i) => i.status === "approved").length;
  const rejectedCount = items.filter((i) => i.status === "rejected").length;

  function openConfirm(itemId: string, action: "approve" | "reject") {
    setConfirmDialog({ itemId, action });
    setDialogNotes("");
  }

  function executeAction() {
    if (!confirmDialog) return;
    const { itemId, action } = confirmDialog;
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              status: action === "approve" ? "approved" : "rejected",
              notes: dialogNotes.trim() || item.notes
            }
          : item
      )
    );
    setConfirmDialog(null);
    setDialogNotes("");
  }

  function resetItem(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "pending", notes: "" } : item
      )
    );
  }

  const confirmItem = confirmDialog ? items.find((i) => i.id === confirmDialog.itemId) : null;

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
            <Link
              href="/admin/autopilot"
              className="px-5 py-4 text-sm font-medium border-b-2 border-transparent text-stone-500 hover:text-forest-900 hover:border-stone-300 transition"
            >
              Autopilot AI
            </Link>
            <Link
              href="/admin/autopilot/platform-tracker"
              className="px-5 py-4 text-sm font-medium border-b-2 border-transparent text-stone-500 hover:text-forest-900 hover:border-stone-300 transition"
            >
              Platform Tracker
            </Link>
            <span className="px-5 py-4 text-sm font-medium border-b-2 border-forest-700 text-forest-900 flex items-center gap-2">
              Approval Queue
              {pendingCount > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 rounded-full bg-red-600 text-cream-50 text-xs font-bold px-1">
                  {pendingCount}
                </span>
              )}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats + filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex gap-3">
            <button
              onClick={() => setFilterStatus("all")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                filterStatus === "all"
                  ? "bg-forest-900 text-cream-50"
                  : "bg-cream-50 border border-stone-200 text-stone-600 hover:border-stone-300"
              }`}
            >
              Toate ({items.length})
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                filterStatus === "pending"
                  ? "bg-forest-900 text-cream-50"
                  : "bg-cream-50 border border-stone-200 text-stone-600 hover:border-stone-300"
              }`}
            >
              În așteptare ({pendingCount})
            </button>
            <button
              onClick={() => setFilterStatus("approved")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                filterStatus === "approved"
                  ? "bg-green-700 text-cream-50"
                  : "bg-cream-50 border border-stone-200 text-stone-600 hover:border-stone-300"
              }`}
            >
              Aprobate ({approvedCount})
            </button>
            <button
              onClick={() => setFilterStatus("rejected")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                filterStatus === "rejected"
                  ? "bg-red-700 text-cream-50"
                  : "bg-cream-50 border border-stone-200 text-stone-600 hover:border-stone-300"
              }`}
            >
              Respinse ({rejectedCount})
            </button>
          </div>
        </div>

        {/* Warning banner if high-risk pending */}
        {items.some((i) => i.status === "pending" && i.riskLevel === "High") && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-5 py-4 flex items-start gap-3">
            <span className="text-red-600 text-lg flex-shrink-0">⚠️</span>
            <div>
              <p className="text-sm font-medium text-red-700">Acțiuni cu risc ridicat în așteptare</p>
              <p className="text-xs text-red-600 mt-0.5">
                Există {items.filter((i) => i.status === "pending" && i.riskLevel === "High").length} acțiune(i) marcate ca risc HIGH care necesită atenție. Revizuiește cu atenție înainte de aprobare.
              </p>
            </div>
          </div>
        )}

        {/* Queue items */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-cream-50 border border-stone-200 p-12 text-center">
            <div className="text-4xl mb-3">✓</div>
            <p className="font-display text-xl text-forest-900">Coada este goală</p>
            <p className="text-stone-500 text-sm mt-1">Nu există acțiuni în așteptare pentru acest filtru.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl bg-cream-50 border shadow-sm overflow-hidden transition ${
                  item.status === "approved"
                    ? "border-green-200 opacity-80"
                    : item.status === "rejected"
                    ? "border-red-200 opacity-70"
                    : "border-stone-200"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Agent icon */}
                      <div className="h-10 w-10 rounded-xl bg-forest-900 flex items-center justify-center text-xl flex-shrink-0">
                        {item.agentIcon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-display text-lg text-forest-900 leading-tight">
                            {item.action}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border ${RISK_STYLES[item.riskLevel]}`}
                          >
                            {RISK_ICONS[item.riskLevel]} {item.riskLevel} Risk
                          </span>
                          {item.status !== "pending" && (
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                item.status === "approved"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {STATUS_LABELS[item.status]}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-stone-600 leading-relaxed mt-1">{item.description}</p>
                        {item.notes && (
                          <p className="text-xs text-walnut-600 mt-2 italic">
                            Notă: {item.notes}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-3 text-xs text-stone-400">
                          <span className="flex items-center gap-1">
                            <span>{item.agentIcon}</span>
                            <span>{item.agent}</span>
                          </span>
                          <span>•</span>
                          <span>{item.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {item.status === "pending" ? (
                        <>
                          <button
                            onClick={() => openConfirm(item.id, "approve")}
                            className="rounded-xl bg-green-600 text-cream-50 text-sm font-medium px-5 py-2.5 hover:bg-green-700 transition whitespace-nowrap"
                          >
                            Aprobă ✓
                          </button>
                          <button
                            onClick={() => openConfirm(item.id, "reject")}
                            className="rounded-xl bg-red-600 text-cream-50 text-sm font-medium px-5 py-2.5 hover:bg-red-700 transition whitespace-nowrap"
                          >
                            Respinge ✕
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => resetItem(item.id)}
                          className="rounded-xl bg-stone-100 text-stone-600 text-xs font-medium px-4 py-2 hover:bg-stone-200 transition whitespace-nowrap"
                        >
                          Resetează
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation dialog */}
      {confirmDialog && confirmItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-forest-950/60 backdrop-blur-sm"
            onClick={() => setConfirmDialog(null)}
          />
          <div className="relative w-full max-w-md bg-cream-50 rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            {/* Dialog header */}
            <div
              className={`px-6 py-5 ${
                confirmDialog.action === "approve" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              <h3 className="font-display text-xl text-cream-50">
                {confirmDialog.action === "approve" ? "Confirmare aprobare" : "Confirmare respingere"}
              </h3>
              <p className="text-cream-100/80 text-sm mt-1">{confirmItem.action}</p>
            </div>

            <div className="px-6 py-5">
              {/* Risk warning */}
              {confirmItem.riskLevel === "High" && confirmDialog.action === "approve" && (
                <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-2">
                  <span className="text-red-600 text-sm flex-shrink-0">⚠️</span>
                  <p className="text-xs text-red-700">
                    Această acțiune are risc ridicat. Verifică că ai analizat toate implicațiile înainte de aprobare.
                  </p>
                </div>
              )}

              <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                {confirmItem.description}
              </p>

              <div className="mb-4">
                <label className="text-xs font-semibold text-forest-800 mb-1.5 block uppercase tracking-wider">
                  Notă opțională
                </label>
                <textarea
                  value={dialogNotes}
                  onChange={(e) => setDialogNotes(e.target.value)}
                  placeholder={
                    confirmDialog.action === "approve"
                      ? "Motivul aprobării sau instrucțiuni suplimentare..."
                      : "Motivul respingerii sau ce trebuie corectat..."
                  }
                  rows={3}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 text-sm text-forest-900 placeholder:text-stone-400 focus:outline-none focus:border-walnut-500 focus:ring-2 focus:ring-walnut-500/15 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDialog(null)}
                  className="flex-1 rounded-xl bg-stone-100 text-stone-600 text-sm font-medium py-3 hover:bg-stone-200 transition"
                >
                  Anulează
                </button>
                <button
                  onClick={executeAction}
                  className={`flex-1 rounded-xl text-cream-50 text-sm font-medium py-3 transition ${
                    confirmDialog.action === "approve"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {confirmDialog.action === "approve" ? "Da, aprobă" : "Da, respinge"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
