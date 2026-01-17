# Phase 2: Email System Setup Instructions

## ✅ What's Already Done

- All code files have been created
- Database migration SQL file is ready
- `resend` package is already installed

## 📋 Step-by-Step Setup

### Step 1: Install Remaining Dependencies

Open your terminal and run:

```bash
cd /Users/finnschueler/Desktop/Drivn.ai_dev/web
npm install react-email @react-email/components
```

**Note:** If you get permission errors, try:
```bash
sudo npm install react-email @react-email/components
```

---

### Step 2: Run Database Migration

1. **Open Supabase Dashboard:**
   - Go to https://supabase.com/dashboard
   - Select your project: `xltdiksmnphfhuntqwqm`

2. **Open SQL Editor:**
   - Click "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the Migration:**
   - Open the file: `web/supabase-phase2-email-migration.sql`
   - Copy ALL the SQL code
   - Paste it into the Supabase SQL Editor
   - Click "Run" (or press Cmd+Enter)

4. **Verify Success:**
   - You should see "Success. No rows returned"
   - Check that the tables were created:
     - Go to "Table Editor" → You should see `email_templates` and `emails` tables
     - The `email_templates` table should have 4 default templates

---

### Step 3: Set Up Resend Account

1. **Sign Up / Log In:**
   - Go to https://resend.com
   - Sign up for a free account (or log in if you already have one)

2. **Get Your API Key:**
   - Once logged in, go to "API Keys" in the left sidebar
   - Click "Create API Key"
   - Give it a name (e.g., "Drivn.AI Production")
   - Copy the API key (starts with `re_`)

3. **Verify Your Domain (Important!):**
   - Go to "Domains" in Resend
   - Click "Add Domain"
   - Enter your domain (e.g., `yourdomain.com`)
   - Follow the DNS setup instructions to verify ownership
   - **Note:** You can use Resend's test domain for development, but you'll need your own domain for production

---

### Step 4: Add Environment Variables

1. **Open `.env.local` file:**
   ```bash
   cd /Users/finnschueler/Desktop/Drivn.ai_dev/web
   # Open .env.local in your editor
   ```

2. **Add these lines:**
   ```env
   # Resend Email Configuration
   RESEND_API_KEY=re_your_api_key_here
   FROM_EMAIL=hello@yourdomain.com
   FROM_NAME=Drivn.AI
   ```

3. **Replace the values:**
   - `re_your_api_key_here` → Your actual Resend API key from Step 3
   - `hello@yourdomain.com` → Your verified email address from Resend
   - `Drivn.AI` → Your company name (or leave as is)

**Example:**
```env
RESEND_API_KEY=re_abc123xyz789
FROM_EMAIL=hello@drivn.ai
FROM_NAME=Drivn.AI
```

---

### Step 5: Restart Your Development Server

1. **Stop the current server** (if running):
   - Press `Ctrl+C` in the terminal where it's running

2. **Start it again:**
   ```bash
   cd /Users/finnschueler/Desktop/Drivn.ai_dev/web
   npm run dev
   ```

3. **Verify it starts without errors**

---

### Step 6: Test the Email System

#### Test 1: Send Email from Client Detail Page

1. Go to: `http://localhost:3001/admin` (or your dev port)
2. Click on any client
3. Click "Send Email" button
4. Select a template or write a custom email
5. Click "Send Email"
6. Check your email inbox for the test email

#### Test 2: Verify Welcome Email Auto-Sends

1. Go to: `http://localhost:3001/book-call`
2. Fill out the form completely
3. Submit the form
4. Check the email you entered in the form
5. You should receive a welcome email automatically

#### Test 3: View Email Dashboard

1. Go to: `http://localhost:3001/admin/emails`
2. You should see:
   - Stats (Total Sent, Delivered, Opened, Open Rate)
   - List of all sent emails
   - Filter by status

---

### Step 7: (Optional) Set Up Email Tracking Webhook

For email open/click tracking:

1. **In Resend Dashboard:**
   - Go to "Webhooks"
   - Click "Add Webhook"

2. **Configure Webhook:**
   - **Endpoint URL:** `https://yourdomain.com/api/emails/webhook`
     - For local testing, use a service like ngrok:
       ```bash
       ngrok http 3001
       # Then use: https://your-ngrok-url.ngrok.io/api/emails/webhook
       ```
   - **Events to listen for:**
     - ✅ `email.delivered`
     - ✅ `email.opened`
     - ✅ `email.clicked`
     - ✅ `email.bounced`
   - Click "Add Webhook"

3. **Test:**
   - Send a test email
   - Open it in your email client
   - Check the email dashboard - status should update to "opened"

---

## 🐛 Troubleshooting

### "RESEND_API_KEY is not set" Error

- Make sure `.env.local` has `RESEND_API_KEY=re_...`
- Restart your dev server after adding env vars
- Check that the file is in the `web/` directory, not the root

### "Failed to send email" Error

- Verify your Resend API key is correct
- Check that `FROM_EMAIL` is verified in Resend
- Check Resend dashboard for error logs

### Emails Not Appearing in Dashboard

- Make sure the database migration ran successfully
- Check browser console for errors
- Verify the `emails` table exists in Supabase

### Welcome Email Not Sending

- Check browser console for errors
- Verify the form submission is completing
- Check that a welcome template exists in `email_templates` table

---

## ✅ Completion Checklist

- [ ] Installed `react-email` and `@react-email/components`
- [ ] Ran database migration in Supabase
- [ ] Created Resend account and got API key
- [ ] Added environment variables to `.env.local`
- [ ] Restarted dev server
- [ ] Successfully sent test email from client page
- [ ] Verified welcome email auto-sends
- [ ] Viewed email dashboard
- [ ] (Optional) Set up webhook for tracking

---

## 🎉 You're Done!

Once all steps are complete, you have a fully functional email system with:
- ✅ Email composer with templates
- ✅ Email history per client
- ✅ Email tracking (sent, delivered, opened)
- ✅ Email dashboard with stats
- ✅ Auto-welcome emails

**Next:** Ready for Phase 3 (Invoice Generation) when you are!
