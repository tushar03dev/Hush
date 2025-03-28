"use client"

import { useState } from "react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Avatar } from "../ui/Avatar"
import { Search, Plus, Settings, LogOut, MessageSquare, Users, Star, Archive } from "lucide-react"

// Sample conversation data
const conversations = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey, are we still meeting today?",
    time: "10:42 AM",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Tech Team",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The new update is ready for testing",
    time: "Yesterday",
    unread: 0,
    online: false,
    isGroup: true,
  },
  {
    id: "3",
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the help!",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: "4",
    name: "Marketing Group",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Let's discuss the new campaign",
    time: "Monday",
    unread: 0,
    online: false,
    isGroup: true,
  },
  {
    id: "5",
    name: "Emma Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Did you see the latest designs?",
    time: "Monday",
    unread: 0,
    online: false,
  },
]

interface ChatSidebarProps {
  collapsed?: boolean
}

export default function ChatSidebar({ collapsed = false }: ChatSidebarProps) {
  const [activeTab, setActiveTab] = useState<"chats" | "groups" | "starred" | "archived">("chats")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeConversation, setActiveConversation] = useState("1")

  const filteredConversations = conversations.filter((convo) =>
    convo.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      {/* User Profile */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-slate-700">
                <img src="/placeholder.svg?height=40&width=40" alt="User" />
                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white">ME</div>
              </Avatar>
              <div>
                <h3 className="font-medium text-white">Your Name</h3>
                <p className="text-xs text-slate-400">Online</p>
              </div>
            </div>
          )}
          {collapsed && (
            <Avatar className="h-10 w-10 mx-auto border border-slate-700">
              <img src="/placeholder.svg?height=40&width=40" alt="User" />
              <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white">ME</div>
            </Avatar>
          )}
          {!collapsed && (
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Settings size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <LogOut size={20} />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="p-4 border-b border-slate-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <Input
              placeholder="Search conversations..."
              className="pl-10 bg-slate-900 border-slate-700 text-slate-300 placeholder:text-slate-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className={`flex ${collapsed ? "flex-col items-center py-4 gap-4" : "px-4 pt-4 gap-2"}`}>
        {!collapsed ? (
          <>
            <Button
              variant={activeTab === "chats" ? "default" : "ghost"}
              className={`flex-1 ${activeTab === "chats" ? "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600" : "hover:bg-slate-800"}`}
              onClick={() => setActiveTab("chats")}
            >
              <MessageSquare size={16} className="mr-2" />
              Chats
            </Button>
            <Button
              variant={activeTab === "groups" ? "default" : "ghost"}
              className={`flex-1 ${activeTab === "groups" ? "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600" : "hover:bg-slate-800"}`}
              onClick={() => setActiveTab("groups")}
            >
              <Users size={16} className="mr-2" />
              Groups
            </Button>
            <Button
              variant={activeTab === "starred" ? "default" : "ghost"}
              className={`flex-1 ${activeTab === "starred" ? "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600" : "hover:bg-slate-800"}`}
              onClick={() => setActiveTab("starred")}
            >
              <Star size={16} className="mr-2" />
              Starred
            </Button>
          </>
        ) : (
          <>
            <Button
              variant={activeTab === "chats" ? "default" : "ghost"}
              size="icon"
              className={
                activeTab === "chats"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                  : "hover:bg-slate-800"
              }
              onClick={() => setActiveTab("chats")}
            >
              <MessageSquare size={18} />
            </Button>
            <Button
              variant={activeTab === "groups" ? "default" : "ghost"}
              size="icon"
              className={
                activeTab === "groups"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                  : "hover:bg-slate-800"
              }
              onClick={() => setActiveTab("groups")}
            >
              <Users size={18} />
            </Button>
            <Button
              variant={activeTab === "starred" ? "default" : "ghost"}
              size="icon"
              className={
                activeTab === "starred"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                  : "hover:bg-slate-800"
              }
              onClick={() => setActiveTab("starred")}
            >
              <Star size={18} />
            </Button>
            <Button
              variant={activeTab === "archived" ? "default" : "ghost"}
              size="icon"
              className={
                activeTab === "archived"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                  : "hover:bg-slate-800"
              }
              onClick={() => setActiveTab("archived")}
            >
              <Archive size={18} />
            </Button>
          </>
        )}
        {!collapsed && (
          <Button
            variant={activeTab === "archived" ? "default" : "ghost"}
            className={`flex-1 ${activeTab === "archived" ? "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600" : "hover:bg-slate-800"}`}
            onClick={() => setActiveTab("archived")}
          >
            <Archive size={16} className="mr-2" />
            Archived
          </Button>
        )}
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto py-2">
        {!collapsed
          ? filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 mx-2 rounded-lg cursor-pointer transition-colors ${
                  activeConversation === conversation.id ? "bg-slate-800" : "hover:bg-slate-800/50"
                }`}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border border-slate-700">
                      <img src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                      <div
                        className={`${
                          conversation.isGroup ? "bg-blue-500" : "bg-gradient-to-r from-purple-500 to-cyan-500"
                        } text-white`}
                      >
                        {conversation.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </Avatar>
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-950"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-white truncate">{conversation.name}</h3>
                      <span className="text-xs text-slate-400">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-slate-400 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                      <span className="text-xs text-white">{conversation.unread}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          : filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`py-3 flex justify-center cursor-pointer transition-colors ${
                  activeConversation === conversation.id ? "bg-slate-800" : "hover:bg-slate-800/50"
                }`}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10 border border-slate-700">
                    <img src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                    <div
                      className={`${
                        conversation.isGroup ? "bg-blue-500" : "bg-gradient-to-r from-purple-500 to-cyan-500"
                      } text-white`}
                    >
                      {conversation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </Avatar>
                  {conversation.online && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-slate-950"></span>
                  )}
                  {conversation.unread > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-[10px] text-white">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
      </div>

      {/* New Chat Button */}
      <div className="p-4 border-t border-slate-800">
        <Button
          className={`w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 ${
            collapsed ? "px-0 justify-center" : ""
          }`}
        >
          <Plus size={20} className={collapsed ? "" : "mr-2"} />
          {!collapsed && "New Chat"}
        </Button>
      </div>
    </div>
  )
}

