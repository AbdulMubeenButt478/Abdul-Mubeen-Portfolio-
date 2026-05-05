"use client"

import { useEffect, useState, useMemo, useCallback, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"

interface FlipFadeTextProps {
  words?: string[]
  interval?: number
  className?: string
  textClassName?: string
  letterDuration?: number
  staggerDelay?: number
  exitStaggerDelay?: number
}

const defaultWords = ["LOADING", "COMPUTING", "SEARCHING", "RETRIEVING", "ASSEMBLING"]

const Letter = memo(function Letter({ 
  char, 
  letterDuration 
}: { 
  char: string
  letterDuration: number 
}) {
  return (
    <motion.span
      style={{ transformStyle: "preserve-3d" }}
      variants={{
        initial: {
          rotateX: 90,
          y: 10,
          opacity: 0,
          filter: "blur(4px)",
        },
        animate: {
          rotateX: 0,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          transition: {
            duration: 0.8, // Increased for smoothness
            ease: [0.16, 1, 0.3, 1], // Very smooth liquid out easing
          },
        },
        exit: {
          rotateX: -90,
          y: -10,
          opacity: 0,
          filter: "blur(4px)",
          transition: {
            duration: 0.6,
            ease: [0.7, 0, 0.84, 0], // Smooth acceleration in
          },
        },
      }}
      className="inline-block"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  )
})

const Word = memo(function Word({ 
  text, 
  staggerDelay, 
  exitStaggerDelay, 
  letterDuration,
  textClassName
}: { 
  text: string
  staggerDelay: number
  exitStaggerDelay: number
  letterDuration: number
  textClassName?: string
}) {
  const words = useMemo(() => text.split(" "), [text])

  return (
    <motion.div
      className={cn(
        "flex flex-wrap justify-start gap-x-1 gap-y-0.5 font-bold uppercase",
        textClassName
      )}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { opacity: 1 },
        animate: {
          opacity: 1,
          transition: {
            staggerChildren: 0,
          },
        },
        exit: {
          opacity: 1,
          transition: {
            staggerChildren: 0,
          },
        },
      }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="flex whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <Letter 
              key={`${wordIndex}-${charIndex}`} 
              char={char} 
              letterDuration={letterDuration} 
            />
          ))}
        </span>
      ))}
    </motion.div>
  )
})

export function FlipFadeText({
  words = defaultWords,
  interval = 2500,
  className,
  textClassName,
  letterDuration = 0.6,
  staggerDelay = 0,
  exitStaggerDelay = 0,
}: FlipFadeTextProps) {
  const [index, setIndex] = useState(0)

  const updateIndex = useCallback(() => {
    setIndex((prev) => (prev + 1) % words.length)
  }, [words.length])

  useEffect(() => {
    const timer = setInterval(updateIndex, interval)
    return () => clearInterval(timer)
  }, [updateIndex, interval])

  const currentWord = useMemo(() => words[index], [words, index])

  return (
    <div className={cn("inline-flex items-center justify-start", className)}>
      <div className="relative flex items-center justify-start" style={{ perspective: "1000px" }}>
        <AnimatePresence mode="wait">
          <Word 
            key={currentWord} 
            text={currentWord} 
            staggerDelay={staggerDelay}
            exitStaggerDelay={exitStaggerDelay}
            letterDuration={letterDuration}
            textClassName={textClassName}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FlipFadeText
