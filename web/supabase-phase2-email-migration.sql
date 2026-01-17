-- Email Templates Table
CREATE TABLE IF NOT EXISTS "email_templates" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "category" TEXT CHECK (category IN ('welcome', 'followup', 'proposal', 'invoice', 'project_update', 'general')),
  "variables" JSONB DEFAULT '[]',
  "is_active" BOOLEAN DEFAULT true,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Emails Sent Log
CREATE TABLE IF NOT EXISTS "emails" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "client_id" UUID REFERENCES "clients"(id) ON DELETE SET NULL,
  "template_id" UUID REFERENCES "email_templates"(id) ON DELETE SET NULL,
  "subject" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "recipient_email" TEXT NOT NULL,
  "recipient_name" TEXT,
  "status" TEXT DEFAULT 'sent' CHECK (status IN ('queued', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed')),
  "sent_at" TIMESTAMP DEFAULT NOW(),
  "opened_at" TIMESTAMP,
  "clicked_at" TIMESTAMP,
  "error_message" TEXT,
  "resend_id" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_emails_client_id ON "emails"(client_id);
CREATE INDEX IF NOT EXISTS idx_emails_status ON "emails"(status);
CREATE INDEX IF NOT EXISTS idx_emails_sent_at ON "emails"(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_templates_category ON "email_templates"(category);

-- Enable RLS
ALTER TABLE "email_templates" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "emails" ENABLE ROW LEVEL SECURITY;

-- Create policies for email_templates
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'email_templates' AND policyname = 'allow_public_read') THEN
        CREATE POLICY "allow_public_read" ON "email_templates" FOR SELECT TO public USING (true);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'email_templates' AND policyname = 'allow_public_write') THEN
        CREATE POLICY "allow_public_write" ON "email_templates" FOR ALL TO public USING (true);
    END IF;
END $$;

-- Create policies for emails
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'emails' AND policyname = 'allow_public_read') THEN
        CREATE POLICY "allow_public_read" ON "emails" FOR SELECT TO public USING (true);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'emails' AND policyname = 'allow_public_write') THEN
        CREATE POLICY "allow_public_write" ON "emails" FOR ALL TO public USING (true);
    END IF;
END $$;

-- Insert default templates
INSERT INTO "email_templates" (name, subject, body, category, variables) VALUES
(
  'Welcome Email',
  'Welcome to {{company_name}}! 🎉',
  '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #6b36ff;">Welcome, {{contact_name}}!</h1>
    <p>Thank you for your interest in our services. We''re excited to work with you and {{company_name}}.</p>
    <p>We''ll be in touch shortly to discuss your project in detail.</p>
    <p>Best regards,<br><strong>The Team</strong></p>
  </div>',
  'welcome',
  '["contact_name", "company_name"]'::jsonb
),
(
  'Follow-up Day 3',
  'Following up on your inquiry',
  '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #6b36ff;">Hi {{contact_name}},</h1>
    <p>Just wanted to follow up on your recent inquiry about our services.</p>
    <p>Do you have time for a quick call this week to discuss {{company_name}}''s needs?</p>
    <p>Looking forward to hearing from you!</p>
    <p>Best regards,<br><strong>The Team</strong></p>
  </div>',
  'followup',
  '["contact_name", "company_name"]'::jsonb
),
(
  'Proposal Ready',
  'Your Custom Proposal is Ready',
  '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #6b36ff;">Hi {{contact_name}},</h1>
    <p>Great news! Your custom proposal is ready for review.</p>
    <p>We''ve tailored this specifically to {{company_name}}''s needs and would love to discuss it with you.</p>
    <p><a href="{{proposal_link}}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #6b36ff, #ff9dff); color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">View Proposal</a></p>
    <p>Best regards,<br><strong>The Team</strong></p>
  </div>',
  'proposal',
  '["contact_name", "company_name", "proposal_link"]'::jsonb
),
(
  'Invoice Notification',
  'Invoice from {{company_name}}',
  '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #6b36ff;">Hi {{contact_name}},</h1>
    <p>Please find your invoice attached.</p>
    <p><strong>Invoice Number:</strong> {{invoice_number}}<br>
    <strong>Amount:</strong> {{total}}<br>
    <strong>Due Date:</strong> {{due_date}}</p>
    <p>Thank you for your business!</p>
    <p>Best regards,<br><strong>The Team</strong></p>
  </div>',
  'invoice',
  '["contact_name", "company_name", "invoice_number", "total", "due_date"]'::jsonb
);

-- Update trigger for email_templates
CREATE OR REPLACE FUNCTION update_email_templates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_email_templates_updated_at') THEN
        CREATE TRIGGER update_email_templates_updated_at 
        BEFORE UPDATE ON "email_templates"
        FOR EACH ROW EXECUTE FUNCTION update_email_templates_updated_at();
    END IF;
END $$;
