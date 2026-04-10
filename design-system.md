# LESGOPRO Design System
**Learner's Group of Programmers — Mandaue City College**

You are building a **school organization web app** for LESGOPRO with a **collegiate, authoritative, and community-driven** visual identity. The palette is drawn directly from the organization seal: crimson red, antique gold, laurel green, and warm cream.

---

## Final UI Brief (Completed Template)

You are building a school organization web app with a collegiate, authoritative, and community-driven visual identity.

## Color Palette
- Primary: `#8B1A1A` — used for main actions, key UI elements
- Secondary: `#C9972A` — used for supporting elements, secondary buttons
- Background: `#F5F0E8` — main canvas color
- Surface: `#FFFFFF` — cards, modals, elevated elements
- Text Primary: `#1A1008` — headings, body copy
- Text Secondary: `#5A4A38` — captions, helper text, placeholders
- Border: `rgba(139,26,26,0.12)` — dividers, input outlines
- Success: `#2D6A3F`
- Warning: `#C9972A`
- Error: `#8B1A1A`

## Typography
- Font Family: `Inter` (Google Fonts)
- Headings: bold-ish medium, tracking tight
- Body: regular weight
- Size Scale: 12 / 14 / 16 / 20 / 24 / 32 / 40 / 48px

## Spacing Scale
Use a 4px base unit. Common values: 4, 8, 12, 16, 24, 32, 48, 64px.

## Border Radius
- Small (inputs, chips): 6px
- Medium (cards, buttons): 12px
- Large (modals, containers): 16px
- Full (avatars, pills): 9999px

## Shadows
- Subtle: `0 1px 3px rgba(26, 16, 8, 0.06)`
- Medium: `0 4px 16px rgba(26, 16, 8, 0.10)`
- Strong: `0 8px 32px rgba(26, 16, 8, 0.16)`

## Component Patterns
- Buttons: 40px default height (`h-10`), 48px large (`h-12`), horizontal padding from spacing scale (`px-4` / `px-6`), primary hover shifts to `primary-light`, outlines use primary border and subtle tinted hover.
- Inputs: 40px min height, 12-16px horizontal padding (`px-3` or `px-4`), cream-tinted surface, primary border focus + ring (`focus:ring-primary/10`).
- Cards: white surface, `rounded-xl`, `border-primary/10`, 16-24px padding (`p-4` / `p-6`), subtle shadow.

## Rules
1. Never introduce colors outside this palette.
2. Always use the spacing scale, no arbitrary spacing values.
3. Maintain consistent border radius per element type.
4. When in doubt, add more whitespace.

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#8B1A1A` | Main actions, navbar, headers, focus rings |
| `primary-dark` | `#4A1A1A` | Footer, deep backgrounds, hover states |
| `primary-light` | `#C0302A` | Hover on primary buttons |
| `secondary` | `#C9972A` | CTAs, highlights, gold accents, active nav |
| `secondary-dark` | `#7A5500` | Text on gold backgrounds |
| `secondary-light` | `#F5D98A` | Subtle gold tints |
| `accent` | `#2D6A3F` | Laurel / success states, active badges |
| `accent-light` | `#C8E6D0` | Text on green backgrounds |
| `background` | `#F5F0E8` | Main canvas — warm cream, not pure white |
| `surface` | `#FFFFFF` | Cards, modals, elevated elements |
| `surface-tinted` | `#FDFAF5` | Inputs, subtle panels |
| `text-primary` | `#1A1008` | Headings, body copy |
| `text-secondary` | `#5A4A38` | Supporting body text |
| `text-muted` | `#8B7A6A` | Captions, helper text, placeholders |
| `border` | `rgba(139,26,26,0.12)` | Cards, inputs, dividers |
| `border-focus` | `#8B1A1A` | Input focus outline |
| `success` | `#2D6A3F` | Confirmations, active status |
| `warning` | `#C9972A` | Deadlines, pending states |
| `error` | `#8B1A1A` | Errors, destructive actions |
| `info` | `#1E5096` | Informational badges |

### Tailwind CSS custom colors — `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B1A1A',
          dark:    '#4A1A1A',
          light:   '#C0302A',
        },
        secondary: {
          DEFAULT: '#C9972A',
          dark:    '#7A5500',
          light:   '#F5D98A',
        },
        accent: {
          DEFAULT: '#2D6A3F',
          light:   '#C8E6D0',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          surface: '#FDFAF5',
        },
        ink: {
          900: '#1A1008',
          700: '#5A4A38',
          400: '#8B7A6A',
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## Typography

- **Font Family:** `Inter` (Google Fonts) — clean, modern, highly legible
- **Fallback:** `system-ui, sans-serif`

```ts
// next/font usage in layout.tsx
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
```

| Role | Size | Weight | Line Height | Class |
|---|---|---|---|---|
| Display | 48px | 500 | 1.1 | `text-5xl font-medium` |
| H1 | 36px | 500 | 1.2 | `text-4xl font-medium` |
| H2 | 24px | 500 | 1.3 | `text-2xl font-medium` |
| H3 | 18px | 500 | 1.4 | `text-lg font-medium` |
| Body | 15px | 400 | 1.7 | `text-[15px] leading-relaxed` |
| Small | 13px | 400 | 1.6 | `text-sm` |
| Caption | 12px | 400 | 1.5 | `text-xs` |
| Label | 11px | 500 | — | `text-[11px] font-medium tracking-widest uppercase` |

- Headings: tight tracking (`tracking-tight`)
- Section labels: wide tracking (`tracking-[1.5px]`), all caps, `text-primary`
- Body: regular weight, `text-ink-700`

---

## Spacing Scale

Base unit: **4px**

| Token | Value | Tailwind |
|---|---|---|
| xs | 4px | `p-1` |
| sm | 8px | `p-2` |
| md | 12px | `p-3` |
| base | 16px | `p-4` |
| lg | 24px | `p-6` |
| xl | 32px | `p-8` |
| 2xl | 48px | `p-12` |
| 3xl | 64px | `p-16` |

Use `gap-3` (12px) for component grids, `gap-4` (16px) for section grids.

---

## Border Radius

| Context | Value | Tailwind |
|---|---|---|
| Inputs, chips, small badges | 6px | `rounded-md` |
| Buttons | 8px | `rounded-lg` |
| Cards, panels | 12px | `rounded-xl` |
| Modals, large containers | 16px | `rounded-2xl` |
| Avatars, pill badges | 9999px | `rounded-full` |

---

## Shadows

```css
/* Subtle — default card elevation */
box-shadow: 0 1px 3px rgba(26, 16, 8, 0.06);

/* Medium — dropdowns, popovers */
box-shadow: 0 4px 16px rgba(26, 16, 8, 0.10);

/* Strong — modals */
box-shadow: 0 8px 32px rgba(26, 16, 8, 0.16);

/* Focus ring — inputs and interactive elements */
box-shadow: 0 0 0 3px rgba(139, 26, 26, 0.12);
```

---

## Component Patterns

### Navbar

```tsx
<nav className="bg-primary h-[60px] flex items-center justify-between px-8 border-b-[3px] border-secondary">
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary-dark text-xs font-medium">
      LGP
    </div>
    <div>
      <p className="text-cream text-base font-medium">LESGOPRO</p>
      <p className="text-secondary text-[11px]">Mandaue City College</p>
    </div>
  </div>
  <button className="bg-secondary text-primary-dark rounded-lg px-4 py-2 text-sm font-medium">
    Join Us
  </button>
</nav>
```

### Hero Section

```tsx
<section className="bg-primary-dark py-16 px-8 text-center">
  <span className="inline-block border border-secondary/50 bg-secondary/10 text-secondary rounded-full px-4 py-1 text-xs mb-5">
    Mandaue City College · Est. 2020
  </span>
  <h1 className="text-cream text-4xl font-medium mb-3">
    Learner's Group of <span className="text-secondary">Programmers</span>
  </h1>
  <p className="text-cream/60 text-[15px] max-w-md mx-auto mb-8 leading-relaxed">
    A community of passionate developers building skills and creating real-world impact.
  </p>
  <div className="flex gap-3 justify-center">
    <button className="bg-secondary text-primary-dark rounded-lg px-6 py-3 text-sm font-medium">
      Explore Projects
    </button>
    <button className="border border-cream/30 text-cream rounded-lg px-6 py-3 text-sm">
      View Events
    </button>
  </div>
</section>
```

### Card

```tsx
<div className="bg-white rounded-xl border border-primary/10 p-5 shadow-[0_1px_3px_rgba(26,16,8,0.06)]">
  {/* content */}
</div>
```

### Stat Card

```tsx
<div className="bg-white rounded-xl border border-primary/10 p-5 text-center">
  <p className="text-3xl font-medium text-primary">120+</p>
  <p className="text-xs text-ink-400 mt-1">Active Members</p>
</div>
```

### Buttons

```tsx
{/* Primary */}
<button className="bg-primary text-cream rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-light transition-colors">
  Primary
</button>

{/* Gold / Secondary */}
<button className="bg-secondary text-primary-dark rounded-lg px-5 py-2.5 text-sm font-medium hover:brightness-105 transition-all">
  Gold CTA
</button>

{/* Outline */}
<button className="border-[1.5px] border-primary text-primary rounded-lg px-5 py-2.5 text-sm hover:bg-primary/5 transition-colors">
  Outline
</button>
```

### Badges

```tsx
<span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">Officer</span>
<span className="bg-secondary/15 text-secondary-dark rounded-full px-3 py-1 text-xs font-medium">Lead</span>
<span className="bg-accent/12 text-accent rounded-full px-3 py-1 text-xs font-medium">Active</span>
```

### Form Input

```tsx
<input
  type="text"
  placeholder="Full name"
  className="w-full border border-primary/20 rounded-lg px-3 py-2.5 text-sm bg-cream-surface text-ink-900
             placeholder:text-ink-400
             focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
             transition-all"
/>
```

### Member Card

```tsx
<div className="bg-white rounded-xl border border-primary/10 p-4 flex items-center gap-3">
  <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-cream text-sm font-medium flex-shrink-0">
    JD
  </div>
  <div>
    <p className="text-sm font-medium text-ink-900">Juan dela Cruz</p>
    <p className="text-xs text-ink-400 mt-0.5">President · Full-Stack</p>
  </div>
  <span className="ml-auto bg-secondary/15 text-secondary-dark text-xs font-medium rounded-full px-3 py-1">Lead</span>
</div>
```

### Alert / Notification

```tsx
{/* Success */}
<div className="bg-accent/8 border-l-[3px] border-accent rounded-lg px-4 py-3 text-sm text-accent">
  Registration confirmed for DevFest 2025.
</div>

{/* Warning */}
<div className="bg-secondary/10 border-l-[3px] border-secondary rounded-lg px-4 py-3 text-sm text-secondary-dark">
  Submission deadline in 2 days.
</div>

{/* Error */}
<div className="bg-primary/7 border-l-[3px] border-primary rounded-lg px-4 py-3 text-sm text-primary-dark">
  Payment verification failed.
</div>
```

### Progress Bar

```tsx
<div>
  <div className="flex justify-between mb-1.5">
    <span className="text-sm text-ink-900">Web Development</span>
    <span className="text-sm text-ink-400">82%</span>
  </div>
  <div className="h-[7px] bg-primary/10 rounded-full overflow-hidden">
    <div className="h-full bg-primary rounded-full" style={{ width: '82%' }} />
  </div>
</div>
```

### Event Card

```tsx
<div className="bg-white rounded-xl border border-primary/10 overflow-hidden">
  <div className="bg-primary px-4 py-3">
    <p className="text-secondary text-[11px] font-medium mb-1">APR 25, 2025 · 9:00 AM</p>
    <p className="text-cream text-[15px] font-medium">DevFest MCC 2025</p>
  </div>
  <div className="px-4 py-3">
    <p className="text-sm text-ink-700 leading-relaxed">Annual hackathon for CS and IT students.</p>
  </div>
  <div className="px-4 py-2.5 border-t border-primary/8 flex justify-between items-center">
    <div className="flex gap-2">
      <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">Hackathon</span>
      <span className="bg-accent/12 text-accent rounded-full px-3 py-1 text-xs font-medium">Open</span>
    </div>
    <span className="text-xs text-ink-400">48 registered</span>
  </div>
</div>
```

---

## Iconography

Use [Lucide React](https://lucide.dev) for all icons.

```tsx
import { Code2, Users, Calendar, Award } from 'lucide-react'

// Standard icon size
<Code2 size={16} className="text-primary" />

// Nav / section icons
<Users size={20} className="text-secondary" />
```

---

## Section Label Pattern

Consistent section headers across all pages:

```tsx
<p className="text-[11px] font-medium tracking-[1.5px] uppercase text-primary mb-4">
  Organization at a glance
</p>
```

---

## Footer

```tsx
<footer className="bg-primary-dark py-8 px-8 text-center">
  <p className="text-secondary text-lg font-medium mb-1">LESGOPRO</p>
  <p className="text-cream/50 text-xs mb-5">Learner's Group of Programmers · Mandaue City College</p>
  <div className="flex gap-5 justify-center mb-5">
    {['Facebook', 'GitHub', 'Email', 'Events'].map(link => (
      <a key={link} href="#" className="text-cream/60 text-xs hover:text-cream transition-colors">{link}</a>
    ))}
  </div>
  <div className="border-t border-cream/10 pt-4 text-cream/30 text-[11px]">
    © 2025 LESGOPRO · Mandaue City College · All rights reserved.
  </div>
</footer>
```

---

## Design Principles

1. **Crimson leads.** `#8B1A1A` is the dominant color — use it for structural elements (nav, headers, borders).
2. **Gold accents.** `#C9972A` is reserved for calls-to-action, highlights, and active states — never overuse it.
3. **Warm over white.** Use `#F5F0E8` (cream) as the page background, not pure white. Surfaces (cards) use white.
4. **Typography is hierarchy.** Use the section label pattern (small caps, wide tracking) consistently to orient users.
5. **Minimal decoration.** The seal has richness — the UI should be clean and let content breathe.
6. **Mobile-first grids.** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` pattern for stat and member grids.
