"use client";

import { Github, ExternalLink } from "lucide-react";
import {
  spaceGrotesk,
  firaSans,
  poppins,
  ibmPlexSans,
  rubik,
} from "@/app/fonts";

interface ProjectsSectionProps {
  theme: string;
}

export default function ProjectsSection({ theme }: ProjectsSectionProps) {
  const projects = [
    {
      title: "Solana DeFi Dashboard",
      description:
        "A comprehensive dashboard for tracking Solana DeFi protocols with real-time data and portfolio management features.",
      tech: ["Next.js", "Solana Web3.js", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/manobendra/solana-dashboard",
      live: "https://solana-dashboard.vercel.app",
      featured: true,
    },
    {
      title: "Web3 Portfolio Tracker",
      description:
        "Multi-chain portfolio tracker with support for Ethereum, Solana, and other major blockchains.",
      tech: ["React", "Web3.js", "Node.js", "MongoDB"],
      github: "https://github.com/manobendra/web3-portfolio",
      live: "https://web3-portfolio.vercel.app",
      featured: true,
    },
    {
      title: "Minimalist Blog Platform",
      description:
        "A clean, fast blog platform built with Next.js and focused on reading experience.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
      github: "https://github.com/manobendra/blog-platform",
      featured: false,
    },
    {
      title: "Task Management App",
      description:
        "A simple yet powerful task management application with real-time collaboration.",
      tech: ["React", "Node.js", "Socket.io", "PostgreSQL"],
      github: "https://github.com/manobendra/task-manager",
      featured: false,
    },
  ];

  return (
    <section
      id="projects"
      className={`py-20 px-6 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-950" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${spaceGrotesk.className} transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Featured Projects
          </h2>
          <div className="w-20 h-0.5 bg-pink-600 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`
                group rounded-xl border shadow-sm overflow-hidden transition-all duration-300
                ${project.featured ? "md:col-span-2" : ""}
                ${
                  theme === "dark"
                    ? "bg-gray-900 border-gray-700 hover:shadow-lg hover:border-pink-600/50"
                    : "bg-white border-gray-200 hover:shadow-lg hover:border-pink-300"
                }
              `}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3
                      className={`text-xl font-semibold mb-2 ${poppins.className} transition-colors duration-300 ${
                        theme === "dark"
                          ? "text-white group-hover:text-pink-400"
                          : "text-gray-900 group-hover:text-pink-600"
                      }`}
                    >
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium ${ibmPlexSans.className} rounded-full transition-colors duration-300 ${
                          theme === "dark"
                            ? "bg-pink-900/30 text-pink-300 border border-pink-700/50"
                            : "bg-pink-100 text-pink-800"
                        }`}
                      >
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-500 hover:text-gray-900"
                        }`}
                        aria-label="View on GitHub"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-500 hover:text-gray-900"
                        }`}
                        aria-label="View live site"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <p
                  className={`leading-relaxed mb-6 ${firaSans.className} transition-colors duration-300 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${ibmPlexSans.className} transition-colors duration-300 ${
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
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/manobendra"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-2 font-medium ${rubik.className} transition-colors duration-300 ${
              theme === "dark"
                ? "text-pink-400 hover:text-pink-300"
                : "text-pink-600 hover:text-pink-700"
            }`}
          >
            <span>View all projects on GitHub</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
