"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointerFine } from "./usePointerFine";
import { useReducedMotion } from "./useReducedMotion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** How far the button can be pulled toward the pointer, in px. */
  strength?: number;
  as?: "div" | "span";
}

/**
 * Wraps a button/link so it gently pulls toward the cursor on hover. No-op
 * (renders a plain wrapper) on touch devices and when reduced motion is
 * requested — the wrapped element stays fully interactive either way.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as = "div",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isPointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const enabled = isPointerFine && !reducedMotion;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = as === "span" ? motion.span : motion.div;

  return (
    <Tag
      ref={ref}
      className={`inline-block ${className}`}
      style={enabled ? { x: springX, y: springY } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Tag>
  );
}
