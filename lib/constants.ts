export const TIER_OPTIONS = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "ultra", label: "Ultra" },
] as const;

export type Tier = (typeof TIER_OPTIONS)[number]["value"];

type TierColor = "emerald" | "violet" | "cyan";

const TIER_COLOR_MAP: Record<TierColor, { border: string; text: string }> = {
  emerald: {
    border: "border-[#FF6B2C]/30",
    text: "text-[#FF6B2C]",
  },
  violet: {
    border: "border-[#FFC107]/40",
    text: "text-[#d97706]",
  },
  cyan: {
    border: "border-[#1A1A1A]/25",
    text: "text-[#1A1A1A]",
  },
};

export function getTierColorClasses(color: TierColor) {
  return TIER_COLOR_MAP[color];
}

// Tier styling constants for UI components
export const TIER_STYLES: Record<
  Tier,
  {
    gradient: string;
    border: string;
    text: string;
    badge: string;
  }
> = {
  free: {
    gradient: "from-[#FF6B2C] to-[#f59e0b]",
    border: "border-[#FF6B2C]/30",
    text: "text-[#FF6B2C]",
    badge: "bg-[#FF6B2C] text-white",
  },
  pro: {
    gradient: "from-[#FFC107] to-[#FF6B2C]",
    border: "border-[#FFC107]/40",
    text: "text-[#d97706]",
    badge: "bg-[#FFC107] text-[#1A1A1A]",
  },
  ultra: {
    gradient: "from-[#1A1A1A] to-[#3f3f46]",
    border: "border-[#1A1A1A]/30",
    text: "text-[#1A1A1A]",
    badge: "bg-[#1A1A1A] text-white",
  },
};

export const TIER_FEATURES = [
  {
    tier: "Free",
    color: "emerald",
    features: [
      "Access to foundational courses",
      "Community Discord access",
      "Basic projects & exercises",
      "Email support",
    ],
  },
  {
    tier: "Pro",
    color: "violet",
    features: [
      "Everything in Free",
      "All Pro-tier courses",
      "Advanced real-world projects",
      "Priority support",
      "Course completion certificates",
    ],
  },
  {
    tier: "Ultra",
    color: "cyan",
    features: [
      "Everything in Pro",
      "AI Learning Assistant",
      "Exclusive Ultra-only content",
      "Monthly 1-on-1 sessions",
      "Private Discord channel",
      "Early access to new courses",
      "Lifetime updates",
    ],
  },
] as const;
