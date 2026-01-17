'use client';

import { useState, useEffect } from 'react';
import type { EmailLog } from '@/lib/email-utils';

interface EmailHistoryProps {
  clientId: string;
}

export default function EmailHistory({ clientId }: EmailHistoryProps) {
  const [emails, setEmails] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<EmailLog | null>(null);

  useEffect(() => {
    loadEmails();
  }, [clientId]);

  async function loadEmails() {
    try {
      const response = await fetch(`/api/emails/client/${clientId}`);
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

  const statusColors: Record<string, string> = {
    sent: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
    opened: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    clicked: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    bounced: 'bg-red-500/20 text-red-400 border-red-500/30',
    failed: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  if (loading) {
    return <div className="text-gray-400">Loading emails...</div>;
  }

  if (emails.length === 0) {
    return <div className="text-gray-400 text-center py-8">No emails sent yet</div>;
  }

  return (
    <div className="space-y-4">
      {emails.map((email) => (
        <div
          key={email.id}
          className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition cursor-pointer"
          onClick={() => setSelectedEmail(email)}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <div className="text-white font-medium mb-1">{email.subject}</div>
              <div className="text-sm text-gray-400">
                To: {email.recipient_email}
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                statusColors[email.status] || statusColors.sent
              }`}
            >
              {email.status}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Sent: {new Date(email.sent_at).toLocaleString()}
            {email.opened_at && (
              <> • Opened: {new Date(email.opened_at).toLocaleString()}</>
            )}
          </div>
        </div>
      ))}

      {/* Email Detail Modal */}
      {selectedEmail && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="bg-[#1a0525] border border-white/10 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {selectedEmail.subject}
                </h3>
                <div className="text-sm text-gray-400">
                  To: {selectedEmail.recipient_email}
                </div>
              </div>
              <button
                onClick={() => setSelectedEmail(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
