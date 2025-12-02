"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export function SlideChecklist() {
  const items = [
    "Nous avons configuré les noms d'hôtes",
    "Nous avons installé Docker sur tous les laptops",
    "Nous avons établi la communication entre les laptops",
    "Nous avons initialisé le Config RS",
    "Nous avons initialisé tous les shards",
    "Nous avons mis en ligne le routeur mongos",
    "Nous avons vérifié la réplication",
    "Nous avons testé le failover",
    "Notre cluster est stable",
  ]

  return (
    <div className="w-full max-w-5xl mx-auto h-full">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-4 glow-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Ce que nous avons accompli
      </motion.h2>

      <div className="glassmorphism rounded-2xl p-6">
        <div className="space-y-1.5">
          {items.map((item, index) => (
            <motion.div
              key={item}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 transition-colors"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 500 }}
              >
                <CheckCircle2 className="w-6 h-6 text-secondary" />
              </motion.div>
              <span className="text-lg">{item}</span>
              <motion.span
                className="ml-auto text-xs text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                Terminé
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
