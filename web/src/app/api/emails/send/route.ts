import { NextRequest, NextResponse } from 'next/server';
import { resend, FROM_EMAIL, FROM_NAME } from '@/lib/resend';
import { logEmail, replaceVariables, getEmailTemplate } from '@/lib/email-utils';
import { createActivity } from '@/lib/supabase-helpers';
import { wrapEmailWithBrand } from '@/lib/email-brand-wrapper';
import { embedLogoInEmail } from '@/lib/email-logo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      clientId,
      recipientEmail,
      recipientName,
      subject,
      body: emailBody,
      templateId,
      variables = {},
    } = body;

    // Validate required fields
    if (!recipientEmail || (!subject && !templateId)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!resend) {
      return NextResponse.json(
        { error: 'Resend API key not configured' },
        { status: 500 }
      );
    }

    let finalSubject = subject;
    let finalBody = emailBody;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://drivn.ai';
    const logoUrl = `${siteUrl}/logo.png`;

    // If using template, fetch and process it
    if (templateId) {
      const template = await getEmailTemplate(templateId);
      finalSubject = replaceVariables(template.subject, variables);
      finalBody = replaceVariables(template.body, variables);
      // Replace logo URL with embedded base64 logo
      finalBody = embedLogoInEmail(finalBody);
    } else {
      // For custom emails, wrap with branded template
      if (variables && Object.keys(variables).length > 0) {
        finalSubject = replaceVariables(subject || '', variables);
        finalBody = replaceVariables(emailBody || '', variables);
      }
      // Wrap custom email content with branded template (logo will be embedded)
      finalBody = wrapEmailWithBrand(finalBody);
      finalBody = embedLogoInEmail(finalBody);
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: recipientEmail,
      subject: finalSubject,
      html: finalBody,
    });

    if (error) {
      console.error('Resend error:', error);
      
      // Log failed email
      await logEmail({
        client_id: clientId,
        template_id: templateId,
        subject: finalSubject,
        body: finalBody,
        recipient_email: recipientEmail,
        recipient_name: recipientName,
        status: 'failed',
        error_message: error.message || 'Unknown error',
        sent_at: new Date().toISOString(),
      });

      return NextResponse.json(
        { error: 'Failed to send email', details: error.message },
        { status: 500 }
      );
    }

    // Log successful email
    const emailLog = await logEmail({
      client_id: clientId,
      template_id: templateId,
      subject: finalSubject,
      body: finalBody,
      recipient_email: recipientEmail,
      recipient_name: recipientName,
      status: 'sent',
      resend_id: data?.id,
      sent_at: new Date().toISOString(),
    });

    // Create activity if client is provided
    if (clientId) {
      await createActivity({
        client_id: clientId,
        type: 'email_sent',
        description: `Email sent: ${finalSubject}`,
        metadata: { email_id: emailLog.id },
      });
    }

    return NextResponse.json({
      success: true,
      emailId: emailLog.id,
      resendId: data?.id,
    });
  } catch (error: any) {
    console.error('Send email error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
