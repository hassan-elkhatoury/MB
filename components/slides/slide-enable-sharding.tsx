"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "../code-block"
import { Database, Hash, Zap } from "lucide-react"

export function SlideEnableSharding() {
  const enableSharding = `# Activer le sharding sur la base de données transport
sh.enableSharding("transport")

# Sharder la collection lines avec un hash sur le champ city
sh.shardCollection("transport.lines", { city: "hashed" })

# Vérifier le statut du sharding
use transport
db.lines.getShardDistribution()`

  const output = `{
  "ok": 1,
  "operationTime": Timestamp(1234567890, 1),
  "$clusterTime": {
    "clusterTime": Timestamp(1234567890, 1)
  }
}`

  return (
    <div className="w-full max-w-4xl mx-auto h-full">
      <motion.div
        className="flex items-center justify-center gap-4 mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "linear" }}
        >
          <Zap className="w-8 h-8 text-secondary" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold glow-text">Activer le Sharding</h2>
      </motion.div>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <CodeBlock code={enableSharding} language="javascript" title="Commandes d'Activation du Sharding" typing />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            className="glassmorphism p-4 rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Database className="w-6 h-6 text-primary" />
              <span className="font-semibold">Base de Données</span>
            </div>
            <code className="text-2xl font-bold text-primary">transport</code>
          </motion.div>

          <motion.div
            className="glassmorphism p-4 rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Hash className="w-6 h-6 text-secondary" />
              <span className="font-semibold">Clé de Shard</span>
            </div>
            <code className="text-2xl font-bold text-secondary">{'{ city: "hashed" }'}</code>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <CodeBlock code={output} language="json" title="Réponse de Succès" />
        </motion.div>
      </div>
    </div>
  )
}
