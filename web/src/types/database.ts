export type ClientStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 
  'negotiating' | 'won' | 'lost' | 'active' | 'completed';

export interface Client {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string | null;
  service_type?: string | null;
  monthly_leads?: string | null;
  average_ticket?: string | null;
  current_crm?: string | null;
  urgency?: string | null;
  scheduled_date?: string | null;
  scheduled_time?: string | null;
  scheduled_datetime?: string | null;
  calendly_event_uri?: string | null;
  status: ClientStatus;
  tags?: string[] | null;
  notes?: string | null;
  source?: string | null;
  estimated_value?: number | null;
  last_contact_date?: string | null;
  next_followup_date?: string | null;
  created_at: string;
  updated_at?: string | null;
}

export type ActivityType = 'note' | 'email_sent' | 'call' | 'meeting' | 
  'proposal_sent' | 'invoice_sent' | 'status_change';

export interface Activity {
  id: string;
  client_id: string;
  type: ActivityType;
  description: string;
  metadata?: Record<string, any> | null;
  created_at: string;
}
