"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "../motion/useReducedMotion";

/**
 * Just the theme toggle button — no wordmark, no route label, no bar. The
 * reference has no persistent nav chrome at all; this sits inline wherever
 * a page places it (top-right of the hero block, next to the page title).
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();
  const splashAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    splashAudioRef.current = new Audio("/images/audio/splash.mp3");
    splashAudioRef.current.preload = "auto";
    splashAudioRef.current.volume = 0.5;
    return () => {
      splashAudioRef.current?.pause();
      splashAudioRef.current = null;
    };
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    const next = resolvedTheme === "dark" ? "light" : "dark";

    if (splashAudioRef.current) {
      splashAudioRef.current.currentTime = 0;
      splashAudioRef.current.play().catch(() => {
        /* autoplay may be blocked before first interaction — non-fatal */
      });
    }

    // The transition is a fixed top-to-bottom wipe (see vt-wipe-down in
    // globals.css) — it doesn't originate from the button, so no position
    // needs to be read here.
    const root = document.documentElement;
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => { finished: Promise<void> };
    };
    const supportsViewTransition = !reducedMotion && typeof doc.startViewTransition === "function";

    if (supportsViewTransition && doc.startViewTransition) {
      root.classList.add("vt-expanding");
      const transition = doc.startViewTransition(() => setTheme(next));
      transition.finished.finally(() => root.classList.remove("vt-expanding"));
    } else {
      setTheme(next);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--foreground-border)] text-[var(--foreground)] transition-colors hover:border-[var(--foreground)] ${className}`}
      aria-label="Toggle theme"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun size={14} strokeWidth={1.75} />
      ) : (
        <Moon size={14} strokeWidth={1.75} />
      )}
    </button>
  );
}
