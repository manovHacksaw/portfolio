"use client";

import {
  ExternalLink,
  Calendar,
  Trophy,
  Link,
  Award,
  Star,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import {
  spaceGrotesk,
  firaSans,
  poppins,
  jetbrainsMono,
  workSans,
} from "@/app/fonts";

interface HackathonWinsSectionProps {
  theme: string;
}

interface Project {
  title: string;
  description: string;
  prize: string;
  tech: string[];
  announcement?: string;
  demo?: string;
  color: string;
  featured: boolean;
  hackathon?: string;
  month?: string;
}

export default function HackathonWinsSection({
  theme,
}: HackathonWinsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Data remains the same
  const hackathons = [
    {
      name: "Hacker House Goa",
      month: "August 2024",
      projects: [
        {
          title: "Revee Reviews",
          description:
            "A decentralized review platform where users earn crypto tokens for sharing verified product reviews. Utilizes Anon Aadhaar KYC, wallet login, and Diamante Blockchain's consensus to block spam reviews. Rewards handled by Polygon Smart Wallet.",
          prize: "Track Winner",
          tech: [
            "Anon Aadhaar",
            "Diamante Blockchain",
            "Polygon",
            "Smart Wallet",
            "KYC",
          ],
          announcement:
            "https://www.linkedin.com/posts/manob-mandal_hackerhousegoa-web3-blockchain-activity-7238567457379041280-Fv4P",
          color: "purple",
          featured: true,
        },
      ],
    },
    {
      name: "AIA Chain Inaugural Hackathon (Consumer Track)",
      month: "December 2024",
      projects: [
        {
          title: "Plaia Zone",
          description:
            "Plaia Zone is a decentralized crowdfunding platform designed specifically for gamers. It allows users to create, fund, and manage campaigns that can either seek donations or loans, fostering a supportive community for gamers in need of financial assistance for their gaming endeavors.",
          prize: "500 USDT",
          tech: ["AIA Chain", "ethers.js", "Solidity", "Next.js"],
          demo: "https://pl-aia-zone.vercel.app/",
          announcement: "https://x.com/HackQuest_/status/1861432015893209373",
          color: "blue",
          featured: false,
        },
        {
          title: "Daccy",
          description:
            "A learn-to-earn platform gamifying DSA and tech learning. Features bug-fixing challenges, generative AI tutors, gamified problem solving, and visual learning through AI-powered mind maps. Users earn AIA tokens for completing challenges and learning modules.",
          prize: "2,000 USDT",
          tech: [
            "Gemini AI",
            "AIA Chain",
            "DSA",
            "Solidity",
            "Next.js",
          ],
          demo: "https://daccy-aia-learn-to-earn.vercel.app/",
          announcement: "https://x.com/HackQuest_/status/1861432015893209373",
          color: "green",
          featured: true,
        },
      ],
    },
    {
      name: "Telos Mini Hackathon",
      month: "February 2025",
      projects: [
        {
          title: "Inherify",
          description:
            "A decentralized legacy management platform enabling users to create and pass on secure educational legacies using Telos blockchain. (Ported from Edu Legacy)",
          prize: "600 USDC",
          tech: ["Telos Blockchain", "Solidity", "Next.js", "ethers.js"],
          announcement: "https://x.com/HackQuest_/status/1895021811303358625",
          color: "indigo",
          featured: false,
        },
        {
          title: "Goalzilla",
          description:
            "A milestones-based crowdfunding platform where users can set and achieve funding goals transparently on the Telos blockchain.",
          prize: "300 USDC",
          tech: ["Telos Blockchain", "Milestones",  "DeFi"],
          announcement: "https://x.com/HackQuest_/status/1895021811303358625",
          color: "orange",
          featured: false,
        },
        {
          title: "Pixel8r",
          description:
            "A decentralized AI-powered pixel art generator that allows users to create, mint, and trade pixel art NFTs on the Telos blockchain.",
          prize: "100 USDC",
          tech: ["AI Art", "NFTs", "Pixel Art", "Telos"],
          demo: "https://pixel8r.vercel.app/",
          announcement: "https://x.com/HackQuest_/status/1895021811303358625",
          color: "pink",
          featured: false,
        },
      ],
    },
    {
      name: "Arbitrum Stylus X Edu Chain Mini Hackathon",
      month: "February 2025",
      projects: [
        {
          title: "Edu Legacy",
          description:
            "A decentralized educational legacy platform for preserving and sharing lifetime learnings and experiences, now on Edu Chain.",
          prize: "50 USDC",
          tech: ["Edu Chain", "Educational Tech", "Legacy Preservation"],
          announcement: "https://x.com/HackQuest_/status/1900759044731912593",
          color: "blue",
          featured: false,
        },
        {
          title: "Crypted (Edu Chain)",
          description:
            "A ported version of Daccy on Edu Chain, offering bug-fix challenges, generative learning, and token-based rewards.",
          prize: "50 USDC",
          tech: ["Edu Chain", "AI/ML", "Gamification", "Educational Tech"],
          announcement: "https://x.com/HackQuest_/status/1900759044731912593",
          color: "green",
          featured: false,
        },
        {
          title: "Goalzilla (Edu Chain)",
          description:
            "The Edu Chain version of the milestones-based crowdfunding dApp, focusing on educational projects and personal learning goals.",
          prize: "50 USDC",
          tech: ["Edu Chain", "Crowdfunding", "Educational Projects"],
          announcement: "https://x.com/HackQuest_/status/1900759044731912593",
          color: "orange",
          featured: false,
        },
      ],
    },
    {
      name: "Core Hacker House Bangalore",
      month: "March 2025",
      projects: [
        {
          title: "Coro Tashi",
          description:
            "A decentralized liquid staking platform on Core Chain, allowing users to stake tokens, earn rewards, and delegate to validators. Features the custom Tashido reward algorithm and sustainable staking pool creation.",
          prize: "1,500 CORE Tokens (2nd Prize)",
          tech: ["Core Chain", "Liquid Staking", "DeFi", "Validators"],
          announcement:
            "https://x.com/corechain_devs/status/1904546816537887203",
          color: "red",
          featured: true,
        },
      ],
    },
    {
      name: "MetaMask Dev Cook-Off",
      month: "May 2025",
      projects: [
        {
          title: "Linea Legacy",
          description:
            "A Linea-based version of Edu Legacy, focusing on preserving educational legacies and offering tokenized proof of contribution. Integrated with MetaMask Smart Wallet and Linea chain.",
          prize: "3,000 USDT (1st Prize)",
          tech: ["Linea", "MetaMask", "Educational Tech", "Smart Wallet"],
          announcement: "https://x.com/MetaMaskDev/status/1910403973120667918",
          color: "purple",
          featured: true,
        },
      ],
    },
    {
      name: "Edu Chain Semester 3 Hackathon",
      month: "June 2025",
      projects: [
        {
          title: "Edu Legacy",
          description:
            "The core Edu Chain project preserving decentralized learning legacies and promoting peer-to-peer education rewards.",
          prize: "6,000 USDT (5th Place in Earn Track)",
          tech: ["Edu Chain", "Educational Tech", "P2P Learning"],
          announcement:
            "https://x.com/opencampus_xyz/status/1925476891651412133",
          color: "blue",
          featured: true,
        },
      ],
    },
  ];

  const getPrizeColor = (prize: string) => {
    const isDark = theme === "dark";
    if (
      prize.includes("1st") ||
      prize.includes("6,000") ||
      prize.includes("3,000")
    ) {
      return `${isDark ? "bg-yellow-900/30 border-yellow-600/50 text-yellow-300" : "bg-yellow-50 border-yellow-200 text-yellow-700"}`;
    } else if (
      prize.includes("2nd") ||
      prize.includes("2,000") ||
      prize.includes("1,500")
    ) {
      return `${isDark ? "bg-orange-900/30 border-orange-600/50 text-orange-300" : "bg-orange-50 border-orange-200 text-orange-700"}`;
    } else if (prize.includes("Track Winner") || prize.includes("600")) {
      return `${isDark ? "bg-purple-900/30 border-purple-600/50 text-purple-300" : "bg-purple-50 border-purple-200 text-purple-700"}`;
    }
    return `${isDark ? "bg-green-900/30 border-green-600/50 text-green-300" : "bg-green-50 border-green-200 text-green-700"}`;
  };

  const allProjects = hackathons.flatMap((hackathon) =>
    hackathon.projects.map((project) => ({
      ...project,
      hackathon: hackathon.name,
      month: hackathon.month,
    })),
  );

  const totalPrizeValue = allProjects.reduce((total, project) => {
    const prizeText = project.prize.toLowerCase();
    let value = 0;

    if (prizeText.includes("6,000")) value = 6000;
    else if (prizeText.includes("3,000")) value = 3000;
    else if (prizeText.includes("2,000")) value = 2000;
    else if (prizeText.includes("1,500")) value = 1500;
    else if (prizeText.includes("600")) value = 600;
    else if (prizeText.includes("500")) value = 500;
    else if (prizeText.includes("300")) value = 300;
    else if (prizeText.includes("100")) value = 100;
    else if (prizeText.includes("50")) value = 50;

    return total + value;
  }, 0);

  const displayedHackathons = isExpanded ? hackathons : hackathons.slice(0, 3);

  const handleShowLess = () => {
    setIsExpanded(false);
    const section = document.getElementById("hackathons");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hackathons"
      className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 transition-smooth ${
        theme === "dark" ? "bg-dark" : "bg-light"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 transition-smooth ${
              theme === "dark" ? "text-light" : "text-dark"
            } ${spaceGrotesk.className}`}
          >
            Hackathon Highlights
          </h2>
          <p
            className={`text-base sm:text-lg max-w-3xl mx-auto mb-8 leading-relaxed ${
              theme === "dark" ? "text-muted-light" : "text-muted-dark"
            } ${workSans.className}`}
          >
            A journey through competitive hackathons, building innovative
            blockchain solutions and earning recognition. Over $
            {totalPrizeValue.toLocaleString()} in prizes won across multiple
            platforms as a team.
          </p>
          <div className="divider-accent mx-auto" />
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16">
          <div
            className={`text-center p-3 sm:p-4 lg:p-6 rounded-xl border transition-smooth scale-hover ${
              theme === "dark"
                ? "card-dark shadow-dark"
                : "card-light shadow-light"
            }`}
          >
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 accent-primary mx-auto mb-2 sm:mb-3" />
            <div
              className={`text-xl sm:text-2xl font-bold accent-primary ${poppins.className}`}
            >
              {hackathons.length}
            </div>
            <div
              className={`text-xs sm:text-sm ${theme === "dark" ? "text-muted-light" : "text-muted-dark"} ${firaSans.className}`}
            >
              Hackathons
            </div>
          </div>
          <div
            className={`text-center p-3 sm:p-4 lg:p-6 rounded-xl border transition-smooth scale-hover ${
              theme === "dark"
                ? "card-dark shadow-dark"
                : "card-light shadow-light"
            }`}
          >
            <Star className="w-6 h-6 sm:w-8 sm:h-8 status-success mx-auto mb-2 sm:mb-3" />
            <div
              className={`text-xl sm:text-2xl font-bold status-success ${poppins.className}`}
            >
              {allProjects.length}
            </div>
            <div
              className={`text-xs sm:text-sm ${theme === "dark" ? "text-muted-light" : "text-muted-dark"} ${firaSans.className}`}
            >
              Projects Built
            </div>
          </div>
          <div
            className={`text-center p-3 sm:p-4 lg:p-6 rounded-xl border transition-smooth scale-hover ${
              theme === "dark"
                ? "card-dark shadow-dark"
                : "card-light shadow-light"
            }`}
          >
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 status-warning mx-auto mb-2 sm:mb-3" />
            <div
              className={`text-xl sm:text-2xl font-bold status-warning ${poppins.className}`}
            >
              ${totalPrizeValue.toLocaleString()}
            </div>
            <div
              className={`text-xs sm:text-sm ${theme === "dark" ? "text-muted-light" : "text-muted-dark"} ${firaSans.className}`}
            >
              Prize Money
            </div>
          </div>
        
        </div>

        <div className="relative">
          <div className="space-y-12">
            {displayedHackathons.map((hackathon, hackathonIndex) => (
              <div key={hackathon.name} className="relative">
                {hackathonIndex !== hackathons.length - 1 && (
                  <div
                    className={`absolute left-3 top-12 bottom-0 w-0.5 sm:left-4 sm:top-16 ${
                      theme === "dark" ? "border-light" : "border-dark"
                    }`}
                  />
                )}

                <div className="flex items-start space-x-4 sm:space-x-6 mb-6">
                  <div
                    className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-4 flex items-center justify-center ${
                      theme === "dark"
                        ? "bg-dark border-accent-primary"
                        : "bg-light border-accent-primary"
                    }`}
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-primary rounded-full" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-lg sm:text-xl lg:text-2xl font-bold mb-2 ${
                        theme === "dark" ? "text-light" : "text-dark"
                      } ${poppins.className}`}
                    >
                      {hackathon.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Calendar
                        size={16}
                        className={
                          theme === "dark"
                            ? "text-muted-light"
                            : "text-muted-dark"
                        }
                      />
                      <span
                        className={`text-xs sm:text-sm ${
                          theme === "dark"
                            ? "text-muted-light"
                            : "text-muted-dark"
                        } ${firaSans.className}`}
                      >
                        {hackathon.month}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Projects grid */}
                <div className="ml-6 sm:ml-10 lg:ml-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {hackathon.projects.map((project) => (
                    <div
                      key={`${hackathon.name}-${project.title}`}
                      className={`
                      group rounded-xl sm:rounded-2xl border overflow-hidden transition-smooth scale-hover cursor-pointer
                      ${project.featured ? "md:col-span-2 lg:col-span-2" : ""}
                      ${
                        theme === "dark"
                          ? "card-dark shadow-dark card-hover-dark"
                          : "card-light shadow-light card-hover-light"
                      }
                    `}
                      onClick={() =>
                        setSelectedProject({
                          ...project,
                          hackathon: hackathon.name,
                          month: hackathon.month,
                        })
                      }
                    >
                      {/* Project Card content */}
                      <div
                        className={`p-3 sm:p-4 lg:p-6 border-b ${theme === "dark" ? "border-light" : "border-dark"}`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4
                              className={`text-base sm:text-lg lg:text-xl font-bold mb-2 transition-smooth ${theme === "dark" ? "text-light group-hover:accent-primary" : "text-dark group-hover:accent-primary"} ${poppins.className}`}
                            >
                              {project.title}
                            </h4>
                          
                          </div>
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-2 rounded-full transition-smooth ${theme === "dark" ? "text-muted-light hover:text-light hover-bg-light" : "text-muted-dark hover:text-dark hover-bg-dark"}`}
                                aria-label="View live demo"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink size={18} />
                              </a>
                            )}
                            {project.announcement && (
                              <a
                                href={project.announcement}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-2 rounded-full transition-smooth ${theme === "dark" ? "text-muted-light hover:text-light hover-bg-light" : "text-muted-dark hover:text-dark hover-bg-dark"}`}
                                aria-label="View announcement"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Link size={18} />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-4">
                          <Trophy
                            size={16}
                            className={`${theme === "dark" ? "status-warning" : "status-warning"}`}
                          />
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getPrizeColor(project.prize)}`}
                          >
                            {project.prize}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 sm:p-4 lg:p-6">
                        <p
                          className={`leading-relaxed mb-4 sm:mb-6 text-sm transition-smooth ${theme === "dark" ? "text-muted-light" : "text-muted-dark"} ${workSans.className}`}
                        >
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-smooth ${theme === "dark" ? "bg-dark-soft text-muted-light" : "bg-light-soft text-muted-dark border border-dark"} ${jetbrainsMono.className}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Fade Overlay & "Show All" Button */}
          {!isExpanded && hackathons.length > 3 && (
            <div
              className={`absolute -bottom-12 left-0 right-0 h-80 sm:h-96 flex items-end justify-center pt-16 sm:pt-20 ${
                theme === "dark"
                  ? "bg-gradient-to-t from-dark to-transparent"
                  : "bg-gradient-to-t from-light to-transparent"
              }`}
            >
              <button
                onClick={() => setIsExpanded(true)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-white bg-accent-primary hover-accent-primary transition-smooth scale-hover shadow-light ${poppins.className}`}
              >
                <span>Show All Wins</span>
                <ChevronDown size={20} />
              </button>
            </div>
          )}
        </div>

        {/* "Show Less" Button */}
        {isExpanded && (
          <div className="text-center mt-12 sm:mt-16">
            <button
              onClick={handleShowLess}
              className={`flex items-center mx-auto space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-white bg-accent-primary hover-accent-primary transition-smooth scale-hover shadow-light ${poppins.className}`}
            >
              <span>Show Less</span>
              <ChevronUp size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl ${
              theme === "dark" ? "bg-dark" : "bg-light"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3
                    className={`text-xl sm:text-2xl font-bold mb-2 ${theme === "dark" ? "text-light" : "text-dark"} ${poppins.className}`}
                  >
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-2">
                    <span
                      className={`text-base sm:text-lg ${theme === "dark" ? "text-muted-light" : "text-muted-dark"} ${workSans.className}`}
                    >
                      {selectedProject.hackathon}
                    </span>
                    <span
                      className={`text-xs sm:text-sm ${theme === "dark" ? "text-muted-light" : "text-muted-dark"} ${firaSans.className}`}
                    >
                      {selectedProject.month}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy
                      size={16}
                      className={`${theme === "dark" ? "status-warning" : "status-warning"}`}
                    />
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getPrizeColor(selectedProject.prize)}`}
                    >
                      {selectedProject.prize}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`text-3xl font-bold -mt-2 -mr-2 p-2 ${theme === "dark" ? "text-muted-light hover:text-light" : "text-muted-dark hover:text-dark"}`}
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>
              <p
                className={`text-sm sm:text-base leading-relaxed mb-6 ${theme === "dark" ? "text-muted-light" : "text-muted-dark"} ${workSans.className}`}
              >
                {selectedProject.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${theme === "dark" ? "bg-dark-soft text-muted-light" : "bg-light-soft text-muted-dark border border-dark"} ${jetbrainsMono.className}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-lg bg-accent-primary text-white hover-accent-primary transition-smooth ${poppins.className}`}
                  >
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                )}
                {selectedProject.announcement && (
                  <a
                    href={selectedProject.announcement}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-lg border transition-smooth ${theme === "dark" ? "border-light text-muted-light hover-bg-light" : "border-dark text-muted-dark hover-bg-dark"} ${poppins.className}`}
                  >
                    <Link size={18} />
                    <span>Announcement</span>
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
