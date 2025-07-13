"use client";
import { spaceGrotesk, firaSans, poppins, ibmPlexSans } from "@/app/fonts";

interface AboutSectionProps {
  theme: string;
}

export default function AboutSection({ theme }: AboutSectionProps) {
  return (
    <section
      id="about"
      className={`py-14 px-6 transition-colors duration-300 ${theme === "dark" ? "bg-[#0D0D0D]" : "bg-[#FAFAFA]"}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-left mb-12 sm:mb-16">
          <h2
            className={`${spaceGrotesk.className} text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 transition-smooth ${
              theme === "dark" ? "text-light" : "text-dark"
            }`}
          >
            About Me
          </h2>
          <div className="divider-accent" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-6">
            <p
              className={`${firaSans.className} text-sm lg:text-md sm:text-lg leading-relaxed transition-smooth ${
                theme === "dark" ? "text-muted-light" : "text-muted-dark"
              }`}
            >
              I'm a passionate developer whose journey with technology began
              back in school around 2019. What started as a simple curiosity
              about computers soon became a lifelong pursuit of creating
              meaningful digital experiences and staying curious about how
              technology shapes the world and connects people across borders.
            </p>

            <p
              className={`${firaSans.className} text-base lg:text-md sm:text-lg leading-relaxed transition-smooth ${
                theme === "dark" ? "text-muted-light" : "text-muted-dark"
              }`}
            >
              I recently completed my Bachelor of Computer Applications (BCA
              2022-2025), where I strengthened my foundation in Computer Science
              while diving deep into full-stack development. My journey has
              taken me from building simple websites to developing complex
              blockchain applications and smart contracts. I've always balanced
              academic rigor with the thrill of creating fast, real-world
              projects, a mindset I'm eager to bring to global opportunities as
              I aim to expand my horizons.
            </p>

            <p
              className={`${firaSans.className} text-base lg:text-md sm:text-lg leading-relaxed transition-smooth ${
                theme === "dark" ? "text-muted-light" : "text-muted-dark"
              }`}
            >
              Currently, I'm deeply focused on mastering Solana smart contract
              development and Rust programming, while maintaining expertise in
              the MERN stack. I'm also actively exploring the fascinating world
              of AI and its applications across different domains, always
              believing in continuous learning and staying at the forefront of
              technological innovation as I seek out new challenges, meaningful
              collaborations, and impactful work experiences that broaden my
              global perspective.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div
              className={`rounded-xl p-4 sm:p-6 border transition-smooth ${
                theme === "dark"
                  ? "card-dark shadow-dark"
                  : "card-light shadow-light"
              }`}
            >
              <h3
                className={`${poppins.className} text-lg font-semibold mb-4 transition-smooth ${
                  theme === "dark" ? "text-light" : "text-dark"
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
                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${ibmPlexSans.className} transition-smooth ${
                      theme === "dark"
                        ? "bg-dark-soft text-muted-light border-light"
                        : "bg-pink-50 text-pink-700 border border-pink-200"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`rounded-xl p-4 sm:p-6 border transition-smooth ${
                theme === "dark"
                  ? "card-dark shadow-dark"
                  : "card-light shadow-light"
              }`}
            >
              <h3
                className={`${poppins.className} text-lg font-semibold mb-4 transition-smooth ${
                  theme === "dark" ? "text-light" : "text-dark"
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
                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${ibmPlexSans.className} transition-smooth ${
                      theme === "dark"
                        ? "bg-dark-soft text-muted-light border-light"
                        : "bg-purple-50 text-purple-700 border border-purple-200"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`rounded-xl p-4 sm:p-6 border transition-smooth ${
                theme === "dark"
                  ? "card-dark shadow-dark"
                  : "card-light shadow-light"
              }`}
            >
              <h3
                className={`${poppins.className} text-lg font-semibold mb-4 transition-smooth ${
                  theme === "dark" ? "text-light" : "text-dark"
                }`}
              >
                Current Focus
              </h3>
              <ul
                className={`${firaSans.className} space-y-3 transition-smooth ${
                  theme === "dark" ? "text-muted-light" : "text-muted-dark"
                }`}
              >
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent-primary rounded-full mr-3 flex-shrink-0" />
                  Advanced Rust Programming
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent-primary rounded-full mr-3 flex-shrink-0" />
                  Solana Smart Contract Development
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent-primary rounded-full mr-3 flex-shrink-0" />
                  Scalable Full-Stack Applications
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent-primary rounded-full mr-3 flex-shrink-0" />
                  Exploring AI & Machine Learning
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
