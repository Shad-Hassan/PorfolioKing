import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealText from '@/components/animations/RevealText'
import { EXPERIENCE } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

export default function ExperienceSection() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.bc')
    gsap.fromTo(cards,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, stagger: { amount: 0.4 }, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 75%', once: true } }
    )
  }, [])

  return (
    <section id="experience" style={{ padding: '120px 0', maxWidth: '1280px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
      <RevealText style={{ marginBottom: '48px' }}>
        <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.5em', color: '#933DC9', textTransform: 'uppercase', marginBottom: '12px' }}>
          02 // Experience
        </p>
        <h2 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#FBFAEE', letterSpacing: '-0.02em' }}>
          BATTLE<span style={{ color: '#933DC9' }}>FIELD</span>
        </h2>
      </RevealText>

      <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '12px' }}>

        {/* Timeline label column — decorative */}
        <div className="bc" style={{
          gridColumn: '1 / 4', gridRow: '1 / 3',
          background: 'linear-gradient(180deg, rgba(83,17,143,0.2) 0%, rgba(0,0,0,0.7) 100%)',
          border: '1px solid rgba(147,61,201,0.15)', borderRadius: '20px',
          padding: '36px 28px', backdropFilter: 'blur(16px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.4em', color: 'rgba(147,61,201,0.6)', textTransform: 'uppercase', marginBottom: '24px' }}>
              Company
            </p>
            <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)', color: '#FBFAEE', lineHeight: 1.1 }}>
              Krishibid<br /><span style={{ color: '#933DC9' }}>Group</span>
            </p>
            <div style={{ height: '1px', background: 'linear-gradient(90deg, #933DC9, transparent)', margin: '20px 0' }} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(251,250,238,0.35)', lineHeight: 1.6 }}>
              Kazipara, Mirpur<br />Dhaka-1216
            </p>
          </div>
          {/* Timeline bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#933DC9', boxShadow: '0 0 10px rgba(147,61,201,0.8)', flexShrink: 0 }} />
              <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '11px', color: 'rgba(251,250,238,0.5)', fontWeight: 600 }}>July 2025 – Present</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(147,61,201,0.4)', flexShrink: 0 }} />
              <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '11px', color: 'rgba(251,250,238,0.3)', fontWeight: 600 }}>June 2024 – June 2025</p>
            </div>
          </div>
        </div>

        {/* Role 1 — DevOps */}
        <div className="bc" style={{
          gridColumn: '4 / 13',
          background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(147,61,201,0.12)', borderRadius: '20px',
          padding: '32px 36px', backdropFilter: 'blur(20px)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)', color: '#FBFAEE', marginBottom: '6px' }}>
                DevOps Engineer (Full Stack)
              </p>
              <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '12px', color: '#933DC9', letterSpacing: '0.05em' }}>
                Krishibid Group
              </p>
            </div>
            <span className="tech-tag" style={{ whiteSpace: 'nowrap' }}>July 2025 – Present</span>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', padding: 0 }}>
            {EXPERIENCE[0].bullets.map((b, i) => (
              <li key={i} style={{ display: 'flex', gap: '12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(251,250,238,0.6)', lineHeight: 1.65 }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#933DC9', flexShrink: 0, marginTop: '7px' }} />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Role 2 — Junior */}
        <div className="bc" style={{
          gridColumn: '4 / 13',
          background: 'rgba(10,10,10,0.75)', border: '1px solid rgba(147,61,201,0.08)', borderRadius: '20px',
          padding: '32px 36px', backdropFilter: 'blur(16px)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)', color: '#FBFAEE', marginBottom: '6px' }}>
                Junior Software Engineer (Full Stack)
              </p>
              <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '12px', color: '#933DC9', letterSpacing: '0.05em' }}>
                Krishibid Group
              </p>
            </div>
            <span className="tech-tag" style={{ whiteSpace: 'nowrap' }}>June 2024 – June 2025</span>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', padding: 0 }}>
            {EXPERIENCE[1].bullets.map((b, i) => (
              <li key={i} style={{ display: 'flex', gap: '12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(251,250,238,0.5)', lineHeight: 1.65 }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(147,61,201,0.5)', flexShrink: 0, marginTop: '7px' }} />
                {b}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
