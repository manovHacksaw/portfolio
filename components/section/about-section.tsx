"use client"
import { spaceGrotesk, firaSans, poppins, ibmPlexSans } from "@/app/fonts"

interface AboutSectionProps {
  theme: string
}

export default function AboutSection({ theme }: AboutSectionProps) {
  return (
    <section
      id="about"
      className={`py-20 px-6 transition-colors duration-300 ${theme === "dark" ? "bg-[#0D0D0D]" : "bg-[#FAFAFA]"}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-left mb-16">
          <h2
            className={`${spaceGrotesk.className} text-3xl md:text-4xl font-bold mb-6 transition-colors duration-300 ${
              theme === "dark" ? "text-[#EDEDED]" : "text-[#222222]"
            }`}
          >
            About Me
          </h2>
          <div className="w-20 h-0.5 bg-pink-500 " />
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p
              className={`${firaSans.className} text-justify leading-relaxed transition-colors duration-300 ${
                theme === "dark" ? "text-[#CCCCCC]" : "text-[#333333]"
              }`}
            >
             I'm a passionate developer whose journey with technology began back in school around 2019. What started as a simple curiosity about computers soon became a lifelong pursuit of creating meaningful digital experiences and staying curious about how technology shapes the world and connects people across borders.
            </p>
            <p
              className={`${firaSans.className} text-justify leading-relaxed transition-colors duration-300 ${
                theme === "dark" ? "text-[#CCCCCC]" : "text-[#333333]"
              }`}
            >
            I recently completed my Bachelor of Computer Applications (BCA 2022-2025), where I strengthened my foundation in Computer Science while diving deep into full-stack development. My journey has taken me from building simple websites to developing complex blockchain applications and smart contracts. I've always balanced academic rigor with the thrill of creating fast, real-world projects, a mindset I'm eager to bring to global opportunities as I aim to expand my horizons.
            </p>
            <p
              className={`${firaSans.className} text-justify leading-relaxed transition-colors duration-300 ${
                theme === "dark" ? "text-[#CCCCCC]" : "text-[#333333]"
              }`}
            >
             Currently, I'm deeply focused on mastering Solana smart contract development and Rust programming, while maintaining expertise in the MERN stack. I'm also actively exploring the fascinating world of AI and its applications across different domains, always believing in continuous learning and staying at the forefront of technological innovation as I seek out new challenges, meaningful collaborations, and impactful work experiences that broaden my global perspective.









            </p>
          </div>
          <div className="space-y-9">
            <div
              className={`rounded-xl p-6 border shadow-sm transition-colors duration-300 ${
                theme === "dark" ? "bg-[#1A1A1A] border-[#2A2A2A]" : "bg-[#FFFFFF] border-[#E0E0E0]"
              }`}
            >
              <h3
                className={`${poppins.className} text-lg font-semibold mb-4 transition-colors duration-300 ${
                  theme === "dark" ? "text-[#EDEDED]" : "text-[#222222]"
                }`}
              >
                Core Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {["JavaScript", "React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Python"].map(
                  (tech) => (
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
                  ),
                )}
              </div>
            </div>
            <div
              className={`rounded-xl p-6 border shadow-sm transition-colors duration-300 ${
                theme === "dark" ? "bg-[#1A1A1A] border-[#2A2A2A]" : "bg-[#FFFFFF] border-[#E0E0E0]"
              }`}
            >
              <h3
                className={`${poppins.className} text-lg font-semibold mb-4 transition-colors duration-300 ${
                  theme === "dark" ? "text-[#EDEDED]" : "text-[#222222]"
                }`}
              >
                Blockchain & Emerging Tech
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Rust", "Solana", "Solidity", "Smart Contracts", "Web3", "Docker", "Shell Scripting", "UNIX"].map(
                  (tech) => (
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
                  ),
                )}
              </div>
            </div>
            <div
              className={`rounded-xl p-6 border shadow-sm transition-colors duration-300 ${
                theme === "dark" ? "bg-[#1A1A1A] border-[#2A2A2A]" : "bg-[#FFFFFF] border-[#E0E0E0]"
              }`}
            >
              <h3
                className={`${poppins.className} text-lg font-semibold mb-4 transition-colors duration-300 ${
                  theme === "dark" ? "text-[#EDEDED]" : "text-[#222222]"
                }`}
              >
                Current Focus
              </h3>
              <ul
                className={`${firaSans.className} space-y-2 transition-colors duration-300 ${
                  theme === "dark" ? "text-[#CCCCCC]" : "text-[#333333]"
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
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3" />
                  Exploring AI & Machine Learning
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
