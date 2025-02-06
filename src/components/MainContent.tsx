"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

const noResponses = ["Are you sure?", "Think again!", "Last chance!", "Pretty please?", "Don't break my heart!"]

export default function MainContent() {
  const [noCount, setNoCount] = useState(0)
  const [yesPressed, setYesPressed] = useState(false)

  const handleYesClick = () => {
    setYesPressed(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const handleNoClick = () => {
    setNoCount(noCount + 1)
  }

  const yesButtonSize = 100 + noCount * 1.5

  return (
    <div className="text-center">
      <motion.h2
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-600 mb-8"
      >
        Will you be my Valentine?
      </motion.h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleYesClick}
          style={{ fontSize: `${yesButtonSize}%` }}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 ease-in-out"
        >
          YES
        </motion.button>
        {!yesPressed && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNoClick}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 ease-in-out"
          >
            {noResponses[noCount % noResponses.length]}
          </motion.button>
        )}
      </div>
      <AnimatePresence>
        {yesPressed && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h3 className="text-2xl md:text-3xl text-pink-600 font-bold mb-4">Yay! Happy Valentine's Day! ❤️</h3>
            <p className="text-xl text-red-500">I'm so happy you said yes! Let's make this day special together.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

