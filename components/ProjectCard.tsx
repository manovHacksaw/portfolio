"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/types/portfolio.types";
import { fadeUp } from "./motion/variants";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const isLive = Boolean(project.liveUrl && project.liveUrl !== "#" && !project.liveUrl.includes("github.com"));
  const primaryUrl = isLive ? project.liveUrl : project.githubUrl && project.githubUrl !== "#" ? project.githubUrl : undefined;

  return (
    <motion.article variants={fadeUp} className="flex flex-col gap-4">
      {/* Outer frame matches the reference's inset "device window" card —
          a padded, bordered container around the screenshot rather than a
          full-bleed image. The title stays hidden until hover, where it
          reveals large and centered over the image instead of sitting as a
          static caption above it. */}
      <div className="group rounded-2xl border border-[var(--foreground-border)] bg-[var(--surface)] p-3 sm:p-4">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[var(--foreground-border)] bg-[var(--background)]">
          {project.imageUrl && !imageError ? (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="label-mono">No preview</span>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 backdrop-blur-0 transition-all duration-300 ease-out group-hover:bg-black/35 group-hover:opacity-100 group-hover:backdrop-blur-[2px]">
            <span className="scale-90 px-4 text-center text-2xl font-semibold tracking-tight text-white opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 sm:text-3xl">
              {project.title}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <h3 className="text-base font-medium tracking-tight text-[var(--foreground)]">
            {project.title}
          </h3>
          {isLive && (
            <span className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
              Live
            </span>
          )}
        </div>

        <p className="text-sm leading-relaxed text-[var(--foreground-muted)]">
          {project.description}
        </p>

        <div className="mt-1 flex items-center gap-4">
          {primaryUrl && (
            <Link
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)]"
            >
              View Project
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          )}
          {project.githubUrl && project.githubUrl !== "#" && isLive && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source of ${project.title} on GitHub`}
              className="text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)]"
            >
              <Github size={15} />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
