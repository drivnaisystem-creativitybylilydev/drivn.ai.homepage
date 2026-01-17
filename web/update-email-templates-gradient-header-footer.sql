-- Update all email templates with purple gradient header/footer and white content area
-- Run this in Supabase SQL Editor

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
      <td align="center" style="padding: 0;">
        <table role="presentation" style="max-width: 800px; width: 100%; border-collapse: collapse;">
          <!-- Purple Gradient Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a0014 0%, #1a0525 50%, #0a0014 100%); padding: 60px 60px 50px; text-align: center;">
              <img src="{{LOGO_PLACEHOLDER}}" alt="Drivn.AI" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
            </td>
          </tr>
          
          <!-- White Content Area -->
          <tr>
            <td style="background: #ffffff; padding: 60px;">
              <h1 style="color: #1a1a1a; font-size: 32px; font-weight: 700; margin: 0 0 24px 0; line-height: 1.3; text-align: center;">
                Welcome, {{contact_name}}! 🎉
              </h1>
              <p style="color: #4a4a4a; font-size: 18px; line-height: 1.7; margin: 0 0 20px 0; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto;">
                Thank you for your interest in our services. We''re excited to work with you and <strong style="color: #6b36ff;">{{company_name}}</strong>.
              </p>
              <p style="color: #4a4a4a; font-size: 18px; line-height: 1.7; margin: 0 0 40px 0; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto;">
                We''ll be in touch shortly to discuss your project in detail.
              </p>
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 40px 0 0 0; text-align: center;">
                Best regards,<br>
                <strong style="color: #1a1a1a;">The Drivn.AI Team</strong>
              </p>
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
      <td align="center" style="padding: 0;">
        <table role="presentation" style="max-width: 800px; width: 100%; border-collapse: collapse;">
          <!-- Purple Gradient Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a0014 0%, #1a0525 50%, #0a0014 100%); padding: 60px 60px 50px; text-align: center;">
              <img src="{{LOGO_PLACEHOLDER}}" alt="Drivn.AI" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
            </td>
          </tr>
          
          <!-- White Content Area -->
          <tr>
            <td style="background: #ffffff; padding: 60px;">
              <h1 style="color: #1a1a1a; font-size: 32px; font-weight: 700; margin: 0 0 24px 0; line-height: 1.3; text-align: center;">
                Hi {{contact_name}},
              </h1>
              <p style="color: #4a4a4a; font-size: 18px; line-height: 1.7; margin: 0 0 20px 0; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto;">
                Just wanted to follow up on your recent inquiry about our services.
              </p>
              <p style="color: #4a4a4a; font-size: 18px; line-height: 1.7; margin: 0 0 20px 0; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto;">
                Do you have time for a quick call this week to discuss <strong style="color: #6b36ff;">{{company_name}}</strong>''s needs?
              </p>
              <p style="color: #4a4a4a; font-size: 18px; line-height: 1.7; margin: 0 0 40px 0; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto;">
                Looking forward to hearing from you!
              </p>
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 40px 0 0 0; text-align: center;">
                Best regards,<br>
                <strong style="color: #1a1a1a;">The Drivn.AI Team</strong>
              </p>
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
      <td align="center" style="padding: 0;">
        <table role="presentation" style="max-width: 800px; width: 100%; border-collapse: collapse;">
          <!-- Purple Gradient Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a0014 0%, #1a0525 50%, #0a0014 100%); padding: 60px 60px 50px; text-align: center;">
              <img src="{{LOGO_PLACEHOLDER}}" alt="Drivn.AI" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
            </td>
          </tr>
          
          <!-- White Content Area -->
          <tr>
            <td style="background: #ffffff; padding: 60px;">
              <h1 style="color: #1a1a1a; font-size: 32px; font-weight: 700; margin: 0 0 24px 0; line-height: 1.3; text-align: center;">
                Hi {{contact_name}},
              </h1>
              <p style="color: #4a4a4a; font-size: 18px; line-height: 1.7; margin: 0 0 20px 0; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto;">
                Great news! Your custom proposal is ready for review.
              </p>
              <p style="color: #4a4a4a; font-size: 18px; line-height: 1.7; margin: 0 0 40px 0; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto;">
                We''ve tailored this specifically to <strong style="color: #6b36ff;">{{company_name}}</strong>''s needs and would love to discuss it with you.
              </p>
              <div style="text-align: center; margin: 40px 0;">
                <a href="{{proposal_link}}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(to right, #6b36ff, #a367ff, #ff9dff); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 18px; box-shadow: 0 4px 12px rgba(107, 54, 255, 0.3);">
                  View Proposal
                </a>
              </div>
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 40px 0 0 0; text-align: center;">
                Best regards,<br>
                <strong style="color: #1a1a1a;">The Drivn.AI Team</strong>
              </p>
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
      <td align="center" style="padding: 0;">
        <table role="presentation" style="max-width: 800px; width: 100%; border-collapse: collapse;">
          <!-- Purple Gradient Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a0014 0%, #1a0525 50%, #0a0014 100%); padding: 60px 60px 50px; text-align: center;">
              <img src="{{LOGO_PLACEHOLDER}}" alt="Drivn.AI" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
            </td>
          </tr>
          
          <!-- White Content Area -->
          <tr>
            <td style="background: #ffffff; padding: 60px;">
              <h1 style="color: #1a1a1a; font-size: 32px; font-weight: 700; margin: 0 0 24px 0; line-height: 1.3; text-align: center;">
                Hi {{contact_name}},
              </h1>
              <p style="color: #4a4a4a; font-size: 18px; line-height: 1.7; margin: 0 0 40px 0; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto;">
                Please find your invoice attached.
              </p>
              <div style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 30px; margin: 40px auto; max-width: 500px; text-align: center;">
                <p style="color: #1a1a1a; font-size: 16px; line-height: 1.8; margin: 8px 0; text-align: center;">
                  <strong style="color: #6b36ff;">Invoice Number:</strong> {{invoice_number}}<br>
                  <strong style="color: #6b36ff;">Amount:</strong> {{total}}<br>
                  <strong style="color: #6b36ff;">Due Date:</strong> {{due_date}}
                </p>
              </div>
              <p style="color: #4a4a4a; font-size: 18px; line-height: 1.7; margin: 40px 0 0 0; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto;">
                Thank you for your business!
              </p>
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 40px 0 0 0; text-align: center;">
                Best regards,<br>
                <strong style="color: #1a1a1a;">The Drivn.AI Team</strong>
              </p>
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
'
WHERE name = 'Invoice Notification';
