'use client';

import { ExternalLink, Download, Github, Linkedin, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypewriter } from '@/hooks/use-typewriter';
import { useItemSwitcher } from '@/hooks/use-item-switcher'; // <-- Import new hook

interface HeroSectionProps {
  theme: string;
}

export default function HeroSection({ theme }: HeroSectionProps) {
  // 1. Greetings updated with native scripts for a more authentic feel
  const greetings = [
    'Hello',
    'こんにちは', // Konnichiwa (Japanese)
    'নমস্কার',   // Nomoskar (Bengali)
    'नमस्ते',    // Namaste (Hindi)
    'Bonjour',
    'Halo'
  ];

  // 2. Use the new hook for smooth switching greetings
  const greetingIndex = useItemSwitcher(greetings.length, 3000); // Swaps every 3 seconds

  // Keep the typewriter for the second line as it is
  const typewriterText = useTypewriter([
    'learning Solana Development',
    'stacking wins on chain',
    'building'
  ], 100);

  const skills = [
    { name: 'JavaScript', color: theme === 'dark' ? 'bg-yellow-900/30 text-yellow-300 border-yellow-700/50' : 'bg-yellow-100 text-yellow-800' },
    { name: 'React', color: theme === 'dark' ? 'bg-pink-900/30 text-pink-300 border-pink-700/50' : 'bg-pink-100 text-pink-800' },
    { name: 'Next.js', color: theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-black text-white' },
    { name: 'TypeScript', color: theme === 'dark' ? 'bg-pink-900/30 text-pink-300 border-pink-700/50' : 'bg-pink-100 text-pink-800' },
    { name: 'Node.js', color: theme === 'dark' ? 'bg-green-900/30 text-green-300 border-green-700/50' : 'bg-green-100 text-green-800' },
    { name: 'Tailwind CSS', color: theme === 'dark' ? 'bg-cyan-900/30 text-cyan-300 border-cyan-700/50' : 'bg-cyan-100 text-cyan-800' },
    { name: 'Solana', color: theme === 'dark' ? 'bg-purple-900/30 text-purple-300 border-purple-700/50' : 'bg-purple-100 text-purple-800' },
    { name: 'Web3', color: theme === 'dark' ? 'bg-orange-900/30 text-orange-300 border-orange-700/50' : 'bg-orange-100 text-orange-800' },
  ];

  return (
    <section
      id="hero"
      className={`min-h-screen flex items-center justify-center px-6 md:px-8 lg:px-12 pt-20 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-950' : 'bg-white'
      }`}
    >
      <div className="max-w-6xl mx-auto w-full text-center">
       

        {/* Main title */}
        <div className="mb-6">
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {/* 3. Smooth switching animation implemented here */}
            <AnimatePresence mode="wait">
              <motion.span
                key={greetingIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="inline-block" // Ensures smooth transitions
              >
                {greetings[greetingIndex]}
              </motion.span>
            </AnimatePresence>
            <br />
            I'm <span className=" font-rubik text-pink-600">Manobendra Mandal</span>
          </h1>
        </div>

        {/* Typewriter line - This remains the same */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <h2 className={`text-3xl font-mono md:text-4xl lg:text-5xl font-bold transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {typewriterText}
            </h2>
            <div className={`w-0.5 h-8 md:h-10 lg:h-12 ml-2 animate-pulse transition-colors duration-300 ${
              theme === 'dark' ? 'bg-white' : 'bg-gray-900'
            }`}></div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Passionate developer exploring the intersection of web development and blockchain technology. 
            Currently diving deep into Solana development and building innovative solutions.
          </p>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 max-w-4xl mx-auto justify-center">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  theme === 'dark' ? `${skill.color} border` : skill.color
                }`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

         {/* Opportunity Badge */}
        <div className="mb-8">
          <div className={`inline-flex items-center px-4 py-2 rounded-full border transition-colors duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-900 border-gray-700' 
              : 'bg-gray-100 border-gray-200'
          }`}>
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className={`font-fira-sans text-sm font-medium  transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Looking for opportunities
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-pink-600 text-white hover:bg-pink-700'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}>
              <span>View Projects</span>
              <ExternalLink size={16} />
            </button>
            <button className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium border transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              <span>Resume</span>
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* Social links */}
        <div>
          <div className="flex space-x-4 justify-center">
            <a
              href="https://github.com/manobendra"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/manobendra"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://twitter.com/manobendra"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}