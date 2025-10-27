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

**IMPORTANT**: The development server is most likely already running on **port 3000**. Check `./server.log` for status instead of restarting.

## Error Checking & Validation

**CRITICAL**: After making ANY changes (components, API routes, database, auth), ALWAYS verify there are no runtime errors:

### 1. Check Server Logs
```bash
# Check for errors in server logs
tail -n 50 ./server.log

# Watch logs in real-time while testing
tail -f ./server.log
```

**Look for**:
- Compilation errors (TypeScript, syntax)
- Runtime errors (module not found, undefined)
- API route errors (500, auth failures)
- Database connection issues
- Next.js build warnings/errors

### 2. Test Pages with Curl
```bash
# Test homepage
curl -I http://localhost:3000/

# Test dashboard
curl -I http://localhost:3000/dashboard

# Test API routes
curl http://localhost:3000/api/health
curl -X POST http://localhost:3000/api/test -H "Content-Type: application/json" -d '{"test": true}'

# Test with auth
curl http://localhost:3000/api/protected -H "Authorization: Bearer YOUR_TOKEN"

# Check status codes (200 = success, 500 = error, 404 = not found)
curl -w "%{http_code}" -o /dev/null -s http://localhost:3000/
```

### 3. Validation Workflow

**After ANY change**:
1. ✓ Check `server.log` for compilation/runtime errors
2. ✓ Curl relevant pages/routes to verify they return 200
3. ✓ Check for console errors in browser (if UI change)
4. ✓ Verify auth protection (401/403 for protected routes)
5. ✓ Test with invalid data to confirm error handling

**Common Error Patterns**:
| Status | Meaning | Action |
|--------|---------|--------|
| 200 | Success | ✓ Page working |
| 404 | Not Found | Check file location in app/ |
| 500 | Server Error | Check server.log for stack trace |
| 401 | Unauthorized | Verify JWT token/auth middleware |
| 403 | Forbidden | Check ownership validation |

## Specialized Agents

This template includes domain-specific agents that auto-invoke based on task context. Use them explicitly for complex workflows:

- **`ui-design-specialist`** - UI/UX, shadcn/ui components, layouts, image sourcing
- **`auth-specialist`** - JWT auth, protected routes, session management (requires User model)
- **`database-specialist`** - MongoDB/Mongoose schemas, queries, aggregations (runs independently)
- **`api-integration-specialist`** - External APIs, webhooks, file uploads (runs independently)
- **`ai-apps-developer`** - Open Router API, streaming, chat interfaces
- **`quality-specialist`** - Code review, debugging, testing (runs after implementation)

**Agent Collaboration**: Most features need multiple agents. Run `database-specialist` + `ui-design-specialist` in parallel, then `auth-specialist` sequentially. Always finish with `quality-specialist` for error checking.

**Error Checking**: ALL agents MUST check `server.log` and curl test pages after making changes. See "Error Checking & Validation" section above.

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
