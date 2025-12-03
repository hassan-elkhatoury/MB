"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "../code-block"
import { Layers, Plus } from "lucide-react"

export function SlideAddShards() {
  const shardCommands = `# Se connecter au routeur mongos
mongosh --host laptop1:27020

# Ajouter le Shard RS1
sh.addShard("rs1/laptop2:27017,laptop3:27017,laptop4:27017")

# Ajouter le Shard RS2
sh.addShard("rs2/laptop3:27018,laptop2:27018,laptop4:27018")

# Ajouter le Shard RS3
sh.addShard("rs3/laptop4:27019,laptop2:27019,laptop3:27019")`

  const shards = [
    { name: "rs1", hosts: ["laptop2:27017", "laptop3:27017", "laptop4:27017"], color: "#10AA50" },
    { name: "rs2", hosts: ["laptop3:27018", "laptop2:27018", "laptop4:27018"], color: "#4ECDC4" },
    { name: "rs3", hosts: ["laptop4:27019", "laptop2:27019", "laptop3:27019"], color: "#FFE66D" },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto py-4">
      <motion.div
        className="flex items-center justify-center gap-4 mb-9"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Layers className="w-8 h-8 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold glow-text">Ajout des Shards</h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <CodeBlock code={shardCommands} language="javascript" title="Commandes Shard" typing />
        </motion.div>

        <div className="space-y-7">
          {shards.map((shard, index) => (
            <motion.div
              key={shard.name}
              className="glassmorphism p-4 rounded-xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.2 }}
              whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${shard.color}40` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${shard.color}20` }}
                >
                  <Plus className="w-4 h-4" style={{ color: shard.color }} />
                </div>
                <span className="font-bold text-lg" style={{ color: shard.color }}>
                  {shard.name.toUpperCase()}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {shard.hosts.map((host) => (
                  <span key={host} className="text-xs px-2 py-1 bg-muted rounded font-mono">
                    {host}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
