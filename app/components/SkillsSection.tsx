"use client";
import { Skill } from '@/types/portfolio.types';
import * as Si from "react-icons/si";
import { useLanguage } from '@/contexts/LanguageContext';

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const { t } = useLanguage();
  // List of skills to display (exact matches)
  const targetSkills = [
    'Next.js',
    'React.js',
    'Express.js',
    'TailwindCSS',
    'TypeScript',
    'Node.js',
    'Bun',
    'Arcjet',
    'Ethereum',
    'Postgres',
    'Solana',
    'Wagmi',
    'Subgraph',
    'MongoDB',
    'ethers.js',
    'Prisma',
    'Python',
    'Hardhat',
    'Solidity',
    'Envio',
    'Vercel',
    'Rust'
  ];

  // Create a mapping for name variations
  const nameMap: Record<string, string> = {
    'Express': 'Express.js',
    'Tailwind CSS': 'TailwindCSS',
    'PostgreSQL': 'Postgres',
    'The Graph': 'Subgraph',
  };

  // Map skill names to Simple Icons components
  const getSkillIcon = (skillName: string) => {
    const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
      'Next.js': Si.SiNextdotjs,
      'React.js': Si.SiReact,
      'Express.js': Si.SiExpress,
      'TailwindCSS': Si.SiTailwindcss,
      'TypeScript': Si.SiTypescript,
      'Node.js': Si.SiNodedotjs,
      'Bun': Si.SiBun,
      'Arcjet': Si.SiArc,
      'Ethereum': Si.SiEthereum,
      'Postgres': Si.SiPostgresql,
      'Solana': Si.SiSolana,
      'Wagmi': Si.SiWagmi,
      'Subgraph': Si.SiGraphql,
      'MongoDB': Si.SiMongodb,
      'ethers.js': Si.SiEthereum,
      'Prisma': Si.SiPrisma,
      'Python': Si.SiPython,
      'Hardhat': Si.SiNodedotjs,
      'Solidity': Si.SiSolidity,
      'Envio': Si.SiCoder,
      'Vercel': Si.SiVercel,
      'Rust': Si.SiRust,
    };

    // Try exact match first
    const IconComponent = iconMap[skillName];
    
    return IconComponent || Si.SiCoder;
  };

  // Filter and map skills
  const displaySkills = targetSkills.map(targetName => {
    // First try exact match
    let skill = skills.find(s => s.name === targetName);
    
    // If not found, try name mapping
    if (!skill) {
      const mappedName = Object.keys(nameMap).find(key => nameMap[key] === targetName);
      if (mappedName) {
        skill = skills.find(s => s.name === mappedName);
      }
    }
    
    // If still not found, create a placeholder skill
    if (!skill) {
      return {
        id: `custom-${targetName}`,
        name: targetName,
        category: 'tools' as const,
      };
    }
    
    return {
      ...skill,
      name: targetName, // Use the target name for display
    };
  }).filter(Boolean);

  return (
    <section className="w-full px-5 py-8">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          
          <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)]">
            {t('common.skillsAndTechnologies')}
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-w-3xl">
          {displaySkills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center gap-1.5 px-2 py-1.5 border border-[var(--foreground)] rounded-lg bg-[var(--background)]"
            >
              {/* Icon */}
              {(() => {
                const IconComponent = getSkillIcon(skill.name);
                return (
                  <IconComponent size={14} className="text-[var(--foreground)] shrink-0" />
                );
              })()}
              {/* Skill name */}
              <span className="text-[10px] sm:text-xs text-[var(--foreground)] font-light">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

