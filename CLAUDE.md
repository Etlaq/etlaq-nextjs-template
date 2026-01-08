# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Philosophy

- **Theme setup first**: Before building any UI, configure the color scheme in `app/globals.css` (OKLCH variables in `:root` and `.dark`)
- **Always support both modes**: Implement light AND dark mode with system detection (`prefers-color-scheme`)
- **Use `/frontend-design` skill**: For all UI work, invoke the frontend-design skill which follows this design system
- **Use HeroUI documentation**: Reference HeroUI React docs from the skill (`.claude/skills/heroui.md`) or the MCP server (`heroui-react`)
- Get things running ASAP - no need to test as it will take time (i.e. curl the homepage)
- Try to get things done as fast as possible
- Follow existing patterns in the codebase
- Use UI components creatively - combine, nest, and customize them freely

## Language & Localization (Arabic-First)

- **Default language**: Saudi Arabic (العربية) - always start with Arabic only
- **Additional languages**: Only add English or other translations if user explicitly requests
- **RTL by default**: Use `dir="rtl"` and `lang="ar-SA"` on root element
- **Fonts**: IBM Plex Sans Arabic as default; add IBM Plex Sans only when multilingual
- **Currency**: SAR (use `ar-SA` locale)
- **Phone format**: +966 validation
- **Work week**: Sunday-Thursday

## User Communication

- **Todo lists**: Write in Arabic, simple for non-technical users
- **Progress updates**: Keep concise and user-friendly

## Agents & Skills

Use specialized agents and skills for domain-specific tasks:

### Skills (invoke with `/skill-name`)
- **`/frontend-design`** - Create distinctive, production-grade UI with high design quality

### Agents (auto-selected by task type)
| Agent | Use For |
|-------|---------|
| `ui-designer` | UI components, design systems, visual aesthetics |
| `image-specialist` | Fetch culturally appropriate images from Pexels/Pixabay/Unsplash |
| `auth-specialist` | JWT authentication, protected routes, user management |
| `database-specialist` | MongoDB schemas, queries, aggregations |
| `api-integration-specialist` | External APIs, webhooks, file uploads |
| `ai-apps-developer` | AI features, OpenRouter API, streaming responses |
| `quality-specialist` | Code review, debugging, security audits, testing |

## Commands

```bash
# Development (uses Turbopack)
bun dev

# Development with react-grab visual editor
bun dev:grab

# Production build
bun run build
bun start

# Linting
bun lint

# HeroUI is already installed - import components from @heroui/react
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router (React 19)
- **Database**: MongoDB with Mongoose ODM
- **Auth**: JWT (bcryptjs + jsonwebtoken) with 7-day token expiration
- **Styling**: Tailwind CSS 4 with OKLCH color system
- **UI**: HeroUI v3 (Beta) - compound components with Tailwind CSS v4
- **Animations**: Motion library (`motion/react`)

### Project Structure
```
app/                    # Next.js App Router
├── api/auth/           # Auth endpoints (login, register, me)
├── api/protected/      # Protected API routes
├── login/              # Login page
├── register/           # Registration page
└── layout.tsx          # Root layout with AuthProvider

lib/
├── auth.ts             # JWT utilities (hash, verify, generate tokens)
├── middleware.ts       # withAuth() HOF for protected routes
├── mongodb.ts          # Mongoose connection with pooling
└── utils.ts            # cn() utility for class merging

models/                 # Mongoose schemas
contexts/AuthContext.tsx  # Client-side auth state
# UI components from @heroui/react - no local component files needed
```

### Authentication Flow

**Server-side** (API routes):
```tsx
import { withAuth } from '@/lib/middleware';

export const GET = withAuth(async (req, userId) => {
  // userId extracted from JWT
  return Response.json({ data: 'protected' });
});
```

**Client-side**:
```tsx
'use client';
import { useAuth } from '@/contexts/AuthContext';

const { user, login, logout, loading } = useAuth();
```

### Path Aliases
Always use `@/` imports for local files and `@heroui/react` for UI components:
```tsx
import { Button, Card, Alert } from "@heroui/react";
import { cn } from "@/lib/utils";
```

### Environment Variables
Required in `.env.local`:
- `MONGODB_URI` - MongoDB connection string
- `DB_NAME` - Database name
- `JWT_SECRET` - 32+ character secret for JWT
- `NEXT_PUBLIC_API_URL` - API base URL

### Pre-configured Image Hostnames
Images from these sources work out-of-the-box with `next/image`:
- **Stock photos**: Pexels, Unsplash, Pixabay
- **CDNs**: Cloudinary, Imgur
- **Avatars**: UI Avatars, Gravatar
- **Placeholders**: Picsum, Placehold.co

### Component Patterns

**Server Components** (default - no directive needed):
```tsx
export default function Page() {
  return <div>Server-rendered</div>;
}
```

**Client Components** (add directive for hooks/events):
```tsx
'use client';
import { useState } from 'react';
```

**Conditional Classes** with cn():
```tsx
<div className={cn("base", isActive && "active")} />
```

**RTL-safe Spacing** (use logical properties):
```tsx
<div className="ps-4 pe-2 ms-auto me-0">
  {/* ps = padding-inline-start, pe = padding-inline-end */}
</div>
```

### Theming
Uses OKLCH color variables in `globals.css`. Use semantic colors:
```tsx
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground" />
  <p className="text-muted-foreground" />
</div>
```

---

## Design System

### Default Mode
**Light mode** - Hero uses `bg-gradient-to-b from-neutral-50 via-white to-neutral-50` with white cards

### Fonts
- **Primary**: Geist Sans (`--font-geist-sans`) - headings, body text
- **Monospace**: Geist Mono (`--font-geist-mono`) - code, IDs
- **Arabic projects**: Replace with IBM Plex Sans Arabic

### Color Palette (OKLCH)
Configure in `app/globals.css` `:root` (light) and `.dark` selectors:

**IMPORTANT: Avoid pure black and pure white**
- Pure black (`oklch(0 0 0)`) causes eye strain and harsh contrast
- Use soft black: `oklch(0.13 0 0)` (~#1E1E1E) for dark backgrounds
- Use off-white: `oklch(0.92 0 0)` for text on dark backgrounds
- Use charcoal: `oklch(0.15 0 0)` for text on light backgrounds

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--primary` | `oklch(0.55 0.22 280)` | `oklch(0.7 0.2 280)` | Main buttons, links |
| `--background` | `oklch(0.985 0 0)` | `oklch(0.13 0 0)` | Page background |
| `--foreground` | `oklch(0.15 0 0)` | `oklch(0.92 0 0)` | Text color |
| `--card` | `oklch(0.995 0 0)` | `oklch(0.16 0 0)` | Card surfaces |
| `--muted` | `oklch(0.96 0 0)` | `oklch(0.2 0 0)` | Subtle backgrounds |
| `--destructive` | `oklch(0.55 0.2 25)` | `oklch(0.65 0.2 25)` | Errors, danger |

**Accent colors** (from hero): emerald, teal, cyan, orange, amber

### Spacing Scale
```
4px (p-1) | 8px (p-2) | 12px (p-3) | 16px (p-4) | 24px (p-6) | 32px (p-8) | 48px (p-12) | 64px (p-16) | 80px (p-20)
```
- Section padding: `py-20` (80px)
- Container max-width: `max-w-7xl` with `px-4 sm:px-6 lg:px-8`
- Card gaps: `gap-6` (24px)
- Component spacing: `space-y-4` or `space-y-8`

### Shadows
```css
shadow-sm    /* subtle card elevation */
shadow-md    /* default card */
shadow-lg    /* hover states, elevated cards */
shadow-xl    /* prominent CTAs, modals */
shadow-2xl   /* hero buttons on hover */
```
**Colored shadows**: `shadow-emerald-500/25` (25% opacity tinted)

### Border Radius
```css
--radius: 0.625rem (10px)
rounded-md   /* buttons, inputs */
rounded-lg   /* cards */
rounded-xl   /* icon containers */
rounded-2xl  /* feature cards, steps */
rounded-full /* badges, avatars, number indicators */
```

### Icon Sets
- **UI Icons**: `lucide-react` - Zap, Shield, Layers, Sparkles, ArrowRight, CheckCircle2, Palette, Rocket
- **Extended Icons**: `@tabler/icons-react` - for sidebar, navigation
- Icon sizes: `h-4 w-4` (small), `h-5 w-5` (default), `h-6 w-6` (cards), `h-8 w-8` (hero features)

### Button Styles (HeroUI)

**Primary (Main CTA)**:
```tsx
import { Button } from '@heroui/react';

<Button variant="primary" size="lg" className="shadow-lg">
  Get Started
</Button>
```

**Secondary**:
```tsx
<Button variant="secondary">Edit</Button>
```

**Tertiary (Dismissive)**:
```tsx
<Button variant="tertiary">Cancel</Button>
```

**Danger**:
```tsx
<Button variant="danger">Delete</Button>
```

**Custom styling** (with Tailwind):
```tsx
<Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
  Custom Gradient
</Button>
```

### Hover States
- **Buttons**: `hover:scale-105` + color shift + shadow increase
- **Cards**: `hover:shadow-xl hover:-translate-y-1 transition-all duration-300`
- **Links**: `hover:text-primary` or underline
- **Icon containers**: subtle background color shift

### Adaptive Layout Breakpoints
```
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

**Responsive patterns**:
```tsx
/* Stacking */
<div className="flex flex-col sm:flex-row gap-4">

/* Grid columns */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

/* Text sizing */
<h1 className="text-4xl sm:text-5xl md:text-6xl">
```

---

## Animation Specifications

### Animation Library
Uses `tw-animate-css` for Tailwind animations. For complex animations, add custom keyframes in `globals.css`.

### Scroll Animations (Intro Sections)
Animate elements when in view: **fade in, slide in, blur in** - element by element.

```css
/* In globals.css */
@keyframes fadeSlideIn {
  from {
    opacity: 0.01; /* Not 0 - avoids layout shift */
    transform: translateY(20px);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.animate-in-view {
  animation: fadeSlideIn 0.6s ease-out both; /* Use 'both' not 'forwards' */
}
```

**Stagger children** with increasing delays:
```tsx
<div style={{ animationDelay: '0ms' }} className="animate-in-view">First</div>
<div style={{ animationDelay: '100ms' }} className="animate-in-view">Second</div>
<div style={{ animationDelay: '200ms' }} className="animate-in-view">Third</div>
```

### Background Clip Animation
Column-by-column reveal using clip-path:
```css
@keyframes clipReveal {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
}

.clip-reveal {
  animation: clipReveal 1.2s ease-out both;
}
```

### Border Beam Animation (Pill Buttons)
1px animated border on hover:
```css
@keyframes borderBeam {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.border-beam {
  position: relative;
}
.border-beam::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(90deg, transparent, var(--primary), transparent);
  background-size: 200% 100%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: borderBeam 2s linear infinite;
  opacity: 0;
  transition: opacity 0.3s;
}
.border-beam:hover::before {
  opacity: 1;
}
```

### Text Animation (Letter by Letter)
Vertical clip slide down:
```css
@keyframes textSlideDown {
  from {
    clip-path: inset(0 0 100% 0);
    transform: translateY(-100%);
  }
  to {
    clip-path: inset(0 0 0 0);
    transform: translateY(0);
  }
}

/* Apply per-letter with staggered delays */
.text-slide-letter {
  display: inline-block;
  animation: textSlideDown 0.4s ease-out both;
}
```

### Marquee Animation (Logos/Testimonials)
Infinite loop with alpha mask:
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.marquee-container {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.marquee-track {
  display: flex;
  animation: marquee 30s linear infinite;
}
```

**Structure**: Duplicate content for seamless loop:
```tsx
<div className="marquee-container">
  <div className="marquee-track">
    {logos}{logos} {/* Duplicate for seamless loop */}
  </div>
</div>
```

### Card Rotation (Content Switching)
Rotate between cards with prev/next arrows:
```tsx
const [activeIndex, setActiveIndex] = useState(0);
const cards = [/* 3 cards */];

<div className="relative">
  <AnimatePresence mode="wait">
    <motion.div
      key={activeIndex}
      initial={{ opacity: 0, rotateY: -15 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: 15 }}
      transition={{ duration: 0.4 }}
    >
      {cards[activeIndex]}
    </motion.div>
  </AnimatePresence>
  <button onClick={() => setActiveIndex(prev => (prev - 1 + 3) % 3)}>←</button>
  <button onClick={() => setActiveIndex(prev => (prev + 1) % 3)}>→</button>
</div>
```

### Flashlight Effect (Cards)
Subtle glow following mouse position:
```tsx
const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

<div
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }}
  style={{
    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)`,
  }}
  className="relative"
>
  {/* Card content */}
  <div
    className="absolute inset-0 rounded-lg pointer-events-none"
    style={{
      background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1), transparent 40%)`,
      mask: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
      maskComposite: 'exclude',
      padding: '1px',
    }}
  />
</div>
```

### Transition Defaults
```css
transition-all duration-200  /* buttons, quick interactions */
transition-all duration-300  /* cards, hover lifts */
transition-all duration-500  /* page transitions, large elements */
```

### Animation Timing
- **Stagger delay**: 100ms between siblings
- **Scroll trigger**: Use Intersection Observer with `threshold: 0.2`
- **Easing**: `ease-out` for entrances, `ease-in-out` for loops
- **Easing (scroll)**: `cubic-bezier(0.16, 1, 0.3, 1)` for smooth scroll-triggered animations

---

## Impressive Button Design

### Border Beam Animation (Hover Effect)
Add a 1px animated gradient border around pill-shaped buttons on hover:
```tsx
<Link href="/register" className="group">
  <div className="relative">
    {/* Border beam container - visible on hover */}
    <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-beam" />
    <Button
      size="lg"
      variant="primary"
      className="relative rounded-full px-10 py-6 bg-gradient-to-r from-primary via-primary/90 to-primary shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-100 overflow-hidden"
    >
      {/* Inner shine effect - sweeps across on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      <span className="relative z-10 flex items-center font-semibold text-base">
        Get Started
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </span>
    </Button>
  </div>
</Link>
```

### Secondary Button with Hover Border Beam
```tsx
<Link href="/login" className="group">
  <div className="relative">
    <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-beam" />
    <Button
      size="lg"
      variant="secondary"
      className="relative rounded-full px-10 py-6 bg-background/80 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 hover:scale-105 active:scale-100 overflow-hidden"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      <span className="relative z-10 flex items-center font-semibold text-base">Sign In</span>
    </Button>
  </div>
</Link>
```

### CSS for Border Beam
```css
@keyframes borderBeam {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.animate-border-beam {
  background: linear-gradient(90deg, transparent 0%, oklch(0.55 0.22 280) 25%, oklch(0.7 0.25 280) 50%, oklch(0.55 0.22 280) 75%, transparent 100%);
  background-size: 200% 100%;
  animation: borderBeam 2s linear infinite;
}
```

---

## Scroll Reveal Component

Use the `ScrollReveal` component for smooth scroll-triggered animations:

### Component Usage
```tsx
import { ScrollReveal } from '@/components/ScrollReveal';

<ScrollReveal>
  <h2>Fades in when scrolled into view</h2>
</ScrollReveal>

<ScrollReveal delay={100} direction="left">
  <p>Slides in from left with 100ms delay</p>
</ScrollReveal>

<ScrollReveal delay={200} direction="right" duration={500}>
  <Card>Custom duration animation</Card>
</ScrollReveal>
```

### Props
- `delay`: Delay in ms before animation starts (default: 0)
- `direction`: 'up' | 'down' | 'left' | 'right' | 'none' (default: 'up')
- `duration`: Animation duration in ms (default: 700)
- `once`: Only animate once when entering view (default: true)

### Animation Principles
- **Use opacity 0.01 not 0**: Prevents layout shift
- **Use 'both' fill mode**: Maintains final state
- **Use cubic-bezier easing**: `cubic-bezier(0.16, 1, 0.3, 1)` for smooth deceleration
- **Add willChange hint**: `willChange: 'opacity, transform, filter'` for performance
- **Combine effects**: Fade + slide + blur for rich entrance

### Stagger Pattern
```tsx
{items.map((item, index) => (
  <ScrollReveal key={item.id} delay={index * 100}>
    <Card>{item.content}</Card>
  </ScrollReveal>
))}
```

---

## Static to Animated Decorations

### Animated Grid Background
```css
@keyframes gridFade {
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.08; }
}

.bg-grid-animated {
  background-image:
    linear-gradient(to right, oklch(0.5 0 0 / 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, oklch(0.5 0 0 / 0.1) 1px, transparent 1px);
  background-size: 48px 48px;
  animation: gridFade 8s ease-in-out infinite;
}
```

### Sonar/Pulse Effect
```css
@keyframes sonar {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2.5); opacity: 0; }
}

.sonar {
  position: relative;
}
.sonar::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid oklch(0.55 0.22 280 / 0.5);
  animation: sonar 2s ease-out infinite;
}
```

### Floating Particles
```css
@keyframes particleFloat {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
  25% { transform: translate(10px, -20px) scale(1.1); opacity: 0.8; }
  50% { transform: translate(-5px, -40px) scale(0.9); opacity: 0.6; }
  75% { transform: translate(15px, -20px) scale(1.05); opacity: 0.7; }
}

.particle { animation: particleFloat 8s ease-in-out infinite; }
.particle-1 { animation-delay: 0s; }
.particle-2 { animation-delay: 1s; }
.particle-3 { animation-delay: 2s; }
```

### Twinkling Stars
```css
@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
```

### Morphing Blobs
```css
@keyframes morph {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
  75% { border-radius: 60% 40% 60% 30% / 70% 30% 50% 60%; }
}

.animate-morph { animation: morph 8s ease-in-out infinite; }
```

### Orbiting Rings
```css
.animate-spin-slow { animation: spin 20s linear infinite; }
.animate-spin-reverse { animation: spin 25s linear infinite reverse; }
```

---

## Layout Details for Distinction

### Container Lines (Vertical Edges)
Add subtle vertical lines on container edges for upscale feel:
```css
.container-lines {
  position: relative;
}

.container-lines::before,
.container-lines::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, transparent 0%, oklch(0.5 0 0 / 0.15) 10%, oklch(0.5 0 0 / 0.15) 90%, transparent 100%);
}

.container-lines::before { left: 0; }
.container-lines::after { right: 0; }
```

### Number Details (01, 02, 03)
Stylized section indicators:
```css
.number-detail {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: oklch(0.5 0 0);
  text-transform: uppercase;
}
```

Usage:
```tsx
<span className="number-detail inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
  01 / Features
</span>
```

### Upscale Typography
Use Newsreader font for large, elegant headings:
```css
.heading-display {
  font-family: var(--font-newsreader), Georgia, serif;
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.heading-tall {
  font-family: var(--font-newsreader), Georgia, serif;
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.15;
  font-style: italic;
}
```

Usage:
```tsx
<h1 className="heading-display text-6xl sm:text-7xl md:text-8xl">
  <span className="text-foreground">{t('أطلق', 'Launch')}</span>
  <span className="heading-tall block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
    {t('رؤيتك', 'Your Vision')}
  </span>
  <span className="text-foreground">{t('للعالم', 'Today')}</span>
</h1>
```

---

## Card Hover Effects

### Lift + Glow
```css
.card-hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px oklch(0 0 0 / 0.1);
}

.card-hover-glow {
  transition: box-shadow 0.3s ease;
}
.card-hover-glow:hover {
  box-shadow: 0 0 30px oklch(0.55 0.22 280 / 0.2);
}
```

### Gradient Overlay on Hover
```tsx
<Card className="group overflow-hidden relative">
  {/* Hover gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  <Card.Content className="relative">{/* content */}</Card.Content>
</Card>
```

---

## Multilingual Implementation

### Translation Helper Pattern
Create a `LanguageContext` with a simple `t(arabic, english)` translation function:

```tsx
// contexts/LanguageContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (ar: string, en: string) => string;
  isArabic: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
      setLanguageState(savedLang);
      updateDocumentDirection(savedLang);
    }
  }, []);

  const updateDocumentDirection = (lang: Language) => {
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar-SA');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    updateDocumentDirection(lang);
  };

  const t = (ar: string, en: string) => language === 'ar' ? ar : en;

  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isArabic: language === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
```

### Usage in Components
```tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';

function MyComponent() {
  const { t, isArabic } = useLanguage();

  // Use RTL-aware arrow icons
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div>
      <h1>{t('مرحباً', 'Hello')}</h1>
      <p>{t('مرحباً بك في الموقع', 'Welcome to the site')}</p>
      <button>
        {t('ابدأ الآن', 'Get Started')}
        <ArrowIcon className={isArabic ? 'me-2' : 'ms-2'} />
      </button>
    </div>
  );
}
```

### Translation in Arrays
```tsx
const features = [
  {
    titleAr: 'سرعة البرق',
    titleEn: 'Lightning Fast',
    descAr: 'محسّن للسرعة',
    descEn: 'Optimized for speed',
  },
  // ...more items
];

{features.map((feature) => (
  <Card key={feature.titleEn}>
    <Card.Title>{t(feature.titleAr, feature.titleEn)}</Card.Title>
    <p>{t(feature.descAr, feature.descEn)}</p>
  </Card>
))}
```

### Language-Specific Fonts (CSS)
Set up font switching in `globals.css`:

```css
/* English mode - lighter weights */
html[lang="en"] {
  font-family: var(--font-geist-sans), system-ui, sans-serif;
}

html[lang="en"] body {
  font-weight: 400;
}

html[lang="en"] .font-serif,
html[lang="en"] .heading-display,
html[lang="en"] .heading-tall {
  font-family: var(--font-newsreader), Georgia, serif;
  letter-spacing: -0.02em;
}

html[lang="en"] .heading-display { font-weight: 500; }
html[lang="en"] .heading-tall { font-weight: 400; }

/* Arabic mode - use one font family throughout */
html[lang="ar-SA"],
html[lang="ar-SA"] body,
html[lang="ar-SA"] * {
  font-family: var(--font-sans-arabic), system-ui, sans-serif;
}

html[lang="ar-SA"] .heading-display { font-weight: 600; }
html[lang="ar-SA"] .heading-tall { font-weight: 500; }
```

### RTL-Safe CSS Classes
Use logical properties instead of directional ones:
- `start/end` instead of `left/right`
- `ps/pe` instead of `pl/pr` (padding-inline-start/end)
- `ms/me` instead of `ml/mr` (margin-inline-start/end)

```tsx
// Good - RTL-safe
<div className="ps-4 pe-2 ms-auto me-0 start-6 end-6">

// Bad - will break in RTL
<div className="pl-4 pr-2 ml-auto mr-0 left-6 right-6">
```

### Language Toggle Component
```tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@heroui/react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="secondary"
      size="sm"
      onPress={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
      className="rounded-full w-10 h-10 p-0 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
      aria-label={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
    >
      <span className="text-xs font-semibold">
        {language === 'ar' ? 'EN' : 'ع'}
      </span>
    </Button>
  );
}
```

### Toggle Button Visibility
Ensure toggle buttons (theme, language) are always visible:
```tsx
// Use solid background with border, not transparent/subtle colors
className="bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm"

// Not subtle colors that blend in
className="bg-primary/5 border border-primary/10" // Too subtle!
```
