"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Education } from "@/types/portfolio.types";
import SectionReveal from "../motion/SectionReveal";
import { fadeUp, stagger } from "../motion/variants";

interface EducationPreviewProps {
  education: Education[];
}

export default function EducationPreview({ education }: EducationPreviewProps) {
  const preview = education.slice(0, 3);

  return (
    <section className="w-full py-8 sm:py-10">
      <SectionReveal variants={fadeUp} className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
          Education
        </h2>
      </SectionReveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger(0.1)}
      >
        {preview.map((edu) => (
          <motion.div key={edu.id} variants={fadeUp} className="flex items-center gap-4 py-4">
            {edu.imageUrl && (
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[var(--foreground-border)] bg-[var(--surface)]">
                <Image src={edu.imageUrl} alt={edu.institution} fill className="object-cover" />
              </div>
            )}

            <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-[var(--foreground)]">{edu.institution}</span>
                <p className="text-xs text-[var(--foreground-muted)]">
                  {edu.degree} · {edu.location}
                </p>
              </div>
              <span className="label-mono shrink-0">
                {edu.startYear} — {edu.endYear ?? "Present"}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {education.length > preview.length && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/education"
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
