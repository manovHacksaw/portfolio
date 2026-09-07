export default function DotGridBanner({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`bg-dot-grid-fade h-40 w-full sm:h-56 ${className}`}
    />
  );
}
