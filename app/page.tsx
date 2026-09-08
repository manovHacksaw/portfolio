import ProfileHeader from "../components/sections/ProfileHeader";
import BioSection from "../components/sections/BioSection";
import ExperiencePreview from "../components/sections/ExperiencePreview";
import ProjectsPreview from "../components/sections/ProjectsPreview";
import AchievementsPreview from "../components/sections/AchievementsPreview";
import EducationPreview from "../components/sections/EducationPreview";
import SkillsSection from "../components/sections/SkillsSection";
import QuoteSection from "../components/sections/QuoteSection";
import DotGridBanner from "../components/sections/DotGridBanner";
import SectionDivider from "../components/sections/SectionDivider";
import { mockPortfolioData } from "@/data/mockData";
import GithubContributions from "@/components/GithubContributions";
import { ErrorBoundary } from "../components/ui/ErrorBoundary";

export default function Home() {
  const quote = mockPortfolioData.educationPage?.quote;

  return (
    <div className="min-h-screen pb-16">
      <div className="mx-auto max-w-[720px] border-x border-dashed border-[var(--foreground-border)]">
        <DotGridBanner />
        <div className="px-4 sm:px-6">
          <ProfileHeader
            name={mockPortfolioData.personalInfo.name}
            titles={mockPortfolioData.personalInfo.titles ?? [mockPortfolioData.personalInfo.title]}
            images={mockPortfolioData.personalInfo.avatarUrls ?? [mockPortfolioData.personalInfo.avatarUrl]}
          />
        </div>
        <SectionDivider />
        <div className="px-4 sm:px-6">
          <BioSection
            personalInfo={mockPortfolioData.personalInfo}
            portfolioLinks={mockPortfolioData.portfolioLinks}
          />
        </div>
        <SectionDivider />
        <div className="px-4 sm:px-6">
          <ErrorBoundary>
            <GithubContributions />
          </ErrorBoundary>
        </div>
        <SectionDivider />
        <div className="px-4 sm:px-6">
          <ExperiencePreview experience={mockPortfolioData.experience} />
        </div>
        <SectionDivider />
        <div className="px-4 sm:px-6">
          <ProjectsPreview projects={mockPortfolioData.projects} />
        </div>
        <SectionDivider />
        <div className="px-4 sm:px-6">
          <AchievementsPreview hackathons={mockPortfolioData.hackathons} />
        </div>
        <SectionDivider />
        <div className="px-4 sm:px-6">
          <EducationPreview education={mockPortfolioData.education} />
        </div>
        <SectionDivider />
        <div className="px-4 sm:px-6">
          <SkillsSection skills={mockPortfolioData.skills} />
        </div>
        {quote && (
          <>
            <SectionDivider />
            <div className="px-4 sm:px-6">
              <QuoteSection text={quote.text} attribution={quote.attribution} />
            </div>
          </>
        )}
        <DotGridBanner />
      </div>
    </div>
  );
}
