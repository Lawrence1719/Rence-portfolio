import { getUser } from "@/lib/supabase/server"
import { getDashboardStats } from "./actions"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { DashboardGreeting } from "@/components/dashboard-greeting"
import { formatDistanceToNow } from "date-fns"
import { Eye, Star, Shield, Activity, Clock, CheckCircle, XCircle } from "lucide-react"

export default async function AdminPage() {
  const user = await getUser()
  const stats = await getDashboardStats()

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

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-md">
              <Eye className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-foreground">{stats.totalProjects}</p>
              <p className="text-xs font-mono text-muted-foreground">total projects</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-md">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-foreground">{stats.visibleProjects}</p>
              <p className="text-xs font-mono text-muted-foreground">visible</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-md">
              <Star className="h-4 w-4 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-foreground">{stats.featuredProjects}</p>
              <p className="text-xs font-mono text-muted-foreground">featured</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-md">
              <Shield className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-foreground">{stats.successfulLogins}</p>
              <p className="text-xs font-mono text-muted-foreground">successful logins</p>
            </div>
          </div>
        </Card>
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
          <div className="pt-2 border-t border-border/30">
            <p className="text-xs font-mono text-muted-foreground">last login</p>
            <p className="text-xs font-mono text-foreground/70">
              {stats.recentLoginAttempts.length > 0
                ? formatDistanceToNow(new Date(stats.recentLoginAttempts[0].attempted_at), { addSuffix: true })
                : 'N/A'
              }
            </p>
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
            <p className="text-sm font-mono text-foreground">Admin Panel v2.0</p>
          </div>
          <div className="pt-2 border-t border-border/30">
            <p className="text-xs text-muted-foreground font-mono">
              enhanced dashboard with metrics
            </p>
          </div>
        </Card>
      </div>

      <Separator className="bg-border/30" />

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="text-lg font-mono font-semibold text-foreground">recent activity</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                  recent projects
                </p>
              </div>
              <div className="space-y-3">
                {stats.recentProjects.length > 0 ? (
                  stats.recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 rounded-md bg-background/50 border border-border/30">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-mono text-foreground truncate">{project.title}</p>
                        <p className="text-xs font-mono text-muted-foreground">
                          {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        {project.is_featured && <Star className="h-3 w-3 text-yellow-500" />}
                        {project.is_visible ? (
                          <Eye className="h-3 w-3 text-green-500" />
                        ) : (
                          <XCircle className="h-3 w-3 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm font-mono text-muted-foreground">no projects yet</p>
                )}
              </div>
            </div>
          </Card>

          {/* Recent Login Attempts */}
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                  login attempts
                </p>
              </div>
              <div className="space-y-3">
                {stats.recentLoginAttempts.length > 0 ? (
                  stats.recentLoginAttempts.slice(0, 5).map((attempt) => (
                    <div key={attempt.id} className="flex items-center justify-between p-3 rounded-md bg-background/50 border border-border/30">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-mono text-foreground truncate">{attempt.email}</p>
                        <p className="text-xs font-mono text-muted-foreground">
                          {formatDistanceToNow(new Date(attempt.attempted_at), { addSuffix: true })}
                        </p>
                      </div>
                      <div className="ml-2">
                        {attempt.success ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm font-mono text-muted-foreground">no login attempts</p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Separator className="bg-border/30" />

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-mono font-semibold text-foreground">quick actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/admin/projects">
            <div className="p-4 rounded-md border border-border/30 bg-background/50 hover:bg-background/70 transition-colors cursor-pointer">
              <p className="text-sm font-mono text-foreground mb-2">📁 manage projects</p>
              <p className="text-xs text-muted-foreground font-mono">
                add, edit, and organize portfolio projects
              </p>
            </div>
          </Link>
          <Link href="/admin/login-attempts">
            <div className="p-4 rounded-md border border-border/30 bg-background/50 hover:bg-background/70 transition-colors cursor-pointer">
              <p className="text-sm font-mono text-foreground mb-2">🛡️ login attempts</p>
              <p className="text-xs text-muted-foreground font-mono">
                monitor authentication activity
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
          ↳ admin panel v2.0 with enhanced dashboard metrics
        </p>
      </div>
    </div>
  )
}
