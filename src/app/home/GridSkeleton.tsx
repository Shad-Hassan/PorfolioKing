/**
 * GridSkeleton.tsx
 * ─────────────────────────────────────────────────────────────
 * Design scaffold — shows the full page grid structure with
 * silver emanating borders and labeled cells.
 * Swap GridSkeleton ↔ real sections in HomePage as needed.
 * ─────────────────────────────────────────────────────────────
 */

const SILVER = 'rgba(210, 208, 235, 0.45)'
const SILVER_GLOW = `
  0 0 0 1px rgba(210, 208, 235, 0.08),
  0 0 14px rgba(200, 196, 245, 0.18),
  0 0 30px rgba(180, 175, 230, 0.08),
  inset 0 1px 0 rgba(255, 255, 255, 0.05)
`
// ── primitives ────────────────────────────────────────────────

function SectionShell({
  id, label, index, children,
}: { id: string; label: string; index: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{
      padding: '100px 0',
      maxWidth: '1280px',
      margin: '0 auto',
      paddingLeft: '24px',
      paddingRight: '24px',
    }}>
      {/* Section header */}
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'baseline', gap: '16px' }}>
        <span style={{
          fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '11px',
          letterSpacing: '0.4em', color: 'rgba(147,61,201,0.5)', textTransform: 'uppercase',
        }}>{index} //</span>
        <h2 style={{
          fontFamily: 'Orbitron, monospace', fontWeight: 900,
          fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: SILVER,
          letterSpacing: '-0.02em', opacity: 0.5,
        }}>{label}</h2>
        {/* Section divider */}
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(210,208,235,0.18), transparent)' }} />
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '10px',
      }}>
        {children}
      </div>
    </section>
  )
}

function Cell({
  label,
  sub,
  col,
  row,
  minH = 120,
  accent = false,
}: {
  label: string
  sub?: string
  col: string          // e.g. '1 / 7'
  row?: string         // e.g. '1 / 3'
  minH?: number
  accent?: boolean
}) {
  return (
    <div style={{
      gridColumn: col,
      gridRow: row,
      minHeight: `${minH}px`,
      border: `1px solid ${accent ? 'rgba(147,61,201,0.5)' : SILVER}`,
      borderRadius: '16px',
      boxShadow: accent
        ? '0 0 20px rgba(147,61,201,0.2), inset 0 1px 0 rgba(147,61,201,0.1)'
        : SILVER_GLOW,
      background: accent
        ? 'rgba(83,17,143,0.06)'
        : 'rgba(20,18,30,0.5)',
      backdropFilter: 'blur(12px)',
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '8px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Corner bracket top-left */}
      <div style={{
        position: 'absolute', top: 10, left: 10,
        width: 14, height: 14,
        borderTop: `1px solid ${accent ? 'rgba(147,61,201,0.5)' : SILVER}`,
        borderLeft: `1px solid ${accent ? 'rgba(147,61,201,0.5)' : SILVER}`,
        opacity: 0.6,
      }} />
      {/* Corner bracket bottom-right */}
      <div style={{
        position: 'absolute', bottom: 10, right: 10,
        width: 14, height: 14,
        borderBottom: `1px solid ${accent ? 'rgba(147,61,201,0.5)' : SILVER}`,
        borderRight: `1px solid ${accent ? 'rgba(147,61,201,0.5)' : SILVER}`,
        opacity: 0.6,
      }} />

      <div>
        <p style={{
          fontFamily: 'Orbitron, monospace', fontWeight: 700,
          fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
          color: accent ? 'rgba(147,61,201,0.8)' : 'rgba(210,208,235,0.55)',
          letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1.3,
        }}>{label}</p>
        {sub && (
          <p style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 500, fontSize: '11px',
            color: 'rgba(210,208,235,0.28)', letterSpacing: '0.05em', marginTop: '4px',
          }}>{sub}</p>
        )}
      </div>

      {/* Col/row annotation */}
      <p style={{
        fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '10px',
        color: 'rgba(210,208,235,0.18)', letterSpacing: '0.1em',
        position: 'absolute', bottom: 12, left: 24,
      }}>
        col {col}{row ? ` · row ${row}` : ''}
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────

export default function GridSkeleton() {
  return (
    <div style={{ paddingTop: '80px' }}>

      {/* ═══════════════════════════════════════════════════
          HERO — full viewport split
      ═══════════════════════════════════════════════════ */}
      <section id="hero" style={{
        minHeight: '100vh',
        maxWidth: '1280px', margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: '1fr',
        gap: '10px',
        alignContent: 'center',
      }}>
        {/* Section label floated top-left */}
        <div style={{
          gridColumn: '1 / 13',
          display: 'flex', alignItems: 'baseline', gap: '12px',
          marginBottom: '4px', paddingTop: '32px',
        }}>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.4em', color: 'rgba(147,61,201,0.5)', textTransform: 'uppercase' }}>
            00 //
          </span>
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: SILVER, letterSpacing: '-0.02em', opacity: 0.5 }}>
            HERO
          </h2>
        </div>

        {/* Hero Text */}
        <Cell
          col="1 / 8"
          minH={520}
          label="Hero Text"
          sub="Name · Role · Alias · Summary · CTAs"
        />

        {/* Model Frame */}
        <Cell
          col="8 / 13"
          minH={520}
          label="Model Frame"
          sub="Scroll-driven image sequence · frame1–6.png"
          accent
        />
      </section>

      {/* ═══════════════════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════════════════ */}
      <SectionShell id="about" label="ABOUT" index="01">
        <Cell col="1 / 4" row="1 / 3" minH={260} label="Stat — 2+ Years" sub="Big number · accent card" accent />
        <Cell col="4 / 13" row="1 / 3" minH={260} label="Bio Headline" sub="I build systems that survive the real world. · Bio paragraph" />

        <Cell col="1 / 4" minH={120} label="Stat — 10K+" sub="Monthly organic visits" />
        <Cell col="4 / 7"  minH={120} label="Stat — 1K+" sub="WhatsApp interactions / mo" />
        <Cell col="7 / 13" minH={120} label="Quote" sub="Code is architecture. Every line is a design decision." accent />

        <Cell col="1 / 7"  minH={160} label="Education" sub="IUB · GED · Manarat" />
        <Cell col="7 / 13" minH={160} label="Quick Contact" sub="Email · GitHub · Phone · Location" />
      </SectionShell>

      {/* ═══════════════════════════════════════════════════
          EXPERIENCE
      ═══════════════════════════════════════════════════ */}
      <SectionShell id="experience" label="EXPERIENCE" index="02">
        <Cell col="1 / 4" row="1 / 3" minH={440} label="Company Card" sub="Krishibid Group · Address · Timeline dots" accent />
        <Cell col="4 / 13" minH={200} label="Role — DevOps Engineer" sub="July 2025 – Present · 5 bullet points" />
        <Cell col="4 / 13" minH={200} label="Role — Junior Software Engineer" sub="June 2024 – June 2025 · 5 bullet points" />
      </SectionShell>

      {/* ═══════════════════════════════════════════════════
          SKILLS
      ═══════════════════════════════════════════════════ */}
      <SectionShell id="skills" label="TECHSTACK" index="03">
        <Cell col="1 / 8" row="1 / 3" minH={280} label="Frontend Hero" sub="React Ecosystem · Tag cloud · Built with this stack" accent />
        <Cell col="8 / 13" row="1 / 3" minH={280} label="Languages" sub="JS · TS · Python · SQL · HTML · CSS" />

        <Cell col="1 / 5"  minH={120} label="Backend" sub="Node · Express · GraphQL · REST · Socket.io" />
        <Cell col="5 / 9"  minH={120} label="Database" sub="PostgreSQL · MySQL · MongoDB · Prisma · Drizzle" />
        <Cell col="9 / 13" minH={120} label="Security" sub="Firebase · JWT · OAuth · RBAC · Better-Auth" accent />

        <Cell col="1 / 10" minH={100} label="DevOps" sub="Docker · Linux · Git · Vercel · CI/CD · Serverless · OpenSSH" />
        <Cell col="10 / 13" minH={100} label="Learning" sub="Three.js · R3F · WebGL · GLSL" accent />
      </SectionShell>

      {/* ═══════════════════════════════════════════════════
          PROJECTS
      ═══════════════════════════════════════════════════ */}
      <SectionShell id="projects" label="DEPLOYED." index="04">
        <Cell col="1 / 13" minH={240} label="Featured — Krishibid Group Website" sub="Full-stack React corporate site · Multilingual · RBAC CMS · krishibidgroup.com" accent />
        <Cell col="1 / 7"  minH={200} label="Karikr" sub="MERN inventory & booking · Firebase auth · Netlify" />
        <Cell col="7 / 13" minH={200} label="Thwip!" sub="Blog platform · Wish lists · Firebase CRUD · Netlify" />
      </SectionShell>

      {/* ═══════════════════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════════════════ */}
      <SectionShell id="contact" label="LET'S BUILD SOMETHING." index="05">
        <Cell col="1 / 13" minH={360} label="Contact CTA" sub="Headline · Subtext · Send Message CTA · GitHub link · Footer" accent />
      </SectionShell>

    </div>
  )
}
