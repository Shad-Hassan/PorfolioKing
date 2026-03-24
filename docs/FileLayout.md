# File Layout — PorfolioKing

## Route Architecture

```
/          → HomePage (single-page, all sections via anchor scroll)
```

All content lives on a single route with GSAP ScrollTrigger controlling
section entrances. Routing is set up via React Router to allow future
expansion (e.g. `/blog`, `/case-studies`).

---

## Directory Structure

```
PorfolioKing/
├── public/
│   ├── frames/                   # 3D model scroll sequence frames
│   │   ├── frame-001.webp        # Frame 1 (front facing, arms at side)
│   │   ├── frame-002.webp        # ... through frame-020.webp
│   │   └── frame-020.webp
│   └── favicon.svg
│
├── src/
│   ├── app/                      # Route-level page components
│   │   └── home/
│   │       ├── HomePage.tsx      # Composes all sections
│   │       ├── HeroSection.tsx   # Full-screen GSAP title reveal
│   │       ├── AboutSection.tsx  # Bento grid — bio, stats, education
│   │       ├── ExperienceSection.tsx  # Timeline bento cards
│   │       ├── SkillsSection.tsx # Tech stack bento grid
│   │       ├── ProjectsSection.tsx    # Project cards bento grid
│   │       └── ContactSection.tsx     # CTA + footer
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # Fixed top nav with GSAP entry
│   │   │   └── BentoGrid.tsx     # BentoGrid + BentoCard components
│   │   ├── animations/
│   │   │   ├── ImageScrollSequence.tsx  # Canvas-based frame scrubber
│   │   │   └── RevealText.tsx    # Scroll-triggered reveal wrapper
│   │   └── ui/                   # (reserved for future buttons, modals)
│   │
│   ├── hooks/
│   │   └── useScrollProgress.ts  # Global scroll progress 0-1
│   │
│   ├── lib/
│   │   └── constants.ts          # CV data, colors, frame config
│   │
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   │
│   ├── assets/frames/            # (alt: import frames as modules for smaller builds)
│   ├── index.css                 # Tailwind v4 @theme + global styles
│   ├── main.tsx                  # Entry point
│   └── App.tsx                   # Router + top-level layout wrappers
│
├── docs/                         # Project documentation
│   ├── FileLayout.md             ← this file
│   ├── Typography.md
│   ├── ColorPalette.md
│   ├── ImageScroll.md
│   └── ContentPlanner.md
│
├── vite.config.ts                # Vite + Tailwind v4 + path aliases
├── tsconfig.json
└── package.json
```

---

## Performance Decisions

| Decision | Rationale |
|---|---|
| Single-page route | Eliminates layout-shift between route transitions; GSAP handles all narrative pacing |
| `public/frames/` for images | Served from CDN edge, not bundled into JS. Browser can parallel-fetch them. |
| `.webp` format | 25–35% smaller than JPEG at equivalent quality for photorealistic renders |
| Canvas API for frame scrubbing | Zero DOM reflows during scroll; GPU-composited layer |
| GSAP ScrollTrigger `scrub: 0.5` | Adds lag/inertia to frame stepping for a cinematic, non-jittery feel |
| `@theme` in Tailwind v4 | Design tokens compiled at build time, not runtime |
| Font subsetting via Google Fonts | Only load weights/styles actually used |
| `loading="lazy"` on below-fold images | Not applicable here (canvas), but used on any `<img>` below fold |

---

## Future Route Expansion

```
/case-studies/:slug   → Deep dives per project
/blog/:slug           → Technical writing
```

Each would use React Router `lazy()` + `Suspense` for code splitting.
