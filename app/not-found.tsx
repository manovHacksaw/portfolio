"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { Home, Compass, ArrowRight, Search } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const rotateVariants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen pb-24 sm:pb-20 bg-[var(--background)]">
      <Header displayRoute="/oops" />
      <motion.main
        className="w-full px-5 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh] gap-8">
          {/* Animated 404 Number */}
          <motion.div
            className="relative"
            variants={itemVariants}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Floating decoration dots */}
            <motion.div
              className="absolute -top-4 -left-4 w-2 h-2 rounded-full bg-[var(--accent)]"
              variants={floatingVariants}
              animate="animate"
            />
            <motion.div
              className="absolute -top-2 -right-8 w-1.5 h-1.5 rounded-full bg-[var(--nav-accent)]"
              variants={floatingVariants}
              animate="animate"
              transition={{ delay: 0.5 }}
            />
            <motion.div
              className="absolute -bottom-4 -right-4 w-2 h-2 rounded-full bg-[var(--accent)]"
              variants={floatingVariants}
              animate="animate"
              transition={{ delay: 1 }}
            />
            
            <h1
              className="text-6xl sm:text-8xl md:text-9xl font-bold text-[var(--foreground)] relative"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                4
              </motion.span>
              <motion.span
                className="inline-block mx-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                0
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                4
              </motion.span>
            </h1>
          </motion.div>

          {/* Main Message */}
          <motion.div
            className="flex flex-col items-center gap-4 text-center"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Compass
                  size={32}
                  className="text-[var(--nav-accent)]"
                  strokeWidth={1.5}
                />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                Lost in the void
              </h2>
            </div>
            <p className="text-base sm:text-lg text-[var(--foreground-muted)] font-light max-w-md">
              The page you're looking for doesn't exist or has wandered off into the digital wilderness.
            </p>
          </motion.div>

          {/* Navigation Options */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            variants={itemVariants}
          >
            <Link
              href="/"
              className="group flex items-center gap-2 px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-lg hover:opacity-80 transition-all duration-300 font-medium w-full sm:w-auto justify-center"
            >
              <Home size={18} />
              <span>Go Home</span>
              <motion.div
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </Link>
            
            <Link
              href="/projects"
              className="group flex items-center gap-2 px-6 py-3 border border-[var(--foreground-border)] text-[var(--foreground)] rounded-lg hover:bg-[var(--foreground-border)] transition-all duration-300 font-medium w-full sm:w-auto justify-center"
            >
              <Search size={18} />
              <span>Browse Projects</span>
            </Link>
          </motion.div>

          {/* Fun ASCII Art or Decorative Element */}
          <motion.div
            className="mt-8 text-[var(--foreground-muted)] text-xs font-mono"
            variants={itemVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex flex-col items-center gap-1">
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <pre className="text-center leading-tight">
                  {`   ___
  /   \\
 |     |
 |  ?  |
 |_____|
  \\___/`}
                </pre>
              </motion.div>
              <p className="text-[var(--foreground-muted)] font-light mt-2">
                Even the best explorers get lost sometimes
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mt-4"
            variants={itemVariants}
          >
            <Link
              href="/projects"
              className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              Projects
            </Link>
            <span className="text-[var(--foreground-muted)]">•</span>
            <Link
              href="/experience"
              className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              Experience
            </Link>
            <span className="text-[var(--foreground-muted)]">•</span>
            <Link
              href="/achievements"
              className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              Achievements
            </Link>
            <span className="text-[var(--foreground-muted)]">•</span>
            <Link
              href="/contact"
              className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              Contact
            </Link>
          </motion.div>
        </div>
      </motion.main>
      <BottomNav />
    </div>
  );
}
