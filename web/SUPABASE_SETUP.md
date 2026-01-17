# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in your project details (name, database password, region)
4. Wait for the project to be created (~2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project, go to **Settings** → **API**
2. Copy your **Project URL** (looks like: `https://xxxxx.supabase.co`)
3. Copy your **anon/public key** (under "Project API keys")

## Step 3: Create the Database Table

1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase-setup.sql` from this directory
4. Click "Run" to execute the SQL
5. You should see "Success. No rows returned"

## Step 4: Add Environment Variables

1. Create a file called `.env.local` in the `web` directory (if it doesn't exist)
2. Add these two lines:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace `your-project-url-here` with your Project URL from Step 2
4. Replace `your-anon-key-here` with your anon key from Step 2

## Step 5: Restart Your Dev Server

1. Stop your current dev server (Ctrl+C)
2. Run `npm run dev` again
3. The survey will now save to Supabase!

## Viewing Submissions

Once everything is set up, you can view all survey submissions at:
- **http://localhost:3000/admin** (or your deployed URL + `/admin`)

The admin page shows:
- All survey responses
- Business information
- Contact details
- Challenges and goals
- Sorted by most recent first

## Security Note

Currently, the admin page is publicly accessible. If you want to add authentication later, you can:
1. Set up Supabase Auth
2. Add authentication checks to the admin page
3. Update the RLS policies in Supabase to restrict access

For now, you can protect it by:
- Not sharing the `/admin` URL publicly
- Adding a simple password check (we can implement this if needed)





