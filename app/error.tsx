"use client";

import { useEffect } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Route error:", error);
    }

    // In production, you might want to send this to an error reporting service
    // Example: Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-8 bg-[var(--background)]">
      <div className="max-w-md w-full border border-[var(--foreground-border)] rounded-lg p-6 sm:p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle
            size={48}
            className="text-[var(--nav-accent)]"
            strokeWidth={1.5}
          />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-2">
          Something went wrong
        </h2>
        <p className="text-sm sm:text-base text-[var(--foreground-muted)] mb-6">
          {process.env.NODE_ENV === "development"
            ? error.message
            : "An unexpected error occurred. Please try again."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-lg hover:opacity-80 transition-opacity font-medium"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-[var(--foreground-border)] text-[var(--foreground)] rounded-lg hover:bg-[var(--foreground-border)] transition-colors font-medium"
          >
            <Home size={16} />
            <span>Go Home</span>
          </Link>
        </div>
        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 text-left">
            <summary className="text-xs text-[var(--foreground-muted)] cursor-pointer hover:text-[var(--foreground)] mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-xs bg-[var(--foreground-border)] p-3 rounded overflow-auto max-h-48 text-[var(--foreground-muted)]">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

