"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "../code-block"
import { Search, CheckCircle2 } from "lucide-react"

export function SlideVerification() {
  const readFromSecondary = `# Nous avons lu depuis le noeud secondary
# Connexion à laptop3:27018 (secondary)

rs2 [direct: secondary] transport> db.lines.find().sort({_id: -1}).limit(1)
[
  {
    _id: ObjectId('6924a0a3c906523cf563b112'),
    name: 'this row is for sync testing purpose'
  }
]

# Document synchronisé avec succès depuis le PRIMARY`

  const insertionTest = `# Notre test d'insertion sur PRIMARY
rs2 [direct: primary] transport> db.lines.insertOne({
  name: "this row is for sync testing purpose"
})
{
  acknowledged: true,
  insertedId: ObjectId('6924a0a3c906523cf563b112')
}

# Erreur sur SECONDARY (comportement attendu)
rs2 [direct: secondary] transport> db.lines.insertOne({...})
MongoServerError[NotWritablePrimary]: not primary`

  const verifications = [
    { label: "Nous avons lu depuis secondary" },
    { label: "Document le plus récent retourné" },
    { label: "Réplication vérifiée" },
    { label: "Équilibrage entre shards confirmé" },
  ]

  return (
    <div className="w-full max-w-8xl mx-auto h-full py-4">
      <motion.div
        className="flex items-center justify-center gap-4 mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Search className="w-8 h-8 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold glow-text">Nos Requêtes de Vérification</h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <CodeBlock code={insertionTest} language="text" title="Notre Test d'Insertion" />
        </motion.div>
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <CodeBlock code={readFromSecondary} language="javascript" title="Lecture depuis Secondary" />
        </motion.div>
      </div>

      <motion.div
        className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {verifications.map((item, index) => (
          <motion.div
            key={item.label}
            className="glassmorphism p-4 rounded-xl text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <CheckCircle2 className="w-8 h-8 text-secondary mx-auto mb-2" />
            <p className="text-sm">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
