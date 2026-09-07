"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { usePointerFine } from "./usePointerFine";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Dot-and-ring cursor that expands into a text pill when hovering any
 * element carrying `data-cursor-label="..."` (project cards, etc). Mounted
 * once in the root layout; renders nothing on touch devices or when the
 * user has requested reduced motion — the native cursor is never hidden in
 * those cases.
 */
export default function CustomCursor() {
  const isPointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const [label, setLabel] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  const enabled = isPointerFine && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;

    document.body.style.cursor = "none";

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const target = (e.target as HTMLElement)?.closest(
        "[data-cursor-label], a, button"
      ) as HTMLElement | null;

      if (target?.hasAttribute("data-cursor-label")) {
        setLabel(target.getAttribute("data-cursor-label"));
        setIsPointer(true);
      } else if (target) {
        setLabel(null);
        setIsPointer(true);
      } else {
        setLabel(null);
        setIsPointer(false);
      }
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [enabled, x, y, visible]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[200] flex items-center justify-center"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="wait">
        {label ? (
          <motion.div
            key="label"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="label-mono flex h-16 w-16 items-center justify-center rounded-full text-center normal-case"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-foreground)",
              fontSize: "0.7rem",
              letterSpacing: "0.02em",
            }}
          >
            {label}
          </motion.div>
        ) : (
          <motion.div
            key="dot"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: isPointer ? 2.2 : 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-full"
            style={{
              width: 8,
              height: 8,
              backgroundColor: "var(--foreground)",
              opacity: isPointer ? 0.35 : 1,
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
