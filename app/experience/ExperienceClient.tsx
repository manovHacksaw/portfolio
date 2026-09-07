"use client";
import { motion } from "framer-motion";
import ThemeToggle from "../../components/layout/ThemeToggle";
import DotGridBanner from "@/components/sections/DotGridBanner";
import ExperienceItem from "@/components/ExperienceItem";
import SectionReveal from "@/components/motion/SectionReveal";
import { fadeUp, stagger } from "@/components/motion/variants";
import { mockPortfolioData } from "@/data/mockData";

export default function ExperienceClient() {
  const experience = mockPortfolioData.experience;

  return (
    <div className="min-h-screen pb-16">
      <DotGridBanner />
      <main className="mx-auto max-w-[720px] border-x border-dashed border-[var(--foreground-border)] px-4 pt-6 sm:px-6 sm:pt-8">
        <SectionReveal variants={fadeUp} className="mb-10 flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
            Experience
          </h1>
          <ThemeToggle />
        </SectionReveal>

        <motion.div initial="hidden" animate="visible" variants={stagger(0.12)}>
          {experience.map((exp, i) => (
            <ExperienceItem key={exp.id} experience={exp} defaultOpen={i === 0} />
          ))}
        </motion.div>
      </main>
      <DotGridBanner />
    </div>
  );
}
