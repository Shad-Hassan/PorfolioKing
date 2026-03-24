# Typography — PorfolioKing

## Theme: Cyberpunk Samurai

The typographic system merges two identities:
- **Samurai** — angular, disciplined, precise. Every letterform has a reason.
- **Cyberpunk** — monospaced, technological, neon-inflected. The future encoded in type.

The goal: when someone reads a heading, it should feel like a weapon being drawn.

---

## Font Stack

### Orbitron — Display / Hero / Section Heads
- **Weight used:** 700, 800, 900 (Black)
- **Source:** Google Fonts
- **Why:** Geometric, sci-fi letterforms. Sharp verticals mimic katana edges. The monospaced rhythm feels like HUD text on a cyberpunk exosuit.
- **Usage:** `h1`, `h2`, section titles, stats, the XROSIAN logo
- **Letter-spacing:** `-0.02em` for large sizes (tighter feels more aggressive), `0.1–0.2em` for labels (openness reads as authority)

```css
font-family: 'Orbitron', monospace;
font-weight: 900;
letter-spacing: -0.02em;
```

### Rajdhani — Subheadings / Labels / Navigation / Tags
- **Weight used:** 500, 600, 700
- **Source:** Google Fonts
- **Why:** Devanagari-influenced letterforms with a military/tactical aesthetic. Angular, condensed, readable at small sizes. Perfect for ALL CAPS labels.
- **Usage:** Nav links, section labels (`01 // About`), tech tags, CTAs, contact labels
- **Letter-spacing:** `0.15–0.5em` uppercase for labels; `0.2em` for CTAs

```css
font-family: 'Rajdhani', sans-serif;
font-weight: 600;
letter-spacing: 0.3em;
text-transform: uppercase;
```

### Inter — Body / Descriptions / Metadata
- **Weight used:** 300, 400, 500
- **Source:** Google Fonts
- **Why:** Neutral, highly legible, designed for screens. Contrast with the expressive display fonts — body text disappears into the background, letting the design breathe.
- **Usage:** Paragraph text, project descriptions, bullet points, bio copy
- **Line-height:** `1.6–1.7` (generous for reading comfort)

```css
font-family: 'Inter', sans-serif;
font-weight: 400;
line-height: 1.65;
color: rgba(251, 250, 238, 0.6); /* Reduced opacity for hierarchy */
```

---

## Type Scale

| Role | Font | Size (clamp) | Weight | Color |
|---|---|---|---|---|
| Hero H1 | Orbitron | clamp(3rem, 10vw, 9rem) | 900 | #FBFAEE |
| Section H2 | Orbitron | clamp(2rem, 5vw, 4rem) | 900 | #FBFAEE |
| Card H3 | Orbitron | clamp(0.9rem, 1.5vw, 1.1rem) | 700 | #FBFAEE |
| Section label | Rajdhani | 12–13px | 700 | #933DC9 |
| Nav links | Rajdhani | 13px | 600 | rgba(ivory, 0.6) |
| CTA buttons | Rajdhani | 13–14px | 700 | #FBFAEE / #933DC9 |
| Body copy | Inter | 14–15px | 400 | rgba(ivory, 0.55–0.7) |
| Meta / small | Inter / Rajdhani | 11–12px | 400–600 | rgba(ivory, 0.3–0.4) |

---

## Section Label Convention

All sections use the pattern:
```
[NUMBER] // [KEYWORD]
```
Example: `01 // About`, `04 // Projects`

This is styled in Rajdhani, uppercase, letter-spaced 0.5em, in `#933DC9`. It reads like a file system path — hinting at the character's technological nature.

---

## Heading Accent Strategy

- Purple spans within white headings: `THE <span color="#933DC9">ARCHITECT</span>`
- Creates a focal glyph — the eye lands on purple, then reads backward
- Used in: About (`ARCHITECT`), Skills (`STACK`), Hero (`HASSAN`), Contact (`SOMETHING.`)

---

## Anti-patterns (avoid)

- Never use Orbitron for body text (unreadable below 14px)
- Never use Inter for headings (too neutral, kills the mood)
- Avoid mixed caps in Rajdhani labels — always ALL CAPS
- Don't use font-weight 400 in Orbitron — go 700 minimum
