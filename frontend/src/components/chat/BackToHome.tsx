"use client"

import { Button } from "../ui/Button"
import { ArrowLeft } from "lucide-react"

interface BackToHomeProps {
  navigateTo: (page: "landing" | "chat") => void
}

export default function BackToHome({ navigateTo }: BackToHomeProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="absolute top-4 left-4 text-slate-400 hover:text-white z-50"
      onClick={() => navigateTo("landing")}
    >
      <ArrowLeft size={16} className="mr-2" />
      Back to Home
    </Button>
  )
}

