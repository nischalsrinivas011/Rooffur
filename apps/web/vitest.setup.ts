import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { createElement, type ImgHTMLAttributes } from "react";
import { afterEach, vi } from "vitest";

type NextImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string | { src: string };
  priority?: boolean;
  placeholder?: string;
  blurDataURL?: string;
};

// Vite resolves image imports to URL strings rather than Next's static image
// objects, so render next/image as a plain <img> in unit tests, dropping the
// Next-only props that aren't valid DOM attributes.
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: NextImageProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- strip Next-only props
    const { priority, placeholder, blurDataURL, ...rest } = props;
    return createElement("img", { ...rest, alt, src: typeof src === "string" ? src : src.src });
  },
}));

afterEach(() => {
  cleanup();
});
