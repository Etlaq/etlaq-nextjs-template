# Etlaq Next.js Template

A minimal Next.js 16 template with RTL support, dark mode, and HeroUI v3 components.

## Features

- **Next.js 16** with React 19 and Turbopack
- **RTL/LTR** with Arabic-first language toggle
- **Dark/Light mode** with system detection
- **HeroUI v3** component library
- **Tailwind CSS 4** with OKLCH colors
- **MongoDB** ready (Mongoose)
- **TypeScript** strict mode

## Quick Start

```bash
# Install
bun install

# Development
bun dev

# Build
bun run build

# Lint
bun lint
```

## Project Structure

```
app/
├── page.tsx              # Home page
├── layout.tsx            # Root layout
├── globals.css           # Theme & styles
components/
├── ThemeToggle.tsx       # Dark/light mode
├── LanguageToggle.tsx    # AR/EN toggle
├── ScrollReveal.tsx      # Scroll animations
contexts/
├── LanguageContext.tsx   # RTL/LTR state
lib/
├── mongodb.ts            # Database connection
├── utils.ts              # Utilities
```

## Usage

### Language Toggle

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

const { t, isArabic } = useLanguage();

<h1>{t('مرحبا', 'Hello')}</h1>
```

### Theme Toggle

```tsx
import { ThemeToggle } from '@/components/ThemeToggle';

<ThemeToggle />
```

### HeroUI Components

```tsx
import { Button, Card } from '@heroui/react';

<Button variant="primary">Click me</Button>
<Card>Content</Card>
```

## Environment

```env
MONGODB_URI=mongodb+srv://...
DB_NAME=your_db_name
```

## Documentation

- See `CLAUDE.md` for development guidelines
- See [HeroUI v3 Docs](https://v3.heroui.com) for components
- See [Next.js Docs](https://nextjs.org/docs) for framework

---

**Built by Etlaq Studio**
