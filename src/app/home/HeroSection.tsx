import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function HeroSection() {
  const lineRef  = useRef<HTMLDivElement>(null)
  const roleRef  = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef   = useRef<HTMLParagraphElement>(null)
  const ctaRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 })
    tl.fromTo(lineRef.current,  { scaleX: 0 },                 { scaleX: 1, duration: 0.8, ease: 'power2.inOut' })
      .fromTo(roleRef.current,  { opacity: 0, y: 10 },          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')
      .fromTo(titleRef.current, { opacity: 0, y: 70, skewY: 4 },{ opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: 'power4.out' }, '-=0.2')
      .fromTo(subRef.current,   { opacity: 0, y: 20 },          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo(ctaRef.current,   { opacity: 0, y: 20 },          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center"
      style={{ paddingTop: '80px' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full">
        {/* Left half — text */}
        <div className="max-w-xl">

          {/* Accent line */}
          <div ref={lineRef} className="mb-6 origin-left"
            style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, #933DC9, transparent)' }} />

          {/* Role */}
          <p ref={roleRef}
            style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5em', color: '#933DC9', textTransform: 'uppercase', marginBottom: '16px' }}>
            Full Stack DevOps Engineer
          </p>

          {/* Name */}
          <h1 ref={titleRef}
            style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(3.5rem, 10vw, 8.5rem)', lineHeight: 0.92, letterSpacing: '-0.02em', color: '#FBFAEE', margin: 0 }}>
            SHAD<br />
            <span style={{ color: '#933DC9', textShadow: '0 0 60px rgba(147,61,201,0.6), 0 0 120px rgba(147,61,201,0.2)' }}>
              HASSAN
            </span>
          </h1>

          {/* Alias */}
          <p ref={subRef}
            style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500, fontSize: '13px', letterSpacing: '0.35em', color: 'rgba(251,250,238,0.3)', textTransform: 'uppercase', marginTop: '20px' }}>
            <span style={{ color: 'rgba(147,61,201,0.6)' }}>// </span>xrosian<span style={{ color: 'rgba(147,61,201,0.6)' }}> //</span>
          </p>

          {/* Summary */}
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(251,250,238,0.5)', lineHeight: 1.7, marginTop: '28px', maxWidth: '440px' }}>
            Building scalable systems, modern interfaces, and DevOps workflows
            that survive the real world.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 items-center" style={{ marginTop: '40px' }}>
            <a href="#projects"
              onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{
                fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.25em',
                textTransform: 'uppercase', textDecoration: 'none',
                background: 'linear-gradient(135deg, #933DC9, #53118F)',
                color: '#FBFAEE', padding: '14px 32px', borderRadius: '10px',
                boxShadow: '0 0 30px rgba(147,61,201,0.4)',
                display: 'inline-block', transition: 'box-shadow 0.3s, transform 0.3s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 0 50px rgba(147,61,201,0.7)'; el.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 0 30px rgba(147,61,201,0.4)'; el.style.transform = 'translateY(0)' }}>
              View Work
            </a>
            <a href="https://github.com/Shad-hassan" target="_blank" rel="noreferrer"
              style={{
                fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '0.25em',
                textTransform: 'uppercase', textDecoration: 'none',
                color: 'rgba(251,250,238,0.6)', padding: '14px 32px', borderRadius: '10px',
                border: '1px solid rgba(251,250,238,0.12)',
                display: 'inline-block', transition: 'border-color 0.3s, color 0.3s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(147,61,201,0.5)'; el.style.color = '#FBFAEE' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(251,250,238,0.12)'; el.style.color = 'rgba(251,250,238,0.6)' }}>
              GitHub
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-6 lg:left-16 flex flex-col items-center gap-3" style={{ opacity: 0.4 }}>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(180deg, #933DC9, transparent)' }} />
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.4em', color: '#933DC9', writingMode: 'vertical-rl', textTransform: 'uppercase' }}>
            scroll
          </p>
        </div>
      </div>
    </section>
  )
}
