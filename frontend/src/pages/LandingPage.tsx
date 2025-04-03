"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import HeroSection from "../components/HeroSection"
import FeaturesSection from "../components/FeaturesSection"
import CtaSection from "../components/CtaSection"
import Footer from "../components/Footer"
import { Button } from "../components/ui/Button"

interface LandingPageProps {
  navigateTo: (page: "landing" | "chat" | "login") => void
}

export default function LandingPage({ navigateTo }: LandingPageProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black to-slate-900">
      <Navbar navigateTo={navigateTo} />
      <main>
        <HeroSection navigateTo={navigateTo} />
        <FeaturesSection />
        <CtaSection navigateTo={navigateTo} />
      </main>
      <Footer />

      {/* Fixed Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white rounded-full h-14 w-14 shadow-lg"
          onClick={() => navigateTo("chat")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span className="sr-only">Open Chat</span>
        </Button>
      </div>
    </div>
  )
}

