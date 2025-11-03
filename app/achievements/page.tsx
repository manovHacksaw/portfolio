"use client";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { mockPortfolioData } from "@/data/mockData";
import { Hackathon } from "@/types/portfolio.types";
import { ExternalLink, Github, Globe, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

// Group hackathons by name and date
interface GroupedHackathon {
  name: string;
  date: string;
  location?: string;
  logoUrl?: string;
  projects: Hackathon[];
}

export default function AchievementsPage() {
  const hackathons = mockPortfolioData.hackathons;

  // Group hackathons by name and date, and sort chronologically
  const groupedHackathons = useMemo(() => {
    const groups = new Map<string, GroupedHackathon>();
    
    hackathons.forEach((hackathon) => {
      const key = `${hackathon.name}_${hackathon.date}`;
      if (!groups.has(key)) {
        groups.set(key, {
          name: hackathon.name,
          date: hackathon.date,
          location: hackathon.location,
          logoUrl: hackathon.logoUrl,
          projects: [],
        });
      }
      groups.get(key)!.projects.push(hackathon);
    });

    // Convert to array and sort by date (newest first - reverse chronological)
    return Array.from(groups.values()).sort((a, b) => {
      // Parse dates - handle both "MMM YYYY" and "DD MMM - DD MMM YYYY" formats
      const dateOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      // Extract year and month from date string
      const parseDate = (dateStr: string) => {
        // Handle date range format: "Sep 21 - Sep 25 2025" or "26 Oct - 27 Oct 2025"
        if (dateStr.includes(' - ')) {
          const parts = dateStr.split(' - ');
          const endDate = parts[1].trim(); // "Sep 25 2025" or "27 Oct 2025"
          const endParts = endDate.split(' ');
          
          // Find the month and year
          let month = '';
          let year = '';
          
          for (const part of endParts) {
            if (dateOrder.includes(part)) {
              month = part;
            } else if (!isNaN(parseInt(part)) && part.length === 4) {
              year = part;
            }
          }
          
          // If format is "DD MMM YYYY", the month might be at index 1
          if (!month && endParts.length >= 3) {
            month = endParts[1];
            year = endParts[2];
          }
          
          const monthIndex = dateOrder.indexOf(month);
          return { year: parseInt(year) || 0, monthIndex: monthIndex >= 0 ? monthIndex : 0 };
        }
        
        // Handle single date format: "Aug 2024" or "Dec 2024"
        const parts = dateStr.trim().split(' ');
        let month = '';
        let year = '';
        
        for (const part of parts) {
          if (dateOrder.includes(part)) {
            month = part;
          } else if (!isNaN(parseInt(part)) && part.length === 4) {
            year = part;
          }
        }
        
        const monthIndex = dateOrder.indexOf(month);
        return { year: parseInt(year) || 0, monthIndex: monthIndex >= 0 ? monthIndex : 0 };
      };
      
      const aDate = parseDate(a.date);
      const bDate = parseDate(b.date);
      
      // Sort by year first (newest first)
      if (aDate.year !== bDate.year) {
        return bDate.year - aDate.year;
      }
      
      // Then by month (newest first)
      if (aDate.monthIndex !== bDate.monthIndex) {
        return bDate.monthIndex - aDate.monthIndex;
      }
      
      return 0;
    });
  }, [hackathons]);

  return (
    <div className="min-h-screen pb-24 sm:pb-20 bg-[var(--background)]">
      <Header />
      <main className="w-full px-5 py-6">
        <div className="flex flex-col gap-6">
          

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Timeline Line - thinner, starts after first logo, ends before last logo */}
            {groupedHackathons.length > 1 && (
              <div 
                className="absolute left-6 bg-[var(--foreground)] opacity-40"
                style={{
                  width: '1px',
                  top: 'calc(24px + 1.5rem)', // Start after first logo center (24px = half of 48px logo) + py-6 (1.5rem)
                  bottom: 'calc(24px + 1.5rem)', // End before last logo center (24px = half of 48px logo) + py-6 (1.5rem)
                }}
              />
            )}

            {/* Timeline Entries */}
            <div className="flex flex-col">
              {groupedHackathons.map((group, groupIndex) => (
                <div key={`${group.name}_${group.date}`} className="relative">
                  {/* Dotted Horizontal Separator (except for first item) */}
                  {groupIndex > 0 && (
                    <div className="absolute left-6 top-0 right-0 border-t border-dashed border-[var(--foreground)] opacity-40" />
                  )}

                  <div className="relative flex items-start gap-4 py-6">
                    {/* Hackathon Logo */}
                    <div className="relative shrink-0">
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center overflow-hidden border-0">
                        {group.logoUrl ? (
                          <Image
                            src={group.logoUrl}
                            alt={group.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-500">
                              {group.name.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col gap-2">
                      {/* Date */}
                      <div className="text-sm sm:text-xs text-[var(--foreground-muted)] font-light">
                        {group.date}
                      </div>

                      {/* Hackathon Title */}
                      <h2 className="text-lg sm:text-base font-bold text-[var(--foreground)]">
                        {group.name}
                      </h2>

                      {/* Location - with icon for better visibility */}
                      {group.location && (
                        <div className="flex items-center gap-1.5 text-sm sm:text-xs text-[var(--foreground-secondary)] font-medium mt-0.5">
                          {group.location.toLowerCase() === 'online' ? (
                            <Globe size={14} className="sm:w-[12px] sm:h-[12px] shrink-0" />
                          ) : (
                            <MapPin size={14} className="sm:w-[12px] sm:h-[12px] shrink-0" />
                          )}
                          <span>{group.location}</span>
                        </div>
                      )}

                      {/* Projects Descriptions */}
                      <div className="flex flex-col gap-3 mt-2">
                        {group.projects.map((hackathon) => (
                          <div key={hackathon.id} className="flex flex-col gap-1.5">
                            {/* Achievement/Prize */}
                            {(hackathon.achievement || hackathon.prize) && (
                              <div className="text-sm sm:text-xs text-[var(--foreground-secondary)] font-semibold">
                                {hackathon.prize && hackathon.achievement 
                                  ? `${hackathon.achievement} • ${hackathon.prize}`
                                  : hackathon.achievement || hackathon.prize}
                              </div>
                            )}
                            {/* Project Name if different from hackathon name */}
                            {hackathon.projectName && (
                              <div className="text-sm sm:text-xs font-medium text-[var(--foreground)]">
                                {hackathon.projectName}
                              </div>
                            )}
                            {/* Description */}
                            <p className="text-sm sm:text-xs text-[var(--foreground-muted)] font-light leading-relaxed">
                              {hackathon.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Links - Button Style */}
                      {(group.projects.some(p => p.projectUrl && p.projectUrl !== '#') || group.projects.some(p => p.githubUrl) || group.projects.some(p => p.announcementUrl && p.announcementUrl !== '#')) && (
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {(() => {
                            const p = group.projects[0];
                            if (!p) return null;
                            const isGithub = p.projectUrl && p.projectUrl.includes('github.com');
                            const liveUrl = p.projectUrl && !isGithub ? p.projectUrl : undefined;
                            const githubUrl = p.githubUrl || (isGithub ? p.projectUrl : undefined);
                            return (
                              <>
                                {liveUrl && (
                                  <Link
                                    href={liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--foreground)] text-[var(--background)] rounded hover:opacity-80 transition-opacity text-xs font-medium"
                                  >
                                    <Globe size={12} />
                                    <span>{p.projectName || 'Live'}</span>
                                  </Link>
                                )}
                                {githubUrl && (
                                  <Link
                                    href={githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] border border-[var(--foreground-border)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition text-xs font-medium"
                                  >
                                    <Github size={12} />
                                    <span>Code</span>
                                  </Link>
                                )}
                              </>
                            );
                          })()}
                          {group.projects[0]?.announcementUrl && group.projects[0].announcementUrl !== '#' && (
                            <Link
                              href={group.projects[0].announcementUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--foreground)] text-[var(--background)] rounded hover:opacity-80 transition-opacity text-xs font-medium"
                            >
                              <ExternalLink size={12} />
                              <span>Announcement</span>
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <BottomNav activeItem="achievements" />
    </div>
  );
}
