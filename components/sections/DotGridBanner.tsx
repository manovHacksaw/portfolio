export default function DotGridBanner({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`bg-dot-grid-fade h-40 w-full border-y border-dashed border-[var(--foreground-border)] sm:h-56 ${className}`}
    />
  );
}
