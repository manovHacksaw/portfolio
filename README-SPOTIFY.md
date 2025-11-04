# Spotify Integration Setup

This guide will help you set up Spotify integration for your portfolio, following the [Spotify Web API Getting Started guide](https://developer.spotify.com/documentation/web-api/tutorials/getting-started#create-an-app).

## ✅ What You Have

- ✅ Client ID and Client Secret (stored in `.env.local` - gitignored)
- ✅ Credentials saved in `.env.local` (gitignored)

## ⚠️ What You Need

- ⚠️ Refresh Token with required scopes

## Quick Start: Get Refresh Token

### Option 1: Automated Script (Recommended)

1. **First, configure your Spotify App:**
   - Go to: https://developer.spotify.com/dashboard
   - Select your app (or create a new one)
   - Click "Edit Settings"
   - Add Redirect URI: `http://localhost:3000/callback`
   - Click "Add" then "Save"

2. **Run the helper script:**
   ```bash
   node scripts/get-refresh-token.js
   ```

3. **Follow the prompts:**
   - The script will open a URL in your browser
   - Authorize the application
   - Copy the refresh token from the output
   - Add it to `.env.local`

### Option 2: Manual Method

See `scripts/get-spotify-refresh-token.md` for detailed manual instructions.

## Required Scopes

Your refresh token must include these scopes:

- `playlist-modify-private` - Create and modify private playlists
- `user-read-private` - Get your user profile  
- `user-top-read` - Get your top tracks
- `user-read-currently-playing` - Get currently playing track

## Update .env.local

After getting your refresh token, your `.env.local` should look like:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_actual_refresh_token_here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Testing

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Visit `/contact` page
3. The "My Top Tracks" section should automatically create a playlist!

## Features

Your portfolio now includes:

- **Now Playing** - Shows your currently playing track (if Spotify is active)
- **Top Tracks Playlist** - Automatically creates and displays your top 5 tracks
- **Spotify Embed** - Interactive playlist player on your contact page

## API Endpoints

- `/api/spotify/now-playing` - Get currently playing track
- `/api/spotify/top-tracks` - Get your top tracks
- `/api/spotify/create-playlist` - Create playlist from top tracks

## Troubleshooting

**"Failed to create playlist"**
- Check that your refresh token includes `playlist-modify-private` scope
- Verify your refresh token is correct in `.env.local`
- Check server logs for detailed error messages

**"Invalid redirect URI"**
- Make sure redirect URI in Spotify Dashboard matches exactly: `http://localhost:3000/callback`

**"Invalid scope"**
- Regenerate your refresh token with all required scopes

## Resources

- [Spotify Getting Started](https://developer.spotify.com/documentation/web-api/tutorials/getting-started#create-an-app)
- [Authorization Guide](https://developer.spotify.com/documentation/web-api/concepts/authorization)
- [Scopes Reference](https://developer.spotify.com/documentation/web-api/concepts/scopes)
- [Web API Reference](https://developer.spotify.com/documentation/web-api)

