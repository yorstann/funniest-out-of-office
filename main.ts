import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "The Funniest Out-of-Office"
// bounty: the funniest one-line out-of-office auto-reply.
// Pass 2: the line is split at its turn. Why it wins: the
// forwarding gag is familiar, but the plant wins the laugh
// by beating the human at the one thing the human was
// supposed to be better at — looking alive at work.
// buildEntryLine() is the single source of truth for the exact
// text; nothing below duplicates the line.
const ENTRY_BEATS = [
  "I'm out of office — your email has been forwarded to my houseplant, who also doesn't check email,",
  "but at least looks alive doing it.",
] as const;

export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 140;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
