"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "../code-block"
import { AlertTriangle, CheckCircle2, ArrowRight, Server } from "lucide-react"

export function SlideFailover() {
  const stopCommand = `# Arrêter le conteneur primary rs2
docker stop rs2_p

# Surveiller le processus d'élection
# Observer les logs pour la nouvelle élection PRIMARY`

  const electionLog = `# Ancien PRIMARY arrêté
laptop3:27018 - stateStr: '(not reachable/healthy)'
lastHeartbeatMessage: "Couldn't get a connection within the time limit"

# Nouveau PRIMARY élu
laptop2:27018 - stateStr: 'PRIMARY'
electionTime: Timestamp({ t: 1764006945, i: 1 })
electionDate: ISODate('2025-11-24T17:55:45.000Z')

# Ancien primary redémarré → devient SECONDARY
docker start rs2_p
laptop3:27018 - stateStr: 'SECONDARY'`

  const heartbeatLog = `{
  _id: 1,
  name: 'laptop3:27018',
  health: 0,
  state: 8,
  stateStr: '(not reachable/healthy)',
  lastHeartbeat: ISODate('2025-11-24T18:00:33.349Z'),
  lastHeartbeatRecv: ISODate('2025-11-24T17:55:46.857Z'),
  pingMs: Long('9'),
  lastHeartbeatMessage: "Couldn't get a connection within the time limit"
}`

  const timeline = [
    { time: "T+0s", event: "Primary arrêté", status: "warning" },
    { time: "T+2s", event: "Timeout heartbeat", status: "warning" },
    { time: "T+5s", event: "Élection démarrée", status: "info" },
    { time: "T+7s", event: "Nouveau PRIMARY élu", status: "success" },
    { time: "T+30s", event: "Ancien primary → SECONDARY", status: "success" },
  ]

  return (
    <div className="w-full max-w8xl mx-auto h-full  py-4">
      <motion.div
        className="flex items-center justify-center gap-4 mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <AlertTriangle className="w-8 h-8 text-yellow-500" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold glow-text">Failover Automatique</h2>
      </motion.div>

      <motion.div
        className="flex justify-center gap-2 mb-6 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {timeline.map((item, index) => (
          <motion.div
            key={item.time}
            className={`glassmorphism px-3 py-2 rounded-lg flex items-center gap-2 text-sm ${item.status === "success" ? "border-green-500/50" : item.status === "warning" ? "border-yellow-500/50" : "border-blue-500/50"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <span className="font-mono text-xs text-muted-foreground">{item.time}</span>
            <span>{item.event}</span>
            {index < timeline.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground" />}
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-1 gap-4">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <CodeBlock code={stopCommand} language="bash" title="Arrêt du Primary" />
        </motion.div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
          <CodeBlock code={electionLog} language="text" title="Journal d'Élection" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <CodeBlock code={heartbeatLog} language="json" title="Statut Heartbeat" />
        </motion.div>
      </div>
    </div>
  )
}
