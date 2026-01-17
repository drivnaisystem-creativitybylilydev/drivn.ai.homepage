import fs from 'fs';
import path from 'path';

let cachedLogoDataUri: string | null = null;
const MAX_LOGO_SIZE_KB = 100; // Max 100KB to avoid email clipping

/**
 * Get logo as base64 data URI for email embedding
 * Caches the result to avoid reading file multiple times
 * Returns empty string if logo is too large (to prevent email clipping)
 */
export function getLogoDataUri(): string {
  if (cachedLogoDataUri !== null) {
    return cachedLogoDataUri;
  }

  try {
    // In production, use absolute path or environment variable
    const logoPath = process.env.LOGO_PATH 
      ? path.resolve(process.env.LOGO_PATH)
      : path.join(process.cwd(), 'public', 'logo.png');

    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      const base64Logo = logoBuffer.toString('base64');
      const sizeKB = base64Logo.length / 1024;
      
      // Check if logo is too large (would cause email clipping)
      if (sizeKB > MAX_LOGO_SIZE_KB) {
        console.warn(`Logo is ${sizeKB.toFixed(2)}KB, which exceeds ${MAX_LOGO_SIZE_KB}KB limit. Skipping logo to prevent email clipping. Please optimize your logo.`);
        cachedLogoDataUri = ''; // Cache empty to avoid repeated warnings
        return '';
      }
      
      cachedLogoDataUri = `data:image/png;base64,${base64Logo}`;
      return cachedLogoDataUri;
    } else {
      console.warn('Logo file not found at:', logoPath);
      cachedLogoDataUri = '';
      return '';
    }
  } catch (error) {
    console.error('Error loading logo for email:', error);
    cachedLogoDataUri = '';
    return '';
  }
}

/**
 * Replace logo placeholder in email HTML with actual logo data URI
 * If logo is too large or unavailable, hides the logo section gracefully
 */
export function embedLogoInEmail(html: string): string {
  const logoDataUri = getLogoDataUri();
  if (!logoDataUri) {
    // If logo can't be loaded or is too large, hide the logo row entirely
    // This prevents empty space and keeps email clean
    return html
      .replace(/<tr[^>]*>[\s\S]*?{{LOGO_PLACEHOLDER}}[\s\S]*?<\/tr>/gi, '')
      .replace(/<img[^>]*src="[^"]*logo[^"]*"[^>]*>/gi, '')
      .replace(/{{LOGO_PLACEHOLDER}}/g, '');
  }
  
  // Replace placeholder
  let result = html.replace(/{{LOGO_PLACEHOLDER}}/g, logoDataUri);
  
  // Also replace any logo URL with the embedded data URI
  result = result.replace(
    /<img([^>]*)src="[^"]*logo[^"]*"([^>]*)>/gi,
    `<img$1src="${logoDataUri}"$2>`
  );
  
  return result;
}
