"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "../hooks/useChat"
import ChatSidebar from "../components/chat/ChatSidebar"
import ChatHeader from "../components/chat/ChatHeader"
import MessageList from "../components/chat/MessageList"
import MessageInput from "../components/chat/MessageInput"
import BackToHome from "../components/chat/BackToHome"
import { useMobile } from "../hooks/useMobile"

interface ChatPageProps {
  navigateTo: (page: "landing" | "chat") => void
}

export default function ChatPage({ navigateTo }: ChatPageProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Auto-close sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isMobile])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <>
      <BackToHome navigateTo={navigateTo} />
      <div className="flex h-screen bg-slate-900 text-slate-100">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out bg-slate-950 border-r border-slate-800 md:relative ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
          }`}
        >
          <ChatSidebar collapsed={!sidebarOpen && !isMobile} />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col w-full md:w-auto">
          {/* Chat Header */}
          <ChatHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="max-w-3xl mx-auto">
              <MessageList messages={messages} />
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-slate-800 bg-slate-950">
            <div className="max-w-3xl mx-auto">
              <MessageInput
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

