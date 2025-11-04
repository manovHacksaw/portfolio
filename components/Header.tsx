"use client";
import { Settings, Circle, Lightbulb, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
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
  const [accentIndex, setAccentIndex] = useState(0);
  const splashAudioRef = useRef<HTMLAudioElement | null>(null);

  // Pastel accent colors: red, blue, green, orange, lavender
  const accentColors = [
    { name: 'red', value: '#ff9a9e', navColor: '#ff4444' },      // Pastel red → Bright red
    { name: 'blue', value: '#a8c5ff', navColor: '#00d9ff' },     // Pastel blue → Bright cyan
    { name: 'green', value: '#a8e6cf', navColor: '#00ff88' },    // Pastel green → Bright mint
    { name: 'orange', value: '#ffd3a5', navColor: '#ff8800' },   // Pastel orange → Bright amber
    { name: 'lavender', value: '#c7b9ff', navColor: '#aa44ff' }, // Pastel lavender → Bright purple
  ];

  useEffect(() => {
    setMounted(true);
    // Initialize audio element
    splashAudioRef.current = new Audio('/splash.mp3');
    splashAudioRef.current.preload = 'auto';
    
    // Load accent color preference from localStorage
    const savedAccentIndex = localStorage.getItem('accentColorIndex');
    if (savedAccentIndex !== null) {
      const index = parseInt(savedAccentIndex, 10);
      if (index >= 0 && index < accentColors.length) {
        setAccentIndex(index);
        updateAccentColor(index);
      }
    } else {
      updateAccentColor(2); // Default to green (index 2)
      setAccentIndex(2);
    }

    // Cleanup audio on unmount
    return () => {
      if (splashAudioRef.current) {
        splashAudioRef.current.pause();
        splashAudioRef.current = null;
      }
    };
  }, []);

  // Helper function to lighten a color (mix with white)
  const lightenColor = (hex: string, percentage: number): string => {
    const hexClean = hex.replace('#', '');
    const r = parseInt(hexClean.substring(0, 2), 16);
    const g = parseInt(hexClean.substring(2, 4), 16);
    const b = parseInt(hexClean.substring(4, 6), 16);
    
    // Mix with white (255, 255, 255) based on percentage
    // percentage: 0 = original color, 100 = white
    const newR = Math.round(r + (255 - r) * (percentage / 100));
    const newG = Math.round(g + (255 - g) * (percentage / 100));
    const newB = Math.round(b + (255 - b) * (percentage / 100));
    
    return `rgb(${newR}, ${newG}, ${newB})`;
  };

  // Helper function to darken a color (mix with black)
  const darkenColor = (hex: string, percentage: number): string => {
    const hexClean = hex.replace('#', '');
    const r = parseInt(hexClean.substring(0, 2), 16);
    const g = parseInt(hexClean.substring(2, 4), 16);
    const b = parseInt(hexClean.substring(4, 6), 16);
    
    // Mix with black (0, 0, 0) based on percentage
    // percentage: 0 = original color, 100 = black
    const newR = Math.round(r * (1 - percentage / 100));
    const newG = Math.round(g * (1 - percentage / 100));
    const newB = Math.round(b * (1 - percentage / 100));
    
    return `rgb(${newR}, ${newG}, ${newB})`;
  };

  // Update accent color CSS variable
  const updateAccentColor = (index: number) => {
    const root = document.documentElement;
    const color = accentColors[index];
    root.style.setProperty('--accent', color.value);
    root.style.setProperty('--nav-accent', color.navColor); // Bright techy color for BottomNav
    
    // Create dark shade of accent color (for text/borders, ~40% darker)
    const darkAccentColor = darkenColor(color.value, 40);
    root.style.setProperty('--accent-dark', darkAccentColor);
    
    // Update background to be a very light shade of accent color in light mode
    if (resolvedTheme === 'light') {
      // Mix accent color with white at ~92% white (very light shade)
      const lightBgColor = lightenColor(color.value, 92);
      root.style.setProperty('--background', lightBgColor);
    } else {
      // Dark mode: keep black background
      root.style.setProperty('--background', '#000000');
    }
  };

  // Update background tint when theme changes
  useEffect(() => {
    if (mounted) {
      updateAccentColor(accentIndex);
    }
  }, [resolvedTheme, accentIndex, mounted]);

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
      <div className="w-full px-5 flex items-center justify-between gap-2">
        {/* Left side - @manovmandal /ROUTE */}
        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-shrink">
          <h1 className="text-[var(--foreground)] text-[11px] sm:text-base font-light whitespace-nowrap">
            @manovmandal
          </h1>
          {pathname !== "/" && (
            <span className="text-[var(--foreground-secondary)] text-[10px] sm:text-base font-light truncate max-w-[120px] sm:max-w-none">
              {pathname.toUpperCase()}
            </span>
          )}
        </div>

        {/* Right side - Indicator and Time */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Circular indicator - clickable to cycle accent colors */}
          <button
            onClick={() => {
              const nextIndex = (accentIndex + 1) % accentColors.length;
              setAccentIndex(nextIndex);
              updateAccentColor(nextIndex);
              localStorage.setItem('accentColorIndex', nextIndex.toString());
            }}
            className="cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
            aria-label="Cycle accent color"
          >
            <Circle 
              size={12} 
              fill="currentColor" 
              className={`text-[var(--accent)] ${isAnimating ? 'animate-bounce-twice' : ''} sm:w-4 sm:h-4`}
            />
          </button>
          
          {/* Timestamp - Hide on very small screens, show compact on mobile */}
          <span className="text-[var(--foreground)] text-[9px] sm:text-sm font-semibold whitespace-nowrap">
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
          onClick={(e) => {
            if (mounted) {
              const root = document.documentElement;
              const newTheme = resolvedTheme === "dark" ? "light" : "dark";
              
              // Play splash sound effect
              if (splashAudioRef.current) {
                splashAudioRef.current.currentTime = 0; // Reset to start
                splashAudioRef.current.play().catch((err) => {
                  // Ignore audio play errors (user interaction required on some browsers)
                  console.log('Audio play failed:', err);
                });
              }
              
              // Calculate lightbulb position for splash origin (for both light and dark mode)
              const button = e.currentTarget;
              const rect = button.getBoundingClientRect();
              const buttonCenterX = rect.left + rect.width / 2;
              const buttonCenterY = rect.top + rect.height / 2;
              
              // Convert to percentage of viewport
              const originX = (buttonCenterX / window.innerWidth) * 100;
              const originY = (buttonCenterY / window.innerHeight) * 100;
              
              // Set CSS variables for splash origin
              root.style.setProperty('--splash-origin-x', `${originX}%`);
              root.style.setProperty('--splash-origin-y', `${originY}%`);
              
              // Trigger splash animation from lightbulb for both themes
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
                // Set the splash color to the same very light shade as the background
                const currentColor = accentColors[accentIndex];
                const lightBgColor = lightenColor(currentColor.value, 92);
                root.style.setProperty('--splash-color', lightBgColor);
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

