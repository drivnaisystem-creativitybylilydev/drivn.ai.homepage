# Email Notification Setup (Resend)

## Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Get Your API Key

1. Once logged in, go to **API Keys** in the left sidebar
2. Click **Create API Key**
3. Give it a name (e.g., "Drivn.ai Notifications")
4. Copy the API key (you'll only see it once!)

## Step 3: Verify Your Domain (Optional but Recommended)

For production, you'll want to verify your domain. For testing, you can use Resend's default domain.

**For Testing (Quick Setup):**
- You can use `onboarding@resend.dev` as the sender (already configured)
- This works immediately but emails might go to spam

**For Production (Recommended):**
1. Go to **Domains** in Resend
2. Click **Add Domain**
3. Add your domain (e.g., `drivn.ai`)
4. Follow the DNS setup instructions
5. Once verified, update the `RESEND_FROM_EMAIL` in your `.env.local`

## Step 4: Add Environment Variables

Add these to your `.env.local` file in the `web` directory:

```bash
# Resend API Key (get from Step 2)
RESEND_API_KEY=re_your_api_key_here

# Email to receive notifications (your email)
NOTIFICATION_EMAIL=your-email@example.com

# From email (use your verified domain or leave default)
RESEND_FROM_EMAIL=Drivn.ai <notifications@yourdomain.com>

# Your site URL (for admin links in emails)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 5: Test It!

1. Complete a test survey submission
2. Check your email inbox (and spam folder)
3. You should receive a beautifully formatted email with all the lead details

## Email Features

The notification email includes:
- ✅ Business information
- ✅ Contact details (clickable email/phone links)
- ✅ Operations & systems
- ✅ Challenges & pain points
- ✅ Success goals
- ✅ Timeline urgency
- ✅ Direct link to admin dashboard

## Troubleshooting

**Emails not sending?**
- Check that `RESEND_API_KEY` is set correctly in `.env.local`
- Make sure `NOTIFICATION_EMAIL` is your actual email address
- Restart your dev server after adding env variables
- Check the browser console for errors

**Emails going to spam?**
- Verify your domain in Resend (recommended for production)
- Use a professional "from" email address
- Consider setting up SPF/DKIM records (Resend will guide you)

## Free Tier Limits

Resend's free tier includes:
- 3,000 emails/month
- 100 emails/day
- Perfect for getting started!





