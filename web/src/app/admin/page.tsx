'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getClients, getClientStats } from '@/lib/supabase-helpers';
import type { Client } from '@/types/database';
import PasswordProtection from '@/components/PasswordProtection';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  contacted: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  qualified: 'bg-green-500/20 text-green-400 border-green-500/30',
  proposal_sent: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  negotiating: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  won: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  active: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  lost: 'bg-red-500/20 text-red-400 border-red-500/30',
  completed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Check authentication on mount
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true';
    setAuthenticated(isAuthenticated);
    setCheckingAuth(false);
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadData();
    }
  }, [authenticated, statusFilter, searchQuery]);

  async function loadData() {
    setLoading(true);
    try {
      const [clientsData, statsData] = await Promise.all([
        getClients({ status: statusFilter, search: searchQuery }),
        getClientStats(),
      ]);
      setClients(clientsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatCurrency(value: number | undefined | null) {
    if (!value) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0014] via-[#1a0525] to-[#0a0014] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              CRM Dashboard
            </h1>
            <p className="text-gray-400">Manage your clients and pipeline</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="px-4 py-2 border border-white/20 rounded-lg text-white hover:border-white/40 transition"
            >
              ← Home
            </Link>
            <Link
              href="/book-call"
              className="px-6 py-3 bg-gradient-to-r from-[#6b36ff] to-[#ff9dff] rounded-lg text-white font-medium hover:opacity-90 transition"
            >
              + New Lead
            </Link>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <StatCard label="Total Clients" value={stats.total} />
            <StatCard label="New Leads" value={stats.new} color="blue" />
            <StatCard label="Active" value={stats.active} color="cyan" />
            <StatCard label="Won" value={stats.won} color="green" />
            <StatCard 
              label="Pipeline Value" 
              value={formatCurrency(stats.totalValue)} 
              color="purple" 
            />
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal_sent">Proposal Sent</option>
            <option value="negotiating">Negotiating</option>
            <option value="won">Won</option>
            <option value="active">Active</option>
            <option value="lost">Lost</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Client List */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading...</div>
          ) : clients.length === 0 ? (
            <div className="p-12 text-center text-gray-400">No clients found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Company</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Value</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Created</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-white/5 transition">
                      <td className="px-6 py-4">
                        <div className="text-white font-medium">{client.company_name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white">{client.contact_name}</div>
                        <div className="text-sm text-gray-400">{client.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[client.status] || STATUS_COLORS.new}`}>
                          {client.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {client.service_type || '—'}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {formatCurrency(client.estimated_value)}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {formatDate(client.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/clients/${client.id}`}
                          className="text-purple-400 hover:text-purple-300 font-medium"
                        >
                          View →
                        </Link>
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

function StatCard({ 
  label, 
  value, 
  color = 'purple' 
}: { 
  label: string; 
  value: string | number; 
  color?: string;
}) {
  const colorClasses: Record<string, string> = {
    purple: 'from-purple-600/20 to-pink-600/20 border-purple-500/30',
    blue: 'from-blue-600/20 to-cyan-600/20 border-blue-500/30',
    green: 'from-green-600/20 to-emerald-600/20 border-green-500/30',
    cyan: 'from-cyan-600/20 to-blue-600/20 border-cyan-500/30',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color] || colorClasses.purple} border rounded-xl p-6`}>
      <div className="text-gray-400 text-sm mb-2">{label}</div>
      <div className="text-3xl font-bold text-white">{value}</div>
    </div>
  );
}
