import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { mockPortfolioData } from "@/data/mockData";
import { Mail, MapPin, Github, Linkedin, Globe, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const personalInfo = mockPortfolioData.personalInfo;
  const portfolioLinks = mockPortfolioData.portfolioLinks;

  // Get specific links
  const githubLink = portfolioLinks.find(link => link.icon === 'github');
  const linkedInLink = portfolioLinks.find(link => link.icon === 'linkedin');
  const emailLink = portfolioLinks.find(link => link.icon === 'email');
  const portfolioLink = portfolioLinks.find(link => link.icon === 'globe');

  return (
    <div className="min-h-screen pb-24 sm:pb-20 bg-[var(--background)]">
      <Header />
      <main className="w-full px-5 py-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-base sm:text-sm font-bold text-[var(--foreground)]">
            Get in Touch
          </h1>
          
          <p className="text-sm sm:text-sm text-[var(--foreground-muted)] font-light leading-relaxed">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about tech. Feel free to reach out!
          </p>

          {/* Contact Information */}
          <div className="flex flex-col gap-4 mt-4">
            {/* Email */}
            {personalInfo.email && (
              <Link
                href={`mailto:${personalInfo.email}`}
                className="flex items-start gap-3 p-3 rounded-lg bg-[var(--background)] hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--foreground)] text-[var(--background)] shrink-0">
                  <Mail size={18} />
                </div>
                <div className="flex-1 flex flex-col gap-0.5">
                  <span className="text-xs sm:text-xs text-[var(--foreground-muted)] font-light">Email</span>
                  <span className="text-sm sm:text-sm text-[var(--foreground)] font-medium">{personalInfo.email}</span>
                </div>
                <ExternalLink size={16} className="text-[var(--foreground-muted)] shrink-0 mt-2" />
              </Link>
            )}

            {/* Location */}
            {personalInfo.location && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--background)]">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--foreground)] text-[var(--background)] shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="flex-1 flex flex-col gap-0.5">
                  <span className="text-xs sm:text-xs text-[var(--foreground-muted)] font-light">Location</span>
                  <span className="text-sm sm:text-sm text-[var(--foreground)] font-medium flex items-center gap-1.5">
                    {personalInfo.locationFlag} {personalInfo.location}
                  </span>
                </div>
              </div>
            )}

            {/* GitHub */}
            {githubLink && (
              <Link
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-lg bg-[var(--background)] hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--foreground)] text-[var(--background)] shrink-0">
                  <Github size={18} />
                </div>
                <div className="flex-1 flex flex-col gap-0.5">
                  <span className="text-xs sm:text-xs text-[var(--foreground-muted)] font-light">GitHub</span>
                  <span className="text-sm sm:text-sm text-[var(--foreground)] font-medium">{githubLink.platform}</span>
                </div>
                <ExternalLink size={16} className="text-[var(--foreground-muted)] shrink-0 mt-2" />
              </Link>
            )}

            {/* LinkedIn */}
            {linkedInLink && (
              <Link
                href={linkedInLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-lg bg-[var(--background)] hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--foreground)] text-[var(--background)] shrink-0">
                  <Linkedin size={18} />
                </div>
                <div className="flex-1 flex flex-col gap-0.5">
                  <span className="text-xs sm:text-xs text-[var(--foreground-muted)] font-light">LinkedIn</span>
                  <span className="text-sm sm:text-sm text-[var(--foreground)] font-medium">{linkedInLink.platform}</span>
                </div>
                <ExternalLink size={16} className="text-[var(--foreground-muted)] shrink-0 mt-2" />
              </Link>
            )}

            {/* Portfolio Website */}
            {portfolioLink && (
              <Link
                href={portfolioLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-lg bg-[var(--background)] hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--foreground)] text-[var(--background)] shrink-0">
                  <Globe size={18} />
                </div>
                <div className="flex-1 flex flex-col gap-0.5">
                  <span className="text-xs sm:text-xs text-[var(--foreground-muted)] font-light">Portfolio</span>
                  <span className="text-sm sm:text-sm text-[var(--foreground)] font-medium">{portfolioLink.platform}</span>
                </div>
                <ExternalLink size={16} className="text-[var(--foreground-muted)] shrink-0 mt-2" />
              </Link>
            )}
          </div>
        </div>
      </main>
      <BottomNav activeItem="contact" />
    </div>
  );
}

