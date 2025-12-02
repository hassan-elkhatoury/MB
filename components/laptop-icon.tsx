"use client"

import { motion } from "framer-motion"

interface LaptopIconProps {
  name: string
  role: string
  color?: string
}

export function LaptopIcon({ name, role, color = "#10AA50" }: LaptopIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      className="flex flex-col items-center gap-2"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div className="relative" whileHover={{ scale: 1.1, rotateY: 10 }} transition={{ type: "spring" }}>
        <svg width="80" height="60" viewBox="0 0 80 60">
          <defs>
            <filter id={`glow-${name}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect
            x="10"
            y="5"
            width="60"
            height="35"
            rx="3"
            fill="#0a0a0a"
            stroke={color}
            strokeWidth="2"
            filter={`url(#glow-${name})`}
          />
          <rect x="14" y="9" width="52" height="27" rx="1" fill={color} opacity="0.2" />
          <path d="M5 45 L75 45 L70 55 L10 55 Z" fill="#1a1a1a" stroke={color} strokeWidth="1" />
          <rect x="15" y="46" width="50" height="6" rx="1" fill="#0a0a0a" />
        </svg>
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        />
      </motion.div>
      <div className="text-center">
        <p className="font-semibold text-sm" style={{ color }}>
          {name}
        </p>
        <p className="text-xs text-muted-foreground max-w-[120px] leading-tight">{role}</p>
      </div>
    </motion.div>
  )
}
