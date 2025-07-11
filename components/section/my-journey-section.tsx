"use client";
import { useState } from "react";
import { Calendar, Code, Trophy, GraduationCap, Rocket, ChevronDown, ChevronUp } from "lucide-react";
import { spaceGrotesk, firaSans, poppins, ibmPlexSans } from "@/app/fonts";

interface ProgrammingJourneySectionProps {
  theme: string;
}

export default function ProgrammingJourneySection({ theme }: ProgrammingJourneySectionProps) {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const togglePhase = (phaseId: string) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  const journeyPhases = [
    {
      id: "early-sparks",
      icon: Rocket,
      title: "Early Sparks",
      period: "2019 – 2020",
      subtitle: "The Beginning of My Tech Journey",
      description: "My curiosity for computers started back in school. In 2019 (Class 10), I self-learned Python syntax and dabbled in HTML & CSS basics.",
      highlights: [
        "Self-learned Python syntax in Class 10",
        "Built small static websites with HTML & CSS",
        "Solved simple problems in Python",
        "Chose Commerce in 11th-12th due to Economics fascination",
        "Consistently explored coding during lockdown through Jupyter Notebook"
      ],
      technologies: ["Python", "HTML", "CSS", "Jupyter Notebook"],
      color: "from-blue-500 to-purple-500"
    },
    {
      id: "self-learning",
      icon: Code,
      title: "Self-Learning Phase",
      period: "2021 – mid-2022",
      subtitle: "Building Foundation & First Real Projects",
      description: "Before starting college, I dove deep into web development, building responsive websites and exploring full-stack technologies.",
      highlights: [
        "Built responsive websites using HTML, CSS, and JavaScript",
        "Learned React.js and built Weather App & News Application",
        "Explored Node.js, Express.js, and MongoDB",
        "Gained understanding of REST APIs",
        "Created first full-stack applications"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
      color: "from-green-500 to-teal-500"
    },
    {
      id: "year-1",
      icon: GraduationCap,
      title: "College Begins & CS Fundamentals",
      period: "Autumn 2022 – Spring 2023",
      subtitle: "College Begins & CS Fundamentals",
      description: "Started my formal Computer Science education while building several React.js projects and learning core CS concepts.",
      highlights: [
        "Built several React.js projects",
        "Started learning Computer Science fundamentals",
        "Explored Full Stack development basics",
        "Improved understanding of databases and backend systems",
        "Established strong foundation in web development"
      ],
      technologies: ["React.js", "JavaScript", "Database Systems", "Backend Development"],
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: "year-2",
      icon: Code,
      title: "Deep Dive into CS & MERN Mastery",
      period: "Autumn 2023 – Spring 2024",
      subtitle: "Deep Dive into CS & MERN Mastery",
      description: "Focused heavily on core Computer Science concepts while becoming proficient with the MERN stack and building production-ready applications.",
      highlights: [
        "Mastered Data Structures & Algorithms",
        "Studied Operating Systems and DBMS in depth",
        "Became proficient with the MERN stack",
        "Built production-ready full-stack projects",
        "Solidified full-stack development skills"
      ],
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Data Structures", "Algorithms", "Operating Systems", "DBMS"],
      color: "from-pink-500 to-red-500"
    },
    {
      id: "year-3",
      icon: Trophy,
      title: "Blockchain Revolution & Advanced Technologies",
      period: "Autumn 2024 – Spring 2025",
      subtitle: "Blockchain Revolution & Advanced Technologies",
      description: "Entered the blockchain space, won multiple hackathons, and expanded into cutting-edge technologies including Rust and Solana development.",
      highlights: [
        "🏆 Won a hackathon at the start of 3rd year",
        "Entered blockchain space with Solidity and smart contracts",
        "Learned Java and built blockchain CRUD applications",
        "Explored NFTs and deployed ERC20-based projects",
        "Expanded tech stack with Docker, Shell Scripting, and UNIX",
        "🏆 Won another hackathon at the end of 5th semester",
        "Final semester focused on Rust and Solana smart contract development",
        "🏆 Won 5 more hackathons in 6th semester"
      ],
      technologies: ["Solidity", "Java", "Smart Contracts", "NFTs", "ERC20", "Docker", "Shell Scripting", "UNIX", "Rust", "Solana"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      id: "present",
      icon: Rocket,
      title: "Present",
      period: "2025",
      subtitle: "Still Curious. Still Building.",
      description: "Completed BCA and currently sharpening skills in advanced blockchain development and scalable applications.",
      highlights: [
        "Completed BCA degree (2022-2025)",
        "Mastering Solana smart contract development",
        "Advanced Rust programming skills",
        "Building scalable full-stack applications",
        "Continuously learning and adapting to new technologies"
      ],
      technologies: ["Rust", "Solana", "Advanced Blockchain", "Full-Stack Development", "Smart Contracts"],
      color: "from-emerald-500 to-cyan-500"
    }
  ];

  return (
    <section
      id="journey"
      className={`py-20 px-6 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-950" : "bg-white"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`${spaceGrotesk.className} text-3xl md:text-4xl font-bold mb-6 transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            ✨ My Programming Journey
          </h2>
          <div className="w-20 h-0.5 bg-pink-600 mx-auto mb-4" />
          <p
            className={`${firaSans.className} text-lg max-w-2xl mx-auto transition-colors duration-300 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            From curious schoolboy to blockchain developer - here's how my passion for technology evolved
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-8 top-0 bottom-0 w-0.5 transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-300"
          }`} />

          <div className="space-y-8">
            {journeyPhases.map((phase, index) => {
              const Icon = phase.icon;
              const isExpanded = expandedPhase === phase.id;
              
              return (
                <div key={phase.id} className="relative">
                  {/* Timeline dot */}
                  <div className={`absolute left-6 w-4 h-4 rounded-full border-4 transition-colors duration-300 ${
                    theme === "dark" ? "bg-gray-950 border-pink-600" : "bg-white border-pink-600"
                  }`} />
                  
                  {/* Content card */}
                  <div className="ml-20">
                    <div
                      className={`rounded-xl border shadow-sm transition-all duration-300 overflow-hidden ${
                        theme === "dark"
                          ? "bg-gray-900 border-gray-700 hover:shadow-lg"
                          : "bg-white border-gray-200 hover:shadow-lg"
                      }`}
                    >
                      {/* Header */}
                      <div
                        className={`p-6 cursor-pointer transition-all duration-300 ${
                          isExpanded ? "pb-4" : ""
                        }`}
                        onClick={() => togglePhase(phase.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-full bg-gradient-to-r ${phase.color}`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3
                                className={`${poppins.className} text-xl font-semibold transition-colors duration-300 ${
                                  theme === "dark" ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {phase.title}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Calendar className="w-4 h-4 text-pink-600" />
                                <span
                                  className={`${ibmPlexSans.className} text-sm font-medium text-pink-600`}
                                >
                                  {phase.period}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`${firaSans.className} text-sm transition-colors duration-300 ${
                                theme === "dark" ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {isExpanded ? "Less" : "More"}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-pink-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-pink-600" />
                            )}
                          </div>
                        </div>
                        
                        <p
                          className={`${firaSans.className} mt-3 leading-relaxed transition-colors duration-300 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {phase.description}
                        </p>
                      </div>

                      {/* Expanded content */}
                      {isExpanded && (
                        <div className="px-6 pb-6 space-y-4">
                          {/* Highlights */}
                          <div>
                            <h4
                              className={`${poppins.className} font-semibold mb-3 transition-colors duration-300 ${
                                theme === "dark" ? "text-white" : "text-gray-900"
                              }`}
                            >
                              Key Highlights
                            </h4>
                            <ul className="space-y-2">
                              {phase.highlights.map((highlight, idx) => (
                                <li
                                  key={idx}
                                  className={`${firaSans.className} flex items-start transition-colors duration-300 ${
                                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                                  }`}
                                >
                                  <span className="w-2 h-2 bg-pink-600 rounded-full mr-3 mt-2 flex-shrink-0" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies */}
                          <div>
                            <h4
                              className={`${poppins.className} font-semibold mb-3 transition-colors duration-300 ${
                                theme === "dark" ? "text-white" : "text-gray-900"
                              }`}
                            >
                              Technologies Learned
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {phase.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className={`px-3 py-1 rounded-full text-sm font-medium ${ibmPlexSans.className} transition-colors duration-300 ${
                                    theme === "dark"
                                      ? "bg-gray-800 text-gray-300 border border-gray-700"
                                      : "bg-gray-100 text-gray-700 border border-gray-200"
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
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Years of Coding", value: "3+" },
            { label: "Technologies Learned", value: "25+" },
            { label: "Projects Built", value: "20+" },
            { label: "Hackathons Won", value: "7" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`text-center p-6 rounded-xl border transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-900 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div
                className={`text-2xl font-bold mb-2 ${spaceGrotesk.className} text-pink-600`}
              >
                {stat.value}
              </div>
              <div
                className={`text-sm ${firaSans.className} transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
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