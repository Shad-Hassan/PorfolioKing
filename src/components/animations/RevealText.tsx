import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealTextProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
  triggerOnScroll?: boolean
}

export default function RevealText({
  children,
  className = '',
  style,
  delay = 0,
  triggerOnScroll = true,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (triggerOnScroll) {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      )
    } else {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay }
      )
    }
  }, [delay, triggerOnScroll])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
