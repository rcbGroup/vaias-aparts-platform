/** Tiny class joiner (no deps). Later classes win only by Tailwind's own cascade, so keep overrides explicit. */
export function cn(...inputs: Array<string | false | null | undefined | 0>): string {
  return inputs.filter(Boolean).join(" ");
}
