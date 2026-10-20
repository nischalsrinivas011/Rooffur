/**
 * Lifestyle photo pipeline for the static site (no image server at runtime).
 *
 *   apps/web/images-src/<slot>.(jpg|jpeg|png|webp)   ← approved source photos
 *        │  pnpm images
 *        ▼
 *   apps/web/public/images/<slot>-<width>.webp        ← responsive variants
 *   apps/web/src/content/images.generated.json        ← dimensions + blur preview
 *
 * The custom next/image loader (src/lib/image-loader.ts) maps each requested
 * width to the matching variant, so pages get a real srcset. Run this
 * whenever photos are added or replaced, and commit the outputs.
 *
 * Usage: node scripts/optimize-images.mjs [sourceDir] [publicDir] [manifestPath]
 */
import { mkdirSync, readdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

/** Must match images.deviceSizes + images.imageSizes in next.config.ts. */
export const IMAGE_WIDTHS = [384, 640, 960, 1280, 1920];

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

export async function optimizeImages({
  sourceDir = join(root, "images-src"),
  publicDir = join(root, "public", "images"),
  manifestPath = join(root, "src", "content", "images.generated.json"),
} = {}) {
  const sources = existsSync(sourceDir)
    ? readdirSync(sourceDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    : [];

  rmSync(publicDir, { recursive: true, force: true });
  mkdirSync(publicDir, { recursive: true });

  const manifest = {};
  for (const file of sources.sort()) {
    const slot = basename(file, extname(file)).toLowerCase();
    const input = sharp(join(sourceDir, file)).rotate(); // honour EXIF orientation
    const { width, height } = await input.metadata();
    if (!width || !height) throw new Error(`Cannot read dimensions of ${file}`);

    for (const w of IMAGE_WIDTHS) {
      await input
        .clone()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(join(publicDir, `${slot}-${w}.webp`));
    }

    const blur = await input.clone().resize(16).webp({ quality: 40 }).toBuffer();
    manifest[slot] = {
      src: `/images/${slot}.webp`,
      width,
      height,
      blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    };
  }

  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [sourceDir, publicDir, manifestPath] = process.argv.slice(2);
  const manifest = await optimizeImages({
    ...(sourceDir && { sourceDir: resolve(sourceDir) }),
    ...(publicDir && { publicDir: resolve(publicDir) }),
    ...(manifestPath && { manifestPath: resolve(manifestPath) }),
  });
  const slots = Object.keys(manifest);
  console.log(
    slots.length
      ? `optimize-images: generated ${IMAGE_WIDTHS.length} WebP widths for ${slots.join(", ")}.`
      : "optimize-images: no photos in images-src/ — photo slots show their placeholders.",
  );
}
