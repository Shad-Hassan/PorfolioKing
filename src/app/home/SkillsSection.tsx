import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealText from '@/components/animations/RevealText'
import { SKILLS } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

export default function SkillsSection() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.bc')
    gsap.fromTo(cards,
      { y: 50, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: { amount: 0.45 }, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 78%', once: true } }
    )
  }, [])

  const [langs, frontend, backend, databases, devops, security] = SKILLS

  return (
    <section id="skills" style={{ padding: '120px 0', maxWidth: '1280px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
      <RevealText style={{ marginBottom: '48px' }}>
        <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.5em', color: '#933DC9', textTransform: 'uppercase', marginBottom: '12px' }}>
          03 // Arsenal
        </p>
        <h2 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#FBFAEE', letterSpacing: '-0.02em' }}>
          TECH<span style={{ color: '#933DC9' }}>STACK</span>
        </h2>
      </RevealText>

      <div ref={gridRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '12px',
      }}>

        {/* ─── Card 1: Frontend HERO card — wide + tall ─── */}
        <div className="bc" style={{
          gridColumn: '1 / 8', gridRow: '1 / 3',
          background: 'rgba(10,10,10,0.8)',
          border: '1px solid rgba(147,61,201,0.15)', borderRadius: '20px',
          padding: '36px', position: 'relative', overflow: 'hidden',
          backdropFilter: 'blur(20px)', minHeight: '280px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          {/* Decorative ghost text */}
          <span style={{
            position: 'absolute', bottom: '-20px', right: '-10px',
            fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '160px',
            color: 'rgba(147,61,201,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
            letterSpacing: '-0.05em',
          }}>FE</span>

          <div>
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.4em', color: 'rgba(147,61,201,0.6)', textTransform: 'uppercase', marginBottom: '12px' }}>
              Frontend
            </p>
            <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)', color: '#FBFAEE', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '28px' }}>
              React<br /><span style={{ color: '#933DC9' }}>Ecosystem</span>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {frontend.items.map(item => (
                <span key={item} className="tech-tag">{item}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ height: '1px', background: 'linear-gradient(90deg, #933DC9, transparent)', marginBottom: '12px' }} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(251,250,238,0.25)' }}>
              This portfolio built from this exact stack.
            </p>
          </div>
        </div>

        {/* ─── Card 2: Languages — narrow tall ─── */}
        <div className="bc" style={{
          gridColumn: '8 / 13', gridRow: '1 / 3',
          background: 'rgba(10,10,10,0.75)',
          border: '1px solid rgba(147,61,201,0.1)', borderRadius: '20px',
          padding: '28px', backdropFilter: 'blur(16px)',
          display: 'flex', flexDirection: 'column', gap: '0',
        }}>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.4em', color: 'rgba(147,61,201,0.6)', textTransform: 'uppercase', marginBottom: '20px' }}>
            Languages
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
            {langs.items.map((item, i) => (
              <div key={item} style={{
                padding: '10px 12px', borderRadius: '8px',
                background: i < 2 ? 'rgba(147,61,201,0.1)' : 'transparent',
                borderLeft: i < 2 ? '2px solid #933DC9' : '2px solid rgba(147,61,201,0.15)',
                display: 'flex', alignItems: 'center',
              }}>
                <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '14px', color: i < 2 ? '#FBFAEE' : 'rgba(251,250,238,0.55)' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Card 3: Backend ─── */}
        <div className="bc" style={{
          gridColumn: '1 / 5',
          background: 'rgba(10,10,10,0.7)', border: '1px solid rgba(147,61,201,0.1)', borderRadius: '16px',
          padding: '24px', backdropFilter: 'blur(16px)',
        }}>
          <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: '1.1rem', color: '#FBFAEE', marginBottom: '16px' }}>
            Back<span style={{ color: '#933DC9' }}>end</span>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {backend.items.map(item => <span key={item} className="tech-tag">{item}</span>)}
          </div>
        </div>

        {/* ─── Card 4: Databases ─── */}
        <div className="bc" style={{
          gridColumn: '5 / 9',
          background: 'rgba(10,10,10,0.7)', border: '1px solid rgba(147,61,201,0.1)', borderRadius: '16px',
          padding: '24px', backdropFilter: 'blur(16px)',
        }}>
          <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: '1.1rem', color: '#FBFAEE', marginBottom: '16px' }}>
            Data<span style={{ color: '#933DC9' }}>base</span>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {databases.items.map(item => <span key={item} className="tech-tag">{item}</span>)}
          </div>
        </div>

        {/* ─── Card 5: Security — accent ─── */}
        <div className="bc" style={{
          gridColumn: '9 / 13',
          background: 'linear-gradient(135deg, rgba(147,61,201,0.14) 0%, rgba(0,0,0,0.7) 100%)',
          border: '1px solid rgba(147,61,201,0.2)', borderRadius: '16px',
          padding: '24px', backdropFilter: 'blur(16px)',
        }}>
          <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: '1.1rem', color: '#FBFAEE', marginBottom: '16px' }}>
            Sec<span style={{ color: '#933DC9' }}>urity</span>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {security.items.map(item => <span key={item} className="tech-tag">{item}</span>)}
          </div>
        </div>

        {/* ─── Card 6: DevOps — banner wide ─── */}
        <div className="bc" style={{
          gridColumn: '1 / 10',
          background: 'rgba(10,10,10,0.7)', border: '1px solid rgba(147,61,201,0.1)', borderRadius: '16px',
          padding: '28px 32px', backdropFilter: 'blur(16px)',
          display: 'flex', alignItems: 'center', gap: '32px',
        }}>
          <div style={{ flexShrink: 0 }}>
            <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: '#FBFAEE', lineHeight: 1.1 }}>
              Dev<span style={{ color: '#933DC9' }}>Ops</span>
            </p>
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '10px', letterSpacing: '0.3em', color: 'rgba(251,250,238,0.3)', textTransform: 'uppercase', marginTop: '4px' }}>
              Production infra
            </p>
          </div>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, transparent, #933DC9, transparent)', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {devops.items.map(item => <span key={item} className="tech-tag">{item}</span>)}
          </div>
        </div>

        {/* ─── Card 7: Exploring ─── */}
        <div className="bc" style={{
          gridColumn: '10 / 13',
          background: 'linear-gradient(145deg, rgba(147,61,201,0.12), rgba(0,0,0,0.7))',
          border: '1px solid rgba(147,61,201,0.15)', borderRadius: '16px',
          padding: '24px', backdropFilter: 'blur(16px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px',
        }}>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.4em', color: 'rgba(147,61,201,0.6)', textTransform: 'uppercase' }}>
            Learning
          </p>
          <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: '1rem', color: '#933DC9', lineHeight: 1.2 }}>
            3D Web
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {['Three.js', 'R3F', 'WebGL', 'GLSL'].map(t => (
              <span key={t} className="tech-tag" style={{ fontSize: '10px' }}>{t}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
