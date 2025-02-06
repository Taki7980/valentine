"use client"

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState, useRef } from 'react';
import { use } from 'react';

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

const convincingTexts = [
  "Are you sure? 🥺",
  "Please reconsider! 💝",
  "But we'd be perfect together! ✨",
  "Give it another thought! 🌹",
  "Don't break my heart! 💔",
  "Just one chance! 🎀",
  "Pretty please! 🦋",
  "Think again! 🌟",
  "You're making me sad! 😢",
  "One more try? 🎭"
];

export default function ValentinePage({ params }: PageProps) {
  const [response, setResponse] = useState<string | null>(null);
  const [noCount, setNoCount] = useState(0);
  const [isNoButtonRandom, setIsNoButtonRandom] = useState(false);
  const [convincingText, setConvincingText] = useState("Maybe later 🤔");
  const videoRef = useRef<HTMLVideoElement>(null);
  const resolvedParams = use(params);
  const decodedName = decodeURIComponent(resolvedParams.name);
  
  // Validate the name
  if (!decodedName || decodedName.length > 50) {
    notFound();
  }

  const handleNoClick = () => {
    // 30% chance to turn the No button into a Yes button after 3 clicks
    if (noCount >= 3 && Math.random() < 0.3) {
      setIsNoButtonRandom(true);
      setResponse("yes");
      return;
    }

    setNoCount(prev => prev + 1);
    const randomText = convincingTexts[Math.floor(Math.random() * convincingTexts.length)];
    setConvincingText(randomText);
  };

  const handleYesClick = () => {
    setResponse("yes");
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-pink-100">
      <div className="w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-600 mb-4 sm:mb-8">
          Dear {decodedName}
        </h1>
        
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
          {!response ? (
            <>
              <p className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-6">
                Will you be my Valentine
              </p>
              
              <div className="space-y-3 sm:space-y-4">
                <button 
                  onClick={handleYesClick}
                  className="w-full bg-pink-500 text-white py-2 sm:py-3 px-4 rounded-md hover:bg-pink-600 transition-colors"
                  style={{ fontSize: `${Math.min(1 + noCount * 0.1, 2)}rem` }}
                >
                  Yes❤️
                </button>
                
                <button 
                  onClick={handleNoClick}
                  className="w-full bg-gray-200 text-gray-700 py-2 sm:py-3 px-4 rounded-md hover:bg-gray-300 transition-colors"
                  style={{ 
                    transform: noCount > 0 ? `translateX(${Math.sin(noCount) * 10}px)` : 'none'
                  }}
                >
                  {convincingText}
                </button>
              </div>
            </>
          ) : (
            <div className="py-4 sm:py-6 lg:py-8">
              {response === "yes" && (
                <div className="space-y-4">
                  <p className="text-xl sm:text-2xl lg:text-3xl text-pink-600 mb-4">
                    💖 Yay! Happy Valentine&apos;s Day! 💖
                  </p>
                  <div className="relative rounded-lg overflow-hidden max-w-full">
                    <video
                      ref={videoRef}
                      className="w-full rounded-lg"
                      controls
                      autoPlay
                      loop
                      playsInline
                    >
                      <source 
                        src="/video.mp4" 
                        type="video/mp4" 
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-6 sm:mt-8">
          <Link
            href="/"
            className="text-sm sm:text-base text-pink-600 hover:text-pink-700 underline"
          >
            Create your own Valentine page
          </Link>
        </div>
      </div>
    </main>
  );
} 