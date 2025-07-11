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
  Trophy
} from "lucide-react";
import { useState } from "react";

interface ProjectsSectionProps {
  theme: string;
}

export default function ProjectsSection({ theme }: ProjectsSectionProps) {
  const projects = [
    {
      title: "EDU Legacy",
      shortDescription: "Redefining Digital Asset Inheritance Through Automated Smart Will Systems",
      description: "EDU Legacy fundamentally reimagines legacy planning by architecting an immutable, automated 'Smart Will' ecosystem that ensures digital wealth—including educational funds, scholarships, and learning resources—seamlessly transfers to rightful beneficiaries without human intervention.",
      tech: ["Solidity", "OpenZeppelin", "Multi-chain", "Smart Contracts"],
      github: "https://github.com/manobendra/edu-legacy",
      live: "https://edu-legacy.vercel.app",
      featured: true,
      icon: Shield,
      color: "purple",
      image: "/projects/edu-legacy.png"
    },
    {
      title: "Fork Work",
      shortDescription: "Eliminating Trust Barriers in Decentralized Work Collaboration",
      description: "Fork Work tackles the fundamental trust crisis in remote work by building a blockchain-powered platform that replaces subjective ratings with verifiable proof of performance. Features revolutionary 'Skin in the Game' mechanism with escrow-based payments.",
      tech: ["Ethereum", "Civic Auth", "USDT", "The Graph"],
      github: "https://github.com/manobendra/fork-work",
      live: "https://fork-work.vercel.app",
      featured: true,
      icon: Users,
      color: "blue",
      image: "/projects/fork-work.png"
    },
    {
      title: "Coro Tashi",
      shortDescription: "Decentralized Liquid Staking Protocol Pioneering Cross-Token Rewards",
      description: "Coro Tashi revolutionizes staking infrastructure on Core Chain by enabling users to stake one token and earn rewards in another. Won 2nd place at Core Hacker House Bangalore, earning $1500 in Core tokens.",
      tech: ["Core Chain", "Solidity", "Hardhat", "Next.js", "Wagmi"],
      github: "https://github.com/manobendra/coro-tashi",
      live: "https://coro-tashi.vercel.app",
      featured: true,
      icon: TrendingUp,
      color: "green",
      image: "projects/coro-tashi.png",
      award: "2nd Place - Core Hacker House Bangalore"
    },
    {
      title: "PolyTix",
      shortDescription: "Decentralized Governance Platform Eliminating Electoral Manipulation",
      description: "PolyTix solves fundamental trust issues in digital voting by leveraging blockchain's immutability to create transparent, tamper-proof voting infrastructure. Features role-based governance and one-person-one-vote NFT system.",
      tech: ["Polygon", "Next.js 15", "The Graph", "Solidity", "ShadCN UI"],
      github: "https://github.com/manovHacksaw/polytix/tree/v2",
      featured: false,
      icon: Globe,
      color: "indigo",
      image: "/projects/polytix.png"
    },
    {
      title: "Pixel8r",
      shortDescription: "Collaborative Blockchain Art Canvas Democratizing Digital Creativity",
      description: "Pixel8r transforms simple pixel art into powerful decentralized collaboration by creating a shared digital canvas where every contribution is permanently recorded on the Telos Blockchain.",
      tech: ["Telos", "Blockchain", "Real-time", "Digital Art"],
      github: "https://github.com/manobendra/pixel8r",
      featured: false,
      icon: Zap,
      color: "pink",
      image: "/api/placeholder/400/300"
    },
    {
      title: "PlaiaZone",
      shortDescription: "Decentralized Crowdfunding Infrastructure for Gaming Communities",
      description: "PlaiaZone addresses the funding gap in gaming by creating a specialized crowdfunding platform that connects passionate gamers with supporters, featuring flexible funding models and community-driven support.",
      tech: ["Crowdfunding", "Gaming", "Multi-wallet", "Community"],
      github: "https://github.com/manobendra/plaiazone",
      featured: false,
      icon: Users,
      color: "orange",
      image: "/api/placeholder/400/300"
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  const getColorClasses = (color) => {
    const colors = {
      purple: theme === "dark" 
        ? "from-purple-600 to-purple-800" 
        : "from-purple-500 to-purple-600",
      blue: theme === "dark" 
        ? "from-blue-600 to-blue-800" 
        : "from-blue-500 to-blue-600",
      green: theme === "dark" 
        ? "from-green-600 to-green-800" 
        : "from-green-500 to-green-600",
      indigo: theme === "dark" 
        ? "from-indigo-600 to-indigo-800" 
        : "from-indigo-500 to-indigo-600",
      pink: theme === "dark" 
        ? "from-pink-500 to-pink-800" 
        : "from-pink-500 to-pink-500",
      orange: theme === "dark" 
        ? "from-orange-600 to-orange-800" 
        : "from-orange-500 to-orange-600"
    };
    return colors[color] || colors.blue;
  };

  const getTextColor = (color) => {
    const colors = {
      purple: "text-purple-600",
      blue: "text-blue-600",
      green: "text-green-600",
      indigo: "text-indigo-600",
      pink: "text-pink-500",
      orange: "text-orange-600"
    };
    return colors[color] || "text-blue-600";
  };

  return (
    <section
      id="projects"
      className={`py-20 px-6 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-950" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2
            className={`text-2xl md:text-3xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            # Featured Projects
          </h2>
          <p
            className={`text-base max-w-2xl mb-6 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            A selection of my recent projects, focused on Web3, DeFi, and
            innovative technologies. Each project represents a step in my
            journey as a builder.
          </p>
          
          <button
            className={`inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all duration-200 ${
              theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"
            }`}
          >
            View All Projects
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredProjects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div
                key={project.title}
                className={`group relative overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-lg ${
                  theme === "dark"
                    ? "bg-gray-900 border-gray-800 hover:border-gray-700"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Project Image/Icon */}
                <div className={`h-48 bg-gradient-to-br ${getColorClasses(project.color)} flex items-center justify-center relative overflow-hidden`}>
                  <IconComponent size={48} className="text-white/80" />
                  {project.award && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Trophy size={12} />
                      2nd Place
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3
                      className={`text-lg font-semibold transition-colors duration-200 ${
                        theme === "dark"
                          ? "text-white group-hover:text-gray-200"
                          : "text-gray-900 group-hover:text-gray-700"
                      }`}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <p
                    className={`text-sm mb-4 line-clamp-2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {project.shortDescription}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
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
                    {project.tech.length > 3 && (
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          theme === "dark"
                            ? "bg-gray-800 text-gray-400"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                        theme === "dark"
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Github size={14} />
                      Repo
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium text-white transition-colors bg-gradient-to-r ${getColorClasses(project.color)} hover:opacity-90`}
                      >
                        <ExternalLink size={14} />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProjects.map((project) => {
            const IconComponent = project.icon;
            return (
              <div
                key={project.title}
                className={`group flex gap-4 p-6 rounded-lg border transition-all duration-300 hover:shadow-md ${
                  theme === "dark"
                    ? "bg-gray-900 border-gray-800 hover:border-gray-700"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Project Icon */}
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${getColorClasses(project.color)} flex items-center justify-center flex-shrink-0`}>
                  <IconComponent size={24} className="text-white" />
                </div>

                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-sm mb-3 line-clamp-2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {project.shortDescription}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.slice(0, 3).map((tech) => (
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

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                        theme === "dark"
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Github size={14} />
                      Repo
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}