# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Philosophy

- Get things running ASAP - no need to test as it will take time (i.e. curl the homepage)
- Try to get things done as fast as possible
- Follow existing patterns in the codebase

## Language & Localization (Arabic-First)

- **Primary language**: Arabic (العربية)
- **Secondary language**: English
- **RTL support**: Use `dir="rtl"` for Arabic content
- **Fonts**: IBM Plex Sans Arabic (Arabic) and IBM Plex Sans (English) as default fonts unless specified otherwise
- **Currency**: SAR (use `ar-SA` locale)
- **Phone format**: +966 validation
- **Work week**: Sunday-Thursday

## User Communication

- **Todo lists**: Write in Arabic, simple for non-technical users
- **Progress updates**: Keep concise and user-friendly

## Commands

```bash
# Development (uses Turbopack)
bun dev

# Production build
bun run build
bun start

# Linting
bun lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router (React 19)
- **Database**: MongoDB with Mongoose ODM
- **Auth**: JWT (bcryptjs + jsonwebtoken) with 7-day token expiration
- **Styling**: Tailwind CSS 4 with OKLCH color system
- **UI**: 30+ shadcn/ui components (New York style) in `components/ui/`
- **Animations**: Motion library (`motion/react`)

### Project Structure
```
app/                    # Next.js App Router
├── api/auth/           # Auth endpoints (login, register, me)
├── api/protected/      # Protected API routes
├── login/              # Login page
├── register/           # Registration page
└── layout.tsx          # Root layout with AuthProvider

lib/
├── auth.ts             # JWT utilities (hash, verify, generate tokens)
├── middleware.ts       # withAuth() HOF for protected routes
├── mongodb.ts          # Mongoose connection with pooling
└── utils.ts            # cn() utility for class merging

models/                 # Mongoose schemas
contexts/AuthContext.tsx  # Client-side auth state
components/ui/          # shadcn/ui components (DO NOT modify)
```

### Authentication Flow

**Server-side** (API routes):
```tsx
import { withAuth } from '@/lib/middleware';

export const GET = withAuth(async (req, userId) => {
  // userId extracted from JWT
  return Response.json({ data: 'protected' });
});
```

**Client-side**:
```tsx
'use client';
import { useAuth } from '@/contexts/AuthContext';

const { user, login, logout, loading } = useAuth();
```

### Path Aliases
Always use `@/` imports:
```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

### Environment Variables
Required in `.env.local`:
- `MONGODB_URI` - MongoDB connection string
- `DB_NAME` - Database name
- `JWT_SECRET` - 32+ character secret for JWT
- `NEXT_PUBLIC_API_URL` - API base URL

### Component Patterns

**Server Components** (default - no directive needed):
```tsx
export default function Page() {
  return <div>Server-rendered</div>;
}
```

**Client Components** (add directive for hooks/events):
```tsx
'use client';
import { useState } from 'react';
```

**Conditional Classes** with cn():
```tsx
<div className={cn("base", isActive && "active")} />
```

**RTL-safe Spacing** (use logical properties):
```tsx
<div className="ps-4 pe-2 ms-auto me-0">
  {/* ps = padding-inline-start, pe = padding-inline-end */}
</div>
```

### Theming
Uses OKLCH color variables in `globals.css`. Use semantic colors:
```tsx
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground" />
  <p className="text-muted-foreground" />
</div>
```
