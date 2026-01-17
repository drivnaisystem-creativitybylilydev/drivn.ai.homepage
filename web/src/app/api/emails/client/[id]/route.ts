import { NextRequest, NextResponse } from 'next/server';
import { getClientEmails } from '@/lib/email-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const clientId = resolvedParams.id;
    const emails = await getClientEmails(clientId);

    return NextResponse.json({ emails });
  } catch (error: any) {
    console.error('Get client emails error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails', details: error.message },
      { status: 500 }
    );
  }
}
