---
name: nextjs-template-skill
description: Work with the Etlaq Next.js 16 template featuring shadcn/ui components, sidebar layouts, and example pages. Use when building features, modifying components, or working with the dashboard template structure.
---

# Next.js Template Development

## Quick Start

```bash
npm run dev      # Development with Turbopack
npm run build    # Production build
npm run lint     # ESLint + TypeScript checks
```

## Template Architecture

This is a **template repository** - example components contain placeholder data that should be replaced with real implementations.

### Component Organization

```
components/
├── ui/                   # shadcn/ui library (keep as-is)
├── app-sidebar.tsx       # Main sidebar with SAMPLE data
├── nav-*.tsx            # Navigation sections with placeholder URLs
├── dashboard-example/    # Example page (move to app/ for routes)
└── login-example/       # Example page (move to app/ for routes)
```

### Key Patterns

**Sidebar Layout**: Wrap pages with `SidebarProvider`:
```tsx
<SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    {/* Page content here */}
  </SidebarInset>
</SidebarProvider>
```

**Component Defaults**: Server Components unless marked `"use client"`

**Styling**: Tailwind utilities + `cn()` helper for conditional classes
```tsx
cn("base-classes", condition && "conditional-classes")
```

## Working with Components

### UI Components (Don't Modify)
The `components/ui/` directory contains 30+ shadcn/ui components. These are foundational - modify only when absolutely necessary.

**Full component reference with examples**: See [COMPONENTS.md](nextjs-template-skill/COMPONENTS.md)

Quick list:
- Forms: `form`, `input`, `label`, `checkbox`, `select`, `textarea`
- Layout: `sidebar`, `card`, `tabs`, `accordion`, `collapsible`
- Feedback: `dialog`, `alert-dialog`, `toast` (via sonner), `tooltip`
- Data: `table` (TanStack), `pagination`, `badge`
- Navigation: `dropdown-menu`, `context-menu`, `menubar`, `breadcrumb`
- Display: `avatar`, `badge`, `calendar`, `chart` (recharts)

### Example Components (Replace Data)

**app-sidebar.tsx**: Contains hardcoded teams, navigation items, and user data. Replace the `data` object with real data sources:
```tsx
// Current: Hardcoded sample data
const data = {
  teams: [...],
  navMain: [...]
}

// Replace with: API calls or props
const data = await fetchNavigationData()
```

**nav-main.tsx, nav-projects.tsx**: Navigation with placeholder URLs like `#`. Update `href` values to real routes.

**team-switcher.tsx**: Sample team data. Connect to real team/organization data.

## Configuration Files

### shadcn/ui Configuration
`components.json` defines:
- Style: `new-york` variant
- Base color: `neutral`
- Icons: `lucide-react`
- Path aliases: `@/components`, `@/lib`, `@/hooks`

### Theming
`app/globals.css` uses OKLCH color space with CSS variables:
- Light theme in `:root`
- Dark theme in `.dark`
- Semantic tokens for `--primary`, `--secondary`, etc.

## Development Guidelines

**Full Next.js 16 App Router documentation**: See [NEXTJS_REFERENCE.md](nextjs-template-skill/NEXTJS_REFERENCE.md)

### Creating New Pages
1. Create route in `app/` directory
2. Use example pages as templates
3. Wrap with `SidebarProvider` for dashboard pages
4. Replace sample data with real sources

### Adding Features
- Prefer existing UI components over creating new ones
- Use `lucide-react` for icons (500+ available)
- Forms: React Hook Form + Zod validation
- Tables: TanStack Table with sorting/filtering
- Charts: Recharts for data visualization

### Path Aliases
```tsx
import { Button } from "@/components/ui/button"  // UI components
import { cn } from "@/lib/utils"                 // Utilities
import { useIsMobile } from "@/hooks/use-mobile" // Custom hooks
```

## Common Tasks

### Toggle Sidebar
```tsx
import { useSidebar } from "@/components/ui/sidebar"
const { toggleSidebar } = useSidebar()
```

### Detect Mobile
```tsx
import { useIsMobile } from "@/hooks/use-mobile"
const isMobile = useIsMobile() // true under 768px
```

### Dark Mode
Theme switching via `next-themes` package:
```tsx
import { useTheme } from "next-themes"
const { theme, setTheme } = useTheme()
```

## Examples

- Creating a new dashboard page with sidebar navigation
- Converting example components to production-ready features
- Integrating real data sources to replace placeholder content
- Building forms with React Hook Form and Zod validation
- Adding data tables with sorting and filtering using TanStack Table

## Guidelines

- **TypeScript**: Strict mode enabled - fix all type errors
- **React 19.2**: Using latest React with partial prerendering
- **Next.js 16**: App Router with Server Components by default, Turbopack for fast compilation
- **Package manager**: Use `npm` (not pnpm or yarn)
- **File creation**: Edit existing files when possible, avoid creating new ones unless necessary
- **Component reuse**: Always check `components/ui/` for existing components before creating new ones
- **Template data**: Remember to replace all sample data in example components with real implementations