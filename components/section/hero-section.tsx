"use client";

import {
  ExternalLink,
  Download,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useItemSwitcher } from "@/hooks/use-item-switcher";
import {
  spaceGrotesk,
  firaSans,
  ibmPlexSans,
  rubik,
} from "@/app/fonts";

interface HeroSectionProps {
  theme: string;
}

export default function HeroSection({ theme }: HeroSectionProps) {
  const greetings = [
    "Hello", "Hola", "Bonjour", "こんにちは", "안녕하세요", "你好", 
    "Guten Tag", "नमस्ते", "নমস্কার", "Olá", "Привет", "Halo",
  ];

  const greetingIndex = useItemSwitcher(greetings.length, 3000);

  const typewriterText = useTypewriter(
    [
      "learning Solana Development.",
      "debugging life, stacking wins on chain.",
      "building to solve real-life problems.",
    ],
    100
  );

  const skills = [
    { name: "JavaScript", light: "bg-yellow-100 text-yellow-800", dark: "bg-yellow-900/30 text-yellow-300 border border-yellow-700/50" },
    { name: "React", light: "bg-sky-100 text-sky-800", dark: "bg-sky-900/30 text-sky-300 border border-sky-700/50" },
    { name: "Next.js", light: "bg-gray-200 text-gray-800", dark: "bg-gray-800 text-white border border-gray-600" },
    { name: "TypeScript", light: "bg-blue-100 text-blue-800", dark: "bg-blue-900/30 text-blue-300 border border-blue-700/50" },
    { name: "Node.js", light: "bg-green-100 text-green-800", dark: "bg-green-900/30 text-green-300 border border-green-700/50" },
    { name: "Tailwind CSS", light: "bg-cyan-100 text-cyan-800", dark: "bg-cyan-900/30 text-cyan-300 border border-cyan-700/50" },
    { name: "Solana", light: "bg-purple-100 text-purple-800", dark: "bg-purple-900/30 text-purple-300 border border-purple-700/50" },
    { name: "Web3", light: "bg-orange-100 text-orange-800", dark: "bg-orange-900/30 text-orange-300 border border-orange-700/50" },
  ];

  return (
    <section
      id="hero"
      className={`min-h-screen flex items-center justify-start px-6 md:px-8 lg:px-20 pt-40 pb-20 transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
  
      <div className="max-w-6xl mx-auto w-full text-left">
        <div className="mb-6">
          <h1
            className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${spaceGrotesk.className} transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={greetingIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="inline-block pb-8"
              >
                {greetings[greetingIndex]}
              </motion.span>
            </AnimatePresence>
            <br />
            I'm <span className={`text-pink-400 ${rubik.className}`}>Manobendra Mandal</span>
          </h1>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-start">
            <h2 className={`text-xl md:text-2xl lg:text-3xl font-mono transition-colors duration-300 italic ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              "{typewriterText}"
            </h2>
            <div className={`w-0.5 h-8 md:h-9 lg:h-10 ml-2 animate-pulse transition-colors duration-300 ${
                theme === "dark" ? "bg-white" : "bg-gray-900"
              }`}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <p
            className={`text-lg md:text-xl max-w-3xl leading-relaxed ${firaSans.className} transition-colors duration-300 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Builder exploring the intersection of Blockchain and AI. Hackathon
            hunter, curious learner, and someone who balanced academic focus
            with the thrill of creating fast, real-world projects. Now on a
            path to take this mindset and craft to global opportunities.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-3 max-w-4xl justify-start">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  ibmPlexSans.className
                } transition-all duration-300 ${
                  theme === "dark" ? skill.dark : skill.light
                }`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className={`inline-flex items-center px-4 py-2 rounded-full border transition-colors duration-300 ${
              theme === "dark"
                ? "border-gray-800 bg-gray-900"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <span
              className={`${firaSans.className} text-sm font-medium transition-colors duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Looking for opportunities
            </span>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-start">
            {/* 1. Primary Button: Updated with a soothing sky blue palette */}
            <a
              href="#projects"
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium ${rubik.className} transition-all duration-300 focus:outline-none focus:ring-4 ${
                theme === 'dark'
                  ? 'bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-500/50'
                  : 'bg-pink-400 text-white hover:bg-pink-400 focus:ring-pink-300'
              }`}
            >
              <span>View Projects</span>
              <ExternalLink size={16} />
            </a>
            {/* 2. Secondary Button: Updated to an outline style that complements the primary button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium ${rubik.className} border transition-all duration-300 focus:outline-none focus:ring-4 ${
                theme === 'dark'
                  ? 'border-pink-400 text-pink-400 hover:bg-pink-600/10 focus:ring-pink-500/50'
                  : 'border-pink-600 text-pink-700 hover:bg-sky-50 focus:ring-pink-300'
              }`}
            >
              <span>Resume</span>
              <Download size={16} />
            </a>
          </div>
        </div>

        <div>
          <div className="flex space-x-5 justify-start">
            <a href="https://github.com/manobendra" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${ theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`} aria-label="GitHub Profile">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/manobendra" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${ theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`} aria-label="LinkedIn Profile">
              <Linkedin size={24} />
            </a>
            <a href="https://twitter.com/manobendra" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${ theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`} aria-label="Twitter Profile">
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}