"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (searchParams.get("logout") === "success") {
      toast.success("👋 Goodbye! See you next time!")
      // Clean up the URL
      router.replace("/login")
    }
  }, [searchParams, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        const errorMessage = authError.message || "Login failed. Please try again."
        setError(errorMessage)
        toast.error(errorMessage)
        return
      }

      toast.success("Login successful!")
      // Redirect to admin dashboard on successful login
      router.push("/admin")
      router.refresh()
    } catch (err) {
      const errorMessage = "An unexpected error occurred. Please try again."
      setError(errorMessage)
      toast.error(errorMessage)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-md space-y-8 animate-in fade-in duration-500">
        {/* Header */}
        <div className="space-y-3 text-center">
          <h1 className="text-2xl sm:text-3xl font-mono font-bold tracking-wide text-foreground">
            admin
          </h1>
          <p className="text-sm text-muted-foreground font-mono">
            <span className="text-primary">$</span> login --secure
          </p>
        </div>

        {/* Form Card */}
        <div className="border border-border/50 rounded-md p-6 sm:p-8 bg-card/50 backdrop-blur-sm space-y-6 shadow-sm">
          {/* Error Alert */}
          {error && (
            <div className="flex gap-3 p-3 rounded-sm bg-destructive/10 border border-destructive/30 animate-in fade-in">
              <AlertCircle className="size-4 mt-0.5 text-destructive shrink-0" />
              <p className="text-sm text-destructive font-mono">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-mono text-foreground/70">
                email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="font-mono text-sm"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-mono text-foreground/70">
                password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className="font-mono text-sm"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full font-mono text-sm h-9 mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>logging in...</span>
                </>
              ) : (
                <span>$: login</span>
              )}
            </Button>
          </form>

          {/* Footer Info */}
          <div className="pt-4 border-t border-border/30 space-y-2 text-center">
            <p className="text-xs text-muted-foreground font-mono leading-relaxed">
              authenticated users only
            </p>
            <p className="text-xs text-muted-foreground/50 font-mono">
              🔒 secure session
            </p>
          </div>
        </div>

        {/* Subtle Animation Note */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground/40 font-mono">
            ↳ enter credentials to access admin panel
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
