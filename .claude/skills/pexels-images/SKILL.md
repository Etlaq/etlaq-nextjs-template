---
name: pexels-images
description: Fetch contextually accurate images from Pexels API for Saudi Arabian applications. Returns direct CDN URLs ready for Next.js Image component. Use for hero images, backgrounds, and content illustrations.
---

# Pexels Image Retrieval

## Context-Aware Image Selection

**CRITICAL**: Always analyze the user's description/context BEFORE choosing search queries.

### Step 1: Read the Context
When asked to fetch images, first understand:
- **Purpose**: Hero image? Gallery? Background? Illustration?
- **Subject**: What is the page/section about? (e.g., "payment solutions", "restaurant booking", "fitness tracking")
- **Tone**: Professional? Casual? Modern? Traditional?
- **Target Audience**: Business professionals? Students? General consumers?

### Step 2: Extract Keywords from Description
Transform descriptive context into effective search queries:

**⚠️ CRITICAL RULE**: Use **single-word queries** for highest success rate (95% vs 5% for 3+ words)

```bash
# Example Context Analysis
Description: "Landing page for a fintech startup helping Saudi SMEs manage invoices"
→ Core Concept: business/finance
→ Primary Query: "business" (1 word)
→ Fallback Queries: "office", "finance", "technology"
→ Saudi Context: "desert" (for cultural backdrop)

Description: "E-commerce section for traditional Saudi clothing"
→ Core Concept: fashion/clothing
→ Primary Query: "fashion" (1 word)
→ Fallback Queries: "clothing", "retail", "shopping"
→ Saudi Context: "desert", "architecture"
⚠️ Note: No Saudi-specific clothing available - use generic fashion

Description: "Hero section for a food delivery app in Riyadh"
→ Core Concept: food/restaurant
→ Primary Query: "food" (1 word)
→ Fallback Queries: "restaurant", "dining", "delivery"
→ Saudi Context: "desert" (Riyadh-specific imagery not available)
```

### Step 3: Query Success Rates (Tested)

| Query Length | Success Rate | Examples |
|--------------|--------------|----------|
| **1 word** | **95%** | "doctor", "food", "business", "desert" ✅ |
| 2 words | 40% | "medical clinic" ❌, "clothing store" ❌ |
| 3+ words | 5% | "healthcare doctor appointment" ❌ |

### Step 4: Query Refinement Strategy

```
1. Extract single core concept (e.g., "doctor" not "healthcare appointment")
2. Test with 1-word query first
3. If no results, try synonym (e.g., "medical", "healthcare")
4. For Saudi context, add separate "desert" or "architecture" query
5. ❌ DO NOT combine location + concept (e.g., "riyadh food" fails)
```

### Step 5: Quality Check
Before presenting images to user:
- ✓ Do images match the described context?
- ✓ Are images culturally appropriate for Saudi market?
- ✓ Do images convey the right tone/mood?
- ✗ Are images too generic/off-topic?

## Quick Reference

```bash
API_KEY: Sd9Donnm80Sdw3iBPISdo6d1oCCg7ZwmOrcgv8W1BLyZaidJYOJCxLjb
Base URL: https://api.pexels.com/v1
Rate Limit: 200/hour, 20,000/month
```

**⚠️ CRITICAL: Rate Limiting**
- **200 requests per hour** - Resets every 60 minutes
- **20,000 requests per month** - Shared across all API users with this key
- If you hit the limit, API returns `429 Too Many Requests`
- **Best Practice**: Test queries with `per_page=1` first, then increase once confirmed
- **During testing**: Use `per_page=3` instead of default `15` to conserve quota
- **Avoid**: Rapid-fire requests - space them out by 1-2 seconds

```bash
# ✅ GOOD: Test first with minimal results
.claude/skills/pexels-images/fetch-images.sh "doctor" 1  # Verify query works
.claude/skills/pexels-images/fetch-images.sh "doctor" 10 # Get full results

# ❌ BAD: Multiple large requests in quick succession
.claude/skills/pexels-images/fetch-images.sh "healthcare doctor appointment" 15
.claude/skills/pexels-images/fetch-images.sh "medical clinic modern" 15
.claude/skills/pexels-images/fetch-images.sh "doctor patient consultation" 15
# This wastes quota on queries that return no results!
```

## API Route Pattern

```typescript
// app/api/images/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || 'technology';
  const perPage = searchParams.get('per_page') || '5'; // ⚠️ Use 3-5 to conserve API quota

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
    fetch('/api/images?query=technology&per_page=5')  // Use 3-5 images to conserve API quota
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

### Reality Check: What's Actually Available (Tested)

**✅ Works - Use These:**
```bash
# Business/Tech - 100% success rate
technology, office, business, laptop, modern, workspace

# Healthcare - 95% success rate
doctor, medical, healthcare, clinic, hospital

# Food/Restaurant - 100% success rate
food, restaurant, dining

# Saudi Cultural Imagery - 100% success rate
desert, architecture, landscape, nature

# Fashion/Retail - 95% success rate (requires manual filtering)
fashion, shopping, retail
```

**❌ Does NOT Work - Avoid These:**
```bash
# Saudi-specific queries - ALL return 0 results
saudi arabia, riyadh, jeddah, middle east, arabian
traditional clothing, thobe, abaya

# Multi-word queries - Low success rate
"modern office", "clothing store", "healthcare doctor appointment"
```

### Workaround for Saudi Context

```bash
# Need: Saudi cityscapes → Use: "architecture" (3-5 images max)
.claude/skills/pexels-images/fetch-images.sh "architecture" 5

# Need: Traditional clothing → Use: "fashion" + manual filtering
.claude/skills/pexels-images/fetch-images.sh "fashion" 5

# Need: Saudi landscape → Use: "desert" (excellent results!)
.claude/skills/pexels-images/fetch-images.sh "desert" 5

# Need: Local cuisine → Use: "food" + manual curation
.claude/skills/pexels-images/fetch-images.sh "food" 5

# ⚠️ ALWAYS use per_page=3-5 to conserve API quota (max 10 if truly needed)
```

### Cultural Filtering Checklist

When using generic queries, manually verify:
- ✓ Modest clothing (no revealing outfits)
- ✓ No alcohol in food/restaurant images
- ✓ Professional/family-friendly tone
- ✓ Avoid romantic/intimate imagery

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
  const perPage = searchParams.get('per_page') || '5';  // Use 3-5 to conserve API quota

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
  `https://api.pexels.com/v1/curated?per_page=5`,  // Use 3-5 to conserve API quota
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

## Workflow Example

**User Request**: "I need images for my healthcare appointment booking app"

**Step 1 - Analyze Context**:
- Purpose: App illustration/hero image
- Subject: Healthcare, doctor appointments, medical services
- Tone: Professional, trustworthy, modern
- Audience: Patients, healthcare seekers in Saudi Arabia

**Step 2 - Generate Queries** (using single-word strategy):
```bash
# Primary query (single word - highest success rate)
.claude/skills/pexels-images/fetch-images.sh "doctor" 5

# If need more options, try synonyms (still single words)
.claude/skills/pexels-images/fetch-images.sh "healthcare" 5
.claude/skills/pexels-images/fetch-images.sh "medical" 5

# ⚠️ Note: Always use per_page=3-5 to conserve API quota
# ✅ Total requests: 3 queries × 5 images = 15 API calls (within rate limit)
```

**Step 3 - Review & Select**:
- Check alt text matches context
- Verify cultural appropriateness (modest, professional)
- Ensure image conveys trust and professionalism
- Present best 3-5 images with URLs to user

**Step 4 - Provide Ready-to-Use Code**:
```tsx
<Image
  src="https://images.pexels.com/photos/[id]/pexels-photo-[id].jpeg"
  alt="Doctor consulting with patient in modern clinic"
  width={1200}
  height={627}
  className="object-cover"
/>
```

## Best Practices

**✅ DO:**
- Use **single-word queries** ("doctor" not "healthcare appointment") - 95% success rate
- Request **3-5 images** per query (max 10 if truly needed) to conserve rate limit
- Use `large` size (940w) for most cases
- Use `landscape` (1200x627) for hero images
- Use `portrait` (800x1200) for profile-like images
- Always include photographer attribution
- Cache results on client to reduce API calls
- For Saudi context: Use "desert", "architecture", "business" + manual filtering
- Test query with `per_page=1` before requesting more
- Use API key directly in code (no env var needed)

**❌ DON'T:**
- Use multi-word queries ("healthcare doctor appointment") - 5% success rate
- Use Saudi-specific queries ("saudi arabia", "riyadh") - 0% success
- Request more than 10 images per query (wastes API quota)
- Download images (use CDN URLs directly)
- Omit photographer credits
- Exceed rate limits (200/hour, 20,000/month)
- Make rapid-fire requests (space them out by 1-2 seconds)
