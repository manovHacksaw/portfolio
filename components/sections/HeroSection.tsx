"use client";
import { motion } from "framer-motion";
import { PersonalInfo, PortfolioLink } from '@/types/portfolio.types';
import Image from 'next/image';
import { MapPin, Github, Linkedin, Phone, Mail, FileText, Info, Sun } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  personalInfo: PersonalInfo;
  portfolioLinks: PortfolioLink[];
}

export default function HeroSection({ personalInfo, portfolioLinks }: HeroSectionProps) {
  // Map portfolio links to icons
  const getIcon = (platform: string) => {
    const iconMap: Record<string, React.ReactElement> = {
      'GitHub': <Github size={20} />,
      'LinkedIn': <Linkedin size={20} />,
      'Email': <Mail size={20} />,
      'Portfolio': <FileText size={20} />,
    };
    return iconMap[platform] || <Info size={20} />;
  };

  // Get GitHub link for resume/document icon
  const githubLink = portfolioLinks.find(link => link.platform === 'GitHub');
  const linkedInLink = portfolioLinks.find(link => link.platform === 'LinkedIn');
  const emailLink = portfolioLinks.find(link => link.platform === 'Email');
  const portfolioLink = portfolioLinks.find(link => link.platform === 'Portfolio');

  return (
    <section className="w-full bg-[var(--background)] px-5 py-8 max-w-4xl">
      {/* Mobile Layout - Profile pic left, icon right, text below */}
      <div className="flex flex-col sm:hidden">
        {/* Top Row - Profile Picture (left) and Icon (right) */}
        <motion.div
          className="flex items-start justify-between mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Profile Picture - Left */}
          <motion.div
            className="shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative w-24 h-24 bg-[var(--background)] rounded-lg">
              <Image
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                fill
                className="object-contain rounded-lg"
                priority
                unoptimized
              />
            </div>
          </motion.div>

          {/* Small Icon - Right, Upper Portion */}
          <motion.div
            className="flex items-start justify-end mt-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-2xl" aria-label={personalInfo.location}>
              {personalInfo.locationFlag}
            </span>
          </motion.div>
        </motion.div>

        {/* Text Below - Two Lines */}
        <motion.div
          className="flex flex-col gap-0.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="text-xl font-bold text-[var(--foreground)] leading-tight">
            Hi, I'm {personalInfo.name} 
          </h1>
          <p className="text-base text-[var(--foreground-muted)] font-light">
            {personalInfo.title}
          </p>
        </motion.div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-[var(--foreground-muted)] font-light mt-2">
          <MapPin size={14} />
          <span>{personalInfo.location}</span>
        </div>

        {/* Contact Icons */}
        <motion.div
          className="flex items-center gap-2 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {githubLink && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity"
                aria-label="GitHub"
              >
                <Github size={14} />
              </Link>
            </motion.div>
          )}
          {linkedInLink && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={linkedInLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} />
              </Link>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={`tel:${personalInfo.email}`}
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity"
              aria-label="Phone"
            >
              <Phone size={14} />
            </Link>
          </motion.div>
          {emailLink && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={emailLink.url}
                className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity"
                aria-label="Email"
              >
                <Mail size={14} />
              </Link>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity"
              aria-label="Resume"
            >
              <FileText size={14} />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.95, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              className="text-[var(--foreground)] hover:opacity-70 transition-opacity"
              aria-label="Information"
            >
              <Info size={18} />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop Layout - Original */}
      <motion.div
        className="hidden sm:flex flex-row items-start justify-between gap-6 sm:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Left Side - Name, Title, Location, Icons */}
        <div className="flex flex-col justify-between flex-1 h-32 sm:h-36 md:h-40 lg:h-44">
          {/* Name */}
          <motion.h1
            className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--foreground)] leading-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {personalInfo.name}
          </motion.h1>

          <div>
            <p className="text-xs sm:text-sm text-[var(--foreground)] font-light">
              {personalInfo.title}
            </p>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-[var(--foreground)] font-light">
              <MapPin size={12} />
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Contact Icons Row 1 */}
          <div className="flex items-center gap-2 mt-1.5">
            {githubLink && (
              <Link
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity"
                aria-label="GitHub"
              >
                <Github size={14} />
              </Link>
            )}
            {linkedInLink && (
              <Link
                href={linkedInLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} />
              </Link>
            )}
            <Link
              href={`tel:${personalInfo.email}`}
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity"
              aria-label="Phone"
            >
              <Phone size={14} />
            </Link>
            {emailLink && (
              <Link
                href={emailLink.url}
                className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity"
                aria-label="Email"
              >
                <Mail size={14} />
              </Link>
            )}
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity"
              aria-label="Resume"
            >
              <FileText size={14} />
            </Link>
          </div>

          {/* Contact Icons Row 2 - Flag, Info */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-base" aria-label={personalInfo.location}>
              {personalInfo.locationFlag}
            </span>
            <button
              className="text-[var(--foreground)] hover:opacity-70 transition-opacity"
              aria-label="Information"
            >
              <Info size={14} />
            </button>
          </div>
        </div>

        {/* Right Side - Profile Picture */}
        <motion.div
          className="shrink-0 flex items-start"
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="relative left-8 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-40 bg-[var(--background)] rounded-lg">
            <Image
              src={personalInfo.avatarUrl}
              alt={personalInfo.name}
              fill
              className="object-contain rounded-lg"
              priority
              unoptimized
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

