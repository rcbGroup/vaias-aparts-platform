#!/usr/bin/env node
// check-facts.mjs — WO4 WP8
// Run: node check-facts.mjs
// Fails (exit 1) if any FATAL banned pattern is found.
// Add to CI after build step.
//
// False-positive prevention rules:
//   - Lines starting with // (comments) are checked only for truly fatal patterns
//   - "no apartment 8" / "NU există apartament 8" lines are NOT violations
//   - Correctly qualified Emperor claims (with "Apts 1-6" or "dublu standard" on same line) are fine

import { readdirSync, readFileSync, statSync } from "fs";
import { join, extname } from "path";

const EXTENSIONS = new Set([".tsx", ".ts", ".js", ".mjs"]);
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "dist", "build"]);
const SKIP_FILES = new Set(["check-facts.mjs"]);

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    try {
      const stat = statSync(full);
      if (stat.isDirectory()) walk(full, files);
      else if (EXTENSIONS.has(extname(name)) && !SKIP_FILES.has(name)) files.push(full);
    } catch { /* skip unreadable */ }
  }
  return files;
}

const CHECKS = [
  {
    label: "aggregateRating in JSON-LD",
    fatal: true,
    test(line) {
      return /"@type"\s*:\s*"AggregateRating"/.test(line) && !line.trimStart().startsWith("//");
    },
  },
  {
    label: "Emperor claim for Apt 7",
    fatal: true,
    test(line) {
      const t = line.trim();
      if (t.startsWith("//") || t.startsWith("*")) return false;
      if (!(/emperor/i).test(t)) return false;

      // These are the two known bad patterns that WO4 fixed — any regression would look like these:
      // 1. Apt 7 explicitly mentioned as having Emperor
      if (/Apt(?:artament)?\s*7.*emperor|emperor.*Apt(?:artament)?\s*7/i.test(t)) {
        // But OK if the line is saying Apt 7 has STANDARD (a correction, not a claim)
        if (/dublu\s+standard|standard\s+double/i.test(t)) return false;
        return true;
      }
      // 2. Generic "all 7" or "each apartment" Emperor claim
      if (/7\s+apartamente?.*emperor|toate\s+pat.*emperor|fiecare\s+apartament.*emperor/i.test(t)) return true;
      // 3. Emperor without ANY apartment number qualifier (could be generic)
      // Skip if a specific apt number 1-6 or a range qualifier is present
      if (/Apts?\s*1[–-]6|Apartament[ele]+\s*[1-6]|Apartament[ele]+\s*[1-6]\s*[&și]|1\s*[&și]\s*2|3\s*[&și]\s*4|5\s*[&și]\s*6|6\s+din\s+7|șase\s+din\s+șapte/i.test(t)) return false;
      return false; // all remaining Emperor mentions need specific context check above
    },
  },
  {
    label: "Unverified 99-review stat (in user-visible text)",
    fatal: true,
    test(line) {
      const t = line.trim();
      if (t.startsWith("//") || t.startsWith("*")) return false;
      // Only flag if 99 + recenzii + Google/5.0 together in display context
      if (/\b99\s+recenzii?\b/i.test(t) && /Google|5\.0/.test(t)) return true;
      return false;
    },
  },
  {
    label: "Unverified Booking.com 9.4 score (in user-visible text)",
    fatal: true,
    test(line) {
      const t = line.trim();
      if (t.startsWith("//") || t.startsWith("*")) return false;
      return /Booking\.com\s+9\.4|9\.4\s+Booking/i.test(t);
    },
  },
  {
    label: "#1 TripAdvisor claim",
    fatal: true,
    test(line) {
      const t = line.trim();
      if (t.startsWith("//")) return false;
      return /#1\s+TripAdvisor|TripAdvisor\s+#1/i.test(t);
    },
  },
  {
    label: "Price guarantee claim",
    fatal: true,
    test(line) {
      const t = line.trim();
      if (t.startsWith("//")) return false;
      return /cel\s+mai\s+mic\s+pre[țt]\s+garantat|lowest\s+price\s+guaranteed?\b/i.test(t);
    },
  },
  {
    label: "Vasile Jiboc personal signature",
    fatal: true,
    test(line) {
      const t = line.trim();
      if (t.startsWith("//")) return false;
      return /Vasile\s+Jiboc/i.test(t);
    },
  },
  {
    label: "Wrong cedilla (ş/ţ instead of ș/ț)",
    fatal: true,
    test(line) {
      return /[şţ]/.test(line);
    },
  },
  {
    label: "Fabricated Google Place ID (not in comment)",
    fatal: true,
    test(line) {
      const t = line.trim();
      if (t.startsWith("//") || t.startsWith("*")) return false;
      return /ChIJVilaVaiasAparts/i.test(t);
    },
  },
  {
    label: "Han Maria / Apartment 8 positive claim",
    fatal: true,
    test(line) {
      const t = line.trim();
      if (t.startsWith("//")) return false;
      // Skip negations: "no apartment 8", "NU există", "NOT Apt 8", "NEVER mention Apt 8"
      if (/\bnu\s+exist[aă]|NICIODATĂ|there\s+is\s+no\s+apartment|NU\s+există|does\s+not\s+exist/i.test(t)) return false;
      // Skip if it's a check instruction
      if (/never\s+mention|check.*apartment\s*8|apartament\s*8\s*nu/i.test(t)) return false;
      return /Han\s+Maria|Apartment\s*8[^\d]|Apartament\s*8[^\d]/i.test(t);
    },
  },
];

let hasErrors = false;
const violations = [];

for (const file of walk(".")) {
  let content;
  try { content = readFileSync(file, "utf-8"); } catch { continue; }

  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const check of CHECKS) {
      try {
        if (check.test(line)) {
          violations.push({ file, line: i + 1, text: line.trim(), label: check.label, fatal: check.fatal });
          if (check.fatal) hasErrors = true;
        }
      } catch { /* ignore regex errors */ }
    }
  }
}

if (violations.length === 0) {
  console.log("✅ check-facts: all checks passed.");
  process.exit(0);
}

for (const v of violations) {
  const level = v.fatal ? "FAIL" : "WARN";
  console.error(`[${level}] ${v.file}:${v.line} — ${v.label}`);
  console.error(`       ${v.text.slice(0, 120)}`);
}

const errCount = violations.filter(v => v.fatal).length;
const warnCount = violations.filter(v => !v.fatal).length;
console.error(`\n${errCount} error(s), ${warnCount} warning(s).`);

if (hasErrors) {
  console.error("check-facts FAILED.");
  process.exit(1);
} else {
  console.warn("check-facts passed with warnings.");
  process.exit(0);
}
