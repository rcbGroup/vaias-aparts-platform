"use client";

import { useState } from "react";
import Link from "next/link";

type Priority = "High" | "Medium" | "Low";
type RiskLevel = "Low" | "Medium" | "High";
type YesNo = "Yes" | "No" | "Partial" | "N/A";

type Platform = {
  id: string;
  name: string;
  market: string;
  priority: Priority;
  accountCreated: YesNo;
  listingLive: YesNo;
  connectedTo5StarDesk: YesNo;
  allApartmentsPresent: YesNo;
  ratesSynced: YesNo;
  availabilitySynced: YesNo;
  photosUploaded: YesNo;
  commissionPct: string;
  riskLevel: RiskLevel;
  assignedTo: string;
  nextAction: string;
  deadline: string;
  notes: string;
};

const initialPlatforms: Platform[] = [
  {
    id: "booking",
    name: "Booking.com",
    market: "International",
    priority: "High",
    accountCreated: "Yes",
    listingLive: "Yes",
    connectedTo5StarDesk: "Partial",
    allApartmentsPresent: "Yes",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "Yes",
    commissionPct: "15%",
    riskLevel: "Medium",
    assignedTo: "Vasi",
    nextAction: "Conectare channel manager pentru sincronizare automată",
    deadline: "2026-05-20",
    notes: "Contul este activ. Sincronizarea disponibilității se face manual momentan."
  },
  {
    id: "airbnb",
    name: "Airbnb",
    market: "International",
    priority: "High",
    accountCreated: "Yes",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "3%",
    riskLevel: "High",
    assignedTo: "Vasi",
    nextAction: "Creare listări pentru toate cele 7 apartamente",
    deadline: "2026-05-25",
    notes: "Cont creat. Listările necesită aprobare înainte de publicare."
  },
  {
    id: "tripadvisor",
    name: "TripAdvisor",
    market: "International",
    priority: "Medium",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "12-15%",
    riskLevel: "Low",
    assignedTo: "—",
    nextAction: "Creare cont și proprietate",
    deadline: "2026-06-01",
    notes: "Nepornit."
  },
  {
    id: "travelminit",
    name: "Travelminit",
    market: "Romania",
    priority: "High",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "12%",
    riskLevel: "High",
    assignedTo: "Vasi",
    nextAction: "Creare cont — platformă prioritară piața RO",
    deadline: "2026-05-22",
    notes: "Platformă locală cu vizibilitate mare. Prioritate ridicată."
  },
  {
    id: "turistinfo",
    name: "TuristInfo",
    market: "Romania",
    priority: "Medium",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "10%",
    riskLevel: "Low",
    assignedTo: "—",
    nextAction: "Evaluare platformă și creare cont",
    deadline: "2026-06-15",
    notes: "Nepornit."
  },
  {
    id: "h2b",
    name: "H2B",
    market: "Romania",
    priority: "Low",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "N/A",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "TBD",
    riskLevel: "Low",
    assignedTo: "—",
    nextAction: "Cercetare platformă",
    deadline: "2026-07-01",
    notes: "Nepornit."
  },
  {
    id: "5stardesk",
    name: "5StarDesk",
    market: "Internal PMS",
    priority: "High",
    accountCreated: "Yes",
    listingLive: "N/A",
    connectedTo5StarDesk: "N/A",
    allApartmentsPresent: "Partial",
    ratesSynced: "Partial",
    availabilitySynced: "Partial",
    photosUploaded: "Yes",
    commissionPct: "0%",
    riskLevel: "Medium",
    assignedTo: "Vasi",
    nextAction: "Finalizare configurare channel manager pentru OTA-uri",
    deadline: "2026-05-20",
    notes: "PMS intern. Necesită conectare completă cu Booking.com și Airbnb."
  },
  {
    id: "expedia",
    name: "Expedia Group",
    market: "International",
    priority: "High",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "15-20%",
    riskLevel: "High",
    assignedTo: "—",
    nextAction: "Creare cont partner Expedia",
    deadline: "2026-06-01",
    notes: "Include Hotels.com și VRBO în același ecosistem."
  },
  {
    id: "agoda",
    name: "Agoda",
    market: "Asia-Pacific",
    priority: "Low",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "15-18%",
    riskLevel: "Low",
    assignedTo: "—",
    nextAction: "Evaluare piață Asia pentru proprietate",
    deadline: "2026-07-01",
    notes: "Prioritate scăzută pentru faza actuală."
  },
  {
    id: "tripcom",
    name: "Trip.com",
    market: "Asia-Pacific",
    priority: "Low",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "15%",
    riskLevel: "Low",
    assignedTo: "—",
    nextAction: "Evaluare platformă",
    deadline: "2026-07-01",
    notes: "Piață asiatică — prioritate scăzută."
  },
  {
    id: "hotelscom",
    name: "Hotels.com",
    market: "International",
    priority: "Medium",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "15-20%",
    riskLevel: "Medium",
    assignedTo: "—",
    nextAction: "Configurare prin Expedia Group (ecosistem comun)",
    deadline: "2026-06-01",
    notes: "Parte din ecosistemul Expedia. Se configurează simultan."
  },
  {
    id: "vrbo",
    name: "VRBO",
    market: "International",
    priority: "Medium",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "5-8%",
    riskLevel: "Medium",
    assignedTo: "—",
    nextAction: "Configurare prin Expedia Group",
    deadline: "2026-06-01",
    notes: "Parte din ecosistemul Expedia. Comision mai mic decât OTA-urile clasice."
  },
  {
    id: "hotelbeds",
    name: "Hotelbeds",
    market: "B2B / Wholesale",
    priority: "Medium",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "20-25%",
    riskLevel: "Medium",
    assignedTo: "—",
    nextAction: "Aplicație parteneriat B2B",
    deadline: "2026-06-15",
    notes: "Distribuție wholesale — comision ridicat dar volum mare."
  },
  {
    id: "webbeds",
    name: "WebBeds",
    market: "B2B / Wholesale",
    priority: "Low",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "18-22%",
    riskLevel: "Low",
    assignedTo: "—",
    nextAction: "Evaluare parteneriat wholesale",
    deadline: "2026-07-01",
    notes: "Alternativă la Hotelbeds pentru distribuție B2B."
  },
  {
    id: "directbooking",
    name: "DirectBooking",
    market: "Romania",
    priority: "High",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "5-8%",
    riskLevel: "Medium",
    assignedTo: "Vasi",
    nextAction: "Creare cont — platformă locală cu comision scăzut",
    deadline: "2026-05-30",
    notes: "Platformă românească, comision mai mic. Prioritate pentru piața locală."
  },
  {
    id: "cazare",
    name: "Cazare.ro",
    market: "Romania",
    priority: "Medium",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "10%",
    riskLevel: "Low",
    assignedTo: "—",
    nextAction: "Creare listing",
    deadline: "2026-06-15",
    notes: "Nepornit."
  },
  {
    id: "hotelguru",
    name: "HotelGuru",
    market: "Romania / Hungary",
    priority: "Medium",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "12%",
    riskLevel: "Low",
    assignedTo: "—",
    nextAction: "Înregistrare proprietate",
    deadline: "2026-06-15",
    notes: "Platformă populară în Romania și Ungaria."
  },
  {
    id: "cazariro",
    name: "Cazari.ro",
    market: "Romania",
    priority: "Low",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "8-10%",
    riskLevel: "Low",
    assignedTo: "—",
    nextAction: "Evaluare și creare cont",
    deadline: "2026-07-01",
    notes: "Nepornit."
  },
  {
    id: "pensiuni",
    name: "Pensiuni.ro",
    market: "Romania",
    priority: "Low",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "8%",
    riskLevel: "Low",
    assignedTo: "—",
    nextAction: "Verificare eligibilitate (apartamente, nu pensiuni)",
    deadline: "2026-07-01",
    notes: "De verificat dacă apartamentele se pot lista."
  },
  {
    id: "pluxee",
    name: "Pluxee",
    market: "Romania / Corporate",
    priority: "Medium",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "N/A",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "0% (vouchere)",
    riskLevel: "Low",
    assignedTo: "—",
    nextAction: "Înregistrare ca partener de cazare Pluxee",
    deadline: "2026-06-15",
    notes: "Vouchere de vacanță. Segment corporate RO."
  },
  {
    id: "up-romania",
    name: "Up Romania",
    market: "Romania / Corporate",
    priority: "Medium",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "N/A",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "0% (vouchere)",
    riskLevel: "Low",
    assignedTo: "—",
    nextAction: "Înregistrare partener Up Vacanță",
    deadline: "2026-06-15",
    notes: "Vouchere de vacanță emise de angajatori. Potențial segment diaspora."
  },
  {
    id: "edenred",
    name: "Edenred",
    market: "Romania / Corporate",
    priority: "Medium",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "N/A",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "0% (vouchere)",
    riskLevel: "Low",
    assignedTo: "—",
    nextAction: "Înregistrare partener Edenred Vacanță",
    deadline: "2026-06-15",
    notes: "Al treilea emitent de vouchere vacanță din Romania."
  },
  {
    id: "google-hotels",
    name: "Google Hotels Free Booking Links",
    market: "Global",
    priority: "High",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "No",
    allApartmentsPresent: "No",
    ratesSynced: "No",
    availabilitySynced: "No",
    photosUploaded: "No",
    commissionPct: "0% (gratuit)",
    riskLevel: "Medium",
    assignedTo: "Vasi",
    nextAction: "Conectare Google Hotel Center cu site-ul direct",
    deadline: "2026-05-30",
    notes: "Listare gratuită — rezervări directe fără comision. Prioritate ridicată."
  },
  {
    id: "gmb",
    name: "Google My Business",
    market: "Local SEO",
    priority: "High",
    accountCreated: "No",
    listingLive: "No",
    connectedTo5StarDesk: "N/A",
    allApartmentsPresent: "N/A",
    ratesSynced: "N/A",
    availabilitySynced: "N/A",
    photosUploaded: "No",
    commissionPct: "0%",
    riskLevel: "High",
    assignedTo: "Vasi",
    nextAction: "Creare și verificare profil Google Business",
    deadline: "2026-05-15",
    notes: "SEO local critic. Recenzii Google vizibile direct în căutări."
  }
];

const PRIORITY_STYLES: Record<Priority, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700"
};

const RISK_STYLES: Record<RiskLevel, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700"
};

const YES_NO_OPTIONS: YesNo[] = ["Yes", "No", "Partial", "N/A"];

function YesNoBadge({ value }: { value: YesNo }) {
  const styles: Record<YesNo, string> = {
    Yes: "bg-green-100 text-green-700",
    No: "bg-stone-100 text-stone-500",
    Partial: "bg-yellow-100 text-yellow-700",
    "N/A": "bg-stone-50 text-stone-400"
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[value]}`}>
      {value}
    </span>
  );
}

export default function PlatformTrackerPage() {
  const [platforms, setPlatforms] = useState<Platform[]>(initialPlatforms);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState("");
  const [filterPriority, setFilterPriority] = useState<Priority | "All">("All");
  const [filterMarket, setFilterMarket] = useState<string>("All");

  const markets = ["All", ...Array.from(new Set(initialPlatforms.map((p) => p.market))).sort()];

  const filtered = platforms.filter((p) => {
    if (filterPriority !== "All" && p.priority !== filterPriority) return false;
    if (filterMarket !== "All" && p.market !== filterMarket) return false;
    return true;
  });

  function updateField<K extends keyof Platform>(id: string, field: K, value: Platform[K]) {
    setPlatforms((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  function startEditingNotes(platform: Platform) {
    setEditingNotes(platform.id);
    setNotesValue(platform.notes);
  }

  function saveNotes(id: string) {
    updateField(id, "notes", notesValue);
    setEditingNotes(null);
  }

  const completedCount = platforms.filter((p) => p.listingLive === "Yes").length;

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
        <div className="max-w-full mx-auto px-2">
          <h1 className="font-display text-2xl">VAIA Distribution Autopilot</h1>
          <p className="text-cream-100/60 text-sm mt-1">
            Sistem AI de management distribuție — 7 agenți specializați, 24 platforme
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-cream-50 border-b border-stone-200">
        <div className="px-6">
          <nav className="flex gap-0">
            <Link
              href="/admin/autopilot"
              className="px-5 py-4 text-sm font-medium border-b-2 border-transparent text-stone-500 hover:text-forest-900 hover:border-stone-300 transition"
            >
              Autopilot AI
            </Link>
            <span className="px-5 py-4 text-sm font-medium border-b-2 border-forest-700 text-forest-900">
              Platform Tracker
            </span>
            <Link
              href="/admin/autopilot/approval-queue"
              className="px-5 py-4 text-sm font-medium border-b-2 border-transparent text-stone-500 hover:text-forest-900 hover:border-stone-300 transition"
            >
              Approval Queue
            </Link>
          </nav>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Stats bar */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="rounded-xl bg-cream-50 border border-stone-200 px-5 py-3 flex items-center gap-3">
            <span className="font-display text-2xl text-forest-900">{platforms.length}</span>
            <span className="text-xs text-stone-500 uppercase tracking-wider">Platforme totale</span>
          </div>
          <div className="rounded-xl bg-cream-50 border border-stone-200 px-5 py-3 flex items-center gap-3">
            <span className="font-display text-2xl text-green-700">{completedCount}</span>
            <span className="text-xs text-stone-500 uppercase tracking-wider">Listări live</span>
          </div>
          <div className="rounded-xl bg-cream-50 border border-stone-200 px-5 py-3 flex items-center gap-3">
            <span className="font-display text-2xl text-red-700">
              {platforms.filter((p) => p.riskLevel === "High").length}
            </span>
            <span className="text-xs text-stone-500 uppercase tracking-wider">Risc ridicat</span>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as Priority | "All")}
              className="rounded-lg border border-stone-200 bg-cream-50 px-3 py-2 text-sm text-forest-900 focus:outline-none focus:border-walnut-500"
            >
              <option value="All">Toate prioritățile</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              value={filterMarket}
              onChange={(e) => setFilterMarket(e.target.value)}
              className="rounded-lg border border-stone-200 bg-cream-50 px-3 py-2 text-sm text-forest-900 focus:outline-none focus:border-walnut-500"
            >
              {markets.map((m) => (
                <option key={m} value={m}>{m === "All" ? "Toate piețele" : m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-cream-50 border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[1800px]">
              <thead>
                <tr className="bg-forest-950 text-cream-50 text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 text-left sticky left-0 bg-forest-950 z-10 min-w-[160px]">Platformă</th>
                  <th className="px-4 py-3 text-left min-w-[120px]">Piață</th>
                  <th className="px-4 py-3 text-center min-w-[90px]">Prioritate</th>
                  <th className="px-4 py-3 text-center min-w-[100px]">Cont creat</th>
                  <th className="px-4 py-3 text-center min-w-[100px]">Listing live</th>
                  <th className="px-4 py-3 text-center min-w-[120px]">5StarDesk</th>
                  <th className="px-4 py-3 text-center min-w-[110px]">7 apt.</th>
                  <th className="px-4 py-3 text-center min-w-[100px]">Rate sync</th>
                  <th className="px-4 py-3 text-center min-w-[110px]">Avail. sync</th>
                  <th className="px-4 py-3 text-center min-w-[100px]">Poze</th>
                  <th className="px-4 py-3 text-center min-w-[90px]">Comision</th>
                  <th className="px-4 py-3 text-center min-w-[80px]">Risc</th>
                  <th className="px-4 py-3 text-left min-w-[100px]">Responsabil</th>
                  <th className="px-4 py-3 text-left min-w-[200px]">Următoarea acțiune</th>
                  <th className="px-4 py-3 text-left min-w-[100px]">Deadline</th>
                  <th className="px-4 py-3 text-left min-w-[220px]">Note (editabile)</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((platform, idx) => (
                  <tr
                    key={platform.id}
                    className={`border-t border-stone-100 hover:bg-stone-50 transition ${idx % 2 === 0 ? "" : "bg-stone-50/50"}`}
                  >
                    {/* Platform name */}
                    <td className="px-4 py-3 font-medium text-forest-900 sticky left-0 bg-inherit z-10 border-r border-stone-100">
                      {platform.name}
                    </td>

                    {/* Market */}
                    <td className="px-4 py-3 text-stone-600 text-xs">{platform.market}</td>

                    {/* Priority */}
                    <td className="px-4 py-3 text-center">
                      <select
                        value={platform.priority}
                        onChange={(e) => updateField(platform.id, "priority", e.target.value as Priority)}
                        className={`rounded-full px-2 py-0.5 text-xs font-medium border-0 cursor-pointer focus:outline-none ${PRIORITY_STYLES[platform.priority]}`}
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </td>

                    {/* Account created */}
                    <td className="px-4 py-3 text-center">
                      <select
                        value={platform.accountCreated}
                        onChange={(e) => updateField(platform.id, "accountCreated", e.target.value as YesNo)}
                        className="text-xs border-0 bg-transparent cursor-pointer focus:outline-none"
                      >
                        {YES_NO_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </td>

                    {/* Listing live */}
                    <td className="px-4 py-3 text-center">
                      <select
                        value={platform.listingLive}
                        onChange={(e) => updateField(platform.id, "listingLive", e.target.value as YesNo)}
                        className="text-xs border-0 bg-transparent cursor-pointer focus:outline-none"
                      >
                        {YES_NO_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </td>

                    {/* 5StarDesk */}
                    <td className="px-4 py-3 text-center">
                      <YesNoBadge value={platform.connectedTo5StarDesk} />
                    </td>

                    {/* All apartments */}
                    <td className="px-4 py-3 text-center">
                      <YesNoBadge value={platform.allApartmentsPresent} />
                    </td>

                    {/* Rates synced */}
                    <td className="px-4 py-3 text-center">
                      <select
                        value={platform.ratesSynced}
                        onChange={(e) => updateField(platform.id, "ratesSynced", e.target.value as YesNo)}
                        className="text-xs border-0 bg-transparent cursor-pointer focus:outline-none"
                      >
                        {YES_NO_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </td>

                    {/* Availability synced */}
                    <td className="px-4 py-3 text-center">
                      <select
                        value={platform.availabilitySynced}
                        onChange={(e) => updateField(platform.id, "availabilitySynced", e.target.value as YesNo)}
                        className="text-xs border-0 bg-transparent cursor-pointer focus:outline-none"
                      >
                        {YES_NO_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </td>

                    {/* Photos */}
                    <td className="px-4 py-3 text-center">
                      <select
                        value={platform.photosUploaded}
                        onChange={(e) => updateField(platform.id, "photosUploaded", e.target.value as YesNo)}
                        className="text-xs border-0 bg-transparent cursor-pointer focus:outline-none"
                      >
                        {YES_NO_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </td>

                    {/* Commission */}
                    <td className="px-4 py-3 text-center text-xs text-stone-600 font-medium">
                      {platform.commissionPct}
                    </td>

                    {/* Risk */}
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${RISK_STYLES[platform.riskLevel]}`}>
                        {platform.riskLevel}
                      </span>
                    </td>

                    {/* Assigned to */}
                    <td className="px-4 py-3 text-xs text-stone-600">{platform.assignedTo}</td>

                    {/* Next action */}
                    <td className="px-4 py-3 text-xs text-stone-600 max-w-[200px]">{platform.nextAction}</td>

                    {/* Deadline */}
                    <td className="px-4 py-3 text-xs text-stone-600">{platform.deadline}</td>

                    {/* Notes (editable) */}
                    <td className="px-4 py-3">
                      {editingNotes === platform.id ? (
                        <div className="flex gap-1">
                          <textarea
                            value={notesValue}
                            onChange={(e) => setNotesValue(e.target.value)}
                            rows={2}
                            className="flex-1 text-xs rounded border border-walnut-500 px-2 py-1 focus:outline-none resize-none"
                            autoFocus
                          />
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => saveNotes(platform.id)}
                              className="text-xs bg-forest-700 text-cream-50 px-2 py-1 rounded hover:bg-forest-600"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => setEditingNotes(null)}
                              className="text-xs bg-stone-200 text-stone-600 px-2 py-1 rounded hover:bg-stone-300"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditingNotes(platform)}
                          className="text-left text-xs text-stone-500 hover:text-forest-900 w-full group"
                        >
                          <span className="line-clamp-2">{platform.notes || "—"}</span>
                          <span className="text-walnut-500 opacity-0 group-hover:opacity-100 text-xs block mt-0.5">
                            Editează
                          </span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-stone-400 mt-4">
          {filtered.length} din {platforms.length} platforme afișate. Modificările sunt salvate local în sesiune.
        </p>
      </div>
    </div>
  );
}
