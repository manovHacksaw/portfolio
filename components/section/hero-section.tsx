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
    { name: "MERN", light: "bg-emerald-100 text-emerald-800", dark: "bg-emerald-950/60 text-emerald-300 border border-emerald-800" },
    { name: "Next.js", light: "bg-slate-200 text-slate-800", dark: "bg-slate-800/80 text-slate-200 border border-slate-700" },
    { name: "Rust", light: "bg-orange-100 text-orange-800", dark: "bg-orange-950/60 text-orange-300 border border-orange-800" },
    { name: "TypeScript", light: "bg-blue-100 text-blue-800", dark: "bg-blue-950/60 text-blue-300 border border-blue-800" },
    { name: "Node.js", light: "bg-green-100 text-green-800", dark: "bg-green-950/60 text-green-300 border border-green-800" },
    { name: "Solidity", light: "bg-teal-100 text-teal-800", dark: "bg-teal-950/60 text-teal-300 border border-teal-800" },
    { name: "Solana", light: "bg-purple-100 text-purple-800", dark: "bg-purple-950/60 text-purple-300 border border-purple-800" },
    { name: "Web3", light: "bg-indigo-100 text-indigo-800", dark: "bg-indigo-950/60 text-indigo-300 border border-indigo-800" },
  ];

  return (
    <section
      id="hero"
      // CHANGE: Added granular responsive padding for all screen sizes
      className={`min-h-screen flex items-center px-6 sm:px-8 md:px-12 lg:px-24 pt-32 sm:pt-40 pb-10 transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-950" : "bg-slate-50" // Using standard slate colors
      }`}
    >
      {/* CHANGE: Removed mx-auto here to use the section's padding */}
      <div className="max-w-5xl lg:mx-auto w-full text-left">
        <div className="mb-6">
          <h1
            // CHANGE: Adjusted responsive font sizes
            className={`text-4xl sm:text-5xl lg:text-6xl leading-tight font-bold ${spaceGrotesk.className} transition-colors duration-300 ${
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
                className="inline-block pb-4 sm:pb-8" // Adjusted padding for mobile
              >
                {greetings[greetingIndex]}
              </motion.span>
            </AnimatePresence>
            <br />
            I'm{" "}
            <span
              className={`font-bold ${rubik.className} ${
                theme === "dark" ? "text-pink-400" : "text-pink-600"
              }`}
            >
              Manobendra Mandal
            </span>
          </h1>
        </div>

        <div className="mb-8">
          {/* CHANGE: Aligned typewriter to the left */}
          <div className="flex items-center justify-start">
            <h2
              className={`text-xl md:text-2xl font-mono transition-colors duration-300 italic ${
                theme === "dark" ? "text-slate-400" : "text-slate-500"
              }`}
            >
              "{typewriterText}"
            </h2>
            <div
              className={`w-0.5 h-7 md:h-8 ml-2 animate-pulse transition-colors duration-300 ${
                theme === "dark" ? "bg-slate-100" : "bg-slate-900"
              }`}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <p
            // CHANGE: Adjusted responsive font size and removed text-justify
            className={`text-base md:text-lg max-w-3xl leading-relaxed ${firaSans.className} transition-colors duration-300 ${
              theme === "dark" ? "text-slate-400" : "text-slate-700"
            }`}
          >
            Builder exploring the intersection of Blockchain and AI. Hackathon
            hunter, curious learner, and someone who balanced academic focus
            with the thrill of creating fast, real-world projects. Now on a
            path to take this mindset and craft to global opportunities.
          </p>
        </div>

        <div className="mb-10">
          {/* CHANGE: Aligned skills to the left */}
          <div className="flex flex-wrap gap-2.5 max-w-4xl justify-start">
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

        <div className="mb-10">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full border transition-colors duration-300 ${
              theme === "dark"
                ? "border-slate-800 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <span
              className={`${firaSans.className} text-sm font-medium transition-colors bg-transparent duration-300 ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Looking for opportunities
            </span>
          </div>
        </div>

        <div className="mb-8">
          {/* CHANGE: Aligned buttons to the left, they will stack on mobile */}
          <div className="flex flex-wrap gap-4 justify-start">
            <a
              href="#projects"
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
          {/* CHANGE: Aligned social icons to the left */}
          <div className="flex mt-4 space-x-5 justify-start">
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