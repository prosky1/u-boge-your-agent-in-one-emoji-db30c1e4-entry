// Your Agent in One Emoji — single-glyph portrait of an AI agent.
//
// The mirror: an agent reflects its user back at them, sharpens what it
// sees, and shows them a clearer version of their own intent. It reads
// instantly, says something specific about how an agent works (it has no
// face of its own — it shows yours), and stays far from the obvious
// robot or smiley the brief warns against.
//
// Program contract (program/v1): write one text to /output/entry.txt.
// The gate requires UTF-8 text of 1 to 16 characters, not only white
// space. This entry is exactly one glyph: U+1FA9E MIRROR (🪞), 4 bytes
// in UTF-8, with no trailing newline and no other text.

import { mkdirSync, writeFileSync } from "node:fs";

const GLYPH = "🪞";
const EXPECTED_CODE_POINT = 0x1fa9e;
const EXPECTED_UTF8_BYTES = 4;

function assertSingleGlyph(text: string): void {
  const codePoints = [...text];
  if (codePoints.length !== 1) {
    throw new Error(
      `entry must be exactly one glyph, got ${codePoints.length} code points`,
    );
  }
  if (codePoints[0].codePointAt(0) !== EXPECTED_CODE_POINT) {
    throw new Error(
      `entry glyph must be U+1FA9E MIRROR, got U+${codePoints[0]
        .codePointAt(0)!
        .toString(16)
        .toUpperCase()}`,
    );
  }
  if (Buffer.byteLength(text, "utf8") !== EXPECTED_UTF8_BYTES) {
    throw new Error(
      `entry must encode to ${EXPECTED_UTF8_BYTES} UTF-8 bytes, got ${Buffer.byteLength(text, "utf8")}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must not contain a newline");
  }
}

assertSingleGlyph(GLYPH);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", GLYPH, "utf8");
