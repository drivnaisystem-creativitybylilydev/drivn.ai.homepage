-- Run this FIRST to clean up any existing policies
-- Then run supabase-setup.sql

DROP POLICY IF EXISTS "Allow public inserts" ON survey_submissions;
DROP POLICY IF EXISTS "Allow public reads" ON survey_submissions;





