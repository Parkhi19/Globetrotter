"use client"

import { useEffect, useState } from "react"
import ReactConfetti from "react-confetti"

export default function ConfettiExplosion() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [pieces, setPieces] = useState(200)

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Handle window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    // Gradually reduce confetti pieces
    const timer = setTimeout(() => {
      setPieces(50)
    }, 1500)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timer)
    }
  }, [])

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={false}
      numberOfPieces={pieces}
      gravity={0.3}
      colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4"]}
    />
  )
}

