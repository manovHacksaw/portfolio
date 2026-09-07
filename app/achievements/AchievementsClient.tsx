"use client";
import { motion } from "framer-motion";
import ThemeToggle from "../../components/layout/ThemeToggle";
import DotGridBanner from "@/components/sections/DotGridBanner";
import SectionReveal from "@/components/motion/SectionReveal";
import { fadeUp, stagger } from "@/components/motion/variants";
import { mockPortfolioData } from "@/data/mockData";
import { groupHackathons } from "@/lib/groupHackathons";
import { ExternalLink, Github, Globe, MapPin, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

export default function AchievementsClient() {
  const hackathons = mockPortfolioData.hackathons;
  const groupedHackathons = useMemo(() => groupHackathons(hackathons), [hackathons]);

  return (
    <div className="min-h-screen pb-16">
      <DotGridBanner />
      <main className="mx-auto max-w-[720px] border-x border-dashed border-[var(--foreground-border)] px-4 pt-6 sm:px-6 sm:pt-8">
        <SectionReveal variants={fadeUp} className="mb-10 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
              Achievements
            </h1>
            <ThemeToggle />
          </div>
          {mockPortfolioData.achievementsPage?.introduction && (
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--foreground-muted)]">
              {mockPortfolioData.achievementsPage.introduction}
            </p>
          )}
        </SectionReveal>

        <motion.div initial="hidden" animate="visible" variants={stagger(0.12)}>
          {groupedHackathons.map((group, groupIndex) => (
            <motion.div
              key={`${group.name}_${group.date}`}
              variants={fadeUp}
              className="flex gap-4 border-b border-[var(--foreground-border)] py-8 sm:gap-6"
            >
              <div className="flex shrink-0 flex-col items-center gap-3">
                <span className="label-mono">{String(groupIndex + 1).padStart(2, "0")}</span>
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[var(--foreground-border)] bg-white sm:h-12 sm:w-12">
                  {group.logoUrl ? (
                    <Image src={group.logoUrl} alt={group.name} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[var(--surface)] text-xs font-bold text-[var(--foreground-muted)]">
                      {group.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="text-base font-medium tracking-tight text-[var(--foreground)] sm:text-lg">
                    {group.name}
                  </h2>
                  <span className="label-mono">{group.date}</span>
                </div>

                {group.location && (
                  <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                    {group.location.toLowerCase() === "online" ? (
                      <Globe size={12} />
                    ) : (
                      <MapPin size={12} />
                    )}
                    <span>{group.location}</span>
                  </div>
                )}

                <div className="mt-1 flex flex-col gap-4">
                  {group.projects.map((hackathon) => (
                    <div key={hackathon.id} className="flex flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {hackathon.projectName && (
                          <span className="text-sm font-medium text-[var(--foreground)]">
                            {hackathon.projectName}
                          </span>
                        )}
                        {hackathon.prize && (
                          <span
                            className="label-mono flex items-center gap-1 rounded-full px-2 py-0.5 normal-case tracking-normal"
                            style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)", color: "var(--accent)" }}
                          >
                            <Trophy size={10} />
                            {hackathon.prize}
                          </span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed text-[var(--foreground-muted)]">
                        {hackathon.description}
                      </p>
                    </div>
                  ))}
                </div>

                {(() => {
                  const p = group.projects[0];
                  if (!p) return null;
                  const isGithub = p.projectUrl && p.projectUrl.includes("github.com");
                  const liveUrl = p.projectUrl && !isGithub ? p.projectUrl : undefined;
                  const githubUrl = p.githubUrl || (isGithub ? p.projectUrl : undefined);
                  const hasAnnouncement = p.announcementUrl && p.announcementUrl !== "#";

                  if (!liveUrl && !githubUrl && !hasAnnouncement) return null;

                  return (
                    <div className="mt-1 flex flex-wrap items-center gap-4">
                      {liveUrl && (
                        <Link
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-[var(--foreground)] hover:opacity-70"
                        >
                          <Globe size={13} />
                          Live
                        </Link>
                      )}
                      {githubUrl && (
                        <Link
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-[var(--foreground)] hover:opacity-70"
                        >
                          <Github size={13} />
                          Code
                        </Link>
                      )}
                      {hasAnnouncement && (
                        <Link
                          href={p.announcementUrl!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-[var(--foreground)] hover:opacity-70"
                        >
                          <ExternalLink size={13} />
                          Announcement
                        </Link>
                      )}
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <DotGridBanner />
    </div>
  );
}
