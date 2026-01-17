import { supabase } from './supabase';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
  variables: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmailLog {
  id: string;
  client_id?: string;
  template_id?: string;
  subject: string;
  body: string;
  recipient_email: string;
  recipient_name?: string;
  status: string;
  sent_at: string;
  opened_at?: string;
  clicked_at?: string;
  error_message?: string;
  resend_id?: string;
  created_at: string;
}

// Replace variables in template
export function replaceVariables(
  text: string,
  variables: Record<string, string>
): string {
  let result = text;
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value || '');
  });
  return result;
}

// Get all templates
export async function getEmailTemplates(category?: string) {
  let query = supabase
    .from('email_templates')
    .select('*')
    .eq('is_active', true)
    .order('category', { ascending: true });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as EmailTemplate[];
}

// Get template by ID
export async function getEmailTemplate(id: string) {
  const { data, error } = await supabase
    .from('email_templates')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as EmailTemplate;
}

// Get template by category (for auto-emails)
export async function getEmailTemplateByCategory(category: string) {
  const { data, error } = await supabase
    .from('email_templates')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
    .limit(1)
    .single();

  if (error) return null;
  return data as EmailTemplate | null;
}

// Log sent email
export async function logEmail(email: Omit<EmailLog, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('emails')
    .insert(email)
    .select()
    .single();

  if (error) throw error;
  return data as EmailLog;
}

// Get emails for a client
export async function getClientEmails(clientId: string) {
  const { data, error } = await supabase
    .from('emails')
    .select('*')
    .eq('client_id', clientId)
    .order('sent_at', { ascending: false });

  if (error) throw error;
  return data as EmailLog[];
}

// Get all recent emails
export async function getRecentEmails(limit = 50) {
  const { data, error } = await supabase
    .from('emails')
    .select('*')
    .order('sent_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as EmailLog[];
}

// Update email status (for webhooks)
export async function updateEmailStatus(
  resendId: string,
  status: string,
  metadata?: Record<string, any>
) {
  const updates: any = { status };

  if (status === 'opened' && !metadata?.opened_at) {
    updates.opened_at = new Date().toISOString();
  }
  if (status === 'clicked' && !metadata?.clicked_at) {
    updates.clicked_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('emails')
    .update(updates)
    .eq('resend_id', resendId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
