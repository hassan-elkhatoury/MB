"use client"

import { motion } from "framer-motion"
import { MongoDBLogo } from "../mongodb-logo"
import { Heart, Users, Coffee, Sparkles, Mail, Linkedin, Github } from "lucide-react"

const teamMembers = [
  { name: "Salma", role: "Laptop 1 - Routeur mongos", color: "#10AA50" },
  { name: "Douae", role: "Laptop 2 - Config + RS1 Primary + secondary de RS2 & RS3", color: "#00FF99" },
  { name: "Youssef", role: "Laptop 3 - Config + RS2 Primary + secondary de RS1 & RS3", color: "#10AA50" },
  { name: "Hassan", role: "Laptop 4 - Config + RS3 Primary + secondary de RS1 & RS2", color: "#00FF99" },
]

export function SlideThankYou() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[70vh] px-4">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main 3D content */}
      <motion.div
        className="relative text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d", perspective: "1500px" }}
      >
        {/* Animated MongoDB Logo */}
        <motion.div
          className="mb-8 relative inline-block"
          animate={{
            rotateY: [0, 360],
            y: [0, -15, 0],
          }}
          transition={{
            rotateY: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            y: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        >
          {/* Glow effect behind logo */}
          <motion.div
            className="absolute inset-0 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(16,170,80,0.5) 0%, transparent 70%)",
              transform: "scale(2)",
            }}
            animate={{
              scale: [2, 2.5, 2],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* Orbiting rings */}
          <motion.div className="absolute inset-0" style={{ transform: "scale(1.8)" }}>
            <motion.div
              className="absolute inset-0 border-2 border-primary/20 rounded-full"
              animate={{ rotateZ: 360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 border border-secondary/20 rounded-full"
              style={{ transform: "scale(1.3) rotateX(60deg)" }}
              animate={{ rotateZ: -360 }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>

          <MongoDBLogo size={120} />
        </motion.div>

        {/* Thank you text with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            animate={{
              textShadow: [
                "0 0 20px rgba(16,170,80,0.3)",
                "0 0 40px rgba(16,170,80,0.5)",
                "0 0 20px rgba(16,170,80,0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="text-gradient">Merci</span>
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl text-muted-foreground mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            pour votre attention
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-2 text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Heart className="w-5 h-5 text-red-500" />
            <Sparkles className="w-5 h-5" />
            <Coffee className="w-5 h-5 text-amber-500" />
          </motion.div>
        </motion.div>

        {/* Team members cards */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="glassmorphism rounded-2xl p-4 text-center group"
              initial={{ opacity: 0, y: 20, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                boxShadow: `0 20px 40px -10px ${member.color}40`,
              }}
              style={{
                transformStyle: "preserve-3d",
                boxShadow: `0 10px 30px -10px ${member.color}20`,
              }}
            >
              <motion.div
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold"
                style={{ backgroundColor: `${member.color}30`, color: member.color }}
                animate={{
                  boxShadow: [
                    `0 0 0 0 ${member.color}00`,
                    `0 0 20px 5px ${member.color}30`,
                    `0 0 0 0 ${member.color}00`,
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
              >
                {member.name.charAt(0)}
              </motion.div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-tight">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 glassmorphism rounded-2xl p-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 }}
          style={{
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5), 0 0 40px rgba(16,170,80,0.1)",
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-semibold">Ce que nous avons réalisé</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Nous avons déployé un Cluster MongoDB Shardé distribué sur{" "}
            <span className="text-primary font-semibold">4 machines</span> avec Docker, incluant{" "}
            <span className="text-primary font-semibold">3 shards</span>,
            <span className="text-primary font-semibold"> 6 réplicas</span>, et un
            <span className="text-primary font-semibold"> failover automatique</span> entièrement fonctionnel.
          </p>
        </motion.div>
        {/* Bottom tagline */}
        <motion.p
          className="mt-8 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
        >
        </motion.p>
      </motion.div>
    </div>
  )
}
