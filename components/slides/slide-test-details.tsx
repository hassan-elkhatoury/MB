"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { CodeBlock } from "../code-block"
import {
  Play,
  StopCircle,
  RefreshCw,
  CheckCircle,
  XCircle,
  Database,
  Server,
  Zap,
  Eye,
  Terminal,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Activity,
} from "lucide-react"

const testSteps = [
  {
    id: 1,
    title: "Vérification État Initial",
    icon: Database,
    description: "Nous nous sommes connectés au PRIMARY rs2 et avons vérifié les membres du replica set",
    command: `mongosh --host laptop3 --port 27018`,
    result: `rs2 [direct: primary] transport>`,
    status: "success",
    details: [
      { node: "laptop2:27018", state: "SECONDARY", health: 1, note: "" },
      { node: "laptop3:27018", state: "PRIMARY", health: 1, note: "" },
      { node: "laptop4:27018", state: "SECONDARY", health: 1, note: "" },
    ],
  },
  {
    id: 2,
    title: "Arrêt du PRIMARY",
    icon: StopCircle,
    description: "Nous avons simulé une panne en arrêtant le conteneur PRIMARY",
    command: `docker stop rs2_p`,
    result: `rs2_p`,
    status: "warning",
  },
  {
    id: 3,
    title: "Élection Automatique",
    icon: Zap,
    description: "Le cluster a automatiquement élu un nouveau PRIMARY",
    command: `mongosh --host laptop4 --port 27018`,
    result: `rs2 [direct: secondary] test>`,
    status: "success",
    newState: [
      { node: "laptop2:27018", state: "PRIMARY", health: 1, note: "Nouveau PRIMARY élu!" },
      { node: "laptop3:27018", state: "(not reachable)", health: 0, note: "Ancien PRIMARY arrêté" },
      { node: "laptop4:27018", state: "SECONDARY", health: 1, note: "SECONDARY actif" },
    ],
  },
  {
    id: 4,
    title: "État SECONDARY Vérifié",
    icon: Eye,
    description: "Nous avons vérifié l'état du nœud SECONDARY après l'élection",
    command: `rs.status().members[2]`,
    result: `{
  _id: 2,
  name: 'laptop4:27018',
  health: 1,
  state: 2,
  stateStr: 'SECONDARY',
  syncSourceHost: 'laptop2:27018'
}`,
    status: "success",
    explanation: "Le SECONDARY synchronise depuis le nouveau PRIMARY",
  },
  {
    id: 5,
    title: "Redémarrage Ancien PRIMARY",
    icon: RefreshCw,
    description: "Nous avons redémarré l'ancien PRIMARY qui a rejoint le cluster",
    command: `docker start rs2_p`,
    result: `rs2_p`,
    status: "success",
  },
  {
    id: 6,
    title: "Reconnexion Ancien PRIMARY",
    icon: Terminal,
    description: "Nous nous sommes connectés pour vérifier son nouveau rôle",
    command: `mongosh --host laptop3 --port 27018`,
    result: `rs2 [direct: secondary] test>`,
    status: "success",
    explanation: "L'ancien PRIMARY est maintenant SECONDARY!",
  },
  {
    id: 7,
    title: "Lecture sur SECONDARY",
    icon: Database,
    description: "Nous avons vérifié que les données sont accessibles",
    command: `db.lines.find().sort({_id: -1}).limit(1)`,
    result: `[{ _id: ObjectId('...'), name: 'Line 40 - Tetouan' }]`,
    status: "success",
    explanation: "Données accessibles en lecture sur SECONDARY",
  },
  {
    id: 8,
    title: "Écriture SECONDARY - Échec",
    icon: XCircle,
    description: "Nous avons tenté d'écrire sur SECONDARY - échec attendu",
    command: `db.lines.insertOne({name: "test"})`,
    result: `MongoServerError[NotWritablePrimary]: not primary`,
    status: "error",
    explanation: "Comportement attendu! SECONDARY = lecture seule",
  },
  {
    id: 9,
    title: "Connexion Nouveau PRIMARY",
    icon: Server,
    description: "Nous nous sommes connectés au nouveau PRIMARY pour l'écriture",
    command: `mongosh --host laptop2 --port 27018`,
    result: `rs2 [direct: primary] test>`,
    status: "success",
  },
  {
    id: 10,
    title: "Écriture sur PRIMARY",
    icon: CheckCircle,
    description: "Nous avons inséré des données de test",
    command: `db.lines.insertOne({name: "sync test"})`,
    result: `{ acknowledged: true, insertedId: ObjectId('...') }`,
    status: "success",
    explanation: "Insertion réussie sur le PRIMARY!",
  },
  {
    id: 11,
    title: "Vérification Réplication",
    icon: RefreshCw,
    description: "Nous avons vérifié la réplication sur SECONDARY",
    command: `db.lines.find().sort({_id: -1}).limit(1)`,
    result: `[{ _id: ObjectId('...'), name: 'sync test' }]`,
    status: "success",
    explanation: "Données répliquées avec succès!",
  },
  {
    id: 12,
    title: "Test Sans Routeur mongos",
    icon: AlertTriangle,
    description: "Nous avons vérifié que le replica set fonctionne indépendamment",
    command: `db.lines.insertOne({name: "after mongos shutdown"})`,
    result: `{ acknowledged: true, insertedId: ObjectId('...') }`,
    status: "success",
    explanation: "Le replica set est indépendant du routeur!",
  },
  {
    id: 13,
    title: "État Nœud Non Accessible",
    icon: XCircle,
    description: "Nous avons vérifié l'état d'un nœud en panne",
    command: `rs.status().members[1]`,
    result: `{ health: 0, stateStr: '(not reachable/healthy)' }`,
    status: "error",
    explanation: "Nœud marqué comme non accessible (health: 0)",
  },
]

export function SlideTestDetails() {
  const [activeStep, setActiveStep] = useState(0)

  const currentStep = testSteps[activeStep]
  const Icon = currentStep?.icon || Database

  const goNext = () => setActiveStep((prev) => Math.min(prev + 1, testSteps.length - 1))
  const goPrev = () => setActiveStep((prev) => Math.max(prev - 1, 0))

  return (
    <div className="w-full max-w-7xl mx-auto px-4 h-full slide" >
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <motion.div
          className="inline-flex items-center gap-3 mb-4"
          animate={{ rotateX: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          <Activity className="w-10 h-10 text-primary" />
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Nos Tests de Failover</span>
          </h2>
        </motion.div>
        <p className="text-muted-foreground text-lg">
          Démonstration complète de notre processus de basculement automatique
        </p>
      </motion.div>

      {/* Main content grid - 3D cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 ">
        
        {/* Left panel - Mini timeline */}
        <div className="lg:col-span-3 order-2 lg:order-1 ">
          <motion.div
            className="glassmorphism rounded-2xl p-6 max-h-[70vh] overflow-y-auto custom-scrollbar2 "
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Nos Étapes de Test
            </h3>
            <div className="space-y-1">
              {testSteps.map((step, index) => {
                const StepIcon = step.icon
                const isActive = activeStep === index
                const isPast = index < activeStep

                return (
                  <motion.button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left p-2 rounded-lg transition-all flex items-center gap-2 group ${
                      isActive
                        ? "bg-primary/20 border border-primary/50"
                        : isPast
                          ? "bg-primary/5 border border-transparent"
                          : "hover:bg-card/80 border border-transparent"
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : isPast
                            ? step.status === "error"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-primary/30 text-primary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isPast ? (
                        step.status === "error" ? (
                          <XCircle className="w-3 h-3" />
                        ) : (
                          <CheckCircle className="w-3 h-3" />
                        )
                      ) : (
                        <span className="text-[10px] font-bold">{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-xs truncate ${isActive ? "text-primary font-medium" : ""}`}>
                      {step.title}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Center panel - Main 3D content card */}
        <div className="lg:col-span-9 order-1 lg:order-2">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 30, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative"
            style={{ transformStyle: "preserve-3d", perspective: "1500px" }}
          >
            {/* 3D floating card */}
            <div
              className="glassmorphism rounded-3xl overflow-hidden"
              style={{
                boxShadow: `
                  0 50px 100px -20px rgba(0, 0, 0, 0.5),
                  0 30px 60px -30px rgba(16, 170, 80, 0.2),
                  inset 0 1px 0 rgba(255,255,255,0.1),
                  inset 0 -1px 0 rgba(0,0,0,0.1)
                `,
              }}
            >
              {/* Card header with gradient */}
              <div
                className={`p-6 border-b border-border/50 relative overflow-hidden ${
                  currentStep.status === "error"
                    ? "bg-linear-to-r from-red-500/10 to-transparent"
                    : currentStep.status === "warning"
                      ? "bg-linear-to-r from-yellow-500/10 to-transparent"
                      : "bg-linear-to-r from-primary/10 to-transparent"
                }`}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                      backgroundSize: "24px 24px",
                    }}
                  />
                </div>

                <div className="relative flex items-start gap-4">
                  <motion.div
                    className={`p-4 rounded-2xl ${
                      currentStep.status === "success"
                        ? "bg-primary/20 text-primary"
                        : currentStep.status === "error"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                    }`}
                    animate={{
                      scale: [1, 1.05, 1],
                      rotateY: [0, 10, 0],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 space-y-4 max-h-[48vh] overflow-y-auto custom-scrollbar">
                {/* Command block */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Play className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">Commande exécutée</span>
                  </div>
                  <CodeBlock code={currentStep.command} language="bash" />
                </div>

                {/* Result block */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-semibold text-secondary">Résultat obtenu</span>
                  </div>
                  <CodeBlock code={currentStep.result} language="json" />
                </div>

                {/* Explanation */}
                {currentStep.explanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-start gap-3 ${
                      currentStep.status === "error"
                        ? "bg-red-500/10 border border-red-500/30"
                        : "bg-primary/10 border border-primary/30"
                    }`}
                  >
                    <div
                      className={`p-1 rounded-full ${
                        currentStep.status === "error" ? "bg-red-500/20" : "bg-primary/20"
                      }`}
                    >
                      {currentStep.status === "error" ? (
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm flex-1">{currentStep.explanation}</p>
                  </motion.div>
                )}

                {/* Node status grid */}
                {(currentStep.details || currentStep.newState) && (
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Server className="w-4 h-4 text-primary" />
                      État des Nœuds
                    </h4>
                    <div className="grid gap-2">
                      {(currentStep.newState || currentStep.details)?.map((member, i) => (
                        <motion.div
                          key={i}
                          className={`flex items-center justify-between p-3 rounded-xl ${
                            member.health === 0
                              ? "bg-red-500/10 border border-red-500/20"
                              : member.state === "PRIMARY"
                                ? "bg-primary/10 border border-primary/20"
                                : "bg-card/50 border border-border/50"
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                member.health === 0
                                  ? "bg-red-500"
                                  : member.state === "PRIMARY"
                                    ? "bg-primary animate-pulse"
                                    : "bg-muted-foreground"
                              }`}
                            />
                            <span className="font-mono text-sm">{member.node}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {member.note && (
                              <span className="text-xs text-muted-foreground hidden md:inline">{member.note}</span>
                            )}
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                member.state === "PRIMARY"
                                  ? "bg-primary/20 text-primary"
                                  : member.health === 0
                                    ? "bg-red-500/20 text-red-400"
                                    : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {member.state}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-6">
            <motion.button
              onClick={goPrev}
              disabled={activeStep === 0}
              className="flex items-center gap-2 px-5 py-3 glassmorphism rounded-xl font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/10 transition-all"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
              Précédent
            </motion.button>

            <div className="flex gap-1">
              {testSteps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeStep ? "bg-primary w-6" : i < activeStep ? "bg-primary/50" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={goNext}
              disabled={activeStep === testSteps.length - 1}
              className="flex items-center gap-2 px-5 py-3 glassmorphism rounded-xl font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/10 transition-all"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              Suivant
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
