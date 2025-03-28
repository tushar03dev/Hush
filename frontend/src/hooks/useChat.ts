"use client"

import type React from "react"

import { useState, type FormEvent, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"

export type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!input.trim()) return

      // Add user message
      const userMessage: Message = {
        id: uuidv4(),
        role: "user",
        content: input,
      }

      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      try {
        // In a real app, this would be an API call to your backend
        // For this example, we'll simulate a response after a delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Simulate AI response
        const aiResponses: { [key: string]: string } = {
          hello: "Hello! How can I help you today?",
          hi: "Hi there! What can I do for you?",
          "how are you": "I'm just a program, but I'm functioning well! How can I assist you?",
          help: "I'd be happy to help! What do you need assistance with?",
          features:
            "ChatSphere offers real-time messaging, end-to-end encryption, group chats, and cross-platform support!",
          bye: "Goodbye! Feel free to come back if you have more questions.",
          thanks: "You're welcome! Is there anything else you need help with?",
          "thank you": "You're welcome! Is there anything else you need help with?",
        }

        // Check if the user's message contains any of the keywords
        const lowerInput = userMessage.content.toLowerCase()
        let responseContent = "I'm here to help! Feel free to ask me anything about ChatSphere."

        for (const [keyword, response] of Object.entries(aiResponses)) {
          if (lowerInput.includes(keyword)) {
            responseContent = response
            break
          }
        }

        const assistantMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: responseContent,
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch (error) {
        console.error("Error sending message:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [input],
  )

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  }
}

