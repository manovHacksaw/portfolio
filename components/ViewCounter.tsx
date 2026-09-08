"use client";
import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";

function formatCount(n: number): string {
  if (n < 1000) return String(n);
  return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
}

/**
 * Real, best-effort page-view count (see app/api/views/route.ts for the
 * storage caveat) — increments once per mount via POST, then displays the
 * server's count. Renders nothing while loading or if the counter is
 * unavailable, rather than showing a placeholder or invented number.
 */
export default function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (hasIncremented.current) return;
    hasIncremented.current = true;

    fetch("/api/views", { method: "POST" })
      .then((res) => (res.ok ? res.json() : { count: null }))
      .then((data) => setCount(typeof data.count === "number" ? data.count : null))
      .catch(() => setCount(null));
  }, []);

  if (count === null) return null;

  return (
    <span className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
      <Eye size={14} strokeWidth={1.75} />
      {formatCount(count)}
    </span>
  );
}
