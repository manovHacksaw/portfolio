"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Experience } from "@/types/portfolio.types";
import SectionReveal from "../motion/SectionReveal";
import ExperienceItem from "../ExperienceItem";
import { fadeUp, stagger } from "../motion/variants";

interface ExperiencePreviewProps {
  experience: Experience[];
}

export default function ExperiencePreview({ experience }: ExperiencePreviewProps) {
  const preview = experience.slice(0, 3);

  return (
    <section className="w-full py-16 sm:py-20">
      <SectionReveal variants={fadeUp} className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
          Experience
        </h2>
      </SectionReveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger(0.1)}
      >
        {preview.map((exp, i) => (
          <ExperienceItem key={exp.id} experience={exp} defaultOpen={i === 0} />
        ))}
      </motion.div>

      {experience.length > preview.length && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-85"
          >
            View All
            <ArrowUpRight size={14} />
          </Link>
        </div>
      )}
    </section>
  );
}
