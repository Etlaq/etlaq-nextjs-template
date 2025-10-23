# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting and type checking
npm run lint
```

**IMPORTANT**: The development server is most likely already running on **port 3000**. Check `/server.log` for status instead of restarting.

## Specialized Agents

This template includes domain-specific agents that auto-invoke based on task context. Use them explicitly for complex workflows:

- **`ui-design-specialist`** - UI/UX, shadcn/ui components, layouts, image sourcing
- **`auth-specialist`** - JWT auth, protected routes, session management (requires User model)
- **`database-specialist`** - MongoDB/Mongoose schemas, queries, aggregations (runs independently)
- **`api-integration-specialist`** - External APIs, webhooks, file uploads (runs independently)
- **`ai-apps-developer`** - Open Router API, streaming, chat interfaces
- **`quality-specialist`** - Code review, debugging, testing (runs after implementation)

**Agent Collaboration**: Most features need multiple agents. Run `database-specialist` + `ui-design-specialist` in parallel, then `auth-specialist` sequentially. Always finish with `quality-specialist`.

## Application Context: Saudi Arabia

This template is designed for the Saudi Arabian market:

- **Currency**: Saudi Riyal (SAR) with `new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' })`
- **Locale**: Arabic (ar-SA) primary, English secondary with RTL support
- **Phone**: Saudi format (+966) - `/^(\+966|966|05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/`
- **Date/Time**: Hijri calendar support where appropriate
- **Payments**: Mada, STC Pay, Apple Pay, Visa/Mastercard
- **Cultural**: Conservative design, Sunday-Thursday work week

## Project Architecture

Next.js 15 template with Next.js App Router, TypeScript 5, Tailwind CSS 4, MongoDB/Mongoose, JWT authentication, and 30+ shadcn/ui components (New York variant, neutral colors).

### Authentication Flow (Multi-File Pattern)

JWT-based authentication spans multiple files:

1. **`lib/auth.ts`** - Core auth utilities (hashPassword, verifyPassword, generateToken, verifyToken)
2. **`lib/middleware.ts`** - `withAuth()` wrapper for protecting API routes
3. **`models/User.ts`** - Mongoose User schema
4. **`contexts/AuthContext.tsx`** - Client-side auth state with localStorage persistence
5. **API Routes** - `/api/auth/{register,login,me}` for authentication endpoints

**Usage Pattern**:
```typescript
// Protect API routes with withAuth() middleware
export const GET = withAuth(async (request, userId) => {
  // userId is automatically extracted from JWT
});

// Access auth in client components
const { user, login, logout } = useAuth();
```

### Database Connection Pattern

MongoDB connection uses global caching to prevent connection exhaustion in serverless:

- **`lib/mongodb.ts`** exports `connectDB()` with global connection caching
- Connection persists via `global.mongoose` between hot reloads
- Call `await connectDB()` before any database operation

### Component Architecture

**Shadcn/ui Configuration** (`components.json`):
- Path aliases: `@/components`, `@/lib`, `@/hooks`
- Components use composition pattern with Radix UI primitives
- Server Components by default; Client Components marked with "use client"

**Layout Pattern** (Sidebar-based dashboard):
- `SidebarProvider` → wraps dashboard for global sidebar state
- `AppSidebar` → collapsible navigation (contains sample data to replace)
- `SidebarInset` → main content area with header/breadcrumbs
- Navigation components (`nav-main`, `nav-projects`, `nav-user`) → modular sidebar sections

**Theming** (Tailwind CSS 4 + CSS variables):
- OKLCH color space defined in `app/globals.css`
- Dark/light mode via `next-themes` with CSS variables
- Component variants using `class-variance-authority`

### Key Files to Customize

**Replace sample data in**:
- `components/app-sidebar.tsx` - Navigation data object
- `components/dashboard-example/page.tsx` - Dashboard sample data
- `components/{nav-main,nav-projects,nav-user,team-switcher}.tsx` - Placeholder URLs

**Keep as-is**:
- `components/ui/*` - Shadcn/ui component library (30+ components)

**Configuration**:
- `next.config.ts` - Build errors ignored for dev (enable for production)
- `.env.example` - Required: MONGODB_URI, JWT_SECRET, DB_NAME

## Tech Stack Overview

**Package Manager**: npm (use `npm install` not yarn/pnpm)

**Key Dependencies**:
- **UI**: 30+ shadcn/ui components (Radix UI primitives), lucide-react icons, recharts, @tanstack/react-table
- **Forms**: react-hook-form + zod validation
- **Interactions**: @dnd-kit (drag-and-drop), react-resizable-panels
- **Auth**: jsonwebtoken, bcryptjs
- **Database**: mongoose
- **Theming**: next-themes, tailwindcss (OKLCH color space)
- **Notifications**: sonner (toast notifications)

**Custom Hooks**:
- `useAuth()` - Auth state (user, login, logout) from AuthContext
- `useSidebar()` - Sidebar state from SidebarProvider
- `useIsMobile()` - Mobile viewport detection

## Development Patterns

**TypeScript**: Strict mode enabled. Type all parameters and return values. Avoid `any`.

**Styling**: Tailwind utilities + semantic CSS variables. Use `cn()` helper for conditional classes.

**Component Pattern**: Server Components default. Mark Client Components with "use client". Use composition over prop drilling.

**State Management**: React Context for global state (auth, sidebar). React Hook Form for form state.

**Image Sources**:
- External images configured in `next.config.ts` for Pexels API
- Use `api-integration-specialist` for Unsplash/Pexels integration

## Claude Code Skills

Reference `.claude/skills/nextjs-template-skill/` for:
- `SKILL.md` - Quick start and architecture
- `COMPONENTS.md` - All 30+ shadcn/ui component examples
- `NEXTJS_REFERENCE.md` - Next.js 15 App Router documentation
