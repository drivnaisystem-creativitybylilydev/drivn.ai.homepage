# Calendly Webhook Setup Guide

## Overview
This system automatically captures scheduled call times from Calendly when leads book appointments. The scheduled date and time will appear in your admin dashboard.

## Step 1: Add Database Fields

1. Go to your Supabase SQL Editor:
   - https://app.supabase.com/project/xltdiksmnphfhuntqwqm/editor

2. Copy and paste the contents of `supabase-add-scheduled-fields.sql`

3. Click "Run" to execute the SQL

4. You should see "Success. No rows returned"

## Step 2: Set Up Calendly Webhook

1. **Get your webhook URL:**
   - For local development: Use a service like **ngrok** to expose your localhost
   - For production: Use your deployed URL
   - Webhook endpoint: `https://your-domain.com/api/calendly-webhook`

2. **Set up ngrok (for local testing):**
   ```bash
   # Install ngrok if you haven't
   brew install ngrok  # macOS
   # or download from https://ngrok.com/
   
   # Start ngrok tunnel
   ngrok http 3001
   
   # Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
   ```

3. **Add API Key to Environment Variables:**
   - Open your `.env.local` file in the `web` directory
   - Add your Calendly API key:
     ```
     CALENDLY_API_KEY=your-api-key-here
     CALENDLY_SIGNING_KEY=your-webhook-signing-key-here
     ```
   - Restart your dev server after adding

4. **Configure Calendly Webhook:**
   - Go to Calendly Settings → Integrations → Webhooks
   - Click "Add Webhook Subscription"
   - **Webhook URL:** `https://your-ngrok-url.ngrok.io/api/calendly-webhook` (or your production URL)
   - **Events to subscribe to:** Select "invitee.created"
   - **Signing key:** Copy this and add it to `.env.local` as `CALENDLY_SIGNING_KEY`
   - Click "Add Webhook"

## Step 3: Test the Webhook

1. Fill out your form and book a test appointment in Calendly
2. Check your terminal/server logs for webhook activity
3. Check the admin dashboard - the scheduled time should appear

## How It Works

1. Lead fills out form → Data saved to Supabase
2. Lead books appointment in Calendly
3. Calendly sends webhook to `/api/calendly-webhook`
4. Webhook matches the email and updates the lead record with scheduled time
5. Scheduled date/time appears in admin dashboard

## Troubleshooting

**Webhook not receiving data:**
- Check that ngrok is running (for local dev)
- Verify webhook URL in Calendly settings
- Check server logs for errors
- Make sure the email in Calendly matches the email in the form

**Scheduled time not appearing:**
- Check that the SQL migration ran successfully
- Verify the webhook is receiving events (check logs)
- Check that email addresses match between form and Calendly booking

**For Production:**
- Replace ngrok URL with your actual domain
- Add webhook signing key for security
- Set up proper error monitoring

## Webhook Payload Structure

The webhook receives data like this:
```json
{
  "event": "invitee.created",
  "payload": {
    "invitee": {
      "email": "john@example.com",
      "uri": "https://api.calendly.com/invitees/..."
    },
    "scheduled_event": {
      "start_time": "2024-01-20T10:00:00.000000Z"
    },
    "event_uri": "https://api.calendly.com/scheduled_events/..."
  }
}
```

The system automatically:
- Extracts the email
- Parses the scheduled time
- Finds the matching lead by email
- Updates the lead record with scheduled date/time
