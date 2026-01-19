import { redirect } from "next/navigation"
import { getSession } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { logout } from "./actions"
import { LogOut } from "lucide-react"
import { TimeAndDate } from "@/components/philippine-greeting"
import { ThemeToggle } from "@/components/theme-toggle"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const displayName = "Lawrence Dizon"

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Admin Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/Logo.png" alt="Logo" className="h-30 w-30 object-contain" />
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-mono font-bold text-foreground tracking-wide">
                  {displayName} — admin
                </h1>
              </div>
              <TimeAndDate />
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="hidden sm:block text-right">
              <p className="text-xs text-muted-foreground font-mono truncate max-w-xs">
                {session.user.email}
              </p>
              <p className="text-xs text-muted-foreground/60 font-mono">
                ↳ logged in
              </p>
            </div>

            <Separator orientation="vertical" className="hidden sm:block h-6" />

            <form action={logout}>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="font-mono text-xs h-8 gap-2"
              >
                <LogOut className="size-3" />
                <span className="hidden sm:inline">logout</span>
                <span className="sm:hidden">out</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {children}
        </div>
      </main>
    </div>
  )
}
