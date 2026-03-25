import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealText from '@/components/animations/RevealText'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.bc')
    gsap.fromTo(cards,
      { y: 50, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: { amount: 0.5 }, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 75%', once: true } }
    )
  }, [])

  return (
    <section id="about" className="w-full xl:w-300 2xl:w-350 mx-auto" style={{ padding: '120px 24px' }}>
      <RevealText style={{ marginBottom: '48px' }}>
        <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.5em', color: '#933DC9', textTransform: 'uppercase', marginBottom: '12px' }}>
          01 // About
        </p>
        <h2 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#FBFAEE', letterSpacing: '-0.02em' }}>
          THE <span style={{ color: '#933DC9' }}>ARCHITECT</span>
        </h2>
      </RevealText>

      <div ref={gridRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'auto',
        gap: '12px',
      }}>

        {/* ─── Card 1: Giant "2+" stat — visual anchor ─── */}
        <div className="bc" style={{
          gridColumn: '1 / 4', gridRow: '1 / 3',
          background: 'linear-gradient(160deg, rgba(83,17,143,0.35) 0%, rgba(0,0,0,0.7) 100%)',
          border: '1px solid rgba(147,61,201,0.15)', borderRadius: '20px',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '28px', minHeight: '260px', position: 'relative', overflow: 'hidden',
          backdropFilter: 'blur(16px)',
        }}>
          {/* Ghost number */}
          <span style={{
            position: 'absolute', top: '-10px', right: '-8px',
            fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '120px',
            color: 'rgba(147,61,201,0.08)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          }}>2</span>
          <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', color: '#933DC9', lineHeight: 1, textShadow: '0 0 30px rgba(147,61,201,0.5)' }}>
            2+
          </p>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(251,250,238,0.4)', textTransform: 'uppercase', marginTop: '8px' }}>
            Years Building
          </p>
          <div style={{ height: '1px', background: 'linear-gradient(90deg, #933DC9, transparent)', marginTop: '16px' }} />
        </div>

        {/* ─── Card 2: Bio — no label, text IS the design ─── */}
        <div className="bc" style={{
          gridColumn: '4 / 13', gridRow: '1 / 3',
          background: 'rgba(10,10,10,0.75)',
          border: '1px solid rgba(147,61,201,0.1)', borderRadius: '20px',
          padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          backdropFilter: 'blur(20px)',
        }}>
          <p style={{
            fontFamily: 'Orbitron, monospace', fontWeight: 900,
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: '#FBFAEE',
            lineHeight: 1.15, marginBottom: '24px', letterSpacing: '-0.01em',
          }}>
            I build systems<br />
            <span style={{ color: '#933DC9' }}>that survive</span><br />
            the real world.
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(251,250,238,0.55)', lineHeight: 1.75, maxWidth: '520px' }}>
            Full Stack DevOps Engineer at <span style={{ color: '#933DC9' }}>Krishibid Group</span> — architecting
            containerized ecosystems, GraphQL APIs, and mentoring engineers. BSc EEE from IUB.
            Known in the digital realm as <span style={{ color: '#933DC9' }}>xrosian</span>.
          </p>
        </div>

        {/* ─── Card 3: 10K stat ─── */}
        <div className="bc" style={{
          gridColumn: '1 / 4',
          background: 'rgba(10,10,10,0.7)', border: '1px solid rgba(147,61,201,0.1)', borderRadius: '16px',
          padding: '24px', backdropFilter: 'blur(16px)', position: 'relative', overflow: 'hidden',
        }}>
          <span style={{ position: 'absolute', top: '-4px', right: '8px', fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '70px', color: 'rgba(147,61,201,0.06)', lineHeight: 1, pointerEvents: 'none' }}>K</span>
          <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: '#FBFAEE', lineHeight: 1 }}>
            10K<span style={{ color: '#933DC9' }}>+</span>
          </p>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(251,250,238,0.35)', textTransform: 'uppercase', marginTop: '8px' }}>
            Monthly organic visits
          </p>
        </div>

        {/* ─── Card 4: 1K stat ─── */}
        <div className="bc" style={{
          gridColumn: '4 / 7',
          background: 'rgba(10,10,10,0.7)', border: '1px solid rgba(147,61,201,0.1)', borderRadius: '16px',
          padding: '24px', backdropFilter: 'blur(16px)', position: 'relative', overflow: 'hidden',
        }}>
          <span style={{ position: 'absolute', top: '-4px', right: '8px', fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '70px', color: 'rgba(147,61,201,0.06)', lineHeight: 1, pointerEvents: 'none' }}>W</span>
          <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: '#FBFAEE', lineHeight: 1 }}>
            1K<span style={{ color: '#933DC9' }}>+</span>
          </p>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(251,250,238,0.35)', textTransform: 'uppercase', marginTop: '8px' }}>
            WA interactions / mo
          </p>
        </div>

        {/* ─── Card 5: Quote — full right ─── */}
        <div className="bc" style={{
          gridColumn: '7 / 13',
          background: 'linear-gradient(135deg, rgba(147,61,201,0.1) 0%, rgba(0,0,0,0.6) 100%)',
          border: '1px solid rgba(147,61,201,0.15)', borderRadius: '16px',
          padding: '28px', backdropFilter: 'blur(16px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: 'clamp(0.9rem, 1.6vw, 1.15rem)', color: '#FBFAEE', lineHeight: 1.4 }}>
            "Code is architecture.<br />
            <span style={{ color: '#933DC9' }}>Every line</span> is a design decision."
          </p>
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #933DC9, transparent)', marginTop: '20px' }} />
        </div>

        {/* ─── Card 6: Education — spans left ─── */}
        <div className="bc" style={{
          gridColumn: '1 / 7',
          background: 'rgba(10,10,10,0.7)', border: '1px solid rgba(147,61,201,0.1)', borderRadius: '16px',
          padding: '28px', backdropFilter: 'blur(16px)',
        }}>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.4em', color: 'rgba(147,61,201,0.6)', textTransform: 'uppercase', marginBottom: '20px' }}>
            Education
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { school: 'Independent University Bangladesh', degree: 'BSc Electrical & Electronic Engineering', grade: 'GPA 3.2', year: '2017–22' },
              { school: 'GED', degree: 'Mathematical Reasoning — 89th percentile', grade: '672/800', year: '2017' },
              { school: 'Manarat Dhaka International', degree: "GCE O'Levels — A's in all Science", grade: 'CGPA 3.5', year: '2014' },
            ].map((edu) => (
              <div key={edu.school} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: '1px solid rgba(147,61,201,0.07)' }}>
                <div>
                  <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '14px', color: '#FBFAEE' }}>{edu.school}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(251,250,238,0.4)', marginTop: '2px' }}>{edu.degree}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '16px' }}>
                  <span className="tech-tag">{edu.grade}</span>
                  <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '11px', color: 'rgba(147,61,201,0.5)', marginTop: '4px' }}>{edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Card 7: Contact — right side ─── */}
        <div className="bc" style={{
          gridColumn: '7 / 13',
          background: 'rgba(10,10,10,0.7)', border: '1px solid rgba(147,61,201,0.1)', borderRadius: '16px',
          padding: '28px', backdropFilter: 'blur(16px)',
        }}>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.4em', color: 'rgba(147,61,201,0.6)', textTransform: 'uppercase', marginBottom: '20px' }}>
            Contact
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Email', value: 'shadhassan8991@gmail.com' },
              { label: 'GitHub', value: 'github.com/Shad-hassan' },
              { label: 'Phone', value: '01952087074' },
              { label: 'Location', value: 'Dhaka, Bangladesh' },
            ].map(item => (
              <div key={item.label}>
                <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(147,61,201,0.45)', textTransform: 'uppercase' }}>{item.label}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(251,250,238,0.75)', marginTop: '2px' }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
