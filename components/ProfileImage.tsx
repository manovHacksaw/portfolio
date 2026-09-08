"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import ProfileImageModal from "./ProfileImageModal";

// Single source of truth for the photo-rotation cadence.
const IMAGE_INTERVAL = 5000;

interface ProfileImageProps {
  images: string[];
  alt: string;
}

// Fixed 100x100, rounded-2xl, bordered box that never changes size/position
// — only its content crossfades between photos. A single-item `images`
// array just renders that one photo with no rotation.
export default function ProfileImage({ images, alt }: ProfileImageProps) {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, IMAGE_INTERVAL);
    return () => clearInterval(id);
  }, [images.length]);

  const current = images[index] ?? images[0];

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
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image src={current} alt={alt} fill sizes="100px" className="object-cover" priority />
          </motion.div>
        </AnimatePresence>
      </button>

      <ProfileImageModal open={modalOpen} onClose={() => setModalOpen(false)} src={current} alt={alt} />
    </>
  );
}
