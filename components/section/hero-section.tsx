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

  // Refined skill color palettes for better contrast and harmony
  const skills = [
    {
      name: "MERN",
      light: "bg-emerald-100 text-emerald-800",
      dark: "bg-emerald-950/60 text-emerald-300 border border-emerald-800",
    },
    {
      name: "Next.js",
      light: "bg-slate-200 text-slate-800",
      dark: "bg-slate-800/80 text-slate-200 border border-slate-700",
    },
    {
      name: "Rust",
      light: "bg-orange-100 text-orange-800",
      dark: "bg-orange-950/60 text-orange-300 border border-orange-800",
    },
    {
      name: "TypeScript",
      light: "bg-blue-100 text-blue-800",
      dark: "bg-blue-950/60 text-blue-300 border border-blue-800",
    },
    {
      name: "Node.js",
      light: "bg-green-100 text-green-800",
      dark: "bg-green-950/60 text-green-300 border border-green-800",
    },
    {
      name: "Solidity",
      light: "bg-teal-100 text-teal-800",
      dark: "bg-teal-950/60 text-teal-300 border border-teal-800",
    },
    {
      name: "Solana",
      light: "bg-purple-100 text-purple-800",
      dark: "bg-purple-950/60 text-purple-300 border border-purple-800",
    },
    {
      name: "Web3",
      light: "bg-indigo-100 text-indigo-800",
      dark: "bg-indigo-950/60 text-indigo-300 border border-indigo-800",
    },
  ];

  return (
    <section
      id="hero"
      // Refined Color: Using slate for softer backgrounds
      className={`min-h-screen mx-auto flex items-center justify-start md:px-8 lg:px-40 pt-40 pb-20 transition-colors duration-300 ${
        theme === "dark" ? "bg-dark" : "bg-slate-50"
      }`}
    >
      <div className="max-w-5xl mx-auto w-full text-center lg:text-left">
        <div className="mb-6">
          <h1
            // Refined Color: Softer text colors to reduce eye strain
            className={`text-4xl md:text-5xl lg:text-6xl leading-tight ${spaceGrotesk.className} transition-colors duration-300 ${
              theme === "dark" ? "text-slate-100" : "text-slate-900"
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
            I'm{" "}
            <span
              // Refined Color: Adjusted accent colors for better contrast in each mode
              className={`font-bold ${rubik.className} ${
                theme == "dark" ? "text-pink-400" : "text-pink-600"
              }`}
            >
              Manobendra Mandal
            </span>
          </h1>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center lg:justify-start">
            <h2
              // Refined Color: Muted text for secondary information
              className={`text-xl md:text-2xl lg:text-3xl font-mono transition-colors duration-300 italic ${
                theme === "dark" ? "text-slate-400" : "text-slate-500"
              }`}
            >
              "{typewriterText}"
            </h2>
            <div
              // Refined Color: Caret color matches main text color
              className={`w-0.5 h-8 md:h-9 lg:h-10 ml-2 animate-pulse transition-colors duration-300 ${
                theme === "dark" ? "bg-slate-100" : "bg-slate-900"
              }`}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <p
            // Refined Color: Body text with good readability
            className={`text-lg md:text-md max-w-3xl text-justify leading-relaxed ${firaSans.className} transition-colors duration-300 ${
              theme === "dark" ? "text-slate-400" : "text-slate-700"
            }`}
          >
            Builder exploring the intersection of Blockchain and AI. Hackathon
            hunter, curious learner, and someone who balanced academic focus
            with the thrill of creating fast, real-world projects. Now on a
            path to take this mindset and craft to global opportunities.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-3 max-w-4xl justify-center lg:justify-start">
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
          <div
            // Refined Color: Badge styling harmonized with the theme
            className={`inline-flex items-center px-4 py-2 rounded-full border transition-colors duration-300 ${
              theme === "dark"
                ? "border-slate-800 bg-slate-800/50"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <span
              // Refined Color: Text harmonized with the theme
              className={`${firaSans.className} text-sm font-medium transition-colors bg-transparent duration-300 ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Looking for opportunities
            </span>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="#projects"
              // Refined Color: Harmonized button styles
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium ${rubik.className} transition-all duration-300 focus:outline-none focus:ring-4 ${
                theme === "dark"
                  ? "bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-500/50"
                  : "bg-pink-600 text-white hover:bg-pink-700 focus:ring-pink-300"
              }`}
            >
              <span>View Projects</span>
              <ExternalLink size={16} />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              // Refined Color: Harmonized outline button styles
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium ${rubik.className} border transition-all duration-300 focus:outline-none focus:ring-4 ${
                theme === "dark"
                  ? "border-pink-400 text-pink-400 hover:bg-pink-400/10 focus:ring-pink-500/50"
                  : "border-pink-600 text-pink-600 hover:bg-pink-50 focus:ring-pink-300"
              }`}
            >
              <span>Resume</span>
              <Download size={16} />
            </a>
          </div>
        </div>

        <div className="">
          <div className="flex mt-4 space-x-5 justify-center lg:justify-start">
             {/* Refined Color: Harmonized social icon colors */}
            <a href="https://github.com/manobendra" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${ theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-900"}`} aria-label="GitHub Profile">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/manobendra" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${ theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-900"}`} aria-label="LinkedIn Profile">
              <Linkedin size={24} />
            </a>
            <a href="https://twitter.com/manobendra" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${ theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-900"}`} aria-label="Twitter Profile">
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}