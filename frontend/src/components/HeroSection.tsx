"use client"

import { useRef, useEffect } from "react"
import { Button } from "./ui/Button"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import type * as THREE from "three"

interface HeroSectionProps {
  navigateTo: (page: "landing" | "chat") => void
}

function ChatBubble({ position, color, scale = 1, children }: any) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
      mesh.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.8]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
        {children}
      </mesh>
      <mesh position={[position[0], position[1] - 0.8 * scale, position[2]]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.3 * scale, 0.6 * scale, 32]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  )
}

function ChatScene() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 8)
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <ChatBubble position={[-2.5, 0.5, 0]} color="#9333ea" scale={1.2} />
      <ChatBubble position={[2.5, -0.5, -1]} color="#06b6d4" scale={1} />
      <ChatBubble position={[0, 1.5, -2]} color="#3b82f6" scale={0.8} />
      <ChatBubble position={[-1.5, -1.2, -1]} color="#ec4899" scale={0.9} />
      <ChatBubble position={[1.8, 1.2, -3]} color="#10b981" scale={0.7} />
      <Environment preset="city" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

export default function HeroSection({ navigateTo }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen pt-20 flex items-center">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <ChatScene />
        </Canvas>
      </div>
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500 text-transparent bg-clip-text">
            Connect in a Whole New Dimension
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8">
            Experience chat like never before with immersive 3D interactions and real-time messaging.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white text-lg py-6 px-8"
              onClick={() => navigateTo("chat")}
            >
              Get Started
            </Button>
            <Button variant="outline" className="border-slate-500 text-white hover:bg-slate-800 text-lg py-6 px-8">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="animate-bounce bg-white/10 p-2 rounded-full">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

