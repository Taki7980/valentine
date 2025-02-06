"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CopyIcon, CheckIcon } from "lucide-react"

interface PersonalizedLinkProps {
  onNameSubmit: (name: string) => void
}

export default function PersonalizedLink({ onNameSubmit }: PersonalizedLinkProps) {
  const [inputName, setInputName] = useState("")
  const [generatedLink, setGeneratedLink] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputName.trim()) {
      const name = encodeURIComponent(inputName.trim())
      const link = `${window.location.origin}/?to=${name}`
      setGeneratedLink(link)
      onNameSubmit(inputName.trim())
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink)
      setCopied(true)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center w-full max-w-md"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Create a personalized Valentine's link</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mb-6">
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Enter your Valentine's name"
          className="w-full px-4 py-2 rounded-full border-2 border-pink-300 focus:outline-none focus:border-pink-500"
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white font-bold py-2 px-6 rounded-full hover:bg-pink-600 transition-colors duration-200"
        >
          Generate Link
        </button>
      </form>
      {generatedLink && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <p className="text-lg font-semibold mb-2">Your personalized link:</p>
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
            <input
              type="text"
              readOnly
              value={generatedLink}
              className="w-full bg-transparent text-pink-600 font-medium focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="ml-2 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors duration-200 flex items-center justify-center"
              aria-label="Copy to clipboard"
            >
              {copied ? <CheckIcon size={20} /> : <CopyIcon size={20} />}
            </button>
          </div>
          {copied && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-green-600 mt-2"
            >
              Copied to clipboard!
            </motion.p>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

