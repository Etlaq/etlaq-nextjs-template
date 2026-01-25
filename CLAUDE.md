# CLAUDE.md

Etlaq Studio - Next.js 16 Template | Arabic-first, shadcn/ui, MongoDB

## Commands
```bash
bun dev          # Dev server (Turbopack)
bun run build    # Production build
bun lint         # ESLint
```

## Stack
Next.js 16 (React 19) • Tailwind CSS 4 (OKLCH) • shadcn/ui • MongoDB/Mongoose • framer-motion

## MCP Servers
This project uses MCP (Model Context Protocol) servers for enhanced capabilities:

| MCP | Use For |
|-----|---------|
| `magicui` | **Advanced UI** - Animated components, text effects, backgrounds, interactions |
| `shadcn` | **Component library** - Search, install, and manage shadcn/ui components |
| `next-devtools` | Next.js debugging - Errors, routes, build status, cache management |

### Magic UI MCP Usage (Global)
Use Magic UI MCP for advanced animated components:
- `mcp__magicui__get_magicui_component` - Get animated component code
- `mcp__magicui__list_magicui_components` - List all available components

**Available components**: Text animations, number tickers, marquees, particle effects, gradient backgrounds, blur effects, dock menus, globe, orbiting circles, animated beams, shine borders, and more.

### shadcn MCP Usage
Use shadcn MCP for base component tasks:
- `mcp__shadcn__search_items_in_registries` - Search for components
- `mcp__shadcn__view_items_in_registries` - View component details
- `mcp__shadcn__get_item_examples_from_registries` - Get usage examples
- `mcp__shadcn__get_add_command_for_items` - Get install commands

### next-devtools MCP Usage
- `mcp__next-devtools__nextjs_index` - Discover running Next.js servers
- `mcp__next-devtools__nextjs_call` - Call Next.js MCP tools (errors, routes, cache)
- `mcp__next-devtools__nextjs_docs` - Fetch official Next.js documentation

## Project Structure
```
app/page.tsx, layout.tsx, globals.css, error.tsx
components/ThemeToggle, LanguageToggle, ui/
contexts/LanguageContext.tsx, ThemeContext.tsx
lib/mongodb.ts, utils.ts
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

### 2. UI Tasks → MCPs
- **Animated/Advanced UI**: Use Magic UI MCP (`mcp__magicui__*`)
- **Base components**: Use shadcn MCP (`mcp__shadcn__*`)

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

### shadcn/ui Button Variants
```tsx
import { Button } from '@/components/ui/button';

<Button variant="default" />   // default, secondary, outline, ghost, link, destructive
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

### Client Component with Toast
```tsx
'use client';
import { toast } from 'sonner';

const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    await doSomething();
    toast.success('تم بنجاح');
  } catch (err) {
    console.error(err);
    toast.error('حدث خطأ');
  } finally {
    setLoading(false);
  }
};
```

### Theme Hook
```tsx
import { useTheme } from '@/contexts/ThemeContext';

const { theme, setTheme, isDark, toggleTheme } = useTheme();
// theme: 'light' | 'dark' | 'system'
// setTheme('dark') - set specific theme
// toggleTheme() - cycle through themes
```

## Specialized Agents
| Agent | Use For |
|-------|---------|
| `auth-specialist` | JWT, protected routes |
| `database-specialist` | MongoDB schemas, queries |
| `api-integration-specialist` | External APIs, webhooks |
| `quality-specialist` | Code review, security |

> **Note**: For UI tasks, use **Magic UI MCP** for animations/effects, **shadcn MCP** for base components.

## Environment
```env
MONGODB_URI=mongodb+srv://...
DB_NAME=etlaq
```

## Quick Checklist
- [ ] Read files before editing
- [ ] Use Magic UI MCP for animations/effects
- [ ] Use shadcn MCP for base components
- [ ] Use next-devtools MCP for debugging
- [ ] No `any` types
- [ ] No hardcoded colors
- [ ] RTL-safe classes
- [ ] Light + dark modes
- [ ] Loading states
- [ ] Touch targets ≥ 44px
