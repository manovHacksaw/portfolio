import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { mockPortfolioData } from "@/data/mockData";
import { Experience, Hackathon } from "@/types/portfolio.types";
import { Briefcase, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ExperiencePage() {
  const workExperience = mockPortfolioData.experience[0]; // Get first (and only) work experience
  const hackathons = mockPortfolioData.hackathons;

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
        className="flex flex-col gap-4 py-2"
      >
        {/* Company and Role Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-black dark:text-white shrink-0" />
              <h2 className="text-base sm:text-lg font-bold text-black dark:text-white underline">
                {experience.company}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-black dark:text-white font-light">
              {experience.role}
            </p>
          </div>
          <div className="text-xs sm:text-sm text-black dark:text-white font-light shrink-0 self-start sm:self-start">
            {dateRange}
          </div>
        </div>

        {/* Description as justified paragraph */}
        <p className="text-xs sm:text-sm text-black dark:text-white font-light leading-relaxed text-justify">
          {description}
        </p>

        {/* Tech Stack */}
        {experience.techStack && experience.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {experience.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs sm:text-sm text-black dark:text-white border border-black dark:border-white px-2 py-1 rounded"
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
            className="flex items-center gap-1.5 text-xs sm:text-sm text-black dark:text-white font-light hover:opacity-80 transition-opacity w-fit"
          >
            <ExternalLink size={14} className="sm:w-3 sm:h-3" />
            <span>Company Website</span>
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-24 sm:pb-20 bg-white dark:bg-black">
      <Header />
      <main className="w-full px-5 py-8">
        <div className="flex flex-col gap-8">
          {/* Work Experience */}
          <div className="flex flex-col gap-6">
            {workExperience && renderExperienceCard(workExperience)}
          </div>

          {/* Divider */}
          <div className="border-t border-black dark:border-white my-6"></div>

          {/* Hackathon Achievements Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white">
              Hackathon Achievements
            </h2>
            <p className="text-sm sm:text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              Hackathons have been my proving ground — where learning, innovation, and teamwork meet.
              <br />
              <br />
              I've won 10 hackathons so far, including global competitions held both online and offline.
            </p>

            {/* Hackathons Grid - Flexbox Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {hackathons.map((hackathon: Hackathon) => {
                return (
                  <div
                    key={hackathon.id}
                    className="flex flex-col border border-black dark:border-white rounded-lg bg-white dark:bg-black hover:opacity-90 transition-opacity overflow-hidden"
                  >
                    {/* Image */}
                    {hackathon.imageUrl && (
                      <Link
                        href={hackathon.projectUrl || '#'}
                        className="relative w-full aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900"
                      >
                        <Image
                          src={hackathon.imageUrl}
                          alt={hackathon.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    )}

                    {/* Content */}
                    <div className="flex flex-col gap-3 p-4">
                      {/* Header */}
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Briefcase size={14} className="text-black dark:text-white shrink-0" />
                          <h3 className="text-base font-bold text-black dark:text-white underline">
                            {hackathon.name}
                          </h3>
                        </div>
                        <p className="text-xs text-black dark:text-white font-light">
                          {hackathon.achievement}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-light">
                          {hackathon.date}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-light leading-relaxed line-clamp-3">
                        {hackathon.description}
                      </p>

                      {/* Links */}
                      <div className="flex flex-wrap items-center gap-3 mt-auto">
                        {hackathon.projectUrl && hackathon.projectUrl !== '#' && (
                          <Link
                            href={hackathon.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-black dark:text-white font-light hover:opacity-80 transition-opacity"
                          >
                            <ExternalLink size={12} />
                            <span>View Project</span>
                          </Link>
                        )}
                        {hackathon.announcementUrl && hackathon.announcementUrl !== '#' && (
                          <Link
                            href={hackathon.announcementUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-black dark:text-white font-light hover:opacity-80 transition-opacity"
                          >
                            <ExternalLink size={12} />
                            <span>Announcement</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quote Section */}
          <div className="mt-8 flex flex-col gap-2">
            <p className="text-sm sm:text-sm text-black dark:text-white font-light italic">
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

