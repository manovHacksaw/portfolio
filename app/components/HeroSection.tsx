"use client";
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
    <section className="w-full px-5 flex flex-row items-start justify-between gap-6 sm:gap-8 py-8">
      {/* Left Side - Name, Title, Location, Icons */}
      <div className="flex flex-col justify-between flex-1 h-32 sm:h-36 md:h-40 lg:h-44">
        {/* Name */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black dark:text-white leading-tight">
          {personalInfo.name}
        </h1>

        <div>
        <p className="text-xs sm:text-sm text-black dark:text-white font-light">
          {personalInfo.title}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-black dark:text-white font-light">
          <MapPin size={12} />
          <span>{personalInfo.location}</span>
        </div>
        </div>

        {/* SEEKING Section */}
          {/* <div className="flex flex-col gap-1.5 mt-1.5 p-3 border border-black dark:border-white rounded-lg w-fit">
            <p className="text-[9px] uppercase tracking-wider text-black dark:text-white font-light">
              SEEKING
            </p>
            <p className="text-sm sm:text-base font-bold text-black dark:text-white">
              New Opportunities
            </p>
            <p className="text-xs text-black dark:text-white font-light opacity-70">
              Remote | On-site | Contractual | Freelance 
            </p>
            
          </div> */}

        {/* Contact Icons Row 1 */}
        <div className="flex items-center gap-2 mt-1.5">
          {githubLink && (
            <Link
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity"
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
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </Link>
          )}
          <Link
            href={`tel:${personalInfo.email}`}
            className="flex items-center justify-center w-7 h-7 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity"
            aria-label="Phone"
          >
            <Phone size={14} />
          </Link>
          {emailLink && (
            <Link
              href={emailLink.url}
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity"
              aria-label="Email"
            >
              <Mail size={14} />
            </Link>
          )}
          {portfolioLink && (
            <Link
              href={portfolioLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity"
              aria-label="Resume"
            >
              <FileText size={14} />
            </Link>
          )}
        </div>

        {/* Contact Icons Row 2 - Flag, Sun, Info */}
        <div className="flex items-center gap-2 mt-1">
          {/* Flag */}
          <span className="text-base" aria-label={personalInfo.location}>
            {personalInfo.locationFlag}
          </span>

          

          {/* Info icon */}
          <button
            className="text-black dark:text-white hover:opacity-70 transition-opacity"
            aria-label="Information"
          >
            <Info size={14} />
          </button>
        </div>
      </div>

      {/* Right Side - Profile Picture */}
      <div className="shrink-0 flex items-start">
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-40 bg-white dark:bg-black rounded-lg">
          <Image
            src={personalInfo.avatarUrl}
            alt={personalInfo.name}
            fill
            className="object-contain rounded-lg"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}

