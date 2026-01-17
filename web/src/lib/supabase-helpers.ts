import { supabase } from './supabase';
import type { Client, Activity } from '@/types/database';

// Client operations
export async function getClients(filters?: {
  status?: string;
  search?: string;
}) {
  let query = supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  if (filters?.search) {
    query = query.or(
      `company_name.ilike.%${filters.search}%,` +
      `contact_name.ilike.%${filters.search}%,` +
      `email.ilike.%${filters.search}%`
    );
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Client[];
}

export async function getClientById(id: string) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Client;
}

export async function updateClient(id: string, updates: Partial<Client>) {
  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Client;
}

// Activity operations
export async function getClientActivities(clientId: string) {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Activity[];
}

export async function createActivity(activity: Omit<Activity, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('activities')
    .insert(activity)
    .select()
    .single();

  if (error) throw error;
  return data as Activity;
}

// Stats for dashboard
export async function getClientStats() {
  const { data: all } = await supabase.from('clients').select('id, status, estimated_value');
  
  if (!all) return null;

  return {
    total: all.length,
    new: all.filter(c => c.status === 'new').length,
    active: all.filter(c => c.status === 'active').length,
    won: all.filter(c => c.status === 'won').length,
    totalValue: all.reduce((sum, c) => sum + (Number(c.estimated_value) || 0), 0),
  };
}
