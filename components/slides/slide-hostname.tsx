"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "../code-block"
import { Monitor } from "lucide-react"

const hostsContent = `10.39.139.249   laptop1
10.39.139.237   laptop2
10.39.139.119   laptop3
10.39.139.232   laptop4`

export function SlideHostname() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Configuration des Noms d'Hôtes */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-2 glow-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Configuration des Noms d'Hôtes
      </motion.h2>
      <motion.p
        className="text-center text-muted-foreground mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Configurer le fichier hosts sur toutes les machines
      </motion.p>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <CodeBlock code={hostsContent} language="hosts" title="Entrées du Fichier Hosts" typing />
        </motion.div>

        {/* Windows only */}
        <motion.div
          className="glassmorphism p-4 rounded-xl max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Monitor className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold">Windows</h3>
          </div>
          <code className="text-sm text-muted-foreground font-mono break-all">
            C:\Windows\System32\drivers\etc\hosts
          </code>
          <p className="text-xs text-muted-foreground mt-2">Exécuter Notepad en tant qu'Administrateur</p>
        </motion.div>
      </div>
    </div>
  )
}
