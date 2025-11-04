"use client";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { mockPortfolioData } from "@/data/mockData";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import * as Si from "react-icons/si";

export default function ProjectsClient() {
  // Map technology names to Simple Icons
  const getTechIcon = (techName: string) => {
    const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
      'Next.js': Si.SiNextdotjs,
      'React.js': Si.SiReact,
      'React': Si.SiReact,
      'Express.js': Si.SiExpress,
      'Express': Si.SiExpress,
      'TypeScript': Si.SiTypescript,
      'TS': Si.SiTypescript,
      'Node.js': Si.SiNodedotjs,
      'MongoDB': Si.SiMongodb,
      'Stripe': Si.SiStripe,
      'OpenAI': Si.SiOpenai,
      'Solidity': Si.SiSolidity,
      'Supabase': Si.SiSupabase,
      'Envio': Si.SiCoder,
      'Celo': Si.SiEthereum, // Celo icon doesn't exist, using Ethereum as fallback
      'Polygon': Si.SiPolygon,
      'The Graph': Si.SiGraphql,
      'ethers.js': Si.SiEthereum,
      'EDU Chain': Si.SiEthereum,
      'NFTs': Si.SiOpensea,
      'Browser Extension': Si.SiGooglechrome,
      'PostgreSQL': Si.SiPostgresql,
      'Inngest': Si.SiNodedotjs,
      'Gemini AI': Si.SiGoogle,
      'Nuxt': Si.SiNuxtdotjs,
      'Vue.js': Si.SiVuedotjs,
      'Docker': Si.SiDocker,
      'Nginx': Si.SiNginx,
      'Tailwind CSS': Si.SiTailwindcss,
      'NEAR Blockchain': Si.SiNodedotjs,
      'NEAR': Si.SiNodedotjs,
      'GolemDB': Si.SiCoder,
      'CoreDAO': Si.SiEthereum, // CoreDAO blockchain platform
      'Core': Si.SiEthereum,
    };

    // Try exact match first
    let IconComponent = iconMap[techName];
    
    // Try partial matches
    if (!IconComponent) {
      const lowerTech = techName.toLowerCase();
      if (lowerTech.includes('next')) IconComponent = Si.SiNextdotjs;
      else if (lowerTech.includes('react')) IconComponent = Si.SiReact;
      else if (lowerTech.includes('express')) IconComponent = Si.SiExpress;
      else if (lowerTech.includes('typescript') || lowerTech.includes('ts')) IconComponent = Si.SiTypescript;
      else if (lowerTech.includes('mongodb')) IconComponent = Si.SiMongodb;
      else if (lowerTech.includes('solidity')) IconComponent = Si.SiSolidity;
      else if (lowerTech.includes('docker')) IconComponent = Si.SiDocker;
      else if (lowerTech.includes('celo')) IconComponent = Si.SiEthereum;
      else if (lowerTech.includes('near')) IconComponent = Si.SiNodedotjs;
      else if (lowerTech.includes('core') || lowerTech.includes('coredao')) IconComponent = Si.SiEthereum;
      else IconComponent = Si.SiCoder;
    }
    
    return IconComponent || Si.SiCoder;
  };

  // Extract year from date string
  const getYear = (dateString?: string) => {
    if (!dateString) return '';
    const match = dateString.match(/\d{4}/);
    return match ? match[0] : '';
  };

  return (
    <div className="min-h-screen pb-24 sm:pb-20 bg-[var(--background)]">
      <Header />
      <main className="w-full px-5 py-6">
        <div className="flex flex-col gap-6">
          {/* Projects List - Vertical Layout */}
          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {mockPortfolioData.projects.map((project, index) => {
              const year = project.endDate ? getYear(project.endDate) : (project.startDate ? getYear(project.startDate) : '');
              
              return (
                <motion.div
                  key={project.id}
                  className="flex flex-col md:flex-row md:items-start gap-6 md:gap-6 p-4 border border-[var(--foreground)] rounded-lg bg-[var(--background)]"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.7,
                        ease: [0.25, 0.1, 0.25, 1],
                      },
                    },
                  }}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                  }}
                >
                  {/* Screenshot - First on Mobile, Right on Desktop */}
                  {project.imageUrl && (
                    <div className="w-full md:w-80 lg:w-96 shrink-0 md:order-2">
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-gray-100">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Content - Second on Mobile, Left on Desktop */}
                  <div className="flex-1 flex flex-col gap-3 md:h-full md:justify-between md:order-1">
                    {/* Title and Year */}
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-base sm:text-lg md:text-base lg:text-lg font-bold text-[var(--foreground)]">
                        {project.title}
                      </h2>
                      {year && (
                        <span className="text-xs sm:text-sm md:text-xs lg:text-sm text-[var(--foreground)]/60 font-light shrink-0">
                          {year}
                        </span>
                      )}
                    </div>

                    {/* Technology Stack Icons */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2">
                        {project.technologies.map((tech, index) => {
                          const IconComponent = getTechIcon(tech);
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-center"
                              title={tech}
                            >
                              <IconComponent size={18} className="md:w-4 md:h-4 lg:w-5 lg:h-5 text-[var(--foreground)]" />
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs sm:text-sm md:text-xs lg:text-sm text-[var(--foreground-muted)] font-light leading-relaxed text-justify">
                      {project.longDescription || project.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 md:px-2.5 md:py-1 lg:px-3 lg:py-1.5 bg-[var(--foreground)] hover:opacity-80 rounded-lg text-[var(--background)] font-medium text-xs md:text-xs lg:text-sm transition-opacity"
                          aria-label="View Code"
                        >
                          <Github size={16} className="md:w-3 md:h-3 lg:w-4 lg:h-4" />
                          <span>Code</span>
                        </Link>
                      )}
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 md:px-2.5 md:py-1 lg:px-3 lg:py-1.5 bg-[var(--foreground)] hover:opacity-80 rounded-lg text-[var(--background)] font-medium text-xs md:text-xs lg:text-sm transition-opacity"
                          aria-label="View Live"
                        >
                          <ExternalLink size={16} className="md:w-3 md:h-3 lg:w-4 lg:h-4" />
                          <span>Live</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </main>
      <BottomNav activeItem="folder" />
    </div>
  );
}

