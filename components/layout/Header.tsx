"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "../motion/useReducedMotion";

interface HeaderProps {
  displayRoute?: string;
}

const routeLabels: Record<string, string> = {
  "/": "Home",
  "/projects": "Projects",
  "/experience": "Experience",
  "/education": "Education",
  "/achievements": "Achievements",
  "/contact": "Contact",
};

export default function Header({ displayRoute }: HeaderProps = {}) {
  const pathname = usePathname();
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

  const routeLabel =
    displayRoute?.toUpperCase() ??
    (routeLabels[pathname] ? routeLabels[pathname].toUpperCase() : pathname.toUpperCase());

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!mounted) return;
    const next = resolvedTheme === "dark" ? "light" : "dark";

    if (splashAudioRef.current) {
      splashAudioRef.current.currentTime = 0;
      splashAudioRef.current.play().catch(() => {
        /* autoplay may be blocked before first interaction — non-fatal */
      });
    }

    const root = document.documentElement;
    const rect = e.currentTarget.getBoundingClientRect();
    root.style.setProperty("--vt-x", `${rect.left + rect.width / 2}px`);
    root.style.setProperty("--vt-y", `${rect.top + rect.height / 2}px`);

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
    <header className="flex w-full items-center justify-between gap-4">
      <Link
        href="/"
        className="font-mono text-[11px] font-medium tracking-widest text-[var(--foreground)] uppercase transition-opacity hover:opacity-70 sm:text-xs"
      >
        Manobendra Mandal
      </Link>

      <div className="flex items-center gap-3 sm:gap-4">
        {pathname !== "/" && (
          <motion.span
            key={routeLabel}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="label-mono hidden sm:inline"
          >
            {routeLabel}
          </motion.span>
        )}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--foreground-border)] text-[var(--foreground)] transition-colors hover:border-[var(--foreground)]"
          aria-label="Toggle theme"
        >
          {mounted && resolvedTheme === "dark" ? (
            <Sun size={14} strokeWidth={1.75} />
          ) : (
            <Moon size={14} strokeWidth={1.75} />
          )}
        </button>
      </div>
    </header>
  );
}
