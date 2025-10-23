# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Server

**IMPORTANT**: The development server is most likely already running on **port 3000** with auto-restart enabled. You do NOT need to restart or run the server manually.

- To check server status or errors, **read the server logs from `/server.log`** instead of restarting
- The server automatically restarts when you make code changes
- Server logs are saved to `/server.log` in the project root
- Only run commands if explicitly requested by the user

## Development Commands

```bash
# Start development server with Turbopack (usually already running)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting and type checking
npm run lint
```

## Important Instruction Reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

## Specialized Agents

This template includes specialized agents for common development tasks. These agents automatically provide detailed guidance when working on specific areas:

### Core Development Agents

**UI/Design** → `ui-design-specialist`
- UI/UX design, color schemes, layouts, shadcn/ui components
- Modern minimalist design (avoid AI-app clichés)
- Includes image sourcing (Unsplash, placeholders, avatars)

**Authentication** → `auth-specialist`
- JWT authentication, protected routes, session handling
- Complete auth system with bcryptjs
- Works with: `database-specialist` for User model

**Database** → `database-specialist`
- MongoDB/Mongoose operations, schemas, queries
- CRUD operations, aggregation pipelines, indexes
- Independent - can run first or parallel with UI work

**API Integration** → `api-integration-specialist`
- External APIs, webhooks, third-party services
- Image sources (Unsplash, Pexels), public APIs
- Independent - can run parallel with other agents

**AI Features** → `ai-apps-developer`
- Open Router API, streaming responses, chat interfaces
- Model selection (20b/120b), provider routing
- Works with: `auth-specialist` for protected endpoints

### Support Agent

**Quality & Debugging** → `quality-specialist` - Code review, security audits, debugging, and testing (runs after implementation)


### Agent Collaboration Tips

**Parallel Execution:** These agents can work simultaneously:
- `ui-design-specialist` + `database-specialist` (frontend/backend split)
- `api-integration-specialist` + `ai-apps-developer` (external services)

**Sequential Requirements:** These must run in order:
- `database-specialist` → `auth-specialist` (auth needs User model)
- Any implementation → `quality-specialist` (reviews and tests completed code)

**Complex Features:** Most features use multiple agents. Example for a dashboard:
1. `database-specialist` + `ui-design-specialist` (parallel)
2. `auth-specialist` (after database)
3. `api-integration-specialist` (if external data needed)
4. `quality-specialist` (final review and testing)

### When to Use Which Agent - Task Guide

**IMPORTANT**: Always use the specialized agents for their respective domains. They provide comprehensive, context-aware guidance and prevent common mistakes.

#### UI/Design Tasks → `ui-design-specialist`
- Creating new pages or components
- Implementing responsive layouts
- Choosing color schemes and typography
- Adding shadcn/ui components
- Building forms, modals, dialogs
- Implementing navigation menus
- Creating data tables or charts
- Any customer-facing interface work

#### Database Tasks → `database-specialist`
- Creating new Mongoose models/schemas
- Writing database queries
- Implementing CRUD operations
- Setting up indexes or migrations
- Designing data relationships
- Optimizing query performance
- Working with aggregation pipelines
- Any MongoDB/Mongoose work

#### Authentication Tasks → `auth-specialist`
- Implementing login/register flows
- Creating protected routes
- Adding role-based access control
- Implementing password reset
- Working with JWT tokens
- Session management
- Adding OAuth/social login
- Any security or auth-related work

#### API Integration Tasks → `api-integration-specialist`
- Integrating external APIs
- Setting up webhooks
- Working with third-party services
- Implementing file uploads
- Adding payment integrations
- Working with GraphQL
- Rate limiting and caching
- Any external service integration

#### AI Features Tasks → `ai-apps-developer`
- Integrating AI models
- Implementing chat interfaces
- Adding streaming responses
- Working with Open Router API
- Building AI-powered features
- Implementing embeddings/vectors
- Any AI/ML integration work

#### Quality & Debugging Tasks → `quality-specialist`
- Code review and security audits
- Performance optimization
- TypeScript quality checks
- Fixing build/runtime errors
- Debugging 404/500 errors
- Fixing hydration errors
- Dev server management
- Testing routes and functionality
- After any significant implementation

### Common Task Examples

**Task: "Build a user profile page"**
```
1. Use `database-specialist` - Design User profile schema
2. Use `ui-design-specialist` - Create profile page UI
3. Use `auth-specialist` - Add authentication protection
4. Use `quality-specialist` - Review implementation
```

**Task: "Add blog with images"**
```
1. Use `database-specialist` - Create Blog model
2. Use `ui-design-specialist` - Design blog layout and source images
3. Use `api-integration-specialist` - Add image upload to API
4. Use `quality-specialist` - Security review
```

**Task: "Implement AI chat feature"**
```
1. Use `database-specialist` - Create Message/Chat schemas
2. Use `ai-apps-developer` - Integrate AI streaming
3. Use `ui-design-specialist` - Build chat interface
4. Use `auth-specialist` - Add user authentication
5. Use `quality-specialist` - Review security
```

**Task: "Fix broken authentication"**
```
1. Use `quality-specialist` - Debug and identify error source
2. Use `auth-specialist` - Fix auth implementation
3. Use `quality-specialist` - Verify security
```

**Task: "Optimize slow page load"**
```
1. Use `quality-specialist` - Profile performance and identify issues
2. Use `database-specialist` - Optimize queries if DB-related
3. Use `ui-design-specialist` - Optimize UI rendering if frontend
4. Use `quality-specialist` - Final performance review
```

## Code Quality Standards

### TypeScript
- Strict mode enabled with proper types
- No `any` types unless absolutely necessary
- Type all function parameters and return values
- Use interfaces for component props

### Production Code
- Remove `console.log` statements from production code
- Use proper logging utilities for debugging
- Clean up commented-out code before committing

### Error Handling
- Implement error boundaries for async operations
- Provide user-friendly error messages
- Use try-catch blocks for API calls
- Handle edge cases and loading states

### Accessibility
- ARIA labels for interactive elements
- Keyboard navigation support
- Semantic HTML elements
- Proper focus management
- Alt text for all images

### Code Organization
- Clean imports and organized file structure
- Group related functionality
- Follow Next.js file conventions
- Use path aliases (`@/components`, `@/lib`, etc.)

## Implementation Validation

After implementing features, ensure:
- ✓ Code builds successfully (`npm run build` passes)
- ✓ No TypeScript errors or warnings
- ✓ All requested features implemented and working
- ✓ Responsive design on mobile and desktop
- ✓ Proper error handling in place
- ✓ Accessibility standards met
- ✓ No console errors in browser

## Project Architecture

This is a Next.js 15 template built for Etlaq Studio AI's platform. It serves as a comprehensive template showcasing modern React patterns with a complete UI component library and JWT-based authentication.

### Tech Stack
- **Next.js 15** with App Router and Turbopack for fast development
- **TypeScript 5** for full type safety
- **Tailwind CSS 4** with CSS variables and custom theming
- **Shadcn/ui** component library (New York variant with neutral base colors)
- **React 19** with server components and modern hooks
- **MongoDB** with Mongoose for database
- **JWT Authentication** with bcryptjs for password hashing

### Core Dependencies
- **UI Components**: Radix UI primitives wrapped with shadcn/ui styling
- **Icons**: Lucide React (primary) and Tabler Icons
- **Forms**: React Hook Form with Zod validation schemas
- **Data Visualization**: Recharts for charts and graphs
- **Tables**: TanStack Table for sortable/filterable data tables
- **Interactions**: dnd-kit for drag-and-drop functionality
- **Theming**: next-themes for light/dark mode switching
- **Notifications**: Sonner for toast notifications
- **Layout**: React Resizable Panels for flexible layouts
- **Database**: Mongoose for MongoDB integration
- **Authentication**: JWT tokens, bcryptjs, jsonwebtoken

### Authentication System Overview
The template includes JWT-based authentication with MongoDB. For detailed implementation guidance, use the **`auth-specialist` agent**.

**Quick reference:**
- Files: `lib/auth.ts`, `lib/middleware.ts`, `models/User.ts`, `contexts/AuthContext.tsx`
- API routes: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- Use `withAuth()` middleware for protected API routes
- Use `useAuth()` hook in client components
- See `.env.example` for required environment variables

### Architecture Patterns

#### Component Configuration
- Shadcn/ui configured via `components.json` with path aliases:
  - `@/components` → components directory
  - `@/lib` → lib directory
  - `@/hooks` → hooks directory
- New York style with neutral colors and CSS variables enabled
- Lucide React as the primary icon library

#### Layout Architecture
The template implements a sidebar-based dashboard layout:
- `SidebarProvider` wraps the entire dashboard for state management
- `AppSidebar` contains collapsible navigation with teams, main nav, and projects
- `SidebarInset` provides the main content area with header and breadcrumbs
- Navigation components (`nav-main`, `nav-projects`, `nav-user`) handle different sidebar sections

#### Theming System
- Uses Tailwind CSS 4 with CSS custom properties
- OKLCH color space for better color consistency
- Comprehensive dark/light theme support via CSS variables
- Colors defined in `app/globals.css` with semantic naming

#### Component Patterns
- Server Components by default, Client Components marked with "use client"
- Composition pattern for complex components (sidebar, forms, tables)
- Props spreading and TypeScript generics for flexible APIs
- Utility-first styling with `cn()` helper for conditional classes

#### Database
- MongoDB with Mongoose ORM and global connection caching (`lib/mongodb.ts`)
- For schema design, queries, and operations, use the **`database-specialist` agent**

### Key Architectural Decisions

#### Data Flow
- Sample data embedded in components (see `app-sidebar.tsx` data object)
- Static navigation structure with placeholder URLs
- Form validation using Zod schemas with React Hook Form
- State management through React context and hooks
- Authentication state managed via AuthContext with localStorage persistence

#### Styling Strategy
- Tailwind utility classes with semantic CSS variables
- Component variants using class-variance-authority
- Responsive design with mobile-first breakpoints
- Consistent spacing scale and typography

#### Development Workflow
- TypeScript strict mode enabled
- ESLint with Next.js recommended rules
- Hot reloading with Turbopack for fast development
- Path aliases configured for clean imports
- Build errors ignored in `next.config.ts` (change for production)

## Template Structure and Customization

### Core System Files (Implemented)
The following core functionality is already implemented:
- **Authentication**: `lib/auth.ts`, `lib/middleware.ts`, `models/User.ts`, `contexts/AuthContext.tsx`
- **Database**: `lib/mongodb.ts` with connection pooling
- **API Routes**: `/api/auth/*` for authentication, `/api/protected/*` for examples
- For working with these systems, invoke the relevant specialized agent

### Example Components (Modify as Needed)
The following components are examples and should be modified for specific use cases:
- `components/app-sidebar.tsx` - Contains sample data object that should be replaced
- `components/nav-main.tsx`, `components/nav-projects.tsx`, `components/nav-user.tsx` - Navigation with placeholder URLs
- `components/team-switcher.tsx` - Sample team data
- `components/login-form.tsx` - Basic login form template
- `components/data-table.tsx` - Generic data table implementation
- `components/chart-area-interactive.tsx` - Sample chart component

### Example Pages (Modify as Needed)
- `components/dashboard-example/page.tsx` - Dashboard example with sample data from `components/dashboard-example/data.json`
- `components/login-example/page.tsx` - Basic login page example
- `app/page.tsx` - Landing page template
- `app/login/page.tsx` - Login page
- `app/register/page.tsx` - Registration page

### UI Components Library (Keep as Base)
The `components/ui/` directory contains the shadcn/ui component library that serves as the foundation. These should generally be kept as-is unless specific customization is required.

## Key Configuration Files

### Component Configuration
- `components.json` - Shadcn/ui configuration with New York style and neutral colors
- Path aliases: `@/components`, `@/lib`, `@/hooks`, `@/ui`

### Styling Configuration
- `app/globals.css` - CSS variables and Tailwind imports using OKLCH color space
- Uses Tailwind CSS 4 with CSS custom properties
- `tw-animate-css` plugin for additional animations

### TypeScript Configuration
- `tsconfig.json` - Strict mode enabled with ES2017 target
- Path aliases configured with `@/*` mapping to root directory

### Next.js Configuration
- `next.config.ts` - Configured with:
  - ESLint and TypeScript errors ignored during builds (change for production)
  - Dev indicators disabled
  - CORS headers for E2B sandbox development

## Package Management

This project uses **npm** as the package manager. Dependencies include:
- Core UI library: 30+ shadcn/ui components with Radix UI primitives
- Icons: lucide-react (536+ icons) as primary, @tabler/icons-react as secondary
- Charts: recharts for data visualization
- Tables: @tanstack/react-table for complex data tables
- Forms: react-hook-form + zod for validation
- Drag & Drop: @dnd-kit suite (core, sortable, modifiers, utilities)
- Database: mongoose for MongoDB
- Auth: jsonwebtoken, bcryptjs

## Custom Hooks & Contexts

- `useIsMobile()` - Detects mobile viewport (defined in `hooks/use-mobile.ts`)
- `useSidebar()` - Manages sidebar state from SidebarContext
- `useAuth()` - Access authentication state and functions (login, register, logout)

## Claude Code Integration

This template includes custom Claude Code agents and skills in the `.claude/` directory to enhance development workflow.

### Specialized Domain Agents

**UI Design Specialist** (`.claude/agents/ui-design-specialist.md`)
- Modern minimalist design with shadcn/ui components
- Color system, typography, layout patterns
- Image sourcing (Unsplash, placeholders, avatars)
- iOS-inspired patterns for customer apps
- Accessibility and responsive design

**Auth Specialist** (`.claude/agents/auth-specialist.md`)
- JWT authentication and session management
- Protected routes and API security
- User registration, login flows
- Security best practices

**Database Specialist** (`.claude/agents/database-specialist.md`)
- MongoDB/Mongoose schema design
- CRUD operations and queries
- Aggregation pipelines
- Performance optimization

**API Integration Specialist** (`.claude/agents/api-integration-specialist.md`)
- External APIs and webhooks
- Image sources (Unsplash, Pexels)
- File uploads and GraphQL
- Rate limiting and error handling

**AI Apps Developer** (`.claude/agents/ai-apps-developer.md`)
- Open Router API integration
- Streaming responses
- Model selection (20b/120b)
- AI chat interfaces

**Quality Specialist** (`.claude/agents/quality-specialist.md`)
- Code review and security audits
- TypeScript quality checks
- Performance optimization
- Debugging and error resolution
- Dev server management
- Route testing

### Skills

**Next.js Template Skill** (`.claude/skills/nextjs-template-skill/`)
- Provides comprehensive reference for working with this template
- Documents component organization and architecture patterns
- Includes usage examples for all 30+ shadcn/ui components
- Guidelines for replacing sample data with production implementations
- Reference files:
  - `SKILL.md` - Quick start and architecture overview
  - `COMPONENTS.md` - Complete UI component library reference with examples
  - `NEXTJS_REFERENCE.md` - Full Next.js 15 App Router documentation

### Using Agents and Skills

**Automatic invocation:** Specialized agents auto-invoke based on task context (e.g., `auth-specialist` for authentication tasks).

**Manual invocation:** Use the Task tool with agent name for complex workflows requiring specific expertise.

**Multiple agents:** Complex features often need multiple agents working together (e.g., authenticated dashboard = `auth-specialist` + `database-specialist` + `ui-design-specialist`).

**Skills:** Reference the Next.js Template Skill for component usage examples and architecture patterns.

## File Size Reference

Notable component sizes for complexity assessment:
- `components/ui/sidebar.tsx` - ~750 lines (complete sidebar system)
- `components/data-table.tsx` - 26+ KB (full-featured data table)
- `components/ui/` directory - ~5200 lines total (comprehensive UI library)
