"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getBrowserYear = () => new Date().getFullYear();

/**
 * The current calendar year (E1-S04 §38). Server-rendered with the
 * build/request year so it is always in the HTML; after hydration React
 * switches to the browser's year, so statically generated pages never show
 * a stale year.
 */
export function CurrentYear({ initialYear }: { initialYear: number }) {
  const year = useSyncExternalStore(subscribe, getBrowserYear, () => initialYear);
  return <span>{year}</span>;
}
