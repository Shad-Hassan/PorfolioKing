import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealText from '@/components/animations/RevealText'
import { PROJECTS } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsSection() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.bc')
    gsap.fromTo(cards,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: { amount: 0.4 }, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 78%', once: true } }
    )
  }, [])

  const [featured, ...rest] = PROJECTS

  return (
    <section id="projects" className="w-full xl:w-300 2xl:w-350 mx-auto" style={{ padding: '120px 24px' }}>
      <RevealText style={{ marginBottom: '48px' }}>
        <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.5em', color: '#933DC9', textTransform: 'uppercase', marginBottom: '12px' }}>
          04 // Projects
        </p>
        <h2 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#FBFAEE', letterSpacing: '-0.02em' }}>
          DEPLOYED<span style={{ color: '#933DC9' }}>.</span>
        </h2>
      </RevealText>

      <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '12px' }}>

        {/* ─── Featured — full width, tall ─── */}
        <a href={featured.url} target="_blank" rel="noreferrer" className="bc" style={{
          gridColumn: '1 / 13',
          background: 'rgba(10,10,10,0.85)',
          border: '1px solid rgba(147,61,201,0.18)', borderRadius: '20px',
          padding: '48px 52px', backdropFilter: 'blur(20px)',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center',
          textDecoration: 'none', cursor: 'pointer', position: 'relative', overflow: 'hidden',
          transition: 'border-color 0.3s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(147,61,201,0.5)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(147,61,201,0.18)' }}
        >
          {/* Ghost number */}
          <span style={{
            position: 'absolute', bottom: '-30px', right: '20px',
            fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '220px',
            color: 'rgba(147,61,201,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          }}>01</span>

          {/* Left */}
          <div>
            <span className="tech-tag" style={{ background: 'rgba(147,61,201,0.25)', borderColor: '#933DC9', marginBottom: '20px', display: 'inline-block' }}>
              Featured
            </span>
            <h3 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: '#FBFAEE', lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.02em' }}>
              {featured.title}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {featured.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
            </div>
          </div>

          {/* Right */}
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(251,250,238,0.55)', lineHeight: 1.75, marginBottom: '28px' }}>
              {featured.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '13px', color: '#933DC9', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              View Live <span style={{ fontSize: '18px' }}>→</span>
            </div>
          </div>
        </a>

        {/* ─── Side projects ─── */}
        {rest.map((project, i) => (
          <a key={project.title} href={project.url} target="_blank" rel="noreferrer" className="bc" style={{
            gridColumn: i === 0 ? '1 / 7' : '7 / 13',
            background: 'rgba(10,10,10,0.75)', border: '1px solid rgba(147,61,201,0.1)', borderRadius: '20px',
            padding: '32px 36px', backdropFilter: 'blur(16px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            textDecoration: 'none', cursor: 'pointer', position: 'relative', overflow: 'hidden',
            transition: 'border-color 0.3s', minHeight: '260px',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(147,61,201,0.4)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(147,61,201,0.1)' }}
          >
            <span style={{
              position: 'absolute', bottom: '-20px', right: '16px',
              fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '120px',
              color: 'rgba(147,61,201,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
            }}>
              {String(i + 2).padStart(2, '0')}
            </span>

            <div>
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: 'clamp(0.9rem, 1.8vw, 1.15rem)', color: '#FBFAEE', lineHeight: 1.2, marginBottom: '12px' }}>
                {project.title}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(251,250,238,0.5)', lineHeight: 1.7 }}>
                {project.description}
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', margin: '20px 0 16px' }}>
                {project.tags.map(t => <span key={t} className="tech-tag" style={{ fontSize: '11px' }}>{t}</span>)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '12px', color: 'rgba(147,61,201,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                View Live <span>→</span>
              </div>
            </div>
          </a>
        ))}

      </div>
    </section>
  )
}
