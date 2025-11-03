# Audio Files for "Now Playing" Section

## How to Add Music

1. **Download or convert your audio file:**
   - The audio player supports MP3, WAV, OGG, and M4A formats
   - For best compatibility, use MP3 format
   - Recommended: 128-320 kbps MP3

2. **Name the file:**
   - Place your audio file here and name it `cupid.mp3` (or update the filename in `app/contact/page.tsx`)

3. **File location:**
   - Audio files should be placed in `/public/audio/`
   - The current code expects: `/public/audio/cupid.mp3`

4. **Alternative options:**
   - You can use a direct URL to an audio file by changing the `audioSrc` in `app/contact/page.tsx`
   - Example: `const audioSrc = "https://your-cdn.com/audio/cupid.mp3";`

## Legal Note

⚠️ **Important:** Make sure you have the rights to use the audio file you're adding. For copyrighted music:
- Use royalty-free music
- Purchase licensing
- Use music you've created
- Link to Spotify instead (already implemented)

## Current Setup

The player is configured for "Cupid" by FIFTY FIFTY. To change the song:
1. Update the audio file path in `app/contact/page.tsx` (line ~27)
2. Update the song title and artist in the UI (lines ~232, ~235)
3. Update the Spotify link if needed (line ~28)

