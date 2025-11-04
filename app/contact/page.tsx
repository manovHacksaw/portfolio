"use client";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { mockPortfolioData } from "@/data/mockData";
import { Mail, MapPin, Github, Linkedin, Instagram, ArrowRight, ArrowLeftRight, Flame, Play, Pause } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";

export default function ContactPage() {
  const personalInfo = mockPortfolioData.personalInfo;
  const portfolioLinks = mockPortfolioData.portfolioLinks;
  const contactPageData = mockPortfolioData.contactPage;

  // Get specific links
  const githubLink = portfolioLinks.find(link => link.icon === 'github');
  const linkedInLink = portfolioLinks.find(link => link.icon === 'linkedin');
  const emailLink = portfolioLinks.find(link => link.icon === 'email');

  // Use global audio player context
  const { isPlaying, currentTime, duration, isLoading, hasError, togglePlay, handleSeek, formatTime } = useAudioPlayer();

  // Audio metadata from data
  const spotifyUrl = contactPageData?.nowPlaying.spotifyUrl || "https://open.spotify.com/track/5pMPNxZz50iup8cXchRHxm";

  const socialLinks = [
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      href: `mailto:${personalInfo.email}`,
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      label: 'LinkedIn',
      href: linkedInLink?.url,
    },
    {
      id: 'github',
      icon: Github,
      label: 'Github',
      href: githubLink?.url,
    },
    {
      id: 'instagram',
      icon: Instagram,
      label: 'Instagram',
      href: contactPageData?.socialLinks.instagram || '#',
    },
  ];

  return (
    <div className="min-h-screen pb-24 sm:pb-20 bg-[var(--background)]">
      <Header />
      <main className="w-full px-5 py-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          
          {/* Let's Work Together Section */}
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--foreground)] text-center">
              {contactPageData?.header.title || "Let's Work Together"}
            </h1>
            
            {/* Profile Pictures with Arrow */}
            <div className="flex items-center gap-4">
              {/* Left Profile Picture */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border border-[var(--foreground-border)]">
                <Image
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
              
              {/* Double Arrow */}
              <ArrowLeftRight size={24} className="text-[var(--foreground)] shrink-0" />
              
              {/* Right Placeholder */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-[var(--background)] border border-[var(--foreground-border)] flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-[var(--foreground)] rounded-full opacity-50" />
              </div>
            </div>
            
            {/* Subheading */}
            <h2 className="text-lg sm:text-xl font-medium text-[var(--foreground)] text-center">
              {contactPageData?.header.subheading || "Suggestion/Idea/Thought?"}
            </h2>
            
            {/* Description */}
            <p className="text-sm sm:text-sm text-[var(--foreground-muted)] font-light text-center max-w-lg">
              {contactPageData?.header.description || "Let's create the website you've always wanted. Send me a message to begin."}
            </p>
            
            {/* Flame Icon */}
            <Link href={`mailto:${personalInfo.email}`} className="mt-2 hover:opacity-80 transition-opacity">
              <Flame size={32} className="text-[var(--nav-accent)]" />
            </Link>
          </div>

          {/* Social Links Section */}
          <div className="flex flex-col">
            {socialLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <div key={link.id}>
                  <Link
                    href={link.href || '#'}
                    target={link.href?.startsWith('http') || link.href?.startsWith('mailto') ? '_blank' : undefined}
                    rel={link.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-between py-4 hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent size={20} className="text-[var(--foreground)]" />
                      <span className="text-base sm:text-lg text-[var(--foreground)] font-medium">
                        {link.label}
                      </span>
                    </div>
                    <ArrowRight size={18} className="text-[var(--foreground)] shrink-0" />
                  </Link>
                  {index < socialLinks.length - 1 && (
                    <div className="border-t border-[var(--foreground-border)]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Now Playing Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2" style={{ fontFamily: 'var(--font-caveat)' }}>
              <h2 className="text-xl sm:text-2xl font-medium text-[var(--foreground)]">
                Now Playing
              </h2>
              <span className="text-xl sm:text-2xl text-[var(--foreground)]">♪</span>
            </div>
            
            <div className="border-t border-[var(--foreground-border)] pt-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  {/* Spotify Icon - Orange rounded square */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-[var(--nav-accent)] shrink-0">
                    <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.359.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.78-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </div>
                  
                  {/* Song Info */}
                  <div className="flex-1 flex flex-col gap-0.5">
                    <span 
                      className="text-2xl sm:text-3xl font-semibold text-[var(--nav-accent)]"
                      style={{ fontFamily: 'var(--font-caveat)' }}
                    >
                      {contactPageData?.nowPlaying.title || "Cupid"}
                    </span>
                    <span className="text-sm sm:text-base text-[var(--foreground-muted)] font-light">
                      {contactPageData?.nowPlaying.artist || "FIFTY FIFTY"}
                    </span>
                  </div>
                  
                  {/* Play/Pause Button */}
                  {hasError ? (
                    <div className="text-xs text-[var(--foreground-muted)] text-center px-2">
                      Audio unavailable
                    </div>
                  ) : (
                    <button
                      onClick={togglePlay}
                      disabled={isLoading}
                      className="shrink-0 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-10 h-10 rounded-full bg-[var(--foreground-border)] hover:bg-[var(--foreground-border)] active:scale-95 transition-all"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-[var(--foreground)] border-t-transparent rounded-full animate-spin" />
                      ) : isPlaying ? (
                        <Pause size={16} className="text-[var(--foreground)]" fill="currentColor" />
                      ) : (
                        <Play size={16} className="text-[var(--foreground)] ml-0.5" fill="currentColor" />
                      )}
                    </button>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--foreground-muted)] min-w-[2.5rem] text-right font-mono">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => handleSeek(parseFloat(e.target.value))}
                    disabled={isLoading || duration === 0}
                    className="flex-1 h-1.5 bg-[var(--foreground-border)] rounded-full appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    style={{
                      background: `linear-gradient(to right, var(--nav-accent) 0%, var(--nav-accent) ${duration ? (currentTime / duration) * 100 : 0}%, var(--foreground-border) ${duration ? (currentTime / duration) * 100 : 0}%, var(--foreground-border) 100%)`,
                    }}
                  />
                  <span className="text-xs text-[var(--foreground-muted)] min-w-[2.5rem] font-mono">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Spotify Link */}
                <div className="flex justify-end">
                  <a
                    href={spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors underline"
                  >
                    Open in Spotify →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="border-t border-[var(--foreground-border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--foreground-muted)] font-light">
           <div>  </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{personalInfo.location}</span>
              <span>{personalInfo.locationFlag}</span>
            </div>
          </div>
        </div>
      </main>
      <BottomNav activeItem="contact" />
    </div>
  );
}