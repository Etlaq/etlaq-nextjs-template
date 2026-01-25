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

### 0. Think Holistically First
Before ANY action, consider:
- ALL relevant files in the project
- ALL previous changes and their impacts
- The entire project context and dependencies
- Potential impacts on other parts of the system

### 1. Context First, Code Second
- **ALWAYS read files before editing** - Never modify files you haven't read
- **Check existing patterns** - Search codebase for similar implementations before creating new ones
- **Batch operations** - Make parallel tool calls when operations are independent
- **Verify relationships** - Check parent components, imports, and dependencies
- **Don't stop at first match** - When searching finds multiple files, examine ALL of them

### 2. UI Tasks → `/frontend-design` skill
For all UI/UX tasks, invoke the frontend-design skill for production-grade interfaces.

### 3. Be Creative & Match the Vibe
- **Adapt to the topic** - every project has its own feel; design should reflect that
- **Design with personality** - don't use generic templates; each project deserves its own character
- **Pick fonts that fit** - typography sets the tone
- **Use components creatively** - combine, nest, and customize freely
- **Add polish as needed** - animations, effects, transitions - whatever makes it feel complete
- **Trust your instincts** - if something feels missing, add it; if it feels off, change it

### 4. Theme Setup First
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

### 5. Always Support Both Modes
- Light mode: Default (`bg-gradient-to-b from-neutral-50 via-white to-neutral-50`)
- Dark mode: Test with `.dark` class, ensure system detection works
- **CRITICAL**: When overriding background colors, ALWAYS override text colors for proper contrast

### 6. Arabic-First, English-Second
- **Default**: Arabic (`lang="ar-SA"`, `dir="rtl"`)
- **Fonts**: IBM Plex Sans Arabic (all text)
- **English**: Geist Sans (body) + Newsreader (headings)
- **Currency**: SAR with `ar-SA` locale
- **Phone**: +966 validation

### 7. Get Things Running ASAP
- Focus on speed + existing patterns
- Ask questions when uncertain
- **Discuss before implementing** for complex features
- **Frontend first** - Write UI first so user sees results, then backend

## Response Guidelines

### Be Helpful, Not Brief
- Provide thorough explanations when they help understanding
- Explain your reasoning and approach
- Offer alternatives when appropriate
- Use code blocks and formatting for clarity
- After editing code, provide clear summaries of what changed

### Efficient Editing
- Use search-replace for modifications (not full rewrites)
- Indicate unchanged code with `// ... existing code ...`
- Only write files that need changes
- Split code into small, focused components
- Add `// <CHANGE>` comments for non-obvious edits

### Code References
When referencing code, include file path and line number:
```
The error occurs in `lib/auth.ts:42` in the verifyToken function.
```

### Debugging Workflow
1. Check console/dev logs first
2. Check network requests for API issues
3. Analyze errors before modifying code
4. Search codebase for related patterns
5. Make minimal, targeted fixes
6. **Always verify after changes** - check logs again

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

### CRITICAL: Use Semantic Tokens Only
```tsx
// ❌ WRONG - Hardcoded colors
<div className="bg-white text-black" />
<div className="bg-gray-900 text-white" />

// ✅ CORRECT - Semantic tokens
<div className="bg-background text-foreground" />
<div className="bg-card text-card-foreground" />
```

### Colors (OKLCH) - Never hardcode colors
| Token | Light | Dark |
|-------|-------|------|
| `--primary` | `oklch(0.55 0.22 280)` | `oklch(0.7 0.2 280)` |
| `--background` | `oklch(0.985 0 0)` | `oklch(0.13 0 0)` |
| `--foreground` | `oklch(0.15 0 0)` | `oklch(0.92 0 0)` |
| `--card` | `oklch(0.995 0 0)` | `oklch(0.16 0 0)` |
| `--muted` | `oklch(0.96 0 0)` | `oklch(0.2 0 0)` |

**Never use pure black/white** - use soft alternatives.

### Color Palette Rules
- **3-5 colors maximum** per design
- 1 primary brand color + 2-3 neutrals + 1-2 accents
- Avoid gradients unless explicitly requested
- If gradients needed: use analogous colors only (blue→teal, not pink→green)
- **Avoid indigo/blue** as primary unless explicitly requested

### Typography Rules
- **Maximum 2 font families** - one for headings, one for body
- **Arabic**: IBM Plex Sans Arabic (default)
- **English**: Geist Sans (body) + Newsreader (headings)
- Classes: `heading-display` (heroes), `heading-tall` (subheadings), `font-mono` (code)
- Line height: 1.4-1.6 for body text (`leading-relaxed`)
- **Never use fonts smaller than 14px**

### Spacing & Radius
- Sections: `py-20` | Container: `max-w-7xl px-4 sm:px-6 lg:px-8` | Gaps: `gap-6`
- Radius: buttons `rounded-md`, cards `rounded-lg`, features `rounded-2xl`, badges `rounded-full`
- **Prefer gap classes** over margin: `gap-4` not `space-x-4`
- **Card padding**: Use consistent `p-4` or `p-6` for content

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

## UI/UX Standards

### Interactive Elements (MANDATORY)
- **Loading states**: Show spinners/skeletons during async operations
- **Error handling**: Clear, actionable error messages
- **Toast notifications**: Use toast components to inform users of important events
- **Hover effects**: Interactive feedback on ALL clickable elements
- **Touch targets**: Minimum 44px for mobile interactive elements

### Long Lists
```tsx
// Handle long lists with scroll
<div className="max-h-96 overflow-y-auto">
  {items.map(item => <Item key={item.id} />)}
</div>
```

### Responsive Design (MANDATORY)
- **Mobile-first**: Design for mobile, then enhance for desktop
- **Breakpoints**: Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- **Touch-friendly**: Minimum 44px touch targets for interactive elements

## Component Guidelines

### Use HeroUI Built-in Variants
```tsx
// ❌ WRONG - Inline style overrides
<Button className="bg-blue-500 hover:bg-blue-600 text-white" />

// ✅ CORRECT - Use HeroUI props
<Button color="primary" variant="solid" />
<Button color="default" variant="bordered" />
<Button color="primary" variant="ghost" />
<Button color="primary" variant="flat" radius="full" />
```

### HeroUI Component Patterns
```tsx
// Cards
<Card className="glass-card">
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
</Card>

// Inputs
<Input label="Email" type="email" variant="bordered" />

// Modals
<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
    <ModalBody>Content</ModalBody>
    <ModalFooter>
      <Button onPress={onClose}>Close</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### Small, Focused Components
- Split large files into smaller components
- Each component should do one thing well
- Maximize reusability across the app
- **Never create monolithic files** - extract into modules

### Use HeroUI Components
- Use HeroUI v3 components instead of building from scratch
- Import from `@heroui/react`: `import { Button, Card, Input, Modal } from '@heroui/react'`
- HeroUI has built-in variants: `color`, `size`, `radius`, `variant`
- Check HeroUI docs before creating custom components

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

## SEO Requirements
- **Title tags**: Under 60 characters with main keyword
- **Meta description**: Max 160 characters
- **Single H1**: One per page with primary keyword
- **Semantic HTML**: `<main>`, `<nav>`, `<article>`, `<section>`
- **Image alt text**: Descriptive with relevant keywords
- **Mobile-first**: Responsive with proper viewport meta
- **Lazy loading**: For images below the fold

## Patterns

### API Route
```tsx
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

// Creates a new todo item.
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();
    const todo = await Todo.create(data);
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error('Failed to create todo:', error);
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}
```

### Auth Middleware
```tsx
import { verifyToken, extractToken } from '@/lib/auth';

const token = extractToken(request.headers.get('authorization'));
const payload = verifyToken(token);
if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
```

### Client Component with Loading/Error States
```tsx
'use client';
import { useState } from 'react';
import { Button, Spinner } from '@heroui/react';
import { addToast } from '@heroui/toast';
import { cn } from '@/lib/utils';

export function MyComponent() {
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    try {
      await doSomething();
      addToast({ title: 'Success', description: 'Action completed', color: 'success' });
    } catch (err) {
      console.error('Action failed:', err);
      addToast({ title: 'Error', description: 'Action failed', color: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onPress={handleAction} isLoading={loading}>
      Submit
    </Button>
  );
}
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
- [ ] Think holistically before changes
- [ ] Read files before editing
- [ ] No `any` types
- [ ] No hardcoded colors (`bg-white`, `text-black`)
- [ ] RTL-safe classes (`ps-`, `me-`, `start`, `end`)
- [ ] Light + dark modes work with proper contrast
- [ ] Arabic + English translations
- [ ] Loading states for async operations
- [ ] Error handling with toast notifications
- [ ] Responsive (sm, md, lg, xl)
- [ ] Small, focused components
- [ ] Touch targets ≥ 44px

## Troubleshooting
- **MongoDB**: Check `MONGODB_URI`, IP whitelist, `DB_NAME`
- **Auth**: `JWT_SECRET` 32+ chars, `Bearer <token>` format
- **Build**: `bun install`, check TypeScript errors
- **Styling**: Verify CSS variables in `globals.css`
- **Dark mode issues**: Check text/background contrast tokens
- **API errors**: Check network tab, verify request/response format
