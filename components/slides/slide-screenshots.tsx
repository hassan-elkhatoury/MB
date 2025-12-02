"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from "lucide-react"

export function SlideScreenshots() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const captions: Record<number, string> = {
    1: "Connexion mongosh à 10.39.239.119:27018",
    2: "rs2 [direct: primary] transport>",
    3: "Membre SECONDARY 10.39.239.237:27018 - syncSource: 10.39.239.119:27018",
    4: "Membre PRIMARY 10.39.239.119:27018 - electionTime: 17:41:05",
    5: "Membre SECONDARY 10.39.239.232:27018 - syncSource: 10.39.239.119:27018",
    6: "docker stop rs2_p - Arrêt du primary",
    7: "docker ps - Liste des conteneurs après arrêt",
    8: "Connexion mongosh à 10.39.239.232:27018 (secondary)",
    9: "Nouveau PRIMARY élu: 10.39.239.237:27018 - electionTime: 17:55:45",
    10: "Ancien primary 10.39.239.119:27018 - état: (not reachable/healthy)",
    11: "SECONDARY 10.39.239.232:27018 - syncSource: 10.39.239.237:27018",
    12: "docker start rs2_p - Redémarrage du primary",
    13: "Connexion à 10.39.239.119:27018 - maintenant SECONDARY",
    14: "Lecture sur secondary - Document Tetouan Line 40",
    15: "Erreur NotWritablePrimary - Impossible d'écrire sur secondary",
    16: "Connexion au nouveau PRIMARY 10.39.239.237:27018",
    17: "Insertion réussie sur primary - Document de test sync",
    18: "Vérification sur secondary - Document répliqué avec succès",
    19: "Insertion après arrêt du routeur mongos",
    20: "État membre non accessible - heartbeat timeout",
  }

  const screenshots = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    src: `/assets/${i + 1}.png?height=300&width=500&query=MongoDB terminal screenshot ${i + 1} cluster testing failover replication`,
    caption: captions[i + 1] || `Capture d'écran ${i + 1}`,
  }))

  const nextImage = () => {
    if (selectedImage !== null && selectedImage < 19) setSelectedImage(selectedImage + 1)
  }

  const prevImage = () => {
    if (selectedImage !== null && selectedImage > 0) setSelectedImage(selectedImage - 1)
  }

  return (
    <div className="w-full max-w-6xl mx-auto h-full overflow-hidden flex flex-col">
      <motion.div
        className="flex items-center justify-center gap-4 mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Images className="w-8 h-8 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold glow-text">Captures d'Écran des Tests</h2>
      </motion.div>

      <motion.p
        className="text-center text-muted-foreground mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Cliquez sur une image pour l'agrandir • 20 captures documentant la configuration
      </motion.p>

      <div className="flex-1 overflow-y-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={screenshot.id}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.03 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => setSelectedImage(index)}
            >
              <div className="glassmorphism rounded-xl overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={screenshot.src || "/placeholder.svg"}
                    alt={screenshot.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white truncate">{screenshot.caption}</p>
                  </div>
                  <div className="absolute top-2 left-2 bg-primary/80 px-2 py-0.5 rounded text-xs font-mono">
                    {screenshot.id}/20
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 glassmorphism rounded-full z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 glassmorphism rounded-full z-10 disabled:opacity-30"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              disabled={selectedImage === 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 glassmorphism rounded-full z-10 disabled:opacity-30"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              disabled={selectedImage === 19}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <motion.div
              className="max-w-5xl max-h-[80vh] mx-auto px-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={screenshots[selectedImage].src || "/placeholder.svg"}
                alt={screenshots[selectedImage].caption}
                className="max-w-full max-h-[70vh] object-contain rounded-xl"
              />
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold">Capture d'écran {selectedImage + 1}/20</p>
                <p className="text-muted-foreground">{screenshots[selectedImage].caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
