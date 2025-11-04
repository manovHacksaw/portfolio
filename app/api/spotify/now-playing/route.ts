import { NextResponse } from 'next/server';

/**
 * Spotify Now Playing API Route
 * 
 * To use this endpoint, you'll need to:
 * 1. Create a Spotify App at https://developer.spotify.com/dashboard
 * 2. Get your Client ID and Client Secret
 * 3. Set up environment variables:
 *    - SPOTIFY_CLIENT_ID
 *    - SPOTIFY_CLIENT_SECRET
 *    - SPOTIFY_REFRESH_TOKEN (get this by authorizing your app)
 * 
 * For getting a refresh token, you can use:
 * - Spotify's authorization flow
 * - Or a tool like https://github.com/spotify/web-api-auth-examples
 */

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyTrack {
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; width: number; height: number }>;
  };
  external_urls: {
    spotify: string;
  };
  duration_ms: number;
}

interface SpotifyCurrentlyPlaying {
  is_playing: boolean;
  item: SpotifyTrack | null;
  progress_ms: number;
}

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data: SpotifyTokenResponse = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    return null;
  }
}

async function getNowPlaying(): Promise<SpotifyCurrentlyPlaying | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return null;
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 204 || response.status === 404) {
      // No track currently playing
      return null;
    }

    if (!response.ok) {
      return null;
    }

    const data: SpotifyCurrentlyPlaying = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Spotify now playing:', error);
    return null;
  }
}

export async function GET() {
  try {
    const nowPlaying = await getNowPlaying();

    if (!nowPlaying || !nowPlaying.item || !nowPlaying.is_playing) {
      return NextResponse.json({
        isPlaying: false,
      });
    }

    const track = nowPlaying.item;
    const albumArt = track.album.images.find(img => img.width === 640) 
      || track.album.images.find(img => img.width === 300)
      || track.album.images[0];

    return NextResponse.json({
      isPlaying: true,
      title: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      album: track.album.name,
      albumArt: albumArt?.url || '',
      trackUrl: track.external_urls.spotify,
      progress: nowPlaying.progress_ms,
      duration: track.duration_ms,
    });
  } catch (error) {
    console.error('Error in Spotify API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 }
    );
  }
}

