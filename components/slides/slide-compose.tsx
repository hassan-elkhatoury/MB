"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CodeBlock } from "../code-block"
import { ChevronDown } from "lucide-react"

const composeFiles = {
  laptop1: `# Laptop1 - Salma (routeur mongos)
version: '3.8'
services:
  mongos:
    image: mongo:6.0
    container_name: mongos
    command: mongos --configdb configRS/laptop2:27020,laptop3:27020,laptop4:27020 --bind_ip_all
    ports:
      - "27020:27020"
    networks:
      - mongo-net
networks:
  mongo-net:
    driver: bridge`,
  laptop2: `# Laptop2 - Douae
version: '3.8'
services:
  config:
    image: mongo:6.0
    container_name: config
    command: mongod --configsvr --replSet configRS --bind_ip_all
    ports:
      - "27020:27017"
    volumes:
      - ./data/config:/data/db
  rs1_p:
    image: mongo:6.0
    container_name: rs1_p
    command: mongod --shardsvr --replSet rs1 --bind_ip_all
    ports:
      - "27017:27017"
    volumes:
      - ./data/rs1_p:/data/db
  rs2_s2:
    image: mongo:6.0
    container_name: rs2_s2
    command: mongod --shardsvr --replSet rs2 --bind_ip_all
    ports:
      - "27018:27017"
  rs3_s2:
    image: mongo:6.0
    container_name: rs3_s2
    command: mongod --shardsvr --replSet rs3 --bind_ip_all
    ports:
      - "27019:27017"
  mongos:
    image: mongo:6.0
    container_name: mongos
    command: >
      mongos --configdb configRS/laptop2:26050,laptop3:26050,laptop4:26050
      --bind_ip_all --port 27020
    ports:
      - "27020:27020"`,
  laptop3: `# Laptop3 - Youssef
version: '3.8'
services:
  config:
    image: mongo:6.0
    container_name: config
    command: mongod --configsvr --replSet configRS --bind_ip_all
    ports:
      - "27020:27017"
  rs2_p:
    image: mongo:6.0
    container_name: rs2_p
    command: mongod --shardsvr --replSet rs2 --bind_ip_all
    ports:
      - "27018:27017"
  rs1_s2:
    image: mongo:6.0
    container_name: rs1_s2
    command: mongod --shardsvr --replSet rs1 --bind_ip_all
    ports:
      - "27017:27017"
  rs3_s3:
    image: mongo:6.0
    container_name: rs3_s3
    command: mongod --shardsvr --replSet rs3 --bind_ip_all
    ports:
      - "27019:27017"
  mongos:
    image: mongo:6.0
    container_name: mongos
    command: >
      mongos --configdb configRS/laptop2:26050,laptop3:26050,laptop4:26050
      --bind_ip_all --port 27020
    ports:
      - "27020:27020"`,
  laptop4: `# Laptop4 - Hassan
version: '3.8'
services:
  config:
    image: mongo:6.0
    container_name: config
    command: mongod --configsvr --replSet configRS --bind_ip_all
    ports:
      - "27020:27017"
  rs3_p:
    image: mongo:6.0
    container_name: rs3_p
    command: mongod --shardsvr --replSet rs3 --bind_ip_all
    ports:
      - "27019:27017"
  rs1_s3:
    image: mongo:6.0
    container_name: rs1_s3
    command: mongod --shardsvr --replSet rs1 --bind_ip_all
    ports:
      - "27017:27017"
  rs2_s3:
    image: mongo:6.0
    container_name: rs2_s3
    command: mongod --shardsvr --replSet rs2 --bind_ip_all
    ports:
      - "27018:27017"
  mongos:
    image: mongo:6.0
    container_name: mongos
    command: >
      mongos --configdb configRS/laptop2:26050,laptop3:26050,laptop4:26050
      --bind_ip_all --port 27020
    ports:
      - "27020:27020"`,
}

export function SlideCompose() {
  const [expanded, setExpanded] = useState<string | null>("laptop1")

  const laptops = [
    { id: "laptop1", name: "Laptop1 - Salma", color: "#FF6B6B" },
    { id: "laptop2", name: "Laptop2 - Douae", color: "#10AA50" },
    { id: "laptop3", name: "Laptop3 - Youssef", color: "#4ECDC4" },
    { id: "laptop4", name: "Laptop4 - Hassan", color: "#FFE66D" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto h-full overflow-y-auto py-4 custom-scrollbar2">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-2 glow-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Fichiers Docker Compose
      </motion.h2>
      <motion.p
        className="text-center text-muted-foreground mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Cliquez pour développer la configuration de chaque laptop
      </motion.p>

      <div className="space-y-3">
        {laptops.map((laptop, index) => (
          <motion.div
            key={laptop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <button
              onClick={() => setExpanded(expanded === laptop.id ? null : laptop.id)}
              className="w-full glassmorphism p-4 rounded-xl flex items-center justify-between hover:bg-primary/10 transition-all"
              style={{ borderColor: laptop.color }}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: laptop.color }} />
                <span className="font-semibold">{laptop.name}</span>
              </div>
              <motion.div animate={{ rotate: expanded === laptop.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>
            <AnimatePresence>
              {expanded === laptop.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3">
                    <CodeBlock
                      code={composeFiles[laptop.id as keyof typeof composeFiles]}
                      language="yaml"
                      title="docker-compose.yml"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
