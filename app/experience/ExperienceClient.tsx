"use client";
import { motion } from "framer-motion";
import Header from "../../components/layout/Header";
import BottomNav from "../../components/layout/BottomNav";
import DotGridBanner from "@/components/sections/DotGridBanner";
import ExperienceItem from "@/components/ExperienceItem";
import SectionReveal from "@/components/motion/SectionReveal";
import { fadeUp, stagger } from "@/components/motion/variants";
import { mockPortfolioData } from "@/data/mockData";

export default function ExperienceClient() {
  const experience = mockPortfolioData.experience;

  return (
    <div className="min-h-screen pb-28 sm:pb-24">
      <DotGridBanner />
      <main className="mx-auto max-w-4xl border-x border-dashed border-[var(--foreground-border)] px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8">
        <Header />
        <SectionReveal variants={fadeUp} className="mb-10 mt-8 sm:mt-10">
          <h1 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
            Experience
          </h1>
        </SectionReveal>

        <motion.div initial="hidden" animate="visible" variants={stagger(0.12)}>
          {experience.map((exp, i) => (
            <ExperienceItem key={exp.id} experience={exp} defaultOpen={i === 0} />
          ))}
        </motion.div>
      </main>
      <DotGridBanner />
      <BottomNav activeItem="work" />
    </div>
  );
}
