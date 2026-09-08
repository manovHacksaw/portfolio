"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Contrast } from "lucide-react";
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
  // Owned here (not inside ProfileImage) since the rotate button sits
  // beside the image, not on it — both need the same current index.
  const [imageIndex, setImageIndex] = useState(0);
  const currentImage = images[imageIndex] ?? images[0];

  return (
    <motion.div
      className="flex items-start justify-between gap-3 py-3 sm:gap-4 sm:py-4"
      initial="hidden"
      animate="visible"
      variants={fadeUpItem}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <ProfileImage src={currentImage} alt={name} />

        {/* Height-matched to the image: rotate button in the top slot
            (beside the image, not overlapping it), name/title nudged to
            the bottom slot so it still lines up with the image's bottom
            edge. Mirrors the ThemeToggle/ViewCounter column on the right. */}
        <div className="flex h-[100px] flex-col justify-between">
          {images.length > 1 ? (
            <button
              type="button"
              onClick={() => setImageIndex((i) => (i + 1) % images.length)}
              aria-label="Show next photo"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--foreground-border)] text-[var(--foreground)] transition-colors hover:border-[var(--foreground)]"
            >
              <Contrast size={13} strokeWidth={1.75} />
            </button>
          ) : (
            <span />
          )}

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
