"use client"

import { motion } from "framer-motion"
import { MongoDBLogo } from "../mongodb-logo"
import { Download, RotateCcw, Github, ExternalLink } from "lucide-react"

export function SlideEnd() {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
      <motion.div
        className="mb-8 relative"
        animate={{ y: [0, -15, 0], rotateY: [0, 360] }}
        transition={{
          y: { repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" },
          rotateY: { repeat: Number.POSITIVE_INFINITY, duration: 10, ease: "linear" },
        }}
      >
        <motion.div
          className="absolute inset-0 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(16,170,80,0.4) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
        />
        <MongoDBLogo size={100} />
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-4 glow-text"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Cluster Déployé avec Succès !
      </motion.h2>

      <motion.p
        className="text-xl text-muted-foreground mb-8 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Notre Cluster MongoDB Shardé fonctionne maintenant sur 4 ordinateurs portables avec une réplication complète, un
        failover automatique et des capacités d'équilibrage de charge.
      </motion.p>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {[
          { label: "Laptops", value: "4" },
          { label: "Shards", value: "3" },
          { label: "Réplicas", value: "6" },
          { label: "Disponibilité", value: "100%" },
        ].map((stat) => (
          <div key={stat.label} className="glassmorphism p-4 rounded-xl">
            <p className="text-3xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>
      <motion.div
        className="mt-12 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p>Construit avec Docker • MongoDB 6.0 • Distribué sur 4 machines</p>
        <p className="mt-2 flex items-center justify-center gap-1">
          Équipe : Salma, Douae, Youssef, Hassan
          <ExternalLink className="w-3 h-3 ml-1" />
        </p>
      </motion.div>
    </div>
  )
}
