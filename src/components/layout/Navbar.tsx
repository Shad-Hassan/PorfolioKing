import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NAV_LINKS } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = ['hero', 'about', 'experience', 'skills', 'projects', 'contact']

// ── constants ─────────────────────────────────────────────
const PILL_H        = 52   // px  — single source of truth for pill height
const PILL_PAD_X    = 6    // px  — outer side padding
const PILL_PAD_LEFT = 20   // px  — left side (logo side) padding
const LINK_PAD_X    = 14   // px  — per-link horizontal padding
const HALO_H        = 36   // px  — halo height (centred in pill)
const HALO_OVERSIZE = 10   // px  — halo wider than text on each side

export default function Navbar() {
  // ── refs ─────────────────────────────────────────────────
  const pillRef        = useRef<HTMLDivElement>(null)
  const indicatorRef   = useRef<HTMLDivElement>(null)
  const progressRef    = useRef<HTMLDivElement>(null)
  const menuRef        = useRef<HTMLDivElement>(null)
  const menuLinksRef   = useRef<HTMLDivElement>(null)
  const logoLettersRef = useRef<HTMLSpanElement[]>([])
  const linkEls        = useRef<Map<string, HTMLAnchorElement>>(new Map())
  const haloPlaced     = useRef(false)   // skip slide animation on first placement

  // ── state (only what drives JSX re-renders) ──────────────
  const [scrolled,  setScrolled]  = useState(false)
  const [active,    setActive]    = useState('hero')
  const [menuOpen,  setMenuOpen]  = useState(false)

  // ── scroll: progress bar + pill morph ────────────────────
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current)
        progressRef.current.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── active section detection ──────────────────────────────
  useEffect(() => {
    const kills = SECTIONS.flatMap(id => {
      const el = document.getElementById(id)
      if (!el) return []
      return [ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end:   'bottom 55%',
        onEnter:     () => setActive(id),
        onEnterBack: () => setActive(id),
      })]
    })
    return () => kills.forEach(t => t.kill())
  }, [])

  // ── halo slide ────────────────────────────────────────────
  const slideHalo = useCallback((sectionId: string) => {
    const pill  = pillRef.current
    const halo  = indicatorRef.current
    const link  = linkEls.current.get(sectionId)
    if (!pill || !halo || !link) return

    const pillRect = pill.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    const targetX  = linkRect.left - pillRect.left - HALO_OVERSIZE
    const targetW  = linkRect.width + HALO_OVERSIZE * 2

    if (!haloPlaced.current) {
      // First placement: jump instantly, then reveal
      gsap.set(halo, { x: targetX, width: targetW })
      gsap.to(halo, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      haloPlaced.current = true
    } else {
      gsap.to(halo, {
        x: targetX, width: targetW, opacity: 1,
        duration: 0.5, ease: 'power4.out',
      })
    }
  }, [])

  useEffect(() => {
    const id = requestAnimationFrame(() => slideHalo(active))
    return () => cancelAnimationFrame(id)
  }, [active, scrolled, slideHalo])

  // ── pill entrance ─────────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(pillRef.current,
      { y: -PILL_H, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out', delay: 0.5 }
    )
  }, [])

  // ── logo letter wave ──────────────────────────────────────
  const onLogoEnter = () => {
    gsap.fromTo(
      logoLettersRef.current,
      { y: 0 },
      { y: -4, stagger: 0.045, duration: 0.22, ease: 'power2.out', yoyo: true, repeat: 1,
        onStart() { logoLettersRef.current.slice(3).forEach(el => (el.style.color = '#FBFAEE')) },
        onComplete() { logoLettersRef.current.slice(3).forEach(el => (el.style.color = '#933DC9')) },
      }
    )
  }

  // ── mobile menu ───────────────────────────────────────────
  const openMenu = () => {
    setMenuOpen(true)
    gsap.set(menuRef.current, { display: 'flex' })
    gsap.fromTo(menuRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    const links = menuLinksRef.current?.querySelectorAll('.mobile-link')
    if (links)
      gsap.fromTo(links, { x: -70, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.065, duration: 0.5, ease: 'power3.out', delay: 0.08 })
  }

  const closeMenu = () => {
    gsap.to(menuRef.current, {
      opacity: 0, duration: 0.22, ease: 'power2.in',
      onComplete: () => { gsap.set(menuRef.current, { display: 'none' }); setMenuOpen(false) },
    })
  }

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    if (menuOpen) closeMenu()
  }

  const logoChars = ['X','R','O','S','I','A','N']

  // ── shared pill style ────────────────────────────────────
  const pillStyle: React.CSSProperties = {
    height:        `${PILL_H}px`,
    padding:       `0 ${PILL_PAD_X}px 0 ${PILL_PAD_LEFT}px`,
    borderRadius:  '9999px',
    display:       'flex',
    alignItems:    'center',
    gap:           '0',
    transition:    'background 0.4s, border-color 0.4s, box-shadow 0.4s',
    background:    scrolled ? 'rgba(8,8,8,0.9)'    : 'transparent',
    border:        scrolled ? '1px solid rgba(147,61,201,0.22)' : '1px solid transparent',
    backdropFilter: scrolled ? 'blur(28px) saturate(180%)' : 'none',
    boxShadow:     scrolled
      ? '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(147,61,201,0.05), inset 0 1px 0 rgba(255,255,255,0.04)'
      : 'none',
  }

  return (
    <>
      {/* ── scroll progress ─────────────────────────────── */}
      <div ref={progressRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 100,
        height: '2px', width: '0%',
        background: 'linear-gradient(90deg, #53118F, #933DC9, #FBFAEE)',
        boxShadow: '0 0 10px rgba(147,61,201,0.9)',
        transition: 'width 0.06s linear',
        pointerEvents: 'none',
      }} />

      {/* ── desktop pill ────────────────────────────────── */}
      <div
        ref={pillRef}
        className="hidden md:flex"
        style={{
          ...pillStyle,
          position: 'fixed',
          top: '18px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={e => { e.preventDefault(); scrollTo('#hero') }}
          onMouseEnter={onLogoEnter}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}
        >
          {logoChars.map((ch, i) => (
            <span key={i} ref={el => { if (el) logoLettersRef.current[i] = el }} style={{
              fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '13px',
              letterSpacing: '0.12em', display: 'inline-block',
              color: i >= 3 ? '#933DC9' : '#FBFAEE',
            }}>{ch}</span>
          ))}
        </a>

        {/* Divider */}
        <div style={{ width: '1px', height: '18px', background: 'rgba(147,61,201,0.18)', margin: '0 14px', flexShrink: 0 }} />

        {/* Nav links — halo is absolutely positioned inside here */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {/* Halo indicator */}
          <div
            ref={indicatorRef}
            className="nav-halo"
            style={{
              position:  'absolute',
              top:       '50%',
              left:      0,
              transform: 'translateY(-50%)',
              height:    `${HALO_H}px`,
              width:     '60px',        // GSAP overrides this
              opacity:   0,             // GSAP reveals on first placement
              pointerEvents: 'none',
              willChange: 'transform, width, opacity',
            }}
          />

          {NAV_LINKS.map(link => {
            const id       = link.href.replace('#', '')
            const isActive = active === id
            return (
              <a
                key={link.href}
                href={link.href}
                ref={el => { if (el) linkEls.current.set(id, el) }}
                onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                style={{
                  fontFamily:     'Rajdhani, sans-serif',
                  fontWeight:     600,
                  fontSize:       '12px',
                  letterSpacing:  '0.15em',
                  textTransform:  'uppercase',
                  textDecoration: 'none',
                  padding:        `0 ${LINK_PAD_X}px`,
                  height:         `${PILL_H}px`,
                  display:        'flex',
                  alignItems:     'center',
                  position:       'relative',
                  zIndex:         1,
                  whiteSpace:     'nowrap',
                  transition:     'color 0.25s',
                  color:          isActive ? '#FBFAEE' : 'rgba(251,250,238,0.4)',
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(251,250,238,0.8)' }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(251,250,238,0.4)' }}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '18px', background: 'rgba(147,61,201,0.18)', margin: '0 14px', flexShrink: 0 }} />

        {/* Hire Me */}
        <a
          href="mailto:shadhassan8991@gmail.com"
          style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '12px',
            letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
            height:        '40px',
            padding:       '0 22px',
            display:       'flex', alignItems: 'center',
            borderRadius:  '9999px',
            background:    'linear-gradient(135deg, #933DC9, #53118F)',
            color:         '#FBFAEE',
            flexShrink:    0,
            boxShadow:     '0 0 18px rgba(147,61,201,0.45), inset 0 1px 0 rgba(255,255,255,0.1)',
            transition:    'box-shadow 0.3s, transform 0.2s',
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 0 32px rgba(147,61,201,0.75), inset 0 1px 0 rgba(255,255,255,0.1)'; el.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 0 18px rgba(147,61,201,0.45), inset 0 1px 0 rgba(255,255,255,0.1)'; el.style.transform = 'translateY(0)' }}
        >
          Hire Me
        </a>
      </div>

      {/* ── mobile bar ──────────────────────────────────── */}
      <div
        className="flex md:hidden"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          height: '60px', padding: '0 20px',
          alignItems: 'center', justifyContent: 'space-between',
          background:    scrolled ? 'rgba(8,8,8,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom:  scrolled ? '1px solid rgba(147,61,201,0.1)' : 'none',
          transition: 'background 0.4s, border-color 0.4s',
        }}
      >
        <a href="#hero" onClick={e => { e.preventDefault(); scrollTo('#hero') }}
          style={{ textDecoration: 'none', fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '14px', letterSpacing: '0.12em', color: '#FBFAEE' }}>
          XRO<span style={{ color: '#933DC9' }}>SIAN</span>
        </a>
        <button onClick={openMenu} aria-label="Open menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {[24, 18, 24].map((w, i) => (
            <span key={i} style={{ display: 'block', height: '1.5px', width: `${w}px`, background: '#FBFAEE', borderRadius: '2px' }} />
          ))}
        </button>
      </div>

      {/* ── mobile overlay ──────────────────────────────── */}
      <div ref={menuRef} style={{
        display: 'none', position: 'fixed', inset: 0, zIndex: 60,
        flexDirection: 'column', padding: '0 28px 36px',
        background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(28px)',
      }}>
        {/* Top row */}
        <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '14px', letterSpacing: '0.12em', color: '#FBFAEE' }}>
            XRO<span style={{ color: '#933DC9' }}>SIAN</span>
          </span>
          <button onClick={closeMenu} aria-label="Close menu" style={{
            background: 'none', border: '1px solid rgba(147,61,201,0.3)', color: '#FBFAEE',
            cursor: 'pointer', borderRadius: '50%', width: '40px', height: '40px',
            fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#933DC9'; el.style.boxShadow = '0 0 14px rgba(147,61,201,0.4)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(147,61,201,0.3)'; el.style.boxShadow = 'none' }}
          >✕</button>
        </div>

        {/* Links */}
        <div ref={menuLinksRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {NAV_LINKS.map((link, i) => (
            <a key={link.href} href={link.href} className="mobile-link"
              onClick={e => { e.preventDefault(); scrollTo(link.href) }}
              style={{
                fontFamily: 'Orbitron, monospace', fontWeight: 900,
                fontSize: 'clamp(1.8rem, 7.5vw, 3.2rem)',
                color: active === link.href.replace('#','') ? '#933DC9' : 'rgba(251,250,238,0.8)',
                textDecoration: 'none', letterSpacing: '-0.02em',
                padding: '10px 0',
                borderBottom: i < NAV_LINKS.length - 1 ? '1px solid rgba(147,61,201,0.07)' : 'none',
                display: 'flex', alignItems: 'center', gap: '16px',
                transition: 'color 0.2s, letter-spacing 0.2s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#933DC9'; el.style.letterSpacing = '0.01em' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = active === link.href.replace('#','') ? '#933DC9' : 'rgba(251,250,238,0.8)'; el.style.letterSpacing = '-0.02em' }}
            >
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '11px', fontWeight: 600, color: 'rgba(147,61,201,0.4)', letterSpacing: '0.2em', minWidth: '26px' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {link.label}
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(147,61,201,0.08)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="mailto:shadhassan8991@gmail.com" style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '12px',
            letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
            padding: '12px 28px', borderRadius: '9999px',
            background: 'linear-gradient(135deg, #933DC9, #53118F)', color: '#FBFAEE',
          }}>Hire Me</a>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '11px', color: 'rgba(251,250,238,0.18)', letterSpacing: '0.1em' }}>
            Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </>
  )
}
