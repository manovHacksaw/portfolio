import { NextResponse } from 'next/server';

/**
 * Spotify Create Playlist API Route
 * 
 * Creates a playlist from top tracks and returns the playlist ID
 * Uses the same authentication as other Spotify routes
 */

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string; // Optional - may be included in refresh response
  scope?: string; // Scopes granted with the token
}

interface SpotifyUser {
  id: string;
  display_name?: string | null;
  email?: string; // Only available with user-read-email scope
  country?: string; // Only available with user-read-private scope
  images?: Array<{ url: string; height: number; width: number }>;
  followers?: { total: number };
  product?: string; // "premium", "free", etc.
  external_urls?: { spotify: string };
}

interface SpotifyPlaylist {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
}

interface SpotifyTopTrack {
  uri: string;
}

interface SpotifyTopTracksResponse {
  items: Array<{
    uri: string;
    name: string;
    artists: Array<{ name: string }>;
  }>;
}

async function getAccessToken(): Promise<string | null> {
  // Temporary: Allow direct access token override for testing
  // Note: Access tokens expire in 1 hour, refresh tokens don't expire
  const directAccessToken = process.env.SPOTIFY_ACCESS_TOKEN;
  if (directAccessToken) {
    console.log('Using direct access token (temporary - expires in 1 hour)');
    return directAccessToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    console.error('Missing Spotify credentials:', {
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
      hasRefreshToken: !!refreshToken,
    });
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
      const errorText = await response.text();
      console.error('Failed to get access token:', response.status, errorText);
      return null;
    }

    const data: SpotifyTokenResponse = await response.json();
    
    // According to Spotify docs: A new refresh_token may be returned
    // If included, we should update it (though we can't modify .env at runtime)
    if (data.refresh_token) {
      console.log('New refresh token received (note: update .env.local manually if needed)');
    }
    
    console.log('Access token refreshed successfully', {
      expiresIn: data.expires_in,
      scopes: data.scope || 'N/A',
    });
    
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

async function getTopTracks(timeRange: string = 'long_term', limit: number = 5): Promise<string[]> {
  try {
    const data: SpotifyTopTracksResponse = await fetchWebApi(
      `v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
      'GET'
    );
    return data.items?.map(track => track.uri) || [];
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return [];
  }
}

async function createPlaylist(tracksUri: string[]): Promise<SpotifyPlaylist | null> {
  try {
    // Get user profile - required for playlist creation
    // According to Spotify API: GET https://api.spotify.com/v1/me
    // Requires: user-read-private scope
    const user: SpotifyUser = await fetchWebApi('v1/me', 'GET');
    console.log('Got user profile:', {
      id: user.id,
      displayName: user.display_name || 'N/A',
      product: user.product || 'N/A',
    });
    
    if (!user.id) {
      throw new Error('Unable to get user ID. Make sure you have user-read-private scope.');
    }
    
    // Create playlist using the user's endpoint
    // According to Spotify API: POST https://api.spotify.com/v1/users/{user_id}/playlists
    const playlist: SpotifyPlaylist = await fetchWebApi(
      `v1/users/${user.id}/playlists`,
      'POST',
      {
        name: "My Top Tracks Playlist",
        description: "Playlist created from my top tracks - Portfolio",
        public: false,
      }
    );
    
    if (!playlist || !playlist.id) {
      throw new Error('Playlist creation succeeded but no playlist ID returned');
    }
    
    console.log('Created playlist:', playlist.id, playlist.name);

    // Add tracks to playlist
    // According to Spotify API: POST https://api.spotify.com/v1/playlists/{playlist_id}/tracks
    if (tracksUri.length > 0) {
      console.log('Adding tracks to playlist:', tracksUri.length);
      
      // Spotify API requires tracks to be added in batches of max 100
      // For multiple tracks, we need to format them properly
      const tracksToAdd = tracksUri.join(',');
      
      const addTracksResponse = await fetchWebApi(
        `v1/playlists/${playlist.id}/tracks?uris=${encodeURIComponent(tracksToAdd)}`,
        'POST'
      );
      
      console.log('Tracks added successfully:', addTracksResponse);
    }

    return playlist;
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error; // Re-throw to get more details in the API route
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('time_range') || 'long_term';
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

    // Get top tracks
    const tracksUri = await getTopTracks(timeRange, limit);

    if (tracksUri.length === 0) {
      return NextResponse.json(
        { error: 'No top tracks found' },
        { status: 404 }
      );
    }

    // Create playlist
    let playlist: SpotifyPlaylist | null;
    try {
      playlist = await createPlaylist(tracksUri);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Playlist creation failed:', errorMessage);
      return NextResponse.json(
        { 
          error: 'Failed to create playlist',
          details: errorMessage,
          hint: 'Make sure your Spotify app has the following scopes when generating the refresh token: playlist-modify-private (or playlist-modify-public), user-read-private, user-top-read. You may need to regenerate your refresh token with these scopes.'
        },
        { status: 500 }
      );
    }

    if (!playlist) {
      return NextResponse.json(
        { 
          error: 'Failed to create playlist',
          details: 'Playlist creation returned null',
          hint: 'Check server logs for more details'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      playlistId: playlist.id,
      playlistUrl: playlist.external_urls.spotify,
      name: playlist.name,
      trackCount: tracksUri.length,
    });
  } catch (error) {
    console.error('Error in Spotify create playlist API route:', error);
    return NextResponse.json(
      { error: 'Failed to create playlist', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

