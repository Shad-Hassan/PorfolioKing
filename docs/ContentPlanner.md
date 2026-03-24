# Content Planner — CV to Portfolio Transformation

## Philosophy

A CV is a document. A portfolio is an experience.

The goal of this transformation is not to display Shad's CV — it's to make a visitor **feel** who Shad is before they read a single bullet point. The 3D model is not decoration; it's the first argument: someone who engineers things also creates worlds.

---

## Section Map: CV → Website

### 1. Hero Section (`#hero`)

**CV Source:** Name, title, professional summary
**Transformation:**

| CV Text | Website Treatment |
|---|---|
| "Shad Hassan" | SHAD / HASSAN — split across two lines in Orbitron 900, full-screen scale |
| "Full Stack DevOps Engineer" | Tiny label above the name in Rajdhani, purple, ALL CAPS |
| "2+ years of hands-on experience..." | Distilled to a 2-line manifesto: "Building scalable MERN & Next.js applications. Clean code, modern UI/UX, and DevOps workflows that scale." |
| "shadhassan8991@gmail.com" | "Hire Me" CTA button |
| GitHub profile | Secondary "GitHub" CTA |
| "xrosian" (in-game alias) | Whisper text below name: `// xrosian //` in purple |

**Design intent:** The hero is the sword being drawn. No context yet — just impact. The name, the title, and the call to action. The purple HASSAN creates the brand anchor.

---

### 2. ImageScroll Section

**CV Source:** None — this is visual identity
**Transformation:**

The 3D Cyberpunk Samurai model is Shad's avatar. The scroll sequence is the "cover image" of who he is — the visual thesis before the content thesis. It communicates:
- Technical creativity (I built this model)
- Attention to craft (it's polished to $5K standard)
- Character (I am the Samurai Engineer)

The scroll section has no copy — it's purely visual. The only text is `scroll to explore` as a faint Rajdhani label at the bottom. Silence is part of the argument.

---

### 3. About Section (`#about`)

**CV Source:** Professional Summary, contact info, education
**Transformation:**

| CV Element | Bento Card | Treatment |
|---|---|---|
| Professional Summary (2 paragraphs) | 2/3 width card | Rewritten as first-person narrative, personal voice, mentions "xrosian" alias |
| Email, Phone, GitHub, Location | 1/3 width card | Minimal list, label above each value |
| "2+ years", "10,000+ monthly visits", "1,000+ WA interactions" | Full-width stats strip | Orbitron numbers, large — makes the abstract tangible |
| Education (3 entries) | Half-width card | Timeline list with grade tags |
| (No CV source) | Half-width philosophy card | Quote: "Code is architecture. Every line is a design decision." — expresses Shad's engineering worldview |

**Design intent:** Stats are the evidence. The philosophy card is the differentiator — it tells you the *kind* of engineer Shad is, not just the quantity.

---

### 4. Experience Section (`#experience`)

**CV Source:** Krishibid Group entries (both roles)
**Transformation:**

| CV Element | Website Treatment |
|---|---|
| Company name + role | Orbitron heading, purple company name below |
| Period | `tech-tag` chip |
| Location | Whisper-level metadata |
| 5 bullet points per role | Icon-bulleted list with purple dots |

The vertical timeline line on desktop reinforces the narrative arc: growth over time. Each card is a `bento-card` with scroll-triggered entrance (slide-in from left).

Section header: `BATTLE` + `FIELD` (purple) — professional history reframed as earned combat experience.

---

### 5. Skills Section (`#skills`)

**CV Source:** Programming Skills (all categories)
**Transformation:**

| CV Category | Bento Span | Notes |
|---|---|---|
| Languages | 1/3 | Smallest — foundational, not a differentiator |
| Frontend | 1/3 | Includes GSAP (what built this site) |
| Backend | 1/3 | GraphQL, Socket.io emphasized |
| Databases & ORMs | Half | PostgreSQL is the production DB; highlighted |
| DevOps & Tools | Half | Docker, Linux — the things that make Shad unusual for a fullstack dev |
| Security & Auth | Full | Takes full width — RBAC, JWT, OAuth, pgcrypto = production-grade trust signal |
| (bonus) Currently Exploring | Full | Three.js / Three Fiber — shows growth mindset, connects to the 3D model |

Section header: `TECH` + `STACK` (purple) — arsenal framing.

---

### 6. Projects Section (`#projects`)

**CV Source:** Projects list
**Transformation:**

| CV Field | Website Treatment |
|---|---|
| Project name | Orbitron heading inside card |
| URL | Entire card is a link; "View Live →" CTA at bottom |
| Description bullet | Rewritten as 2-sentence narrative paragraph |
| Technologies inferred | `tech-tag` chips |
| (No CV source) | Large ghost number (01, 02, 03) at card top — art direction device |
| Krishibid Group (first project) | `Featured` badge — it's the live production case study |

---

### 7. Contact Section (`#contact`)

**CV Source:** Email, GitHub
**Transformation:**

The CV lists contact info as metadata. The site turns it into a **chapter ending** — the final punch.

```
LET'S BUILD
SOMETHING.
```

Two CTAs:
- `Send Message` → `mailto:shadhassan8991@gmail.com`
- `GitHub` → opens github.com/Shad-hassan

A short one-liner: "Open to full-stack and DevOps opportunities."

Footer carries only the XROSIAN logo mark and a copyright line — no repeated navigation. Once you reach the end, the journey is complete.

---

## Copy Voice Guide

The website speaks in three registers:

1. **Header register (Orbitron):** Assertive, declarative, capitalized. No verbs. Just nouns and identities. `DEPLOYED.` `BATTLEFIELD` `THE ARCHITECT`

2. **Label register (Rajdhani):** Technical, military, abbreviated. `01 // ABOUT` `FULL STACK DEVOPS ENGINEER` `VIEW LIVE →`

3. **Body register (Inter):** Personal, warm-ish, credentialed. First person. Mentions real outcomes (10K visits, 1K interactions). Mentions xrosian exactly once (in About) — it's an easter egg for people who read.

---

## What Was Left Out

Some CV content was intentionally omitted or compressed:

| CV Element | Decision | Reason |
|---|---|---|
| GED score detail (672/800, 89th percentile) | Condensed to label tag | Detail in Education card; the number speaks for itself |
| Full professional summary paragraph | Replaced | Too formal for a portfolio; rewritten as first-person |
| "Supervising and onboarding" phrasing | Softened | Replaced with "Mentored and guided" — more human |
| Specific project sub-bullets (Firebase, CRUD) | Condensed into tag chips | Tags communicate tech faster than sentences |
