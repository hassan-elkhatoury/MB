"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  typing?: boolean
}

export function CodeBlock({ code, language = "bash", title, typing = false }: CodeBlockProps) {
  const [displayedCode, setDisplayedCode] = useState(typing ? "" : code)
  const [copied, setCopied] = useState(false)
  const [isComplete, setIsComplete] = useState(!typing)

  useEffect(() => {
    if (!typing) return

    let i = 0
    const interval = setInterval(() => {
      if (i < code.length) {
        setDisplayedCode(code.slice(0, i + 1))
        i++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, 15)

    return () => clearInterval(interval)
  }, [code, typing])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism rounded-xl overflow-hidden"
    >
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border">
          <span className="text-sm text-muted-foreground font-mono">{title}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded">{language}</span>
            <button onClick={copyToClipboard} className="p-1.5 hover:bg-primary/20 rounded transition-colors">
              {copied ? <Check className="w-4 h-4 text-secondary" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="font-mono text-foreground">
          {displayedCode}
          {typing && !isComplete && <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5" />}
        </code>
      </pre>
    </motion.div>
  )
}
