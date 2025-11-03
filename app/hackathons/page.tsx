import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { mockPortfolioData } from "@/data/mockData";
import { Hackathon } from "@/types/portfolio.types";
import { Briefcase, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HackathonsPage() {
  const hackathons = mockPortfolioData.hackathons;

  return (
    <div className="min-h-screen pb-24 sm:pb-20 bg-white dark:bg-black">
      <Header />
      <main className="w-full px-5 py-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg sm:text-xl font-bold text-black dark:text-white">
            Hackathon Achievements
          </h1>
          <p className="text-sm sm:text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
            Hackathons have been my proving ground — where learning, innovation, and teamwork meet.
            <br />
            <br />
            I've won 10 hackathons so far, including global competitions held both online and offline.
          </p>

          {/* Hackathons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {hackathons.map((hackathon: Hackathon) => (
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
                    {hackathon.projectName && (
                      <p className="text-xs text-black dark:text-white font-medium">
                        {hackathon.projectName}
                      </p>
                    )}
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
            ))}
          </div>
        </div>
      </main>
      <BottomNav activeItem="hackathons" />
    </div>
  );
}


