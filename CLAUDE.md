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

## Project Architecture

This is a Next.js 15 template built for Etlaq Studio AI's platform. It serves as a comprehensive template showcasing modern React patterns with a complete UI component library.

### Tech Stack
- **Next.js 15** with App Router and Turbopack for fast development
- **TypeScript 5** for full type safety
- **Tailwind CSS 4** with CSS variables and custom theming
- **Shadcn/ui** component library (New York variant with neutral base colors)
- **React 19** with server components and modern hooks

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

### Key Architectural Decisions

#### Data Flow
- Sample data embedded in components (see `app-sidebar.tsx` data object)
- Static navigation structure with placeholder URLs
- Form validation using Zod schemas with React Hook Form
- State management through React context and hooks

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

## Template Structure and Customization

### Example Components (Modify as Needed)
The following components are examples and should be modified for specific use cases:
- `components/app-sidebar.tsx` - Contains sample data object that should be replaced
- `components/nav-main.tsx`, `components/nav-projects.tsx`, `components/nav-user.tsx` - Navigation with placeholder URLs
- `components/team-switcher.tsx` - Sample team data
- `components/login-form.tsx` - Basic login form template
- `components/data-table.tsx` - Generic data table implementation
- `components/chart-area-interactive.tsx` - Sample chart component

### Example Pages (Modify as Needed)
- `app/dashboard/page.tsx` - Dashboard with sample data from `app/dashboard/data.json`
- `app/login/page.tsx` - Basic login page
- `app/page.tsx` - Landing page template

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