"use client"

import { useEffect, useState } from "react"

interface Petal {
  id: number
  x: number
  y: number
  size: number
  speed: number
  rotation: number
  rotationSpeed: number
}

export function CherryBlossomBackground() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const initialPetals: Petal[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 2 + 1,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
    }))
    setPetals(initialPetals)

    const animatePetals = () => {
      setPetals((prev) =>
        prev.map((petal) => ({
          ...petal,
          y: petal.y > window.innerHeight + 20 ? -20 : petal.y + petal.speed,
          x: petal.x + Math.sin(petal.y * 0.01) * 0.5,
          rotation: petal.rotation + petal.rotationSpeed,
        })),
      )
    }

    const interval = setInterval(animatePetals, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute opacity-30"
          style={{
            left: `${petal.x}px`,
            top: `${petal.y}px`,
            transform: `rotate(${petal.rotation}deg)`,
            transition: "all 0.05s linear",
          }}
        >
          <div
            className="bg-pink-300 rounded-full"
            style={{
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              background: "radial-gradient(circle, #fbb6ce 0%, #f687b3 100%)",
            }}
          />
        </div>
      ))}
    </div>
  )
}
