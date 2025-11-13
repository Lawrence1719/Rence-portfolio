"use client"

import { useEffect, useState } from "react"

interface TypewriterEffectProps {
  text: string
  delay?: number
  speed?: number
}

export function TypewriterEffect({ text, delay = 0, speed = 50 }: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let index = 0

    const startTyping = () => {
      timeout = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.substring(0, index + 1))
          index++
        } else {
          setIsComplete(true)
          clearInterval(timeout)
        }
      }, speed)
    }

    const delayTimeout = setTimeout(startTyping, delay)

    return () => {
      clearInterval(timeout)
      clearTimeout(delayTimeout)
    }
  }, [text, delay, speed])

  return (
    <span className="font-mono">
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  )
}
