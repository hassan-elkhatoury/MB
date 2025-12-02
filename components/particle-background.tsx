"use client"

import { useEffect, useRef } from "react"

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Enhanced particles with depth (z-axis)
    const particles: {
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
      alpha: number
      pulsePhase: number
    }[] = []

    // Create more particles with varied depths
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 200 + 50, // Depth from 50 to 250
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    // Floating orbs (larger glowing spheres)
    const orbs: {
      x: number
      y: number
      size: number
      hue: number
      phase: number
    }[] = []

    for (let i = 0; i < 5; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 80,
        hue: Math.random() * 30 + 130, // Green hue range
        phase: Math.random() * Math.PI * 2,
      })
    }

    let time = 0
    const gridSize = 80

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw animated hexagonal grid
      ctx.strokeStyle = "rgba(16, 170, 80, 0.03)"
      ctx.lineWidth = 1
      const hexSize = 40
      const hexHeight = hexSize * Math.sqrt(3)
      for (let row = -1; row < canvas.height / hexHeight + 1; row++) {
        for (let col = -1; col < canvas.width / (hexSize * 1.5) + 1; col++) {
          const x = col * hexSize * 1.5
          const y = row * hexHeight + (col % 2 ? hexHeight / 2 : 0)
          const pulse = Math.sin(time + col * 0.1 + row * 0.1) * 0.02
          ctx.strokeStyle = `rgba(16, 170, 80, ${0.02 + pulse})`
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3 - Math.PI / 6
            const hx = x + hexSize * Math.cos(angle)
            const hy = y + hexSize * Math.sin(angle)
            if (i === 0) ctx.moveTo(hx, hy)
            else ctx.lineTo(hx, hy)
          }
          ctx.closePath()
          ctx.stroke()
        }
      }

      // Draw glowing orbs
      orbs.forEach((orb) => {
        orb.x += Math.sin(time + orb.phase) * 0.5
        orb.y += Math.cos(time * 0.7 + orb.phase) * 0.3

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.size)
        gradient.addColorStop(0, `hsla(${orb.hue}, 80%, 50%, 0.15)`)
        gradient.addColorStop(0.5, `hsla(${orb.hue}, 80%, 50%, 0.05)`)
        gradient.addColorStop(1, "transparent")
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Update and draw particles with depth effect
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.z += p.vz
        p.pulsePhase += 0.02

        // Boundary wrapping
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        if (p.z < 50) p.z = 250
        if (p.z > 250) p.z = 50

        // Size and alpha based on depth (parallax effect)
        const depthFactor = 1 - (p.z - 50) / 200
        const displaySize = p.size * (0.5 + depthFactor * 0.5)
        const displayAlpha = p.alpha * (0.3 + depthFactor * 0.7)
        const pulse = Math.sin(p.pulsePhase) * 0.3 + 0.7

        // Draw particle with glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, displaySize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 153, ${displayAlpha * pulse})`
        ctx.fill()

        // Particle glow
        const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, displaySize * 4)
        glowGradient.addColorStop(0, `rgba(16, 170, 80, ${displayAlpha * 0.5 * pulse})`)
        glowGradient.addColorStop(1, "rgba(16, 170, 80, 0)")
        ctx.beginPath()
        ctx.arc(p.x, p.y, displaySize * 4, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()
      })

      // Draw connections between nearby particles (with depth consideration)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dz = Math.abs(particles[i].z - particles[j].z)
          const dist = Math.sqrt(dx * dx + dy * dy)

          // Only connect particles at similar depths
          if (dist < 150 && dz < 50) {
            const alpha = (1 - dist / 150) * (1 - dz / 50) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(16, 170, 80, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw scanning line effect
      const scanY = (time * 100) % canvas.height
      const scanGradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50)
      scanGradient.addColorStop(0, "transparent")
      scanGradient.addColorStop(0.5, "rgba(16, 170, 80, 0.03)")
      scanGradient.addColorStop(1, "transparent")
      ctx.fillStyle = scanGradient
      ctx.fillRect(0, scanY - 50, canvas.width, 100)

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
