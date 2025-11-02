"use client";
import { Home, Folder, GraduationCap, Briefcase, Wifi } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav({ activeItem }: { activeItem?: string }) {
  const pathname = usePathname();

  const navItems = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "folder", icon: Folder, label: "Projects", path: "/projects" },
    { id: "education", icon: GraduationCap, label: "Education", path: "/education" },
    { id: "work", icon: Briefcase, label: "Work", path: "/experience" },
    { id: "contact", icon: Wifi, label: "Contact", path: "/" },
  ];

  const getActiveItem = () => {
    if (activeItem) return activeItem;
    if (pathname === "/projects") return "folder";
    if (pathname === "/education") return "education";
    if (pathname === "/experience") return "work";
    return "home";
  };

  const currentActive = getActiveItem();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="flex items-center justify-center gap-6 px-6 py-4 backdrop-blur-md bg-white/80 dark:bg-black/60 border-t border-black/10 dark:border-white/10" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentActive === item.id;

          return (
            <Link
              key={item.id}
              href={item.path}
              className="relative flex flex-col items-center justify-center focus:outline-none"
              aria-label={item.label}
            >
              <Icon
                size={20}
                className={`${isActive ? "text-black dark:text-white" : "text-black dark:text-white opacity-70"}`}
                strokeWidth={1.5}
                fill="none"
              />
              {isActive && (
                <div className="absolute -bottom-1.5 w-1.5 h-1.5 bg-green-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

