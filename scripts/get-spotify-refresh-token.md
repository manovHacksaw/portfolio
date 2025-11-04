# How to Get Spotify Refresh Token

This guide will help you generate a refresh token with the required scopes for your portfolio.

## Prerequisites

1. ✅ Client ID and Client Secret (stored in `.env.local`)
2. ⚠️ Need: Refresh Token with proper scopes

## Required Scopes

For your portfolio to work, you need these scopes:
- `playlist-modify-private` - Create and modify private playlists
- `user-read-private` - Get your user profile
- `user-top-read` - Get your top tracks
- `user-read-currently-playing` - Get currently playing track

## Step-by-Step: Get Refresh Token

### Option 1: Using Spotify's Web API (Easiest)

1. **Configure Redirect URI in Spotify Dashboard**
   - Go to: https://developer.spotify.com/dashboard
   - Select your app (or create a new one)
   - Click "Edit Settings"
   - Add Redirect URI: `http://localhost:3000/callback` (or your production URL)
   - Click "Add" then "Save"

2. **Generate Authorization URL**
   
   Use the automated script which will generate the correct URL:
   
   ```bash
   node scripts/get-refresh-token.js
   ```
   
   Or manually construct the URL with your Client ID from `.env.local`:
   
   ```
   https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/callback&scope=playlist-modify-private%20user-read-private%20user-top-read%20user-read-currently-playing
   ```

3. **Authorize and Get Code**
   - You'll be redirected to `http://localhost:3000/callback?code=YOUR_CODE`
   - Copy the `code` parameter from the URL

4. **Exchange Code for Refresh Token**
   
   Run this command (replace `YOUR_CODE` with the code from step 3):

   ```bash
   # Get CLIENT_ID and CLIENT_SECRET from your .env.local file first
   export SPOTIFY_CLIENT_ID=your_client_id_from_env
   export SPOTIFY_CLIENT_SECRET=your_client_secret_from_env
   
   curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=authorization_code&code=YOUR_CODE&redirect_uri=http://localhost:3000/callback&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}"
   ```
   
   **Note**: The automated script (`get-refresh-token.js`) handles this automatically.

   The response will include:
   ```json
   {
     "access_token": "...",
     "token_type": "Bearer",
     "expires_in": 3600,
     "refresh_token": "YOUR_REFRESH_TOKEN_HERE",
     "scope": "playlist-modify-private user-read-private user-top-read user-read-currently-playing"
   }
   ```

5. **Copy the `refresh_token` value** and add it to your `.env.local` file

### Option 2: Using Node.js Script

See `scripts/get-refresh-token.js` for an automated script.

## Update .env.local

After getting your refresh token, update `.env.local`:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=paste_your_refresh_token_here
```

## Testing

After setting up, restart your dev server:

```bash
npm run dev
```

Then visit your contact page - the playlist should automatically create!

## Troubleshooting

**Error: "Invalid redirect URI"**
- Make sure the redirect URI in your Spotify app settings matches exactly what you use in the authorization URL

**Error: "Invalid scope"**
- Make sure all required scopes are included in the authorization URL

**Error: "Failed to create playlist"**
- Check that your refresh token includes `playlist-modify-private` scope
- Verify your refresh token hasn't expired (they don't expire but can be revoked)

## Resources

- [Spotify Authorization Guide](https://developer.spotify.com/documentation/web-api/concepts/authorization)
- [Authorization Code Flow](https://developer.spotify.com/documentation/web-api/tutorials/getting-started)
- [Spotify Scopes Reference](https://developer.spotify.com/documentation/web-api/concepts/scopes)

