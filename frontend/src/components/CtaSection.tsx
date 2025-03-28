"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Button } from "./ui/Button"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"

interface CtaSectionProps {
  navigateTo: (page: "landing" | "chat") => void
}

function FloatingDevice() {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh scale={[2, 3.5, 0.2]} position={[0, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh scale={[1.8, 3.2, 0.1]} position={[0, 0, 0.16]}>
        <boxGeometry />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} toneMapped={false} />
      </mesh>
      <mesh scale={[0.5, 0.5, 0.1]} position={[0, -1.7, 0.3]}>
        <cylinderGeometry />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <FloatingDevice />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
    </>
  )
}

export default function CtaSection({ navigateTo }: CtaSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-20 relative z-10">
      <div
        ref={ref}
        className="container mx-auto px-4"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(50px)",
          transition: "all 0.7s ease-out",
        }}
      >
        <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text">
                Ready to Transform Your Communication?
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Join thousands of users who have already upgraded their messaging experience. Start for free and
                discover the future of chat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white text-lg py-6"
                  onClick={() => navigateTo("chat")}
                >
                  Get Started Free
                </Button>
                <Button variant="outline" className="border-slate-500 text-white hover:bg-slate-800 text-lg py-6">
                  Schedule a Demo
                </Button>
              </div>
            </div>
            <div className="h-[400px] lg:h-auto relative">
              <Canvas>
                <Scene />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

