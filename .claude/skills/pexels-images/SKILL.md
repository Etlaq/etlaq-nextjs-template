---
name: pexels-images
description: Fetch contextually accurate images from Pexels API for Saudi Arabian applications. Returns direct CDN URLs ready for Next.js Image component. Use for hero images, backgrounds, and content illustrations.
---

# Pexels Image Retrieval

## Quick Reference

```bash
API_KEY: Sd9Donnm80Sdw3iBPISdo6d1oCCg7ZwmOrcgv8W1BLyZaidJYOJCxLjb
Base URL: https://api.pexels.com/v1
Rate Limit: 200/hour, 20,000/month
```

## API Route Pattern

```typescript
// app/api/images/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || 'technology';
  const perPage = searchParams.get('per_page') || '15';

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`,
    {
      headers: {
        Authorization: 'Sd9Donnm80Sdw3iBPISdo6d1oCCg7ZwmOrcgv8W1BLyZaidJYOJCxLjb',
      },
    }
  );

  if (!res.ok) {
    return Response.json({ error: 'Failed to fetch images' }, { status: 500 });
  }

  return Response.json(await res.json());
}
```

## Response Format

```typescript
interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;    // Full size
    large2x: string;     // 1880w
    large: string;       // 940w (recommended)
    medium: string;      // 350h
    small: string;       // 130h
    portrait: string;    // 800x1200
    landscape: string;   // 1200x627
    tiny: string;        // 280w
  };
  alt: string;
}

interface PexelsResponse {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
  next_page?: string;
}
```

## Client Usage

```tsx
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export function ImageGallery() {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([])

  useEffect(() => {
    fetch('/api/images?query=technology&per_page=12')
      .then(r => r.json())
      .then(data => setPhotos(data.photos))
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos.map(photo => (
        <div key={photo.id} className="relative aspect-video">
          <Image
            src={photo.src.large}  // Use Pexels CDN directly
            alt={photo.alt || 'Image'}
            fill
            className="object-cover rounded-lg"
          />
          <a
            href={photo.photographer_url}
            className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded"
          >
            Photo by {photo.photographer}
          </a>
        </div>
      ))}
    </div>
  )
}
```

## Saudi Arabia Context

### Cultural Image Guidelines

**Preferred imagery for Saudi market:**
- Modern Saudi cityscapes (Riyadh, Jeddah, NEOM)
- Professional business settings
- Technology and innovation
- Nature (desert, Red Sea, mountains)
- Islamic architecture (respectful, non-religious)
- Family-friendly activities

**Avoid:**
- Intimate/romantic imagery
- Alcohol-related content
- Inappropriate clothing for context
- Culturally insensitive themes

### Search Query Examples

```bash
# Business/Tech (most common)
technology, office, workspace, laptop, modern, business, team, meeting

# Saudi-specific
saudi arabia, riyadh, jeddah, desert, red sea, arabian, middle east

# Lifestyle
lifestyle, family, professional, education, healthcare, fitness

# Nature/Architecture
architecture, modern building, cityscape, skyline, nature, landscape

# E-commerce
product, shopping, retail, fashion, food, restaurant

# Avoid ambiguous terms
# ✗ dates (fruit? calendar? dating?)
# ✓ date fruit, calendar schedule, romantic dinner (be specific)
```

## Context Disambiguation

| Term | Ambiguous → Specific |
|------|---------------------|
| Dates | "date fruit" OR "calendar schedule" OR "romantic dinner" |
| Apple | "apple fruit" OR "apple technology" |
| Python | "python programming" OR "python snake" |
| Java | "java programming" OR "java coffee" |

## Next.js Image Configuration

Add to `next.config.ts`:

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
}
```

## Advanced Usage

### Pagination

```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || 'technology';
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('per_page') || '15';

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${perPage}`,
    {
      headers: {
        Authorization: 'Sd9Donnm80Sdw3iBPISdo6d1oCCg7ZwmOrcgv8W1BLyZaidJYOJCxLjb',
      },
    }
  );

  return Response.json(await res.json());
}
```

### Curated Photos (No Query Needed)

```typescript
// Get curated/featured photos
const res = await fetch(
  `https://api.pexels.com/v1/curated?per_page=15`,
  {
    headers: {
      Authorization: 'Sd9Donnm80Sdw3iBPISdo6d1oCCg7ZwmOrcgv8W1BLyZaidJYOJCxLjb',
    },
  }
);
```

### Single Photo by ID

```typescript
const res = await fetch(
  `https://api.pexels.com/v1/photos/${photoId}`,
  {
    headers: {
      Authorization: 'Sd9Donnm80Sdw3iBPISdo6d1oCCg7ZwmOrcgv8W1BLyZaidJYOJCxLjb',
    },
  }
);
```

## Bash Script for Image Fetching

Use the included `fetch-images.sh` script for easy image retrieval:

```bash
# Basic usage - search for images
.claude/skills/pexels-images/fetch-images.sh "technology"

# With custom per_page
.claude/skills/pexels-images/fetch-images.sh "saudi arabia" 10

# With pagination
.claude/skills/pexels-images/fetch-images.sh "modern office" 15 2

# Examples
.claude/skills/pexels-images/fetch-images.sh "riyadh skyline" 5
.claude/skills/pexels-images/fetch-images.sh "desert landscape" 8
.claude/skills/pexels-images/fetch-images.sh "business meeting" 12
```

**Script output format:**
```
ID: 1234567
URL: https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg
Photographer: John Doe
Alt: Modern office workspace with laptop
---
```

## Direct Bash Testing (Manual curl)

```bash
# Search for images
curl "https://api.pexels.com/v1/search?query=technology&per_page=5" \
  -H "Authorization: Sd9Donnm80Sdw3iBPISdo6d1oCCg7ZwmOrcgv8W1BLyZaidJYOJCxLjb"

# Get curated photos
curl "https://api.pexels.com/v1/curated?per_page=5" \
  -H "Authorization: Sd9Donnm80Sdw3iBPISdo6d1oCCg7ZwmOrcgv8W1BLyZaidJYOJCxLjb"

# Get specific photo
curl "https://api.pexels.com/v1/photos/1181244" \
  -H "Authorization: Sd9Donnm80Sdw3iBPISdo6d1oCCg7ZwmOrcgv8W1BLyZaidJYOJCxLjb"
```

## Attribution Requirements

**REQUIRED**: Display photographer credit near each image:

```tsx
<a
  href={photo.photographer_url}
  className="text-xs text-neutral-600 hover:text-neutral-900"
  target="_blank"
  rel="noopener noreferrer"
>
  Photo by {photo.photographer} on Pexels
</a>
```

## Error Handling

```typescript
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || 'technology';

    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=15`,
      {
        headers: {
          Authorization: 'Sd9Donnm80Sdw3iBPISdo6d1oCCg7ZwmOrcgv8W1BLyZaidJYOJCxLjb',
        },
      }
    );

    if (!res.ok) {
      if (res.status === 429) {
        return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
      }
      throw new Error('Pexels API error');
    }

    return Response.json(await res.json());
  } catch (error) {
    return Response.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
```

## When to Use This Skill

- Adding hero images to landing pages
- Populating galleries or portfolios
- Getting placeholder images for prototypes
- Sourcing contextually accurate images for Saudi market
- Building image-heavy features (blogs, e-commerce)

## Best Practices

✓ Use `large` size (940w) for most cases
✓ Use `landscape` (1200x627) for hero images
✓ Use `portrait` (800x1200) for profile-like images
✓ Always include photographer attribution
✓ Cache results on client to reduce API calls
✓ Use specific search queries for better results
✓ Consider cultural context for Saudi audience
✓ Use API key directly in code (no env var needed)

✗ Don't download images (use CDN URLs directly)
✗ Don't omit photographer credits
✗ Don't use ambiguous search terms
✗ Don't exceed rate limits (200/hour)
