'use client';

import { useState, useEffect } from 'react';
import type { EmailLog } from '@/lib/email-utils';
import PasswordProtection from '@/components/PasswordProtection';

export default function EmailsPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [emails, setEmails] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Check authentication on mount
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true';
    setAuthenticated(isAuthenticated);
    setCheckingAuth(false);
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadEmails();
    }
  }, [authenticated]);

  async function loadEmails() {
    try {
      const response = await fetch('/api/emails/recent');
      if (response.ok) {
        const data = await response.json();
        setEmails(data.emails || []);
      }
    } catch (error) {
      console.error('Error loading emails:', error);
    } finally {
      setLoading(false);
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

  const filteredEmails = filter === 'all' 
    ? emails 
    : emails.filter(e => e.status === filter);

  const stats = {
    total: emails.length,
    sent: emails.filter(e => e.status === 'sent').length,
    delivered: emails.filter(e => e.status === 'delivered').length,
    opened: emails.filter(e => e.status === 'opened').length,
    openRate: emails.length > 0 
      ? ((emails.filter(e => e.opened_at).length / emails.length) * 100).toFixed(1)
      : '0',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0014] via-[#1a0525] to-[#0a0014] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Email Dashboard</h1>
          <p className="text-gray-400">Track all sent emails and engagement</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <StatCard label="Total Sent" value={stats.total} />
          <StatCard label="Delivered" value={stats.delivered} color="green" />
          <StatCard label="Opened" value={stats.opened} color="purple" />
          <StatCard label="Open Rate" value={`${stats.openRate}%`} color="cyan" />
        </div>

        {/* Filter */}
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Emails</option>
            <option value="sent">Sent</option>
            <option value="delivered">Delivered</option>
            <option value="opened">Opened</option>
            <option value="clicked">Clicked</option>
            <option value="bounced">Bounced</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Email List */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading...</div>
          ) : filteredEmails.length === 0 ? (
            <div className="p-12 text-center text-gray-400">No emails found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Subject</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Recipient</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Sent</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Opened</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredEmails.map((email) => (
                    <tr key={email.id} className="hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-white">{email.subject}</td>
                      <td className="px-6 py-4">
                        <div className="text-white">{email.recipient_name || '—'}</div>
                        <div className="text-sm text-gray-400">{email.recipient_email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={email.status} />
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {new Date(email.sent_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {email.opened_at ? new Date(email.opened_at).toLocaleDateString() : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color = 'purple' }: any) {
  const colorClasses: Record<string, string> = {
    purple: 'from-purple-600/20 to-pink-600/20 border-purple-500/30',
    green: 'from-green-600/20 to-emerald-600/20 border-green-500/30',
    cyan: 'from-cyan-600/20 to-blue-600/20 border-cyan-500/30',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6`}>
      <div className="text-gray-400 text-sm mb-2">{label}</div>
      <div className="text-3xl font-bold text-white">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    sent: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
    opened: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    clicked: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    bounced: 'bg-red-500/20 text-red-400 border-red-500/30',
    failed: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[status] || colors.sent}`}>
      {status}
    </span>
  );
}
