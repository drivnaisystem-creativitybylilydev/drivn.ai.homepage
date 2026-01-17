-- Update all email templates with branded styling
-- Run this in Supabase SQL Editor after the initial migration

-- Branded email template wrapper
-- This creates a consistent branded template that can be reused

-- Update Welcome Email
UPDATE "email_templates" 
SET body = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0a0014 0%, #1a0525 50%, #0a0014 100%); font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', Roboto, ''Helvetica Neue'', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #0a0014 0%, #1a0525 50%, #0a0014 100%);">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background: rgba(26, 5, 37, 0.8); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 20px 60px rgba(107, 54, 255, 0.2);">
          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding: 40px 20px 30px;">
              <img src="{{LOGO_PLACEHOLDER}}" alt="Drivn.AI" style="max-width: 180px; height: auto; display: block;" />
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 20px 0; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3); line-height: 1.3;">
                Welcome, {{contact_name}}! 🎉
              </h1>
              <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3);">
                Thank you for your interest in our services. We''re excited to work with you and <strong style="color: #ff9dff;">{{company_name}}</strong>.
              </p>
              <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3);">
                We''ll be in touch shortly to discuss your project in detail.
              </p>
              <p style="color: #ffffff; font-size: 14px; line-height: 1.6; margin: 32px 0 0 0; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3);">
                Best regards,<br>
                <strong style="color: #ff9dff;">The Drivn.AI Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
'
WHERE name = 'Welcome Email';

-- Update Follow-up Email
UPDATE "email_templates" 
SET body = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0a0014 0%, #1a0525 50%, #0a0014 100%); font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', Roboto, ''Helvetica Neue'', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #0a0014 0%, #1a0525 50%, #0a0014 100%);">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background: rgba(26, 5, 37, 0.8); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 20px 60px rgba(107, 54, 255, 0.2);">
          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding: 40px 20px 30px;">
              <img src="{{LOGO_PLACEHOLDER}}" alt="Drivn.AI" style="max-width: 180px; height: auto; display: block;" />
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 20px 0; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3); line-height: 1.3;">
                Hi {{contact_name}},
              </h1>
              <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3);">
                Just wanted to follow up on your recent inquiry about our services.
              </p>
              <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3);">
                Do you have time for a quick call this week to discuss <strong style="color: #ff9dff;">{{company_name}}</strong>''s needs?
              </p>
              <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3);">
                Looking forward to hearing from you!
              </p>
              <p style="color: #ffffff; font-size: 14px; line-height: 1.6; margin: 32px 0 0 0; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3);">
                Best regards,<br>
                <strong style="color: #ff9dff;">The Drivn.AI Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
'
WHERE name = 'Follow-up Day 3';

-- Update Proposal Ready Email
UPDATE "email_templates" 
SET body = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0a0014 0%, #1a0525 50%, #0a0014 100%); font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', Roboto, ''Helvetica Neue'', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #0a0014 0%, #1a0525 50%, #0a0014 100%);">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background: rgba(26, 5, 37, 0.8); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 20px 60px rgba(107, 54, 255, 0.2);">
          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding: 40px 20px 30px;">
              <img src="{{LOGO_PLACEHOLDER}}" alt="Drivn.AI" style="max-width: 180px; height: auto; display: block;" />
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 20px 0; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3); line-height: 1.3;">
                Hi {{contact_name}},
              </h1>
              <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3);">
                Great news! Your custom proposal is ready for review.
              </p>
              <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3);">
                We''ve tailored this specifically to <strong style="color: #ff9dff;">{{company_name}}</strong>''s needs and would love to discuss it with you.
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="{{proposal_link}}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(to right, #6b36ff, #a367ff, #ff9dff); color: #0a0014; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 8px 24px rgba(107, 54, 255, 0.4); transition: transform 0.2s;">
                  View Proposal
                </a>
              </div>
              <p style="color: #ffffff; font-size: 14px; line-height: 1.6; margin: 32px 0 0 0; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3);">
                Best regards,<br>
                <strong style="color: #ff9dff;">The Drivn.AI Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
'
WHERE name = 'Proposal Ready';

-- Update Invoice Notification Email
UPDATE "email_templates" 
SET body = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0a0014 0%, #1a0525 50%, #0a0014 100%); font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', Roboto, ''Helvetica Neue'', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #0a0014 0%, #1a0525 50%, #0a0014 100%);">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background: rgba(26, 5, 37, 0.8); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 20px 60px rgba(107, 54, 255, 0.2);">
          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding: 40px 20px 30px;">
              <img src="{{LOGO_PLACEHOLDER}}" alt="Drivn.AI" style="max-width: 180px; height: auto; display: block;" />
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 20px 0; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3); line-height: 1.3;">
                Hi {{contact_name}},
              </h1>
              <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3);">
                Please find your invoice attached.
              </p>
              <div style="background: rgba(107, 54, 255, 0.1); border: 1px solid rgba(107, 54, 255, 0.3); border-radius: 8px; padding: 20px; margin: 24px 0;">
                <p style="color: #ffffff; font-size: 14px; line-height: 1.8; margin: 8px 0; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3);">
                  <strong style="color: #ff9dff;">Invoice Number:</strong> {{invoice_number}}<br>
                  <strong style="color: #ff9dff;">Amount:</strong> {{total}}<br>
                  <strong style="color: #ff9dff;">Due Date:</strong> {{due_date}}
                </p>
              </div>
              <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin: 24px 0 0 0; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3);">
                Thank you for your business!
              </p>
              <p style="color: #ffffff; font-size: 14px; line-height: 1.6; margin: 32px 0 0 0; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3);">
                Best regards,<br>
                <strong style="color: #ff9dff;">The Drivn.AI Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
'
WHERE name = 'Invoice Notification';
