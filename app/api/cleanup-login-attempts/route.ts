import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Auto-cleanup: delete attempts older than 90 days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 90);

    console.log('Auto-cleanup: Starting cleanup for records older than:', cutoffDate.toISOString());

    const { data, error } = await supabase
      .from('login_attempts')
      .delete()
      .lt('attempted_at', cutoffDate.toISOString());

    if (error) {
      console.error('Auto-cleanup error:', error);
      return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 });
    }

    console.log(`Auto-cleanup: Deleted ${data?.length || 0} old login attempts`);

    return NextResponse.json({
      success: true,
      deletedCount: data?.length || 0,
      cutoffDate: cutoffDate.toISOString()
    });
  } catch (error) {
    console.error('Auto-cleanup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}