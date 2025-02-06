"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "./components/Header"
import MainContent from "./components/MainContent"
import PersonalizedLink from "./components/PersonalizedLink"

export default function ValentinePage() {
  const [name, setName] = useState<string>("")
  const [generatedUrl, setGeneratedUrl] = useState<string>("")
  const [showContent, setShowContent] = useState(false)
  const [copied, setCopied] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const to = searchParams.get("to")
    if (to) {
      setName(decodeURIComponent(to))
      setShowContent(true)
    }
  }, [searchParams])

  const handleNameSubmit = (submittedName: string) => {
    setName(submittedName)
    const url = `${window.location.origin}/${encodeURIComponent(submittedName)}`
    setGeneratedUrl(url)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-red-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl">
        {!generatedUrl ? (
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-600 mb-4 sm:mb-6">Create Your Valentine Page</h1>
            <div className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your valentine's name"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                onClick={() => handleNameSubmit(name)}
                className="w-full bg-pink-500 text-white py-2 sm:py-3 px-4 rounded-md hover:bg-pink-600 transition-colors text-base sm:text-lg"
              >
                Generate Link
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-pink-600 mb-4">Your Valentine Link is Ready!</h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
              <input
                type="text"
                value={generatedUrl}
                readOnly
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-50 border rounded-md"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors whitespace-nowrap"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              Share this link with {name} to show your valentine message!
            </p>
            <button
              onClick={() => {
                setGeneratedUrl("")
                setName("")
              }}
              className="mt-4 text-pink-600 hover:text-pink-700 underline text-sm sm:text-base"
            >
              Create another link
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-pink-100">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-8">My Valentine</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create Your Valentine Page</h2>
          <form className="space-y-4" action={`/${encodeURIComponent(name)}`} method="get">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Enter your valentine's name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors"
            >
              Create Page
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

