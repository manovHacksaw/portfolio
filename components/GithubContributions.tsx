'use client'
import { useEffect, useState, useMemo } from 'react'
import GitHubCalendar from 'react-github-calendar'

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
    
    // Hide "Less" and "More" labels on mobile - aggressive continuous approach
    const hideLegendLabels = () => {
      if (typeof window !== 'undefined' && window.innerWidth <= 639) {
        // Try multiple selectors
        const svg = document.querySelector('.react-activity-calendar svg')
        if (svg) {
          // Get all text elements
          const textElements = svg.querySelectorAll('text')
          textElements.forEach((text) => {
            const textContent = text.textContent?.trim()
            if (textContent === 'Less' || textContent === 'More') {
              const element = text as SVGTextElement
              element.style.display = 'none'
              element.style.visibility = 'hidden'
              element.style.opacity = '0'
              element.style.pointerEvents = 'none'
              element.setAttribute('display', 'none')
              element.setAttribute('visibility', 'hidden')
              element.remove() // Actually remove from DOM
            }
          })
          
          // Also try finding by text-anchor attribute and remove them
          const startTexts = svg.querySelectorAll('text[text-anchor="start"]')
          const endTexts = svg.querySelectorAll('text[text-anchor="end"]')
          
          startTexts.forEach((text) => {
            const textContent = text.textContent?.trim()
            if (textContent === 'Less') {
              text.remove()
            }
          })
          
          endTexts.forEach((text) => {
            const textContent = text.textContent?.trim()
            if (textContent === 'More') {
              text.remove()
            }
          })
          
          // Also check the last group (legend area) and remove all text there
          const groups = svg.querySelectorAll('g')
          if (groups.length > 0) {
            const lastGroup = groups[groups.length - 1]
            const legendTexts = lastGroup.querySelectorAll('text')
            legendTexts.forEach((text) => {
              const textContent = text.textContent?.trim()
              if (textContent === 'Less' || textContent === 'More') {
                text.remove()
              }
            })
          }
        }
      }
    }
    
    // Run continuously with intervals to catch calendar rendering
    const intervalId = setInterval(hideLegendLabels, 100)
    
    // Also run multiple times with different delays
    const timers = [
      setTimeout(hideLegendLabels, 100),
      setTimeout(hideLegendLabels, 300),
      setTimeout(hideLegendLabels, 500),
      setTimeout(hideLegendLabels, 1000),
      setTimeout(hideLegendLabels, 2000),
    ]
    
    // Also run on resize
    window.addEventListener('resize', hideLegendLabels)
    
    // Use MutationObserver to watch for calendar updates
    const calendarObserver = new MutationObserver(() => {
      hideLegendLabels()
    })
    const calendarContainer = document.querySelector('.react-activity-calendar')
    if (calendarContainer) {
      calendarObserver.observe(calendarContainer, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false,
      })
    }
    
    // Also observe the entire document for calendar appearance
    const documentObserver = new MutationObserver(() => {
      const calendar = document.querySelector('.react-activity-calendar')
      if (calendar) {
        hideLegendLabels()
      }
    })
    documentObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })
    
    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', handleMediaChange)
      window.removeEventListener('resize', hideLegendLabels)
      calendarObserver.disconnect()
      documentObserver.disconnect()
      clearInterval(intervalId)
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [])
  
  const colorScale = useMemo(() => generateColorScale(isDark), [isDark])
  
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
                
                {/* Bottom info skeleton */}
                <div className="flex justify-between items-center mt-3" style={{ width: '844px' }}>
                  {/* Contributions count text */}
                  <div className="h-4 w-40 bg-[var(--foreground-border)] rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
                  
                  {/* Legend: Less + color squares + More */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--foreground-muted)] opacity-60">Less</span>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className="w-3 h-3 rounded-sm bg-[var(--foreground-border)] animate-pulse"
                          style={{
                            animationDelay: `${level * 0.1}s`,
                            opacity: 0.2 + (level * 0.15),
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[var(--foreground-muted)] opacity-60">More</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
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
        /* Hide "Less" and "More" labels on mobile - aggressive approach */
        @media (max-width: 639px) {
          /* Hide all text elements that might be Less/More */
          :global(.react-activity-calendar svg text[text-anchor="start"]),
          :global(.react-activity-calendar svg text[text-anchor="end"]) {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
          /* Hide by finding all text and checking if it's at the legend position */
          :global(.react-activity-calendar svg g:last-child text) {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}

export default GithubContributions