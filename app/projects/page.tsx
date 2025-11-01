import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { mockPortfolioData } from "@/data/mockData";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pb-20">
      <Header />
      <main className="w-full px-5 py-8">
        <div className="flex flex-col gap-6">
          {/* Intro Section */}
          <div className="flex flex-col gap-3">
            <h1 className="text-lg sm:text-xl font-bold text-black dark:text-white">
              Explore my recent projects
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-3xl text-justify">
              Here's a glimpse of what I've been building lately — from small experiments to full-fledged apps that push my limits.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockPortfolioData.projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col border border-black dark:border-white rounded-lg bg-white dark:bg-black overflow-hidden"
              >
                {/* Project Image */}
                {project.imageUrl && (
                  <div className="w-full h-48 relative bg-gray-100 dark:bg-gray-900">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Project Content */}
                <div className="p-4 flex flex-col gap-3">
                  {/* Title and Links */}
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-base font-bold text-black dark:text-white flex-1">
                      {project.title}
                    </h2>
                    <div className="flex items-center gap-2 shrink-0">
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black dark:text-white hover:opacity-70 transition-opacity"
                          aria-label="GitHub"
                        >
                          <Github size={16} />
                        </Link>
                      )}
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black dark:text-white hover:opacity-70 transition-opacity"
                          aria-label="Live Demo"
                        >
                          <ExternalLink size={16} />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                    {project.longDescription || project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="text-[10px] px-2 py-1 border border-black dark:border-white rounded text-black dark:text-white font-light"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Date Range */}
                  {(project.startDate || project.endDate) && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-light mt-1">
                      {project.startDate}
                      {project.endDate ? ` - ${project.endDate}` : project.endDate === null ? ' - Present' : ''}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <BottomNav activeItem="folder" />
    </div>
  );
}

