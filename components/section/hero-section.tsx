"use client";

import {
  ExternalLink,
  Download,
  Github,
  Linkedin,
  Twitter,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useItemSwitcher } from "@/hooks/use-item-switcher";
import { spaceGrotesk, firaSans, ibmPlexSans, rubik } from "@/app/fonts";
import ScrollIndicator from "@/components/scroll-indicator";

interface HeroSectionProps {
  theme: string;
}

export default function HeroSection({ theme }: HeroSectionProps) {
  const greetings = [
    "Hello",
    "Hola",
    "Bonjour",
    "こんにちは",
    "안녕하세요",
    "你好",
    "Guten Tag",
    "नमस्ते",
    "নমস্কার",
    "Olá",
    "Привет",
    "Halo",
  ];

  const greetingIndex = useItemSwitcher(greetings.length, 3000);

  const typewriterText = useTypewriter(
    [
      "learning Solana Development.",
      "debugging life, stacking wins on chain.",
      "building to solve real-life problems.",
    ],
    100,
  );

  const skills = [
    {
      name: "MERN",
      colorClass: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    },
    {
      name: "Next.js",
      colorClass: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    },
    {
      name: "Rust",
      colorClass: "bg-orange-50 text-orange-700 border border-orange-200",
    },
    {
      name: "TypeScript",
      colorClass: "bg-blue-50 text-blue-700 border border-blue-200",
    },
    {
      name: "Node.js",
      colorClass: "bg-green-50 text-green-700 border border-green-200",
    },
    {
      name: "Solidity",
      colorClass: "bg-teal-50 text-teal-700 border border-teal-200",
    },
    {
      name: "Solana",
      colorClass: "bg-purple-50 text-purple-700 border border-purple-200",
    },
    {
      name: "Web3",
      colorClass: "bg-violet-50 text-violet-700 border border-violet-200",
    },
  ];

  return (
    <section
      id="hero"
      className={`min-h-screen flex items-center px-6 sm:px-8 md:px-12 lg:px-24 pt-32 sm:pt-40 pb-20 transition-smooth ${
        theme === "dark" ? "bg-dark" : "bg-light"
      }`}
    >
      <div className="max-w-5xl lg:mx-auto w-full text-left">
        <div className="mb-6">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl leading-tight font-bold ${spaceGrotesk.className} transition-smooth ${
              theme === "dark" ? "text-light" : "text-dark"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={greetingIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="inline-block pb-4 sm:pb-8"
              >
                {greetings[greetingIndex]}
              </motion.span>
            </AnimatePresence>
            <br />
            I'm{" "}
            <span className={`font-bold accent-primary ${rubik.className}`}>
              Manobendra Mandal
            </span>
          </h1>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-start">
            <h2
              className={`text-xl md:text-2xl font-mono transition-smooth italic ${
                theme === "dark" ? "text-muted-light" : "text-muted-dark"
              }`}
            >
              "{typewriterText}"
            </h2>
            <div
              className={`w-0.5 h-7 md:h-8 ml-2 animate-pulse transition-smooth ${
                theme === "dark" ? "bg-light" : "bg-dark"
              }`}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <p
            className={`text-base md:text-lg max-w-3xl leading-relaxed ${firaSans.className} transition-smooth ${
              theme === "dark" ? "text-muted-light" : "text-muted-dark"
            }`}
          >
            Builder exploring the intersection of Blockchain and AI. Hackathon
            hunter, curious learner, and someone who balanced academic focus
            with the thrill of creating fast, real-world projects. Now on a path
            to take this mindset and craft to global opportunities.
          </p>
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap gap-2.5 max-w-4xl justify-start">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  ibmPlexSans.className
                } transition-smooth ${
                  theme === "dark"
                    ? "bg-dark-soft text-muted-light border-light"
                    : skill.colorClass
                }`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full border transition-smooth ${
              theme === "dark"
                ? "border-light bg-dark-soft"
                : "border-dark bg-light-soft"
            }`}
          >
            <div className="w-2 h-2 bg-green-700 rounded-full mr-3 animate-pulse"></div>
            <span
              className={`${firaSans.className} text-sm font-medium transition-smooth ${
                theme === "dark" ? "text-muted-light" : "text-muted-dark"
              }`}
            >
              Looking for opportunities
            </span>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-start">
            <a
              href="#projects"
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium ${rubik.className} bg-accent-primary text-white hover-accent-primary transition-smooth focus-accent scale-hover`}
            >
              <span>View Projects</span>
              <ExternalLink size={16} />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium ${rubik.className} border border-accent-primary accent-primary transition-smooth focus-accent scale-hover ${
                theme === "dark" ? "hover-bg-light" : "hover-bg-dark"
              }`}
            >
              <span>Resume</span>
              <Download size={16} />
            </a>
          </div>
        </div>

        <div className="">
          <div className="flex mt-4 space-x-5 justify-start">
            <a
              href="https://github.com/manovHacksaw"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-smooth scale-hover ${
                theme === "dark"
                  ? "text-muted-light hover:text-light"
                  : "text-muted-dark hover:text-dark"
              }`}
              aria-label="GitHub Profile"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/manob-mandal"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-smooth scale-hover ${
                theme === "dark"
                  ? "text-muted-light hover:text-light"
                  : "text-muted-dark hover:text-dark"
              }`}
              aria-label="LinkedIn Profile"
            >
              <X size={24} />
            </a>
            <a
              href="https://x.com/manovmandal"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-smooth scale-hover ${
                theme === "dark"
                  ? "text-muted-light hover:text-light"
                  : "text-muted-dark hover:text-dark"
              }`}
              aria-label="Twitter Profile"
            >
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <ScrollIndicator theme={theme} /> */}
    </section>
  );
}
