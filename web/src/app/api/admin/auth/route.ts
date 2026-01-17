import { NextRequest, NextResponse } from 'next/server';

// Get password from environment variable
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || 'drivn2024').trim();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      );
    }

    // Trim whitespace from submitted password
    const trimmedPassword = password.trim();
    
    // Debug logging (remove in production)
    console.log('Password check:', {
      submitted: trimmedPassword,
      expected: ADMIN_PASSWORD,
      match: trimmedPassword === ADMIN_PASSWORD,
      envSet: !!process.env.ADMIN_PASSWORD
    });

    // Simple password check (case-sensitive)
    if (trimmedPassword === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: 'Incorrect password' },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
