"use client";

import { useState } from "react";
import {
  Calendar,
  Code,
  Trophy,
  GraduationCap,
  Rocket,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { firaSans, ibmPlexSans, poppins, spaceGrotesk } from "@/app/fonts";

interface SectionProps {
  theme: string;
}

// Programming Journey Section
export default function ProgrammingJourneySection({ theme }: SectionProps) {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const togglePhase = (phaseId: string) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  const journeyPhases = [
    {
      id: "early-sparks",
      icon: Rocket,
      title: "The Spark: A Curious Beginning",
      period: "2019 – 2020",
      description:
        "It all started with a simple question: 'How do computers *really* work?' In high school, I dove headfirst into Python and web basics, fueled by pure curiosity and the thrill of making something from nothing.",
      highlights: [
        "Ignited my passion by self-learning Python in 10th grade",
        "Brought my first digital ideas to life with simple HTML & CSS",
        "Discovered the joy of problem-solving through code",
        "Balanced my fascination for tech with a formal education in Commerce",
        "Turned lockdown into an opportunity, spending hours in Jupyter Notebook",
      ],
      technologies: ["Python", "HTML", "CSS", "Jupyter Notebook"],
      color: "from-blue-500 to-purple-500",
    },
    {
      id: "self-learning",
      icon: Code,
      title: "The Forge: Full-Stack Foundations",
      period: "2021 – mid-2022",
      description:
        "The year before college became my personal bootcamp. I devoured everything I could about web development, transforming myself from a hobbyist into a builder, ready to tackle real-world challenges.",
      highlights: [
        "Engineered my first full-stack MERN applications from scratch",
        "Mastered React.js by building dynamic, data-driven apps",
        "Understood the power of APIs to connect the digital world",
        "Learned to sculpt data with Node.js, Express, and MongoDB",
        "Graduated from static pages to building interactive web experiences",
      ],
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST APIs",
      ],
      color: "from-green-500 to-teal-500",
    },
    {
      id: "year-1",
      icon: GraduationCap,
      title: "Bridging Theory & Practice",
      period: "Autumn 2022 – Spring 2023",
      description:
        "College wasn't just about lectures; it was about connecting the dots. I merged formal CS fundamentals with my hands-on experience, building more robust projects and solidifying my understanding of software architecture.",
      highlights: [
        "Applied academic CS concepts to real-world React projects",
        "Developed a deeper appreciation for clean code and system design",
        "Strengthened my grasp of databases and backend architecture",
        "Built a rock-solid foundation for future, more complex challenges",
      ],
      technologies: [
        "React.js",
        "JavaScript",
        "Database Systems",
        "Backend Development",
      ],
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "year-2",
      icon: Code,
      title: "Mastering the Craft",
      period: "Autumn 2023 – Spring 2024",
      description:
        "This was the year of mastery. I went deep on the hard stuff—Data Structures, Algorithms, OS—while sharpening my MERN stack skills to build production-grade applications that were scalable, efficient, and powerful.",
      highlights: [
        "Conquered complex Data Structures & Algorithms",
        "Gained proficiency in the full MERN stack for production environments",
        "Studied the inner workings of Operating Systems and DBMS",
        "Transitioned from building projects to engineering solutions",
      ],
      technologies: [
        "MongoDB",
        "Express.js",
        "React.js",
        "Node.js",
        "Data Structures",
        "Algorithms",
        "Operating Systems",
        "DBMS",
      ],
      color: "from-pink-500 to-red-500",
    },
    {
      id: "year-3",
      icon: Trophy,
      title: "The Leap: Blockchain & Hackathon Triumphs",
      period: "Autumn 2024 – Spring 2025",
      description:
        "This is where everything accelerated. I plunged into the decentralized world of blockchain, a new frontier of innovation. The high-stakes, high-energy world of hackathons became my arena, pushing my limits and proving my skills.",
      highlights: [
        "🏆 **7x Hackathon Winner:** Conquered multiple hackathons, validating my skills in high-pressure environments and fueling my competitive spirit.",
        "Pioneered my journey into Web3 with Solidity and smart contracts",
        "Engineered blockchain applications with Java",
        "Explored the world of NFTs and deployed my own ERC20 projects",
        "Ventured into low-level systems with Rust and Solana development",
      ],
      technologies: [
        "Solidity",
        "Java",
        "Smart Contracts",
        "NFTs",
        "ERC20",
        "Docker",
        "Shell Scripting",
        "UNIX",
        "Rust",
        "Solana",
      ],
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: "present",
      icon: Rocket,
      title: "The Horizon: Still Curious, Still Building",
      period: "2025 – Beyond",
      description:
        "With my degree in hand, my mission is clearer than ever: to build decentralized systems that are scalable, secure, and impactful. The learning never stops, and I'm hungrier than ever to tackle the next big challenge.",
      highlights: [
        "Graduated with a rich portfolio of experience (BCA 2022-2025)",
        "Deeply focused on mastering Rust for high-performance systems",
        "Building next-generation dApps on the Solana ecosystem",
        "Continuously exploring emerging tech and pushing my own boundaries",
      ],
      technologies: [
        "Rust",
        "Solana",
        "Advanced Blockchain",
        "Full-Stack Development",
        "Smart Contracts",
      ],
      color: "from-emerald-500 to-cyan-500",
    },
  ];

  return (
    <section
      id="journey"
      className={`py-12 sm:py-16 lg:py-20 px-4 sm:px-6 transition-smooth ${
        theme === "dark" ? "bg-dark" : "bg-light"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className={`${spaceGrotesk.className} text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 transition-smooth ${
              theme === "dark" ? "text-light" : "text-dark"
            }`}
          >
            How I Learned to Code
          </h2>
          <div className="divider-accent mx-auto mb-3 sm:mb-4" />
          <p
            className={`${firaSans.className} text-base sm:text-lg max-w-2xl mx-auto px-4 transition-smooth ${
              theme === "dark" ? "text-muted-light" : "text-muted-dark"
            }`}
          >
            From a spark of curiosity to a passion for building the future. This
            is my developer origin story.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line - hidden on mobile, visible on sm and up */}
          <div
            className={`absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 transition-smooth hidden sm:block ${
              theme === "dark" ? "border-light" : "border-dark"
            }`}
          />

          <div className="space-y-6 sm:space-y-8">
            {journeyPhases.map((phase) => {
              const Icon = phase.icon;
              const isExpanded = expandedPhase === phase.id;

              return (
                <div key={phase.id} className="relative">
                  {/* Timeline dot - hidden on mobile, visible on sm and up */}
                  <div
                    className={`absolute left-4 sm:left-6 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-3 sm:border-4 transition-smooth hidden sm:block ${
                      theme === "dark"
                        ? "bg-dark border-accent-primary"
                        : "bg-light border-accent-primary"
                    }`}
                  />

                  {/* Content card */}
                  <div className="sm:ml-16 lg:ml-20">
                    <div
                      className={`rounded-xl border overflow-hidden transition-smooth ${
                        theme === "dark"
                          ? "card-dark shadow-dark"
                          : "card-light shadow-light"
                      }`}
                    >
                      {/* Header */}
                      <div
                        className={`p-4 sm:p-6 cursor-pointer transition-smooth ${
                          isExpanded ? "pb-3 sm:pb-4" : ""
                        }`}
                        onClick={() => togglePhase(phase.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                            <div
                              className={`p-2 sm:p-3 rounded-full bg-gradient-to-r ${phase.color} flex-shrink-0`}
                            >
                              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3
                                className={`${poppins.className} text-lg sm:text-xl font-semibold transition-smooth ${
                                  theme === "dark" ? "text-light" : "text-dark"
                                } line-clamp-2 sm:line-clamp-none`}
                              >
                                {phase.title}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 accent-primary flex-shrink-0" />
                                <span
                                  className={`${ibmPlexSans.className} text-xs sm:text-sm font-medium accent-primary truncate`}
                                >
                                  {phase.period}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                            <span
                              className={`${firaSans.className} text-xs sm:text-sm transition-smooth hidden sm:inline ${
                                theme === "dark"
                                  ? "text-muted-light"
                                  : "text-muted-dark"
                              }`}
                            >
                              {isExpanded ? "Less" : "More"}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 accent-primary" />
                            ) : (
                              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 accent-primary" />
                            )}
                          </div>
                        </div>

                        <p
                          className={`${firaSans.className} mt-3 leading-relaxed transition-smooth text-sm sm:text-base ${
                            theme === "dark"
                              ? "text-muted-light"
                              : "text-muted-dark"
                          }`}
                        >
                          {phase.description}
                        </p>
                      </div>

                      {/* Expanded content */}
                      {isExpanded && (
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4">
                          {/* Highlights */}
                          <div>
                            <h4
                              className={`${poppins.className} font-semibold mb-3 transition-smooth text-sm sm:text-base ${
                                theme === "dark" ? "text-light" : "text-dark"
                              }`}
                            >
                              Key Moments
                            </h4>
                            <ul className="space-y-2">
                              {phase.highlights.map((highlight, idx) => (
                                <li
                                  key={idx}
                                  className={`${firaSans.className} flex items-start transition-smooth text-sm sm:text-base ${
                                    theme === "dark"
                                      ? "text-muted-light"
                                      : "text-muted-dark"
                                  }`}
                                >
                                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-primary rounded-full mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0" />
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: highlight,
                                    }}
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies */}
                          <div>
                            <h4
                              className={`${poppins.className} font-semibold mb-3 transition-smooth text-sm sm:text-base ${
                                theme === "dark" ? "text-light" : "text-dark"
                              }`}
                            >
                              Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {phase.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${ibmPlexSans.className} transition-smooth ${
                                    theme === "dark"
                                      ? "bg-dark-soft text-muted-light border-light"
                                      : "bg-light-soft text-muted-dark border-dark"
                                  }`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: "Years of Coding", value: "3+" },
            { label: "Technologies Mastered", value: "25+" },
            { label: "Projects Shipped", value: "10+" },
            { label: "Hackathons Won", value: "7" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`text-center p-4 sm:p-6 rounded-xl border transition-smooth ${
                theme === "dark"
                  ? "card-dark shadow-dark"
                  : "card-light shadow-light"
              }`}
            >
              <div
                className={`text-xl sm:text-2xl font-bold mb-2 ${spaceGrotesk.className} accent-primary`}
              >
                {stat.value}
              </div>
              <div
                className={`text-xs sm:text-sm ${firaSans.className} transition-smooth ${
                  theme === "dark" ? "text-muted-light" : "text-muted-dark"
                }`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
