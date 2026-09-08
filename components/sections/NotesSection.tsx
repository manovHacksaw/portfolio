"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SiX } from "react-icons/si";
import { ArrowUpRight } from "lucide-react";
import { Note } from "@/types/portfolio.types";
import SectionReveal from "../motion/SectionReveal";
import { fadeUp, stagger } from "../motion/variants";

interface NotesSectionProps {
  notes: Note[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Real excerpts pulled from the actual posts (see mockData.ts) — cards link
// out to the source rather than claiming to reproduce it in full, since a
// couple of these are truncated previews, not the complete post.
export default function NotesSection({ notes }: NotesSectionProps) {
  if (notes.length === 0) return null;

  return (
    <section className="w-full py-8 sm:py-10">
      <SectionReveal variants={fadeUp} className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
          Notes
        </h2>
      </SectionReveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger(0.1)}
        className="flex flex-col"
      >
        {notes.map((note) => (
          <motion.div key={note.id} variants={fadeUp} className="flex flex-col gap-3 py-5 sm:flex-row sm:gap-5">
            {note.imageUrl && (
              <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl border border-[var(--foreground-border)] bg-[var(--surface)] sm:h-28 sm:w-28">
                <Image src={note.imageUrl} alt="" fill className="object-cover" />
              </div>
            )}

            <div className="flex flex-1 flex-col gap-3">
              <p className="text-sm leading-relaxed text-[var(--foreground-secondary)]">{note.excerpt}</p>
              <div className="flex items-center justify-between gap-3">
                <span className="label-mono shrink-0">{formatDate(note.date)}</span>
                <Link
                  href={note.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--foreground)] transition-opacity hover:opacity-70"
                >
                  <SiX size={12} />
                  Read on X
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
