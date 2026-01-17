#!/bin/bash
# Script to optimize logo for email use
# This creates a smaller version specifically for emails

echo "📸 Optimizing logo for email..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Install it with: brew install imagemagick"
    echo ""
    echo "Or use an online tool:"
    echo "1. Go to https://tinypng.com"
    echo "2. Upload public/logo.png"
    echo "3. Download optimized version"
    echo "4. Replace public/logo.png"
    exit 1
fi

# Create optimized version
convert public/logo.png \
  -resize 400x400 \
  -quality 85 \
  -strip \
  public/logo-email.png

echo "✅ Optimized logo created: public/logo-email.png"
echo ""
echo "📏 Checking size..."
ls -lh public/logo-email.png

echo ""
echo "💡 To use this optimized version, update src/lib/email-logo.ts:"
echo "   Change 'logo.png' to 'logo-email.png'"
