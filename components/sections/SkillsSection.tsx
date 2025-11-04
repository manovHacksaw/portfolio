"use client";
import { motion } from "framer-motion";
import { Skill } from '@/types/portfolio.types';
import * as Si from "react-icons/si";

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
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
      <div className="flex flex-col gap-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-2">
          
          <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)]">
            Skills and Technologies
          </h2>
        </div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {displaySkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              className="flex items-center gap-1.5 px-2 py-1.5 border border-[var(--foreground)] rounded-lg bg-[var(--background)]"
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 10 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
              }}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

