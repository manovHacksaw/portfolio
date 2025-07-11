"use client";

import {
  Github,
  ExternalLink,
  Shield,
  Users,
  TrendingUp,
  Globe,
  Zap,
  ArrowRight,
  Trophy,
} from "lucide-react";
import Image from "next/image";

interface ProjectsSectionProps {
  theme: string;
}

export default function ProjectsSection({ theme }: ProjectsSectionProps) {
  const projects = [
    {
      title: "EDU Legacy",
      shortDescription: "Redefining Digital Asset Inheritance Through Automated Smart Will Systems",
      tech: ["Solidity", "OpenZeppelin", "Multi-chain", "Smart Contracts"],
      github: "https://github.com/manobendra/edu-legacy",
      live: "https://edu-legacy.vercel.app",
      featured: true,
      icon: Shield,
      image: "/projects/edu-legacy.png",
            award: "Won Multiple Hackathons",
    },
    {
      title: "Fork Work",
      shortDescription: "Eliminating Trust Barriers in Decentralized Work Collaboration",
      tech: ["Ethereum", "Civic Auth", "USDT", "The Graph"],
      github: "https://github.com/manobendra/fork-work",
      live: "https://fork-work.vercel.app",
      featured: true,
      icon: Users,
      image: "/projects/fork-work.png",
      award: "Freshly Cooked for Hack4Bengal 4.0"

    },
    {
      title: "Coro Tashi",
      shortDescription: "Decentralized Liquid Staking Protocol Pioneering Cross-Token Rewards",
      tech: ["Core Chain", "Solidity", "Hardhat", "Next.js", "Wagmi"],
      github: "https://github.com/manobendra/coro-tashi",
      live: "https://coro-tashi.vercel.app",
      featured: true,
      icon: TrendingUp,
      image: "/projects/coro-tashi.png",
      award: "2nd Place - Core Hacker House",
    },
    {
      title: "PolyTix",
      shortDescription: "Decentralized Governance Platform Eliminating Electoral Manipulation",
      tech: ["Polygon", "Next.js 15", "The Graph", "Solidity", "ShadCN UI"],
      github: "https://github.com/manovHacksaw/polytix/tree/v2",
      live: null,
      featured: true,
      icon: Globe,
      image: "/projects/polytix.png",
      award: "Final Year Academic Project",
    },
    {
      title: "Pixel8r",
      shortDescription: "Collaborative Blockchain Art Canvas Democratizing Digital Creativity",
      tech: ["Telos", "Blockchain", "Real-time", "Digital Art"],
      github: "https://github.com/manobendra/pixel8r",
      live: null,
      featured: false,
      icon: Zap,
    },
    {
      title: "PlaiaZone",
      shortDescription: "Decentralized Crowdfunding Infrastructure for Gaming Communities",
      tech: ["Crowdfunding", "Gaming", "Multi-wallet", "Community"],
      github: "https://github.com/manobendra/plaiazone",
      live: null,
      featured: false,
      icon: Users,
    },
  ];

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className={`py-24 px-6 transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-gray-50"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <h2
            className={`text-4xl font-bold mb-4 tracking-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Featured Projects
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            A selection of my recent work, focused on solving real-world problems with Web3, DeFi, and innovative technology solutions.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className={`group overflow-hidden h-max  rounded-xl border transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-900 border-gray-800 hover:border-gray-700"
                  : "bg-white border-gray-200 hover:border-gray-300"
              } hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="relative">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    width={700}
                    height={900}
                    className="w-full h-48 object-cover"
                  />
                )}
                {project.award && (
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg ${
                    project.award.includes("Academic") 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    <Trophy size={14} />
                    <span>{project.award}</span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {project.title}
                </h3>
                <p className={`text-sm mb-4 leading-relaxed ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech} 
                      className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                        theme === "dark" 
                          ? "bg-gray-800 text-gray-300" 
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm font-medium">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 transition-colors ${
                      theme === "dark" 
                        ? "text-gray-400 hover:text-white" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Github size={14} />
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Header */}
        <div className="mb-12 text-center md:text-left">
          <h3
            id="other-projects"
            className={`text-3xl font-bold mb-4 tracking-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Other Noteworthy Projects
          </h3>
          <p className={`text-lg max-w-2xl mx-auto md:mx-0 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            Additional explorations in code, from hackathon prototypes to personal experiments.
          </p>
        </div>

        {/* Other Projects List */}
        <div className="space-y-4">
          {otherProjects.map((project) => {
            const IconComponent = project.icon;
            return (
              <a
                key={project.title}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col sm:flex-row items-start gap-4 p-5 rounded-xl border transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-900 border-gray-800 hover:bg-gray-800/50 hover:border-gray-700"
                    : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                } hover:shadow-sm`}
              >
                <div className={`p-3 rounded-lg flex-shrink-0 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <IconComponent 
                    className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} 
                    size={24} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-semibold mb-1 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    {project.title}
                  </h4>
                  <p className={`text-sm mb-3 leading-relaxed ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span 
                        key={tech} 
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          theme === "dark" 
                            ? "bg-gray-800 text-gray-300" 
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={`mt-2 sm:mt-0 flex-shrink-0 self-start sm:self-center text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'text-gray-400 group-hover:text-white' 
                    : 'text-gray-500 group-hover:text-gray-900'
                }`}>
                  View Code 
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}