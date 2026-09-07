"use client";
import { useEffect, useState } from "react";

/**
 * True only on devices with a precise pointer (mouse/trackpad). Gates the
 * custom cursor and magnetic-button effects off touch devices entirely, per
 * the "never sacrifice usability for effects" requirement.
 */
export function usePointerFine(): boolean {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    setIsFine(query.matches);
    const handler = (e: MediaQueryListEvent) => setIsFine(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return isFine;
}
