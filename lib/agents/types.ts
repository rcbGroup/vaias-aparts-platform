export type GapSeverity = "low" | "medium" | "high" | "critical";
export type GapClassification =
  | "weekday"
  | "weekend"
  | "holiday"
  | "shoulder"
  | "peak";

export type OccupancyGap = {
  apartmentId: number;
  apartmentSlug: string;
  apartmentName: string;
  startDate: string; // ISO yyyy-mm-dd
  endDate: string; // ISO yyyy-mm-dd, exclusive
  nights: number;
  daysUntilStart: number;
  classification: GapClassification;
  severity: GapSeverity;
  priorityScore: number;
  basePrice: number;
  suggestedDiscountPct: number;
  suggestedPrice: number;
};

export type CampaignType =
  | "last_minute"
  | "extended_stay"
  | "weekend_package"
  | "seasonal"
  | "diaspora"
  | "corporate_retreat"
  | "re_engagement";

export type CampaignChannel =
  | "direct"
  | "whatsapp"
  | "email"
  | "social"
  | "booking_com"
  | "airbnb";

export type CampaignDraft = {
  id: string;
  type: CampaignType;
  channel: CampaignChannel;
  apartmentSlugs: string[];
  startDate: string;
  endDate: string;
  discountPct: number;
  messageRO: string;
  messageEN: string;
  whatsappMessageRO: string;
  whatsappMessageEN: string;
  rationale: string;
  estimatedReach: number;
  estimatedRevenue: number;
  status: "draft" | "queued" | "sent" | "skipped";
  createdAt: string;
};

export type LeadOrigin = {
  ip?: string;
  countryCode?: string;
  cityHint?: string;
  airportCode?: string;
  detectedLang?: string;
  utmSource?: string;
  referrer?: string;
};

export type EngagementSequence = {
  step: 1 | 2 | 3;
  channel: CampaignChannel;
  triggerHoursAfter: number;
  messageRO: string;
  messageEN: string;
};

export type AgentRun = {
  id: string;
  startedAt: string;
  finishedAt?: string;
  gapsDetected: number;
  campaignsDrafted: number;
  campaignsQueued: number;
  messagesScheduled: number;
  messagesSent: number;
  errors: string[];
  summary: string;
};

export type AgentState = {
  paused: boolean;
  lastRunAt?: string;
  lastSummary?: string;
  totalRuns: number;
  totalGapsDetected: number;
  totalCampaignsDrafted: number;
  totalMessagesSent: number;
};

export type AgentMetrics = {
  occupancyPct: number;
  bookingsThisMonth: number;
  revenueThisMonth: number;
  upcomingGaps: number;
  criticalGaps: number;
  activeCampaigns: number;
  leadsThisWeek: number;
  conversionRate: number;
};

export type PricingSuggestion = {
  apartmentSlug: string;
  basePrice: number;
  suggestedPrice: number;
  multiplier: number;
  reason: string;
  ruleHits: string[];
};

export type AvailabilityDay = {
  date: string; // yyyy-mm-dd
  available: boolean;
  source: "free" | "booking" | "blocked";
  reason?: string;
};

export type ApartmentAvailability = {
  apartmentId: number;
  apartmentSlug: string;
  apartmentName: string;
  days: AvailabilityDay[];
};
