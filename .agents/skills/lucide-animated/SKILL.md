---
name: lucide-animated
description: Add beautifully animated icons using lucide-animated. Use this skill when the user wants animated icons, interactive icons, or icon animations. Installs via shadcn CLI and works with React + Motion.
license: MIT
---

This skill enables adding animated icons from [lucide-animated](https://lucide-animated.com/) - a collection of 600+ beautifully crafted animated React icons built with Motion (Framer Motion).

## Installation

Icons are installed via shadcn CLI using the `@lucide-animated` registry:

```bash
# Single icon
bunx --bun shadcn add @lucide-animated/{icon-name}

# Multiple icons
bunx --bun shadcn add @lucide-animated/arrow-right @lucide-animated/check @lucide-animated/menu

# Examples
bunx --bun shadcn add @lucide-animated/arrow-right
bunx --bun shadcn add @lucide-animated/check
bunx --bun shadcn add @lucide-animated/menu
```

Icons are installed to `components/ui/{icon-name}.tsx`.

## Dependencies

All icons require the `motion` package (auto-installed):
```bash
bun add motion
```

## Usage

Icons export with "Icon" suffix and use a `size` prop:

```tsx
import { ArrowRightIcon } from '@/components/ui/arrow-right';
import { CheckIcon } from '@/components/ui/check';
import { MenuIcon } from '@/components/ui/menu';

// Basic usage - animates on hover automatically
<ArrowRightIcon />

// With size prop (default is 28)
<CheckIcon size={16} />
<CheckIcon size={24} className="text-primary" />

// In buttons
<Button>
  Continue <ArrowRightIcon size={16} className="ms-2" />
</Button>
```

## Component API

Each icon component has:
- `size?: number` - Icon size in pixels (default: 28)
- `className?: string` - CSS classes for colors, positioning, etc.
- `onMouseEnter/onMouseLeave` - Animation triggers automatically on hover
- Ref with `startAnimation()` and `stopAnimation()` methods for programmatic control

## Popular Icons by Category

### Navigation
- `arrow-right`, `arrow-left`, `arrow-up`, `arrow-down`
- `chevron-right`, `chevron-left`, `chevron-up`, `chevron-down`
- `corner-up-left`, `corner-up-right`, `corner-down-left`, `corner-down-right`

### Actions
- `check`, `x`, `plus`, `minus`
- `copy`, `clipboard`, `download`, `upload`
- `search`, `filter`, `settings`, `edit`

### UI Controls
- `menu`, `x`, `more-horizontal`, `more-vertical`
- `maximize`, `minimize`, `expand`, `collapse`
- `eye`, `eye-off`, `lock`, `unlock`

### Status & Feedback
- `check`, `circle-check`, `circle-x`
- `alert-circle`, `alert-triangle`, `info`
- `loader`, `refresh-cw`, `activity`

### Communication
- `mail`, `mail-check`, `message-circle`, `message-square`
- `bell`, `bell-ring`, `send`

### Social
- `github`, `twitter`, `linkedin`, `instagram`
- `youtube`, `discord`, `facebook`, `twitch`

### Files & Folders
- `file`, `file-text`, `file-check`, `file-plus`
- `folder`, `folder-open`, `folder-plus`

### Media
- `play`, `pause`, `stop`, `skip-forward`, `skip-back`
- `volume`, `volume-2`, `volume-x`

### Weather
- `sun`, `moon`, `cloud`, `cloud-rain`, `wind`

### Finance
- `dollar-sign`, `euro`, `credit-card`, `wallet`

## Common Patterns

### In Buttons (auto-animate on hover)
```tsx
'use client';
import { ArrowRightIcon } from '@/components/ui/arrow-right';
import { Button } from '@/components/ui/button';

export function CTAButton() {
  return (
    <Button className="group">
      Get Started <ArrowRightIcon size={16} className="ms-2" />
    </Button>
  );
}
```

### Success State Animation
```tsx
'use client';
import { useState } from 'react';
import { CheckIcon } from '@/components/ui/check';

export function SubmitButton() {
  const [success, setSuccess] = useState(false);

  return (
    <button disabled={success}>
      {success ? (
        <CheckIcon size={20} className="text-green-500" />
      ) : (
        'Submit'
      )}
    </button>
  );
}
```

### Programmatic Animation Control
```tsx
'use client';
import { useRef } from 'react';
import { ArrowRightIcon, type ArrowRightIconHandle } from '@/components/ui/arrow-right';

export function ControlledIcon() {
  const iconRef = useRef<ArrowRightIconHandle>(null);

  return (
    <div>
      <ArrowRightIcon ref={iconRef} size={24} />
      <button onClick={() => iconRef.current?.startAnimation()}>Animate</button>
      <button onClick={() => iconRef.current?.stopAnimation()}>Stop</button>
    </div>
  );
}
```

### Menu Toggle
```tsx
'use client';
import { useState } from 'react';
import { MenuIcon } from '@/components/ui/menu';
import { XIcon } from '@/components/ui/x';

export function MenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
    </button>
  );
}
```

## RTL Support

Use logical properties for RTL-safe icons:
```tsx
// Good - flips correctly in RTL
<ArrowRightIcon size={16} className="ms-2" />

// Bad - doesn't respect RTL
<ArrowRightIcon size={16} className="ml-2" />
```

For directional icons in RTL layouts:
```tsx
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRightIcon } from '@/components/ui/arrow-right';
import { ArrowLeftIcon } from '@/components/ui/arrow-left';

const { isArabic, t } = useLanguage();
const ArrowIcon = isArabic ? ArrowLeftIcon : ArrowRightIcon;

<Button>
  {t('المتابعة', 'Continue')} <ArrowIcon size={16} className="ms-2" />
</Button>
```

## Sizing Reference

Use the `size` prop (in pixels):
```tsx
<Icon size={12} />  // 12px - inline text
<Icon size={16} />  // 16px - buttons, small UI
<Icon size={20} />  // 20px - default
<Icon size={24} />  // 24px - cards, prominent
<Icon size={32} />  // 32px - hero sections
<Icon size={40} />  // 40px - feature highlights
<Icon size={48} />  // 48px - large displays
```

## Discovering & Searching Icons

### Browse All Icons
Visit https://lucide-animated.com/ to browse all 600+ animated icons visually.

### Search via Registry API
Check if an icon exists before installing:
```bash
# Check if icon exists (returns JSON if available)
curl -s https://lucide-animated.com/r/{icon-name}.json | head -1

# Examples
curl -s https://lucide-animated.com/r/arrow-right.json | head -1  # exists
curl -s https://lucide-animated.com/r/monitor.json | head -1      # doesn't exist
```

### Search via GitHub Registry
The full icon list is in the registry.json:
```bash
# Fetch and search the registry
curl -s https://raw.githubusercontent.com/pqoqubbw/icons/main/registry.json | grep -o '"name":"[^"]*"' | head -20
```

### Naming Convention
Icons use kebab-case matching Lucide icons:
- `arrow-right` not `ArrowRight`
- `circle-check` not `CircleCheck`
- `message-square` not `MessageSquare`

### Not All Lucide Icons Are Available
Some icons don't have animated versions (e.g., `monitor`, `laptop`). If installation fails, the icon doesn't exist - create a custom animated version using Motion instead.

## Workflow

1. **Search**: Check https://lucide-animated.com/ or use `curl` to verify icon exists
2. **Install**: `bunx --bun shadcn add @lucide-animated/{icon-name}`
3. **Import**: `import { IconNameIcon } from '@/components/ui/{icon-name}'`
4. **Use**: `<IconNameIcon size={20} />`

## Combining with Static Lucide Icons

You can mix animated and static icons:
```tsx
// Animated for interactive elements
import { CheckIcon } from '@/components/ui/check';

// Static for decorative elements
import { Star, Heart } from 'lucide-react';
```

Use animated icons for:
- User interactions (buttons, toggles, menus)
- State changes (loading, success, error)
- Call-to-action elements

Use static icons for:
- Decorative elements
- Static labels
- High-frequency rendering (lists with many items)
