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
import {
  spaceGrotesk,
  firaSans,
  poppins,
  jetbrainsMono,
  workSans,
} from "@/app/fonts";

interface ProjectsSectionProps {
  theme: string;
}

export default function ProjectsSection({ theme }: ProjectsSectionProps) {
  const projects = [
    {
      title: "EDU Legacy",
      shortDescription:
        "Redefining Digital Asset Inheritance Through Automated Smart Will Systems",
      tech: ["Solidity", "OpenZeppelin", "Multi-chain", "Next.js"],
      github: "https://github.com/manobendra/edu-legacy",
      live: "https://edu-legacy.vercel.app",
      featured: true,
      icon: Shield,
      image: "/projects/edu-legacy.png",
      award: "Won Multiple Hackathons",
    },
    {
      title: "Fork Work",
      shortDescription:
        "Eliminating Trust Barriers in Decentralized Work Collaboration",
      tech: ["Ethereum", "Civic Auth", "Next.js", "Gemini AI"],
      github: "https://github.com/manobendra/fork-work",
      live: "https://fork-work.vercel.app",
      featured: true,
      icon: Users,
      image: "/projects/fork-work.png",
      award: "Freshly Cooked for Hack4Bengal 4.0",
    },
    {
      title: "Coro Tashi",
      shortDescription:
        "Decentralized Liquid Staking Protocol Pioneering Cross-Token Rewards",
      tech: ["Core", "Solidity", "Remix IDE", "Next.js", "ethers.js"],
      github: "https://github.com/manobendra/coro-tashi",
      live: "https://coro-tashi.vercel.app",
      featured: true,
      icon: TrendingUp,
      image: "/projects/coro-tashi.png",
      award: "2nd Place - Core Hacker House",
    },
    {
      title: "PolyTix",
      shortDescription:
        "Decentralized Governance Platform Eliminating Electoral Manipulation",
      tech: ["Polygon", "Next.js 15", "The Graph", "Solidity", "NFTs"],
      github: "https://github.com/manovHacksaw/polytix/tree/v2",
      live: "polytix.vercel.app",
      featured: true,
      icon: Globe,
      image: "/projects/polytix.png",
      award: "Final Year Academic Project",
    },
    {
      title: "Pixel8r",
      shortDescription:
        "Collaborative Blockchain Art Canvas Democratizing Digital Creativity",
      tech: ["Telos", "IPFS", "Pinata", "NFT"],
      github: "https://github.com/ayaanoski/pixel8r",
      live: "https://pixel8r.vercel.app/",
      featured: false,
      icon: Zap,
    },
    {
      title: "PlaiaZone",
      shortDescription:
        "Decentralized Crowdfunding Infrastructure for Gaming Communities",
      tech: ["AIA Chain", "Solidity", "Next.js", "ethers.js"],
      github: "https://github.com/manovHacksaw/plAIA-zone",
      live: "https://pl-aia-zone.vercel.app/",
      featured: false,
      icon: Users,
    },
  ];

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className={`py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-smooth ${
        theme === "dark" ? "bg-dark" : "bg-light-soft"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center md:text-left">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-tight ${
              theme === "dark" ? "text-light" : "text-dark"
            } ${spaceGrotesk.className}`}
          >
            Featured Projects
          </h2>
          <p
            className={`text-base sm:text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed ${
              theme === "dark" ? "text-muted-light" : "text-muted-dark"
            } ${workSans.className}`}
          >
            A selection of my recent work, focused on solving real-world
            problems with Web3, DeFi, and innovative technology solutions.
          </p>
          <div className="divider-accent mx-auto md:mx-0 mt-6" />
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className={`group overflow-hidden h-max rounded-xl border transition-smooth scale-hover ${
                theme === "dark"
                  ? "card-dark card-hover-dark shadow-dark"
                  : "card-light card-hover-light shadow-light"
              }`}
            >
              <div className="relative">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    width={700}
                    height={900}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                )}
                {project.award && (
                  <div
                    className={`absolute top-3 right-3 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-light ${
                      project.award.includes("Academic")
                        ? theme === "dark"
                          ? "bg-blue-900/80 text-blue-300"
                          : "bg-blue-50 text-blue-700"
                        : theme === "dark"
                          ? "bg-yellow-900/80 text-yellow-300"
                          : "bg-yellow-50 text-yellow-700"
                    } ${jetbrainsMono.className}`}
                  >
                    <Trophy size={12} />
                    <span className="hidden sm:inline">{project.award}</span>
                    <span className="sm:hidden">Award</span>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-6">
                <h3
                  className={`text-lg sm:text-xl font-semibold mb-2 ${
                    theme === "dark" ? "text-light" : "text-dark"
                  } ${poppins.className}`}
                >
                  {project.title}
                </h3>
                <p
                  className={`text-sm mb-4 leading-relaxed ${
                    theme === "dark" ? "text-muted-light" : "text-muted-dark"
                  } ${workSans.className}`}
                >
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 sm:px-2.5 py-1 rounded-md text-xs font-medium ${
                        theme === "dark"
                          ? "bg-dark-soft text-muted-light"
                          : "bg-light text-muted-dark border border-dark"
                      } ${jetbrainsMono.className}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 sm:gap-4 text-sm font-medium">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 accent-primary hover-accent-primary transition-smooth scale-hover ${poppins.className}`}
                    >
                      <ExternalLink size={14} />
                      <span className="hidden sm:inline">Live Demo</span>
                      <span className="sm:hidden">Demo</span>
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 transition-smooth scale-hover ${
                      theme === "dark"
                        ? "text-muted-light hover:text-light"
                        : "text-muted-dark hover:text-dark"
                    } ${poppins.className}`}
                  >
                    <Github size={14} />
                    <span className="hidden sm:inline">Source Code</span>
                    <span className="sm:hidden">Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Header */}
        <div className="mb-8 sm:mb-12 text-center md:text-left">
          <h3
            id="other-projects"
            className={`text-2xl sm:text-3xl font-bold mb-4 tracking-tight ${
              theme === "dark" ? "text-light" : "text-dark"
            } ${poppins.className}`}
          >
            Other Noteworthy Projects
          </h3>
          <p
            className={`text-base sm:text-lg max-w-2xl mx-auto md:mx-0 ${
              theme === "dark" ? "text-muted-light" : "text-muted-dark"
            } ${workSans.className}`}
          >
            Additional explorations in code, from hackathon prototypes to
            personal experiments.
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
                className={`group flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border transition-smooth scale-hover ${
                  theme === "dark"
                    ? "card-dark card-hover-dark shadow-dark"
                    : "card-light card-hover-light shadow-light"
                }`}
              >
                <div
                  className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${
                    theme === "dark" ? "bg-dark-soft" : "bg-light-soft"
                  }`}
                >
                  <IconComponent
                    className={
                      theme === "dark" ? "text-muted-light" : "text-muted-dark"
                    }
                    size={20}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className={`font-semibold mb-1 ${
                      theme === "dark" ? "text-light" : "text-dark"
                    } ${poppins.className}`}
                  >
                    {project.title}
                  </h4>
                  <p
                    className={`text-sm mb-3 leading-relaxed ${
                      theme === "dark" ? "text-muted-light" : "text-muted-dark"
                    } ${workSans.className}`}
                  >
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          theme === "dark"
                            ? "bg-dark-soft text-muted-light"
                            : "bg-light text-muted-dark border border-dark"
                        } ${jetbrainsMono.className}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className={`mt-2 sm:mt-0 flex-shrink-0 self-start sm:self-center text-sm font-medium flex items-center gap-2 transition-smooth ${
                    theme === "dark"
                      ? "text-muted-light group-hover:text-light"
                      : "text-muted-dark group-hover:text-dark"
                  } ${poppins.className}`}
                >
                  <span className="hidden sm:inline">View Code</span>
                  <span className="sm:hidden">Code</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
