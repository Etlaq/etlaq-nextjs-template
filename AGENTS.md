# AGENTS.md

## Build Commands

```bash
bun dev              # Start dev server with Turbopack
bun run build        # Production build
bun start            # Start production server
bun lint             # Run ESLint
bun run grab-server  # Run react-grab visual editor server
```

## Code Style Guidelines

### Imports
- Use absolute imports with `@/` alias: `import X from '@/lib/x'`
- Group imports: external libs, then internal components/utils
- No default exports for named exports (prefer consistency)

### TypeScript
- Strict mode enabled in tsconfig.json
- Avoid `any` - use `unknown` or proper types
- Define interfaces for all props, API responses, and payloads
- Use type guards for runtime type checking (e.g., `isValidationError`)

### Naming Conventions
- Components: PascalCase for files and exports
- Variables/functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Interfaces: PascalCase with descriptive names (e.g., `MongooseValidationError`)

### File Organization
- Server components: default (no `'use client'`)
- Client components: `'use client'` at top, hooks in body
- API routes: `app/api/[resource]/route.ts` with named exports (GET, POST, etc.)
- Utilities: `lib/*.ts`
- Components: `components/*.tsx`
- Models: `models/*.ts` (Mongoose schemas)

### Error Handling
- API routes: try/catch with specific error type guards
- Return consistent error format: `{ error: 'message' }` with appropriate status codes
- Log errors with `console.error` before returning 500
- Use type guards for Mongoose errors (`isValidationError`, `isDuplicateError`)

### React Patterns
- Client components for hooks/events only
- Use `useMemo` for expensive computations
- Use `useCallback` for event handlers passed to children
- Follow component signature: `export function ComponentName({ prop1, prop2 }: Props)`

### CSS/Tailwind
- Use semantic CSS variables from `app/globals.css` (not hardcoded colors)
- RTL-safe classes: `ms`/`me`, `ps`/`pe`, `start`/`end` (never `ml`/`mr`, etc.)
- Use `cn()` utility from `@/lib/utils` for conditional classes

### Arabic/Localization
- Arabic-first: default `lang="ar-SA"`, `dir="rtl"`
- Translations: add to both `lib/translations/ar.ts` and `en.ts`
- Use `useLanguage` context for translations

### Accessibility
- Semantic HTML (`<nav>`, `<main>`, `<article>`)
- `aria-label` on icon-only buttons
- Keyboard navigation support
- Respect `prefers-reduced-motion`
