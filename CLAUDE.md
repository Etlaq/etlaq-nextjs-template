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

**IMPORTANT**: Development server runs on **port 3000**. Check the terminal output for compilation errors and warnings.

## Project Architecture

Next.js 16 template with App Router, TypeScript 5 (strict mode), Tailwind CSS 4 (OKLCH colors), MongoDB/Mongoose, JWT authentication, and 30+ shadcn/ui components (New York variant).

### Authentication System (Multi-File Pattern)

JWT-based authentication is split across multiple files that work together:

**Core Files**:
1. **`lib/auth.ts`** - Core utilities: `hashPassword()`, `verifyPassword()`, `generateToken()`, `verifyToken()`, `extractTokenFromHeader()`
2. **`lib/middleware.ts`** - `withAuth()` HOF that wraps API routes and extracts userId from JWT
3. **`models/User.ts`** - Mongoose schema with email validation, password hashing, timestamps
4. **`contexts/AuthContext.tsx`** - Client-side React Context with localStorage persistence
5. **`app/api/auth/{register,login,me}/route.ts`** - Authentication endpoints

**Usage Patterns**:
```typescript
// Server: Protect API routes with middleware
import { withAuth } from '@/lib/middleware';

export const GET = withAuth(async (request, userId) => {
  // userId is automatically extracted from JWT token
  // Return 401 if token is missing/invalid
});

// Client: Access auth state in components
'use client';
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, loading } = useAuth();
  // user contains { id, email, name, createdAt, updatedAt }
}
```

**Token Flow**:
- Registration/login → server generates JWT (7-day expiry) → client stores in localStorage
- Protected requests → client sends `Authorization: Bearer <token>` header
- `withAuth()` middleware → verifies token → extracts userId → passes to handler
- Token persists across page refreshes via localStorage

### Database Connection Pattern

MongoDB connection with global caching prevents connection exhaustion in Next.js serverless functions:

**Key Pattern** (`lib/mongodb.ts`):
```typescript
// Global cache persists between hot reloads
global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn; // Reuse existing connection

  cached.promise = mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
    dbName: DB_NAME
  });

  return await cached.promise;
}
```

**Usage**: Call `await connectDB()` at the start of every API route that touches the database.

**Model Pattern** (`models/User.ts`):
```typescript
// Prevent model recompilation during dev hot reload
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
```

### Component Architecture

**Path Aliases** (`tsconfig.json`):
- `@/*` maps to root directory (use `@/components`, `@/lib`, `@/hooks`)
- Configured in both `tsconfig.json` and `components.json`

**Shadcn/ui Configuration** (`components.json`):
- Style: "new-york" variant with Radix UI primitives
- Base color: "neutral" with OKLCH color space
- Icon library: lucide-react
- 30+ components in `components/ui/`

**Layout Pattern** (Sidebar Dashboard):
```
<SidebarProvider>  ← Global sidebar state
  <AppSidebar>     ← Collapsible navigation (contains sample data to replace)
    <NavMain>      ← Main navigation links
    <NavProjects>  ← Project/workspace switcher
    <NavUser>      ← User profile dropdown
  </AppSidebar>
  <SidebarInset>   ← Main content area with header/breadcrumbs
    {children}
  </SidebarInset>
</SidebarProvider>
```

**Component Types**:
- Server Components by default (no "use client" directive)
- Client Components require "use client" at top (for hooks, event handlers, browser APIs)
- Use composition over prop drilling

**Theming** (`app/globals.css`):
- CSS variables for colors in OKLCH space (better perceptual uniformity)
- Dark/light mode via `next-themes` with automatic system preference detection
- Component variants via `class-variance-authority` (cva)

### Key Files to Customize

**Sample Data to Replace**:
- `components/app-sidebar.tsx` - Navigation/teams/projects data object (lines 10-50)
- `components/{nav-main,nav-projects,nav-user,team-switcher}.tsx` - Placeholder URLs
- `components/dashboard-example/` - Sample dashboard with mock data

**Configuration Files**:
- `next.config.ts` - TypeScript build errors ignored for dev (`typescript.ignoreBuildErrors: true`)
- `.env.local` - Copy from `.env.example`, set MONGODB_URI, JWT_SECRET, DB_NAME
- `app/globals.css` - CSS variables for theming (modify for brand colors)

**Do Not Modify**:
- `components/ui/*` - Shadcn/ui component library (managed via CLI)

## Tech Stack

**Package Manager**: npm (not yarn/pnpm)

**Core Dependencies**:
- **Framework**: Next.js 16.0, React 19.2, TypeScript 5.9
- **Database**: mongoose (MongoDB ODM)
- **Auth**: jsonwebtoken, bcryptjs
- **UI**: 30+ shadcn/ui components, lucide-react icons, @tabler/icons-react
- **Forms**: react-hook-form + zod validation
- **Tables**: @tanstack/react-table with sorting/filtering
- **Charts**: recharts (built on D3)
- **Interactions**: @dnd-kit (drag-drop), react-resizable-panels
- **Styling**: Tailwind CSS 4, next-themes, class-variance-authority
- **Notifications**: sonner (toast library)

**Key Hooks**:
- `useAuth()` - Auth state (user, login, logout, loading)
- `useSidebar()` - Sidebar state (open, setOpen, toggleSidebar)
- `useIsMobile()` - Mobile viewport detection

## Development Patterns

**TypeScript**:
- Strict mode enabled (no implicit any)
- Type all function parameters and return values
- Extend interfaces for Mongoose documents: `interface IUser extends Document`

**Styling**:
- Use Tailwind utility classes
- Use `cn()` helper from `@/lib/utils` for conditional classes
- Use CSS variables for theme colors (e.g., `bg-background`, `text-foreground`)

**Forms**:
- Use react-hook-form with zod validation
- Example: `const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) })`

**State Management**:
- React Context for global state (auth, sidebar)
- React Hook Form for form state
- URL search params for shareable state

**Error Handling**:
- API routes return consistent JSON error format: `{ error: string }`
- Client displays errors via sonner toast: `toast.error(message)`

## Saudi Arabia Application Context

This template is designed for the Saudi Arabian market. Consider these defaults:

- **Currency**: Saudi Riyal (SAR) - `new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' })`
- **Locale**: Arabic (ar-SA) primary, English secondary
- **RTL Support**: Use `dir="rtl"` in layout for Arabic content
- **Phone Format**: Saudi format (+966) - `/^(\+966|966|05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/`
- **Date/Time**: Consider Hijri calendar support where appropriate
- **Payments**: Mada, STC Pay, Apple Pay, Visa/Mastercard
- **Work Week**: Sunday-Thursday (not Monday-Friday)

## Claude Code Skills & Agents

This template includes specialized skills and agents in `.claude/`:

**Skills** (invoke with `/skill-name`):
- `error-checking` - Verify no runtime errors after changes
- `pexels-images` - Fetch contextually accurate images from Pexels API
- `nextjs-template-skill` - Template-specific components and patterns

**Agents** (auto-invoked based on task context):
- `ui-design-specialist` - UI/UX design, shadcn/ui components, layouts
- `auth-specialist` - JWT auth, protected routes, session management
- `database-specialist` - MongoDB schemas, queries, aggregations
- `api-integration-specialist` - External APIs, webhooks, file uploads
- `ai-apps-developer` - Open Router API, streaming, chat interfaces
- `quality-specialist` - Code review, security audits, testing

Agents have detailed instructions in `.claude/agents/*.md` for their specific domains.

## Environment Variables

Required variables (see `.env.example`):

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `DB_NAME` | Database name | `etlaq_auth` |
| `JWT_SECRET` | Secret for JWT signing (32+ chars) | Generate: `openssl rand -base64 32` |
| `NEXT_PUBLIC_API_URL` | API base URL | `http://localhost:3000` (dev) |
| `PEXELS_API_KEY` | Optional: Pexels image API | Get at pexels.com/api |
| `OPEN_ROUTER_API_KEY` | Optional: AI model API | Get at openrouter.ai |

Copy `.env.example` to `.env.local` and fill in your values.
