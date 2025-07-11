'use client';

import { poppins, rubik } from "@/app/fonts";

interface AboutSectionProps {
  theme: string;
}

export default function AboutSection({ theme }: AboutSectionProps) {
  return (
    <section id="about" className={`py-20 px-6 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`font-poppins text-3xl md:text-4xl font-bold mb-6 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            About Me
          </h2>
          <div className="w-20 h-0.5 bg-pink-600 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className={`${rubik.className} leading-relaxed transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              I'm a passionate developer who finds beauty in clean code and
              elegant solutions. My journey in technology is driven by curiosity
              and a desire to build meaningful experiences that make a
              difference.
            </p>
            <p className={`font-fira-sans leading-relaxed transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Currently exploring the fascinating world of blockchain technology,
              particularly Solana development, while maintaining a strong
              foundation in full-stack web development.
            </p>
            <p className={`font-fira-sans leading-relaxed transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              I believe in continuous learning and staying updated with the
              latest technologies to create impactful solutions.
            </p>
          </div>

          <div className="space-y-8">
            <div className={`rounded-xl p-6 border shadow-sm transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-950 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`font-poppins text-lg font-semibold mb-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Technologies I Love
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'React',
                  'Next.js',
                  'TypeScript',
                  'Node.js',
                  'Tailwind CSS',
                  'Solana',
                  'Web3',
                  'JavaScript',
                ].map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                      theme === 'dark'
                        ? 'bg-pink-900/30 text-pink-300 border border-pink-700/50'
                        : 'bg-pink-100 text-pink-800'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className={`rounded-xl p-6 border shadow-sm transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-950 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`font-poppins text-lg font-semibold mb-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Current Focus
              </h3>
              <ul className={`font-fira-sans space-y-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-600 rounded-full mr-3" />
                  Solana Development
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-600 rounded-full mr-3" />
                  Web3 Integration
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-600 rounded-full mr-3" />
                  Full-Stack Development
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}