import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    gsap.fromTo(cardRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 80%', once: true } }
    )
  }, [])

  return (
    <section id="contact" style={{ padding: '120px 0 80px', maxWidth: '1280px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>

      <div ref={cardRef} style={{
        background: 'rgba(10,10,10,0.85)',
        border: '1px solid rgba(147,61,201,0.2)', borderRadius: '24px',
        padding: 'clamp(48px, 8vw, 80px)',
        backdropFilter: 'blur(24px)',
        position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(147,61,201,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(147,61,201,0.04) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />

        {/* Purple radial glow center */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(83,17,143,0.25) 0%, transparent 70%)',
        }} />

        {/* Corner brackets */}
        {[
          { top: 20, left: 20 },
          { top: 20, right: 20 },
          { bottom: 20, left: 20 },
          { bottom: 20, right: 20 },
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute', width: '24px', height: '24px',
            borderTop: i < 2 ? '1px solid rgba(147,61,201,0.4)' : 'none',
            borderBottom: i >= 2 ? '1px solid rgba(147,61,201,0.4)' : 'none',
            borderLeft: i % 2 === 0 ? '1px solid rgba(147,61,201,0.4)' : 'none',
            borderRight: i % 2 === 1 ? '1px solid rgba(147,61,201,0.4)' : 'none',
            ...pos,
          }} />
        ))}

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.5em', color: '#933DC9', textTransform: 'uppercase', marginBottom: '24px' }}>
            05 // Contact
          </p>

          <h2 style={{
            fontFamily: 'Orbitron, monospace', fontWeight: 900,
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            color: '#FBFAEE', letterSpacing: '-0.02em', lineHeight: 0.95,
            marginBottom: '32px',
          }}>
            LET'S BUILD<br />
            <span style={{ color: '#933DC9', textShadow: '0 0 60px rgba(147,61,201,0.5)' }}>
              SOMETHING.
            </span>
          </h2>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(251,250,238,0.45)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 48px' }}>
            Open to full-stack and DevOps opportunities. Let's architect something extraordinary.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:shadhassan8991@gmail.com"
              style={{
                fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '0.25em',
                textTransform: 'uppercase', textDecoration: 'none',
                background: 'linear-gradient(135deg, #933DC9, #53118F)',
                color: '#FBFAEE', padding: '16px 40px', borderRadius: '12px',
                boxShadow: '0 0 30px rgba(147,61,201,0.4)',
                display: 'inline-block', transition: 'box-shadow 0.3s, transform 0.3s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 0 55px rgba(147,61,201,0.7)'; el.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 0 30px rgba(147,61,201,0.4)'; el.style.transform = 'translateY(0)' }}>
              Send Message
            </a>
            <a href="https://github.com/Shad-hassan" target="_blank" rel="noreferrer"
              style={{
                fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '13px', letterSpacing: '0.25em',
                textTransform: 'uppercase', textDecoration: 'none',
                color: 'rgba(251,250,238,0.65)', padding: '16px 40px', borderRadius: '12px',
                border: '1px solid rgba(251,250,238,0.15)',
                display: 'inline-block', transition: 'border-color 0.3s, color 0.3s, background 0.3s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#933DC9'; el.style.color = '#FBFAEE'; el.style.background = 'rgba(147,61,201,0.1)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(251,250,238,0.15)'; el.style.color = 'rgba(251,250,238,0.65)'; el.style.background = 'transparent' }}>
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '60px', paddingTop: '28px', borderTop: '1px solid rgba(147,61,201,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: '14px', color: 'rgba(251,250,238,0.2)', letterSpacing: '0.1em' }}>
          XRO<span style={{ color: '#933DC9' }}>SIAN</span>
        </p>
        <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '12px', color: 'rgba(251,250,238,0.15)', letterSpacing: '0.08em' }}>
          © 2025 Shad Hassan. Crafted with precision.
        </p>
      </div>
    </section>
  )
}
