import type { NextConfig } from "next";

/**
 * Rooffur V1 is a static content site: `next build` exports plain
 * HTML/CSS/JS to `out/`, deployable to any static host.
 *
 * There is no image server, so lifestyle photos are pre-generated at fixed
 * widths by `pnpm images` (scripts/optimize-images.mjs) and the custom loader
 * maps next/image's srcset widths onto those files. The widths below must
 * match IMAGE_WIDTHS in that script and in src/lib/image-loader.ts.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 960, 1280, 1920],
    imageSizes: [384],
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
