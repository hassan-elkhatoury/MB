"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "../code-block"
import { Play, CheckCircle2, Terminal } from "lucide-react"

export function SlideStartCluster() {
  const commands = `# Naviguer vers le dossier de votre laptop
cd mongo-cluster/L1  # (ou L2, L3, L4)

# Démarrer tous les conteneurs
docker compose up -d

# Vérifier que les conteneurs sont en cours d'exécution
docker ps

# Vérifier les logs si nécessaire
docker logs mongos`

  const output1 = `CONTAINER ID   IMAGE       STATUS         PORTS                      NAMES
a1b2c3d4e5f6   mongo:6.0   Up 2 minutes   0.0.0.0:27017->27017/tcp   mongos
b2c3d4e5f6g7   mongo:6.0   Up 2 minutes   0.0.0.0:27020->27017/tcp   config`
  return (
    <div className="w-full max-w-5xl mx-auto h-full  py-4">
      <motion.div
        className="flex items-center justify-center gap-4 mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="p-3 bg-primary/20 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <Play className="w-8 h-8 text-primary" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold glow-text">Démarrage du Cluster</h2>
      </motion.div>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <CodeBlock code={commands} language="bash" title="Commandes Terminal" typing />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-5 h-5 text-secondary" />
            <span className="font-semibold">Sortie Attendue</span>
          </div>
          <div className="h-full overflow-y-auto">
            <CodeBlock code={output1} language="text" title="docker ps" />
          </div>


        </motion.div>

      </div>
    </div>
  )
}
