"use client";
import { useEffect, useState } from "react";

/**
 * Mirrors `prefers-reduced-motion: reduce`. Every custom animation primitive
 * in components/motion checks this before doing anything beyond an opacity
 * fade, on top of the global CSS shortcut in globals.css.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}
