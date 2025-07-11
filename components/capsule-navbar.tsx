"use client";

import { useState, useEffect } from "react";
import { Home, User, FolderOpen, MessageCircle, Sun, Moon } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "projects", icon: FolderOpen, label: "Projects" },
    { id: "contact", icon: MessageCircle, label: "Contact" },
  ];

  return (
    <nav
      className={`
      fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out
      ${isScrolled ? "scale-95" : "scale-100"}
    `}
    >
      <div
        className={`
        flex items-center space-x-1 px-6 py-3 rounded-full transition-all duration-300
        ${
          theme === "dark"
            ? `${isScrolled ? "bg-gray-900/90" : "bg-gray-900/70"} backdrop-blur-md border border-gray-700/50`
            : `${isScrolled ? "bg-white/90" : "bg-white/70"} backdrop-blur-md border border-gray-200/50`
        }
        shadow-lg hover:shadow-xl
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
                relative p-3 rounded-full transition-all duration-300 group
                ${
                  isActive
                    ? theme === "dark"
                      ? "bg-pink-600 text-white shadow-lg"
                      : "bg-pink-600 text-white shadow-lg"
                    : theme === "dark"
                      ? "text-gray-400 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
                                                absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium
                opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
                ${
                  theme === "dark"
                    ? "bg-gray-800 text-white border border-gray-700"
                    : "bg-gray-900 text-white"
                }
              `}
              >
                {item.label}
                <div
                  className={`
                  absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45
                  ${theme === "dark" ? "bg-gray-800 border-l border-t border-gray-700" : "bg-gray-900"}
                `}
                />
              </div>
            </button>
          );
        })}

        {/* Theme Toggle */}
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
        <button
          onClick={toggleTheme}
          className={`
            p-3 rounded-full transition-all duration-300 group
            ${
              theme === "dark"
                ? "text-yellow-400 hover:text-yellow-300 hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
                                            absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap
            ${
              theme === "dark"
                ? "bg-gray-800 text-white border border-gray-700"
                : "bg-gray-900 text-white"
            }
          `}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
            <div
              className={`
              absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45
              ${theme === "dark" ? "bg-gray-800 border-l border-t border-gray-700" : "bg-gray-900"}
            `}
            />
          </div>
        </button>
      </div>
    </nav>
  );
}
