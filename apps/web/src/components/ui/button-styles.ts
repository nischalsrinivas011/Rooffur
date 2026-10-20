import { cn } from "@/lib/cn";

/**
 * Button treatments from the Rooffur design system (Components · Buttons).
 * Exposed as class builders so links and buttons share one look.
 */
export type ButtonVariant = "primary" | "navy" | "outline" | "outline-inverse" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap border-2 border-transparent font-semibold " +
  "transition-[background-color,box-shadow,transform,color] duration-(--duration-base) ease-standard " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-amber-500 text-navy-800 shadow-cta hover:bg-amber-400 hover:-translate-y-px hover:shadow-cta-hover",
  navy: "bg-navy-500 text-white shadow-sm hover:bg-navy-600 hover:-translate-y-px hover:shadow-md",
  outline: "bg-transparent text-navy-500 border-navy-300 hover:bg-navy-50 hover:-translate-y-px",
  /** Outline for dark (navy) surfaces such as the landing hero. */
  "outline-inverse":
    "bg-transparent text-white border-white/50 hover:bg-white/10 hover:border-white hover:-translate-y-px",
  ghost: "bg-transparent text-navy-500 hover:bg-navy-50",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3.5 text-[13px] rounded-md",
  md: "min-h-11 px-5 text-sm rounded-lg",
  lg: "min-h-12 px-7 text-[15px] rounded-xl",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}
