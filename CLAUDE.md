# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Philosophy

- **Theme setup first**: Before building any UI, configure the color scheme in `app/globals.css` (OKLCH variables in `:root` and `.dark`)
- **Always support both modes**: Implement light AND dark mode with system detection (`prefers-color-scheme`)
- **Use `/frontend-design` skill**: For all UI work, invoke the frontend-design skill which follows this design system
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

# Production build
bun run build
bun start

# Linting
bun lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router (React 19)
- **Database**: MongoDB with Mongoose ODM
- **Auth**: JWT (bcryptjs + jsonwebtoken) with 7-day token expiration
- **Styling**: Tailwind CSS 4 with OKLCH color system
- **UI**: 45+ shadcn/ui components (New York style) in `components/ui/` - use creatively, combine, and customize freely
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
components/ui/          # shadcn/ui components - use creatively, combine and customize
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
Always use `@/` imports:
```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

### Environment Variables
Required in `.env.local`:
- `MONGODB_URI` - MongoDB connection string
- `DB_NAME` - Database name
- `JWT_SECRET` - 32+ character secret for JWT
- `NEXT_PUBLIC_API_URL` - API base URL

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

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--primary` | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` | Main buttons, links |
| `--background` | `oklch(1 0 0)` | `oklch(0.145 0 0)` | Page background |
| `--card` | `oklch(1 0 0)` | `oklch(0.205 0 0)` | Card surfaces |
| `--muted` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Subtle backgrounds |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Errors, danger |

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

### Button Styles

**Primary (Main CTA)**:
```tsx
<Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-105">
  Get Started <ArrowRight className="ml-2 h-5 w-5" />
</Button>
```

**Secondary (Outline)**:
```tsx
<Button variant="outline" className="border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-200">
  Sign In
</Button>
```

**Ghost on gradient background**:
```tsx
<Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
  Sign In
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
