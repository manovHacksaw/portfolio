import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spotify Authorization Callback',
  description: 'Spotify authorization callback handler',
  robots: 'noindex, nofollow', // Don't index this page
};

export default function CallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; error?: string }>;
}) {
  return (
    <Suspense fallback={<LoadingState />}>
      <CallbackContent searchParams={searchParams} />
    </Suspense>
  );
}

async function CallbackContent({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; error?: string }>;
}) {
  const params = await searchParams;
  const { code, error } = params;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-5">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Authorization Failed
          </h1>
          <p className="text-[var(--foreground-secondary)] mb-6">
            Error: {error}
          </p>
          <p className="text-sm text-[var(--foreground-secondary)]">
            Please try again or contact support if the issue persists.
          </p>
        </div>
      </div>
    );
  }

  if (code) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-5">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto text-green-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Authorization Successful!
          </h1>
          <p className="text-[var(--foreground-secondary)] mb-6">
            Your authorization code has been received.
          </p>
          <div className="bg-[var(--foreground-border)] rounded-lg p-4 mb-6">
            <p className="text-xs text-[var(--foreground-secondary)] mb-2">
              Authorization Code:
            </p>
            <code className="text-sm text-[var(--foreground)] break-all">
              {code}
            </code>
          </div>
          <div className="space-y-2 text-sm text-[var(--foreground-secondary)]">
            <p>📋 Copy the code above</p>
            <p>📋 Run: <code className="bg-[var(--foreground-border)] px-2 py-1 rounded">node scripts/get-refresh-token.js</code></p>
            <p>📋 Paste the code when prompted</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-5">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">
          Waiting for Authorization
        </h1>
        <p className="text-[var(--foreground-secondary)]">
          This page handles Spotify authorization callbacks.
        </p>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="text-[var(--foreground-secondary)]">Loading...</div>
    </div>
  );
}

