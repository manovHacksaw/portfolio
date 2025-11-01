# Portfolio Website Build Guide

## Overview
Building a modern, dark-themed portfolio website similar to the reference design. The site will be built step-by-step with a focus on preparing for dynamic data integration later.

## Architecture Plan

### 1. **Data Structure Design** (Step 1 - Current)
- Define TypeScript interfaces/types for all data
- Create mock data structure that matches future database schema
- This allows seamless transition to database later

### 2. **Component Structure** (Step 2)
- Break down the design into reusable components:
  - `HeroSection` - Avatar + Introduction
  - `InterestsSection` - Gaming, Film Making, Traveling tags
  - `ExperienceSection` - Work experience cards
  - `SkillsSection` - Design Tools, Editing Tools, Languages
  - `EducationSection` - Education timeline
  - `PortfolioLinksSection` - External portfolio links
  - `ContactSection` - Contact details

### 3. **Layout Setup** (Step 3)
- Create responsive grid layout
- Set up dark theme styling
- Configure spacing and card design system

### 4. **Styling System** (Step 4)
- Dark theme colors (`#121212` background, `#212121` cards)
- Card component with rounded corners
- Icon system setup
- Typography system

### 5. **Database Preparation** (Later)
- Set up database schema
- Create API routes to fetch data
- Replace static data with API calls

## Step 1: Data Structure Design ✅

✅ **COMPLETED:**
- Created TypeScript interfaces in `types/portfolio.types.ts`
- Created mock data in `data/mockData.ts`
- Data structure is ready for database migration later

**What we've set up (Developer-focused):**
- `PortfolioData` - Main data interface
- `PersonalInfo` - Hero section data
- `Experience` - Work experience entries (developer roles)
- `Education` - Education timeline (CS/Software Engineering)
- `Skills` - Programming languages, frameworks, tools (categorized: frontend, backend, database, tools, cloud, language)
- `Projects` - Portfolio projects with GitHub/live links, technologies, and descriptions
- `Interests` - Personal interests
- `PortfolioLinks` - Developer portfolio links (GitHub, LinkedIn, etc.)

**Key Changes for Developer Portfolio:**
- ✅ Skill categories updated: `frontend | backend | database | tools | language | cloud`
- ✅ Added optional `proficiency` field to skills
- ✅ **Added `Project` interface** with title, description, image, technologies, GitHub/live URLs, featured flag
- ✅ Portfolio links changed to developer platforms (GitHub, LinkedIn, etc.)
- ✅ Skills section includes React, Next.js, Node.js, MongoDB, etc.
- ✅ Removed phone field from PersonalInfo
- ✅ Added example Newscope project in mock data

---

## Step 2: Component Structure & Layout (NEXT STEP)

**Your next task is to:**

1. **Create component directory structure:**
   ```
   app/
     components/
       sections/
         HeroSection.tsx
         InterestsSection.tsx
         ExperienceSection.tsx
         SkillsSection.tsx
         EducationSection.tsx
         ProjectsSection.tsx
         PortfolioLinksSection.tsx
         ContactSection.tsx
       ui/
         Card.tsx
         Badge.tsx
         Icon.tsx (or use an icon library)
   ```

2. **Update the main page (`app/page.tsx`):**
   - Import mock data
   - Create the grid layout structure
   - Import and arrange all section components
   - Set up dark theme background

3. **Create a reusable Card component:**
   - Dark gray background (`#212121`)
   - Rounded corners
   - Proper padding
   - Subtle border/shadow

**Questions for you:**
- Which icon library would you like to use? (lucide-react, react-icons, or custom SVG?)
- Do you want to start with the layout structure or individual components first?

---

## Step 3: Styling System

After components, we'll:
- Finalize dark theme colors
- Create consistent spacing system
- Add hover effects and transitions
- Make it fully responsive

---

## Step 4: Database Integration (Later)

When ready for database:
- We'll create API routes (`app/api/`)
- Set up database (Prisma, MongoDB, or your choice)
- Replace mock data with API calls
- Types will remain the same!

