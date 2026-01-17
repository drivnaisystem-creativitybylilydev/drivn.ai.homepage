# Logo Optimization Note

## Current Status
Your logo (`public/logo.png`) is currently **1.2MB** (1.6MB when base64 encoded), which may cause issues with some email clients that have size limits.

## Solution Implemented
The email system now automatically embeds your logo as a base64 data URI at runtime, so you don't need a domain. However, for best results, consider optimizing your logo.

## Recommended: Optimize Your Logo

### Option 1: Use an Image Optimizer (Recommended)
1. Go to https://tinypng.com or https://squoosh.app
2. Upload your `public/logo.png`
3. Compress it (aim for under 200KB)
4. Replace `public/logo.png` with the optimized version

### Option 2: Resize the Logo
For emails, you typically don't need a 1024x1024 logo. Consider:
- Resizing to 400x400 or 300x300 pixels
- This will significantly reduce file size
- Use an image editor or online tool

### Option 3: Use a Smaller Logo Variant
Create a smaller version specifically for emails:
- `public/logo-email.png` (smaller, optimized version)
- Update `src/lib/email-logo.ts` to use this file instead

## Current Implementation
- Logo is automatically embedded in all emails
- No domain required
- Works immediately
- Logo is cached after first load for performance

## Testing
After optimizing, test sending an email to ensure:
1. Logo displays correctly
2. Email sends without errors
3. Email loads quickly in various email clients
