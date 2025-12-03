"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "../code-block"
import { FileText, CheckCircle2, RefreshCw } from "lucide-react"

export function SlideInsertTest() {
  const insertCommand = `# Se connecter à mongos
mongosh --host laptop1:27020

# Utiliser la base de données transport
use transport

# Insérer un document de test
db.lines.insertOne({ 
  name: "this row is for sync testing purpose",
  city: "Casablanca",
  createdAt: new Date()
})

# Vérifier l'insertion
db.lines.find()`

  const output = `{
  "_id": ObjectId("6571a2b3c4d5e6f7g8h9i0j1"),
  "name": "this row is for sync testing purpose",
  "city": "Casablanca",
  "createdAt": ISODate("2024-12-07T10:30:00.000Z")
}`

  return (
    <div className="w-full max-w-5xl mx-auto h-full">
      <motion.div
        className="flex items-center justify-center gap-4 mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <FileText className="w-8 h-8 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold glow-text">Insertion & Test des Données</h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <CodeBlock code={insertCommand} language="javascript" title="Insérer un Document de Test" typing />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <CodeBlock code={output} language="json" title="Document Inséré" />
        </motion.div>
      </div>
    </div>
  )
}
