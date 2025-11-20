# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Critical Project Requirements

### Development Philosophy
- Get things running ASAP - no need to test as it will take time (i.e. curl the homepage)
- Try to get things done as fast as possible
- Follow existing patterns in the codebase

### Language & Localization (Arabic-First)
- **Primary language**: Arabic (العربية)
- **Secondary language**: English
- **RTL support**: Use `dir="rtl"` for Arabic content
- **Fonts**: IBM Plex Sans Arabic (Arabic) and IBM Plex Sans (English) as default fonts unless specified otherwise
- **Currency**: SAR (use `ar-SA` locale)
- **Phone format**: +966 validation
- **Work week**: Sunday-Thursday

### User Communication
- **Todo lists**: Write in Arabic, simple for non-technical users
- **Progress updates**: Keep concise and user-friendly

## Quick Start

**Stack**: Next.js 16 | React 19 | TypeScript 5 | MongoDB/Mongoose | JWT Auth | shadcn/ui | Tailwind CSS 4

**Commands**:
```bash
bun run dev       # Start dev with Turbopack (port 3000)
bun run build     # Build for production
bun start         # Start production server
bun run lint      # Run ESLint
```

## 🚨 Installing Dependencies

**ALWAYS use Bun for package management**:

```bash
# Install a package
bun add <package-name>

# Install dev dependency
bun add -d <package-name>

# Install all dependencies
bun install
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

## Template Customization

### Replace Sample Data
- `components/app-sidebar.tsx` - Navigation items (lines 10-50)
- `components/{nav-main,nav-projects,nav-user,team-switcher}.tsx` - URLs
- `components/dashboard-example/` - Mock dashboard data

### Update Branding
- Replace placeholder text with Arabic/English content
- Update navigation labels for bilingual support
- Customize theme colors in `app/globals.css`

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

## Key Architecture Notes

### TypeScript & Build
- **Strict mode**: Enabled
- **Dev mode**: Build errors ignored (fast iteration)
- **Production**: Fix all TypeScript errors before deploying

### State Management
- **Auth state**: JWT in localStorage (auto-persisted)
- **DB connections**: Global cache prevents serverless exhaustion
- **Forms**: react-hook-form + zod validation

### UI Patterns
- **Layout**: SidebarProvider → AppSidebar + SidebarInset
- **Theming**: OKLCH CSS variables
- **Error handling**: Return `{ error: string }`, display via `toast.error()`
- **Components**: Server components by default, add `"use client"` only when needed

### Testing
- **Current state**: Testing not configured
- **Future**: Consider adding Jest/Vitest if needed

## Available Skills & Agents

**Skills**: `error-checking`, `nextjs-template-skill`

**Agents**: `ui-design-specialist`, `auth-specialist`, `database-specialist`, `api-integration-specialist`, `ai-apps-developer`, `quality-specialist`, `image-specialist`
