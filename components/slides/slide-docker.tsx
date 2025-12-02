"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "../code-block"
import { Container, Monitor } from "lucide-react"

export function SlideDocker() {
  const windowsCommand = `# Télécharger Docker Desktop depuis docker.com
# Ou utiliser winget:
winget install Docker.DockerDesktop

# Activer le backend WSL 2
wsl --install

# Vérifier l'installation
docker --version
docker compose version`

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        className="flex items-center justify-center gap-4 mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
        >
          <Container className="w-12 h-12 text-primary" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold glow-text">Installation de Docker</h2>
      </motion.div>

      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-blue-500/20 rounded">
            <Monitor className="w-4 h-4 text-blue-400" />
          </div>
          <span className="font-semibold">Windows</span>
        </div>
        <CodeBlock code={windowsCommand} language="powershell" typing />
      </motion.div>

      <motion.div
        className="mt-6 glassmorphism p-4 rounded-xl text-center max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-sm text-muted-foreground">
          Vérifiez l'installation avec : <code className="text-primary">docker --version</code> et{" "}
          <code className="text-primary">docker compose version</code>
        </p>
      </motion.div>
    </div>
  )
}
