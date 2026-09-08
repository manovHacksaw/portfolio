'use client'
import { useEffect, useState, useMemo, useCallback } from 'react'
import GitHubCalendar, { Activity } from 'react-github-calendar'

interface GithubContributionsProps {
  username?: string
}

// Reference uses a plain grayscale contribution graph — no brand/accent
// color. Empty cells sit close to the background; the highest-activity
// cells read as near-black (light mode) / near-white (dark mode).
const GRAYSCALE = {
  light: ['#ebedf0', '#c6c6c6', '#8f8f8f', '#525252', '#171717'],
  dark: ['#242424', '#3a3a3a', '#5c5c5c', '#8a8a8a', '#d4d4d4'],
}

const generateColorScale = (isDark: boolean): string[] => (isDark ? GRAYSCALE.dark : GRAYSCALE.light)

const GithubContributions = ({ username = 'manovHacksaw' }: GithubContributionsProps) => {
  const [isDark, setIsDark] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // The real fetched total, read off the same data the calendar renders —
  // never a placeholder/guessed number. Stays null (and renders nothing)
  // until the calendar's own fetch resolves.
  const [totalCount, setTotalCount] = useState<number | null>(null)

  useEffect(() => {
    // Check if calendar has loaded by looking for the SVG element
    const checkCalendarLoaded = () => {
      const calendar = document.querySelector('.react-activity-calendar svg')
      if (calendar) {
        setIsLoading(false)
        return true
      }
      return false
    }

    let checkInterval: NodeJS.Timeout | null = null
    let timeout: NodeJS.Timeout | null = null

    // Wait a bit for component to mount
    const initialDelay = setTimeout(() => {
      if (checkCalendarLoaded()) {
        return
      }

      // Check periodically until calendar loads
      checkInterval = setInterval(() => {
        if (checkCalendarLoaded()) {
          if (checkInterval) clearInterval(checkInterval)
          if (timeout) clearTimeout(timeout)
        }
      }, 100)

      // Timeout after 10 seconds to prevent infinite loading
      timeout = setTimeout(() => {
        if (checkInterval) clearInterval(checkInterval)
        setIsLoading(false)
      }, 10000)
    }, 200)

    return () => {
      clearTimeout(initialDelay)
      if (checkInterval) clearInterval(checkInterval)
      if (timeout) clearTimeout(timeout)
    }
  }, [username])

  useEffect(() => {
    // Track dark/light so the calendar's grayscale ramp can flip with it
    const updateTheme = () => {
      if (typeof window !== 'undefined') {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)
      }
    }

    updateTheme()

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    })

    // Also watch for theme changes via next-themes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleMediaChange = () => updateTheme()
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  const colorScale = useMemo(() => generateColorScale(isDark), [isDark])

  // Pass-through transform, used only to read the real total off the data
  // the calendar already fetched — the SVG's own built-in total/legend are
  // hidden (hideTotalCount/hideColorLegend below) because they live inside
  // the horizontally-scrolling grid and get clipped off-screen; we render
  // our own copies in a footer row that sits outside the scroll container.
  const readTotal = useCallback((data: Array<Activity>) => {
    const total = data.reduce((sum, day) => sum + day.count, 0)
    // GitHubCalendar invokes transformData synchronously while it (and its
    // parent) are rendering, so calling setState directly here trips
    // React's "update a component while rendering a different component"
    // warning. Deferring to a microtask moves it safely after that render.
    queueMicrotask(() => setTotalCount(total))
    return data
  }, [])

  return (
    <div className="w-full py-6 sm:py-8">
      <div className="overflow-x-auto">
        <div className="flex justify-center py-2 relative">
          {/* Always render calendar */}
          <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
            <GitHubCalendar
              username={username}
              blockSize={12}
              blockMargin={4}
              fontSize={12}
              hideTotalCount
              hideColorLegend
              transformData={readTotal}
              theme={{
                light: colorScale,
                dark: colorScale,
              }}
              style={{
                color: 'var(--foreground)',
              }}
            />
          </div>

          {/* Loading Skeleton - shown while loading */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              {/* Calendar skeleton - matches GitHub calendar layout exactly */}
              <div className="relative" style={{ width: '844px', maxWidth: '100%' }}>
                {/* Month labels skeleton - positioned above grid, aligned with month starts */}
                <div className="mb-2" style={{ height: '14px', position: 'relative' }}>
                  {/* Month labels positioned at approximate month start positions */}
                  {[0, 4, 9, 13, 17, 22, 26, 30, 35, 39, 43, 48].map((startWeek, i) => (
                    <div
                      key={i}
                      className="absolute bg-[var(--foreground-border)] rounded animate-pulse"
                      style={{
                        left: `${startWeek * 16}px`, // 12px block + 4px gap = 16px per week
                        width: '24px',
                        height: '12px',
                        animationDelay: `${i * 0.1}s`,
                        opacity: 0.4,
                      }}
                    />
                  ))}
                </div>

                {/* Grid skeleton - 7 rows x 53 columns = 371 blocks */}
                {/* blockSize=12, blockMargin=4 means: 12px blocks with 4px gap */}
                <div
                  className="grid mx-auto"
                  style={{
                    gridTemplateColumns: 'repeat(53, 12px)',
                    gridTemplateRows: 'repeat(7, 12px)',
                    gap: '4px',
                    width: '844px', // 53 * 12 + 52 * 4 = 636 + 208 = 844px
                  }}
                >
                  {Array.from({ length: 371 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-sm bg-[var(--foreground-border)] animate-pulse"
                      style={{
                        animationDelay: `${(i % 20) * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Total count + color legend, pinned here outside the horizontally
          scrolling calendar above — they used to live inside the calendar's
          own SVG and would scroll (and get clipped) with it. */}
      {!isLoading && (
        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-[var(--foreground-muted)]">
          <span>{totalCount !== null ? `${totalCount.toLocaleString()} contributions in the last year` : ''}</span>
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <div className="flex gap-1">
              {colorScale.map((color) => (
                <span key={color} className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      )}

      <style jsx>{`
        :global(.react-activity-calendar) {
          font-family: inherit;
        }
        :global(.react-activity-calendar text) {
          fill: var(--foreground-muted);
          font-size: 7px;
        }
        @media (min-width: 640px) {
          :global(.react-activity-calendar text) {
            font-size: 10px;
          }
        }
        :global(.react-activity-calendar rect) {
          rx: 2;
        }
        /* Style empty days (count = 0) with grey */
        :global(.react-activity-calendar rect[data-level="0"]) {
          stroke: var(--foreground-border);
          stroke-width: 1;
        }
      `}</style>
    </div>
  )
}

export default GithubContributions
