"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SpotifyPlaylistProps {
  playlistId?: string;
  title?: string;
  height?: string;
  theme?: "0" | "1"; // 0 = dark, 1 = light
}

export default function SpotifyPlaylist({ 
  playlistId, 
  title = "My Top Tracks Playlist",
  height = "360px",
  theme = "0"
}: SpotifyPlaylistProps) {
  const [playlistIdState, setPlaylistIdState] = useState<string | null>(playlistId || null);
  const [isLoading, setIsLoading] = useState(!playlistId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If playlistId is not provided, create one from top tracks
    if (!playlistId && !playlistIdState) {
      createPlaylistFromTopTracks();
    }
  }, [playlistId, playlistIdState]);

  const createPlaylistFromTopTracks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/spotify/create-playlist?time_range=long_term&limit=5', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        // Extract error message from API response
        const errorMessage = data.error || data.details || `Failed to create playlist (${response.status})`;
        console.error('Playlist creation error:', {
          status: response.status,
          error: data.error,
          details: data.details,
          fullResponse: data,
        });
        throw new Error(errorMessage);
      }

      if (!data.playlistId) {
        throw new Error('Playlist ID not returned from API');
      }

      setPlaylistIdState(data.playlistId);
    } catch (err) {
      console.error('Error creating playlist:', err);
      setError(err instanceof Error ? err.message : 'Failed to load playlist');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center" style={{ minHeight: height }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[var(--nav-accent)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[var(--foreground-muted)]">Loading playlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center p-8" style={{ minHeight: height }}>
        <div className="text-center">
          <p className="text-sm text-[var(--foreground-muted)] mb-2">{error}</p>
          <button
            onClick={createPlaylistFromTopTracks}
            className="px-4 py-2 text-sm bg-[var(--foreground)] text-[var(--background)] rounded hover:opacity-80 transition-opacity"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!playlistIdState) {
    return null;
  }

  return (
    <motion.div
      className="w-full rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <iframe
        title={`Spotify Embed: ${title}`}
        src={`https://open.spotify.com/embed/playlist/${playlistIdState}?utm_source=generator&theme=${theme}`}
        width="100%"
        height={height}
        style={{ minHeight: height }}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-lg"
      />
    </motion.div>
  );
}

