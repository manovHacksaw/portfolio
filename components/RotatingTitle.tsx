"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./motion/variants";

// Single source of truth for the rotation cadence — tune this one constant
// rather than hunting for timing values scattered through the component.
const TITLE_INTERVAL = 6500;

interface RotatingTitleProps {
  titles: string[];
  className?: string;
}

export default function RotatingTitle({ titles, className = "" }: RotatingTitleProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (titles.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % titles.length);
    }, TITLE_INTERVAL);
    return () => clearInterval(id);
  }, [titles.length]);

  // Fixed-height viewport so swapping text never shifts the name/image
  // above it or the bio below it — the container's size is constant
  // regardless of which title is currently showing.
  return (
    <div className={`relative h-6 overflow-hidden sm:h-7 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.p
          key={titles[index] ?? index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="absolute inset-0 text-sm text-[var(--foreground-muted)] sm:text-base"
        >
          {titles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
