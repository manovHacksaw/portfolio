/**
 * TypeScript types for API responses
 */

// Spotify API Response Types
export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string; // Optional - may be included in refresh response
  scope?: string; // Scopes granted with the token
}

export interface SpotifyUserProfile {
  id: string;
  display_name: string | null;
  email?: string;
  country?: string;
  images?: Array<{ url: string; height?: number; width?: number }>;
  followers?: {
    total: number;
  };
  product: string;
  external_urls?: {
    spotify: string;
  };
}

export interface SpotifyNowPlayingResponse {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  trackUrl?: string;
  progress?: number;
  duration?: number;
}

export interface SpotifyProfileResponse {
  id?: string;
  displayName: string | null;
  email?: string;
  country?: string;
  images?: Array<{ url: string; height?: number; width?: number }>;
  followers: number;
  product: string;
  spotifyUrl: string | null;
}

export interface SpotifyTrackItem {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  trackUrl: string;
  duration: number;
  playedAt?: string;
}

export interface SpotifyRecentlyPlayedResponse {
  tracks: SpotifyTrackItem[];
  next?: string | null;
  cursors?: {
    after: string;
    before: string;
  } | null;
}

export interface SpotifyTopTrackResponse {
  name: string;
  artist: string;
  artists: Array<{ name: string }>;
  album: string;
  albumArt: string;
  trackUrl: string;
  duration: number;
  popularity: number;
}

export interface SpotifyTopTracksResponse {
  tracks: SpotifyTopTrackResponse[];
  timeRange: string;
  limit: number;
}

export interface SpotifyPlaylistResponse {
  id: string;
  name: string;
  description?: string;
  external_urls: {
    spotify: string;
  };
  public: boolean;
  tracks: {
    total: number;
  };
}

export interface SpotifyErrorResponse {
  error: string;
  details?: string | unknown;
  hint?: string;
}

// Generic API Response Types
export interface ApiSuccessResponse<T> {
  data: T;
  success: true;
}

export interface ApiErrorResponse {
  error: string;
  details?: string | unknown;
  hint?: string;
  success: false;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

