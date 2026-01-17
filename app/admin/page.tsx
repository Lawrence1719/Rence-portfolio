import { getUser } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { DashboardGreeting } from "@/components/dashboard-greeting"

export default async function AdminPage() {
  const user = await getUser()

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-mono font-bold text-foreground tracking-wide">
            dashboard
          </h2>
          <DashboardGreeting />
        </div>
      </div>

      <Separator className="bg-border/30" />

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Session Card */}
        <Card className="p-6 space-y-4 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="space-y-2">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              user session
            </p>
            <p className="text-sm font-mono text-foreground break-all">{user?.email}</p>
          </div>
          <div className="pt-2 border-t border-border/30 space-y-2">
            <p className="text-xs font-mono text-muted-foreground">user id</p>
            <p className="text-xs font-mono text-foreground/70 break-all">{user?.id}</p>
          </div>
        </Card>

        {/* Status Card */}
        <Card className="p-6 space-y-4 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="space-y-2">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              authentication
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Badge variant="default" className="font-mono text-xs">
                authenticated
              </Badge>
              <span className="text-green-500 text-2xl leading-none">●</span>
            </div>
          </div>
          <div className="pt-2 border-t border-border/30">
            <p className="text-xs text-muted-foreground font-mono">
              secure server-side session active
            </p>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 space-y-4 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="space-y-2">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              environment
            </p>
            <p className="text-sm font-mono text-foreground">Admin Panel v1.0</p>
          </div>
          <div className="pt-2 border-t border-border/30">
            <p className="text-xs text-muted-foreground font-mono">
              minimalist cli-inspired interface
            </p>
          </div>
        </Card>
      </div>

      <Separator className="bg-border/30" />

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-mono font-semibold text-foreground">quick actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/projects">
            <div className="p-4 rounded-md border border-border/30 bg-background/50 hover:bg-background/70 transition-colors cursor-pointer">
              <p className="text-sm font-mono text-foreground mb-2">📁 manage projects</p>
              <p className="text-xs text-muted-foreground font-mono">
                add, edit, and organize portfolio projects
              </p>
            </div>
          </Link>
          <div className="p-4 rounded-md border border-border/30 bg-background/50">
            <p className="text-sm font-mono text-foreground mb-2">⚙️ settings</p>
            <p className="text-xs text-muted-foreground font-mono">
              coming soon
            </p>
          </div>
        </div>
      </div>

      <Separator className="bg-border/30" />

      {/* Features Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-mono font-semibold text-foreground">features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-md border border-border/30 bg-background/50">
            <p className="text-sm font-mono text-foreground mb-2">✓ secure authentication</p>
            <p className="text-xs text-muted-foreground font-mono">
              supabase server-side session management
            </p>
          </div>
          <div className="p-4 rounded-md border border-border/30 bg-background/50">
            <p className="text-sm font-mono text-foreground mb-2">✓ protected routes</p>
            <p className="text-xs text-muted-foreground font-mono">
              automatic redirect to login if not authenticated
            </p>
          </div>
          <div className="p-4 rounded-md border border-border/30 bg-background/50">
            <p className="text-sm font-mono text-foreground mb-2">✓ theme support</p>
            <p className="text-xs text-muted-foreground font-mono">
              full dark mode and light mode compatibility
            </p>
          </div>
          <div className="p-4 rounded-md border border-border/30 bg-background/50">
            <p className="text-sm font-mono text-foreground mb-2">✓ projects management</p>
            <p className="text-xs text-muted-foreground font-mono">
              full crud operations for portfolio projects
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="pt-4 border-t border-border/30 text-center">
        <p className="text-xs text-muted-foreground/60 font-mono">
          ↳ admin panel v2.0 with projects management
        </p>
      </div>
    </div>
  )
}
