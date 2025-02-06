"use client"

import { useState } from "react"
import Image from "next/image"

export default function MainContent() {
  const [noCount, setNoCount] = useState(0)
  const [yesPressed, setYesPressed] = useState(false)
  const yesButtonSize = noCount * 20 + 16

  const handleNoClick = () => {
    setNoCount(noCount + 1)
  }

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely sure?",
      "This could be a mistake!",
      "Have a heart!",
      "Don&apos;t be so cold!",
      "Change of heart?",
      "Wouldn&apos;t you reconsider?",
      "Is that your final answer?",
      "You&apos;re breaking my heart ;(",
    ]

    return phrases[Math.min(noCount, phrases.length - 1)]
  }

  return (
    <div className="flex flex-col items-center">
      {yesPressed ? (
        <>
          <Image
            src="/yes-image.gif"
            alt="Bears kissing"
            width={300}
            height={300}
          />
          <div className="text-4xl font-bold my-4">Yayy!! I love you! ❤️</div>
        </>
      ) : (
        <>
          <Image
            src="/main-image.gif"
            alt="Bear with hearts"
            width={200}
            height={200}
          />
          <h1 className="text-4xl my-4">Will you be my Valentine?</h1>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className={`bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl`}
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg text-xl"
            >
              {getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

