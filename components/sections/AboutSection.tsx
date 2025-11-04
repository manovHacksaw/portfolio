"use client";
import { PersonalInfo } from '@/types/portfolio.types';

interface AboutSectionProps {
  personalInfo: PersonalInfo;
}

export default function AboutSection({ personalInfo }: AboutSectionProps) {
  return (
    <section className="w-full px-5 py-8">
      <div className="flex flex-col gap-3 max-w-4xl">
        <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)]">
          About Me
        </h2>
        <p 
          className="text-xs sm:text-sm text-[var(--foreground-muted)] font-light leading-relaxed text-justify"                                                                               
          style={{ fontFamily: 'var(--font-onest)' }}
        >
          {personalInfo.bio}
        </p>
      </div>
    </section>
  );
}

