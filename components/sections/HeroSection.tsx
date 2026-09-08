"use client";
import { motion } from "framer-motion";
import { PersonalInfo, PortfolioLink } from "@/types/portfolio.types";
import Image from "next/image";
import { Github, Linkedin, Mail, FileText, BadgeCheck } from "lucide-react";
import { SiTelegram } from "react-icons/si";
import Link from "next/link";
import { EASE } from "../motion/variants";
import ThemeToggle from "../layout/ThemeToggle";
import ViewCounter from "../ViewCounter";

interface HeroSectionProps {
  personalInfo: PersonalInfo;
  portfolioLinks: PortfolioLink[];
}

const fadeUpItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Bolds "Manov"/"Mandal" wherever they appear in the bio, without baking
// markup into the data file — mockData.ts stays plain text, this is purely
// a rendering concern.
function renderBioWithEmphasis(bio: string) {
  return bio.split(/(Manov|Mandal)/g).map((part, i) =>
    part === "Manov" || part === "Mandal" ? (
      <strong key={i} className="font-semibold text-[var(--foreground)]">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function HeroSection({ personalInfo, portfolioLinks }: HeroSectionProps) {
  const githubLink = portfolioLinks.find((l) => l.platform === "GitHub");
  const linkedInLink = portfolioLinks.find((l) => l.platform === "LinkedIn");
  const telegramLink = portfolioLinks.find((l) => l.platform === "Telegram");
  const emailHref = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(personalInfo.email)}`;

  type SocialIcon = React.ComponentType<{ size?: number; className?: string }>;
  const socialCandidates: { label: string; href?: string; icon: SocialIcon }[] = [
    { label: "GitHub", href: githubLink?.url, icon: Github },
    { label: "LinkedIn", href: linkedInLink?.url, icon: Linkedin },
    { label: "Telegram", href: telegramLink?.url, icon: SiTelegram },
  ];
  const socials = socialCandidates.filter(
    (s): s is { label: string; href: string; icon: SocialIcon } => Boolean(s.href)
  );

  return (
    <motion.section
      className="flex w-full flex-col gap-4 pb-8 pt-3 sm:pb-10"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
    >
      <motion.div variants={fadeUpItem} className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-2xl border border-[var(--foreground-border)] bg-[var(--surface)]">
            <Image src={personalInfo.avatarUrl} alt={personalInfo.name} fill className="object-cover" priority />
          </div>
          <div className="flex flex-col gap-0.5">
            <h1 className="flex items-center gap-1.5 text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
              {personalInfo.name}
              <BadgeCheck size={18} className="shrink-0 fill-blue-500 text-white" aria-hidden="true" />
            </h1>
            <p className="text-sm text-[var(--foreground-muted)] sm:text-base">{personalInfo.title}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
          <ThemeToggle />
          <ViewCounter />
        </div>
      </motion.div>

      <motion.p
        variants={fadeUpItem}
        className="w-full text-base leading-relaxed text-[var(--foreground-secondary)]"
      >
        {renderBioWithEmphasis(personalInfo.bio)}
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
          className="inline-flex items-center gap-2 rounded-full border border-[var(--foreground-border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--foreground)]"
        >
          <Mail size={15} />
          Send an email
        </Link>
      </motion.div>

      <motion.div variants={fadeUpItem} className="flex flex-col gap-2.5">
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
