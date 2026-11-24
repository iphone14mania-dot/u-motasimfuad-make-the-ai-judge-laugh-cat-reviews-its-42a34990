// Make the AI Judge Laugh: Cat Reviews Its Human — entry program.
//
// Writes one funny single-line one-star review from a house cat about
// its human to /output/entry.txt. Deterministic, no network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. The complaint is specific and recognisable — the
// sunbeam every cat chases moves a little every day (RULES.txt
// criterion 2) — and the cat blames the human for it, measuring the
// human by cat standards: in the cat's cosmology the human controls the
// sun, so the review gives away far more about the cat than the owner
// (criterion 3). "No notice, no apology" keeps the deadpan shape of a
// real one-star review while the content goes absurd (criterion 5), and
// the sting lands in the last few words: the cat is filing the review
// from the new sunbeam, which rewards a second read (criterion 4).
// Revision: an earlier draft complained the human could not tell the
// "feed me" meow from the "open the door" meow — strong, but its sting
// stated the cat's certainty instead of staging the cat's worldview. A
// second draft had the human open a tin with a knife "like an animal" —
// a good inversion, but a broken can opener is a one-off incident, less
// recognisable than the daily sunbeam. No puns: the brief only welcomes
// a pun when it serves the complaint.
const ENTRY =
  "One star. The human moves my sunbeam. Every day, a different spot, no notice, no apology. I have filed this review from the new sunbeam.";

// Competition rules: 1 to 200 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
