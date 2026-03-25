import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setHeroCta } from '@/hooks/uiSlice'

export default function HeroSection() {
  const lineRef  = useRef<HTMLDivElement>(null)
  const roleRef  = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef   = useRef<HTMLParagraphElement>(null)
  const ctaRef   = useRef<HTMLDivElement>(null)

  const dispatch  = useAppDispatch()
  const heroCta   = useAppSelector(s => s.ui.heroCta)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 })
    tl.fromTo(lineRef.current,  { scaleX: 0 },                  { scaleX: 1, duration: 0.8, ease: 'power2.inOut' })
      .fromTo(roleRef.current,  { opacity: 0, y: 10 },           { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')
      .fromTo(titleRef.current, { opacity: 0, y: 70, skewY: 4 }, { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: 'power4.out' }, '-=0.2')
      .fromTo(subRef.current,   { opacity: 0, y: 20 },           { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo(ctaRef.current,   { opacity: 0, y: 20 },           { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
  }, [])

  // ── Derived hover styles from Redux state ──────────────────
  const viewWorkStyle = {
    boxShadow: heroCta === 'view-work'
      ? '0 0 50px rgba(147,61,201,0.7)'
      : '0 0 30px rgba(147,61,201,0.4)',
    transform: heroCta === 'view-work' ? 'translateY(-2px)' : 'translateY(0)',
  }

  const githubStyle = {
    borderColor: heroCta === 'github'
      ? 'rgba(147,61,201,0.5)'
      : 'rgba(251,250,238,0.12)',
    color: heroCta === 'github'
      ? '#FBFAEE'
      : 'rgba(251,250,238,0.6)',
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col"
      style={{ paddingTop: 'calc(15vh + 70px)' }}
    >
      {/* Glass veil — dark left → transparent right, model stays crisp */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `linear-gradient(
          100deg,
          rgba(2,1,6,0.58)  0%,
          rgba(2,1,6,0.40) 28%,
          rgba(2,1,6,0.18) 50%,
          rgba(2,1,6,0.04) 65%,
          transparent       78%
        )`,
      }} />

      {/* Left edge separator */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, top: '10%', bottom: '10%',
        width: '1px', pointerEvents: 'none', zIndex: 1,
        background: 'linear-gradient(180deg, transparent, rgba(147,61,201,0.25) 30%, rgba(147,61,201,0.25) 70%, transparent)',
      }} />

      {/* ── Typography block ────────────────────────────────── */}
      <div
        className="w-full xl:w-300 2xl:w-350 mx-auto px-6 lg:px-16"
        style={{ position: 'relative', zIndex: 2 }}
      >
        <div className="max-w-xl">

          {/* Accent line */}
          <div ref={lineRef} className="mb-6 origin-left"
            style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, #933DC9, transparent)' }} />

          {/* Role */}
          <p ref={roleRef} style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '12px',
            letterSpacing: '0.5em', color: '#933DC9', textTransform: 'uppercase', marginBottom: '16px',
          }}>
            Full Stack DevOps Engineer
          </p>

          {/* Name */}
          <h1 ref={titleRef} style={{
            fontFamily: 'Orbitron, monospace', fontWeight: 900,
            fontSize: 'clamp(3.5rem, 10vw, 8.5rem)',
            lineHeight: 0.92, letterSpacing: '-0.02em', color: '#FBFAEE', margin: 0,
          }}>
            SHAD<br />
            <span style={{ color: '#933DC9', textShadow: '0 0 60px rgba(147,61,201,0.6), 0 0 120px rgba(147,61,201,0.2)' }}>
              HASSAN
            </span>
          </h1>

          {/* Alias */}
          <p ref={subRef} style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 500, fontSize: '13px',
            letterSpacing: '0.35em', color: 'rgba(251,250,238,0.3)',
            textTransform: 'uppercase', marginTop: '20px',
          }}>
            <span style={{ color: 'rgba(147,61,201,0.6)' }}>// </span>
            xrosian
            <span style={{ color: 'rgba(147,61,201,0.6)' }}> //</span>
          </p>

          {/* Summary */}
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '15px',
            color: 'rgba(251,250,238,0.5)', lineHeight: 1.7,
            marginTop: '28px', maxWidth: '440px',
          }}>
            Building scalable systems, modern interfaces, and DevOps workflows
            that survive the real world.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 items-center" style={{ marginTop: '40px' }}>
            <a
              href="#projects"
              onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              onMouseEnter={() => dispatch(setHeroCta('view-work'))}
              onMouseLeave={() => dispatch(setHeroCta(null))}
              style={{
                fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '12px',
                letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none',
                background: 'linear-gradient(135deg, #933DC9, #53118F)',
                color: '#FBFAEE', padding: '14px 32px', borderRadius: '10px',
                display: 'inline-block',
                transition: 'box-shadow 0.3s, transform 0.3s',
                ...viewWorkStyle,
              }}
            >
              View Work
            </a>

            <a
              href="https://github.com/Shad-hassan"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => dispatch(setHeroCta('github'))}
              onMouseLeave={() => dispatch(setHeroCta(null))}
              style={{
                fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '12px',
                letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none',
                padding: '14px 32px', borderRadius: '10px',
                display: 'inline-block',
                transition: 'border-color 0.3s, color 0.3s',
                border: `1px solid ${githubStyle.borderColor}`,
                color: githubStyle.color,
              }}
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-6 lg:left-16 flex flex-col items-center gap-3" style={{ opacity: 0.4 }}>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(180deg, #933DC9, transparent)' }} />
          <p style={{
            fontFamily: 'Rajdhani, sans-serif', fontSize: '10px', fontWeight: 600,
            letterSpacing: '0.4em', color: '#933DC9', writingMode: 'vertical-rl', textTransform: 'uppercase',
          }}>
            scroll
          </p>
        </div>
      </div>
    </section>
  )
}