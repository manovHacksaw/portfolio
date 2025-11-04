# Environment Variables Setup Guide

## 🔒 NEVER COMMIT (Store in `.env.local`)

These are **SECRET** credentials that should **NEVER** be committed to git:

```env
# Spotify API Credentials (SECRET - DO NOT COMMIT)
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here

# Temporary Access Token (optional, expires in 1 hour)
# Only use for testing - remove after getting refresh token working
# SPOTIFY_ACCESS_TOKEN=your_temporary_access_token_here
```

## ✅ Safe to Commit (Store in `.env.example`)

Create/update `.env.example` with placeholder values:

```env
# Spotify API Credentials
# Get these from: https://developer.spotify.com/dashboard
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here

# Site URL (update with your actual domain)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 📋 Environment Variables Checklist

Before committing, ensure:

1. ✅ `.env.local` exists and contains your **real secrets**
2. ✅ `.env.local` is in `.gitignore` (should be by default)
3. ✅ `.env.example` exists with **placeholder values**
4. ✅ `.env.example` is **committed** to git (safe template)
5. ✅ No actual secrets are in `.env.example`
6. ✅ No `.env.local` file is committed

## 🚨 Quick Check Before Committing

Run this to verify no secrets are being committed:

```bash
# Check if .env.local is tracked (should NOT be)
git ls-files | grep .env.local

# Check if .env.example exists (should exist)
ls -la .env.example

# Verify .gitignore includes .env.local
grep ".env.local" .gitignore
```

## 📝 What Each Variable Does

- **SPOTIFY_CLIENT_ID**: Your Spotify app's public client ID (from Spotify Dashboard)
- **SPOTIFY_CLIENT_SECRET**: Your Spotify app's secret key (SECRET - never share)
- **SPOTIFY_REFRESH_TOKEN**: Long-lived token for refreshing access tokens (SECRET)
- **SPOTIFY_ACCESS_TOKEN**: Temporary token (expires in 1 hour, optional for testing)
- **NEXT_PUBLIC_SITE_URL**: Your site's public URL (used for SEO metadata)

## 🔐 Security Notes

- **Client ID**: Semi-public (visible in browser), but keep in `.env.local` for consistency
- **Client Secret**: **HIGHLY SECRET** - never commit or share
- **Refresh Token**: **HIGHLY SECRET** - gives access to your Spotify account
- **Access Token**: Temporary, expires quickly, but still sensitive

## ✅ Final Checklist

Before pushing to GitHub:

- [ ] `.env.local` contains all your secrets
- [ ] `.env.local` is NOT tracked by git (check with `git ls-files`)
- [ ] `.env.example` exists with placeholder values
- [ ] `.gitignore` includes `.env.local` and `.env*` (except `.env.example`)
- [ ] No actual credentials are in any committed files
- [ ] You've tested that the app works with `.env.local`

