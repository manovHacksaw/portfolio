"use client";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { mockPortfolioData } from "@/data/mockData";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import * as Si from "react-icons/si";

export default function ProjectsPage() {
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
    <div className="min-h-screen pb-20 bg-white dark:bg-black">
      <Header />
      <main className="w-full px-5 py-6">
        <div className="flex flex-col gap-6">
          {/* Projects List - Vertical Layout */}
          <div className="flex flex-col gap-4">
            {mockPortfolioData.projects.map((project) => {
              const year = project.endDate ? getYear(project.endDate) : (project.startDate ? getYear(project.startDate) : '');
              
              return (
                <div
                  key={project.id}
                  className="flex flex-col md:flex-row md:items-start gap-4 p-4 border border-black dark:border-white rounded-lg bg-white dark:bg-black"
                >
                  {/* Left Side - Content */}
                  <div className="flex-1 flex flex-col gap-3 md:h-full md:justify-between">
                    {/* Title and Year */}
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-sm sm:text-base font-bold text-black dark:text-white">
                        {project.title}
                      </h2>
                      {year && (
                        <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-light shrink-0">
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
                              <IconComponent size={16} className="text-black dark:text-white" />
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-light leading-relaxed text-justify">
                      {project.longDescription || project.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 rounded-lg text-white font-medium text-[10px] sm:text-xs transition-colors"
                          aria-label="View Code"
                        >
                          <Github size={12} />
                          <span>Code</span>
                        </Link>
                      )}
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 rounded-lg text-white font-medium text-[10px] sm:text-xs transition-colors"
                          aria-label="View Live"
                        >
                          <ExternalLink size={12} />
                          <span>Live</span>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Right Side - Screenshot */}
                  {project.imageUrl && (
                    <div className="md:w-80 lg:w-96 shrink-0">
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-black dark:border-white bg-gray-100 dark:bg-gray-900">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <BottomNav activeItem="folder" />
    </div>
  );
}
