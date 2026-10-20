import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { getPhoto, type PhotoSlot } from "@/content/images";
import { cn } from "@/lib/cn";

type LifestyleImageProps = {
  slot: PhotoSlot;
  /** next/image `sizes` hint for responsive loading. */
  sizes: string;
  /** Load eagerly (above the fold). Everything else lazy-loads. */
  priority?: boolean;
  className?: string;
  /** Extra classes for the photo itself, e.g. object-position for wide crops. */
  imageClassName?: string;
  /** Placeholder composition shown until an approved photo is supplied. */
  placeholder: {
    tone: "warm" | "navy";
    icons: readonly [LucideIcon, LucideIcon, LucideIcon];
  };
};

/**
 * A homepage lifestyle photo. Renders the approved, pre-optimized photo for
 * `slot` when one exists (descriptive alt, srcset, blur-up, fixed aspect so
 * there's no layout shift). Otherwise renders an intentional, decorative
 * placeholder — never a random or stock image.
 */
export function LifestyleImage({
  slot,
  sizes,
  priority = false,
  className,
  imageClassName,
  placeholder,
}: LifestyleImageProps) {
  const photo = getPhoto(slot);
  const frame = cn("relative isolate overflow-hidden rounded-2xl shadow-lg", className);

  if (photo) {
    return (
      <div data-photo-slot={slot} className={frame}>
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={photo.blurDataURL}
          className={cn("absolute inset-0 size-full object-cover", imageClassName)}
        />
      </div>
    );
  }

  const [Primary, Companion, Accent] = placeholder.icons;
  const warm = placeholder.tone === "warm";

  return (
    <div
      aria-hidden="true"
      data-photo-slot={slot}
      data-placeholder=""
      className={cn(
        frame,
        warm
          ? "bg-linear-160 from-amber-100 via-white-warm to-amber-50 ring-1 ring-amber-200/60"
          : "bg-linear-160 from-navy-500 to-navy-700 ring-1 ring-navy-100",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 -z-10",
          warm
            ? "bg-[radial-gradient(circle_at_70%_25%,color-mix(in_srgb,var(--amber-300)_45%,transparent)_0%,transparent_55%)]"
            : "bg-[radial-gradient(circle_at_50%_70%,color-mix(in_srgb,var(--amber-500)_24%,transparent)_0%,transparent_62%)]",
        )}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex aspect-square h-[58%] items-center justify-center rounded-full bg-white/90 shadow-lg">
          <Primary className="size-[46%] text-navy-500" strokeWidth={1.5} />
          <span className="absolute right-[6%] bottom-[10%] flex size-[32%] items-center justify-center rounded-full bg-amber-500 text-navy-800 shadow-md">
            <Companion className="size-[55%]" strokeWidth={2} />
          </span>
          <span className="absolute top-[10%] left-[8%] flex size-[22%] items-center justify-center rounded-full bg-amber-100 text-amber-700 shadow-sm">
            <Accent className="size-[55%]" strokeWidth={2} />
          </span>
        </div>
      </div>
    </div>
  );
}
