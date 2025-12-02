"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "../code-block"
import { Database, GitBranch } from "lucide-react"

export function SlideInitReplica() {
  const configRS = `rs.initiate({
  _id: "configRS",
  configsvr: true,
  members: [
    { _id: 0, host: "laptop2:27020" },
    { _id: 1, host: "laptop3:27020" },
    { _id: 2, host: "laptop4:27020" }
  ]
})`

  const rs1 = `rs.initiate({
  _id: "rs1",
  members: [
    { _id: 0, host: "laptop2:27017" },
    { _id: 1, host: "laptop3:27017" },
    { _id: 2, host: "laptop4:27017" }
  ]
})`

  const rs2 = `rs.initiate({
  _id: "rs2",
  members: [
    { _id: 0, host: "laptop3:27018" },
    { _id: 1, host: "laptop2:27018" },
    { _id: 2, host: "laptop4:27018" }
  ]
})`

  const rs3 = `rs.initiate({
  _id: "rs3",
  members: [
    { _id: 0, host: "laptop4:27019" },
    { _id: 1, host: "laptop2:27019" },
    { _id: 2, host: "laptop3:27019" }
  ]
})`

  return (
    <div className="w-full max-w-5xl mx-auto h-full overflow-y-auto py-4">
      <motion.div
        className="flex items-center justify-center gap-4 mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <GitBranch className="w-8 h-8 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold glow-text">Initialisation des Replica Sets</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-400">Config RS</span>
          </div>
          <CodeBlock code={configRS} language="javascript" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-green-400">RS1</span>
          </div>
          <CodeBlock code={rs1} language="javascript" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400">RS2</span>
          </div>
          <CodeBlock code={rs2} language="javascript" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-semibold text-orange-400">RS3</span>
          </div>
          <CodeBlock code={rs3} language="javascript" />
        </motion.div>
      </div>
    </div>
  )
}
