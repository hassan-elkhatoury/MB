"use client"

import { useState, useEffect, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Home, Menu, X } from "lucide-react"
import { ParticleBackground } from "./particle-background"
import { SlideTitle } from "./slides/slide-title"
import { SlideLaptops } from "./slides/slide-laptops"
import { SlideHostname } from "./slides/slide-hostname"
import { SlideDocker } from "./slides/slide-docker"
import { SlideFolder } from "./slides/slide-folder"
import { SlideCompose } from "./slides/slide-compose"
import { SlideStartCluster } from "./slides/slide-start-cluster"
import { SlideStartCluster2 } from "./slides/slide-start-cluster2"
import { SlideInitReplica } from "./slides/slide-init-replica"
import { SlideAddShards } from "./slides/slide-add-shards"
import { SlideEnableSharding } from "./slides/slide-enable-sharding"
import { SlideInsertTest } from "./slides/slide-insert-test"
import { SlideScreenshots } from "./slides/slide-screenshots"
import { SlideTestDetails } from "./slides/slide-test-details"
import { SlideFailover } from "./slides/slide-failover"
import { SlideVerification } from "./slides/slide-verification"
import { SlideChecklist } from "./slides/slide-checklist"
import { SlideEnd } from "./slides/slide-end"
import { SlideThankYou } from "./slides/slide-thankyou"

const slides = [
  { id: 1, title: "Titre", component: SlideTitle },
  { id: 2, title: "Architecture", component: SlideLaptops },
  { id: 3, title: "Configuration Hôtes", component: SlideHostname },
  { id: 4, title: "Installation Docker", component: SlideDocker },
  { id: 5, title: "Structure Dossiers", component: SlideFolder },
  { id: 6, title: "Docker Compose", component: SlideCompose },
  { id: 7, title: "Démarrage Cluster", component: SlideStartCluster },
  { id: 8, title: "Démarrage Cluster", component: SlideStartCluster2 },
  { id: 9, title: "Init Replica Sets", component: SlideInitReplica },
  { id: 10, title: "Ajout Shards", component: SlideAddShards },
  { id: 11, title: "Activer Sharding", component: SlideEnableSharding },
  { id: 12, title: "Insertion & Test", component: SlideInsertTest },
  { id: 13, title: "Captures d'écran", component: SlideScreenshots },
  { id: 14, title: "Détails des Tests", component: SlideTestDetails },
  { id: 15, title: "Failover", component: SlideFailover },
  { id: 16, title: "Vérification", component: SlideVerification },
  { id: 17, title: "Checklist", component: SlideChecklist },
  { id: 18, title: "Fin", component: SlideEnd },
  { id: 19, title: "Merci", component: SlideThankYou },
]

export function MongoDBPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1)
      setCurrentSlide((prev) => prev + 1)
    }
  }, [currentSlide])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1)
      setCurrentSlide((prev) => prev - 1)
    }
  }, [currentSlide])

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
    setMenuOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "Escape") {
        setMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  useEffect(() => {
    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX
      const diff = touchStartX - touchEndX
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide()
        else prevSlide()
      }
    }

    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchend", handleTouchEnd)
    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [nextSlide, prevSlide])

  const CurrentSlideComponent = slides[currentSlide].component

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: dir > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -1000 : 1000,
      opacity: 0,
      rotateY: dir > 0 ? -15 : 15,
    }),
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <ParticleBackground />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed left-0 top-0 z-50 h-full w-70 glassmorphism p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-primary font-semibold text-lg">Diapositives</h3>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    index === currentSlide ? "bg-primary text-primary-foreground glow-green" : "hover:bg-primary/10"
                  }`}
                >
                  <span className="text-sm opacity-60 mr-2">{String(slide.id).padStart(2, "0")}</span>
                  {slide.title}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-0 left-0 right-0 z-40 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-3 glassmorphism rounded-xl hover:bg-primary/20 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => goToSlide(0)}
            className="p-3 glassmorphism rounded-xl hover:bg-primary/20 transition-all"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>

        <div className="glassmorphism px-4 py-2 rounded-full">
          <span className="text-primary font-mono">{String(currentSlide + 1).padStart(2, "0")}</span>
          <span className="mx-2 opacity-40">/</span>
          <span className="opacity-60 font-mono">{slides.length}</span>
        </div>

        <div className="flex items-center gap-2">
        </div>
      </div>

      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <motion.div
          className="h-full bg-linear-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="relative h-full w-full" style={{ perspective: "1000px" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              rotateY: { duration: 0.4 },
            }}
            className="absolute inset-0 flex items-center justify-center p-8 pt-20"
            style={{ transformStyle: "preserve-3d" }}
          >
            <CurrentSlideComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4">
        {currentSlide !== 13 && (
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-4 glassmorphism rounded-full hover:bg-primary/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:text-primary transition-colors" />
          </button>
        )}

        <div className="flex gap-2">
          {currentSlide !== 13 && slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-primary w-8 glow-green" : "bg-muted hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
           
        {currentSlide !== 13 && (
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-4 glassmorphism rounded-full hover:bg-primary/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
        >
          <ChevronRight className="w-6 h-6 group-hover:text-primary transition-colors" />
        </button>
        )}
      </div>
    </div>
  )
}
