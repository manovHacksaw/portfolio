"use client";

import { useState, useEffect } from "react";
import {
  Home,
  User,
  FolderOpen,
  Trophy,
  MessageCircle,
  Sun,
  Moon,
  Route,
} from "lucide-react";
import { rubik } from "@/app/fonts";

interface FloatingNavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  theme: string;
  toggleTheme: () => void;
}

export default function FloatingNavbar({
  activeSection,
  onNavigate,
  theme,
  toggleTheme,
}: FloatingNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      const heroHeight = heroSection?.offsetHeight || 0;
      const scrollPosition = window.scrollY;

      setIsScrolled(scrollPosition > 50);
      setShowBottomNav(scrollPosition > heroHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "projects", icon: FolderOpen, label: "Projects" },
    {id: "journey", icon: Route, label: "Journey"},
    { id: "hackathons", icon: Trophy, label: "Hackathons" },
    { id: "contact", icon: MessageCircle, label: "Contact" },
  ];

  return (
    <nav
      className={`
      fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500
      ${
        showBottomNav
          ? "bottom-6 scale-95"
          : "top-6 " + (isScrolled ? "scale-95" : "scale-100")
      }
    `}
    >
      <div
        className={`
        flex items-center space-x-1 px-6 py-3 rounded-full transition-smooth
        ${
          theme === "dark"
            ? `${isScrolled ? "bg-dark/90" : "bg-dark/70"} backdrop-blur-md border-light shadow-dark`
            : `${isScrolled ? "bg-light/90" : "bg-light/70"} backdrop-blur-md border-dark shadow-light`
        }
        hover:shadow-xl
      `}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                relative p-3 rounded-full transition-smooth group scale-hover
                ${
                  isActive
                    ? "bg-accent-primary text-white shadow-light"
                    : theme === "dark"
                      ? "text-muted-light hover:text-light hover-bg-light"
                      : "text-muted-dark hover:text-dark hover-bg-dark"
                }
              `}
              title={item.label}
            >
              <Icon
                size={18}
                className="transition-transform duration-200 group-hover:scale-110"
              />

              {/* Tooltip */}
              <div
                className={`
                absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium ${rubik.className}
                opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
                ${
                  theme === "dark"
                    ? "bg-dark-soft text-light border-light"
                    : "bg-dark text-light"
                }
              `}
              >
                {item.label}
                <div
                  className={`
                  absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45
                  ${theme === "dark" ? "bg-dark-soft border-l border-t border-light" : "bg-dark"}
                `}
                />
              </div>
            </button>
          );
        })}

        {/* Theme Toggle */}
        <div
          className={`w-px h-6 mx-2 ${theme === "dark" ? "border-light" : "border-dark"}`}
        />
        <button
          onClick={toggleTheme}
          className={`
            p-3 rounded-full transition-smooth group scale-hover
            ${
              theme === "dark"
                ? "text-yellow-400 hover:text-yellow-300 hover-bg-light"
                : "text-muted-dark hover:text-dark hover-bg-dark"
            }
          `}
          title={
            theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
          }
        >
          {theme === "dark" ? (
            <Sun
              size={18}
              className="transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12"
            />
          ) : (
            <Moon
              size={18}
              className="transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-12"
            />
          )}

          {/* Tooltip */}
          <div
            className={`
            absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium ${rubik.className}
            opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap
            ${
              theme === "dark"
                ? "bg-dark-soft text-light border-light"
                : "bg-dark text-light"
            }
          `}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
            <div
              className={`
              absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45
              ${theme === "dark" ? "bg-dark-soft border-l border-t border-light" : "bg-dark"}
            `}
            />
          </div>
        </button>
      </div>
    </nav>
  );
}
