import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FRAME_COUNT, FRAMES_BASE_PATH, FRAMES_EXT } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

export default function ImageScrollSequence() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef({ frame: 0 })

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = framesRef.current[index]
    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const dpr = window.devicePixelRatio || 1
    const displayW = canvas.width / dpr
    const displayH = canvas.height / dpr

    // Contain + center
    const scale = Math.min(displayW / img.naturalWidth, displayH / img.naturalHeight)
    const w = img.naturalWidth * scale
    const h = img.naturalHeight * scale
    const x = (displayW - w) / 2
    const y = (displayH - h) / 2

    ctx.save()
    ctx.scale(dpr, dpr)
    ctx.drawImage(img, x, y, w, h)
    ctx.restore()
  }, [])

  useEffect(() => {
    const frames: HTMLImageElement[] = []
    let loadedCount = 0

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = `${FRAMES_BASE_PATH}${i}${FRAMES_EXT}`
      img.onload = () => {
        loadedCount++
        if (loadedCount === 1) renderFrame(0) // show first frame immediately
      }
      frames.push(img)
    }
    framesRef.current = frames

    const resizeCanvas = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      renderFrame(currentFrameRef.current.frame)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(self.progress * FRAME_COUNT)
        )
        if (frameIndex !== currentFrameRef.current.frame) {
          currentFrameRef.current.frame = frameIndex
          renderFrame(frameIndex)
        }
      },
    })

    return () => {
      trigger.kill()
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [renderFrame])

  // scroll height: 300vh total (enough to feel cinematic across 6 frames)
  return (
    <div ref={sectionRef} style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Radial glow behind model */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 75% at 50% 55%, rgba(83,17,143,0.22) 0%, rgba(147,61,201,0.06) 40%, transparent 70%)',
          }}
        />

        {/* Canvas fills viewport, portrait image is centered inside */}
        <canvas
          ref={canvasRef}
          className="relative z-10 w-full h-full"
          style={{ imageRendering: 'auto' }}
        />

        {/* Corner brackets — top left */}
        <div className="absolute top-8 left-8 z-20 pointer-events-none">
          <div className="w-8 h-8" style={{ borderTop: '1px solid rgba(147,61,201,0.5)', borderLeft: '1px solid rgba(147,61,201,0.5)' }} />
        </div>
        {/* Corner brackets — top right */}
        <div className="absolute top-8 right-8 z-20 pointer-events-none">
          <div className="w-8 h-8" style={{ borderTop: '1px solid rgba(147,61,201,0.5)', borderRight: '1px solid rgba(147,61,201,0.5)' }} />
        </div>
        {/* Corner brackets — bottom left */}
        <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
          <div className="w-8 h-8" style={{ borderBottom: '1px solid rgba(147,61,201,0.5)', borderLeft: '1px solid rgba(147,61,201,0.5)' }} />
        </div>
        {/* Corner brackets — bottom right */}
        <div className="absolute bottom-8 right-8 z-20 pointer-events-none">
          <div className="w-8 h-8" style={{ borderBottom: '1px solid rgba(147,61,201,0.5)', borderRight: '1px solid rgba(147,61,201,0.5)' }} />
        </div>

        {/* Frame counter HUD */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <p
            style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '11px',
              fontWeight: 700,
              color: 'rgba(147,61,201,0.5)',
              letterSpacing: '0.3em',
            }}
          >
            XROSIAN_MODEL_v1
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2">
          <div
            className="w-px h-10"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(147,61,201,0.6))' }}
          />
          <p
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.4em',
              color: 'rgba(147,61,201,0.5)',
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </p>
        </div>
      </div>
    </div>
  )
}
