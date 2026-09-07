"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types/portfolio.types";
import SectionReveal from "../motion/SectionReveal";
import ProjectCard from "../ProjectCard";
import { fadeUp, stagger } from "../motion/variants";

interface ProjectsPreviewProps {
  projects: Project[];
}

export default function ProjectsPreview({ projects }: ProjectsPreviewProps) {
  const preview = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="w-full py-8 sm:py-10">
      <SectionReveal variants={fadeUp} className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
          Projects
        </h2>
      </SectionReveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger(0.1)}
        className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2"
      >
        {preview.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </motion.div>

      {projects.length > preview.length && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/projects"
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
