"use client";
import { Home, Folder, GraduationCap, Briefcase, Trophy, Network, WifiPen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BottomNav({ activeItem }: { activeItem?: string }) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { id: "home", icon: Home, label: t("common.home"), path: "/" },
    { id: "folder", icon: Folder, label: t("common.projects"), path: "/projects" },
    { id: "education", icon: GraduationCap, label: t("common.education"), path: "/education" },
    { id: "work", icon: Briefcase, label: t("common.work"), path: "/experience" },
    { id: "achievements", icon: Trophy, label: t("common.achievements"), path: "/achievements" },
    { id: "contact", icon: WifiPen, label: t("common.contact"), path: "/contact" },
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
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="flex items-center justify-center gap-6 px-6 py-4 backdrop-blur-md bg-[var(--background)]/80" style={{ borderTop: '1px solid var(--foreground-border)', paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentActive === item.id;

          return (
            <Link
              key={item.id}
              href={item.path}
              className="relative flex flex-col items-center justify-center focus:outline-none pb-1"
              aria-label={item.label}
            >
              <Icon
                size={20}
                className={`${isActive ? "text-[var(--foreground)]" : "text-[var(--foreground-muted)]"} mb-1`}
                strokeWidth={1.5}
                fill="none"
              />
              {isActive && (
                <div className="absolute bottom-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--nav-accent)' }} />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

