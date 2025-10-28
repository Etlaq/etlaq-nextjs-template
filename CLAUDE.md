# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

**Stack**: Next.js 16 | React 19 | TypeScript 5 | MongoDB/Mongoose | JWT Auth | shadcn/ui | Tailwind CSS 4

**Commands**:
```bash
npm run dev       # Start dev with Turbopack (port 3000)
npm run build     # Build for production
npm start         # Start production
npm run lint      # Run linting
```

## Critical Patterns

### Auth (JWT, 7-day expiry)
```typescript
// Protected API
import { withAuth } from '@/lib/middleware';
export const GET = withAuth(async (req, userId) => { /* ... */ });

// Client
import { useAuth } from '@/contexts/AuthContext';
const { user, login, logout } = useAuth();
```

### Database (MongoDB)
```typescript
import connectDB from '@/lib/mongodb';
await connectDB(); // ALWAYS call at start of API routes

// Models prevent re-compilation
const User = mongoose.models.User || mongoose.model('User', schema);
```

### Components
- **Path aliases**: Use `@/components`, `@/lib`, `@/hooks` (not `../`)
- **Server by default**: Add `"use client"` only for hooks/events
- **shadcn/ui**: 30+ components in `components/ui/` (don't modify)
- **Theming**: CSS variables (`bg-background`, `text-foreground`)
- **Conditionals**: `cn()` from `@/lib/utils`

## File Locations

**Auth**: `lib/auth.ts`, `lib/middleware.ts`, `contexts/AuthContext.tsx`, `app/api/auth/*`
**DB**: `lib/mongodb.ts`, `models/*.ts`
**UI**: `components/ui/*`, `app/globals.css`
**Config**: `.env.local`, `next.config.ts`

## Replace Sample Data

- `components/app-sidebar.tsx` - Navigation data (lines 10-50)
- `components/{nav-main,nav-projects,nav-user,team-switcher}.tsx` - URLs
- `components/dashboard-example/` - Mock dashboard

## Environment Variables

```env
MONGODB_URI=mongodb+srv://...
DB_NAME=your_db
JWT_SECRET=32+_char_secret  # openssl rand -base64 32
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Performance Tips

**DO**:
- Read files before creating
- Run parallel tool calls
- Use Edit over Write
- Use specialized agents
- Check terminal for errors
- Follow existing patterns

**DON'T**:
- Create unnecessary files
- Run sequential commands
- Use Bash for file ops
- Modify `components/ui/*`
- Ignore TypeScript errors

## Available Skills & Agents

**Skills**: `error-checking`, `pexels-images`, `nextjs-template-skill`

**Agents**: `ui-design-specialist`, `auth-specialist`, `database-specialist`, `api-integration-specialist`, `ai-apps-developer`, `quality-specialist`

## Saudi Arabia Context

- Currency: SAR (`ar-SA` locale)
- RTL: `dir="rtl"` for Arabic
- Phone: +966 format
- Work week: Sunday-Thursday

## Key Architecture Notes

- **TypeScript**: Strict mode, build errors ignored in dev
- **Global DB cache**: Prevents serverless connection exhaustion
- **JWT in localStorage**: Auto-persisted client auth
- **Sidebar layout**: SidebarProvider → AppSidebar + SidebarInset
- **Forms**: react-hook-form + zod validation
- **Errors**: Return `{ error: string }`, display via `toast.error()`