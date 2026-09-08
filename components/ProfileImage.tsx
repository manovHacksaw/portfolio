"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import ProfileImageModal from "./ProfileImageModal";

interface ProfileImageProps {
  src: string;
  alt: string;
}

// Fixed 100x100, rounded-2xl, bordered box that never changes size/position
// — only its content crossfades between photos. Purely presentational: the
// current photo and the rotate-button are owned by ProfileHeader, since the
// rotate button lives beside the image (not on it), not inside this box.
export default function ProfileImage({ src, alt }: ProfileImageProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        aria-label={`View larger photo of ${alt}`}
        className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-2xl border border-[var(--foreground-border)] bg-[var(--surface)]"
      >
        {/* No `mode="wait"` here on purpose: both the outgoing and incoming
            photo render simultaneously so they crossfade into each other,
            instead of a fade-to-blank-then-fade-in gap. */}
        <AnimatePresence>
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image src={src} alt={alt} fill sizes="100px" className="object-cover" priority />
          </motion.div>
        </AnimatePresence>
      </button>

      <ProfileImageModal open={modalOpen} onClose={() => setModalOpen(false)} src={src} alt={alt} />
    </>
  );
}
