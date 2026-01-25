# CLAUDE.md

Etlaq Studio - Next.js 16 Template | Arabic-first, HeroUI v3, MongoDB

## Commands
```bash
bun dev          # Dev server (Turbopack)
bun run build    # Production build
bun lint         # ESLint
```

## Stack
Next.js 16 (React 19) • Tailwind CSS 4 (OKLCH) • HeroUI v3 • MongoDB/Mongoose • framer-motion

## Project Structure
```
app/page.tsx, layout.tsx, globals.css
components/ThemeToggle, LanguageToggle, ScrollReveal, ui/
contexts/LanguageContext.tsx
lib/mongodb.ts, utils.ts, env.ts
```

## Task Todos (Arabic)
Write task subjects in Arabic, simple language, no technical terms:
- ✅ `صفحة تسجيل الدخول` | ❌ `Add JWT auth with bcrypt`
- ✅ `إصلاح مشكلة الألوان` | ❌ `Update OKLCH variables`

## Workflow

### 1. Read First, Code Second
- **ALWAYS read files before editing**
- Check existing patterns before creating new ones
- Batch parallel tool calls when independent

### 2. UI Tasks → `/frontend-design` skill

### 3. Theme in `globals.css` First
```css
:root { --primary: oklch(0.55 0.22 280); --background: oklch(0.985 0 0); }
.dark { --primary: oklch(0.7 0.2 280); --background: oklch(0.13 0 0); }
```

### 4. Arabic-First
- Default: `lang="ar-SA"`, `dir="rtl"`
- Fonts: IBM Plex Sans Arabic (Arabic), Geist Sans (English)

## Design System

### Semantic Tokens Only
```tsx
// ❌ WRONG
<div className="bg-white text-black" />

// ✅ CORRECT
<div className="bg-background text-foreground" />
```

### Colors (OKLCH)
| Token | Light | Dark |
|-------|-------|------|
| `--primary` | `oklch(0.55 0.22 280)` | `oklch(0.7 0.2 280)` |
| `--background` | `oklch(0.985 0 0)` | `oklch(0.13 0 0)` |
| `--foreground` | `oklch(0.15 0 0)` | `oklch(0.92 0 0)` |

### HeroUI v3 Variants
```tsx
<Button variant="primary" />   // primary, secondary, tertiary, ghost, danger, danger-soft
```

### RTL-Safe Classes
| Use | Avoid |
|-----|-------|
| `ps-4`, `pe-4`, `ms-4`, `me-4` | `pl-4`, `pr-4`, `ml-4`, `mr-4` |
| `start-6`, `end-6` | `left-6`, `right-6` |

## RTL & i18n

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

const { t, isArabic, setLanguage } = useLanguage();
<h1>{t('مرحباً', 'Hello')}</h1>
{isArabic ? <ArrowLeft /> : <ArrowRight />}
```

## UI/UX Standards

- **Loading states**: Spinners/skeletons during async
- **Error handling**: Toast notifications
- **Touch targets**: Minimum 44px
- **Responsive**: Mobile-first (`sm:`, `md:`, `lg:`, `xl:`)

## Patterns

### API Route
```tsx
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();
    return NextResponse.json(await Model.create(data), { status: 201 });
  } catch (error) {
    console.error('Failed:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

### Client Component
```tsx
'use client';
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    await doSomething();
    addToast({ title: 'Success', color: 'success' });
  } catch (err) {
    console.error(err);
    addToast({ title: 'Error', color: 'danger' });
  } finally {
    setLoading(false);
  }
};
```

## Specialized Agents
| Agent | Use For |
|-------|---------|
| `ui-designer` | UI components, visual aesthetics |
| `auth-specialist` | JWT, protected routes |
| `database-specialist` | MongoDB schemas, queries |
| `api-integration-specialist` | External APIs, webhooks |
| `quality-specialist` | Code review, security |

## Environment
```env
MONGODB_URI=mongodb+srv://...
DB_NAME=etlaq
```

## Quick Checklist
- [ ] Read files before editing
- [ ] No `any` types
- [ ] No hardcoded colors
- [ ] RTL-safe classes
- [ ] Light + dark modes
- [ ] Loading states
- [ ] Touch targets ≥ 44px
