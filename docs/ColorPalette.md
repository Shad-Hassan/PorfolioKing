# Color Palette — PorfolioKing

## The Black, White & Purple System

The palette is a deliberate 5-color constraint. Limitation breeds identity.

---

## Core Palette

| Name | Hex | Role |
|---|---|---|
| **Void** | `#000000` | True black background — page canvas, absolute negative space |
| **Obsidian** | `#242424` | Bento card surfaces, elevated elements |
| **Ivory** | `#FBFAEE` | Primary text, headings — warmer than pure white, easier on dark backgrounds |
| **Charming Purple** | `#933DC9` | Primary accent — glows, borders, highlights, CTAs |
| **Mystic** | `#53118F` | Deep purple — gradients, button backgrounds, depth layer |

---

## Usage Rules

### Void (#000000) — The Canvas
- Always the body background. Never compromise it with patterns.
- The only deviation allowed: subtle radial gradients at section centers using Deep Purple at 10–20% opacity.
- Exception: grid line overlays at `rgba(#933DC9, 0.04)` — barely perceptible but they structure space.

### Obsidian (#242424) — Surface Layer
- Bento card backgrounds: `rgba(36, 36, 36, 0.6)` with `backdrop-filter: blur(12px)`
- The glass-morphism effect comes from the combination of this at 60% opacity + blur over void.
- Never use solid Obsidian — always semi-transparent to preserve depth.

### Ivory (#FBFAEE) — Type & Light
- H1, H2 headings: full opacity `#FBFAEE`
- Body copy: `rgba(251, 250, 238, 0.55–0.7)` — reduced opacity creates visual hierarchy without changing hue
- Metadata / small labels: `rgba(251, 250, 238, 0.25–0.4)` — whisper-level hierarchy
- The warm undertone contrasts with the cool purple — creates tension that feels cinematic

### Charming Purple (#933DC9) — The Blade
- Primary interactive color: hover states, active links, borders on cards
- Glow effects: `box-shadow: 0 0 30px rgba(147, 61, 201, 0.3)` — never hard shadows
- Text highlights within headings: the single colored word in an otherwise Ivory heading
- Borders: `rgba(147, 61, 201, 0.12)` default → `rgba(147, 61, 201, 0.5)` on hover
- The `#` of the hex, 933DC9, happens to feel like a weapon serial number. Appropriate.

### Mystic (#53118F) — The Depth
- Never used alone — always in gradients with Charming Purple
- `linear-gradient(135deg, #933DC9, #53118F)` for filled buttons
- Radial gradients for section backdrops: `radial-gradient(ellipse at bottom, rgba(83,17,143,0.2), transparent)`
- Conveys weight, power, depth — the shadow cast by the purple blade

---

## Opacity System

The palette extends through opacity rather than tints:

```
Ivory at 1.0   → Headings
Ivory at 0.70  → Strong body text
Ivory at 0.55  → Regular body text
Ivory at 0.40  → Secondary info
Ivory at 0.25  → Whisper text, metadata

Purple at 0.70 → Active accent text
Purple at 0.40 → Card borders (hover)
Purple at 0.12 → Card borders (default)
Purple at 0.06 → Grid lines
Purple at 0.03 → Noise texture
```

---

## Gradient Recipes

### CTA Button
```css
background: linear-gradient(135deg, #933DC9, #53118F);
box-shadow: 0 0 25px rgba(147, 61, 201, 0.35);
```

### Section Radial Glow
```css
background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(83,17,143,0.2), transparent 70%);
```

### Accent Line
```css
background: linear-gradient(90deg, transparent, #933DC9, transparent);
height: 1px;
```

### Card Highlight (top-left inner glow)
```css
background: linear-gradient(135deg, rgba(147,61,201,0.04), transparent 60%);
```

### Featured Card
```css
background: linear-gradient(135deg, rgba(83,17,143,0.2), rgba(36,36,36,0.6));
```

---

## Accessibility Note

- Charming Purple `#933DC9` on Void `#000000`: contrast ratio ~5.8:1 (AA pass for large text, borderline for small)
- Ivory `#FBFAEE` on Void: ~20.5:1 (AAA)
- Ivory 0.7 on Void: ~14.4:1 (AAA)
- Use full-opacity purple only for display-size text or decorative elements, not for small body copy
