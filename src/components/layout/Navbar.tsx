import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NAV_LINKS } from '@/lib/constants'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setMobileMenuLink, setMobileClose } from '@/hooks/uiSlice'
import NavStart   from './NavStart'
import NavBetween from './NavBetween'
import NavCta     from './NavCta'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = ['hero', 'about', 'experience', 'skills', 'projects', 'contact']

const PILL_H     = 64
const LINK_PAD_X = 28
const HALO_H     = 44
const HALO_PAD   = 14

export default function Navbar() {
  const pillRef      = useRef<HTMLDivElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)
  const haloRef      = useRef<HTMLDivElement>(null)
  const progressRef  = useRef<HTMLDivElement>(null)
  const menuRef      = useRef<HTMLDivElement>(null)
  const menuLinksRef = useRef<HTMLDivElement>(null)
  const letterRefs   = useRef<HTMLSpanElement[]>([])
  const linkEls      = useRef<Map<string, HTMLAnchorElement>>(new Map())
  const haloPlaced   = useRef(false)

  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  const dispatch        = useAppDispatch()
  const mobileMenuLink  = useAppSelector(s => s.ui.mobileMenuLink)
  const mobileClose     = useAppSelector(s => s.ui.mobileClose)

  // ── scroll progress ────────────────────────────────────
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

  // ── active section ─────────────────────────────────────
  useEffect(() => {
    const kills = SECTIONS.flatMap(id => {
      const el = document.getElementById(id)
      if (!el) return []
      return [ScrollTrigger.create({
        trigger: el, start: 'top 55%', end: 'bottom 55%',
        onEnter:     () => setActive(id),
        onEnterBack: () => setActive(id),
      })]
    })
    return () => kills.forEach(t => t.kill())
  }, [])

  // ── halo ───────────────────────────────────────────────
  const slideHalo = useCallback((id: string) => {
    const track = trackRef.current
    const halo  = haloRef.current
    const link  = linkEls.current.get(id)
    if (!track || !halo || !link) return
    const trackRect = track.getBoundingClientRect()
    const linkRect  = link.getBoundingClientRect()
    const x = linkRect.left - trackRect.left - HALO_PAD
    const w = linkRect.width + HALO_PAD * 2
    if (!haloPlaced.current) {
      gsap.set(halo, { x, width: w })
      gsap.to(halo, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      haloPlaced.current = true
    } else {
      gsap.to(halo, { x, width: w, opacity: 1, duration: 0.5, ease: 'power4.out' })
    }
  }, [])

  useEffect(() => {
    const id = requestAnimationFrame(() => slideHalo(active))
    return () => cancelAnimationFrame(id)
  }, [active, scrolled, slideHalo])

  // ── pill entrance ──────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(pillRef.current,
      { y: -PILL_H * 1.4, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out', delay: 0.5 }
    )
  }, [])

  // ── logo wave (GSAP letter anim — not a hover style, kept local) ──
  const onLogoHover = () => {
    gsap.fromTo(letterRefs.current, { y: 0 }, {
      y: -4, stagger: 0.04, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1,
      onStart()    { letterRefs.current.slice(3).forEach(el => (el.style.color = '#FBFAEE')) },
      onComplete() { letterRefs.current.slice(3).forEach(el => (el.style.color = '#933DC9')) },
    })
  }

  // ── mobile menu ────────────────────────────────────────
  const openMenu = () => {
    setMenuOpen(true)
    gsap.set(menuRef.current, { display: 'flex' })
    gsap.fromTo(menuRef.current, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: 'power2.out' })
    const links = menuLinksRef.current?.querySelectorAll('.m-link')
    if (links)
      gsap.fromTo(links, { x: -70, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.065, duration: 0.5, ease: 'power3.out', delay: 0.07 })
  }

  const closeMenu = () => {
    gsap.to(menuRef.current, {
      opacity: 0, duration: 0.2, ease: 'power2.in',
      onComplete: () => { gsap.set(menuRef.current, { display: 'none' }); setMenuOpen(false) },
    })
  }

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    if (menuOpen) closeMenu()
  }

  const shellStyle: React.CSSProperties = {
    height:         `${PILL_H}px`,
    borderRadius:   '9999px',
    display:        'flex',
    alignItems:     'center',
    transition:     'background 0.4s, border-color 0.4s, box-shadow 0.4s, backdrop-filter 0.4s',
    background:     scrolled ? 'rgba(8,8,8,0.9)' : 'transparent',
    border:         scrolled ? '1px solid rgba(147,61,201,0.22)' : '1px solid transparent',
    backdropFilter: scrolled ? 'blur(28px) saturate(180%)' : 'none',
    boxShadow:      scrolled ? '0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)' : 'none',
  }

  const divider = (
    <div style={{ width: '1px', height: '22px', background: 'rgba(147,61,201,0.2)', flexShrink: 0, margin: '0 10px' }} />
  )

  return (
    <>
      {/* Progress bar */}
      <div ref={progressRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 100,
        height: '2px', width: '0%', pointerEvents: 'none',
        background: 'linear-gradient(90deg, #53118F, #933DC9, #FBFAEE)',
        boxShadow: '0 0 10px rgba(147,61,201,0.9)',
        transition: 'width 0.06s linear',
      }} />

      {/* Desktop pill */}
      <div ref={pillRef} className="hidden md:flex items-center w-full xl:w-300 2xl:w-350" style={{
        ...shellStyle,
        position: 'fixed', top: '18px', left: '50%',
        transform: 'translateX(-50%)', zIndex: 50,
        padding: '0 20px',
      }}>
        {/* Track — wraps NavStart + NavBetween so halo can slide across both */}
        <div ref={trackRef} className="relative flex flex-1 items-center">

          {/* Halo */}
          <div ref={haloRef} className="nav-halo absolute left-0 pointer-events-none" style={{
            top: '50%', transform: 'translateY(-50%)',
            height: `${HALO_H}px`, width: '60px', opacity: 0,
            willChange: 'transform, width, opacity',
          }} />

          <NavStart
            pillH={PILL_H}
            linkPadX={LINK_PAD_X}
            letterRefs={letterRefs}
            onLogoHover={onLogoHover}
            registerEl={(id, el) => linkEls.current.set(id, el)}
            scrollTo={scrollTo}
          />

          {divider}

          <NavBetween
            pillH={PILL_H}
            linkPadX={LINK_PAD_X}
            active={active}
            registerEl={(id, el) => linkEls.current.set(id, el)}
            scrollTo={scrollTo}
          />
        </div>

        <NavCta />
      </div>

      {/* Mobile bar */}
      <div className="flex md:hidden" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: '60px', padding: '0 20px',
        alignItems: 'center', justifyContent: 'space-between',
        background:     scrolled ? 'rgba(8,8,8,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom:   scrolled ? '1px solid rgba(147,61,201,0.1)' : 'none',
        transition: 'background 0.4s, border-color 0.4s',
      }}>
        <a href="#hero" onClick={e => { e.preventDefault(); scrollTo('#hero') }}
          style={{ textDecoration: 'none', fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '14px', letterSpacing: '0.12em', color: '#FBFAEE' }}>
          XRO<span style={{ color: '#933DC9' }}>SIAN</span>
        </a>
        <button onClick={openMenu} aria-label="Open menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {[24, 16, 24].map((w, i) => (
            <span key={i} style={{ display: 'block', height: '1.5px', width: `${w}px`, background: '#FBFAEE', borderRadius: '2px' }} />
          ))}
        </button>
      </div>

      {/* Mobile overlay */}
      <div ref={menuRef} style={{
        display: 'none', position: 'fixed', inset: 0, zIndex: 60,
        flexDirection: 'column', padding: '0 28px 36px',
        background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(28px)',
      }}>
        <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '14px', letterSpacing: '0.12em', color: '#FBFAEE' }}>
            XRO<span style={{ color: '#933DC9' }}>SIAN</span>
          </span>

          {/* Close button — hover via Redux mobileClose */}
          <button
            onClick={closeMenu}
            onMouseEnter={() => dispatch(setMobileClose(true))}
            onMouseLeave={() => dispatch(setMobileClose(false))}
            aria-label="Close menu"
            style={{
              background: 'none', cursor: 'pointer',
              borderRadius: '50%', width: '40px', height: '40px',
              fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              border:     mobileClose ? '1px solid #933DC9'               : '1px solid rgba(147,61,201,0.3)',
              boxShadow:  mobileClose ? '0 0 14px rgba(147,61,201,0.4)'  : 'none',
              color: '#FBFAEE',
            }}
          >✕</button>
        </div>

        {/* Mobile nav links — hover via Redux mobileMenuLink */}
        <div ref={menuLinksRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {NAV_LINKS.map((link, i) => {
            const id        = link.href.replace('#', '')
            const isActive  = active === id
            const isHovered = mobileMenuLink === id
            return (
              <a key={link.href} href={link.href} className="m-link"
                onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                onMouseEnter={() => dispatch(setMobileMenuLink(id))}
                onMouseLeave={() => dispatch(setMobileMenuLink(null))}
                style={{
                  fontFamily: 'Orbitron, monospace', fontWeight: 900,
                  fontSize: 'clamp(1.8rem, 7.5vw, 3.2rem)',
                  textDecoration: 'none',
                  padding: '10px 0',
                  borderBottom: i < NAV_LINKS.length - 1 ? '1px solid rgba(147,61,201,0.07)' : 'none',
                  display: 'flex', alignItems: 'center', gap: '16px',
                  transition: 'color 0.2s, letter-spacing 0.2s',
                  color:          isActive || isHovered ? '#933DC9' : 'rgba(251,250,238,0.8)',
                  letterSpacing:  isHovered ? '0.01em' : '-0.02em',
                }}
              >
                <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '11px', fontWeight: 600, color: 'rgba(147,61,201,0.35)', letterSpacing: '0.2em', minWidth: '26px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </a>
            )
          })}
        </div>

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
