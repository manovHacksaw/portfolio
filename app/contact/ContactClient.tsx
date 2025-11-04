"use client";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { mockPortfolioData } from "@/data/mockData";
import { Mail, MapPin, Github, Linkedin, Instagram, ArrowRight, ArrowLeftRight, Flame, Music2, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SpotifyPlaylist from "@/components/SpotifyPlaylist";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface SpotifyStatus {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  trackUrl?: string;
  progress?: number;
  duration?: number;
  displayName?: string;
  followers?: number;
  product?: string;
  spotifyUrl?: string;
  profileImage?: string;
  playedAt?: string;
}

export default function ContactClient() {
  const personalInfo = mockPortfolioData.personalInfo;
  const portfolioLinks = mockPortfolioData.portfolioLinks;
  const contactPageData = mockPortfolioData.contactPage;
  const { resolvedTheme } = useTheme();
  
  const [spotifyStatus, setSpotifyStatus] = useState<SpotifyStatus | null>(null);
  const [isLoadingSpotify, setIsLoadingSpotify] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    // Fetch Spotify status
    const fetchStatus = async () => {
      // Only show loading skeleton on initial load
      if (!hasLoadedOnce) {
        setIsLoadingSpotify(true);
      }
      try {
        const [nowPlayingRes, profileRes, recentlyPlayedRes] = await Promise.all([
          fetch('/api/spotify/now-playing'),
          fetch('/api/spotify/profile'),
          fetch('/api/spotify/recently-played?limit=1'),
        ]);
        
        // Handle errors gracefully - allow now-playing to work even if profile fails
        let nowPlaying: { isPlaying: boolean; title?: string; artist?: string; album?: string; albumArt?: string; trackUrl?: string; progress?: number; duration?: number } = { isPlaying: false };
        let profile: { displayName?: string | null; followers?: number; product?: string; spotifyUrl?: string | null; images?: Array<{ url: string; height?: number; width?: number }> } = { displayName: null, followers: 0, product: 'free', spotifyUrl: null, images: [] };
        let recentlyPlayed: { tracks?: Array<{ name?: string; artist?: string; album?: string; albumArt?: string; trackUrl?: string; duration?: number; playedAt?: string }> } | null = null;
        
        if (nowPlayingRes.ok) {
          try {
            const data = await nowPlayingRes.json();
            nowPlaying = { isPlaying: false, ...data };
          } catch (e) {
            console.error('Failed to parse now-playing response:', e);
          }
        } else {
          const errorData = await nowPlayingRes.json().catch(() => ({}));
          console.error('Now-playing API failed:', nowPlayingRes.status, errorData);
        }
        
        if (profileRes.ok) {
          try {
            const data = await profileRes.json();
            profile = { displayName: null, followers: 0, product: 'free', spotifyUrl: null, images: [], ...data };
          } catch (e) {
            console.error('Failed to parse profile response:', e);
          }
        } else {
          const errorData = await profileRes.json().catch(() => ({}));
          console.error('Profile API failed:', profileRes.status, errorData);
        }
        
        if (recentlyPlayedRes.ok) {
          try {
            recentlyPlayed = await recentlyPlayedRes.json();
          } catch (e) {
            console.error('Failed to parse recently-played response:', e);
          }
        } else {
          const errorData = await recentlyPlayedRes.json().catch(() => ({}));
          console.error('Recently-played API failed:', recentlyPlayedRes.status, errorData);
        }
        
        console.log('Spotify data fetched:', { nowPlaying, profile, recentlyPlayed });
        
        // If currently playing, use that data
        // Otherwise, use the most recently played track
        const isCurrentlyPlaying = nowPlaying.isPlaying || false;
        const lastPlayedTrack = recentlyPlayed?.tracks?.[0];
        
        const status: SpotifyStatus = {
          isPlaying: isCurrentlyPlaying,
          title: isCurrentlyPlaying 
            ? nowPlaying.title 
            : (lastPlayedTrack?.name || contactPageData?.nowPlaying.title),
          artist: isCurrentlyPlaying 
            ? nowPlaying.artist 
            : (lastPlayedTrack?.artist || contactPageData?.nowPlaying.artist),
          album: isCurrentlyPlaying ? nowPlaying.album : lastPlayedTrack?.album,
          albumArt: isCurrentlyPlaying 
            ? nowPlaying.albumArt 
            : (lastPlayedTrack?.albumArt || ''),
          trackUrl: isCurrentlyPlaying 
            ? nowPlaying.trackUrl 
            : (lastPlayedTrack?.trackUrl || contactPageData?.nowPlaying.spotifyUrl),
          progress: isCurrentlyPlaying ? nowPlaying.progress : undefined,
          duration: isCurrentlyPlaying 
            ? nowPlaying.duration 
            : (lastPlayedTrack?.duration || undefined),
          displayName: profile.displayName || undefined,
          followers: profile.followers,
          product: profile.product,
          spotifyUrl: profile.spotifyUrl || undefined,
          profileImage: (profile.images && profile.images.length > 0) 
            ? (profile.images[0]?.url || profile.images[1]?.url) 
            : undefined,
          playedAt: lastPlayedTrack?.playedAt,
        };
        
        console.log('Setting Spotify status:', status);
        setSpotifyStatus(status);
        setHasLoadedOnce(true);
      } catch (err) {
        console.error('Failed to fetch Spotify status:', err);
        setHasLoadedOnce(true);
      } finally {
        setIsLoadingSpotify(false);
      }
    };

    fetchStatus();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Get specific links
  const githubLink = portfolioLinks.find(link => link.icon === 'github');
  const linkedInLink = portfolioLinks.find(link => link.icon === 'linkedin');
  const emailLink = portfolioLinks.find(link => link.icon === 'email');

  // Note: Audio player removed - showing only Spotify track info

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
        <motion.div
          className="max-w-4xl mx-auto flex flex-col gap-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
              },
            },
          }}
        >
          
          {/* Let's Work Together Section */}
          <motion.div
            className="flex flex-col items-center gap-6"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              },
            }}
          >
            <motion.h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--foreground)] text-center"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
            >
              {contactPageData?.header.title || "Let's Work Together"}
            </motion.h1>
            
            {/* Profile Pictures with Arrow */}
            <motion.div
              className="flex items-center gap-4"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
            >
              {/* Left Profile Picture */}
              <motion.div
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border border-[var(--foreground-border)]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </motion.div>
              
              {/* Double Arrow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <ArrowLeftRight size={24} className="text-[var(--foreground)] shrink-0" />
              </motion.div>
              
              {/* Right Placeholder */}
              <motion.div
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-[var(--background)] border border-[var(--foreground-border)] flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 border-2 border-[var(--foreground)] rounded-full opacity-50" />
              </motion.div>
            </motion.div>
            
            {/* Subheading */}
            <motion.h2
              className="text-lg sm:text-xl font-medium text-[var(--foreground)] text-center"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
            >
              {contactPageData?.header.subheading || "Suggestion/Idea/Thought?"}
            </motion.h2>
            
            {/* Description */}
            <motion.p
              className="text-sm sm:text-sm text-[var(--foreground-muted)] font-light text-center max-w-lg"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 0.7,
                    delay: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
            >
              {contactPageData?.header.description || "Let's create the website you've always wanted. Send me a message to begin."}
            </motion.p>
            
            {/* Flame Icon */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    delay: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link href={`mailto:${personalInfo.email}`} className="mt-2 hover:opacity-80 transition-opacity">
                <Flame size={32} className="text-[var(--nav-accent)]" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Social Links Section */}
          <motion.div
            className="flex flex-col"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {socialLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <motion.div
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.6,
                        ease: [0.25, 0.1, 0.25, 1],
                      },
                    },
                  }}
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
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
                  </motion.div>
                  {index < socialLinks.length - 1 && (
                    <div className="border-t border-[var(--foreground-border)]" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Now Playing Section */}
          <motion.div
            className="flex flex-col gap-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              },
            }}
          >
            <motion.div
              className="flex items-center gap-2"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
            >
              <h2 className="text-lg sm:text-xl font-medium text-[var(--foreground)]">
                Spotify
              </h2>
              {spotifyStatus?.isPlaying && (
                <motion.span
                  className="text-lg sm:text-xl text-[var(--foreground)]"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  ♪
                </motion.span>
              )}
            </motion.div>
            
            <div className="border-t border-[var(--foreground-border)] pt-4">
              {isLoadingSpotify ? (
                // Loading Skeleton
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Album Art Skeleton */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 rounded-lg bg-[var(--foreground-border)] shrink-0 animate-pulse" />
                  
                  {/* Content Skeleton */}
                  <div className="flex-1 flex flex-col gap-1.5 sm:gap-2 min-w-0">
                    {/* Title Skeleton */}
                    <div className="h-4 sm:h-5 w-3/4 bg-[var(--foreground-border)] rounded animate-pulse" style={{ animationDelay: '0.1s' }} />
                    {/* Artist Skeleton */}
                    <div className="h-3 sm:h-4 w-1/2 bg-[var(--foreground-border)] rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
                    {/* Links Skeleton */}
                    <div className="h-3 w-1/3 bg-[var(--foreground-border)] rounded mt-1 animate-pulse" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              ) : (
                <motion.div
                  className="flex flex-col gap-4"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className="flex items-start gap-3 sm:gap-4"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                          ease: [0.25, 0.1, 0.25, 1],
                        },
                      },
                    }}
                  >
                    {/* Album Art or Spotify Icon */}
                    {spotifyStatus?.albumArt ? (
                    <motion.a
                      href={spotifyStatus.trackUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 rounded-lg overflow-hidden border border-[var(--foreground-border)] shrink-0 group"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        src={spotifyStatus.albumArt}
                        alt={spotifyStatus.album || 'Album art'}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-[var(--nav-accent)]/0 group-hover:bg-[var(--nav-accent)]/20 transition-colors flex items-center justify-center">
                        <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.a>
                  ) : (
                    <motion.div
                      className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg bg-[var(--nav-accent)] shrink-0"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.359.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.78-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </motion.div>
                  )}
                  
                  {/* Song Info */}
                  <motion.div
                    className="flex-1 flex flex-col gap-1 sm:gap-1.5 min-w-0"
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.6,
                          delay: 0.1,
                          ease: [0.25, 0.1, 0.25, 1],
                        },
                      },
                    }}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                      {spotifyStatus?.isPlaying && (
                        <motion.div
                          className="flex gap-0.5 items-end shrink-0"
                          animate={{ opacity: [1, 0.6, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <motion.div
                            className="w-0.5 h-1.5 bg-[var(--nav-accent)] rounded-full"
                            animate={{ height: [6, 10, 6] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-0.5 h-2 bg-[var(--nav-accent)] rounded-full"
                            animate={{ height: [8, 12, 8] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                          />
                          <motion.div
                            className="w-0.5 h-1.5 bg-[var(--nav-accent)] rounded-full"
                            animate={{ height: [6, 9, 6] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                        </motion.div>
                      )}
                      <span 
                        className="text-sm sm:text-base md:text-lg font-medium text-[var(--nav-accent)] truncate"
                      >
                        {spotifyStatus?.title || contactPageData?.nowPlaying.title || "Cupid"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm text-[var(--foreground-muted)] font-light">
                        {spotifyStatus?.artist || contactPageData?.nowPlaying.artist || "FIFTY FIFTY"}
                      </span>
                      {spotifyStatus?.duration !== undefined && (
                        <>
                          <span className="text-xs text-[var(--foreground-muted)] hidden sm:inline">•</span>
                          <span className="text-xs text-[var(--foreground-muted)] font-mono">
                            {Math.floor((spotifyStatus.duration || 0) / 1000 / 60)}:
                            {String(Math.floor(((spotifyStatus.duration || 0) / 1000) % 60)).padStart(2, '0')}
                          </span>
                        </>
                      )}
                      {spotifyStatus?.isPlaying ? (
                        <span className="text-xs text-[var(--nav-accent)] font-medium">• Now playing</span>
                      ) : spotifyStatus?.title ? (
                        <>
                          <span className="text-xs text-[var(--foreground-muted)]">• Last played</span>
                          {spotifyStatus?.playedAt && (
                            <span className="text-xs text-[var(--foreground-muted)]">
                              {(() => {
                                const playedTime = new Date(spotifyStatus.playedAt);
                                const now = new Date();
                                const diffMs = now.getTime() - playedTime.getTime();
                                const diffMins = Math.floor(diffMs / 60000);
                                const diffHours = Math.floor(diffMs / 3600000);
                                const diffDays = Math.floor(diffMs / 86400000);
                                
                                if (diffMins < 1) return 'just now';
                                if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
                                if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
                                return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
                              })()}
                            </span>
                          )}
                        </>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mt-0.5 sm:mt-1">
                      {spotifyStatus?.trackUrl && (
                        <a
                          href={spotifyStatus.trackUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[var(--foreground-muted)] hover:text-[var(--nav-accent)] transition-colors underline"
                        >
                          Track →
                        </a>
                      )}
                      {spotifyStatus?.spotifyUrl && (
                        <>
                          {spotifyStatus?.trackUrl && (
                            <span className="text-xs text-[var(--foreground-muted)] hidden sm:inline">•</span>
                          )}
                          <a
                            href={spotifyStatus.spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[var(--foreground-muted)] hover:text-[var(--nav-accent)] transition-colors underline flex items-center gap-1 sm:gap-1.5"
                          >
                            {spotifyStatus?.profileImage ? (
                              <Image
                                src={spotifyStatus.profileImage}
                                alt={spotifyStatus.displayName || 'Spotify Profile'}
                                width={14}
                                height={14}
                                className="sm:w-4 sm:h-4 rounded-full object-cover shrink-0"
                                unoptimized
                              />
                            ) : null}
                            <span className="truncate">{spotifyStatus.displayName || 'Spotify'}</span>
                            <ExternalLink size={10} className="shrink-0" />
                          </a>
                        </>
                      )}
                    </div>
                  </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>

         
          {/* Footer Stats */}
          <motion.div
            className="border-t border-[var(--foreground-border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--foreground-muted)] font-light"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              },
            }}
          >
           <div>  </div>
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <MapPin size={16} />
              <span>{personalInfo.location}</span>
              <span>{personalInfo.locationFlag}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
      <BottomNav activeItem="contact" />
    </div>
  );
}