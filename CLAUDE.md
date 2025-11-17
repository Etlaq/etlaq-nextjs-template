# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

**Stack**: Next.js 16 | React 19 | TypeScript 5 | MongoDB/Mongoose | JWT Auth | shadcn/ui | Tailwind CSS 4

**Commands**:
```bash
npm run dev       # Start dev with Turbopack (port 3000)
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
```

## Critical Patterns

### Auth (JWT, 7-day expiry)
```typescript
// Protected API route
import { withAuth } from '@/lib/middleware';
export const GET = withAuth(async (request, userId) => { /* ... */ });

// Client-side
import { useAuth } from '@/contexts/AuthContext';
const { user, token, login, register, logout } = useAuth();
```

### Database (MongoDB)
```typescript
import connectDB from '@/lib/mongodb';
await connectDB(); // ALWAYS call at start of API routes

// Prevent re-compilation
const User = mongoose.models.User || mongoose.model('User', UserSchema);
```

### Components
- **Path aliases**: Use `@/components`, `@/lib`, `@/hooks` (not `../`)
- **Server by default**: Add `"use client"` only for hooks/events
- **shadcn/ui**: 30+ components in `components/ui/` (don't modify)
- **Theming**: OKLCH CSS variables (`bg-background`, `text-foreground`)
- **Conditionals**: `cn()` from `@/lib/utils`

## Architecture

```
app/
├── api/
│   ├── auth/           # register, login, me endpoints
│   └── protected/      # withAuth() wrapped routes
├── (pages)            # Client pages with auth
└── globals.css        # OKLCH theme variables

lib/
├── auth.ts            # JWT utilities, password hashing
├── middleware.ts      # withAuth() wrapper
└── mongodb.ts         # Global connection caching

models/               # Mongoose schemas
components/
├── ui/              # shadcn components (immutable)
└── *                # Custom components

contexts/            # AuthContext with useAuth()
```

## API Patterns

**Auth Endpoints**:
- `POST /api/auth/register` - Create user (email, password, name)
- `POST /api/auth/login` - Get JWT token
- `GET /api/auth/me` - Get current user (requires Bearer token)

**Protected Routes**:
```typescript
export const GET = withAuth(async (request, userId) => {
    const user = await User.findById(userId);
    return Response.json({ user });
});
```

**Error Responses**:
```typescript
return Response.json({ error: "Descriptive message" }, { status: 400 });
// Client: toast.error(data.error)
```

## Key File Locations

- **Auth**: `lib/auth.ts`, `lib/middleware.ts`, `contexts/AuthContext.tsx`, `app/api/auth/*`
- **Database**: `lib/mongodb.ts`, `models/*.ts`
- **UI Components**: `components/ui/*`, `app/globals.css`
- **Config**: `.env.local`, `next.config.ts`, `components.json`

## Replace Sample Data

- `components/app-sidebar.tsx` - Navigation items (lines 10-50)
- `components/{nav-main,nav-projects,nav-user,team-switcher}.tsx` - URLs
- `components/dashboard-example/` - Mock dashboard data

## Environment Variables

Required in `.env.local`:
```env
MONGODB_URI=mongodb+srv://...
DB_NAME=your_database_name
JWT_SECRET=32+_character_secret  # openssl rand -base64 32
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Performance Tips

**DO**:
- Read files before creating new ones
- Run parallel tool calls when possible
- Use Edit tool over Write for existing files
- Use specialized agents for complex tasks
- Check server logs for runtime errors
- Follow existing patterns in codebase

**DON'T**:
- Create unnecessary files or documentation
- Run sequential commands that could be parallel
- Use Bash for file operations (use Read/Edit/Write)
- Modify `components/ui/*` files
- Ignore TypeScript errors in production builds

## Available Skills & Agents

**Skills**: `error-checking`, `nextjs-template-skill`

**Agents**: `ui-design-specialist`, `auth-specialist`, `database-specialist`, `api-integration-specialist`, `ai-apps-developer`, `quality-specialist`, `image-specialist`

## Saudi Arabia Context

- Currency: SAR (use `ar-SA` locale)
- RTL support: `dir="rtl"` for Arabic
- Phone format: +966 validation
- Work week: Sunday-Thursday

## Key Architecture Notes

- **TypeScript**: Strict mode enabled, build errors ignored in dev
- **Global DB cache**: Prevents serverless connection exhaustion
- **JWT in localStorage**: Auto-persisted client-side auth
- **Sidebar layout**: SidebarProvider → AppSidebar + SidebarInset
- **Forms**: react-hook-form + zod validation
- **Errors**: Return `{ error: string }`, display via `toast.error()`
- **No tests**: Testing not configured (consider adding Jest/Vitest)
- try to get things done as fast as possible
- support arabic as the default language.
- when developing the application, your progress todolist should be simple for non technical users

## E2B Sandbox Environment

**View dev server logs**:
```bash
tail -f /workspace/dev-server.log
```

**Restart dev server**:
```bash
pkill -f "bun dev"
cd /workspace/etlaq-nextjs-template
bun dev --port 3000 --hostname 0.0.0.0 >> /workspace/dev-server.log 2>&1 &
```