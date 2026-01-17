/**
 * Wraps email content with branded template
 * Use this for custom emails to ensure consistent branding
 * Logo will be embedded via embedLogoInEmail() function
 */
export function wrapEmailWithBrand(content: string): string {
  // Use placeholder - will be replaced with base64 logo by embedLogoInEmail()
  const logo = '{{LOGO_PLACEHOLDER}}';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0a0014 0%, #1a0525 50%, #0a0014 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #0a0014 0%, #1a0525 50%, #0a0014 100%);">
    <tr>
      <td align="center" style="padding: 0;">
        <table role="presentation" style="max-width: 800px; width: 100%; border-collapse: collapse;">
          <!-- Purple Gradient Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a0014 0%, #1a0525 50%, #0a0014 100%); padding: 60px 60px 50px; text-align: center;">
              <img src="${logo}" alt="Drivn.AI" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
            </td>
          </tr>
          
          <!-- White Content Area -->
          <tr>
            <td style="background: #ffffff; padding: 60px;">
              ${content}
            </td>
          </tr>
          
          <!-- Purple Gradient Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a0014 0%, #1a0525 50%, #0a0014 100%); padding: 40px 60px; text-align: center;">
              <p style="color: #ffffff; font-size: 14px; line-height: 1.6; margin: 0; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3);">
                <strong style="color: #ff9dff;">Drivn.AI</strong><br>
                Where Automation Meets Impact
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Creates branded text with lift effect and black glow
 */
export function brandedText(text: string, tag: 'h1' | 'h2' | 'p' | 'strong' = 'p'): string {
  const fontSize = tag === 'h1' ? '28px' : tag === 'h2' ? '24px' : tag === 'strong' ? '16px' : '16px';
  const fontWeight = tag === 'h1' || tag === 'h2' ? '700' : tag === 'strong' ? '600' : '400';
  const margin = tag === 'h1' ? '0 0 20px 0' : tag === 'h2' ? '0 0 16px 0' : '0 0 16px 0';
  
  return `<${tag} style="color: #ffffff; font-size: ${fontSize}; font-weight: ${fontWeight}; margin: ${margin}; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3); line-height: 1.6;">${text}</${tag}>`;
}
