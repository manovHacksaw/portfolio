// Bleeds to the true viewport edge with the standard "break out of a
// centered container" trick (left-1/2 + w-screen + -translate-x-1/2, all
// viewport-relative) so its horizontal dashed borders read as full-page
// guides regardless of how deeply this is nested — a fixed negative-margin
// value can't do that, since the right offset changes continuously with
// viewport width, not just at breakpoints.
export default function DotGridBanner({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative left-1/2 h-40 w-screen -translate-x-1/2 border-y border-dashed border-[var(--foreground-border)] sm:h-56 ${className}`}
    >
      {/* The dot texture is confined to the same 720px column as the page's
          content (unlike the border above, which bleeds full width) and
          uses a flat, unfaded pattern — a plain, evenly-dense grid, not a
          fade to transparent. Sized/centered to match the content column,
          inset by a small margin on all four sides so the dots don't touch
          the border lines. */}
      <div className="bg-dot-grid absolute left-1/2 top-4 bottom-4 w-[calc(100%-2rem)] max-w-[calc(720px-2rem)] -translate-x-1/2" />
    </div>
  );
}
