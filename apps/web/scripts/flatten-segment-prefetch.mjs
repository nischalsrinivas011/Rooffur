/**
 * Post-build fix for Next.js 16 static export (`output: "export"`).
 *
 * The export writes route-segment prefetch payloads as nested files, e.g.
 *   out/terms/__next.!KHB1YmxpYyk/terms/__PAGE__.txt
 * but the browser requests them with dot-joined names, e.g.
 *   /terms/__next.!KHB1YmxpYyk.terms.__PAGE__.txt
 * so every prefetch 404s on a plain static host (console errors, and
 * client-side navigation falls back to full page loads).
 *
 * This script adds a copy of each nested payload under the requested
 * dot-joined name. It only adds files; nothing is moved or deleted.
 * Remove it once Next.js emits matching names for static exports.
 */
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const outDir = new URL("../out/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else yield full;
  }
}

if (!existsSync(outDir)) {
  console.error(`flatten-segment-prefetch: ${outDir} not found (run next build first).`);
  process.exit(1);
}

let added = 0;
for (const file of walk(outDir)) {
  const parts = relative(outDir, file).split(sep);
  const segmentIndex = parts.findIndex((p, i) => p.startsWith("__next.") && i < parts.length - 1);
  if (segmentIndex === -1) continue;

  const flatName = parts.slice(segmentIndex).join(".");
  const target = join(outDir, ...parts.slice(0, segmentIndex), flatName);
  if (!existsSync(target)) {
    copyFileSync(file, target);
    added += 1;
  }
}

console.log(`flatten-segment-prefetch: added ${added} prefetch payload alias(es).`);
