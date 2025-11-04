import { NextResponse } from 'next/server';

/**
 * Spotify Top Tracks API Route
 * 
 * Returns user's top tracks from Spotify
 * Uses the same authentication as the now-playing route
 */

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string; // Optional - may be included in refresh response
  scope?: string; // Scopes granted with the token
}

interface SpotifyTopTrack {
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
  popularity: number;
}

interface SpotifyTopTracksResponse {
  items: SpotifyTopTrack[];
}

async function getAccessToken(): Promise<string | null> {
  // Temporary: Allow direct access token override for testing
  // Note: Access tokens expire in 1 hour, refresh tokens don't expire
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

async function fetchWebApi(endpoint: string, method: string = 'GET', body?: any): Promise<any> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error('Failed to get access token');
  }

  console.log(`Making Spotify API request: ${method} ${endpoint}`);

  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method,
    body: body ? JSON.stringify(body) : undefined,
  });

  const responseText = await res.text();
  console.log(`Spotify API response status: ${res.status} ${res.statusText}`);

  if (!res.ok) {
    let errorDetails;
    try {
      errorDetails = JSON.parse(responseText);
    } catch {
      errorDetails = responseText;
    }
    console.error('Spotify API error details:', errorDetails);
    throw new Error(`Spotify API error: ${res.status} ${res.statusText} - ${JSON.stringify(errorDetails)}`);
  }

  try {
    return JSON.parse(responseText);
  } catch (error) {
    throw new Error(`Failed to parse Spotify API response: ${responseText}`);
  }
}

async function getTopTracks(timeRange: string = 'long_term', limit: number = 5): Promise<SpotifyTopTrack[]> {
  const data: SpotifyTopTracksResponse = await fetchWebApi(
    `v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
    'GET'
  );
  console.log('Top tracks response:', {
    hasItems: !!data.items,
    itemsCount: data.items?.length || 0,
    firstItem: data.items?.[0]?.name || 'N/A',
  });
  return data.items || [];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('time_range') || 'long_term'; // long_term, medium_term, short_term
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    // Validate time range
    if (!['long_term', 'medium_term', 'short_term'].includes(timeRange)) {
      return NextResponse.json(
        { error: 'Invalid time_range. Must be long_term, medium_term, or short_term' },
        { status: 400 }
      );
    }

    // Validate limit
    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 50' },
        { status: 400 }
      );
    }

    let topTracks: SpotifyTopTrack[];
    try {
      topTracks = await getTopTracks(timeRange, limit);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Failed to get top tracks:', errorMessage);
      return NextResponse.json(
        {
          error: 'Failed to fetch top tracks',
          details: errorMessage,
          hint: 'Make sure your access token has the user-top-read scope'
        },
        { status: 500 }
      );
    }

    if (topTracks.length === 0) {
      return NextResponse.json({
        tracks: [],
        message: 'No top tracks found',
        hint: 'This might mean you don\'t have enough listening history, or the token doesn\'t have user-top-read scope'
      });
    }

    // Format the response
    const formattedTracks = topTracks.map((track) => {
      const albumArt = track.album.images.find(img => img.width === 640) 
        || track.album.images.find(img => img.width === 300)
        || track.album.images[0];

      return {
        name: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        artists: track.artists.map(artist => ({ name: artist.name })),
        album: track.album.name,
        albumArt: albumArt?.url || '',
        trackUrl: track.external_urls.spotify,
        duration: track.duration_ms,
        popularity: track.popularity,
      };
    });

    return NextResponse.json({
      tracks: formattedTracks,
      timeRange,
      limit,
    });
  } catch (error) {
    console.error('Error in Spotify top tracks API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top tracks' },
      { status: 500 }
    );
  }
}

