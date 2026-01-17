import { NextRequest, NextResponse } from 'next/server';
import { updateEmailStatus } from '@/lib/email-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Resend webhook payload structure
    const { type, data } = body;

    if (!type || !data?.email_id) {
      return NextResponse.json(
        { error: 'Invalid webhook payload' },
        { status: 400 }
      );
    }

    // Map Resend event types to our status
    const statusMap: Record<string, string> = {
      'email.delivered': 'delivered',
      'email.opened': 'opened',
      'email.clicked': 'clicked',
      'email.bounced': 'bounced',
      'email.complained': 'bounced',
    };

    const status = statusMap[type];
    
    if (status) {
      await updateEmailStatus(data.email_id, status, data);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed', details: error.message },
      { status: 500 }
    );
  }
}
