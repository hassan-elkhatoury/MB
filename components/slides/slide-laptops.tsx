"use client"

import { motion } from "framer-motion"
import { LaptopIcon } from "../laptop-icon"
import { ArrowRight, ArrowLeftRight } from "lucide-react"

export function SlideLaptops() {
  const laptops = [
    { name: "Laptop1 – Salma", role: "routeur mongos", color: "#FF6B6B", x: "50%", y: "15%" },
    {
      name: "Laptop2 – Douae",
      role: "rs1 primary + config + secondary de rs2 & rs3 +  mongos",
      color: "#10AA50",
      x: "20%",
      y: "55%",
    },
    {
      name: "Laptop3 – Youssef",
      role: "rs2 primary + config + secondary de rs1 & rs3 +  mongos",
      color: "#4ECDC4",
      x: "50%",
      y: "75%",
    },
    {
      name: "Laptop4 – Hassan",
      role: "rs3 primary + config + secondary de rs1 & rs2 + mongos",
      color: "#FFE66D",
      x: "80%",
      y: "55%",
    },
  ]

  return (
    <div className="w-full h-full relative max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-4 glow-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Architecture du Cluster
      </motion.h2>
      <motion.p
        className="text-center text-muted-foreground mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Carte d'Architecture 3D avec les Rôles des Laptops
      </motion.p>

      <div className="relative h-[500px]" style={{ perspective: "1000px" }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#10AA50" />
            </marker>
          </defs>
          <motion.line
            x1="50%"
            y1="22%"
            x2="20%"
            y2="48%"
            stroke="#10AA50"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            markerEnd="url(#arrowhead)"
          />
          <motion.line
            x1="50%"
            y1="22%"
            x2="50%"
            y2="68%"
            stroke="#10AA50"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            markerEnd="url(#arrowhead)"
          />
          <motion.line
            x1="50%"
            y1="22%"
            x2="80%"
            y2="48%"
            stroke="#10AA50"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            markerEnd="url(#arrowhead)"
          />
          <motion.line
            x1="25%"
            y1="60%"
            x2="45%"
            y2="75%"
            stroke="#00FF99"
            strokeWidth="1"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
          <motion.line
            x1="55%"
            y1="75%"
            x2="75%"
            y2="60%"
            stroke="#00FF99"
            strokeWidth="1"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          />
          <motion.line
            x1="25%"
            y1="55%"
            x2="75%"
            y2="55%"
            stroke="#00FF99"
            strokeWidth="1"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          />
        </svg>

        {laptops.map((laptop, index) => (
          <motion.div
            key={laptop.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: laptop.x, top: laptop.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.15, type: "spring" }}
          >
            <LaptopIcon name={laptop.name} role={laptop.role} color={laptop.color} />
          </motion.div>
        ))}

        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 glassmorphism p-4 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              <span>Connexion Routeur</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-secondary" />
              <span>Réplication</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
