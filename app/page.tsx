import HeroSection from "../components/sections/HeroSection";
import ExperiencePreview from "../components/sections/ExperiencePreview";
import ProjectsPreview from "../components/sections/ProjectsPreview";
import AchievementsPreview from "../components/sections/AchievementsPreview";
import SkillsSection from "../components/sections/SkillsSection";
import QuoteSection from "../components/sections/QuoteSection";
import DotGridBanner from "../components/sections/DotGridBanner";
import { mockPortfolioData } from "@/data/mockData";
import GithubContributions from "@/components/GithubContributions";
import { ErrorBoundary } from "../components/ui/ErrorBoundary";

export default function Home() {
  const quote = mockPortfolioData.educationPage?.quote;

  return (
    <div className="min-h-screen pb-16">
      <div className="mx-auto max-w-[720px] border-x border-dashed border-[var(--foreground-border)]">
        <DotGridBanner />
        <div className="divide-y divide-dashed divide-[var(--foreground-border)] px-4 sm:px-6">
          <HeroSection
            personalInfo={mockPortfolioData.personalInfo}
            portfolioLinks={mockPortfolioData.portfolioLinks}
          />
          <ErrorBoundary>
            <GithubContributions />
          </ErrorBoundary>
          <ExperiencePreview experience={mockPortfolioData.experience} />
          <ProjectsPreview projects={mockPortfolioData.projects} />
          <AchievementsPreview hackathons={mockPortfolioData.hackathons} />
          <SkillsSection skills={mockPortfolioData.skills} />
          {quote && <QuoteSection text={quote.text} attribution={quote.attribution} />}
        </div>
        <DotGridBanner />
      </div>
    </div>
  );
}
