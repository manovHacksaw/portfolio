"use client";
import { Quote } from "lucide-react";
import SectionReveal from "../motion/SectionReveal";
import { fadeUp } from "../motion/variants";

interface QuoteSectionProps {
  text: string;
  attribution: string;
}

export default function QuoteSection({ text, attribution }: QuoteSectionProps) {
  return (
    <section className="flex w-full flex-col items-center gap-6 py-10 text-center sm:py-14">
      <SectionReveal variants={fadeUp}>
        <Quote size={28} className="text-[var(--foreground-border)]" fill="currentColor" />
      </SectionReveal>
      <SectionReveal variants={fadeUp} delay={0.1}>
        <p className="max-w-2xl text-xl font-medium italic leading-snug tracking-tight text-[var(--foreground)] sm:text-2xl md:text-3xl">
          &ldquo;{text}&rdquo;
        </p>
      </SectionReveal>
      <SectionReveal variants={fadeUp} delay={0.2} className="flex items-center gap-3">
        <span className="h-px w-8 bg-[var(--foreground-border)]" />
        <span className="label-mono">{attribution}</span>
        <span className="h-px w-8 bg-[var(--foreground-border)]" />
      </SectionReveal>
    </section>
  );
}
