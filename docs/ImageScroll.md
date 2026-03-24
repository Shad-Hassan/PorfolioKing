# ImageScroll — Shooting Guide

## Goal

Create a scroll-driven cinematic sequence where the 3D model (Cyberpunk Samurai) appears to rotate, breathe, or transform as the user scrolls. This is achieved by rendering **20 sequential frames** in your 3D software and scrubbing through them with GSAP's ScrollTrigger canvas approach.

---

## How It Works (Technical)

```
User scrolls  →  ScrollTrigger progress (0 → 1)
              →  frame index = Math.floor(progress * FRAME_COUNT)
              →  Canvas draws frame[index]
              →  Appears as smooth animation
```

GSAP `scrub: 0.5` adds a slight lag — the animation "catches up" to the scroll position, giving a cinematic, physical feel.

---

## Frame Specifications

| Property | Value |
|---|---|
| Frame count | 20 (configurable via `FRAME_COUNT` in `src/lib/constants.ts`) |
| Format | `.webp` (best quality/size ratio for photos) |
| Resolution | 1920×1080 or 1080×1920 (portrait) |
| Naming | `frame-001.webp` through `frame-020.webp` |
| Output folder | `public/frames/` |
| Background | Pure black `#000000` — the canvas blends into the page |

---

## Camera Shot Sequence (20 Frames)

The sequence should feel like ONE CONTINUOUS MOTION split into 20 stops.
Choose ONE of the following cinematographic arcs:

### Option A — The Awakening Arc (Recommended)
Character appears dormant, then rises into a powerful stance.

| Frames | Motion | Camera Angle |
|---|---|---|
| 01–03 | Static front, neutral pose | Eye level, slight low angle |
| 04–06 | Subtle head tilt upward | Same camera, slow zoom in |
| 07–09 | Arms begin to raise slightly | Camera pulls back 5–10% |
| 10–12 | Character turns 15° right (3/4 view) | Camera orbits right |
| 13–15 | 30° turn, katana hilt visible over shoulder | Camera orbits further right |
| 16–18 | Profile view (90°), one katana partially drawn | Camera at slight high angle |
| 19–20 | Near-profile with dramatic purple glow pulse | Hold position, atmosphere |

### Option B — The Orbit Arc
Simple 180° turntable rotation (front → back → front).
Clean, works well if model has strong back design.

| Frames | Rotation |
|---|---|
| 01–05 | 0° → 45° (front to 3/4) |
| 06–10 | 45° → 90° (3/4 to side) |
| 11–15 | 90° → 135° (side to back-3/4) |
| 16–20 | 135° → 180° (back-3/4 to back) |

### Option C — The Cinematic Zoom
Camera pushes in from full-body to bust/face close-up.

| Frames | Camera Distance |
|---|---|
| 01–05 | Full body (10 units back) |
| 06–10 | 3/4 body (7 units) |
| 11–15 | Waist up (5 units) |
| 16–20 | Bust/shoulders to face (3 units) |

---

## Consistency Rules (Critical)

These rules prevent jarring jumps between frames:

1. **Fixed background** — Pure black `#000000` every frame. No environment changes.
2. **Consistent lighting** — Lock your three-point light rig before shooting. Purple rim light from behind/right, soft key from front-left.
3. **Same render settings** — Same post-processing (bloom, AO, exposure) across all frames.
4. **Smooth interpolation** — In your 3D tool, use easing curves that give more frames near the start and end of motion (ease in/out). Equal spacing can look mechanical.
5. **Ground anchor** — The character's feet must stay at the same Y position in every frame. Any vertical drift will cause the model to "bounce".
6. **No depth-of-field changes** — Keep DOF locked or off. Changes in blur across frames read as jitter, not cinema.
7. **Canvas fit** — The canvas uses `contain` scaling — leave at least 10% padding around the character to prevent cropping at different viewports.

---

## Purple Lighting Setup

To match the site's color system:
- **Key light:** Soft white (#FBFAEE), 40% intensity, front-left
- **Rim light:** Charming Purple (#933DC9), 80% intensity, back-right (creates the signature purple edge glow)
- **Fill light:** Deep Purple (#53118F), 15% intensity, below-front (brings up shadow detail)
- **Ambient:** 5% deep purple — kills pure black shadows which look flat

The purple rim light should match the CSS `glow-purple` effect on the site — they should feel like the same light source.

---

## Export Checklist

- [ ] 20 frames named `frame-001.webp` → `frame-020.webp`
- [ ] All frames same resolution
- [ ] All frames pure black background
- [ ] Smooth visual interpolation between adjacent frames (no jump cuts)
- [ ] Placed in `public/frames/`
- [ ] Update `FRAME_COUNT` in `src/lib/constants.ts` if you change the count
- [ ] Test on mobile: confirm no frames are cropped

---

## Tools

- **Blender:** Render → Output Properties → set to JPEG/WebP, 100% resolution, 20 frames keyframed on a NLA strip or timeline
- **Sketchfab export:** Use "Take screenshot" at each angle (manual, slower but works)
- **Marmoset Toolbag:** Turntable render export with frame range
