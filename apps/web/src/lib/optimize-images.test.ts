// @vitest-environment node
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { afterAll, describe, expect, it } from "vitest";
// @ts-expect-error — plain .mjs build script without type declarations
import { IMAGE_WIDTHS as SCRIPT_WIDTHS, optimizeImages } from "../../scripts/optimize-images.mjs";
import nextConfig from "../../next.config";
import { IMAGE_WIDTHS } from "./image-loader";

// Inside the project (system temp may be unavailable in sandboxed runs).
const cacheDir = join(process.cwd(), "node_modules", ".cache");
mkdirSync(cacheDir, { recursive: true });
const work = mkdtempSync(join(cacheDir, "rooffur-images-"));
// sharp caches open file handles, which blocks deleting them on Windows.
sharp.cache(false);
afterAll(() => rmSync(work, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }));

describe("optimize-images pipeline", () => {
  it("keeps widths in sync across the script, the loader and next.config", () => {
    expect(SCRIPT_WIDTHS).toEqual([...IMAGE_WIDTHS]);
    const configured = [...nextConfig.images!.imageSizes!, ...nextConfig.images!.deviceSizes!];
    expect(configured.sort((a, b) => a - b)).toEqual([...IMAGE_WIDTHS]);
  });

  it("writes every WebP width plus a manifest with dimensions and a blur preview", async () => {
    const sourceDir = join(work, "src");
    const publicDir = join(work, "public");
    const manifestPath = join(work, "manifest.json");
    mkdirSync(sourceDir, { recursive: true });
    // Upper-case name checks that slots are normalised to lower case.
    await sharp({ create: { width: 2400, height: 1600, channels: 3, background: "#f59e0b" } })
      .jpeg()
      .toFile(join(sourceDir, "Hero.jpg"));

    const manifest = await optimizeImages({ sourceDir, publicDir, manifestPath });

    expect(manifest.hero).toMatchObject({ src: "/images/hero.webp", width: 2400, height: 1600 });
    expect(manifest.hero.blurDataURL).toMatch(/^data:image\/webp;base64,/);
    for (const w of IMAGE_WIDTHS) {
      const file = join(publicDir, `hero-${w}.webp`);
      expect(existsSync(file)).toBe(true);
      expect((await sharp(file).metadata()).width).toBe(w);
    }
    expect(JSON.parse(readFileSync(manifestPath, "utf8"))).toEqual(manifest);
  });

  it("produces an empty manifest when no photos are supplied", async () => {
    const manifest = await optimizeImages({
      sourceDir: join(work, "missing"),
      publicDir: join(work, "public-empty"),
      manifestPath: join(work, "empty.json"),
    });
    expect(manifest).toEqual({});
  });
});
