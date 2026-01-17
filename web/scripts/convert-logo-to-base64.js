// Script to convert logo.png to base64 for email embedding
// Run with: node scripts/convert-logo-to-base64.js

const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '../public/logo.png');

if (!fs.existsSync(logoPath)) {
  console.error('Logo file not found at:', logoPath);
  process.exit(1);
}

try {
  const logoBuffer = fs.readFileSync(logoPath);
  const base64Logo = logoBuffer.toString('base64');
  const dataUri = `data:image/png;base64,${base64Logo}`;
  
  console.log('\n✅ Logo converted to base64!');
  console.log('\n📋 Copy this data URI and use it in your email templates:');
  console.log('\n' + '='.repeat(80));
  console.log(dataUri.substring(0, 100) + '... (truncated, full version saved to logo-base64.txt)');
  console.log('='.repeat(80));
  
  // Save to file for easy copying
  const outputPath = path.join(__dirname, '../logo-base64.txt');
  fs.writeFileSync(outputPath, dataUri);
  console.log(`\n💾 Full base64 data URI saved to: ${outputPath}`);
  console.log(`\n📏 Size: ${(base64Logo.length / 1024).toFixed(2)} KB (base64 encoded)`);
  console.log(`\n⚠️  Note: Some email clients have size limits. If emails fail, consider optimizing the logo.`);
  
} catch (error) {
  console.error('Error converting logo:', error);
  process.exit(1);
}
