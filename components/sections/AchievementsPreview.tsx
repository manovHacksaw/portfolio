"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Trophy } from "lucide-react";
import { Hackathon } from "@/types/portfolio.types";
import { groupHackathons } from "@/lib/groupHackathons";
import SectionReveal from "../motion/SectionReveal";
import { fadeUp, stagger } from "../motion/variants";

interface AchievementsPreviewProps {
  hackathons: Hackathon[];
}

export default function AchievementsPreview({ hackathons }: AchievementsPreviewProps) {
  const groups = groupHackathons(hackathons);
  const preview = groups.slice(0, 3);

  return (
    <section className="w-full py-8 sm:py-10">
      <SectionReveal variants={fadeUp} className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
          Achievements
        </h2>
      </SectionReveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger(0.1)}
      >
        {preview.map((group) => {
          const prize = group.projects.find((p) => p.prize)?.prize;
          return (
            <motion.div
              key={`${group.name}_${group.date}`}
              variants={fadeUp}
              className="flex items-center gap-4 border-b border-[var(--foreground-border)] py-4"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[var(--foreground-border)] bg-white">
                {group.logoUrl ? (
                  <Image src={group.logoUrl} alt={group.name} fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[var(--surface)] text-xs font-bold text-[var(--foreground-muted)]">
                    {group.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-[var(--foreground)]">{group.name}</span>
                  {group.projects[0]?.projectName && (
                    <span className="text-xs text-[var(--foreground-muted)]">
                      {group.projects[0].projectName}
                    </span>
                  )}
                </div>
                {prize && (
                  <span
                    className="label-mono flex items-center gap-1 rounded-full px-2 py-0.5 normal-case tracking-normal"
                    style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)", color: "var(--accent)" }}
                  >
                    <Trophy size={10} />
                    {prize}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {groups.length > preview.length && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/achievements"
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
