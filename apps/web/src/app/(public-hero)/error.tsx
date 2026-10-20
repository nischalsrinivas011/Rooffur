"use client";

import { ErrorState } from "@/components/layout/ErrorState";

export default function HeroPagesError({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorState
      title="Something went wrong"
      message="This page couldn't be loaded. Please try again, or head back to the homepage."
      onRetry={reset}
    />
  );
}
