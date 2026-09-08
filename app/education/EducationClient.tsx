"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ThemeToggle from "../../components/layout/ThemeToggle";
import DotGridBanner from "@/components/sections/DotGridBanner";
import SectionReveal from "@/components/motion/SectionReveal";
import { fadeUp, stagger } from "@/components/motion/variants";
import { mockPortfolioData } from "@/data/mockData";

export default function EducationClient() {
  const education = mockPortfolioData.education;
  const quote = mockPortfolioData.educationPage?.quote;

  return (
    <div className="min-h-screen pb-16">
      <div className="mx-auto max-w-[720px] border-x border-dashed border-[var(--foreground-border)]">
        <DotGridBanner />
        <main className="px-4 pt-6 sm:px-6 sm:pt-8">
        <SectionReveal variants={fadeUp} className="mb-10 flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
            Education
          </h1>
          <ThemeToggle />
        </SectionReveal>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.12)}
          className="flex flex-col"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              variants={fadeUp}
              className="flex items-center gap-4 border-b border-[var(--foreground-border)] py-6"
            >
              {edu.imageUrl && (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[var(--foreground-border)] bg-[var(--surface)]">
                  <Image src={edu.imageUrl} alt={edu.institution} fill className="object-cover" />
                </div>
              )}

              <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex flex-col gap-0.5">
                  <h2 className="text-base font-medium tracking-tight text-[var(--foreground)]">
                    {edu.institution}
                  </h2>
                  <p className="text-sm font-light text-[var(--foreground-muted)]">
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

        {quote && (
          <SectionReveal variants={fadeUp} delay={0.1} className="mt-12 flex flex-col gap-2">
            <p className="text-lg font-light italic text-[var(--foreground)]">&ldquo;{quote.text}&rdquo;</p>
            <span
              className="label-mono w-fit rounded-full border px-3 py-1 normal-case tracking-normal"
              style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
            >
              {quote.attribution}
            </span>
          </SectionReveal>
        )}
        </main>
        <DotGridBanner />
      </div>
    </div>
  );
}
