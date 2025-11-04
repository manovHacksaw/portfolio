import { NextResponse } from 'next/server';

/**
 * Spotify User Profile API Route
 * 
 * Returns the current user's Spotify profile information
 * Requires: user-read-private scope
 */

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

interface SpotifyUserProfile {
  id: string;
  display_name: string | null;
  email?: string;
  country?: string;
  images?: Array<{ url: string; height: number; width: number }>;
  followers?: { total: number };
  product?: string;
  external_urls?: { spotify: string };
}

async function getAccessToken(): Promise<{ token: string | null; error?: string }> {
  const directAccessToken = process.env.SPOTIFY_ACCESS_TOKEN;
  if (directAccessToken) {
    return { token: directAccessToken };
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    const missing = [];
    if (!clientId) missing.push('SPOTIFY_CLIENT_ID');
    if (!clientSecret) missing.push('SPOTIFY_CLIENT_SECRET');
    if (!refreshToken) missing.push('SPOTIFY_REFRESH_TOKEN');
    return { 
      token: null, 
      error: `Missing environment variables: ${missing.join(', ')}. Please configure these in your deployment platform.` 
    };
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
      const errorText = await response.text();
      let errorDetails;
      try {
        errorDetails = JSON.parse(errorText);
      } catch {
        errorDetails = errorText;
      }
      console.error('Spotify token refresh failed:', response.status, errorDetails);
      return { 
        token: null, 
        error: `Token refresh failed: ${response.status} ${response.statusText}. ${JSON.stringify(errorDetails)}` 
      };
    }

    const data: SpotifyTokenResponse = await response.json();
    return { token: data.access_token };
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    return { 
      token: null, 
      error: error instanceof Error ? error.message : 'Unknown error during token refresh' 
    };
  }
}

export async function GET() {
  // Add CORS headers (though Next.js handles this automatically for same-origin)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const { token: accessToken, error: tokenError } = await getAccessToken();
    if (!accessToken) {
      // Always return empty profile instead of error to avoid console noise
      // The frontend will use fallback data
      // Log server-side only (won't appear in browser console)
      console.error('Spotify profile API: Missing credentials or token refresh failed:', tokenError || 'Unknown error');
      return NextResponse.json(
        {
          displayName: null,
          followers: 0,
          product: 'free',
          spotifyUrl: null,
          images: [],
        },
        { headers }
      );
    }

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Failed to fetch profile', details: errorText },
        { status: response.status }
      );
    }

    const profile: SpotifyUserProfile = await response.json();

    return NextResponse.json(
      {
        id: profile.id,
        displayName: profile.display_name,
        email: profile.email,
        country: profile.country,
        images: profile.images,
        followers: profile.followers?.total || 0,
        product: profile.product,
        spotifyUrl: profile.external_urls?.spotify,
      },
      { headers }
    );
  } catch (error) {
    console.error('Error in Spotify profile API route:', error);
    return NextResponse.json(
      {
        displayName: null,
        followers: 0,
        product: 'free',
        spotifyUrl: null,
        images: [],
      },
      { headers }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

