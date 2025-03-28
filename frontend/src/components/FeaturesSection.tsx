"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { MessageSquare, Shield, Zap, Globe, Smartphone, Users } from "lucide-react"

const features = [
  {
    icon: <MessageSquare className="h-10 w-10 text-purple-500" />,
    title: "Real-time Messaging",
    description: "Send and receive messages instantly with our lightning-fast infrastructure.",
  },
  {
    icon: <Shield className="h-10 w-10 text-cyan-500" />,
    title: "End-to-End Encryption",
    description: "Your conversations are secure with military-grade encryption technology.",
  },
  {
    icon: <Zap className="h-10 w-10 text-blue-500" />,
    title: "Blazing Fast Performance",
    description: "Optimized for speed and reliability, even on slower connections.",
  },
  {
    icon: <Globe className="h-10 w-10 text-green-500" />,
    title: "Global Reach",
    description: "Connect with anyone, anywhere in the world with minimal latency.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-pink-500" />,
    title: "Cross-Platform",
    description: "Available on web, iOS, Android, and desktop for seamless communication.",
  },
  {
    icon: <Users className="h-10 w-10 text-yellow-500" />,
    title: "Group Chats",
    description: "Create group conversations with unlimited participants and features.",
  },
]

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(50px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="h-full bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors rounded-lg">
        <div className="p-6">
          <div className="mb-4">{feature.icon}</div>
          <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
          <p className="text-slate-400">{feature.description}</p>
        </div>
      </div>
    </div>
  )
}

export default function FeaturesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section id="features" className="py-20 relative z-10">
      <div ref={sectionRef} className="container mx-auto px-4">
        <div
          className="text-center mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
          }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Discover what makes our chat app stand out from the rest
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

