# Dev Sync — 2-Day Parallel Build

This document coordinates the core and experience dev tracks.

## Ownership Split

### Core Track (main dev)
- App shell, routing, i18n, theme tokens
- Service interfaces + stub implementations
- CMS integration (Sanity)
- Wallet adapter + XP balance read + credential display
- Base page structure for all routes

### Experience Track (other dev)
- Interactive lesson UX (Scrimba-style)
- Gamification UI (XP, streak, achievements)
- Onboarding and wallet flow
- Visual polish and micro-interactions

## Folder Ownership

**Core owns:**
- `src/app/*` (routes)
- `src/services/*`
- `src/lib/*`

**Experience owns:**
- `src/components/lesson/*`
- `src/components/gamification/*`
- `src/components/onboarding/*`

## Service Interfaces

```ts
export interface XpSummary {
  total: number;
  level: number; // floor(sqrt(total / 100))
}

export interface StreakData {
  current: number;
  longest: number;
}

export interface Credential {
  id: string;
  track: string;
  level: number;
}

export interface LearningProgressService {
  getXpSummary(walletAddress?: string): Promise<XpSummary>;
  getStreak(walletAddress?: string): Promise<StreakData>;
  getCredentials(walletAddress?: string): Promise<Credential[]>;
}
```

## Pages (10)

1. `/` — Landing
2. `/courses` — Catalog
3. `/courses/[slug]` — Detail
4. `/courses/[slug]/lessons/[id]` — Lesson view
5. `/dashboard`
6. `/profile` + `/profile/[username]`
7. `/leaderboard`
8. `/settings`
9. `/certificates/[id]`

## Tech Stack

- Frontend: Next.js 14+ (App Router)
- UI: shadcn/ui + Hugeicons
- Styling: Tailwind CSS + CSS variables
- Theme: next-themes (light/dark)

## i18n

PT-BR, ES, EN — all UI strings externalized.

## On-Chain Integration

- XP balance from Token-2022 (devnet)
- Credentials via Metaplex Core NFTs
- Enrollment: wallet-signed
- Lesson completion: stubbed (backend-signed)
