# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

This is the **etlaq-nextjs-template** — a template project that runs inside E2B sandboxes for the Etlaq Studio platform. Users describe websites in natural language via Studio2, and Claude builds them by writing code into this template. It is Arabic-first, RTL-default, and bilingual (Arabic/English).

## Commands

```bash
bun dev              # Dev server with Turbopack
bun run build        # Production build
bun lint             # oxlint
bun lint:fix         # Auto-fix lint issues
```

No test framework is configured.

## Stack

- **Next.js 16** (App Router) with **React 19** and Turbopack
- **Tailwind CSS 4** with OKLCH color tokens
- **shadcn/ui** (new-york style, `bunx shadcn@latest add <name>`)
- **MongoDB** + Mongoose, **JWT** auth (bcryptjs + jsonwebtoken)
- **Zod 4** validation, **React Hook Form**, **Sonner** toasts
- **Framer Motion** + CSS animations (globals.css has a rich animation library)
- **Icons**: Lucide React + Tabler Icons

## Architecture

```
app/
  layout.tsx          # Root: fonts, providers (ThemeProvider > LanguageProvider > Toaster)
  page.tsx            # Landing page
  globals.css         # OKLCH theme tokens, 30+ animation classes, glassmorphism utilities
  error.tsx, loading.tsx
  api/                # API routes (added as needed)
components/
  ui/                 # shadcn/ui primitives (50+ components)
  ThemeToggle.tsx, LanguageToggle.tsx
contexts/
  LanguageContext.tsx  # useLanguage() → { t, isArabic, dir, lang, setLanguage }
  ThemeContext.tsx     # useTheme() → { theme, resolvedTheme, isDark, setTheme, toggleTheme }
lib/
  mongodb.ts          # Cached Mongoose connection singleton
  utils.ts            # cn() class merge helper
  env.ts              # Zod-validated env vars (server + client)
```

### Provider Nesting (layout.tsx)

```
<html lang="ar-SA" dir="rtl" suppressHydrationWarning>
  <head> (inline script for flash-free theme/lang init from localStorage) </head>
  <ThemeProvider>
    <LanguageProvider>
      {children}
      <Toaster />
    </LanguageProvider>
  </ThemeProvider>
</html>
```

### Fonts

Four font families loaded in layout.tsx via `next/font/google`:
- `--font-geist-sans` (English body), `--font-newsreader` (English serif headings)
- `--font-geist-mono` (code), `--font-sans-arabic` / IBM Plex Sans Arabic (Arabic, default)

Language-specific font switching is handled via `html[lang]` selectors in globals.css.

### Theme System

Dark mode via `.dark` class on `<html>`. Colors defined as OKLCH CSS variables in `:root` and `.dark`. Purple primary (`oklch(0.55 0.22 280)` light / `oklch(0.7 0.2 280)` dark). Glassmorphism tokens: `--glass-bg`, `--glass-border`, `--glass-shadow`.

### Environment Variables (lib/env.ts)

Required: `MONGODB_URI`, `DB_NAME`, `JWT_SECRET` (min 32 chars). Optional: `CLOUDINARY_*`, `OPENROUTER_API_KEY`, `NEXT_PUBLIC_API_URL`.

## Critical Rules

1. **Semantic colors only** — Use `bg-background`, `text-foreground`, `text-muted-foreground` (never `bg-white`, `text-black`)
2. **RTL-safe classes** — Use `ps-`/`pe-`/`ms-`/`me-`/`start-`/`end-` (never `pl-`/`pr-`/`ml-`/`mr-`/`left-`/`right-`)
3. **Arabic-first content** — Default `lang="ar-SA"`, `dir="rtl"`. Always provide both Arabic and English text via `t('عربي', 'English')`
4. **No `any` types** — Strict TypeScript
5. **No code comments** — Write self-documenting code
6. **Import order** — React/Next → third-party → `@/` aliases → relative

## Key Patterns

### Translation

```tsx
const { t, isArabic } = useLanguage();
<h1>{t('مرحباً', 'Hello')}</h1>
const Arrow = isArabic ? ArrowLeft : ArrowRight;
```

### API Routes

```tsx
import connectDB from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  await connectDB();
  const data = await request.json();
  return NextResponse.json({ success: true, data }, { status: 201 });
}
```

### Available CSS Animation Classes (globals.css)

Scroll reveals: `animate-in-view`, `animate-in-view-left`, `animate-in-view-right`, `animate-scale-in` with `delay-100` through `delay-800`.

Effects: `animate-float`, `animate-float-slow`, `animate-gradient`, `animate-morph`, `animate-twinkle`, `animate-sparkle`, `animate-wave`, `animate-marquee`, `shimmer`, `glow-pulse`, `text-glow`, `animate-spin-slow`, `animate-spin-reverse`, `animate-orbit`, `cursor-blink`, `animate-text-gradient`, `animate-border-beam`.

Cards: `glass`, `glass-card`, `glass-card-hover`, `card-hover-lift`, `card-hover-glow`, `card-gradient-border`, `card-inner-glow`.

Layout: `container-lines`, `bg-grid-animated`, `line-vertical`, `line-horizontal`, `number-detail`, `noise-overlay`.

Buttons: `btn-glass`, `btn-gradient-outline`, `border-beam`.
