import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/**
 * Shared horizontal content container (E1-S01 §22):
 * 16px mobile, 24px tablet, 32px desktop padding; fluid up to a centered max width.
 */
export function Container({ children, className, as: Component = "div" }: ContainerProps) {
  return (
    <Component className={cn("mx-auto w-full max-w-310 px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Component>
  );
}
