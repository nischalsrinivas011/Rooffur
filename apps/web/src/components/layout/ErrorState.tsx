import Link from "next/link";
import { buttonClasses } from "@/components/ui/button-styles";
import { Container } from "./Container";

type ErrorStateProps = {
  title: string;
  message: string;
  onRetry?: () => void;
};

/** Shared error / not-found content, rendered inside the public shell (E1-S01 §28). */
export function ErrorState({ title, message, onRetry }: ErrorStateProps) {
  return (
    <Container className="py-20 sm:py-28">
      <h1 className="font-display text-4xl font-semibold text-navy-600 sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-xl text-base text-neutral-500">{message}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className={buttonClasses({ variant: "primary" })}>
          Go to the homepage
        </Link>
        {onRetry ? (
          <button type="button" onClick={onRetry} className={buttonClasses({ variant: "outline" })}>
            Try again
          </button>
        ) : null}
      </div>
    </Container>
  );
}
