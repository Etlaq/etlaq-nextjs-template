---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

**IMPORTANT**: Before implementing ANY UI, read `CLAUDE.md` for the complete Design System and Animation Specifications. The design system defines fonts, colors, spacing, shadows, button styles, hover states, and animation patterns specific to this project.

## Pre-Implementation Checklist

1. **Read CLAUDE.md** - Contains the authoritative design system for this project
2. **Configure theme** - Set up colors in `app/globals.css` (OKLCH variables in `:root` and `.dark`)
3. **Identify mode** - Light mode default (neutral-50 backgrounds) or dark mode
4. **Plan animations** - Reference Animation Specifications in CLAUDE.md

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Project Design System (from CLAUDE.md)

### Fonts
- **Primary**: Geist Sans (`--font-geist-sans`)
- **Monospace**: Geist Mono (`--font-geist-mono`)
- **Arabic projects**: IBM Plex Sans Arabic

### Color System (OKLCH)
Configure in `app/globals.css`:
- `--primary`, `--background`, `--card`, `--muted`, `--destructive`
- **Accent palette**: emerald, teal, cyan, orange, amber
- Both `:root` (light) and `.dark` selectors

### Spacing & Layout
```
Section padding: py-20 (80px)
Container: max-w-7xl with px-4 sm:px-6 lg:px-8
Card gaps: gap-6 (24px)
Component spacing: space-y-4 or space-y-8
```

### Shadows
```css
shadow-sm    /* subtle */
shadow-md    /* default cards */
shadow-lg    /* hover states */
shadow-xl    /* prominent CTAs */
shadow-2xl   /* hero buttons hover */
```
Colored shadows: `shadow-emerald-500/25`

### Border Radius
```css
rounded-md   /* buttons, inputs */
rounded-lg   /* cards */
rounded-xl   /* icon containers */
rounded-2xl  /* feature cards */
rounded-full /* badges, avatars */
```

### Icon Sets
- **UI Icons**: `lucide-react`
- **Extended Icons**: `@tabler/icons-react`
- Sizes: `h-4 w-4` (small), `h-5 w-5` (default), `h-6 w-6` (cards), `h-8 w-8` (hero)

## Button Patterns

**Primary CTA**:
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

**Ghost on gradient**:
```tsx
<Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
  Sign In
</Button>
```

## Animation Patterns (from CLAUDE.md)

### Scroll Animations
Fade in, slide in, blur in - element by element. Use `animation-fill-mode: both` (not forwards). Don't start at `opacity: 0`.

```css
@keyframes fadeSlideIn {
  from {
    opacity: 0.01;
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
  animation: fadeSlideIn 0.6s ease-out both;
}
```

### Border Beam (Pill Buttons)
1px animated border on hover - see CLAUDE.md for full implementation.

### Marquee (Logos/Testimonials)
Infinite loop with alpha mask fade on edges:
```css
.marquee-container {
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
```

### Card Flashlight Effect
Subtle glow following mouse position on background and border.

### Transitions
```css
duration-200  /* buttons, quick interactions */
duration-300  /* cards, hover lifts */
duration-500  /* page transitions */
```

## Hover States
- **Buttons**: `hover:scale-105` + color shift + shadow increase
- **Cards**: `hover:shadow-xl hover:-translate-y-1 transition-all duration-300`
- **Links**: `hover:text-primary` or underline
- **Icon containers**: subtle background color shift

## Responsive Breakpoints
```
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Focus on high-impact moments: one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial), cliched color schemes (purple gradients on white), predictable layouts, and cookie-cutter design.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations. Minimalist designs need restraint, precision, and careful attention to spacing, typography, and subtle details.

## Component Library

Use `components/ui/` creatively - combine, nest, and customize freely:
- 45+ shadcn/ui components available
- Combine components for unique patterns
- Override styles with className
- Add animations with tw-animate-css or custom keyframes

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
