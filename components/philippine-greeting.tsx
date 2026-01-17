"use client"

import { useState, useEffect } from "react"
import { getPhilippineTimeInfo } from "@/lib/utils"

export function PhilippineGreeting() {
  const [timeInfo, setTimeInfo] = useState<{ greeting: string; time: string; date: string } | null>(null)

  useEffect(() => {
    // Set initial time info
    setTimeInfo(getPhilippineTimeInfo())

    // Update every minute
    const interval = setInterval(() => {
      setTimeInfo(getPhilippineTimeInfo())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  if (!timeInfo) {
    return (
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-mono">
          <span className="text-primary">$</span> authenticated session
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground font-mono">
        <span className="text-primary">$</span> {timeInfo.greeting ? `${timeInfo.greeting.toLowerCase()} • ` : ""}{timeInfo.time}
      </p>
      <p className="text-xs text-muted-foreground/60 font-mono">
        ↳ {timeInfo.date}
      </p>
    </div>
  )
}