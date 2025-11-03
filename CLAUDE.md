# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 CRITICAL: User Communication Rules

**NEVER mention these technical details to users:**
- localhost, port numbers (3000, 8585, etc.)
- npm/bun commands (npm run dev, bun install, etc.)
- Terminal commands, curl, restart scripts
- File paths, server logs, technical debugging info
- "Preview URL", "dev server", "Ready at..."

**Instead, say:**
- "Done! Your website is ready to view in the preview."
- "I've added [feature]. Check it out!"
- "Updated! The changes are live."

Users don't need to know HOW things work - they just want to see results.

## Quick Start

**Stack**: Next.js 16 | React 19 | TypeScript 5 | MongoDB/Mongoose | JWT Auth | shadcn/ui | Tailwind CSS 4

**Commands**:
```bash
npm run dev       # Start dev with Turbopack (port 3000)
npm run build     # Build for production
npm start         # Start production
npm run lint      # Run linting
```

## 🚨 CRITICAL: Installing Dependencies

**ALWAYS use Bun and restart the server after installing packages:**

```bash
# Install a new package
bun add <package-name>

# Then IMMEDIATELY restart the dev server
/usr/local/bin/restart-dev-server.sh
```

**Why?**
- The dev server auto-starts on container boot
- New dependencies require a server restart to be loaded
- The restart script uses SIGHUP signal to gracefully restart without killing code-server

**Examples**:
```bash
# Install single package
bun add lodash
/usr/local/bin/restart-dev-server.sh

# Install dev dependency
bun add -d @types/lodash
/usr/local/bin/restart-dev-server.sh

# Install multiple packages
bun add axios react-query
/usr/local/bin/restart-dev-server.sh

# Install all dependencies (if package.json changed)
bun install
/usr/local/bin/restart-dev-server.sh
```

**What restart does**:
1. Kills all Next.js/Bun dev processes (NOT code-server)
2. Reinstalls dependencies with `bun install`
3. Starts fresh dev server on port 3000
4. Keeps code-server running (port 8585)

**NEVER**:
- ❌ Don't use `npm install` or `pnpm install` - use `bun add` or `bun install`
- ❌ Don't manually start the dev server - it auto-starts and auto-restarts
- ❌ Don't forget to restart after adding dependencies

## 📊 Server Logs & Monitoring

The dev server maintains two log files for different purposes:

### Log Files

**Rotating Log** (Quick View - Last 50 Lines):
```bash
tail -f server.log
# or
cat server.log
```
- **Location**: `./server.log` (project root)
- **Size**: Automatically limited to last 50 lines
- **Purpose**: Quick status checks, recent activity
- **Updates**: Real-time as server runs

**Permanent Log** (Full History):
```bash
tail -f server-perm.log
# or
cat server-perm.log
```
- **Location**: `./server-perm.log` (project root)
- **Size**: Never truncated, grows indefinitely
- **Purpose**: Full audit trail, debugging historical issues
- **Includes**: Timestamps for server starts/restarts

### Log Markers

Logs include visual markers for easy navigation:
- `━━━━ SERVER STARTED - HH:MM:SS ━━━━` - Server boot
- `🔄 SERVER RESTARTED - YYYY-MM-DD HH:MM:SS UTC` - Manual/dependency restart

### Monitoring Best Practices

**During Development**:
```bash
# Watch recent activity
tail -f server.log

# Search for errors
grep -i error server-perm.log

# Check last restart
grep "RESTARTED" server-perm.log | tail -1
```

**Troubleshooting**:
```bash
# If server isn't responding
ps aux | grep "bun dev"  # Check if running

# If port conflict
lsof -i :3000  # See what's using the port

# Force restart
/usr/local/bin/restart-dev-server.sh
```

### Log Rotation Details

- **Rotating log**: Uses `tail -n 50` after each write
- **Permanent log**: Appends only, never truncated
- **Both logs**: Updated in real-time via log-wrapper.sh
- **Restart behavior**: Adds timestamp marker, preserves history

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

**Skills**: `error-checking`, `nextjs-template-skill`

**Agents**: `ui-design-specialist`, `auth-specialist`, `database-specialist`, `api-integration-specialist`, `ai-apps-developer`, `quality-specialist`, `image-specialist`

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