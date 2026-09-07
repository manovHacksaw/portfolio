"use client";
import { motion, type HTMLMotionProps, type Variants, type TargetAndTransition } from "framer-motion";
import { fadeUp } from "./variants";

interface SectionRevealProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  delay?: number;
  variants?: Variants;
  /** Re-run every time the element scrolls into view instead of once. */
  repeat?: boolean;
}

function withDelay(variants: Variants, delay: number): Variants {
  if (!delay) return variants;
  const visible = variants.visible;
  if (typeof visible !== "object" || visible === null) return variants;
  const target = visible as TargetAndTransition;
  return {
    ...variants,
    visible: {
      ...target,
      transition: { ...(target.transition ?? {}), delay },
    },
  };
}

/**
 * Thin wrapper over the `initial/whileInView/viewport` boilerplate that used
 * to be copy-pasted into every section file. Defaults to a fade+rise.
 */
export default function SectionReveal({
  children,
  delay = 0,
  repeat = false,
  variants = fadeUp,
  className,
  ...rest
}: SectionRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: "-80px" }}
      variants={withDelay(variants, delay)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
