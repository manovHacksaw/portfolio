"use client";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import ProfileImage from "../ProfileImage";
import RotatingTitle from "../RotatingTitle";
import ThemeToggle from "../layout/ThemeToggle";
import ViewCounter from "../ViewCounter";
import { EASE } from "../motion/variants";

interface ProfileHeaderProps {
  name: string;
  titles: string[];
  images: string[];
  verified?: boolean;
}

const fadeUpItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// The identity block: photo + name/rotating-title on the left, theme toggle
// + view counter stacked on the right. Deliberately its own component with
// its own reserved height — BioSection starts below it, not inside it, so
// nothing here (title rotation, image rotation, theme toggle) can ever
// shift the bio/CTAs/socials that follow.
export default function ProfileHeader({ name, titles, images, verified = true }: ProfileHeaderProps) {
  return (
    <motion.div
      className="flex items-start justify-between gap-3 py-3 sm:gap-4 sm:py-4"
      initial="hidden"
      animate="visible"
      variants={fadeUpItem}
    >
      <div className="flex items-end gap-3 sm:gap-4">
        <ProfileImage images={images} alt={name} />

        <div className="flex flex-col gap-0.5 pb-2">
          <h1 className="flex items-center gap-1.5 text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
            {name}
            {verified && (
              <BadgeCheck size={18} className="shrink-0 fill-blue-500 text-white" aria-hidden="true" />
            )}
          </h1>
          <RotatingTitle titles={titles} />
        </div>
      </div>

      {/* Height-matched to the profile image so ViewCounter (bottom) lands
          at the same baseline as the rotating title next to it (both
          nudged up by the same pb-2), while ThemeToggle (top) stays put
          at the header's top edge. */}
      <div className="flex h-[100px] shrink-0 flex-col items-end justify-between pb-2">
        <ThemeToggle />
        <ViewCounter />
      </div>
    </motion.div>
  );
}
