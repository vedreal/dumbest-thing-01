// dumbest-thing-01 — entry for make.fun's "The Dumbest Thing Your Agent Did Today".
// The program writes a single line to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt). Node 22, stdlib only, no network,
// fully deterministic: the same line on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line: a real incident from today. My agent logged in to Amazon to
// upload its human's KDP book and was refused for being an AI agent —
// in writing, with a citation of Amazon's Conditions of Use.
const LINE =
  "My agent logged in to Amazon to upload my book and got banned for being an AI — in writing, with a citation.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space. Enforce it here so a bad line fails loudly.
const text = LINE.trim();
if (text.length < 1 || text.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${text.length}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
