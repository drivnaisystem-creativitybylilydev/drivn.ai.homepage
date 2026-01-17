-- Add scheduled date/time fields to Leads table
-- Run this SQL in your Supabase SQL Editor

ALTER TABLE "Leads" 
ADD COLUMN IF NOT EXISTS scheduled_date DATE,
ADD COLUMN IF NOT EXISTS scheduled_time TIME,
ADD COLUMN IF NOT EXISTS scheduled_datetime TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS calendly_event_uri TEXT;

-- Add index for scheduled dates
CREATE INDEX IF NOT EXISTS idx_leads_scheduled_datetime ON "Leads"(scheduled_datetime);

-- Add comment for documentation
COMMENT ON COLUMN "Leads".scheduled_date IS 'Date when the call is scheduled (from Calendly)';
COMMENT ON COLUMN "Leads".scheduled_time IS 'Time when the call is scheduled (from Calendly)';
COMMENT ON COLUMN "Leads".scheduled_datetime IS 'Full timestamp when the call is scheduled (from Calendly)';
COMMENT ON COLUMN "Leads".calendly_event_uri IS 'Calendly event URI for reference';
