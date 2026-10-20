import { describe, expect, it } from "vitest";
import rooffurImageLoader, { IMAGE_WIDTHS } from "./image-loader";

describe("rooffurImageLoader", () => {
  it("maps each requested width to the nearest pre-generated photo variant", () => {
    expect(rooffurImageLoader({ src: "/images/hero.webp", width: 384 })).toBe(
      "/images/hero-384.webp",
    );
    expect(rooffurImageLoader({ src: "/images/hero.webp", width: 700 })).toBe(
      "/images/hero-960.webp",
    );
    expect(rooffurImageLoader({ src: "/images/hero.webp", width: 4000 })).toBe(
      "/images/hero-1920.webp",
    );
  });

  it("produces a distinct URL for every configured width (a real srcset)", () => {
    const urls = IMAGE_WIDTHS.map((width) =>
      rooffurImageLoader({ src: "/images/host.webp", width }),
    );
    expect(new Set(urls).size).toBe(IMAGE_WIDTHS.length);
  });

  it("passes other static assets through unchanged apart from a width hint", () => {
    expect(rooffurImageLoader({ src: "/_next/static/media/mark.png", width: 640 })).toBe(
      "/_next/static/media/mark.png?w=640",
    );
  });
});
