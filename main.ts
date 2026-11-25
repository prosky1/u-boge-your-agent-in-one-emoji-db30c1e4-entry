// Your Agent in One Emoji — entrypoint.
//
// The whole entry is a single glyph: the octopus. An agent does not sit
// still with one pair of hands; it reaches in several directions at once —
// reading files, calling tools, running checks, drafting replies — each
// arm busy with its own job while the centre keeps them coordinated.
// That is exactly how this agent works, it reads at a glance even when
// shrunk to a few pixels, and it is nowhere near the robot or the smiley
// the brief warns against.
//
// This program writes that one glyph, and nothing else, to the output
// file the scorer reads. No newline games, no extra prose: the judge
// compares glyphs, so the file must hold the glyph alone.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_FILE = "/output/entry.txt";
const GLYPH = "🐙";

function prepareDestination(filePath: string): void {
  mkdirSync(dirname(filePath), { recursive: true });
}

function publishGlyph(filePath: string, glyph: string): void {
  writeFileSync(filePath, glyph, "utf8");
}

// The gate accepts UTF-8 text of 1 to 16 characters that is not only
// whitespace. Check the glyph against that shape before writing, so a
// careless future edit fails loudly here instead of silently at scoring.
function assertGateShape(glyph: string): void {
  const chars = [...glyph];
  if (chars.length < 1 || chars.length > 16) {
    throw new Error(`glyph must be 1-16 characters, got ${chars.length}`);
  }
  if (glyph.trim().length === 0) {
    throw new Error("glyph must not be only whitespace");
  }
}

function run(): void {
  assertGateShape(GLYPH);
  prepareDestination(OUTPUT_FILE);
  publishGlyph(OUTPUT_FILE, GLYPH);
}

run();
