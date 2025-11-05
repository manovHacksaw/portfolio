/**
 * Spotify Authentication Utilities
 * 
 * Shared functions for handling Spotify API authentication.
 * Used by all Spotify API routes to get access tokens.
 */

import { SpotifyTokenResponse } from '@/types/api.types';

export interface TokenResult {
  token: string | null;
  error?: string;
}

/**
 * Get Spotify access token by refreshing the refresh token.
 * 
 * This function handles:
 * - Direct access token override (for testing)
 * - Refresh token authentication
 * - Error handling and logging
 * 
 * @returns Promise with token and optional error message
 */
export async function getAccessToken(): Promise<TokenResult> {
  // Temporary: Allow direct access token override for testing
  // Note: Access tokens expire in 1 hour, refresh tokens don't expire
  const directAccessToken = process.env.SPOTIFY_ACCESS_TOKEN;
  if (directAccessToken) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Using direct access token (temporary - expires in 1 hour)');
    }
    return { token: directAccessToken };
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    const error = 'Missing Spotify credentials. Please configure SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN in your environment variables. Please configure these in your deployment platform.';
    if (process.env.NODE_ENV === 'development') {
      console.error('Missing Spotify credentials:', {
        hasClientId: !!clientId,
        hasClientSecret: !!clientSecret,
        hasRefreshToken: !!refreshToken,
      });
    }
    return { token: null, error };
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
      if (process.env.NODE_ENV === 'development') {
        console.error('Spotify token refresh failed:', response.status, errorDetails);
      }
      return { 
        token: null, 
        error: `Token refresh failed: ${response.status} ${response.statusText}. ${JSON.stringify(errorDetails)}` 
      };
    }

    const data: SpotifyTokenResponse = await response.json();
    
    // According to Spotify docs: A new refresh_token may be returned
    // If included, we should update it (though we can't modify .env at runtime)
    if (data.refresh_token) {
      if (process.env.NODE_ENV === 'development') {
        console.log('New refresh token received (note: update .env.local manually if needed)');
      }
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Access token refreshed successfully', {
        expiresIn: data.expires_in,
        scopes: data.scope || 'N/A',
      });
    }
    
    return { token: data.access_token };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error getting Spotify access token:', error);
    }
    return { 
      token: null, 
      error: error instanceof Error ? error.message : 'Unknown error during token refresh' 
    };
  }
}

