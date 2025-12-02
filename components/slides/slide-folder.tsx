"use client"

import { motion } from "framer-motion"
import { Folder, FolderOpen, FileCode } from "lucide-react"

export function SlideFolder() {
  const structure = [
    { name: "mongo-cluster/", type: "folder", level: 0 },
    { name: "L1/", type: "folder", level: 1, desc: "Laptop1 - Salma (mongos)" },
    { name: "docker-compose.yml", type: "file", level: 2 },
    { name: "L2/", type: "folder", level: 1, desc: "Laptop2 - Douae" },
    { name: "docker-compose.yml", type: "file", level: 2 },
    { name: "data/", type: "folder", level: 2 },
    { name: "L3/", type: "folder", level: 1, desc: "Laptop3 - Youssef" },
    { name: "docker-compose.yml", type: "file", level: 2 },
    { name: "data/", type: "folder", level: 2 },
    { name: "L4/", type: "folder", level: 1, desc: "Laptop4 - Hassan" },
    { name: "docker-compose.yml", type: "file", level: 2 },
    { name: "data/", type: "folder", level: 2 },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto h-full">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-2 glow-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Structure du Projet
      </motion.h2>
      <motion.p
        className="text-center text-muted-foreground mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Organisation des dossiers par laptop
      </motion.p>

      <motion.div
        className="glassmorphism rounded-xl p-6 font-mono text-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        {structure.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-2 py-1"
            style={{ paddingLeft: `${item.level * 24}px` }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
          >
            {item.type === "folder" ? (
              item.level === 0 ? (
                <FolderOpen className="w-5 h-5 text-primary" />
              ) : (
                <Folder className="w-5 h-5 text-secondary" />
              )
            ) : (
              <FileCode className="w-5 h-5 text-muted-foreground" />
            )}
            <span className={item.type === "folder" ? "text-primary" : "text-foreground"}>{item.name}</span>
            {item.desc && <span className="text-xs text-muted-foreground ml-2">← {item.desc}</span>}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {["L1", "L2", "L3", "L4"].map((laptop) => (
          <div key={laptop} className="glassmorphism p-3 rounded-lg text-center">
            <Folder className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-sm font-semibold">{laptop}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
