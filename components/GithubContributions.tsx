'use client'
import { useEffect, useState, useMemo } from 'react'
import GitHubCalendar from 'react-github-calendar'

interface GithubContributionsProps {
  username?: string
}

// Helper function to convert hex to RGB
const hexToRgb = (hex: string): [number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null
}

// Helper function to convert RGB to hex
const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

// Generate color scale from accent color
const generateColorScale = (accentColor: string, isDark: boolean): string[] => {
  const rgb = hexToRgb(accentColor)
  if (!rgb) return ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
  
  const [r, g, b] = rgb
  
  // First color is for empty days (count = 0) - use same grey for both themes
  const emptyColor = '#161b22' // Same dark grey for both light and dark mode
  
  // Use same color generation for both light and dark mode
  const intensity1 = rgbToHex(
    Math.max(0, Math.min(255, Math.floor(r * 0.25))),
    Math.max(0, Math.min(255, Math.floor(g * 0.25))),
    Math.max(0, Math.min(255, Math.floor(b * 0.25)))
  )
  
  const intensity2 = rgbToHex(
    Math.max(0, Math.min(255, Math.floor(r * 0.5))),
    Math.max(0, Math.min(255, Math.floor(g * 0.5))),
    Math.max(0, Math.min(255, Math.floor(b * 0.5)))
  )
  
  const intensity3 = rgbToHex(
    Math.max(0, Math.min(255, Math.floor(r * 0.75))),
    Math.max(0, Math.min(255, Math.floor(g * 0.75))),
    Math.max(0, Math.min(255, Math.floor(b * 0.75)))
  )
  
  return [emptyColor, intensity1, intensity2, intensity3, accentColor]
}

const GithubContributions = ({ username = 'manovHacksaw' }: GithubContributionsProps) => {
  const [accentColor, setAccentColor] = useState('#00ff88') // Default to nav-accent
  const [isDark, setIsDark] = useState(false)
  
  useEffect(() => {
    // Get accent color and theme from CSS variables
    const updateTheme = () => {
      if (typeof window !== 'undefined') {
        const computedStyle = getComputedStyle(document.documentElement)
        const accent = computedStyle.getPropertyValue('--nav-accent').trim() || '#00ff88'
        setAccentColor(accent)
        
        // Check if dark mode is active
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
  
  const colorScale = useMemo(() => generateColorScale(accentColor, isDark), [accentColor, isDark])
  
  return (
    <div className="w-full px-5 py-8">
      <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] mb-4">
        GitHub Contributions
      </h3>
      <div className="overflow-x-auto">
        <div className="flex justify-center py-4">
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
      </div>
      
      <style jsx>{`
        :global(.react-github-calendar) {
          font-family: inherit;
        }
        :global(.react-github-calendar text) {
          fill: var(--foreground-muted);
          font-size: 10px;
        }
        :global(.react-github-calendar rect) {
          rx: 2;
        }
        /* Style empty days (count = 0) with grey */
        :global(.react-github-calendar rect[data-level="0"]) {
          stroke: var(--foreground-border);
          stroke-width: 1;
        }
      `}</style>
    </div>
  )
}

export default GithubContributions