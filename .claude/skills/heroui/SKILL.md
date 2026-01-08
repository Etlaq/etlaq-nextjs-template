# HeroUI v3 Skill

Use HeroUI v3 (Beta) to build beautiful, accessible React components with Tailwind CSS v4.

## Requirements

- React 19+
- Tailwind CSS v4
- Next.js 15+ (for this project)

## Installation

```bash
bun add @heroui/styles@beta @heroui/react@beta
```

## Setup

Add to `app/globals.css`:

```css
@import "tailwindcss";
@import "@heroui/styles";
```

**Import order matters** - always import `tailwindcss` first.

## Core Principles

1. **Semantic Variants** - Use `primary`, `secondary`, `tertiary`, `danger`, `ghost` (not visual names like "solid", "bordered")
2. **Compound Components** - Components are composable parts (e.g., `<Alert><Alert.Icon /><Alert.Title /></Alert>`)
3. **Accessibility Built-in** - Built on React Aria Components for WCAG compliance
4. **BEM Classes Available** - Can use CSS classes directly without React components
5. **No Provider Needed** - Unlike v2, HeroUI v3 works without wrapping in a Provider

## Component Import Pattern

```tsx
// Single import from @heroui/react
import { Button, Card, Alert, Tabs } from '@heroui/react';
```

## Component Patterns

HeroUI v3 components use different patterns depending on the component:

### Compound Components (Card, Alert)

```tsx
// Card - uses compound pattern
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>Content here</Card.Content>
  <Card.Footer>Footer</Card.Footer>
</Card>

// Alert - uses compound pattern with `status` prop (not variant!)
<Alert status="danger">
  <Alert.Indicator />
  <Alert.Content>
    <Alert.Title>Error</Alert.Title>
    <Alert.Description>Something went wrong.</Alert.Description>
  </Alert.Content>
</Alert>
```

**Alert status options:** `default`, `accent`, `danger`, `success`, `warning`

### Composition Components (TextField)

TextField uses separate child components:

```tsx
import { TextField, Label, Input, Description, FieldError } from '@heroui/react';

// Correct pattern - Label and Input are separate imports
<TextField
  name="email"
  type="email"
  value={email}
  onChange={setEmail}  // Receives value directly, NOT an event!
  isRequired
  isDisabled={false}
>
  <Label>Email</Label>
  <Input placeholder="Enter your email" />
  <Description>We'll never share your email</Description>
  <FieldError />
</TextField>
```

**Important:** `onChange` receives the value directly (not `e.target.value`)

## Button Variants

| Variant | Purpose | Usage |
|---------|---------|-------|
| `primary` | Main action | 1 per context |
| `secondary` | Alternative actions | Multiple allowed |
| `tertiary` | Dismissive (cancel, skip) | Sparingly |
| `danger` | Destructive actions | When needed |
| `ghost` | Subtle actions | Navigation, toolbars |

```tsx
<Button variant="primary">Save</Button>
<Button variant="secondary">Edit</Button>
<Button variant="tertiary">Cancel</Button>
<Button variant="danger">Delete</Button>
<Button variant="ghost">More</Button>
```

## Sizes

All components support consistent sizes: `sm`, `md`, `lg`

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

## Event Handlers

Use `onPress` instead of `onClick` (React Aria pattern):

```tsx
<Button onPress={() => console.log('pressed')}>Click me</Button>
```

## Styling Components

### With className (Tailwind)

```tsx
<Button className="bg-purple-500 hover:bg-purple-600">
  Custom Button
</Button>
```

### With Variant Functions (for non-HeroUI elements)

```tsx
import { buttonVariants } from '@heroui/react';
import Link from 'next/link';

<Link className={buttonVariants({ variant: "primary" })} href="/about">
  About
</Link>
```

### With BEM Classes (for any element)

```tsx
<a className="button button--primary" href="/dashboard">
  Dashboard
</a>
```

## Color System (OKLCH)

HeroUI uses CSS variables with OKLCH color space:

| Token | Usage |
|-------|-------|
| `--background` / `--foreground` | Page background/text |
| `--surface` / `--surface-foreground` | Card surfaces |
| `--accent` / `--accent-foreground` | Primary brand color |
| `--success`, `--warning`, `--danger` | Status colors |
| `--muted` | Subtle text |
| `--border` | Borders |

```tsx
<div className="bg-background text-foreground">
  <div className="bg-surface text-surface-foreground">Card</div>
  <button className="bg-accent text-accent-foreground">Action</button>
</div>
```

## Theming

Light/dark mode via class or data attribute:

```html
<!-- Light -->
<html class="light" data-theme="light">
<!-- Dark -->
<html class="dark" data-theme="dark">
```

Override colors in CSS:

```css
:root {
  --accent: oklch(0.7 0.25 260);
  --radius: 0.75rem;
}

[data-theme="dark"] {
  --accent: oklch(0.8 0.12 260);
}
```

## Available Components

### Buttons
- Button, ButtonGroup, CloseButton

### Forms
- Checkbox, CheckboxGroup, DateField, FieldError, Fieldset, Form, Input, InputGroup, InputOTP, Label, NumberField, RadioGroup, SearchField, Select, Slider, Switch, TextArea, TextField, TimeField

### Navigation
- Accordion, Disclosure, DisclosureGroup, Link, Tabs

### Overlays
- AlertDialog, Modal, Popover, Tooltip

### Collections
- ComboBox, Dropdown, ListBox, TagGroup

### Feedback
- Alert, Skeleton, Spinner

### Layout
- Card, Separator, Surface

### Media
- Avatar

### Typography
- Kbd

### Utilities
- ScrollShadow

## Common Patterns

### Form with Validation

```tsx
import { Form, TextField, Label, Input, FieldError, Button } from '@heroui/react';

<Form onSubmit={handleSubmit}>
  <TextField name="email" type="email" isRequired value={email} onChange={setEmail}>
    <Label>Email</Label>
    <Input placeholder="you@example.com" />
    <FieldError />
  </TextField>
  <Button type="submit" variant="primary">Submit</Button>
</Form>
```

### Card with Content

```tsx
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description text</Card.Description>
  </Card.Header>
  <Card.Content>
    Main content here
  </Card.Content>
  <Card.Footer>
    <Button variant="primary">Action</Button>
  </Card.Footer>
</Card>
```

### Tabs Navigation

```tsx
<Tabs defaultSelectedKey="tab1">
  <Tabs.List aria-label="Settings">
    <Tabs.Tab id="tab1">General</Tabs.Tab>
    <Tabs.Tab id="tab2">Security</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="tab1">General content</Tabs.Panel>
  <Tabs.Panel id="tab2">Security content</Tabs.Panel>
</Tabs>
```

### Alert Messages

```tsx
// Use `status` prop, not `variant`!
// Use `Alert.Indicator`, not `Alert.Icon`!
<Alert status="success">
  <Alert.Indicator />
  <Alert.Content>
    <Alert.Title>Success!</Alert.Title>
    <Alert.Description>Your changes have been saved.</Alert.Description>
  </Alert.Content>
</Alert>

// Status options: default, accent, danger, success, warning
<Alert status="danger">
  <Alert.Indicator />
  <Alert.Content>
    <Alert.Description>Something went wrong.</Alert.Description>
  </Alert.Content>
</Alert>
```

### Modal Dialog

```tsx
<Modal>
  <Modal.Trigger>
    <Button>Open Modal</Button>
  </Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Modal Title</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Content here
    </Modal.Body>
    <Modal.Footer>
      <Modal.Close>
        <Button variant="tertiary">Cancel</Button>
      </Modal.Close>
      <Button variant="primary">Confirm</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

## Animation

HeroUI uses data attributes for state-based animations:

```css
/* Target states */
.button[data-hovered="true"] { }
.button[data-pressed="true"] { }
.button[data-focus-visible="true"] { }
.button[data-disabled="true"] { }

/* Transition states */
.popover[data-entering] { }
.popover[data-exiting] { }
```

With Framer Motion:

```tsx
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';

const MotionButton = motion(Button);

<MotionButton
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Animated
</MotionButton>
```

## Documentation References

Full documentation files are available in this skill folder:
- `heroui-full.txt` - Complete documentation
- `heroui-components.txt` - Component reference
- `heroui-patterns.txt` - Patterns and recipes

Online: https://v3.heroui.com/docs/react

## MCP Server

HeroUI provides an MCP server for AI assistants. Already configured in this project's `.mcp.json`.

Tools available:
- `list_components` - List all components
- `get_component_info` - Get component details
- `get_component_props` - Get prop definitions
- `get_component_examples` - Get usage examples
- `get_theme_info` - Get theme variables

## RTL Support

For Arabic (RTL) layouts, HeroUI components work with logical properties:

```tsx
<div className="ps-4 pe-2 ms-auto me-0">
  {/* ps = padding-inline-start, pe = padding-inline-end */}
</div>
```
