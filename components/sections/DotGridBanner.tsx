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
      {/* The dot texture's fade mask lives on its own layer so it doesn't
          also mask out the border above — mask-image affects the whole
          element it's applied to, border included. */}
      <div className="bg-dot-grid-fade absolute inset-0" />
    </div>
  );
}
