import HeroSection from "../components/sections/HeroSection";
import ExperiencePreview from "../components/sections/ExperiencePreview";
import ProjectsPreview from "../components/sections/ProjectsPreview";
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
      <DotGridBanner />
      <div className="mx-auto max-w-[720px] border-x border-dashed border-[var(--foreground-border)] px-4 sm:px-6">
        <div className="divide-y divide-dashed divide-[var(--foreground-border)]">
          <HeroSection
            personalInfo={mockPortfolioData.personalInfo}
            portfolioLinks={mockPortfolioData.portfolioLinks}
          />
          <ErrorBoundary>
            <GithubContributions />
          </ErrorBoundary>
          <ExperiencePreview experience={mockPortfolioData.experience} />
          <ProjectsPreview projects={mockPortfolioData.projects} />
          <SkillsSection skills={mockPortfolioData.skills} />
          {quote && <QuoteSection text={quote.text} attribution={quote.attribution} />}
        </div>
      </div>
      <DotGridBanner />
    </div>
  );
}
