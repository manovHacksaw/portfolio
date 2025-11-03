import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { mockPortfolioData } from "@/data/mockData";
import { Experience } from "@/types/portfolio.types";
import { Briefcase, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ExperiencePage() {
  const workExperience = mockPortfolioData.experience; // Get all work experiences

  const renderExperienceCard = (experience: Experience) => {
    if (!experience) return null;
    
    // Combine responsibilities into a single paragraph
    const description = experience.responsibilities.join(' ');
    const dateRange = experience.endDate && experience.endDate !== experience.startDate
      ? `${experience.startDate} - ${experience.endDate}`
      : experience.endDate === null
      ? `${experience.startDate} - Present`
      : experience.startDate;
    
    return (
      <div
        key={experience.id}
        className="flex flex-col gap-4 p-4 border border-[var(--foreground)] rounded-lg bg-[var(--background)]"
      >
        {/* Company and Role Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-[var(--foreground)] shrink-0" />
              <h2 className="text-base sm:text-lg font-bold text-[var(--foreground)] underline">
                {experience.company}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[var(--foreground)] font-light">
              {experience.role}
            </p>
          </div>
          <div className="text-xs sm:text-sm text-[var(--foreground)] font-light shrink-0 self-start sm:self-start">
            {dateRange}
          </div>
        </div>

        {/* Description as justified paragraph */}
        <p className="text-xs sm:text-sm text-[var(--foreground)]/70 font-light leading-relaxed text-justify">
          {description}
        </p>

        {/* Tech Stack */}
        {experience.techStack && experience.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {experience.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs sm:text-sm text-[var(--foreground)] border border-[var(--foreground)] px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Website Link */}
        {experience.websiteUrl && experience.websiteUrl !== '#' && (
          <Link
            href={experience.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-[var(--foreground)] font-light hover:opacity-80 transition-opacity w-fit"
          >
            <ExternalLink size={14} className="sm:w-3 sm:h-3" />
            <span>Company Website</span>
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-24 sm:pb-20 bg-[var(--background)]">
      <Header />
      <main className="w-full px-5 py-8">
        <div className="flex flex-col gap-8">
          {/* Work Experience */}
          <div className="flex flex-col gap-6">
            {workExperience.map((experience) => renderExperienceCard(experience))}
          </div>

          {/* Hackathons moved to /hackathons */}

          {/* Quote Section */}
          <div className="mt-8 flex flex-col gap-2">
            <p className="text-sm sm:text-sm text-[var(--foreground)] font-light italic">
              "The best time to repair the roof is when the sun is shining."
            </p>
            <span className="text-sm sm:text-sm text-green-500 border border-green-500 px-2 py-1 w-fit rounded">
              — John F. Kennedy
            </span>
          </div>
        </div>
      </main>
      <BottomNav activeItem="work" />
    </div>
  );
}

