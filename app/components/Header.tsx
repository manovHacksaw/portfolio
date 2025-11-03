"use client";
import { Settings, Circle, Lightbulb, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastClosing, setToastClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide toast after 5 seconds with fade-out animation
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setToastClosing(true);
        // Remove toast after fade-out animation completes
        setTimeout(() => {
          setShowToast(false);
          setToastClosing(false);
        }, 300); // Match fade-out animation duration
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animation cycle: bounce for 5s, pause, then repeat
    const animateCycle = () => {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 5000); // Animation duration matches CSS (5 seconds)
    };

    // Start first animation
    animateCycle();

    // Repeat animation every 8 seconds (5s animation + 3s pause)
    const animationInterval = setInterval(() => {
      animateCycle();
    }, 8000);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <header className="w-full flex flex-col" style={{ fontFamily: "'Clash Display', sans-serif" }}>
      <div className="w-full px-5 flex items-start justify-between">
        {/* Left side - @manovmandal /ROUTE */}
        <div className="flex items-start gap-2">
          <h1 className="text-[var(--foreground)] text-sm sm:text-base font-light">
            @manovmandal
          </h1>
          {pathname !== "/" && (
            <span className="text-[var(--foreground)] text-sm sm:text-base font-light opacity-70">
              {pathname.toUpperCase()}
            </span>
          )}
        </div>

        {/* Right side - Indicator, Time, and Gear icon */}
        <div className="flex items-center gap-2">
          {/* Circular indicator */}
          <Circle 
            size={16} 
            fill="currentColor" 
            className={`text-[var(--foreground)] ${isAnimating ? 'animate-bounce-twice' : ''}`}
          />
          
          {/* Timestamp */}
          <span className="text-[var(--foreground)] text-xs sm:text-sm font-semibold">
            {currentTime}
          </span>

          
        </div>
      </div>

      {/* Horizontal line below everything */}
      <div className="w-full h-px bg-[var(--foreground)] opacity-100 mt-3 relative" />
      
      {/* Theme toggle button - positioned below line on the right with connecting wire */}
      <div className="w-full flex justify-end px-[18.2px] mt-1 relative">
        {/* Vertical wire connecting from horizontal line to lightbulb */}
        <div className="absolute right-7 -top-3 w-px h-6 bg-[var(--foreground)] opacity-100" />
        
        <button
          className="text-[var(--foreground)] hover:opacity-80 transition-opacity relative z-10 mt-1.5 hover-swing"
          aria-label="Toggle theme"
          onClick={() => {
            if (mounted) {
              const root = document.documentElement;
              const newTheme = resolvedTheme === "dark" ? "light" : "dark";
              
              // Trigger splash animation from bottom-right corner
              // Black splash for dark mode, white splash for light mode
              // Switch theme at 80% (960ms) when 80% screen is covered
              if (newTheme === "dark") {
                root.classList.add('theme-splash-dark');
                setTimeout(() => {
                  setTheme(newTheme); // Switch theme at 80% coverage
                }, 750); // 80% of 1.2s = 960ms
                setTimeout(() => {
                  root.classList.remove('theme-splash-dark'); // Remove after animation completes
                }, 1000);
              } else {
                root.classList.add('theme-splash-light');
                setTimeout(() => {
                  setTheme(newTheme); // Switch theme at 80% coverage
                  // Show toast immediately after theme switch (only once per session)
                  const toastShown = sessionStorage.getItem('lightModeToastShown');
                  if (toastShown !== 'true') {
                    setShowToast(true);
                    sessionStorage.setItem('lightModeToastShown', 'true');
                  }
                }, 750);
                setTimeout(() => {
                  root.classList.remove('theme-splash-light'); // Remove after animation completes
                }, 1000);
              }
            }
          }}
        >
          <Lightbulb size={20} className="rotate-180" />
        </button>
      </div>

      {/* Light Mode Toast - Hidden on mobile, visible on desktop */}
      {showToast && (
        <div className={`fixed bottom-20 right-5 sm:bottom-24 sm:right-6 z-100000 pointer-events-none hidden sm:block ${toastClosing ? 'animate-toast-fade-out' : 'animate-toast-fade-in'}`}>
          <div className="p-0 max-w-[280px] sm:max-w-[320px] relative rounded-md overflow-hidden shadow-none">
            {/* Meme Image only - no bg or border */}
            <Image
              src="/light-mode.jpg"
              alt="Light Mode Meme"
              width={320}
              height={240}
              className="w-full h-auto object-cover rounded-md"
              unoptimized
            />
          </div>
        </div>
      )}
    </header>
  );
}

