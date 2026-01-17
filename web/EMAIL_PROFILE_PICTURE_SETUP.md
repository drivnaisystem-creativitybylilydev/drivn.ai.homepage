# Email Profile Picture Setup

## How Email Profile Pictures Work

Email clients (Gmail, Outlook, etc.) show profile pictures based on the sender's email address. They use:

1. **Gravatar** - If the sender email has a Gravatar account
2. **Email provider's system** - Gmail/Outlook use their own systems
3. **Company directory** - For business accounts

## Setting Up Your Logo as Profile Picture

### Option 1: Use Gravatar (Recommended)

1. Go to https://gravatar.com
2. Create an account using your **FROM_EMAIL** address (the one in your `.env.local`)
3. Upload your logo as the profile picture
4. Set it as your Gravatar
5. **Result:** All emails sent from that address will show your logo

### Option 2: Use Your Domain Email

If you have your own domain:
1. Use an email like `hello@yourdomain.com` as FROM_EMAIL
2. Set up Gravatar for that email
3. Upload your logo

### Option 3: Company Directory (For Business Accounts)

If using Google Workspace or Microsoft 365:
1. Upload your logo to the company directory
2. Associate it with the sending email address
3. It will appear automatically

## Current Setup

Your current FROM_EMAIL is: `onboarding@resend.dev`

**To get your logo as the profile picture:**
1. Create a Gravatar account with `onboarding@resend.dev`
2. Upload your logo
3. Future emails will show your logo

**Or** when you get your domain:
1. Use `hello@yourdomain.com` as FROM_EMAIL
2. Set up Gravatar for that email
3. Upload your logo

## Note

- Profile pictures are controlled by the email client, not the email content
- The logo in the email body (what we just added) is separate from the profile picture
- Both will show: profile picture in the header, logo in the email content
