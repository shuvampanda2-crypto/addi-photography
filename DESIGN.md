# Addi Photography — Design System

## Visual Direction
Cinematic dark luxury portfolio with editorial refinement. Premium, minimal, immersive experience inspired by high-end photography brands. Every interaction intentional; nothing decorative without purpose.

## Tone & Differentiation
Refined minimalism. Gold-anchored dark system. Cinematic depth. Sophisticated editorial hierarchy. Magnetic micro-interactions on interactive elements. Typography breathes with generous spacing.

## Palette (OKLCH)

| Token | OKLCH Value | Hex Reference | Usage |
|-------|-------------|---------------|-------|
| `--background` | 0.055 0 0 | #0B0B0B | Ultra-dark base, page background |
| `--card` | 0.07 0 0 | #111111 | Layered content surfaces, cards |
| `--foreground` | 0.98 0 0 | #FFFFFF | Primary text, maximum contrast |
| `--muted-foreground` | 0.73 0 0 | #B8B8B8 | Secondary text, reduced emphasis |
| `--accent` / `--primary` | 0.67 0.09 59 | #C7A46C | Gold accent, interactive, headings |
| `--border` | 0.95 0 0 | rgba(255,255,255,0.08) | Subtle dividing lines, minimal presence |

## Typography

| Use Case | Font | Scale |
|----------|------|-------|
| Display / Headings | Cormorant Garamond (serif) | 48–96px, editorial cinematic scale |
| Body / UI | Inter (sans-serif) | 14–18px, refined readability |
| Technical / Code | GeistMono (monospace) | 12–14px |

**Type Hierarchy**: Huge headings (72px+), generous line-height (1.3–1.5), breathing room between sections. Minimal font-weight variation (400 for body, 700 for emphasis).

## Structural Zones

| Zone | Background | Border | Interaction |
|------|-----------|--------|-------------|
| **Header/Navbar** | `background/80` with `backdrop-blur-md` on scroll | None, transparency | Sticky, glass-morphism blur on scroll |
| **Hero Section** | Full-screen image + overlay gradient | None | Parallax zoom on scroll |
| **Content Sections** | Alternating `background` and `card/50` | Top/bottom subtle `border` | Scroll-triggered fade-up |
| **Card Elements** | `card` with subtle border | `border` 1px | Hover: scale 1.02, shadow elevation |
| **Footer** | `background` with `border-t` | `border` top only | Minimal, text-only |

## Spacing & Rhythm

- **Large sections**: 120–160px vertical padding (`py-32` to `py-40`)
- **Card padding**: 32–48px (`p-8` to `p-12`)
- **Text spacing**: 24–32px between elements (`my-6` to `my-8`)
- **Breathing room**: Never compress elements; generous negative space essential to luxury feel

## Component Patterns

**Buttons**: Solid accent background with hover scale + shadow elevation. Active state: darker overlay.

**Cards**: `bg-card` border with 1px `border-border`. On hover: `shadow-hover` + slight `scale-[1.02]` + accent text color.

**Inputs**: `bg-input` border, focus-ring in accent gold with soft blur. Placeholder text in `muted-foreground`.

**Links**: Inherit text color. Underline animated on hover (gold accent). No default underline.

## Motion & Animation

| Animation | Duration | Easing | Use |
|-----------|----------|--------|-----|
| `fadeUp` | 0.6s | ease-out | Section entrance on scroll |
| `slideInLeft` / `slideInRight` | 0.6s | ease-out | Content reveal directional |
| `zoomIn` | 0.6s | ease-out | Image/card magnification |
| `float` | 3s | ease-in-out | Subtle infinite floating motion |
| `transition-smooth` | 0.3s | cubic-bezier(0.4, 0, 0.2, 1) | Standard UI interactions |
| `transition-cinematic` | 0.4s | cubic-bezier(0.25, 0.46, 0.45, 0.94) | Page transitions, major state changes |

**Scroll Choreography**: Fade-up on visible. Never jarring. Parallax only on hero. Hover animations magnetic (slight scale, shadow lift).

## Signature Detail

**Gold underlines**: Section headings and accent text feature animated gold underlines. On hover, `opacity` fades in to 100% from 40%. Creates premium, editorial feel.

## Anti-Patterns Avoided

✗ Generic blue CTAs → ✓ Gold accent throughout
✗ Bouncy animations → ✓ Smooth cubic-bezier easing
✗ Transparent overlays → ✓ Solid color overlays with dark tone
✗ Rainbow palette → ✓ Minimal 3-color system (background, foreground, accent gold)
✗ Default shadows → ✓ Custom luxury shadows (0 10px 40px)

## Constraints

- **Dark mode only**: Cinematic luxury demands consistent night aesthetic
- **No animation on load**: Only scroll-triggered or interaction-based
- **Minimal borders**: Used sparingly for structure, never for decoration
- **Gold used sparingly**: Accent only, not background or large surfaces
- **Performance**: Lazy-load images, optimize CSS animations, minimal repaints

## Exports

- `src/frontend/src/index.css`: OKLCH tokens, @font-face, animation keyframes, utility classes
- `src/frontend/tailwind.config.js`: fontFamily, custom animations (if needed)
- Fonts: CormorantGaramond, Inter, GeistMono (woff2 format in `src/frontend/public/assets/fonts/`)
