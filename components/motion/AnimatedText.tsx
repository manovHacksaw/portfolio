"use client";
import { motion } from "framer-motion";
import { EASE } from "./variants";
import { useReducedMotion } from "./useReducedMotion";

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Delay before the first word starts, in seconds. */
  delay?: number;
  /** Stagger between words, in seconds. */
  stagger?: number;
  /** Animate on mount instead of when scrolled into view. */
  once?: boolean;
}

/**
 * Word-level stagger reveal for headings. Splits `text` into spans that
 * translate up + fade in with a small stagger — used for the hero name/title
 * and section headings instead of a flat opacity fade.
 */
export default function AnimatedText({
  text,
  as = "span",
  className = "",
  delay = 0,
  stagger = 0.045,
  once = true,
}: AnimatedTextProps) {
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");
  const Tag = motion[as];

  if (reducedMotion) {
    const Static = as;
    return <Static className={className}>{text}</Static>;
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.7, ease: EASE },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
