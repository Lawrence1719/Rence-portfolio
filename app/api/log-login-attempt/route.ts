import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    console.log('Login attempt logging request received');
    const { email, success, errorMessage } = await request.json();
    console.log('Login attempt data:', { email, success, errorMessage: errorMessage?.substring(0, 100) });

    const supabase = await createClient();

    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                     request.headers.get('x-real-ip') ||
                     request.headers.get('cf-connecting-ip') ||
                     request.headers.get('x-client-ip') ||
                     'unknown';

    const userAgent = request.headers.get('user-agent') ||
                     request.headers.get('User-Agent') ||
                     'unknown';

    console.log('Request headers - IP:', ipAddress, 'User-Agent:', userAgent?.substring(0, 50));

    const { error } = await supabase
      .from('login_attempts')
      .insert({
        email,
        ip_address: ipAddress,
        user_agent: userAgent,
        success,
        error_message: errorMessage,
        is_read: false,
      });

    if (error) {
      console.error('Failed to log login attempt:', error);
      return NextResponse.json({ error: 'Failed to log attempt' }, { status: 500 });
    }

    console.log('Login attempt logged successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in login logging API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}