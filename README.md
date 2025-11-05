# Portfolio Website

A modern, feature-rich portfolio website built with Next.js, featuring Spotify integration, GitHub contributions visualization, and a beautiful, responsive design. Perfect for developers looking to showcase their work, achievements, and interests.

## ✨ Features

- **🎨 Modern Design**: Clean, responsive UI with dark/light theme support
- **🎵 Spotify Integration**: Display currently playing track, top tracks, and create playlists
- **📊 GitHub Contributions**: Visual GitHub contribution calendar with theme-aware colors
- **📱 Fully Responsive**: Optimized for all devices
- **🔍 SEO Optimized**: Complete metadata, Open Graph, Twitter Cards, structured data (JSON-LD)
- **⚡ Performance**: Optimized images, fonts, and API caching
- **♿ Accessible**: Skip-to-content links, proper ARIA labels, keyboard navigation
- **🌐 Multi-page**: Projects, Experience, Education, Achievements, Contact pages

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theming**: next-themes
- **APIs**: Spotify Web API, GitHub API (via react-github-calendar)
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.9.0
- npm, yarn, pnpm, or bun
- Spotify Developer Account (for Spotify features)
- GitHub Account (for GitHub contributions)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your credentials:
   ```env
   SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 📊 How Data is Structured and Used

### Data Architecture

All portfolio data is centralized in `data/mockData.ts` using TypeScript interfaces defined in `types/portfolio.types.ts`. This makes it easy to customize and eventually migrate to a database or CMS.

### Data Structure

The portfolio uses a `PortfolioData` interface that includes:

```typescript
{
  personalInfo: {
    name, title, bio, avatarUrl, age, email, location, locationFlag
  },
  interests: [{ id, name, icon }],
  experience: [{
    id, company, role, startDate, endDate,
    responsibilities[], techStack[], websiteUrl
  }],
  hackathons: [{
    id, name, projectName, achievement, date, location,
    description, imageUrl, logoUrl, projectUrl, githubUrl,
    announcementUrl, prize, techStack[]
  }],
  skills: [{
    id, name, category, icon, color, proficiency
  }],
  education: [{
    id, degree, institution, location, startYear, endYear, imageUrl
  }],
  projects: [{
    id, title, description, longDescription, imageUrl,
    technologies[], githubUrl, liveUrl, featured, startDate, endDate
  }],
  portfolioLinks: [{ id, platform, url, icon }],
  contactPage: { header, nowPlaying, socialLinks, footer },
  educationPage: { quote },
  achievementsPage: { introduction }
}
```

### How Data Flows

1. **Data Source**: `data/mockData.ts` exports `mockPortfolioData`
2. **Type Safety**: TypeScript interfaces in `types/portfolio.types.ts` ensure type safety
3. **Component Usage**: Components import and use specific parts:
   - Home page: `personalInfo`, `portfolioLinks`, `skills`
   - Projects page: `projects`
   - Experience page: `experience`
   - Education page: `education`
   - Achievements page: `hackathons`
   - Contact page: `contactPage`, `personalInfo`, `portfolioLinks`

### Customizing Your Data

To customize the portfolio for your own use:

1. **Edit `data/mockData.ts`**:
   - Update `personalInfo` with your details
   - Add/modify `projects`, `experience`, `education`, `hackathons`
   - Update `portfolioLinks` with your social media links
   - Customize `skills` array with your tech stack

2. **Update Images**:
   - Replace `/public/avatar.png` with your profile picture
   - Add project images to `/public/projects/`
   - Add hackathon logos to `/public/hackathons/`
   - Add education institution logos to `/public/education/`

3. **Update Contact Page**:
   - Modify `contactPage.nowPlaying` audio file in `/public/audio/`
   - Update audio file reference in `ContactClient.tsx`

### Future: Database Migration

The data structure is designed to easily migrate to a database:
- Types match potential database schema
- Centralized data makes migration straightforward
- Replace `mockData.ts` imports with database queries
- Keep the same TypeScript interfaces

## 🎵 Spotify API Integration

### Overview

The portfolio integrates with Spotify Web API to display:
- **Currently Playing Track**: Shows what you're listening to in real-time
- **Top Tracks**: Displays your most-played tracks
- **Recently Played**: Shows your recently played tracks
- **Playlist Creation**: Automatically creates playlists from your top tracks
- **Profile Info**: Displays your Spotify profile, followers, and subscription type

### How It Works

#### 1. Authentication Flow

The integration uses **Refresh Token** authentication (OAuth 2.0):

```
User Authorizes App → Get Authorization Code → Exchange for Refresh Token → Store Refresh Token
```

**Refresh tokens** don't expire (unlike access tokens which expire in 1 hour), so you only need to authorize once.

#### 2. Architecture

**Shared Utilities** (`lib/api/spotify/`):
- `auth.ts`: Handles token refresh via `getAccessToken()`
- `client.ts`: Makes authenticated API requests via `fetchSpotifyAPI()`

**API Routes** (`app/api/spotify/`):
- `/api/spotify/now-playing` - GET currently playing track
- `/api/spotify/profile` - GET user profile
- `/api/spotify/recently-played` - GET recently played tracks
- `/api/spotify/top-tracks` - GET top tracks
- `/api/spotify/create-playlist` - POST create playlist from top tracks

**Components**:
- `components/SpotifyPlaylist.tsx` - Embeds Spotify playlist player
- `app/contact/ContactClient.tsx` - Displays Spotify status

#### 3. Setup Instructions

**Step 1: Create Spotify App**

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create App"
3. Fill in app details:
   - App name: Your Portfolio Spotify Integration
   - App description: Portfolio website integration
   - Redirect URI: `http://localhost:3000/callback` (for development)
   - Website: Your portfolio URL
4. Click "Save"
5. Copy your **Client ID** and **Client Secret**

**Step 2: Get Refresh Token**

**Option A: Automated Script (Recommended)**

1. Make sure redirect URI is set: `http://localhost:3000/callback`
2. Run:
   ```bash
   node scripts/get-refresh-token.js
   ```
3. Follow the prompts:
   - Script opens authorization URL in browser
   - Authorize the app
   - Copy the refresh token from terminal
   - Add to `.env.local`

**Option B: Manual Method**

1. Visit authorization URL (replace `YOUR_CLIENT_ID`):
   ```
   https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/callback&scope=playlist-modify-private%20user-read-private%20user-top-read%20user-read-currently-playing%20user-read-recently-played
   ```
2. Authorize and copy the `code` from redirect URL
3. Exchange code for refresh token:
   ```bash
   curl -X POST https://accounts.spotify.com/api/token \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=authorization_code&code=YOUR_CODE&redirect_uri=http://localhost:3000/callback&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET"
   ```
4. Copy `refresh_token` from response

**Step 3: Configure Environment Variables**

Add to `.env.local`:
```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

**Step 4: Required Scopes**

Your refresh token must include these scopes:
- `playlist-modify-private` - Create and modify private playlists
- `user-read-private` - Get user profile
- `user-top-read` - Get top tracks
- `user-read-currently-playing` - Get currently playing track
- `user-read-recently-played` - Get recently played tracks

#### 4. API Endpoints Details

**GET `/api/spotify/now-playing`**
- Returns: Currently playing track info or `{ isPlaying: false }`
- Cache: 30 seconds
- Used by: Contact page to show live listening status

**GET `/api/spotify/profile`**
- Returns: User profile (display name, followers, images, Spotify URL)
- Cache: 60 seconds
- Used by: Contact page for profile display

**GET `/api/spotify/recently-played`**
- Query params: `limit` (default: 20)
- Returns: Array of recently played tracks
- Cache: 60 seconds
- Used by: Contact page as fallback when not playing

**GET `/api/spotify/top-tracks`**
- Query params: `time_range` (short_term/medium_term/long_term), `limit`
- Returns: Array of top tracks
- Cache: 5 minutes
- Used by: Top tracks display

**POST `/api/spotify/create-playlist`**
- Query params: `time_range`, `limit`
- Creates: Private playlist with top tracks
- Returns: Playlist ID for embedding
- Used by: `SpotifyPlaylist` component

#### 5. How Components Use Spotify API

**Contact Page Flow**:
```
ContactClient.tsx
  ↓ (on mount)
  Fetches: /api/spotify/now-playing
  Fetches: /api/spotify/profile
  Fetches: /api/spotify/recently-played
  ↓
  Displays: Currently playing OR last played track
  Displays: Profile info
  Displays: Spotify playlist embed
```

**Playlist Component Flow**:
```
SpotifyPlaylist.tsx
  ↓ (if no playlistId provided)
  POST /api/spotify/create-playlist
  ↓
  Gets playlistId
  ↓
  Embeds Spotify iframe player
```

#### 6. Error Handling

- API routes return empty data instead of errors (graceful degradation)
- Frontend handles missing data with fallbacks
- Development logs errors, production silently fails
- If Spotify credentials are missing, portfolio still works (without Spotify features)

#### 7. Caching Strategy

- **Short cache** (30s): Now playing (frequently changing)
- **Medium cache** (60s): Profile, recently played (moderately changing)
- **Long cache** (5min): Top tracks (rarely changing)
- Uses `stale-while-revalidate` for better UX

## 📈 GitHub API Integration

### Overview

The portfolio uses GitHub's public API (via `react-github-calendar` package) to display your GitHub contribution graph.

### How It Works

#### 1. Component: `GithubContributions.tsx`

Located in `components/GithubContributions.tsx`, this component:

- Uses the `react-github-calendar` package
- Fetches public contribution data from GitHub API
- Displays a visual calendar heatmap
- Automatically adapts colors to your theme
- Responsive design with mobile optimizations

#### 2. Usage

**On Home Page** (`app/page.tsx`):
```tsx
<GithubContributions username="your-github-username" />
```

**Default Username**: The component defaults to `'manovHacksaw'` but accepts a prop:
```tsx
<GithubContributions username="your-username" />
```

#### 3. How It Fetches Data

The `react-github-calendar` package internally:
1. Makes requests to GitHub's public API: `https://api.github.com/users/{username}/events`
2. Processes event data to count contributions per day
3. Renders an SVG calendar heatmap
4. No authentication required (public data only)

#### 4. Customization

**Change Username**:
Edit `app/page.tsx`:
```tsx
<GithubContributions username="your-github-username" />
```

**Styling**:
The component automatically:
- Uses your theme's accent color for contribution intensity
- Adapts to light/dark mode
- Hides legend labels on mobile
- Adjusts block size and spacing

**Color Generation**:
Colors are dynamically generated from your CSS variable `--nav-accent`:
- Empty days: Grey (#161b22)
- Low activity: 25% accent color intensity
- Medium activity: 50% accent color intensity
- High activity: 75% accent color intensity
- Very high activity: Full accent color

#### 5. Privacy & Rate Limits

- **Public Data Only**: No authentication needed
- **Rate Limits**: GitHub allows 60 requests/hour for unauthenticated requests
- **Caching**: Component caches data client-side
- **Privacy**: Only shows public contribution data

#### 6. Fallback Behavior

If GitHub API fails or username doesn't exist:
- Component shows loading skeleton
- No error message (graceful degradation)
- Portfolio continues to work normally

## 🎨 Using This as a Template

### Quick Start for Your Portfolio

1. **Fork or Clone**
   ```bash
   git clone <this-repo-url>
   cd portfolio
   ```

2. **Update Personal Information**
   - Edit `data/mockData.ts`:
     - Update `personalInfo` (name, bio, email, location)
     - Replace avatar: `/public/avatar.png`
     - Update all sections with your data

3. **Replace Images**
   - Profile: `/public/avatar.png`
   - Projects: `/public/projects/*.png`
   - Hackathons: `/public/hackathons/*.png`
   - Education: `/public/education/*.png`

4. **Update GitHub Username**
   - Edit `app/page.tsx`:
     ```tsx
     <GithubContributions username="your-username" />
     ```

5. **Customize Spotify Integration** (Optional)
   - Follow Spotify setup instructions above
   - Or remove Spotify components if not needed

6. **Update Site URL**
   - Edit `.env.local`:
     ```env
     NEXT_PUBLIC_SITE_URL=https://yourdomain.com
     ```

7. **Customize Theme Colors**
   - Edit `app/globals.css`:
     - Update CSS variables for colors
     - `--nav-accent`: Primary accent color
     - `--foreground`: Text color
     - `--background`: Background color

8. **Update Metadata**
   - Edit `app/layout.tsx`:
     - Update `metadata` object (title, description, Open Graph)

9. **Remove/Add Pages**
   - Keep pages you need in `app/`
   - Remove unused pages
   - Update navigation in `components/BottomNav.tsx`

### Customization Checklist

- [ ] Update `data/mockData.ts` with your information
- [ ] Replace all images in `/public/`
- [ ] Update GitHub username in `app/page.tsx`
- [ ] Configure Spotify API (or remove Spotify features)
- [ ] Update `NEXT_PUBLIC_SITE_URL` in `.env.local`
- [ ] Customize theme colors in `app/globals.css`
- [ ] Update metadata in `app/layout.tsx`
- [ ] Update favicon: `/app/favicon.ico` and `/app/icon.png`
- [ ] Review and update page-specific metadata (each `app/*/page.tsx`)
- [ ] Test all pages and links
- [ ] Update `README.md` with your information

### Removing Features

**Remove Spotify Integration**:
1. Remove Spotify API routes: `app/api/spotify/`
2. Remove Spotify components: `components/SpotifyPlaylist.tsx`
3. Remove Spotify code from `app/contact/ContactClient.tsx`
4. Remove Spotify env variables from `.env.example`

**Remove GitHub Contributions**:
1. Remove `components/GithubContributions.tsx`
2. Remove import and usage from `app/page.tsx`
3. Uninstall: `npm uninstall react-github-calendar react-calendar-heatmap`

**Remove Pages**:
1. Delete page folder: `app/[page-name]/`
2. Remove from navigation: `components/BottomNav.tsx`
3. Update sitemap: `app/sitemap.ts`

### Adding New Features

**Add a New Page**:
1. Create folder: `app/new-page/`
2. Add `page.tsx` with metadata export
3. Add `*Client.tsx` for client-side functionality
4. Add to navigation: `components/BottomNav.tsx`
5. Add to sitemap: `app/sitemap.ts`

**Add a New API Route**:
1. Create folder: `app/api/new-route/`
2. Add `route.ts` with HTTP method handlers
3. Add types to `types/api.types.ts` if needed

**Add a New Component**:
1. Create file: `components/NewComponent.tsx`
2. Follow existing component patterns
3. Import and use where needed

## 🔧 Environment Variables

### Required

```env
# Site URL (for SEO metadata)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Optional (for Spotify Integration)

```env
# Spotify API Credentials
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here

# Temporary testing (optional)
SPOTIFY_ACCESS_TOKEN=your_access_token_here
```

### Environment Variable Validation

The app validates environment variables on startup:
- Checks for required variables
- Warns about missing optional variables (development only)
- Validates URL format for `NEXT_PUBLIC_SITE_URL`

See `lib/env-validation.ts` for details.

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── api/spotify/       # Spotify API routes
│   ├── callback/          # OAuth callback handler
│   ├── (pages)/           # Page routes
│   ├── layout.tsx         # Root layout
│   ├── error.tsx          # Error boundary
│   ├── not-found.tsx      # 404 page
│   ├── robots.ts          # SEO robots.txt
│   └── sitemap.ts         # SEO sitemap
│
├── components/            # React components
│   ├── sections/         # Page sections
│   └── (various components)
│
├── contexts/              # React contexts
├── data/                  # Mock data
├── lib/                   # Utilities
│   ├── api/spotify/      # Spotify API utilities
│   └── env-validation.ts
├── public/                # Static assets
├── scripts/               # Utility scripts
├── types/                 # TypeScript types
└── (config files)
```

See `STRUCTURE.md` for detailed structure documentation.

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app works on any platform supporting Next.js:
- Netlify
- Railway
- Render
- DigitalOcean App Platform
- Self-hosted (Node.js server)

### Environment Variables in Production

Make sure to set all environment variables in your deployment platform:
- `NEXT_PUBLIC_SITE_URL` (required)
- Spotify credentials (if using Spotify features)

### Build Command

```bash
npm run build
```

### Start Command

```bash
npm start
```

## 🐛 Troubleshooting

### Spotify Integration Issues

**"Failed to create playlist"**
- Check refresh token includes `playlist-modify-private` scope
- Verify refresh token is correct in `.env.local`
- Check server logs for detailed errors

**"Invalid redirect URI"**
- Ensure redirect URI in Spotify Dashboard matches exactly
- For production: Update redirect URI to your domain

**"Token refresh failed"**
- Verify `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` are correct
- Check refresh token hasn't been revoked
- Regenerate refresh token if needed

**"No data showing"**
- Check browser console for errors
- Verify environment variables are set
- Check API routes are accessible: `/api/spotify/profile`

### GitHub Contributions Not Showing

- Verify GitHub username is correct
- Check username exists and has public activity
- Check browser console for errors
- GitHub API may be rate-limited (wait and retry)

### Build Errors

**"Module not found"**
- Run `npm install` to install dependencies
- Check Node.js version >= 20.9.0

**"Type errors"**
- Check TypeScript version matches `package.json`
- Run `npm run build` to see detailed errors

### Other Issues

**Images not loading**
- Check image paths in `data/mockData.ts`
- Verify images exist in `/public/` directory
- Check image file names match exactly (case-sensitive)

**Theme not working**
- Check `next-themes` is installed
- Verify `ThemeProvider` wraps app in `app/layout.tsx`
- Check CSS variables in `app/globals.css`

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [GitHub API](https://docs.github.com/en/rest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 👤 Author

**Manobendra Mandal**
- Portfolio: [Your Portfolio URL]
- GitHub: [@manovHacksaw](https://github.com/manovHacksaw)
- Email: manovmandal@gmail.com

---

Made with ❤️ using Next.js, TypeScript, and Tailwind CSS
