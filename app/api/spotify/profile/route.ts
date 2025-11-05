import { NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/api/spotify/auth';
import { fetchSpotifyAPI } from '@/lib/api/spotify/client';
import { SpotifyUserProfile } from '@/types/api.types';

/**
 * Spotify User Profile API Route
 * 
 * Returns the current user's Spotify profile information
 * Requires: user-read-private scope
 */

export async function GET() {
  // Cache headers for better performance
  const headers = {
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
  };

  try {
    const { token: accessToken, error: tokenError } = await getAccessToken();
    if (!accessToken) {
      // Always return empty profile instead of error to avoid console noise
      // The frontend will use fallback data
      // Log server-side only (won't appear in browser console)
      if (process.env.NODE_ENV === 'development') {
        console.error('Spotify profile API: Missing credentials or token refresh failed:', tokenError || 'Unknown error');
      }
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

    const profile: SpotifyUserProfile = await fetchSpotifyAPI('/v1/me');

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
    if (process.env.NODE_ENV === 'development') {
      console.error('Error in Spotify profile API route:', error);
    }
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

