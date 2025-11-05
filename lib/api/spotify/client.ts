/**
 * Spotify API Client Utilities
 * 
 * Shared functions for making requests to the Spotify Web API.
 */

import { getAccessToken } from './auth';

/**
 * Make a request to the Spotify Web API.
 * 
 * Handles authentication and error handling automatically.
 * 
 * @param endpoint - Spotify API endpoint (e.g., '/v1/me')
 * @param method - HTTP method (default: 'GET')
 * @param body - Request body (optional, for POST/PUT requests)
 * @returns Promise with API response data
 * @throws Error if request fails
 */
export async function fetchSpotifyAPI(
  endpoint: string,
  method: string = 'GET',
  body?: any
): Promise<any> {
  const { token: accessToken, error: tokenError } = await getAccessToken();
  
  if (!accessToken) {
    throw new Error(tokenError || 'Failed to get access token');
  }

  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `https://api.spotify.com${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  if (process.env.NODE_ENV === 'development') {
    console.log(`Making Spotify API request: ${method} ${url}`);
  }

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (process.env.NODE_ENV === 'development') {
    console.log(`Spotify API response status: ${response.status} ${response.statusText}`);
  }

  if (!response.ok) {
    const errorText = await response.text();
    let errorDetails;
    try {
      errorDetails = JSON.parse(errorText);
    } catch {
      errorDetails = errorText;
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.error('Spotify API error details:', errorDetails);
    }
    
    throw new Error(`Spotify API error: ${response.status} ${response.statusText}. ${JSON.stringify(errorDetails)}`);
  }

  return response.json();
}

