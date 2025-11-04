"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export default function NavbarHint() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, bottom: 0 });
  const hasBeenDismissed = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only show on landing page
    if (pathname !== "/") {
      // User navigated away - store timestamp for 30-minute cooldown
      if (typeof window !== "undefined") {
        localStorage.setItem("navbarHintCooldown", Date.now().toString());
      }
      return;
    }

    // Check if we're in the 30-minute cooldown period
    if (typeof window !== "undefined") {
      const cooldownTimestamp = localStorage.getItem("navbarHintCooldown");
      if (cooldownTimestamp) {
        const cooldownTime = parseInt(cooldownTimestamp, 10);
        const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
        const timeSinceCooldown = Date.now() - cooldownTime;
        
        if (timeSinceCooldown < thirtyMinutes) {
          // Still in cooldown period
          hasBeenDismissed.current = true;
          return;
        } else {
          // Cooldown expired, clear it
          localStorage.removeItem("navbarHintCooldown");
        }
      }
    }

    // Check if hint has been permanently dismissed
    if (typeof window !== "undefined") {
      const dismissed = sessionStorage.getItem("navbarHintDismissed");
      if (dismissed === "true") {
        hasBeenDismissed.current = true;
        return;
      }
    }

    // Function to calculate position of projects icon
    const calculatePosition = () => {
      if (typeof window === "undefined") return;
      
      // Wait a bit for DOM to be ready
      setTimeout(() => {
        // Find the nav element
        const nav = document.querySelector('nav');
        if (!nav) {
          return;
        }

        // Find the projects link by href
        const projectsLink = nav.querySelector('a[href="/projects"]') as HTMLElement;
        if (!projectsLink) {
          // Try finding by index as fallback
          const allLinks = nav.querySelectorAll('a[href]');
          if (allLinks.length >= 2) {
            const fallbackLink = allLinks[1] as HTMLElement;
            const rect = fallbackLink.getBoundingClientRect();
            const iconCenterX = rect.left + rect.width / 2;
            const pointerSize = 20;
            setPosition({
              left: iconCenterX - pointerSize / 2 + 8, // Shift right by 8px
              bottom: window.innerHeight - rect.bottom + 5, // Moved further up
            });
            return;
          }
          return;
        }

        const rect = projectsLink.getBoundingClientRect();
        
        // Position very close to the bottom nav, just above the icon
        // Use rect.bottom (bottom edge of icon) to position pointer just above it
        const iconCenterX = rect.left + rect.width / 2;
        const pointerSize = 20; // Pointer is 20x20 now
        // Position slightly above and to the right of the icon
        const bottomPosition = window.innerHeight - rect.bottom + 35; // Moved further up (positive offset)
        setPosition({
          left: iconCenterX - pointerSize / 2 + 4 , // Shift right by 8px
          bottom: bottomPosition,
        });
        
        // Ensure position is valid (not negative)
        if (bottomPosition < 0 || iconCenterX - pointerSize / 2 < 0) {
          setPosition({
            left: Math.max(0, iconCenterX - pointerSize / 2),
            bottom: Math.max(20, bottomPosition),
          });
        }
      }, 200);
    };

    // Calculate position after a delay to ensure DOM is ready
    const initialTimeout = setTimeout(() => {
      calculatePosition();
    }, 300);

    window.addEventListener('resize', calculatePosition);

    // Show hint after 30 seconds (regardless of interaction)
    timeoutRef.current = setTimeout(() => {
      if (!hasBeenDismissed.current) {
        // Recalculate position before showing
        calculatePosition();
        // Give time for position to be calculated
        setTimeout(() => {
          setIsVisible(true);
        }, 300);
      }
    }, 30000); // 30 seconds

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (initialTimeout) {
        clearTimeout(initialTimeout);
      }
      window.removeEventListener('resize', calculatePosition);
    };
  }, [pathname]);

  const hideHint = () => {
    setIsVisible(false);
    hasBeenDismissed.current = true;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("navbarHintDismissed", "true");
    }
  };

  // Hide only on navbar click
  useEffect(() => {
    if (!isVisible || hasBeenDismissed.current) return;

    // Hide on navbar click
    const handleNavbarClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const navbar = target.closest("nav");
      if (navbar) {
        hideHint();
      }
    };

    document.addEventListener("click", handleNavbarClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleNavbarClick, { capture: true });
    };
  }, [isVisible]);

  if (pathname !== "/") return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed z-[100] pointer-events-none"
          style={{
            left: `${Math.max(0, position.left)}px`,
            bottom: `${Math.max(0, position.bottom)}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative"
            animate={{
              y: [0, -10, 0, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src="/cursors/pointer.png"
              alt="Pointer hint"
              width={20}
              height={20}
              className="drop-shadow-lg"
              style={{
                imageRendering: "pixelated",
                display: "block",
                filter: resolvedTheme === "light" 
                  ? "invert(1) sepia(100%) saturate(500%) hue-rotate(10deg)" 
                  : "sepia(100%) saturate(500%) hue-rotate(10deg)",
                transform: "rotate(180deg)",
              }}
              onError={(e) => {
                // Silently handle image load errors
                if (process.env.NODE_ENV === 'development') {
                  console.error('NavbarHint: Image failed to load', e);
                }
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

