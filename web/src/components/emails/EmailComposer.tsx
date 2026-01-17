'use client';

import { useState, useEffect } from 'react';
import type { EmailTemplate } from '@/lib/email-utils';
import { getEmailTemplates, replaceVariables } from '@/lib/email-utils';

interface EmailComposerProps {
  clientId?: string;
  recipientEmail: string;
  recipientName: string;
  defaultVariables?: Record<string, string>;
  onSend?: () => void;
  onCancel?: () => void;
}

export default function EmailComposer({
  clientId,
  recipientEmail,
  recipientName,
  defaultVariables = {},
  onSend,
  onCancel,
}: EmailComposerProps) {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [variables, setVariables] = useState<Record<string, string>>(defaultVariables);
  const [editableRecipientEmail, setEditableRecipientEmail] = useState(recipientEmail);
  const [editableRecipientName, setEditableRecipientName] = useState(recipientName);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  // Update editable fields when props change
  useEffect(() => {
    setEditableRecipientEmail(recipientEmail);
    setEditableRecipientName(recipientName);
  }, [recipientEmail, recipientName]);

  async function loadTemplates() {
    try {
      const response = await fetch('/api/emails/templates');
      const data = await response.json();
      if (data.templates) {
        setTemplates(data.templates);
      }
    } catch (err) {
      console.error('Error loading templates:', err);
    }
  }

  function handleTemplateSelect(templateId: string) {
    setSelectedTemplateId(templateId);
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSubject(template.subject);
      setBody(template.body);
      // Extract variables from template and set defaults
      const templateVars: Record<string, string> = {};
      template.variables.forEach((varName) => {
        templateVars[varName] = variables[varName] || defaultVariables[varName] || '';
      });
      setVariables(templateVars);
    }
  }

  function getPreviewContent() {
    return {
      subject: replaceVariables(subject, variables),
      body: replaceVariables(body, variables),
    };
  }

  async function handleSend() {
    if (!subject || !body) {
      setError('Subject and body are required');
      return;
    }

    if (!editableRecipientEmail) {
      setError('Recipient email is required');
      return;
    }

    setSending(true);
    setError('');

    try {
      const response = await fetch('/api/emails/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          recipientEmail: editableRecipientEmail,
          recipientName: editableRecipientName,
          subject,
          body,
          templateId: selectedTemplateId || undefined,
          variables,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show more detailed error message
        const errorMsg = data.details 
          ? `${data.error}: ${data.details}` 
          : data.error || 'Failed to send email';
        throw new Error(errorMsg);
      }

      if (onSend) onSend();
    } catch (err: any) {
      setError(err.message || 'Failed to send email. Please check the email address and try again.');
    } finally {
      setSending(false);
    }
  }

  const previewContent = preview ? getPreviewContent() : null;

  return (
    <div className="space-y-6">
      {/* Template Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Email Template (Optional)
        </label>
        <select
          value={selectedTemplateId}
          onChange={(e) => handleTemplateSelect(e.target.value)}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
        >
          <option value="">Custom Email</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name} ({template.category})
            </option>
          ))}
        </select>
      </div>

      {/* Recipient Info */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Recipient Name
          </label>
          <input
            type="text"
            value={editableRecipientName}
            onChange={(e) => setEditableRecipientName(e.target.value)}
            placeholder="Recipient name..."
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Recipient Email
          </label>
          <input
            type="email"
            value={editableRecipientEmail}
            onChange={(e) => setEditableRecipientEmail(e.target.value)}
            placeholder="recipient@example.com"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Email subject..."
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Variables */}
      {selectedTemplateId && Object.keys(variables).length > 0 && (
        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <div className="text-sm font-medium text-purple-400 mb-3">
            Template Variables
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(variables).map(([key, value]) => (
              <div key={key}>
                <label className="block text-xs text-gray-400 mb-1">
                  {key}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setVariables({ ...variables, [key]: e.target.value })
                  }
                  className="w-full px-3 py-1 bg-white/5 border border-white/10 rounded text-white text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Body */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-400">
            Email Body
          </label>
          <button
            onClick={() => setPreview(!preview)}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            {preview ? 'Edit' : 'Preview'}
          </button>
        </div>
        {preview ? (
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="text-sm font-medium text-gray-400 mb-2">
              Subject: {previewContent?.subject}
            </div>
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: previewContent?.body || '' }}
            />
          </div>
        ) : (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Email body (HTML supported)..."
            rows={12}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 font-mono text-sm"
          />
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            onClick={onCancel}
            disabled={sending}
            className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition disabled:opacity-50"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSend}
          disabled={sending || !subject || !body}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {sending ? 'Sending...' : 'Send Email'}
        </button>
      </div>
    </div>
  );
}
