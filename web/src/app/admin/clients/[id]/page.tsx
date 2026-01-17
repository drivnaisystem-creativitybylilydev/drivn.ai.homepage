'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getClientById, updateClient, getClientActivities, createActivity } from '@/lib/supabase-helpers';
import type { Client, Activity, ClientStatus } from '@/types/database';
import EmailComposer from '@/components/emails/EmailComposer';
import EmailHistory from '@/components/emails/EmailHistory';
import PasswordProtection from '@/components/PasswordProtection';

const STATUS_OPTIONS: ClientStatus[] = [
  'new', 'contacted', 'qualified', 'proposal_sent', 
  'negotiating', 'won', 'lost', 'active', 'completed'
];

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;

  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [client, setClient] = useState<Client | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [showEmailComposer, setShowEmailComposer] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true';
    setAuthenticated(isAuthenticated);
    setCheckingAuth(false);
  }, []);

  useEffect(() => {
    if (authenticated && clientId) {
      loadClient();
    }
  }, [authenticated, clientId]);

  async function loadClient() {
    try {
      const [clientData, activitiesData] = await Promise.all([
        getClientById(clientId),
        getClientActivities(clientId),
      ]);
      setClient(clientData);
      setActivities(activitiesData);
    } catch (error) {
      console.error('Error loading client:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(newStatus: ClientStatus) {
    if (!client) return;

    try {
      await updateClient(client.id, { status: newStatus });
      await createActivity({
        client_id: client.id,
        type: 'status_change',
        description: `Status changed from ${client.status} to ${newStatus}`,
      });
      setClient({ ...client, status: newStatus });
      loadClient(); // Reload to get updated activities
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  async function handleAddNote() {
    if (!newNote.trim() || !client) return;

    try {
      await updateClient(client.id, {
        notes: client.notes ? `${client.notes}\n\n${newNote}` : newNote,
      });
      await createActivity({
        client_id: client.id,
        type: 'note',
        description: newNote,
      });
      setNewNote('');
      loadClient();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }

  // Show password protection if not authenticated
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0014] via-[#1a0525] to-[#0a0014] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return <PasswordProtection onSuccess={() => setAuthenticated(true)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0014] via-[#1a0525] to-[#0a0014] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0014] via-[#1a0525] to-[#0a0014] flex items-center justify-center">
        <div className="text-white text-xl">Client not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0014] via-[#1a0525] to-[#0a0014] p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <button
              onClick={() => router.push('/admin')}
              className="text-gray-400 hover:text-white mb-4"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">{client.company_name}</h1>
            <p className="text-gray-400">{client.contact_name} • {client.email}</p>
          </div>
          <div className="space-x-3">
            <button 
              onClick={() => setShowEmailComposer(true)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition"
            >
              Send Email
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white hover:opacity-90 transition">
              Create Invoice
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Client Info */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Client Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <InfoField label="Phone" value={client.phone || '—'} />
                <InfoField label="Service Type" value={client.service_type || '—'} />
                <InfoField label="Monthly Leads" value={client.monthly_leads || '—'} />
                <InfoField label="Avg Ticket" value={client.average_ticket || '—'} />
                <InfoField label="Current CRM" value={client.current_crm || '—'} />
                <InfoField label="Urgency" value={client.urgency || '—'} />
                {client.scheduled_datetime && (
                  <>
                    <InfoField 
                      label="Scheduled Date" 
                      value={new Date(client.scheduled_datetime).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })} 
                    />
                    <InfoField 
                      label="Scheduled Time" 
                      value={new Date(client.scheduled_datetime).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })} 
                    />
                  </>
                )}
              </div>
            </div>

            {/* Email History */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Email History</h2>
              <EmailHistory clientId={client.id} />
            </div>

            {/* Notes */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Notes</h2>
              <div className="space-y-4">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 min-h-[100px]"
                />
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition"
                >
                  Add Note
                </button>
              </div>
              {client.notes && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg text-gray-300 whitespace-pre-wrap">
                  {client.notes}
                </div>
              )}
            </div>

            {/* Activity Timeline */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Activity Timeline</h2>
              <div className="space-y-4">
                {activities.length === 0 ? (
                  <div className="text-gray-400 text-center py-8">No activities yet</div>
                ) : (
                  activities.map((activity) => (
                    <div key={activity.id} className="flex gap-4 pb-4 border-b border-white/5 last:border-0">
                      <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <div className="text-white font-medium">{activity.description}</div>
                        <div className="text-sm text-gray-400 mt-1">
                          {new Date(activity.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Status</h3>
              <select
                value={client.status}
                onChange={(e) => handleStatusChange(e.target.value as ClientStatus)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <StatItem label="Estimated Value" value={`$${client.estimated_value || 0}`} />
                <StatItem label="Created" value={new Date(client.created_at).toLocaleDateString()} />
                <StatItem label="Last Updated" value={client.updated_at ? new Date(client.updated_at).toLocaleDateString() : '—'} />
              </div>
            </div>
          </div>
        </div>

        {/* Email Composer Modal */}
        {showEmailComposer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1a0525] border border-white/10 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Send Email</h2>
              <EmailComposer
                clientId={client.id}
                recipientEmail={client.email}
                recipientName={client.contact_name}
                defaultVariables={{
                  contact_name: client.contact_name,
                  company_name: client.company_name,
                }}
                onSend={() => {
                  setShowEmailComposer(false);
                  loadClient(); // Reload to show new email in history
                }}
                onCancel={() => setShowEmailComposer(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className="text-white">{value}</div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}
