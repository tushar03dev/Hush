"use client"

import { Button } from "../ui/Button"
import { Avatar } from "../ui/Avatar"
import { Menu, Phone, Video, MoreVertical, Search } from "lucide-react"

interface ChatHeaderProps {
  toggleSidebar: () => void
  sidebarOpen: boolean
}

export default function ChatHeader({ toggleSidebar }: ChatHeaderProps) {
  return (
    <div className="h-16 border-b border-slate-800 bg-slate-950 flex items-center px-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden text-slate-400 hover:text-white"
        >
          <Menu size={24} />
        </Button>

        <Avatar className="h-10 w-10 border border-slate-700">
          <img src="/placeholder.svg?height=40&width=40" alt="Sarah Johnson" />
          <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white">SJ</div>
        </Avatar>

        <div>
          <h3 className="font-medium text-white">Sarah Johnson</h3>
          <p className="text-xs text-green-500">Online</p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
          <Search size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
          <Phone size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
          <Video size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
          <MoreVertical size={20} />
        </Button>
      </div>
    </div>
  )
}

