"use client";
import { motion } from "framer-motion";
import { PersonalInfo } from '@/types/portfolio.types';

interface AboutSectionProps {
  personalInfo: PersonalInfo;
}

export default function AboutSection({ personalInfo }: AboutSectionProps) {
  return (
    <section className="w-full px-5 py-8">
      <motion.div
        className="flex flex-col gap-3 max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.h2
          className="text-lg sm:text-xl font-bold text-[var(--foreground)]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="text-xs sm:text-sm text-[var(--foreground-muted)] font-light leading-relaxed text-justify"
          style={{ fontFamily: 'var(--font-onest)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {personalInfo.bio}
        </motion.p>
      </motion.div>
    </section>
  );
}

