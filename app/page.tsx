import Header from "../components/Header";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import BottomNav from "../components/BottomNav";
import { mockPortfolioData } from "@/data/mockData";
import GithubContributions from "@/components/GithubContributions";

export default function Home() {
  return (
    <div className="min-h-screen pb-24 sm:pb-20">
      <Header />
      <div className="max-w-4xl mx-auto">
        <HeroSection
          personalInfo={mockPortfolioData.personalInfo}
          portfolioLinks={mockPortfolioData.portfolioLinks}
        />
        <AboutSection personalInfo={mockPortfolioData.personalInfo} />
        <SkillsSection skills={mockPortfolioData.skills} />
        <GithubContributions />
      </div>
      <BottomNav activeItem="home" />
    </div>
  );
}
