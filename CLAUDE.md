# CLAUDE.md

Etlaq Studio - Next.js 16 Template with Arabic-first design, JWT auth, MongoDB, and HeroUI v3.

---

## Quick Reference

### Development Commands
```bash
bun dev              # Start dev server with Turbopack
bun dev:grab         # Start with react-grab visual editor
bun run build        # Production build
bun start            # Start production server
bun lint             # Run ESLint
```

### Key Tech Stack
| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (React 19) + App Router |
| Styling | Tailwind CSS 4 + OKLCH colors |
| UI Library | HeroUI v3 (Beta) |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Animations | framer-motion + tw-animate-css |
| Fonts | Geist Sans/Mono, Newsreader, IBM Plex Sans Arabic |

---

## Development Workflow

### 1. Start UI Work → `/frontend-design` skill
For all UI/UX tasks, invoke the frontend-design skill for production-grade interfaces.

### 2. Be Creative & Match the Vibe
- **Adapt to the topic** - every project has its own feel; design should reflect that
- **Design with personality** - don't use generic templates; each project deserves its own character
- **Pick fonts that fit** - typography sets the tone
- **Use components creatively** - combine, nest, and customize freely
- **Add polish as needed** - animations, effects, transitions - whatever makes it feel complete
- **Trust your instincts** - if something feels missing, add it; if it feels off, change it

### 3. Theme Setup First (Before Any UI)
Configure color scheme in `app/globals.css`:
```css
:root {
  --primary: oklch(0.55 0.22 280);  /* Purple hue 280 */
  --background: oklch(0.985 0 0);    /* Off-white */
  --foreground: oklch(0.15 0 0);    /* Soft black */
}
.dark {
  --primary: oklch(0.7 0.2 280);
  --background: oklch(0.13 0 0);     /* Soft black, not pure black */
  --foreground: oklch(0.92 0 0);     /* Off-white */
}
```

### 4. Always Support Both Modes
- Light mode: Default (`bg-gradient-to-b from-neutral-50 via-white to-neutral-50`)
- Dark mode: Test with `.dark` class, ensure system detection works
- Use `prefers-color-scheme` media query in layout.tsx

### 5. Arabic-First, English-Second
- **Default**: Arabic (`lang="ar-SA"`, `dir="rtl"`)
- **Fonts**: IBM Plex Sans Arabic (all text)
- **English**: Geist Sans (body) + Newsreader (headings)
- **Currency**: SAR with `ar-SA` locale
- **Phone**: +966 validation
- **Week**: Sunday-Thursday

### 6. Get Things Running ASAP
- No manual testing required (curl the homepage)
- Focus on speed + existing patterns
- Ask questions when uncertain

---

## Project Structure

```
app/                        # Next.js App Router
├── api/
│   ├── todos/              # Todo CRUD (example)
│   ├── auth/               # Register, login, me endpoints
│   ├── ai/                 # OpenRouter chat streaming
│   └── upload/             # Cloudinary file upload
├── page.tsx               # Landing page
├── layout.tsx             # Root layout + providers
├── login/                 # Auth pages
└── register/

lib/
├── content/homepage.ts     # Static content data
├── translations/          # ar.ts, en.ts (type-safe)
├── auth.ts                # JWT + password utilities
├── mongodb.ts             # Cached connection
└── utils.ts               # cn() class merger

models/                     # Mongoose schemas
├── User.ts                # email, password, name
└── Todo.ts                # title, completed

components/
├── ScrollReveal.tsx       # Scroll-triggered animations
├── ThemeToggle.tsx        # Light/Dark/System switcher
└── LanguageToggle.tsx     # Arabic/English switcher

contexts/
├── AuthContext.tsx        # Auth state + login/register/logout
└── LanguageContext.tsx     # i18n + direction management
```

---

## Design System

### Color Palette (OKLCH)
**Always use semantic CSS variables, never hardcode colors.**

```tsx
// Semantic tokens
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground" />
  <p className="text-muted-foreground" />
  <div className="border border-border bg-card" />
</div>
```

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--primary` | `oklch(0.55 0.22 280)` | `oklch(0.7 0.2 280)` | CTAs, links, interactive |
| `--background` | `oklch(0.985 0 0)` | `oklch(0.13 0 0)` | Page background |
| `--foreground` | `oklch(0.15 0 0)` | `oklch(0.92 0 0)` | Primary text |
| `--card` | `oklch(0.995 0 0)` | `oklch(0.16 0 0)` | Card surfaces |
| `--muted` | `oklch(0.96 0 0)` | `oklch(0.2 0 0)` | Secondary backgrounds |
| `--border` | `oklch(0.90 0 0)` | `oklch(1 0 0 / 8%)` | Borders (glassmorphism) |

**Important**: Never use pure black (`oklch(0 0 0)`) or pure white (`oklch(1 0 0)`). Use soft alternatives for eye comfort.

### Spacing
- Sections: `py-20` (80px)
- Container: `max-w-7xl px-4 sm:px-6 lg:px-8`
- Card gaps: `gap-6` (24px)
- Component spacing: `space-y-4` or `space-y-8`

### Border Radius
- Buttons/Inputs: `rounded-md` (10px default via `--radius`)
- Cards: `rounded-lg`
- Icon containers: `rounded-xl`
- Feature cards: `rounded-2xl`
- Badges/Avatars: `rounded-full`

### Typography
```css
/* Arabic (default) */
html[lang="ar-SA"] { font-family: var(--font-sans-arabic), sans-serif; }
.heading-display { font-weight: 600; }
.heading-tall { font-weight: 500; }

/* English */
html[lang="en"] body { font-family: var(--font-geist-sans), sans-serif; }
html[lang="en"] .heading-display { font-family: var(--font-newsreader), serif; }
```

| Class | Font | Weight | Usage |
|-------|-------|--------|-------|
| `font-sans` | Geist Sans / IBM Plex Arabic | 400-600 | Body text |
| `font-mono` | Geist Mono | 400-500 | Code, IDs |
| `heading-display` | Newsreader / IBM Plex Arabic | 500-600 | Hero headings |
| `heading-tall` | Newsreader / IBM Plex Arabic | 400-500 | Subheadings |

### Glassmorphism
Use utility classes for modern glass effects:
```tsx
<div className="glass-card">           {/* Glass with border and shadow */}
<div className="glass-card-hover">      {/* Glass with hover lift */}
<div className="glass-sm">              {/* Light glass, 8px blur */}
<div className="glass-lg">              {/* Heavy glass, 20px blur */}
```

### Buttons (HeroUI)
```tsx
import { Button } from '@heroui/react';

// Primary CTA - with border beam
<Link href="/cta" className="group">
  <div className="relative">
    <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 animate-border-beam" />
    <Button variant="primary" size="lg" className="relative rounded-full px-10 py-6">
      Get Started
      <ArrowRight className="ms-2" />
    </Button>
  </div>
</Link>

// Secondary
<Button variant="secondary">Edit</Button>

// Tertiary
<Button variant="tertiary">Cancel</Button>

// Danger
<Button variant="danger">Delete</Button>
```

### Cards
```tsx
<Card className="glass-card group-hover:glass-card-hover">
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Content>
    Content
  </Card.Content>
</Card>
```

### Hover States
| Element | Hover Effect |
|---------|-------------|
| Buttons | `hover:scale-105` + shadow increase |
| Cards | `hover:shadow-xl hover:-translate-y-1` |
| Links | `hover:text-primary` |
| Icons | Subtle background color shift |

---

## Animations

### Scroll Reveal (Primary Pattern)
```tsx
import { ScrollReveal } from '@/components/ScrollReveal';

<ScrollReveal delay={100} direction="up">
  <h2>Fades in when scrolled into view</h2>
</ScrollReveal>

// Stagger children
{items.map((item, i) => (
  <ScrollReveal key={item.id} delay={i * 100}>
    <Card>{item.content}</Card>
  </ScrollReveal>
))}
```

### Built-in Animation Classes
| Class | Effect |
|-------|--------|
| `bg-grid-animated` | Fading grid background |
| `animate-morph` | Organic blob shape morphing |
| `animate-twinkle` | Star twinkle |
| `animate-border-beam` | 1px animated gradient border |
| `animate-gradient-slow` | Slow gradient shift (15s) |
| `animate-spin-slow` | Slow rotation (20s) |
| `card-hover-lift` | Lift on hover (-8px) |
| `card-hover-glow` | Glow on hover |
| `glass-card-hover` | Glass + lift on hover |

### Animation Timing
- Stagger: 100ms between siblings
- Scroll trigger: `threshold: 0.2`
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- Transitions: `transition-all duration-300` (cards), `duration-200` (buttons)

---

## RTL & Localization

### Translation Pattern
```tsx
'use client';
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { t, isArabic, translations } = useLanguage();

  // Quick inline translation
  return <h1>{t('مرحباً', 'Hello')}</h1>;

  // Use translation object (preferred for static content)
  return <h1>{translations.hero.title}</h1>;
}
```

### RTL-Safe Classes
```tsx
// Good - logical properties
<div className="ps-4 pe-2 ms-auto me-0 start-6 end-6">

// Bad - directional (breaks in RTL)
<div className="pl-4 pr-2 ml-auto mr-0 left-6 right-6">
```

| Logical | Directional |
|----------|-------------|
| `start` / `end` | `left` / `right` |
| `ps` / `pe` | `pl` / `pr` |
| `ms` / `me` | `ml` / `mr` |

### Direction-Aware Icons
```tsx
import { ArrowRight, ArrowLeft } from 'lucide-react';

const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

<button>
  {t('Continue', 'متابعة')}
  <ArrowIcon className={isArabic ? 'me-2' : 'ms-2'} />
</button>
```

---

## Component Patterns

### Server Component (Default)
```tsx
export default function Page() {
  return <div>Server-rendered</div>;
}
```

### Client Component (with hooks/events)
```tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}
```

### Conditional Classes
```tsx
import { cn } from '@/lib/utils';

<div className={cn("base-class", isActive && "active-class")} />
```

### API Route Pattern
```tsx
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Todo from '@/models/Todo';

export async function GET() {
  await connectDB();
  const todos = await Todo.find().sort({ createdAt: -1 });
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  const { title } = await request.json();
  await connectDB();
  const todo = await Todo.create({ title });
  return NextResponse.json(todo, { status: 201 });
}
```

### Auth Middleware
```tsx
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractToken } from '@/lib/auth';

export function withAuth(handler: (req: NextRequest, userId: string) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const token = extractToken(request.headers.get('authorization'));
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    return handler(request, payload.userId);
  };
}
```

---

## Best Practices

### Performance
- Use `useMemo` for expensive computations
- Use `useCallback` for event handlers passed to children
- Optimize images with `next/image`
- Lazy load routes with dynamic imports
- Use Intersection Observer for scroll animations

### Accessibility
- Use semantic HTML (`<nav>`, `<main>`, `<article>`)
- Add `aria-label` to icon-only buttons
- Support keyboard navigation
- Respect `prefers-reduced-motion` (built into globals.css)
- Ensure color contrast (WCAG AA minimum)

### TypeScript
- Use type-safe translations (`translations.hero.title`)
- Define interfaces for API responses
- Use `zod` for runtime validation
- Avoid `any` - use `unknown` or proper types

### Error Handling
```tsx
// API routes
try {
  const result = await someOperation();
  return NextResponse.json(result);
} catch (error) {
  console.error('Operation failed:', error);
  return NextResponse.json(
    { error: 'Failed to complete operation' },
    { status: 500 }
  );
}

// Client components
const handleSubmit = async () => {
  try {
    const result = await apiCall();
    // handle success
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Unknown error');
  }
};
```

---

## Specialized Agents

| Agent | Use For |
|-------|---------|
| `ui-designer` | UI components, visual aesthetics |
| `auth-specialist` | JWT auth, protected routes, user management |
| `database-specialist` | MongoDB schemas, queries, aggregations |
| `api-integration-specialist` | External APIs, webhooks, file uploads |
| `ai-apps-developer` | AI features, OpenRouter API, streaming |
| `quality-specialist` | Code review, security audits, testing |
| `image-specialist` | Fetch culturally appropriate images |

---

## Environment Variables

Create `.env.local`:
```env
MONGODB_URI=mongodb+srv://...
DB_NAME=etlaq
JWT_SECRET=your-32-character-secret-key-here
OPENROUTER_MODEL=openai/gpt-3.5-turbo
```

---

## Pre-configured Image Sources

These work with `next/image` out-of-the-box:
- Stock photos: Pexels, Unsplash, Pixabay
- CDNs: Cloudinary, Imgur
- Avatars: UI Avatars, Gravatar
- Placeholders: Picsum, Placehold.co

---

## Common Tasks

### Add a new page
1. Create `app/new-page/page.tsx`
2. Add link to navigation/landing
3. Add translations to `lib/translations/`
4. Test both light/dark modes

### Add an API endpoint
1. Create `app/api/endpoint/route.ts`
2. Export `GET`, `POST`, etc. functions
3. Handle errors gracefully
4. Add validation with `zod`

### Add a reusable component
1. Create `components/ComponentName.tsx`
2. Make it client component if using hooks
3. Add TypeScript props interface
4. Add Storybook-style usage examples in comments

### Add a new translation
1. Add to `lib/translations/ar.ts` (Arabic first)
2. Add to `lib/translations/en.ts`
3. Import and use in component via `translations.namespace.key`

### Add authentication to a route
1. Use `withAuth` middleware from `lib/middleware.ts`
2. Get `userId` from handler parameters
3. Fetch user from database if needed

---

## Troubleshooting

### MongoDB Connection Issues
- Check `MONGODB_URI` in `.env.local`
- Ensure IP whitelist in MongoDB Atlas
- Verify database name in `DB_NAME`

### Auth Token Errors
- Check `JWT_SECRET` is set and 32+ chars
- Verify token format: `Bearer <token>`
- Check token expiration (7 days default)

### Build Errors
- Run `bun install` to ensure dependencies
- Check TypeScript errors with `tsc --noEmit`
- Verify all imports use `@/` aliases

### Styling Issues
- Check Tailwind class names are valid
- Verify CSS variables are defined in `globals.css`
- Test both light and dark modes

---

## Quick Examples

### Hero Section
```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 animate-gradient-slow" />
  <div className="absolute inset-0 bg-grid-animated opacity-30" />

  <div className="relative max-w-4xl mx-auto px-6 text-center">
    <ScrollReveal>
      <h1 className="heading-display text-6xl sm:text-7xl md:text-8xl">
        <span className="text-foreground">{t('أطلق', 'Launch')}</span>
        <span className="heading-tall block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {t('رؤيتك', 'Your Vision')}
        </span>
      </h1>
    </ScrollReveal>
  </div>
</section>
```

### Feature Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {features.map((feature, i) => (
    <ScrollReveal key={feature.id} delay={i * 100}>
      <Card className="glass-card group-hover:glass-card-hover">
        <Card.Header>
          <Card.Title>{feature.title}</Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-muted-foreground">{feature.description}</p>
        </Card.Content>
      </Card>
    </ScrollReveal>
  ))}
</div>
```

### Form with Validation
```tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

---

## Code Quality Checklist

- [ ] No `any` types
- [ ] All components have TypeScript interfaces
- [ ] RTL-safe classes used
- [ ] Both light/dark modes tested
- [ ] Translations added for Arabic and English
- [ ] Accessibility attributes present
- [ ] Error handling in place
- [ ] No console errors
- [ ] Performance considered (lazy loading, memo)
- [ ] Responsive design tested (sm, md, lg, xl)

---

## Resources

- **HeroUI Docs**: Use MCP server `heroui-react` or `.claude/skills/heroui.md`
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **OKLCH Colors**: https://oklch.com
- **Lucide Icons**: https://lucide.dev/icons
