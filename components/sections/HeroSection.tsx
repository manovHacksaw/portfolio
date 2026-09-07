"use client";
import { motion } from "framer-motion";
import { PersonalInfo, PortfolioLink } from "@/types/portfolio.types";
import Image from "next/image";
import { Github, Linkedin, Mail, FileText, Globe } from "lucide-react";
import Link from "next/link";
import { EASE } from "../motion/variants";

interface HeroSectionProps {
  personalInfo: PersonalInfo;
  portfolioLinks: PortfolioLink[];
}

const fadeUpItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function HeroSection({ personalInfo, portfolioLinks }: HeroSectionProps) {
  const githubLink = portfolioLinks.find((l) => l.platform === "GitHub");
  const linkedInLink = portfolioLinks.find((l) => l.platform === "LinkedIn");
  const portfolioLink = portfolioLinks.find((l) => l.platform === "Portfolio");
  const emailHref = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(personalInfo.email)}`;

  const socials = [
    { label: "GitHub", href: githubLink?.url, icon: Github },
    { label: "LinkedIn", href: linkedInLink?.url, icon: Linkedin },
    { label: "Resume", href: "/Manobendra-Mandal.pdf", icon: FileText },
    portfolioLink ? { label: "Portfolio", href: portfolioLink.url, icon: Globe } : null,
  ].filter((s): s is { label: string; href: string; icon: typeof Github } => Boolean(s?.href));

  return (
    <motion.section
      className="flex w-full flex-col gap-6 py-10 sm:py-14"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      <motion.div variants={fadeUpItem} className="flex items-center gap-3 sm:gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[var(--foreground-border)] bg-[var(--surface)] sm:h-24 sm:w-24">
          <Image src={personalInfo.avatarUrl} alt={personalInfo.name} fill className="object-cover" priority />
        </div>
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
            {personalInfo.name}
          </h1>
          <p className="text-sm text-[var(--foreground-muted)] sm:text-base">{personalInfo.title}</p>
        </div>
      </motion.div>

      <motion.p
        variants={fadeUpItem}
        className="max-w-xl text-sm leading-relaxed text-[var(--foreground-secondary)] sm:text-base"
      >
        {personalInfo.bio}
      </motion.p>

      <motion.div variants={fadeUpItem} className="flex flex-wrap items-center gap-3">
        <Link
          href="/Manobendra-Mandal.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-85"
        >
          <FileText size={15} />
          View resume
        </Link>
        <Link
          href={emailHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--foreground-border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--foreground)]"
        >
          <Mail size={15} />
          Send an email
        </Link>
      </motion.div>

      <motion.div variants={fadeUpItem} className="flex flex-col gap-3 pt-2">
        <p className="text-sm text-[var(--foreground-muted)]">
          Here are my <span className="font-medium text-[var(--foreground)]">socials</span>
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {socials.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--foreground-border)] bg-[var(--surface)] px-3.5 py-1.5 text-sm text-[var(--foreground)] transition-colors hover:border-[var(--foreground)]"
            >
              <s.icon size={14} />
              {s.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
