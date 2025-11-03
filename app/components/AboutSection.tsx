"use client";
import { PersonalInfo } from '@/types/portfolio.types';
import { useLanguage } from '@/contexts/LanguageContext';

interface AboutSectionProps {
  personalInfo: PersonalInfo;
}

export default function AboutSection({ personalInfo }: AboutSectionProps) {
  const { t } = useLanguage();
  
  return (
    <section className="w-full px-5 py-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)]">
          {t('about.title')}
        </h2>
        <p 
          className="text-xs sm:text-sm text-[var(--foreground-muted)] font-light leading-relaxed max-w-3xl text-justify"
          style={{ fontFamily: 'var(--font-onest)' }}
        >
          {personalInfo.bio}
        </p>
      </div>
    </section>
  );
}

