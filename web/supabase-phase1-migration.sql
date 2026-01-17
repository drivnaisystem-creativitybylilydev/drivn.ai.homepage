-- Phase 1: Database Migration - Rename Leads to clients and add CRM fields
-- Run this SQL in your Supabase SQL Editor: https://app.supabase.com/project/xltdiksmnphfhuntqwqm/editor

-- Step 1: Rename Leads table to clients
ALTER TABLE "Leads" RENAME TO "clients";

-- Step 2: Add new CRM columns
ALTER TABLE "clients" 
ADD COLUMN IF NOT EXISTS "status" TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiating', 'won', 'lost', 'active', 'completed')),
ADD COLUMN IF NOT EXISTS "tags" TEXT[],
ADD COLUMN IF NOT EXISTS "notes" TEXT,
ADD COLUMN IF NOT EXISTS "source" TEXT,
ADD COLUMN IF NOT EXISTS "estimated_value" DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS "last_contact_date" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "next_followup_date" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "updated_at" TIMESTAMP DEFAULT NOW();

-- Step 3: Create indexes
CREATE INDEX IF NOT EXISTS idx_clients_status ON "clients"(status);
CREATE INDEX IF NOT EXISTS idx_clients_next_followup ON "clients"(next_followup_date);

-- Step 4: Create activities table for timeline
CREATE TABLE IF NOT EXISTS "activities" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "client_id" UUID REFERENCES "clients"(id) ON DELETE CASCADE,
  "type" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "metadata" JSONB DEFAULT '{}',
  "created_at" TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activities_client_id ON "activities"(client_id);

-- Step 5: Enable RLS on activities
ALTER TABLE "activities" ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "allow_public_read" ON "activities";
DROP POLICY IF EXISTS "allow_public_write" ON "activities";

-- Create policies for activities
CREATE POLICY "allow_public_read" ON "activities" FOR SELECT TO public USING (true);
CREATE POLICY "allow_public_write" ON "activities" FOR ALL TO public USING (true);

-- Step 6: Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists
DROP TRIGGER IF EXISTS update_clients_updated_at ON "clients";

-- Create trigger
CREATE TRIGGER update_clients_updated_at 
BEFORE UPDATE ON "clients"
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Step 7: Update existing RLS policies to use new table name
-- Drop old policies
DROP POLICY IF EXISTS "Allow public inserts" ON "clients";
DROP POLICY IF EXISTS "Allow public reads" ON "clients";
DROP POLICY IF EXISTS "Allow public updates" ON "clients";

-- Recreate policies with new table name
CREATE POLICY "Allow public inserts" ON "clients"
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public reads" ON "clients"
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public updates" ON "clients"
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Step 8: Set default status for existing records
UPDATE "clients" SET status = 'new' WHERE status IS NULL;
