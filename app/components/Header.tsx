"use client";
import { Settings, Circle, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export default function Header() {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          <h1 className="text-black dark:text-white text-sm sm:text-base font-light">
            @manovmandal
          </h1>
          {pathname !== "/" && (
            <span className="text-black dark:text-white text-sm sm:text-base font-light opacity-70">
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
            className={`text-black dark:text-white ${isAnimating ? 'animate-bounce-twice' : ''}`}
          />
          
          {/* Timestamp */}
          <span className="text-black dark:text-white text-xs sm:text-sm font-light opacity-70">
            {currentTime}
          </span>

          
        </div>
      </div>

      {/* Horizontal line below everything */}
      <div className="w-full h-px bg-black dark:bg-white opacity-100 mt-3 relative" />
      
      {/* Theme toggle button - positioned below line on the right with connecting wire */}
      <div className="w-full flex justify-end px-[18.2px] mt-1 relative">
        {/* Vertical wire connecting from horizontal line to lightbulb */}
        <div className="absolute right-7 -top-3 w-px h-6 bg-black dark:bg-white opacity-100" />
        
        <button
          className="text-black dark:text-white hover:opacity-80 transition-opacity relative z-10 mt-1.5"
          aria-label="Toggle theme"
          onClick={() => {
            if (mounted) {
              setTheme(resolvedTheme === "dark" ? "light" : "dark");
            }
          }}
        >
          <Lightbulb size={20} className="rotate-180" />
        </button>
      </div>
    </header>
  );
}

