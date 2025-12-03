"use client"

import { motion } from "framer-motion"
import { MongoDBLogo } from "../mongodb-logo"
import { Database, Server, RefreshCw, Shield,CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function SlideTitle() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const badges = [
    { icon: Database, label: "Installation" },
    { icon: Server, label: "Configuration" },
    { icon: RefreshCw, label: "Réplication" },
    {icon: CheckCircle, label: "Tests"}
  ]

  // Floating 3D cubes
  const cubes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 40 + 20,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 4,
  }))

  return (
    <div className="relative flex flex-col items-center justify-center text-center max-w-6xl mx-auto overflow-hidden">
      {/* 3D Floating cubes background */}
      {cubes.map((cube) => (
        <motion.div
          key={cube.id}
          className="absolute pointer-events-none"
          style={{
            left: `${cube.x}%`,
            top: `${cube.y}%`,
            width: cube.size,
            height: cube.size,
            perspective: "500px",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1, 0.8],
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: cube.duration,
            delay: cube.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div
            className="w-full h-full border border-primary/30 rounded-lg"
            style={{
              background: "linear-gradient(135deg, rgba(16, 170, 80, 0.1), rgba(0, 255, 153, 0.05))",
              boxShadow: "0 0 30px rgba(16, 170, 80, 0.2)",
              transform: "rotateX(45deg) rotateZ(45deg)",
            }}
          />
        </motion.div>
      ))}

      {/* Hexagonal grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <polygon
                points="25,0 50,14.4 50,43.4 25,57.7 0,43.4 0,14.4"
                fill="none"
                stroke="rgba(16, 170, 80, 0.3)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Main 3D Logo Container with parallax effect */}
      <motion.div
        className="relative mb-10"
        style={{
          perspective: "1000px",
          transform: `rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
        }}
        initial={{ opacity: 0, z: -200, rotateY: -30 }}
        animate={{ opacity: 1, z: 0, rotateY: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Glow ring behind logo */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        >
          <div
            className="w-40 h-40 mx-auto rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(16, 170, 80, 0.5), rgba(0, 255, 153, 0.3), transparent)",
              filter: "blur(20px)",
            }}
          />
        </motion.div>

        {/* 3D Orbiting rings */}
        <motion.div
          className="absolute inset-0 -z-5"
          animate={{ rotateZ: 360 }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div
            className="w-48 h-48 mx-auto border border-primary/40 rounded-full"
            style={{ transform: "rotateX(70deg)" }}
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 -z-5"
          animate={{ rotateZ: -360 }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div
            className="w-52 h-52 mx-auto border border-secondary/30 rounded-full"
            style={{ transform: "rotateX(70deg) rotateY(30deg)" }}
          />
        </motion.div>

        {/* Central Logo */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotateY: [0, 10, 0, -10, 0],
          }}
          transition={{
            y: { repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" },
            rotateY: { repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "easeInOut" },
          }}
          className="relative z-10"
        >
          <MongoDBLogo size={100} />
          {/* Logo glow */}
          <div
            className="absolute inset-0 -z-10 blur-2xl opacity-60"
            style={{ background: "radial-gradient(circle, rgba(16, 170, 80, 0.8), transparent 70%)" }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 80, rotateX: -30 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        style={{ perspective: "1000px" }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
          <span className="block text-foreground/90">Comment nous avons construit</span>
          <motion.span
            className="block text-gradient relative"
            animate={{
              textShadow: [
                "0 0 20px rgba(16, 170, 80, 0.5)",
                "0 0 40px rgba(0, 255, 153, 0.8)",
                "0 0 20px rgba(16, 170, 80, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Notre Cluster MongoDB Shardé
            {/* Underline glow effect */}
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent"
              animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.span>
          <span className="block text-foreground/90">Distribué</span>
        </h1>
      </motion.div>

      <motion.div
        className="flex items-center gap-3 text-xl md:text-2xl text-muted-foreground mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <span>Avec Docker</span>
        <span className="text-primary">•</span>
        <span className="text-primary font-semibold">Sur nos 4 Ordinateurs Portables</span>
        <motion.span
          className="w-0.5 h-6 bg-primary"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>

      {/* 3D Feature badges */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mt-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{ perspective: "800px" }}
      >
        {badges.map((badge, index) => (
          <motion.div
            key={badge.label}
            className="group relative"
            initial={{ opacity: 0, rotateY: -90, x: -50 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            transition={{ delay: 0.9 + index * 0.15, duration: 0.5 }}
            whileHover={{
              scale: 1.1,
              rotateY: 10,
              z: 50,
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Card glow on hover */}
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div
              className="relative glassmorphism px-6 py-3 rounded-2xl flex items-center gap-3 cursor-pointer overflow-hidden"
              style={{
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(0, 255, 153, 0.5), transparent)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />

              <div className="relative p-2 rounded-lg bg-primary/20">
                <badge.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="relative text-sm font-medium">{badge.label}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tests badge with pulse effect */}
      <motion.div
        className="mt-8 relative"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.div
          className="absolute inset-0 bg-secondary/30 rounded-full blur-xl"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>

      {/* Scroll indicator with 3D effect */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >

      </motion.div>
    </div>
  )
}
