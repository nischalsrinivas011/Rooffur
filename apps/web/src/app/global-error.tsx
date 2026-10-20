"use client";

import "./globals.css";
import { ErrorState } from "@/components/layout/ErrorState";

/** Last-resort boundary for failures in the root layout itself. */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main>
          <ErrorState
            title="Something went wrong"
            message="Rooffur couldn't load. Please try again, or head back to the homepage."
            onRetry={reset}
          />
        </main>
      </body>
    </html>
  );
}
