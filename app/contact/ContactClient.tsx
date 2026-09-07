"use client";
import { motion } from "framer-motion";
import Header from "../../components/layout/Header";
import BottomNav from "../../components/layout/BottomNav";
import DotGridBanner from "@/components/sections/DotGridBanner";
import { mockPortfolioData } from "@/data/mockData";
import { Mail, MapPin, Github, Linkedin, Instagram, ArrowUpRight, ExternalLink, Music2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import AnimatedText from "@/components/motion/AnimatedText";
import AnimatedLink from "@/components/motion/AnimatedLink";
import MagneticButton from "@/components/motion/MagneticButton";
import { fadeUp, stagger } from "@/components/motion/variants";

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

        setSpotifyStatus(status);
        setHasLoadedOnce(true);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to fetch Spotify status:', err);
        }
        setHasLoadedOnce(true);
      } finally {
        setIsLoadingSpotify(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const githubLink = portfolioLinks.find(link => link.icon === 'github');
  const linkedInLink = portfolioLinks.find(link => link.icon === 'linkedin');
  const emailHref = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(personalInfo.email)}`;

  const socialLinks = [
    { id: 'email', icon: Mail, label: 'Email', href: emailHref },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: linkedInLink?.url },
    { id: 'github', icon: Github, label: 'GitHub', href: githubLink?.url },
    { id: 'instagram', icon: Instagram, label: 'Instagram', href: contactPageData?.socialLinks.instagram },
  ].filter((l) => l.href && l.href !== '#');

  return (
    <div className="min-h-screen pb-28 sm:pb-24">
      <DotGridBanner />
      <main className="mx-auto max-w-4xl border-x border-dashed border-[var(--foreground-border)] px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8">
        <Header />
        <motion.div
          className="mt-8 flex flex-col gap-16 sm:mt-10"
          initial="hidden"
          animate="visible"
          variants={stagger(0.12)}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <AnimatedText
              as="h1"
              text={contactPageData?.header.title || "Let's work together."}
              className="max-w-xl text-3xl font-medium leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl"
            />
            {contactPageData?.header.subheading && (
              <p className="text-base font-medium text-[var(--foreground)] sm:text-lg">
                {contactPageData.header.subheading}
              </p>
            )}
            <p className="max-w-md text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base">
              {contactPageData?.header.description ||
                "Have a project, an idea, or just want to talk shop? Send me a message."}
            </p>
            <MagneticButton className="mt-2 w-fit">
              <Link
                href={emailHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-label="Say hi"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-85"
              >
                Send an email
                <ArrowUpRight size={15} />
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeUp} className="flex flex-col">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <div key={link.id}>
                  <AnimatedLink
                    href={link.href!}
                    target={link.href?.startsWith('http') ? '_blank' : undefined}
                    rel={link.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex w-full items-center justify-between py-4"
                  >
                    <span className="flex items-center gap-3 text-base font-medium text-[var(--foreground)] sm:text-lg">
                      <Icon size={18} strokeWidth={1.75} />
                      {link.label}
                    </span>
                    <ArrowUpRight size={16} className="shrink-0 text-[var(--foreground-muted)]" />
                  </AnimatedLink>
                  {index < socialLinks.length - 1 && (
                    <div className="border-t border-[var(--foreground-border)]" />
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Now Playing */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-t border-[var(--foreground-border)] pt-6">
              <span className="label-mono">Now playing</span>
              {spotifyStatus?.isPlaying && (
                <motion.span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--accent)' }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              )}
            </div>

            {isLoadingSpotify ? (
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 shrink-0 animate-pulse rounded-xl bg-[var(--foreground-border)] sm:h-24 sm:w-24" />
                <div className="flex flex-1 flex-col gap-2">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--foreground-border)]" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-[var(--foreground-border)]" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {spotifyStatus?.albumArt ? (
                  <Link
                    href={spotifyStatus.trackUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-label="Play"
                    className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[var(--foreground-border)] sm:h-24 sm:w-24"
                  >
                    <Image
                      src={spotifyStatus.albumArt}
                      alt={spotifyStatus.album || 'Album art'}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                ) : (
                  <Link
                    href={spotifyStatus?.trackUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl sm:h-24 sm:w-24"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    <Music2 size={28} className="text-[var(--accent-foreground)]" />
                  </Link>
                )}

                <div className="flex min-w-0 flex-col gap-1">
                  <Link
                    href={spotifyStatus?.trackUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-0 items-center gap-1.5"
                  >
                    <span className="truncate text-base font-medium text-[var(--foreground)] group-hover:underline sm:text-lg">
                      {spotifyStatus?.title || contactPageData?.nowPlaying.title || 'Not playing'}
                    </span>
                    <ExternalLink size={13} className="shrink-0 text-[var(--foreground-muted)] opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                  <span className="truncate text-sm text-[var(--foreground-muted)]">
                    {spotifyStatus?.artist || contactPageData?.nowPlaying.artist}
                  </span>
                  {spotifyStatus?.spotifyUrl && (
                    <Link
                      href={spotifyStatus.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center gap-2 text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                    >
                      {spotifyStatus.profileImage && (
                        <span className="relative h-4 w-4 shrink-0 overflow-hidden rounded-full">
                          <Image src={spotifyStatus.profileImage} alt="" fill className="object-cover" />
                        </span>
                      )}
                      {spotifyStatus.displayName || 'Spotify Profile'}
                    </Link>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-start justify-between gap-3 border-t border-[var(--foreground-border)] pt-6 text-sm text-[var(--foreground-muted)] sm:flex-row sm:items-center"
          >
            <span>© {new Date().getFullYear()} {personalInfo.name}</span>
            <span className="flex items-center gap-2">
              <MapPin size={14} />
              {personalInfo.location} {personalInfo.locationFlag}
            </span>
          </motion.div>
        </motion.div>
      </main>
      <DotGridBanner />
      <BottomNav activeItem="contact" />
    </div>
  );
}
