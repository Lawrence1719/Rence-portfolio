import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { email, success, errorMessage } = await request.json();

    const supabase = await createClient();

    const ipAddress = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    const userAgent = request.headers.get('user-agent') || 'unknown';

    const { error } = await supabase
      .from('login_attempts')
      .insert({
        email,
        ip_address: ipAddress,
        user_agent: userAgent,
        success,
        error_message: errorMessage,
      });

    if (error) {
      console.error('Failed to log login attempt:', error);
      return NextResponse.json({ error: 'Failed to log attempt' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in login logging API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}