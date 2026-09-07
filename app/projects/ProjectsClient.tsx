"use client";
import { motion } from "framer-motion";
import ThemeToggle from "../../components/layout/ThemeToggle";
import DotGridBanner from "@/components/sections/DotGridBanner";
import ProjectCard from "@/components/ProjectCard";
import SectionReveal from "@/components/motion/SectionReveal";
import { fadeUp, stagger } from "@/components/motion/variants";
import { mockPortfolioData } from "@/data/mockData";

export default function ProjectsClient() {
  const projects = mockPortfolioData.projects;

  return (
    <div className="min-h-screen pb-16">
      <DotGridBanner />
      <main className="mx-auto max-w-[720px] border-x border-dashed border-[var(--foreground-border)] px-4 pt-6 sm:px-6 sm:pt-8">
        <SectionReveal variants={fadeUp} className="mb-10 flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
            Projects
          </h1>
          <ThemeToggle />
        </SectionReveal>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.08)}
          className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </main>
      <DotGridBanner />
    </div>
  );
}
