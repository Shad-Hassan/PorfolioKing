import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FRAME_COUNT, FRAMES_BASE_PATH, FRAMES_EXT } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

// Each section id maps to a frame index (0-based)
const SECTION_FRAME_MAP: Record<string, number> = {
  hero:       0,
  about:      1,
  experience: 2,
  skills:     3,
  projects:   4,
  contact:    5,
}

export default function ModelBackground() {
  const imgARef = useRef<HTMLImageElement>(null)
  const imgBRef = useRef<HTMLImageElement>(null)
  const activeSlot = useRef<'a' | 'b'>('a')
  const currentFrame = useRef(0)

  const crossfadeTo = (frameIndex: number) => {
    if (frameIndex === currentFrame.current) return
    if (frameIndex < 0 || frameIndex >= FRAME_COUNT) return

    const incoming = activeSlot.current === 'a' ? imgBRef.current : imgARef.current
    const outgoing = activeSlot.current === 'a' ? imgARef.current : imgBRef.current
    if (!incoming || !outgoing) return

    incoming.src = `${FRAMES_BASE_PATH}${frameIndex + 1}${FRAMES_EXT}`
    gsap.set(incoming, { opacity: 0, zIndex: 2 })
    gsap.set(outgoing, { zIndex: 1 })

    gsap.to(incoming, {
      opacity: 1,
      duration: 0.7,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(outgoing, { opacity: 0 })
        activeSlot.current = activeSlot.current === 'a' ? 'b' : 'a'
        currentFrame.current = frameIndex
      },
    })
  }

  useEffect(() => {
    // Preload all frames
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = `${FRAMES_BASE_PATH}${i}${FRAMES_EXT}`
    }

    // Set initial frame
    if (imgARef.current) {
      imgARef.current.src = `${FRAMES_BASE_PATH}1${FRAMES_EXT}`
      gsap.set(imgARef.current, { opacity: 1, zIndex: 1 })
    }
    if (imgBRef.current) {
      gsap.set(imgBRef.current, { opacity: 0, zIndex: 0 })
    }

    // Wire sections to frames via ScrollTrigger
    const triggers: ScrollTrigger[] = []

    Object.entries(SECTION_FRAME_MAP).forEach(([id, frameIndex]) => {
      const el = document.getElementById(id)
      if (!el) return
      const t = ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        onEnter: () => crossfadeTo(frameIndex),
        onEnterBack: () => crossfadeTo(frameIndex),
      })
      triggers.push(t)
    })

    return () => triggers.forEach(t => t.kill())
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Dark base */}
      <div className="absolute inset-0" style={{ background: '#000' }} />

      {/* Model images — portrait, right-anchored */}
      {[imgARef, imgBRef].map((ref, i) => (
        <img
          key={i}
          ref={ref}
          alt=""
          className="absolute"
          style={{
            bottom: 0,
            right: 0,
            height: '100vh',
            width: 'auto',
            maxWidth: '55vw',
            objectFit: 'contain',
            objectPosition: 'bottom right',
            userSelect: 'none',
          }}
        />
      ))}

      {/* Left vignette — lets text sit on solid black */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, #000000 35%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.1) 80%, transparent 100%)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{ background: 'linear-gradient(0deg, #000 0%, transparent 100%)' }}
      />

      {/* Purple rim behind model */}
      <div
        className="absolute bottom-0 right-0"
        style={{
          width: '50vw',
          height: '80vh',
          background: 'radial-gradient(ellipse 60% 70% at 80% 90%, rgba(83,17,143,0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(147,61,201,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(147,61,201,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}
