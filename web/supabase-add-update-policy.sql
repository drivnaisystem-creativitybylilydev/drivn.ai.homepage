-- Add UPDATE policy to allow updating Leads table
-- Run this SQL in your Supabase SQL Editor

-- Drop existing update policy if it exists
DROP POLICY IF EXISTS "Allow public updates" ON "Leads";

-- Allow public updates (for webhook to update scheduled times)
CREATE POLICY "Allow public updates" ON "Leads"
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);
