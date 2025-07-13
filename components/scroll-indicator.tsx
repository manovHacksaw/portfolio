"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { rubik } from "@/app/fonts";

interface ScrollIndicatorProps {
  theme: string;
}

export default function ScrollIndicator({ theme }: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      const heroHeight = heroSection?.offsetHeight || 0;
      const scrollPosition = window.scrollY;

      // Hide indicator when scrolled past 30% of hero section
      setIsVisible(scrollPosition < heroHeight * 0.3);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 2 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center space-y-4"
    >
      {/* Scroll text with blinking cursor */}
      <div className="flex items-center space-x-1">
        <span
          className={`text-sm font-medium ${rubik.className} transition-smooth ${
            theme === "dark" ? "text-muted-light" : "text-muted-dark"
          }`}
        >
          scroll to explore
        </span>
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className={`w-0.5 h-4 transition-smooth ${
            theme === "dark" ? "bg-muted-light" : "bg-muted-dark"
          }`}
        />
      </div>

      {/* Animated scroll indicator */}
      <div
        className={`relative w-6 h-10 rounded-full border-2 transition-smooth ${
          theme === "dark" ? "border-muted-light" : "border-muted-dark"
        }`}
      >
        <motion.div
          animate={{
            y: [0, 12, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 rounded-full transition-smooth ${
            theme === "dark" ? "bg-muted-light" : "bg-muted-dark"
          }`}
        />
      </div>

      {/* Additional visual enhancement - subtle arrow */}
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
        className={`w-4 h-4 transition-smooth ${
          theme === "dark" ? "text-muted-light" : "text-muted-dark"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </motion.div>
    </motion.div>
  );
}
