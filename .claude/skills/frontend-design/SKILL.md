---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics. (project)
---

This skill guides creation of distinctive, production-grade Next.js frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **React**: Version 19 (Server Components by default)
- **Styling**: Tailwind CSS 4 with OKLCH CSS variables
- **UI Library**: shadcn/ui components in `components/ui/` (DO NOT modify these)
- **Animations**: Motion library (`motion/react`) for React animations
- **Fonts**: IBM Plex Sans Arabic (Arabic) + IBM Plex Sans (English) as defaults
- **Language**: Arabic-first with RTL support (`dir="rtl"`)

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (performance, accessibility, RTL support).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Next.js Implementation Patterns

### Component Architecture
```tsx
// Server Component (default) - no directive needed
export default function ServerComponent() {
  return <div>Server-rendered content</div>;
}

// Client Component - add directive for hooks/events/browser APIs
"use client";
import { useState } from "react";
export default function ClientComponent() {
  const [state, setState] = useState(false);
  return <button onClick={() => setState(!state)}>Toggle</button>;
}
```

### Path Aliases
Always use path aliases, never relative imports:
```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
```

### Conditional Classes
Use `cn()` utility for conditional Tailwind classes:
```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "primary" ? "primary-classes" : "secondary-classes"
)} />
```

### Motion Animations
Use Motion library for React animations:
```tsx
"use client";
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  Animated content
</motion.div>

// Staggered children
<motion.ul
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {items.map(item => (
    <motion.li
      key={item.id}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
      }}
    />
  ))}
</motion.ul>
```

### RTL & Arabic Support
```tsx
// Always consider RTL for Arabic content
<div dir="rtl" className="text-right">
  <h1 className="font-arabic">عنوان بالعربية</h1>
</div>

// Use logical properties for RTL-safe spacing
<div className="ps-4 pe-2 ms-auto me-0">
  {/* ps = padding-inline-start, pe = padding-inline-end */}
  {/* ms = margin-inline-start, me = margin-inline-end */}
</div>
```

### Theming with OKLCH
Use semantic color variables from `globals.css`:
```tsx
// Use semantic colors, not arbitrary values
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground hover:bg-primary/90">
    Action
  </button>
  <p className="text-muted-foreground">Secondary text</p>
</div>
```

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. For Arabic, consider Tajawal, Noto Kufi Arabic, Almarai, or Cairo beyond the default IBM Plex Sans Arabic. Pair a distinctive display font with a refined body font. Load via `next/font` for optimization.
- **Color & Theme**: Commit to a cohesive aesthetic. Extend OKLCH CSS variables in `globals.css`. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use Motion library for React animations. Focus on high-impact moments: one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions. Use scroll-triggered animations and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

## Loading Fonts

```tsx
// app/layout.tsx or component file
import { IBM_Plex_Sans_Arabic, IBM_Plex_Sans } from "next/font/google";

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

// Apply in layout
<html className={`${plexArabic.variable} ${plexSans.variable}`}>
```

## File Structure

```
app/
├── layout.tsx          # Root layout with fonts, providers
├── page.tsx            # Homepage (Server Component)
├── globals.css         # OKLCH theme variables, global styles
└── (pages)/            # Route groups for pages

components/
├── ui/                 # shadcn components (IMMUTABLE)
└── [feature]/          # Custom components by feature
```

## Key Reminders

1. **Server Components by default** - only add `"use client"` when needed
2. **Use shadcn/ui components** from `components/ui/` - don't recreate them
3. **Path aliases always** - `@/components`, `@/lib`, `@/hooks`
4. **RTL-aware styling** - use logical properties (ps, pe, ms, me)
5. **OKLCH theming** - extend `globals.css` variables for custom colors
6. **Motion for animations** - import from `motion/react`

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
