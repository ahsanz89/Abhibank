"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

function subscribeUrl(cb: () => void) {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
}

/** Reads a query-string value without forcing the page into client-side rendering. */
export function useQueryParam(name: string): string | null {
  return useSyncExternalStore(
    subscribeUrl,
    () => new URLSearchParams(window.location.search).get(name),
    () => null,
  );
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** Reads a localStorage flag safely (returns the server value during SSR). */
export function useStoredFlag(key: string): boolean {
  return useSyncExternalStore(
    noop,
    () => {
      try {
        return window.localStorage.getItem(key) === "1";
      } catch {
        return false;
      }
    },
    () => false,
  );
}

export function useNow(): number | null {
  return useSyncExternalStore(
    noop,
    () => Math.floor(Date.now() / 60_000) * 60_000,
    () => null,
  );
}
