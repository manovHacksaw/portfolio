# Deployment Guide - Spotify Integration

## 🚨 Important: Environment Variables

Your Spotify integration requires environment variables to be set in your deployment platform (Vercel, Netlify, etc.).

## Required Environment Variables

Add these to your deployment platform's environment variables settings:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Platform-Specific Instructions

### Vercel

1. Go to your project dashboard on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REFRESH_TOKEN`
   - `NEXT_PUBLIC_SITE_URL`
4. Select environment: **Production**, **Preview**, and **Development** (or as needed)
5. Click **Save**
6. **Redeploy** your application for changes to take effect

### Netlify

1. Go to your site dashboard on Netlify
2. Navigate to **Site settings** → **Environment variables**
3. Click **Add variable** for each:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REFRESH_TOKEN`
   - `NEXT_PUBLIC_SITE_URL`
4. Click **Save**
5. **Trigger a new deploy** or wait for the next automatic deployment

### Other Platforms

Add the environment variables through your platform's dashboard or CLI:
- **Railway**: Project → Variables
- **Render**: Environment → Environment Variables
- **Fly.io**: `fly secrets set SPOTIFY_CLIENT_ID=...`
- **DigitalOcean**: App Settings → Environment Variables

## 🔍 Troubleshooting 500 Errors

If you see 500 errors from `/api/spotify/profile` or `/api/spotify/recently-played`:

1. **Check Environment Variables**: Verify all required variables are set
2. **Check Variable Names**: Ensure they match exactly (case-sensitive)
3. **Check Refresh Token**: Make sure it's valid and not expired
4. **Redeploy**: After adding/updating variables, redeploy your app
5. **Check Logs**: Review your platform's logs for detailed error messages

## Error Response Format

The API now returns detailed error messages:

```json
{
  "error": "Failed to get access token",
  "details": "Missing environment variables: SPOTIFY_CLIENT_ID, SPOTIFY_REFRESH_TOKEN...",
  "hint": "Make sure SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN are set in your environment variables"
}
```

## ✅ Verification

After deployment, check:
1. Visit `/contact` page
2. Open browser console (F12)
3. Check for API errors
4. If errors occur, check the error details in the response

## 🔐 Security Notes

- Never commit `.env.local` to git (already in `.gitignore`)
- Use your platform's environment variable settings, not code
- Refresh tokens don't expire but can be revoked
- Regenerate tokens if compromised

