"use client";
import { PersonalInfo, PortfolioLink } from '@/types/portfolio.types';
import Image from 'next/image';
import { MapPin, Github, Linkedin, Phone, Mail, FileText, Info, Sun } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroSectionProps {
  personalInfo: PersonalInfo;
  portfolioLinks: PortfolioLink[];
}

export default function HeroSection({ personalInfo, portfolioLinks }: HeroSectionProps) {
  const { language, setLanguage, t } = useLanguage();
  
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

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <section className="w-full bg-[var(--background)] px-5 py-8">
      {/* Mobile Layout - Profile pic left, icon right, text below */}
      <div className="flex flex-col sm:hidden">
        {/* Top Row - Profile Picture (left) and Icon (right) */}
        <div className="flex items-start justify-between mb-4">
          {/* Profile Picture - Left */}
          <div className="shrink-0">
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
          </div>

          {/* Small Icon - Right, Upper Portion */}
          <div className="flex items-start justify-end mt-2">
            <button
              onClick={toggleLanguage}
              className="text-2xl cursor-pointer hover:opacity-80 transition-opacity"
              aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
              title={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
            >
              {personalInfo.locationFlag}
            </button>
          </div>
        </div>

        {/* Text Below - Two Lines */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl font-bold text-[var(--foreground)] leading-tight">
            {t('hero.greeting')} {personalInfo.name} 
          </h1>
          <p className="text-base text-[var(--foreground-muted)] font-light">
            {personalInfo.title}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-[var(--foreground-muted)] font-light mt-2">
          <MapPin size={14} />
          <span>{personalInfo.location}</span>
        </div>

        {/* Contact Icons */}
        <div className="flex items-center gap-2 mt-3">
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
          {portfolioLink && (
            <Link
              href={portfolioLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity"
              aria-label="Resume"
            >
              <FileText size={14} />
            </Link>
          )}
          <button
            className="text-[var(--foreground)] hover:opacity-70 transition-opacity"
            aria-label="Information"
          >
            <Info size={18} />
          </button>
        </div>
      </div>

      {/* Desktop Layout - Original */}
      <div className="hidden sm:flex flex-row items-start justify-between gap-6 sm:gap-8">
        {/* Left Side - Name, Title, Location, Icons */}
        <div className="flex flex-col justify-between flex-1 h-32 sm:h-36 md:h-40 lg:h-44">
          {/* Name */}
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--foreground)] leading-tight">
            {personalInfo.name}
          </h1>

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
            {portfolioLink && (
              <Link
                href={portfolioLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity"
                aria-label="Resume"
              >
                <FileText size={14} />
              </Link>
            )}
          </div>

          {/* Contact Icons Row 2 - Flag, Info */}
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={toggleLanguage}
              className="text-base cursor-pointer hover:opacity-80 transition-opacity"
              aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
              title={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
            >
              {personalInfo.locationFlag}
            </button>
            <button
              className="text-[var(--foreground)] hover:opacity-70 transition-opacity"
              aria-label="Information"
            >
              <Info size={14} />
            </button>
          </div>
        </div>

        {/* Right Side - Profile Picture */}
        <div className="shrink-0 flex items-start">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-40 bg-[var(--background)] rounded-lg">
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
      </div>
    </section>
  );
}

