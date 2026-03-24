import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NAV_LINKS } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = ['hero', 'about', 'experience', 'skills', 'projects', 'contact']

export default function Navbar() {
  const pillRef        = useRef<HTMLDivElement>(null)
  const indicatorRef   = useRef<HTMLDivElement>(null)
  const progressRef    = useRef<HTMLDivElement>(null)
  const menuRef        = useRef<HTMLDivElement>(null)
  const menuLinksRef   = useRef<HTMLDivElement>(null)
  const logoLettersRef = useRef<HTMLSpanElement[]>([])
  const linkEls        = useRef<Map<string, HTMLAnchorElement>>(new Map())

  const [scrolled,    setScrolled]    = useState(false)
  const [active,      setActive]      = useState('hero')
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [indicatorReady, setIndicatorReady] = useState(false)

  // ── Scroll progress bar ───────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0
      if (progressRef.current) progressRef.current.style.width = `${pct}%`
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Active section via ScrollTrigger ─────────────────────
  useEffect(() => {
    const triggers = SECTIONS.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      return ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: () => setActive(id),
        onEnterBack: () => setActive(id),
      })
    }).filter(Boolean)
    return () => triggers.forEach(t => t?.kill())
  }, [])

  // ── Slide indicator to active link ───────────────────────
  const slideIndicator = useCallback((sectionId: string) => {
    const pill      = pillRef.current
    const indicator = indicatorRef.current
    const linkEl    = linkEls.current.get(sectionId)
    if (!pill || !indicator || !linkEl) return

    const pillRect = pill.getBoundingClientRect()
    const linkRect = linkEl.getBoundingClientRect()

    gsap.to(indicator, {
      x:       linkRect.left - pillRect.left - 6,
      width:   linkRect.width + 12,
      opacity: 1,
      duration: 0.45,
      ease: 'power3.out',
    })
    setIndicatorReady(true)
  }, [])

  useEffect(() => {
    // Small delay so DOM has settled after scroll
    const raf = requestAnimationFrame(() => slideIndicator(active))
    return () => cancelAnimationFrame(raf)
  }, [active, scrolled, slideIndicator])

  // ── Pill entrance ─────────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(pillRef.current,
      { y: -64, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.6 }
    )
  }, [])

  // ── Logo letter stagger hover ─────────────────────────────
  const onLogoEnter = () => {
    gsap.fromTo(logoLettersRef.current,
      { y: 0, color: '#FBFAEE' },
      { y: -3, color: '#933DC9', stagger: 0.04, duration: 0.25, ease: 'power2.out',
        yoyo: true, repeat: 1 }
    )
  }

  // ── Mobile menu open ──────────────────────────────────────
  const openMenu = () => {
    setMenuOpen(true)
    const links = menuLinksRef.current?.querySelectorAll('.mobile-link')
    gsap.set(menuRef.current, { display: 'flex' })
    gsap.fromTo(menuRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
    if (links) {
      gsap.fromTo(links,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      )
    }
  }

  // ── Mobile menu close ─────────────────────────────────────
  const closeMenu = () => {
    gsap.to(menuRef.current,
      { opacity: 0, duration: 0.25, ease: 'power2.in',
        onComplete: () => {
          gsap.set(menuRef.current, { display: 'none' })
          setMenuOpen(false)
        } }
    )
  }

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    if (menuOpen) closeMenu()
  }

  const logoText = ['X','R','O','S','I','A','N']

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '2px', zIndex: 100,
        background: 'linear-gradient(90deg, #53118F, #933DC9)',
        width: '0%', transition: 'width 0.05s linear',
        boxShadow: '0 0 8px rgba(147,61,201,0.8)',
      }} ref={progressRef} />

      {/* ── Desktop floating pill ── */}
      <div
        ref={pillRef}
        className="hidden md:flex"
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          alignItems: 'center',
          gap: '4px',
          padding: '6px 6px 6px 20px',
          borderRadius: '9999px',
          transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
          background: scrolled
            ? 'rgba(8, 8, 8, 0.88)'
            : 'rgba(0, 0, 0, 0)',
          border: scrolled
            ? '1px solid rgba(147,61,201,0.25)'
            : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          boxShadow: scrolled
            ? '0 4px 30px rgba(0,0,0,0.6), 0 0 0 1px rgba(147,61,201,0.06), inset 0 1px 0 rgba(255,255,255,0.04)'
            : 'none',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={e => { e.preventDefault(); scrollTo('#hero') }}
          onMouseEnter={onLogoEnter}
          style={{ textDecoration: 'none', marginRight: '8px', display: 'flex' }}
        >
          {logoText.map((char, i) => (
            <span
              key={i}
              ref={el => { if (el) logoLettersRef.current[i] = el }}
              style={{
                fontFamily: 'Orbitron, monospace',
                fontWeight: 900,
                fontSize: '13px',
                letterSpacing: '0.15em',
                color: i >= 3 ? '#933DC9' : '#FBFAEE',
                display: 'inline-block',
                transition: 'text-shadow 0.2s',
              }}
            >{char}</span>
          ))}
        </a>

        {/* Divider */}
        <div style={{ width: '1px', height: '16px', background: 'rgba(147,61,201,0.2)', margin: '0 8px', flexShrink: 0 }} />

        {/* Nav links container — indicator lives here */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '2px' }}>
          {/* Sliding active indicator */}
          <div
            ref={indicatorRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              transform: 'translateY(-50%)',
              height: '32px',
              width: '60px',
              borderRadius: '9999px',
              background: 'rgba(147,61,201,0.18)',
              border: '1px solid rgba(147,61,201,0.35)',
              opacity: indicatorReady ? 1 : 0,
              pointerEvents: 'none',
              willChange: 'transform, width',
            }}
          />

          {NAV_LINKS.map(link => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            return (
              <a
                key={link.href}
                href={link.href}
                ref={el => { if (el) linkEls.current.set(id, el) }}
                onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 600,
                  fontSize: '12px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'color 0.25s ease',
                  color: isActive ? '#FBFAEE' : 'rgba(251,250,238,0.45)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(251,250,238,0.85)'
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(251,250,238,0.45)'
                }}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '16px', background: 'rgba(147,61,201,0.2)', margin: '0 8px', flexShrink: 0 }} />

        {/* Hire Me CTA */}
        <a
          href="mailto:shadhassan8991@gmail.com"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700,
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '9px 20px',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #933DC9, #53118F)',
            color: '#FBFAEE',
            boxShadow: '0 0 16px rgba(147,61,201,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
            transition: 'box-shadow 0.3s, transform 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.boxShadow = '0 0 28px rgba(147,61,201,0.7), inset 0 1px 0 rgba(255,255,255,0.1)'
            el.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.boxShadow = '0 0 16px rgba(147,61,201,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
            el.style.transform = 'translateY(0)'
          }}
        >
          Hire Me
        </a>
      </div>

      {/* ── Mobile bar ── */}
      <div
        className="flex md:hidden"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(147,61,201,0.12)' : 'none',
          transition: 'background 0.4s, border-color 0.4s',
        }}
      >
        {/* Mobile logo */}
        <a href="#hero" onClick={e => { e.preventDefault(); scrollTo('#hero') }}
          style={{ textDecoration: 'none', fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '14px', letterSpacing: '0.15em', color: '#FBFAEE' }}>
          XRO<span style={{ color: '#933DC9' }}>SIAN</span>
        </a>

        {/* Hamburger */}
        <button
          onClick={openMenu}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}
          aria-label="Open menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block',
              height: '1.5px',
              background: '#FBFAEE',
              borderRadius: '2px',
              width: i === 1 ? '18px' : '24px',
              transition: 'width 0.2s',
            }} />
          ))}
        </button>
      </div>

      {/* ── Mobile full-screen menu overlay ── */}
      <div
        ref={menuRef}
        style={{
          display: 'none',
          position: 'fixed', inset: 0, zIndex: 60,
          background: 'rgba(0,0,0,0.97)',
          flexDirection: 'column',
          padding: '24px 28px',
          backdropFilter: 'blur(24px)',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
          <span style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '14px', letterSpacing: '0.15em', color: '#FBFAEE' }}>
            XRO<span style={{ color: '#933DC9' }}>SIAN</span>
          </span>
          <button
            onClick={closeMenu}
            style={{
              background: 'none', border: '1px solid rgba(147,61,201,0.3)',
              color: '#FBFAEE', cursor: 'pointer', borderRadius: '50%',
              width: '40px', height: '40px', fontSize: '18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Inter, sans-serif',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#933DC9'; el.style.boxShadow = '0 0 12px rgba(147,61,201,0.4)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(147,61,201,0.3)'; el.style.boxShadow = 'none' }}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Links */}
        <div ref={menuLinksRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0' }}>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-link"
              onClick={e => { e.preventDefault(); scrollTo(link.href) }}
              style={{
                fontFamily: 'Orbitron, monospace',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                color: active === link.href.replace('#','') ? '#933DC9' : 'rgba(251,250,238,0.85)',
                textDecoration: 'none',
                padding: '12px 0',
                borderBottom: i < NAV_LINKS.length - 1 ? '1px solid rgba(147,61,201,0.08)' : 'none',
                letterSpacing: '-0.02em',
                transition: 'color 0.2s, letter-spacing 0.2s',
                display: 'flex', alignItems: 'center', gap: '16px',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#933DC9'; el.style.letterSpacing = '0.02em' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = active === link.href.replace('#','') ? '#933DC9' : 'rgba(251,250,238,0.85)'; el.style.letterSpacing = '-0.02em' }}
            >
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '12px', fontWeight: 600, color: 'rgba(147,61,201,0.5)', letterSpacing: '0.2em', minWidth: '28px' }}>
                {String(i + 1).padStart(2,'0')}
              </span>
              {link.label}
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(147,61,201,0.1)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="mailto:shadhassan8991@gmail.com"
            style={{
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '12px',
              letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
              padding: '12px 28px', borderRadius: '9999px',
              background: 'linear-gradient(135deg, #933DC9, #53118F)',
              color: '#FBFAEE',
            }}>
            Hire Me
          </a>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '11px', color: 'rgba(251,250,238,0.2)', letterSpacing: '0.1em' }}>
            Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </>
  )
}
