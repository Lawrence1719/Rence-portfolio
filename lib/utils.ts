import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPhilippineGreeting(): string {
  // Get current time in Philippine timezone (UTC+8)
  const now = new Date()
  const philippineTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Manila"}))
  const hour = philippineTime.getHours()

  if (hour >= 5 && hour < 12) {
    return "Good morning"
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon"
  } else if (hour >= 17 && hour < 21) {
    return "Good evening"
  } else {
    return "" // No greeting for late night hours
  }
}

export function getPhilippineTimeInfo(): { greeting: string; time: string; date: string } {
  const now = new Date()
  const philippineTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Manila"}))

  const greeting = getPhilippineGreeting()
  const time = philippineTime.toLocaleTimeString("en-US", {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Manila'
  })
  const date = philippineTime.toLocaleDateString("en-US", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Manila'
  })

  return { greeting, time, date }
}
