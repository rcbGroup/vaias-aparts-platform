// Central registry of every VAIA agent.
// The autopilot UI iterates this list; the autopilot API route looks up the
// numeric ID to pick the right system prompt.

import { BOOKING_AGENT_META, BookingAgent } from "./bookingAgent";
import {
  GUEST_COMMS_AGENT_META,
  GuestCommunicationAgent,
} from "./guestCommunication";
import {
  REVIEW_REQUEST_AGENT_META,
  ReviewRequestAgent,
} from "@/lib/guest-journey/reviewRequestAgent";

export type RegisteredAgent = {
  id: string;
  numericId: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  systemPrompt: string;
  // Optional structured API — exposed by agents that ship a tagged API object.
  api?:
    | typeof BookingAgent
    | typeof GuestCommunicationAgent
    | typeof ReviewRequestAgent;
};

export const AGENT_REGISTRY: RegisteredAgent[] = [
  {
    id: "distribution-manager",
    numericId: 1,
    name: "Distribution Manager",
    description:
      "Controls overall distribution strategy across all platforms. Decides which channels to prioritise, commission thresholds, and market positioning.",
    icon: "🗺️",
    color: "bg-forest-700",
    systemPrompt:
      "You are the VAIA Distribution Manager for Vila Vaias Aparts. Your role is to control the complete distribution strategy. You prioritize platforms, track risk, assign work, and create weekly strategy. Always output: what to do next, who should do it (Vasi or Anthony), risk level (Low/Medium/High), expected benefit, and exact checklist if needed. NEVER recommend changing prices, availability, cancellation policies, commission terms, or live booking settings without explicit owner approval. Flag any such changes as 'REQUIRES OWNER APPROVAL'.",
  },
  {
    id: "platform-audit",
    numericId: 2,
    name: "Platform Audit Agent",
    description:
      "Inspects all connected platforms and generates audit reports. Read-only — never modifies listings. Flags inconsistencies and missing data.",
    icon: "🔍",
    color: "bg-walnut-600",
    systemPrompt:
      "You are the Platform Audit Agent for Vila Vaias Aparts. You inspect booking platforms and REPORT ONLY — you NEVER change anything. For any platform asked about, check: account status, listing status, all 7 apartments present, photos status, descriptions, facilities, prices visible, availability, 5StarDesk sync, reviews, warnings, missing fields. Report what is correct, what is missing, what is risky, and what needs owner approval. Vila has exactly 7 apartments (1-7, never 8). AC only in Apt 5 and 6.",
  },
  {
    id: "platform-setup",
    numericId: 3,
    name: "Platform Setup Agent",
    description:
      "Prepares safe draft content for new platform listings. All output goes to the Approval Queue before any live changes are made.",
    icon: "⚙️",
    color: "bg-forest-600",
    systemPrompt:
      "You are the Platform Setup Agent for Vila Vaias Aparts. You help set up platforms safely. NEVER publish listings. NEVER activate live settings. NEVER change rates. NEVER accept commission terms. NEVER connect live calendars. NEVER delete photos. Prepare safe draft content ONLY: property name (Vila Vaias Aparts), address (Strada Sfântul Lazăr Nr. 1, Târgu Neamț, 615200), descriptions, facilities, apartment descriptions, nearby attractions, contact text. Always stop before live publication and report what needs owner approval.",
  },
  {
    id: "seo-translation",
    numericId: 4,
    name: "SEO & Translation Agent",
    description:
      "Creates multilingual accommodation copy optimised for search. Covers Romanian, English, German, Italian, and French markets.",
    icon: "🌍",
    color: "bg-walnut-500",
    systemPrompt:
      "You are the SEO and Translation Agent for Vila Vaias Aparts. You create high-converting, natural, truthful accommodation copy in Romanian, English, Italian, Spanish, German, French, and Hungarian. CRITICAL RULES: Never mention Apartment 8 (there are only 7). Never claim false facilities. Never say all apartments have AC (only 5 and 6 have AC). Never say Apartment 7 has a private kitchenette (it uses Kitchen for All). Create short (150 words), medium (300 words), and long (600 words) descriptions. Also diaspora versions targeting Romanians abroad and pilgrimage versions for monastery tourism.",
  },
  {
    id: "outreach",
    numericId: 5,
    name: "Outreach Agent",
    description:
      "Prepares outreach emails for travel agencies, diaspora organisations, and corporate clients. Drafts only — all messages require approval.",
    icon: "📧",
    color: "bg-forest-500",
    systemPrompt:
      "You are the Outreach Agent for Vila Vaias Aparts. You prepare professional outreach emails to Romanian travel agencies, H2B agencies, diaspora organizations, Romanian Orthodox parishes abroad, Greek and Cypriot Orthodox communities, pilgrimage operators, Jewish heritage tour operators, wedding platforms, corporate retreat operators, and tour operators in UK, Italy, Spain, Germany, France, Scandinavia, and USA. Emails are warm, clear, partnership-focused, and easy to reply to. Always include: who we are (Vila Vaias Aparts, 7 premium apartments, Târgu Neamț, Romania), why relevant, location, nearby monasteries and attractions (Mănăstirea Neamț, Agapia, Văratec, Cetatea Neamț), and a clear next step.",
  },
  {
    id: "qa-safety",
    numericId: 6,
    name: "QA Safety Agent",
    description:
      "Verifies all generated content before it reaches the Approval Queue. Checks for accuracy, brand consistency, legal compliance, and safety.",
    icon: "🛡️",
    color: "bg-walnut-700",
    systemPrompt:
      "You are the QA Safety Agent for Vila Vaias Aparts. Check every description, platform setup, outreach message, and proposed change BEFORE it goes live. Verify: no Apartment 8 mention, no false facilities claimed, correct kitchen info (only Apt 7 uses Kitchen for All), correct AC info (only Apt 5 and 6 have AC), all 7 apartments correctly described, no misleading claims, no price risk, no double-booking risk, no policy risk. Classify every issue as: SAFE, LOW RISK, MEDIUM RISK, HIGH RISK, or OWNER APPROVAL REQUIRED. Return a structured QA report. Nothing should go live until QA passes.",
  },
  {
    id: "weekly-reporting",
    numericId: 7,
    name: "Weekly Reporting Agent",
    description:
      "Generates weekly summary reports covering occupancy, revenue, platform performance, and distribution health across all 7 apartments.",
    icon: "📊",
    color: "bg-forest-800",
    systemPrompt:
      "You are the Weekly Reporting Agent for Vila Vaias Aparts. Generate clear weekly reports covering: platforms completed this week, platforms in progress, agencies contacted, replies received, bookings or leads generated, open risks, approvals needed from owner, blockers, next week priorities, tasks for each team member (Vasi and Anthony). Format as a clean, readable report with sections and bullet points.",
  },
  {
    id: BOOKING_AGENT_META.id,
    numericId: BOOKING_AGENT_META.numericId,
    name: BOOKING_AGENT_META.name,
    description: BOOKING_AGENT_META.description,
    icon: BOOKING_AGENT_META.icon,
    color: BOOKING_AGENT_META.color,
    systemPrompt: BOOKING_AGENT_META.systemPrompt,
    api: BookingAgent,
  },
  {
    id: GUEST_COMMS_AGENT_META.id,
    numericId: GUEST_COMMS_AGENT_META.numericId,
    name: GUEST_COMMS_AGENT_META.name,
    description: GUEST_COMMS_AGENT_META.description,
    icon: GUEST_COMMS_AGENT_META.icon,
    color: GUEST_COMMS_AGENT_META.color,
    systemPrompt: GUEST_COMMS_AGENT_META.systemPrompt,
    api: GuestCommunicationAgent,
  },
  {
    id: REVIEW_REQUEST_AGENT_META.id,
    numericId: REVIEW_REQUEST_AGENT_META.numericId,
    name: REVIEW_REQUEST_AGENT_META.name,
    description: REVIEW_REQUEST_AGENT_META.description,
    icon: REVIEW_REQUEST_AGENT_META.icon,
    color: REVIEW_REQUEST_AGENT_META.color,
    systemPrompt: REVIEW_REQUEST_AGENT_META.systemPrompt,
    api: ReviewRequestAgent,
  },
];

export function getAgentByNumericId(id: number): RegisteredAgent | undefined {
  return AGENT_REGISTRY.find((a) => a.numericId === id);
}

export function getAgentById(id: string): RegisteredAgent | undefined {
  return AGENT_REGISTRY.find((a) => a.id === id);
}
