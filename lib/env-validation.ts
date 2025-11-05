/**
 * Environment Variable Validation
 * Validates required environment variables at startup
 */

const requiredEnvVars = {
  // Optional - only required if using Spotify integration
  SPOTIFY_CLIENT_ID: {
    required: false,
    description: 'Spotify API Client ID (for Spotify integration)',
  },
  SPOTIFY_CLIENT_SECRET: {
    required: false,
    description: 'Spotify API Client Secret (for Spotify integration)',
  },
  SPOTIFY_REFRESH_TOKEN: {
    required: false,
    description: 'Spotify Refresh Token (for Spotify integration)',
  },
  // Recommended
  NEXT_PUBLIC_SITE_URL: {
    required: false,
    description: 'Public site URL for SEO metadata',
    defaultValue: 'https://yourdomain.com',
  },
} as const;

export function validateEnvVars(): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required variables
  for (const [key, config] of Object.entries(requiredEnvVars)) {
    const value = process.env[key];
    
    if (config.required && !value) {
      errors.push(`Missing required environment variable: ${key}\n  ${config.description}`);
    } else if (!config.required && !value && config.description) {
      // Only warn in development
      if (process.env.NODE_ENV === 'development') {
        warnings.push(`Optional environment variable not set: ${key}\n  ${config.description}`);
      }
    }
  }

  // Validate NEXT_PUBLIC_SITE_URL format if set
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl && !siteUrl.startsWith('http')) {
    warnings.push(`NEXT_PUBLIC_SITE_URL should be a full URL (starting with http:// or https://). Current value: ${siteUrl}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

// Run validation at module load (only in development/server)
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  const validation = validateEnvVars();
  
  if (validation.errors.length > 0) {
    console.error('\n❌ Environment Variable Validation Failed:\n');
    validation.errors.forEach(error => console.error(`  - ${error}`));
    console.error('\n');
  }
  
  if (validation.warnings.length > 0) {
    console.warn('\n⚠️  Environment Variable Warnings:\n');
    validation.warnings.forEach(warning => console.warn(`  - ${warning}`));
    console.warn('\n');
  }
}

