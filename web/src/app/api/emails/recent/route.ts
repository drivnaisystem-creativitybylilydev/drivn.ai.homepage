import { NextRequest, NextResponse } from 'next/server';
import { getRecentEmails } from '@/lib/email-utils';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    
    const emails = await getRecentEmails(limit);

    return NextResponse.json({ emails });
  } catch (error: any) {
    console.error('Get recent emails error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails', details: error.message },
      { status: 500 }
    );
  }
}
