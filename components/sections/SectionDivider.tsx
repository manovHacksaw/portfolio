// A plain full-bleed horizontal rule for section boundaries that don't need
// the dot texture — same viewport-relative bleed trick as DotGridBanner
// (left-1/2 + w-screen + -translate-x-1/2) so it reads as a full-page guide
// regardless of nesting, instead of stopping at the narrow content column.
export default function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative left-1/2 h-px w-screen -translate-x-1/2 border-t border-dashed border-[var(--foreground-border)] ${className}`}
    />
  );
}
