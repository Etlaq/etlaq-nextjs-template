# Etlaq Next.js Template

A production-ready Next.js 16 template with JWT authentication, MongoDB integration, and a comprehensive UI component library. Built for rapid development of modern web applications.

## ✨ Features

- **🔐 Complete Authentication System** - JWT-based auth with bcryptjs password hashing, protected routes, and session management
- **🗄️ MongoDB Integration** - Mongoose ORM with type-safe schemas and connection pooling
- **🎨 30+ UI Components** - shadcn/ui component library (New York style) with Radix UI primitives
- **🤖 AI-Powered Development** - Specialized Claude Code agents for common development tasks
- **⚡ Modern Stack** - Next.js 16, React 19, TypeScript 5, Tailwind CSS 4
- **🌓 Theme Support** - Dark/light mode with OKLCH color system
- **📱 Responsive Design** - Mobile-first RTL-ready layouts with sidebar navigation
- **🔧 Developer Experience** - Turbopack, hot reload, strict TypeScript, ESLint

## 🚀 Quick Start

### Prerequisites

- Bun runtime (or Node.js 18+)
- MongoDB database (local or Atlas)

### Installation

1. **Clone or download this template**
   ```bash
   git clone <repository-url>
   cd etlaq-nextjs-template
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
   DB_NAME=your_app_name
   JWT_SECRET=your-super-secret-jwt-key-at-least-32-chars
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Start development server**
   ```bash
   bun dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the template

## 📁 Project Structure

```
etlaq-nextjs-template/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   └── protected/    # Protected API examples
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui component library (30+ components)
│   └── ...               # Feature components
├── lib/                   # Utility functions
│   ├── auth.ts           # JWT token utilities
│   ├── middleware.ts     # Auth middleware
│   └── mongodb.ts        # Database connection
├── models/                # Mongoose schemas
│   └── User.ts           # User model
├── contexts/              # React contexts
│   └── AuthContext.tsx   # Authentication state
└── .claude/               # Claude Code agents & skills
    ├── agents/           # Specialized development agents
    └── skills/           # Development skills
```

## 🔑 Authentication System

The template includes a complete JWT authentication system:

- **Registration**: `/register` - Create new user accounts with email/password
- **Login**: `/login` - Authenticate existing users
- **Protected Routes**: Use `withAuth()` middleware for API routes
- **Client Auth**: Use `useAuth()` hook in components
- **JWT Tokens**: 7-day expiration, secure token generation

### Example: Protected API Route

```typescript
import { withAuth } from '@/lib/middleware';

export const GET = withAuth(async (req, { user }) => {
  return Response.json({ data: 'Protected data', user });
});
```

### Example: Client Component

```typescript
'use client';
import { useAuth } from '@/contexts/AuthContext';

export default function MyComponent() {
  const { user, logout } = useAuth();

  return user ? <p>Welcome {user.name}!</p> : <p>Please log in</p>;
}
```

## 🎨 UI Components

This template includes 30+ pre-built shadcn/ui components:

**Forms & Inputs**: Button, Input, Textarea, Checkbox, Radio, Select, Switch, Slider, Label
**Layout**: Card, Separator, Tabs, Accordion, Collapsible, Resizable Panels
**Overlays**: Dialog, Sheet, Popover, Dropdown Menu, Context Menu, Tooltip, Hover Card
**Navigation**: Navigation Menu, Menubar, Sidebar (collapsible)
**Feedback**: Alert Dialog, Toast (Sonner), Progress, Badge
**Data Display**: Table, Data Table (TanStack), Avatar, Carousel, Chart (Recharts)
**Advanced**: Command Palette, Calendar, Date Picker, Input OTP

See `CLAUDE.md` for complete component documentation and usage examples.

## 🤖 Claude Code Agents

This template includes 9 specialized agents for AI-assisted development:

- **`ui-design-specialist`** - UI/UX design, layouts, shadcn/ui components
- **`auth-specialist`** - Authentication, protected routes, JWT
- **`database-specialist`** - MongoDB, Mongoose schemas, queries
- **`api-integration-specialist`** - External APIs, webhooks, integrations
- **`ai-apps-developer`** - AI features, chat interfaces, streaming
- **`image-finder`** - Image sourcing for UI (Unsplash, Pexels)
- **`code-reviewer`** - Security audits, code quality, best practices
- **`nextjs-debugger`** - Fix errors, performance issues, debugging

See `CLAUDE.md` → "When to Use Which Agent" for detailed task-to-agent mappings.

## 🛠️ Customization Guide

### 1. Update Branding
- Edit `app/layout.tsx` - Update metadata title/description
- Edit `app/page.tsx` - Replace landing page content
- Update `components/app-sidebar.tsx` - Replace sample navigation data

### 2. Configure Database
- Create your Mongoose models in `models/`
- Update `DB_NAME` in `.env.local`
- Add new schemas following the `User.ts` pattern

### 3. Add Components
- Install shadcn/ui components: `bunx shadcn@latest add <component>`
- Create custom components in `components/`
- Use TypeScript interfaces for props

### 4. Customize Theme
- Edit `app/globals.css` - Modify CSS variables for colors
- Uses OKLCH color space for better color consistency
- Light/dark mode automatically supported

### 5. Remove Example Code (Optional)
The following files contain sample data for demonstration:
- `components/app-sidebar.tsx` - Sample navigation/teams/projects data
- `components/login-form.tsx` - Non-functional UI example (different from working `/login`)
- `components/dashboard-example/` - Sample dashboard with mock data

Replace or remove these as needed for your application.

## 🔧 Development Commands

```bash
# Development
bun dev              # Start dev server with Turbopack

# Production
bun run build        # Build for production
bun start            # Start production server

# Code Quality
bun lint             # Run ESLint
```

## 📚 Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGODB_URI` | Yes | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `DB_NAME` | Yes | Database name | `my_app_db` |
| `JWT_SECRET` | Yes | Secret for JWT tokens (32+ chars) | Generate with `openssl rand -base64 32` |
| `NEXT_PUBLIC_API_URL` | Yes | API base URL | `http://localhost:3000` (dev) |

Copy `.env.example` to `.env.local` and fill in your values.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

This template works on any platform that supports Next.js 16:
- Netlify
- Railway
- Render
- AWS Amplify
- Self-hosted with Docker

Ensure your MongoDB database is accessible from your deployment environment.

## 📖 Learn More

- **Next.js Documentation** - [https://nextjs.org/docs](https://nextjs.org/docs)
- **shadcn/ui Components** - [https://ui.shadcn.com](https://ui.shadcn.com)
- **Tailwind CSS** - [https://tailwindcss.com](https://tailwindcss.com)
- **MongoDB Docs** - [https://docs.mongodb.com](https://docs.mongodb.com)
- **Claude Code** - [https://claude.com/code](https://claude.com/code)

For detailed architecture and Claude Code agent usage, see `CLAUDE.md`.

## 🤝 Support

Need help? Check these resources:
- Review `CLAUDE.md` for comprehensive development guidance
- Use the specialized Claude Code agents for specific tasks
- Check [Next.js documentation](https://nextjs.org/docs)
- Review component examples in the template

## 📄 License

MIT License - feel free to use this template for any project.

---

**Built by Etlaq Studio** - Modern templates for rapid application development
