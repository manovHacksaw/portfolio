"use client";

import { spaceGrotesk, firaSans, poppins, ibmPlexSans } from "@/app/fonts";

interface AboutSectionProps {
  theme: string;
}

export default function AboutSection({ theme }: AboutSectionProps) {
  return (
    <section
      id="about"
      className={`py-20 px-6 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`${spaceGrotesk.className} text-3xl md:text-4xl font-bold mb-6 transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            About Me
          </h2>
          <div className="w-20 h-0.5 bg-pink-500 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p
              className={`${firaSans.className} leading-relaxed transition-colors duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              I'm a passionate developer who discovered my love for technology during school in 2019. 
              What started as curiosity about computers has evolved into a deep fascination with building 
              meaningful digital experiences and exploring cutting-edge technologies.
            </p>
            <p
              className={`${firaSans.className} leading-relaxed transition-colors duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Recently completed my BCA (2022-2025), where I strengthened my foundation in Computer Science 
              while diving deep into full-stack development. My journey has taken me from building simple 
              websites to developing complex blockchain applications and smart contracts.
            </p>
            <p
              className={`${firaSans.className} leading-relaxed transition-colors duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Currently focused on mastering Solana smart contract development and Rust programming, 
              while maintaining expertise in the MERN stack. I believe in continuous learning and 
              staying at the forefront of technological innovation.
            </p>
          </div>

          <div className="space-y-8">
            <div
              className={`rounded-xl p-6 border shadow-sm transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-950 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`${poppins.className} text-lg font-semibold mb-4 transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Core Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript",
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "MongoDB",
                  "Tailwind CSS",
                  "Python",
                ].map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${ibmPlexSans.className} transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-pink-900/30 text-pink-300 border border-pink-700/50"
                        : "bg-pink-100 text-pink-800"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`rounded-xl p-6 border shadow-sm transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-950 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`${poppins.className} text-lg font-semibold mb-4 transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Blockchain & Emerging Tech
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Rust",
                  "Solana",
                  "Solidity",
                  "Smart Contracts",
                  "Web3",
                  "Docker",
                  "Shell Scripting",
                  "UNIX",
                ].map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${ibmPlexSans.className} transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-purple-900/30 text-purple-300 border border-purple-700/50"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`rounded-xl p-6 border shadow-sm transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-950 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`${poppins.className} text-lg font-semibold mb-4 transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Current Focus
              </h3>
              <ul
                className={`${firaSans.className} space-y-2 transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3" />
                  Advanced Rust Programming
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3" />
                  Solana Smart Contract Development
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3" />
                  Scalable Full-Stack Applications
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}