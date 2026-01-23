# CLAUDE.md

Etlaq Studio - Next.js 16 Template | Arabic-first, JWT auth, MongoDB, HeroUI v3

## Commands
```bash
bun dev          # Dev server (Turbopack)
bun run build    # Production build
bun lint         # ESLint
```

## Stack
Next.js 16 (React 19) • Tailwind CSS 4 (OKLCH) • HeroUI v3 • MongoDB/Mongoose • JWT/bcryptjs • framer-motion

## Task Todos
When creating task lists, write in Arabic using simple, non-technical language:

**Rules:**
- Write task subjects in Arabic only
- Use simple language anyone can understand
- Do NOT mention library names, tools, or technical terms
- Focus on the end result, not implementation details

**Examples:**
| Good (Arabic, simple) | Bad (English, technical) |
|-----------------------|--------------------------|
| Login page | Add JWT auth with bcrypt hashing |
| Homepage design | Implement HeroUI v3 components |
| Database connection | Configure MongoDB with Mongoose |
| Fix color issue | Update OKLCH variables in globals.css |
| Dark mode toggle | Add ThemeToggle with system detection |

## Workflow

### 1. UI Tasks → `/frontend-design` skill
For all UI/UX tasks, invoke the frontend-design skill for production-grade interfaces.

### 2. Be Creative & Match the Vibe
- **Adapt to the topic** - every project has its own feel; design should reflect that
- **Design with personality** - don't use generic templates; each project deserves its own character
- **Pick fonts that fit** - typography sets the tone
- **Use components creatively** - combine, nest, and customize freely
- **Add polish as needed** - animations, effects, transitions - whatever makes it feel complete
- **Trust your instincts** - if something feels missing, add it; if it feels off, change it

### 3. Theme Setup First
Configure color scheme in `app/globals.css` before any UI work:
```css
:root {
  --primary: oklch(0.55 0.22 280);  /* Purple hue 280 */
  --background: oklch(0.985 0 0);
  --foreground: oklch(0.15 0 0);
}
.dark {
  --primary: oklch(0.7 0.2 280);
  --background: oklch(0.13 0 0);    /* Soft black, not pure */
  --foreground: oklch(0.92 0 0);
}
```

### 4. Always Support Both Modes
- Light mode: Default (`bg-gradient-to-b from-neutral-50 via-white to-neutral-50`)
- Dark mode: Test with `.dark` class, ensure system detection works

### 5. Arabic-First, English-Second
- **Default**: Arabic (`lang="ar-SA"`, `dir="rtl"`)
- **Fonts**: IBM Plex Sans Arabic (all text)
- **English**: Geist Sans (body) + Newsreader (headings)
- **Currency**: SAR with `ar-SA` locale
- **Phone**: +966 validation

### 6. Get Things Running ASAP
- Focus on speed + existing patterns
- Ask questions when uncertain

## Project Structure
```
app/
├── api/{todos,auth,ai,upload}/   # API routes
├── {login,register}/             # Auth pages
├── page.tsx, layout.tsx          # Root files
lib/
├── content/homepage.ts           # Static content
├── translations/{ar,en}.ts       # i18n (type-safe)
├── auth.ts, mongodb.ts, utils.ts # Utilities
models/User.ts, Todo.ts           # Mongoose schemas
components/                       # ScrollReveal, ThemeToggle, LanguageToggle
contexts/                         # AuthContext, LanguageContext
```

## Design System

### Colors (OKLCH) - Use semantic variables only
| Token | Light | Dark |
|-------|-------|------|
| `--primary` | `oklch(0.55 0.22 280)` | `oklch(0.7 0.2 280)` |
| `--background` | `oklch(0.985 0 0)` | `oklch(0.13 0 0)` |
| `--foreground` | `oklch(0.15 0 0)` | `oklch(0.92 0 0)` |
| `--card` | `oklch(0.995 0 0)` | `oklch(0.16 0 0)` |
| `--muted` | `oklch(0.96 0 0)` | `oklch(0.2 0 0)` |

**Never use pure black/white** - use soft alternatives.

### Spacing & Radius
- Sections: `py-20` | Container: `max-w-7xl px-4 sm:px-6 lg:px-8` | Gaps: `gap-6`
- Radius: buttons `rounded-md`, cards `rounded-lg`, features `rounded-2xl`, badges `rounded-full`

### Typography
- **Arabic**: IBM Plex Sans Arabic (default)
- **English**: Geist Sans (body) + Newsreader (headings)
- Classes: `heading-display` (heroes), `heading-tall` (subheadings), `font-mono` (code)

### Glass Effects
```tsx
<div className="glass-card" />        // Glass + border + shadow
<div className="glass-card-hover" />  // Glass + hover lift
```

### Animations
| Class | Effect |
|-------|--------|
| `bg-grid-animated` | Fading grid background |
| `animate-border-beam` | Gradient border animation |
| `animate-gradient-slow` | 15s gradient shift |
| `card-hover-lift` | -8px lift on hover |

**ScrollReveal**: Primary pattern for scroll animations
```tsx
<ScrollReveal delay={i * 100} direction="up">
  <Card />
</ScrollReveal>
```

## RTL & i18n

### Translation
```tsx
const { t, isArabic, translations } = useLanguage();
<h1>{t('مرحباً', 'Hello')}</h1>           // Inline
<h1>{translations.hero.title}</h1>        // Object (preferred)
```

### RTL-Safe Classes
| Use | Avoid |
|-----|-------|
| `ps-4`, `pe-4`, `ms-4`, `me-4` | `pl-4`, `pr-4`, `ml-4`, `mr-4` |
| `start-6`, `end-6` | `left-6`, `right-6` |

## Patterns

### API Route
```tsx
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET() {
  await connectDB();
  const data = await Model.find();
  return NextResponse.json(data);
}
```

### Auth Middleware
```tsx
import { verifyToken, extractToken } from '@/lib/auth';

const token = extractToken(request.headers.get('authorization'));
const payload = verifyToken(token);
if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
```

### Client Component
```tsx
'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';

<div className={cn("base", isActive && "active")} />
```

## Specialized Agents
| Agent | Use For |
|-------|---------|
| `ui-designer` | UI components, visual aesthetics |
| `auth-specialist` | JWT, protected routes, user management |
| `database-specialist` | MongoDB schemas, queries |
| `api-integration-specialist` | External APIs, webhooks, uploads |
| `ai-apps-developer` | AI features, OpenRouter, streaming |
| `quality-specialist` | Code review, security, testing |
| `image-specialist` | Culturally appropriate images |

## Environment
```env
MONGODB_URI=mongodb+srv://...
DB_NAME=etlaq
JWT_SECRET=your-32-char-secret
OPENROUTER_MODEL=openai/gpt-3.5-turbo
```

## Quick Checklist
- [ ] No `any` types
- [ ] RTL-safe classes (`ps-`, `me-`, `start`, `end`)
- [ ] Light + dark modes work
- [ ] Arabic + English translations
- [ ] Error handling in place
- [ ] Responsive (sm, md, lg, xl)

## Troubleshooting
- **MongoDB**: Check `MONGODB_URI`, IP whitelist, `DB_NAME`
- **Auth**: `JWT_SECRET` 32+ chars, `Bearer <token>` format
- **Build**: `bun install`, check TypeScript errors
- **Styling**: Verify CSS variables in `globals.css`
