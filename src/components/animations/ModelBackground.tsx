import { useEffect, useRef } from 'react'
import { FRAME_COUNT, FRAMES_BASE_PATH, FRAMES_EXT } from '@/lib/constants'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { setActiveFrame } from '@/hooks/uiSlice'

const SECTION_NAMES: Record<number, string> = {
  1: 'hero', 2: 'about', 3: 'experience', 4: 'skills', 5: 'projects', 6: 'contact',
}

// Preload all frames up front so swaps are instant
const preloadedFrames: HTMLImageElement[] = []
for (let i = 1; i <= FRAME_COUNT; i++) {
  const img = new Image()
  img.src = `${FRAMES_BASE_PATH}${i}${FRAMES_EXT}`
  preloadedFrames.push(img)
}

export default function ModelBackground() {
  const imgRef      = useRef<HTMLImageElement>(null)
  const currentFrame = useRef(-1)
  const rafPending   = useRef(false)
  const dispatch     = useAppDispatch()

  useEffect(() => {
    const setFrame = (index: number) => {
      if (index === currentFrame.current) return
      currentFrame.current = index
      if (imgRef.current)
        imgRef.current.src = `${FRAMES_BASE_PATH}${index}${FRAMES_EXT}`
      dispatch(setActiveFrame({ frame: index, section: SECTION_NAMES[index] ?? 'hero' }))
    }

    const onScroll = () => {
      if (rafPending.current) return
      rafPending.current = true
      requestAnimationFrame(() => {
        rafPending.current = false
        const max      = document.documentElement.scrollHeight - window.innerHeight
        const progress = max > 0 ? window.scrollY / max : 0
        // Map 0–100% scroll → frames 1–6
        const index    = Math.min(FRAME_COUNT, Math.max(1, Math.ceil(progress * FRAME_COUNT) || 1))
        setFrame(index)
      })
    }

    // Set initial frame
    setFrame(1)

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dispatch])

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
      {/* Single image slot — instant swap, no crossfade */}
      <img ref={imgRef} alt="" style={imgStyle} />

      {/* Purple halo — centered behind the model */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 40% 70% at 50% 50%, rgba(83,17,143,0.35) 0%, rgba(147,61,201,0.08) 45%, transparent 70%)',
      }} />

      {/* Edge vignette */}
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
