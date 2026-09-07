"use client";
import { Home, FolderOpen, GraduationCap, Briefcase, Trophy, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function BottomNav({ activeItem }: { activeItem?: string }) {
  const pathname = usePathname();

  const navItems = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "folder", icon: FolderOpen, label: "Projects", path: "/projects" },
    { id: "education", icon: GraduationCap, label: "Education", path: "/education" },
    { id: "work", icon: Briefcase, label: "Experience", path: "/experience" },
    { id: "achievements", icon: Trophy, label: "Achievements", path: "/achievements" },
    { id: "contact", icon: MessageCircle, label: "Contact", path: "/contact" },
  ];

  const getActiveItem = () => {
    if (activeItem) return activeItem;
    if (pathname === "/projects") return "folder";
    if (pathname === "/education") return "education";
    if (pathname === "/experience") return "work";
    if (pathname === "/achievements") return "achievements";
    if (pathname === "/contact") return "contact";
    return "home";
  };

  const currentActive = getActiveItem();

  return (
    <nav
      className="pb-safe fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
      aria-label="Primary"
    >
      <div className="flex items-center gap-1 rounded-full border border-[var(--foreground-border)] bg-[var(--background)]/85 p-1.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentActive === item.id;

          return (
            <Link
              key={item.id}
              href={item.path}
              className="relative flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none sm:h-10 sm:w-auto sm:px-3.5"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 rounded-full bg-[var(--foreground)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon
                  size={17}
                  strokeWidth={1.75}
                  className={isActive ? "text-[var(--background)]" : "text-[var(--foreground-muted)]"}
                />
                {isActive && (
                  <span className="hidden text-xs font-medium text-[var(--background)] sm:inline">
                    {item.label}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
