"use client"

import type React from "react"

import { useState, useRef, type FormEvent } from "react"
import { Button } from "../ui/Button"
import { Textarea } from "../ui/Textarea"
import { Smile, Paperclip, Mic, Image, Send, Loader2 } from "lucide-react"

interface MessageInputProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}

export default function MessageInput({ input, handleInputChange, handleSubmit, isLoading }: MessageInputProps) {
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.trim()) {
        const form = e.currentTarget.form
        if (form) form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
      }
    }
  }

  const adjustTextareaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target
    textarea.style.height = "auto"
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    handleInputChange(e)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      {showAttachMenu && (
        <div className="absolute bottom-full left-0 mb-2 p-2 bg-slate-900 rounded-lg border border-slate-800 flex gap-2">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
            <Image size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
            <Paperclip size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
            <Mic size={20} />
          </Button>
        </div>
      )}

      <div className="flex items-end gap-2 bg-slate-900 rounded-lg border border-slate-800 p-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="flex-shrink-0 text-slate-400 hover:text-white hover:bg-slate-800"
          onClick={() => setShowAttachMenu(!showAttachMenu)}
        >
          <Paperclip size={20} />
        </Button>

        <Textarea
          ref={textareaRef}
          value={input}
          onChange={adjustTextareaHeight}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="min-h-[40px] max-h-[120px] flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none py-2.5 text-slate-100 placeholder:text-slate-500"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="flex-shrink-0 text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <Smile size={20} />
        </Button>

        <Button
          type="submit"
          size="icon"
          className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
          disabled={!input.trim() || isLoading}
        >
          {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={18} />}
        </Button>
      </div>
    </form>
  )
}

