# AGENTS.md

Quick reference for Claude Code subagents. See `CLAUDE.md` for full guidelines.

## Commands
```bash
bun dev          # Dev server (Turbopack)
bun run build    # Production build
bun lint         # ESLint
```

## Stack
Next.js 16 • React 19 • TypeScript • Tailwind CSS 4 • HeroUI v3 • MongoDB/Mongoose

## Critical Rules

1. **Read before edit** - Never modify files without reading them first
2. **Semantic colors only** - Use `bg-background`, `text-foreground`, never `bg-white`, `text-black`
3. **RTL-safe classes** - Use `ps-`, `pe-`, `ms-`, `me-`, `start`, `end`
4. **HeroUI variants** - Use `variant="primary"`, not inline color overrides
5. **Small components** - Split large files, maximize reusability

## HeroUI v3 Button Variants
`primary` | `secondary` | `tertiary` | `ghost` | `danger` | `danger-soft`

## Language Context
```tsx
const { t, isArabic } = useLanguage();
<h1>{t('مرحبا', 'Hello')}</h1>
```

## File Structure
```
app/page.tsx, layout.tsx, globals.css
components/ThemeToggle, LanguageToggle, ScrollReveal
contexts/LanguageContext.tsx
lib/mongodb.ts, utils.ts
```

## Code Style
- Absolute imports: `@/lib/x`, `@/components/x`
- No `any` types - use proper TypeScript
- Client components: `'use client'` at top
- Error handling: try/catch with console.error
