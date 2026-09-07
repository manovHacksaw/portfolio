"use client";
import { useState, useId } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Experience } from "@/types/portfolio.types";
import { EASE, fadeUp } from "./motion/variants";

interface ExperienceItemProps {
  experience: Experience;
  /** Start expanded (used for the current/most recent role). */
  defaultOpen?: boolean;
}

export default function ExperienceItem({ experience, defaultOpen = false }: ExperienceItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const isCurrent = experience.endDate === null;
  const dateRange = isCurrent
    ? `${experience.startDate} — Present`
    : experience.endDate && experience.endDate !== experience.startDate
    ? `${experience.startDate} — ${experience.endDate}`
    : experience.startDate;

  // Pull a short employment-type tag out of the role string when present,
  // e.g. "Lead Backend Developer (Contract) · Remote" -> "Contract".
  const tagMatch = experience.role.match(/\(([^)]+)\)/);
  const roleTag = tagMatch?.[1];
  const roleLabel = experience.role.replace(/\s*\([^)]+\)/, "").trim();

  // No company-logo assets exist in the data, so fall back to the
  // company's initial in a bordered mark — same pattern already used for
  // hackathon logos in AchievementsClient — rather than inventing imagery.
  const initial = experience.company.trim().charAt(0).toUpperCase();

  return (
    <motion.div variants={fadeUp} className="border-b border-[var(--foreground-border)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start gap-3 py-5 text-left sm:gap-4"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--foreground-border)] bg-[var(--surface)] text-sm font-semibold text-[var(--foreground-muted)] sm:h-14 sm:w-14">
          {initial}
        </div>

        <div className="flex flex-1 items-center justify-between gap-4 min-w-0">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="flex flex-wrap items-center gap-2 text-base font-medium tracking-tight text-[var(--foreground)] sm:text-lg">
              {experience.company}
              {roleTag && (
                <span className="label-mono rounded-full border border-[var(--foreground-border)] px-2 py-0.5 normal-case tracking-normal">
                  {roleTag}
                </span>
              )}
              {isCurrent && (
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                  aria-label="Current"
                />
              )}
            </span>
            <span className="truncate text-sm font-light text-[var(--foreground-muted)]">
              {roleLabel}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="label-mono hidden sm:inline">{dateRange}</span>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="text-[var(--foreground-muted)]"
            >
              <ChevronDown size={16} />
            </motion.span>
          </div>
        </div>
      </button>

      <span className="label-mono -mt-3 block pb-3 pl-[3.75rem] sm:hidden">{dateRange}</span>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 pb-6">
              <ul className="flex flex-col gap-2">
                {experience.responsibilities.map((item, i) => (
                  <li
                    key={i}
                    className="pl-4 text-sm leading-relaxed text-[var(--foreground-secondary)] before:float-left before:-ml-4 before:text-[var(--foreground-border)] before:content-['—_']"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {experience.techStack && experience.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {experience.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="label-mono rounded-full border border-[var(--foreground-border)] px-2.5 py-1 normal-case tracking-normal"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {experience.websiteUrl && experience.websiteUrl !== "#" && (
                <Link
                  href={experience.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-1.5 text-sm text-[var(--foreground)] hover:opacity-70"
                >
                  Company site
                  <ExternalLink size={13} />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
