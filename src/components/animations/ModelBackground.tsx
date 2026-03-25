import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FRAME_COUNT, FRAMES_BASE_PATH, FRAMES_EXT } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

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
    const outgoing  = activeSlot.current === 'a' ? imgARef.current : imgBRef.current
    if (!incoming || !outgoing) return

    incoming.src = `${FRAMES_BASE_PATH}${frameIndex + 1}${FRAMES_EXT}`
    gsap.set(incoming, { opacity: 0, zIndex: 2 })
    gsap.set(outgoing,  { zIndex: 1 })

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

    if (imgARef.current) {
      imgARef.current.src = `${FRAMES_BASE_PATH}1${FRAMES_EXT}`
      gsap.set(imgARef.current, { opacity: 1, zIndex: 1 })
    }
    if (imgBRef.current) {
      gsap.set(imgBRef.current, { opacity: 0, zIndex: 0 })
    }

    const triggers: ScrollTrigger[] = []
    Object.entries(SECTION_FRAME_MAP).forEach(([id, frameIndex]) => {
      const el = document.getElementById(id)
      if (!el) return
      triggers.push(ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        onEnter:     () => crossfadeTo(frameIndex),
        onEnterBack: () => crossfadeTo(frameIndex),
      }))
    })

    return () => triggers.forEach(t => t.kill())
  }, [])

  // 82vh height + nudge down by half the navbar (52px) so the breathing room
  // above and below the figure feels visually even despite the fixed nav.
  const imgStyle: React.CSSProperties = {
    position:  'absolute',
    top:       '50%',
    left:      '50%',
    transform: 'translate(-50%, calc(-50% + 26px))',
    height:    '82vh',
    width:     'auto',
    maxWidth:  'none',
    objectFit: 'contain',
    userSelect: 'none',
    pointerEvents: 'none',
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Base */}
      <div className="absolute inset-0" style={{ background: '#000' }} />

      {/* Model images — centered in viewport */}
      <img ref={imgARef} alt="" style={imgStyle} />
      <img ref={imgBRef} alt="" style={imgStyle} />

      {/* Purple halo — centered behind the model */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 40% 70% at 50% 50%, rgba(83,17,143,0.35) 0%, rgba(147,61,201,0.08) 45%, transparent 70%)',
      }} />

      {/* Edge vignette — darkens all four sides so content is readable */}
      <div className="absolute inset-0" style={{
        background: `
          linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 18%, transparent 78%, rgba(0,0,0,0.9) 100%),
          linear-gradient(to right,  rgba(0,0,0,0.8) 0%, transparent 28%, transparent 72%, rgba(0,0,0,0.8) 100%)
        `,
      }} />

      {/* Subtle purple grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(147,61,201,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(147,61,201,0.025) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />
    </div>
  )
}
