"use client";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { mockPortfolioData } from "@/data/mockData";
import { Mail, MapPin, Github, Linkedin, Globe, ExternalLink, Send, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const personalInfo = mockPortfolioData.personalInfo;
  const portfolioLinks = mockPortfolioData.portfolioLinks;

  // Get specific links
  const githubLink = portfolioLinks.find(link => link.icon === 'github');
  const linkedInLink = portfolioLinks.find(link => link.icon === 'linkedin');
  const emailLink = portfolioLinks.find(link => link.icon === 'email');
  const portfolioLink = portfolioLinks.find(link => link.icon === 'globe');

  const contactItems = [
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'from-blue-500 to-cyan-500',
      description: 'Drop me a line',
    },
    {
      id: 'location',
      icon: MapPin,
      label: 'Location',
      value: personalInfo.location,
      href: null,
      iconElement: personalInfo.locationFlag,
      color: 'from-green-500 to-emerald-500',
      description: 'Based in India',
    },
    {
      id: 'github',
      icon: Github,
      label: 'GitHub',
      value: githubLink?.platform || 'GitHub',
      href: githubLink?.url,
      color: 'from-purple-500 to-pink-500',
      description: 'Check out my code',
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      label: 'LinkedIn',
      value: linkedInLink?.platform || 'LinkedIn',
      href: linkedInLink?.url,
      color: 'from-indigo-500 to-blue-500',
      description: 'Let\'s connect',
    },
    {
      id: 'portfolio',
      icon: Globe,
      label: 'Portfolio',
      value: portfolioLink?.platform || 'Portfolio',
      href: portfolioLink?.url,
      color: 'from-orange-500 to-red-500',
      description: 'See more work',
    },
  ];

  return (
    <div className="min-h-screen pb-24 sm:pb-20 bg-[var(--background)]">
      <Header />
      <main className="w-full px-5 lg:px-0 py-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {/* Header Section */}
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <Sparkles className="w-6 h-6 text-[var(--nav-accent)]" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--foreground)]">
                Let's Connect
              </h1>
            </div>
            <p className="text-sm sm:text-base text-[var(--foreground-muted)] font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about tech. Feel free to reach out through any of these channels!
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {contactItems.map((item) => {
              const IconComponent = item.icon;
              const isClickable = item.href !== null;

              const content = (
                <div
                  className={`
                    group relative overflow-hidden rounded-xl border border-[var(--foreground-border)] 
                    bg-[var(--background)] p-6 transition-all duration-300
                    ${isClickable ? 'hover:border-[var(--foreground)] hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''}
                  `}
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Icon */}
                    <div className="flex items-center justify-between">
                      <div className={`
                        flex items-center justify-center w-14 h-14 rounded-xl 
                        bg-gradient-to-br ${item.color} text-white
                        shadow-lg group-hover:scale-110 transition-transform duration-300
                      `}>
                        {item.iconElement ? (
                          <span className="text-2xl">{item.iconElement}</span>
                        ) : (
                          <IconComponent size={24} />
                        )}
                      </div>
                      {isClickable && (
                        <ExternalLink 
                          size={18} 
                          className="text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] transition-colors" 
                        />
                      )}
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-wider text-[var(--foreground-muted)] font-medium">
                        {item.label}
                      </span>
                      <span className="text-base sm:text-lg font-semibold text-[var(--foreground)] line-clamp-1">
                        {item.value}
                      </span>
                      <span className="text-sm text-[var(--foreground-muted)] font-light mt-1">
                        {item.description}
                      </span>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className={`
                    absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.color} 
                    opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300
                  `} />
                </div>
              );

              if (isClickable) {
                return (
                  <Link
                    key={item.id}
                    href={item.href || '#'}
                    target={item.href?.startsWith('http') ? '_blank' : undefined}
                    rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <div key={item.id}>
                  {content}
                </div>
              );
            })}
          </div>

          {/* Now Playing */}
          <div className="mt-4 p-6 rounded-xl border border-[var(--foreground-border)] bg-[var(--background)]">
            <div className="flex items-center gap-4">
              {/* Spotify Icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shrink-0">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.359.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.78-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              
              {/* Song Info */}
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-[var(--nav-accent)]" />
                  <span className="text-xs uppercase tracking-wider text-[var(--foreground-muted)] font-medium">
                    Now Playing
                  </span>
                </div>
                <span className="text-base sm:text-lg font-semibold text-[var(--foreground)]">
                  Cupid
                </span>
                <span className="text-sm text-[var(--foreground-muted)] font-light">
                  FIFTY FIFTY
                </span>
              </div>
              
              {/* Play Button */}
              <a
                href="https://open.spotify.com/track/4RaqT3ttA6yZFYoOKR6F6d"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity shrink-0"
                aria-label="Play Cupid by FIFTY FIFTY on Spotify"
              >
                <Play size={18} className="ml-0.5" fill="currentColor" />
              </a>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-4 p-6 rounded-xl border border-[var(--foreground-border)] bg-[var(--background)] text-center">
            <div className="flex flex-col items-center gap-3">
              <Send className="w-6 h-6 text-[var(--nav-accent)]" />
              <p className="text-sm text-[var(--foreground-muted)] font-light">
                Prefer a quick message? Drop me an email and I'll get back to you as soon as possible.
              </p>
              {emailLink && (
                <Link
                  href={`mailto:${personalInfo.email}`}
                  className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-medium hover:opacity-80 transition-opacity text-sm"
                >
                  <Mail size={16} />
                  Send Email
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
      <BottomNav activeItem="contact" />
    </div>
  );
}

