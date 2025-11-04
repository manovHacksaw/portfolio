import { NextResponse } from 'next/server';

/**
 * Spotify Recently Played Tracks API Route
 * 
 * Returns the user's recently played tracks
 * Requires: user-read-recently-played scope
 */

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  external_urls: {
    spotify: string;
  };
  duration_ms: number;
}

interface RecentlyPlayedItem {
  track: SpotifyTrack;
  played_at: string;
}

interface RecentlyPlayedResponse {
  items: RecentlyPlayedItem[];
  next: string | null;
  cursors: {
    after: string;
    before: string;
  } | null;
}

async function getAccessToken(): Promise<string | null> {
  const directAccessToken = process.env.SPOTIFY_ACCESS_TOKEN;
  if (directAccessToken) {
    return directAccessToken;
  }

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const before = searchParams.get('before') || undefined;
    const after = searchParams.get('after') || undefined;

    // Validate limit
    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 50' },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Failed to get access token' },
        { status: 500 }
      );
    }

    // Build query parameters
    const params = new URLSearchParams({
      limit: limit.toString(),
    });
    
    if (before) {
      params.append('before', before);
    }
    
    if (after) {
      params.append('after', after);
    }

    const response = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      let errorDetails;
      try {
        errorDetails = JSON.parse(errorText);
      } catch {
        errorDetails = errorText;
      }

      console.error('Spotify API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorDetails,
      });

      return NextResponse.json(
        {
          error: 'Failed to fetch recently played tracks',
          details: errorDetails,
          hint: response.status === 401
            ? 'Access token may be expired or missing user-read-recently-played scope'
            : undefined,
        },
        { status: response.status }
      );
    }

    const data: RecentlyPlayedResponse = await response.json();

    // Transform the response to a simpler format
    const tracks = data.items.map((item) => ({
      id: item.track.id,
      name: item.track.name,
      artist: item.track.artists.map((artist) => artist.name).join(', '),
      album: item.track.album.name,
      albumArt: item.track.album.images.find((img) => img.width === 300)?.url || item.track.album.images[0]?.url || '',
      trackUrl: item.track.external_urls.spotify,
      duration: item.track.duration_ms,
      playedAt: item.played_at,
    }));

    return NextResponse.json({
      tracks,
      next: data.next,
      cursors: data.cursors,
    });
  } catch (error) {
    console.error('Error in Spotify recently played API route:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch recently played tracks',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

