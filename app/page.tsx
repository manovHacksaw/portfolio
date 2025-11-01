import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import BottomNav from "./components/BottomNav";
import { mockPortfolioData } from "@/data/mockData";

export default function Home() {
  return (
    <div className="min-h-screen pb-20">
      <Header />
      <HeroSection
        personalInfo={mockPortfolioData.personalInfo}
        portfolioLinks={mockPortfolioData.portfolioLinks}
      />
      <AboutSection personalInfo={mockPortfolioData.personalInfo} />
      <SkillsSection skills={mockPortfolioData.skills} />
      <BottomNav activeItem="home" />
    </div>
  );
}
