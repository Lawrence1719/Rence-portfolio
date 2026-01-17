"use client"

import { useState, useEffect } from "react"
import { getPhilippineGreeting } from "@/lib/utils"

export function DashboardGreeting() {
  const [greeting, setGreeting] = useState<string>("")

  useEffect(() => {
    setGreeting(getPhilippineGreeting())

    // Update greeting every hour
    const interval = setInterval(() => {
      setGreeting(getPhilippineGreeting())
    }, 3600000) // Update every hour

    return () => clearInterval(interval)
  }, [])

  if (!greeting) {
    return (
      <p className="text-sm text-muted-foreground font-mono">
        <span className="text-primary">$</span> welcome to admin panel
      </p>
    )
  }

  return (
    <p className="text-sm text-muted-foreground font-mono">
      <span className="text-primary">$</span> {greeting.toLowerCase()}, welcome to admin panel
    </p>
  )
}