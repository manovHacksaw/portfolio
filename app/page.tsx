"use client";
import { motion } from "framer-motion";
import Header from "../components/layout/Header";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import BottomNav from "../components/layout/BottomNav";
import NavbarHint from "../components/layout/NavbarHint";
import { mockPortfolioData } from "@/data/mockData";
import GithubContributions from "@/components/GithubContributions";
import { ErrorBoundary } from "../components/ui/ErrorBoundary";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
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
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function Home() {
  return (
    <motion.div
      className="min-h-screen pb-24 sm:pb-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header />
      <div className="max-w-4xl mx-auto">
        <motion.div variants={itemVariants}>
          <HeroSection
            personalInfo={mockPortfolioData.personalInfo}
            portfolioLinks={mockPortfolioData.portfolioLinks}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <AboutSection personalInfo={mockPortfolioData.personalInfo} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ErrorBoundary>
            <SkillsSection skills={mockPortfolioData.skills} />
          </ErrorBoundary>
        </motion.div>
        <motion.div variants={itemVariants}>
          <ErrorBoundary>
            <GithubContributions />
          </ErrorBoundary>
        </motion.div>
      </div>
      <BottomNav activeItem="home" />
      <NavbarHint />
    </motion.div>
  );
}
