"use client";
import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import { mockPortfolioData } from "@/data/mockData";

interface AudioPlayerContextType {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  hasError: boolean;
  togglePlay: () => void;
  handleSeek: (time: number) => void;
  formatTime: (time: number) => string;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const contactPageData = mockPortfolioData.contactPage;
  const audioSrc = contactPageData?.nowPlaying.audioSrc || "/audio/cupid.mp3";

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
        setIsLoading(false);
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    const handleCanPlay = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
      setIsLoading(false);
    };
    
    const handleCanPlayThrough = () => {
      setIsLoading(false);
    };
    
    const handleLoadedData = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
        setIsLoading(false);
      }
    };
    
    const handleError = (e: Event) => {
      setIsLoading(false);
      setHasError(true);
      const error = audio.error;
      if (error) {
        console.error("Audio error:", {
          code: error.code,
          message: error.message,
          MEDIA_ERR_ABORTED: error.MEDIA_ERR_ABORTED,
          MEDIA_ERR_NETWORK: error.MEDIA_ERR_NETWORK,
          MEDIA_ERR_DECODE: error.MEDIA_ERR_DECODE,
          MEDIA_ERR_SRC_NOT_SUPPORTED: error.MEDIA_ERR_SRC_NOT_SUPPORTED,
        });
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    // Check initial state and load if needed
    const checkInitialState = () => {
      if (audio.readyState >= 2 && audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
        setIsLoading(false);
      } else if (audio.readyState >= 1) {
        setIsLoading(false);
      } else {
        // Try to load the audio
        audio.load();
      }
    };

    // Wait a tick to ensure audio element is mounted
    setTimeout(checkInitialState, 100);

    // Fallback: Set a timeout to stop loading if audio takes too long
    const loadingTimeout = setTimeout(() => {
      if (audio.readyState >= 2) {
        // Metadata loaded
        if (audio.duration && !isNaN(audio.duration)) {
          setDuration(audio.duration);
        }
        setIsLoading(false);
      } else if (audio.readyState >= 1) {
        // Some data loaded
        setIsLoading(false);
      }
    }, 5000); // 5 second timeout

    return () => {
      clearTimeout(loadingTimeout);
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      });
    }
  };

  const handleSeek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        currentTime,
        duration,
        isLoading,
        hasError,
        togglePlay,
        handleSeek,
        formatTime,
      }}
    >
      {children}
      {/* Hidden audio element - persists across route changes */}
      <audio ref={audioRef} preload="auto" style={{ display: "none" }}>
        <source src={audioSrc} type="audio/mpeg" />
        <source src={audioSrc.replace('.mp3', '.m4a')} type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return context;
}

