"use client"

import { useState } from "react"
import { Avatar } from "../ui/Avatar"
import { formatDistanceToNow } from "date-fns"
import type { Message } from "../../hooks/useChat"

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  // If no messages yet, show welcome message
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Welcome to ChatSphere!</h3>
        <p className="text-slate-400 text-center max-w-md">
          Start a conversation with our AI assistant or select a contact from the sidebar to chat.
        </p>
      </div>
    )
  }

  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {}

  messages.forEach((message) => {
    const date = new Date()
    const dateKey = date.toDateString()

    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = []
    }

    groupedMessages[dateKey].push(message)
  })

  return (
    <div className="space-y-6">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date}>
          <div className="flex justify-center mb-4">
            <div className="px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-400">
              {date === new Date().toDateString() ? "Today" : date}
            </div>
          </div>

          <div className="space-y-4">
            {dateMessages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function MessageItem({ message }: { message: Message }) {
  const [showActions, setShowActions] = useState(false)
  const isUser = message.role === "user"
  const timestamp = new Date()

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`flex gap-3 max-w-[80%] ${isUser ? "flex-row-reverse" : ""}`}>
        {!isUser && (
          <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
            <div className="bg-blue-600 text-white">AI</div>
          </Avatar>
        )}

        {isUser && (
          <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
            <img src="/placeholder.svg?height=32&width=32" alt="You" />
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white">ME</div>
          </Avatar>
        )}

        <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
          <div
            className={`rounded-2xl px-4 py-2.5 ${
              isUser ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white" : "bg-slate-800 text-slate-100"
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>

          <div className="flex items-center mt-1 text-xs text-slate-500">
            <span>{formatDistanceToNow(timestamp, { addSuffix: true })}</span>

            {showActions && (
              <div className={`flex gap-2 ml-2 ${isUser ? "mr-2" : "ml-2"}`}>
                <button className="hover:text-slate-300">Reply</button>
                <button className="hover:text-slate-300">Forward</button>
                <button className="hover:text-slate-300">Copy</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

