"use client"

import { useState } from "react"

interface PersonalizedLinkProps {
  onNameSubmit: (name: string) => void
}

export default function PersonalizedLink({ onNameSubmit }: PersonalizedLinkProps) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Please enter a name")
      return
    }
    if (name.length > 50) {
      setError("Name is too long (maximum 50 characters)")
      return
    }
    setError("")
    onNameSubmit(name.trim())
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        Create Your Valentine&apos;s Message
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            To:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your valentine&apos;s name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors"
        >
          Create Message
        </button>
      </form>
    </div>
  )
}

