"use client";

import { Github, ExternalLink, Award, Users, Zap, Shield, TrendingUp, Globe } from "lucide-react";
import { useState } from "react";

interface ProjectsSectionProps {
  theme: string;
}

export default function ProjectsSection({ theme }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState(null);

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
      image: "/api/placeholder/600/400"
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
      image: "/api/placeholder/600/400"
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
      image: "/api/placeholder/600/400",
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
      image: "/api/placeholder/400/300"
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

  const getColorClasses = (color, theme) => {
    const colors = {
      purple: theme === "dark" 
        ? "border-purple-500/50 bg-purple-900/10 text-purple-300" 
        : "border-purple-300 bg-purple-50 text-purple-700",
      blue: theme === "dark" 
        ? "border-blue-500/50 bg-blue-900/10 text-blue-300" 
        : "border-blue-300 bg-blue-50 text-blue-700",
      green: theme === "dark" 
        ? "border-green-500/50 bg-green-900/10 text-green-300" 
        : "border-green-300 bg-green-50 text-green-700",
      indigo: theme === "dark" 
        ? "border-indigo-500/50 bg-indigo-900/10 text-indigo-300" 
        : "border-indigo-300 bg-indigo-50 text-indigo-700",
      pink: theme === "dark" 
        ? "border-pink-500/50 bg-pink-900/10 text-pink-300" 
        : "border-pink-300 bg-pink-50 text-pink-700",
      orange: theme === "dark" 
        ? "border-orange-500/50 bg-orange-900/10 text-orange-300" 
        : "border-orange-300 bg-orange-50 text-orange-700"
    };
    return colors[color] || colors.blue;
  };

  return (
    <section
      id="projects"
      className={`py-20 px-6 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-950" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Featured Projects
          </h2>
          <p className={`text-lg max-w-3xl mx-auto mb-8 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            Real-world solutions built from scratch to tackle serious problems in decentralized finance, governance, and creator economies. Each project represents a step toward a more transparent, efficient, and user-empowered digital ecosystem.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div
                key={project.title}
                className={`
                  group rounded-2xl border shadow-sm overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer
                  ${project.featured ? "lg:col-span-2 md:col-span-2" : ""}
                  ${
                    theme === "dark"
                      ? "bg-gray-900/50 border-gray-700 hover:shadow-2xl hover:border-pink-600/50 backdrop-blur-sm"
                      : "bg-white/50 border-gray-200 hover:shadow-2xl hover:border-pink-300 backdrop-blur-sm"
                  }
                `}
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <div className={`p-3 rounded-full border ${getColorClasses(project.color, theme)}`}>
                      <IconComponent size={24} />
                    </div>
                  </div>
                  {project.award && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-300">
                        <Award size={14} />
                        <span className="text-xs font-medium">Award Winner</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3
                        className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-white group-hover:text-pink-400"
                            : "text-gray-900 group-hover:text-pink-600"
                        }`}
                      >
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span
                          className={`inline-block px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300 ${
                            theme === "dark"
                              ? "bg-pink-900/30 text-pink-300 border border-pink-700/50"
                              : "bg-pink-100 text-pink-800 border border-pink-200"
                          }`}
                        >
                          Featured
                        </span>
                      )}
                      {project.award && (
                        <div className="mt-2">
                          <span className="text-xs text-yellow-500 font-medium">
                            🏆 {project.award}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-full transition-all duration-300 ${
                            theme === "dark"
                              ? "text-gray-400 hover:text-white hover:bg-gray-800"
                              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                          aria-label="View on GitHub"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-full transition-all duration-300 ${
                            theme === "dark"
                              ? "text-gray-400 hover:text-white hover:bg-gray-800"
                              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                          aria-label="View live site"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p
                    className={`leading-relaxed mb-6 text-sm transition-colors duration-300 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
                          theme === "dark"
                            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className={`inline-block p-1 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 mb-4`}>
            <div className={`px-6 py-2 rounded-full ${theme === "dark" ? "bg-gray-950" : "bg-white"}`}>
              <p className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                <span className="text-pink-600">Note:</span> While my formal education didn't include blockchain or Web3 coursework, building these projects alongside traditional assignments taught me the discipline to tackle complex problems that textbooks couldn't address.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <a
              href="https://github.com/manobendra"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center space-x-2 font-medium text-lg px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                theme === "dark"
                  ? "text-pink-400 border-pink-400 hover:bg-pink-400 hover:text-gray-900"
                  : "text-pink-600 border-pink-600 hover:bg-pink-600 hover:text-white"
              }`}
            >
              <Github size={20} />
              <span>Explore All Projects</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className={`text-2xl font-bold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    {selectedProject.title}
                  </h3>
                  <p className={`text-lg ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}>
                    {selectedProject.shortDescription}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  ×
                </button>
              </div>
              
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              
              <p className={`text-base leading-relaxed mb-6 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}>
                {selectedProject.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      theme === "dark"
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-4">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      theme === "dark"
                        ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Github size={18} />
                    <span>View Code</span>
                  </a>
                )}
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors"
                  >
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}