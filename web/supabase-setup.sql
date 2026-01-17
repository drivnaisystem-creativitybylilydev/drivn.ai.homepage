-- Create the survey_submissions table in Supabase
-- Run this SQL in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Drop the old table if it exists (only if you want to start fresh)
-- DROP TABLE IF EXISTS survey_submissions CASCADE;

CREATE TABLE IF NOT EXISTS survey_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT,
  monthly_leads TEXT,
  average_ticket TEXT,
  current_crm TEXT,
  urgency TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create an index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_survey_submissions_created_at ON survey_submissions(created_at DESC);

-- Optional: Enable Row Level Security (RLS) if you want to restrict access
-- For now, we'll allow public inserts but you can restrict this later
ALTER TABLE survey_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid errors on re-run)
DROP POLICY IF EXISTS "Allow public inserts" ON survey_submissions;
DROP POLICY IF EXISTS "Allow public reads" ON survey_submissions;

-- Allow anyone to insert (for the survey form)
CREATE POLICY "Allow public inserts" ON survey_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to read (you'll need to add auth later if you want to restrict)
-- For now, we'll allow public reads for the admin page
-- You can restrict this by requiring authentication on the admin page
CREATE POLICY "Allow public reads" ON survey_submissions
  FOR SELECT
  TO public
  USING (true);

