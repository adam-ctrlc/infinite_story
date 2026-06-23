# Infinite Story

> Start a story, pass the pen, see where the world takes it.

Infinite Story is an open-source collaborative storytelling platform where any story can be continued by anyone. Every story grows into a branching tree of possibilities — readers become authors, and no narrative ever has just one ending.

Licensed under the [Apache License 2.0](./LICENSE).

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running Locally](#running-locally)
- [Architecture](#architecture)
  - [App Router Layout](#app-router-layout)
  - [Database Schema](#database-schema)
  - [API Routes](#api-routes)
  - [Component System](#component-system)
- [Key Concepts](#key-concepts)
  - [Story Trees](#story-trees)
  - [Visibility & Privacy](#visibility--privacy)
  - [Follow System](#follow-system)
  - [Rich Text Editing](#rich-text-editing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Infinite Story reimagines collaborative fiction for the internet age. Instead of a single linear story with one author, every piece of writing on Infinite Story is a node in a tree. Any authenticated user can attach a continuation — a "branch" — to any existing node. Readers navigate the tree, rate and like branches, follow their favourite authors, and write their own continuations to build a living, growing narrative universe.

The platform is built with Next.js 16 App Router, persists all data to a Turso (libSQL) edge database via Drizzle ORM, and uses Clerk for authentication. The UI follows a Medium-inspired design system with Tailwind CSS v4.

---

## Features

### Writing
- **Rich text editor** powered by Tiptap v3 — bold, italic, underline, strikethrough, headings (H2/H3), blockquotes, bullet/ordered lists, horizontal rules, inline links, and image uploads (stored as base64)
- **Story categories** — Sci-Fi, Fantasy, Cyberpunk, Mystery, Horror, Romance, Thriller, Dystopian — selected via pill buttons before publishing
- **Continuation writing** — attach a new branch to any existing story node with the same Tiptap editor, inheriting the root story's category
- **Story export** — download any story as plain text or Markdown from the export menu on the story page

### Reading & Discovery
- **Feed** with six sort modes: Following, Newest, Trending (by likes), Top Rated (by star rating average), Most Discussed (by comment count), Most Branched (by branch count)
- **Full-text search** across story titles, content, and author names within the current filter
- **Genre filter** — click any genre tag in the sidebar to narrow the feed to that category
- **Trending sidebar** — top 5 stories by likes ranked with position numbers, updated in real time from the database
- **Pagination** with ellipsis support for large result sets (8 stories per page)
- **Read time** estimate (200 wpm) and word count shown on every story card and story page

### Social
- **Follow / unfollow** authors from story pages or public profile pages; Following feed tab shows only stories from authors you follow
- **Like stories** with an animated heart on the reaction bar
- **Star ratings** (1–5) per story, averaged across all raters and shown on story cards and pages
- **Comments** on every story node with per-comment likes
- **Public author profiles** at `/u/[userId]` showing their public stories, follower/following counts, and a Follow button visible to other logged-in users

### Profiles & Privacy
- **Account settings** — update display name, bio (via Clerk); change password; toggle privacy options
- **Privacy settings** — independently hide your follower count and/or following count from your public profile
- **Story visibility** — set any top-level story you own to Private (hidden from feed and public profiles) or Public; branches are always forced public since they extend someone else's work
- **Profile tabs** — Stories, Branches, Likes, Followers, Following; each tab is deep-linkable via URL hash (`#tab-Followers`)

### Performance
- **Route-level loading skeletons** — every major route (`/feed`, `/profile`, `/story`, `/story/[id]`, `/u/[userId]`) has a `loading.jsx` file that shows an animated pulse skeleton the instant navigation begins, before any server data arrives
- **Parallel data fetching** — all server components use `Promise.all` to fetch independent data concurrently

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.0.7 (App Router, React Server Components) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`, `@theme` custom tokens) |
| Auth | Clerk (`@clerk/nextjs` v7) — email/password + SSO |
| Database | Turso (libSQL edge SQLite) |
| ORM | Drizzle ORM v0.45 + Drizzle Kit v0.31 |
| Rich Text | Tiptap v3 (StarterKit, Underline, Image, Link, Placeholder) |
| Icons | Lucide React v0.555 |
| Fonts | Google Fonts — Geist Sans (UI), Lora (serif editorial) |
| Package Manager | pnpm v11 |

---

## Project Structure

```
infinite_story/
├── src/
│   ├── app/
│   │   ├── (logged-in)/              # Route group — all pages requiring auth
│   │   │   ├── layout.jsx            # Wraps all auth'd pages with <Navbar />
│   │   │   ├── feed/
│   │   │   │   ├── page.jsx          # Client component — feed with filters/search/pagination
│   │   │   │   └── loading.jsx       # Skeleton shown during navigation
│   │   │   ├── profile/
│   │   │   │   ├── page.jsx          # Async server component — own profile
│   │   │   │   └── loading.jsx       # Skeleton
│   │   │   ├── story/
│   │   │   │   ├── page.jsx          # Write new story (client — uses Tiptap)
│   │   │   │   ├── loading.jsx       # Skeleton
│   │   │   │   └── [id]/
│   │   │   │       ├── page.jsx      # Async server component — story reader
│   │   │   │       └── loading.jsx   # Skeleton
│   │   │   └── u/
│   │   │       └── [userId]/
│   │   │           ├── page.jsx      # Async server component — public author profile
│   │   │           └── loading.jsx   # Skeleton
│   │   ├── api/
│   │   │   ├── follow/[targetId]/route.js          # GET status, POST toggle
│   │   │   ├── stories/
│   │   │   │   ├── route.js                        # GET list, POST create
│   │   │   │   └── [id]/
│   │   │   │       ├── route.js                    # GET single story + chain + children
│   │   │   │       ├── like/route.js               # POST toggle like
│   │   │   │       ├── rate/route.js               # GET/POST star rating
│   │   │   │       ├── visibility/route.js         # PATCH public/private
│   │   │   │       ├── continue/route.js           # POST new branch
│   │   │   │       └── comment/
│   │   │   │           ├── route.js                # GET list, POST new comment
│   │   │   │           └── [commentId]/like/route.js # POST toggle comment like
│   │   │   └── user/[userId]/settings/route.js     # GET/PATCH privacy settings
│   │   ├── sign-up/page.jsx          # Clerk sign-up page
│   │   ├── sso-callback/page.jsx     # Clerk SSO callback handler
│   │   ├── globals.css               # Tailwind v4 theme + Tiptap editor styles
│   │   ├── layout.jsx                # Root layout — ClerkProvider + fonts
│   │   └── page.jsx                  # Landing / marketing page
│   ├── components/
│   │   ├── atoms/                    # Smallest indivisible UI pieces
│   │   │   ├── Avatar.jsx            # User avatar with initials fallback
│   │   │   ├── Badge.jsx             # Category / status badge
│   │   │   ├── Button.jsx            # Base button with variant props
│   │   │   ├── CategoryPill.jsx      # Selectable genre pill (toggle)
│   │   │   ├── FollowButton.jsx      # Inline follow/unfollow (story pages)
│   │   │   ├── Input.jsx             # Styled text input
│   │   │   ├── PublicFollowButton.jsx # Follow button on public profile pages
│   │   │   ├── StarRating.jsx        # Interactive 1-5 star widget
│   │   │   └── Textarea.jsx          # Styled textarea
│   │   ├── molecules/                # Composed of atoms; no business logic
│   │   │   ├── AuthorInfo.jsx        # Avatar + name (links to /u/[id]) + timestamp
│   │   │   ├── CommentCard.jsx       # Single comment with like button
│   │   │   ├── ContinuationCard.jsx  # Card shown in continuation grid
│   │   │   ├── FilterTabs.jsx        # Generic tab bar (used in settings)
│   │   │   ├── FormField.jsx         # Label + input with accessibility wiring
│   │   │   ├── SearchBar.jsx         # Search input with icon
│   │   │   ├── StatGroup.jsx         # Row of labelled stats (optionally linked)
│   │   │   ├── StoryCard.jsx         # Feed story card with metadata strip
│   │   │   ├── StoryExportMenu.jsx   # Dropdown — export as TXT / Markdown
│   │   │   └── StoryThread.jsx       # Breadcrumb chain for continuation pages
│   │   └── organisms/                # Full feature sections
│   │       ├── CommentSection.jsx    # Full comment thread with add form
│   │       ├── ContinuationForm.jsx  # Tiptap form for adding a branch
│   │       ├── ContinuationList.jsx  # Async server component — grid of branches
│   │       ├── FeedFilters.jsx       # Search bar + six-tab filter row
│   │       ├── FeedList.jsx          # Renders list of StoryCards
│   │       ├── FeedSidebar.jsx       # Trending + genre discovery + footer links
│   │       ├── Navbar.jsx            # Top navigation bar
│   │       ├── Pagination.jsx        # Page navigation with ellipsis
│   │       ├── PrivacySettings.jsx   # Toggle hide-followers / hide-following
│   │       ├── ProfileForm.jsx       # Edit display name / bio via Clerk
│   │       ├── ProfileHeader.jsx     # Avatar + name + stat row on own profile
│   │       ├── ProfileSettings.jsx   # Settings shell (Profile / Security / Privacy tabs)
│   │       ├── ProfileTabs.jsx       # Stories / Branches / Likes / Followers / Following
│   │       ├── PublicProfileTabs.jsx # Read-only story list on /u/[userId]
│   │       ├── ReactionBar.jsx       # Likes + comment count + star rating
│   │       ├── RichEditor.jsx        # Tiptap editor with sticky toolbar
│   │       ├── SecuritySettings.jsx  # Change password via Clerk
│   │       ├── SettingsSidebar.jsx   # Left nav for account settings
│   │       └── StoryForm.jsx         # Title + category + RichEditor + publish
│   └── lib/
│       ├── db.js                     # Drizzle client connected to Turso
│       ├── schema.js                 # All Drizzle table definitions
│       ├── store.js                  # All async data-access functions (the "model layer")
│       └── utils.js                  # cn(), timeAgo(), makeId(), stripHtml(), wordCount(), readingTime()
├── drizzle.config.js                 # Drizzle Kit config (schema path, Turso credentials)
├── .env                              # Local environment variables (never committed)
├── .npmrc                            # pnpm settings
├── components.json                   # shadcn/ui config (for any ui/ primitives)
├── LICENSE                           # Apache 2.0
├── README.md                         # This file
└── CONTRIBUTING.md                   # Contributor guide
```

---

## Getting Started

### Prerequisites

- **Node.js** 20 or later
- **pnpm** v11 (`npm install -g pnpm`)
- A **Clerk** account and application — [clerk.com](https://clerk.com)
- A **Turso** database — [turso.tech](https://turso.tech) (free tier is sufficient for development)

### Installation

```bash
git clone https://github.com/yourusername/infinite_story.git
cd infinite_story
pnpm install
```

### Environment Variables

Create a `.env` file in the project root. Never commit this file.

```env
# ── Clerk ────────────────────────────────────────────────────────────────────
# Found in your Clerk dashboard → API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk redirect paths — these must match your Clerk dashboard settings
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/feed
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/feed

# ── Turso ────────────────────────────────────────────────────────────────────
# Found in your Turso dashboard or via `turso db show <db-name>`
TURSO_DATABASE_URL=libsql://your-db-name.turso.io
TURSO_AUTH_TOKEN=eyJ...
```

### Database Setup

Push the Drizzle schema to your Turso database. This creates all tables and is safe to re-run (it is additive only).

```bash
pnpm drizzle-kit push
```

This creates the following tables:

- `nodes` — story and branch content
- `node_likes` — which users liked which nodes
- `comments` — comments on story nodes
- `comment_likes` — which users liked which comments
- `ratings` — per-user star ratings on nodes
- `follows` — follower/following relationships
- `user_settings` — per-user privacy preferences

### Running Locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Sign up for an account and start writing.

---

## Architecture

### App Router Layout

All authenticated pages live under the `(logged-in)` route group. The group's `layout.jsx` renders the `<Navbar />` once, above all child pages. Clerk middleware (configured in `middleware.js` at the project root) protects every route under `(logged-in)` and the `/api` handlers.

Route-level `loading.jsx` files leverage React Suspense to display animated pulse skeletons the instant a navigation begins, before any `async` server component resolves its database queries.

### Database Schema

The schema lives in `src/lib/schema.js` and is the single source of truth for all table definitions.

```
nodes
  id            TEXT PRIMARY KEY
  title         TEXT
  content       TEXT NOT NULL          — raw HTML from Tiptap
  parent_id     TEXT                   — NULL for top-level stories, set for branches
  category      TEXT
  author_id     TEXT NOT NULL          — Clerk user ID
  author_name   TEXT NOT NULL
  author_image_url TEXT
  likes         INTEGER DEFAULT 0
  created_at    TEXT NOT NULL          — ISO 8601 string
  visibility    TEXT DEFAULT 'public'  — 'public' | 'private'

node_likes
  node_id       TEXT
  user_id       TEXT
  PRIMARY KEY (node_id, user_id)

comments
  id            TEXT PRIMARY KEY
  node_id       TEXT NOT NULL
  author_id     TEXT NOT NULL
  author_name   TEXT NOT NULL
  author_image_url TEXT
  content       TEXT NOT NULL
  likes         INTEGER DEFAULT 0
  created_at    TEXT NOT NULL

comment_likes
  comment_id    TEXT
  user_id       TEXT
  PRIMARY KEY (comment_id, user_id)

ratings
  node_id       TEXT
  user_id       TEXT
  rating        INTEGER NOT NULL       — 1 to 5
  PRIMARY KEY (node_id, user_id)

follows
  follower_id   TEXT
  target_id     TEXT
  PRIMARY KEY (follower_id, target_id)

user_settings
  user_id       TEXT PRIMARY KEY
  hide_followers BOOLEAN DEFAULT false
  hide_following BOOLEAN DEFAULT false
```

**Important invariant:** a node with `parent_id IS NULL` is a top-level story and may be private. A node with `parent_id IS NOT NULL` is a branch and is always treated as public — `addNode()` in `store.js` enforces this by ignoring any `visibility` value passed for branches.

### API Routes

All routes are under `src/app/api/`. Every handler imports from `@/lib/store` and awaits all calls. Clerk's `auth()` helper is used for authentication checks.

| Method | Path | Description |
|---|---|---|
| GET | `/api/stories` | List all public top-level stories. `?authorId=` filters by author. `?following=true` returns only stories from followed authors. |
| POST | `/api/stories` | Create a new top-level story. Body: `{ title, content, category, author }`. |
| GET | `/api/stories/[id]` | Get a single node plus its ancestor chain and direct children. |
| POST | `/api/stories/[id]/like` | Toggle like on a node. Requires auth. |
| GET | `/api/stories/[id]/rate` | Get rating data and the current user's rating. |
| POST | `/api/stories/[id]/rate` | Set or update a star rating. Requires auth. |
| PATCH | `/api/stories/[id]/visibility` | Set `public` or `private`. Requires auth + ownership. Branches rejected with 400. |
| POST | `/api/stories/[id]/continue` | Create a branch node under the given parent. Requires auth. |
| GET | `/api/stories/[id]/comment` | List comments for a node. |
| POST | `/api/stories/[id]/comment` | Add a comment to a node. |
| POST | `/api/stories/[id]/comment/[commentId]/like` | Toggle like on a comment. |
| GET | `/api/follow/[targetId]` | Get follow status and follower count for a user. |
| POST | `/api/follow/[targetId]` | Toggle follow/unfollow. Requires auth. Cannot self-follow. |
| GET | `/api/user/[userId]/settings` | Get privacy settings for the authenticated user. |
| PATCH | `/api/user/[userId]/settings` | Update privacy settings. Only the owner can call this. |

### Component System

Components follow Atomic Design:

- **Atoms** (`src/components/atoms/`) — single-responsibility primitives: `Avatar`, `Button`, `Input`, `StarRating`, `FollowButton`, `PublicFollowButton`, `CategoryPill`, `Badge`, `Textarea`.
- **Molecules** (`src/components/molecules/`) — composed of atoms, no API calls: `AuthorInfo`, `StoryCard`, `CommentCard`, `ContinuationCard`, `StatGroup`, `StoryThread`, `StoryExportMenu`, `SearchBar`, `FormField`, `FilterTabs`.
- **Organisms** (`src/components/organisms/`) — full feature sections that may fetch data or manage complex state: `Navbar`, `RichEditor`, `StoryForm`, `FeedFilters`, `FeedList`, `FeedSidebar`, `Pagination`, `ReactionBar`, `CommentSection`, `ContinuationList`, `ContinuationForm`, `ProfileHeader`, `ProfileTabs`, `ProfileSettings`, `ProfileForm`, `SecuritySettings`, `PrivacySettings`, `PublicProfileTabs`, `SettingsSidebar`.

All components use `@/` absolute imports. Icons are exclusively from `lucide-react` — no raw SVGs or unicode glyphs in JSX.

---

## Key Concepts

### Story Trees

Each row in `nodes` is a node. Nodes with `parent_id = NULL` are root stories. Nodes with a `parent_id` are branches. There is no depth limit — a branch can itself be branched. The story reader page (`/story/[id]`) fetches the ancestor chain by walking up the tree iteratively through `getAncestorChain()` in `store.js`, and the direct children of the current node to show the continuation list.

```
Root Story (id=A, parent_id=NULL)
├── Branch (id=B, parent_id=A)
│   └── Branch (id=D, parent_id=B)
└── Branch (id=C, parent_id=A)
```

When a reader views node `D`, the breadcrumb shows `A → B → D` and the continuation list shows any branches of `D`.

### Visibility & Privacy

- **Top-level stories** (`parent_id IS NULL`) have a `visibility` column. The owner can toggle it between `'public'` and `'private'` from their profile's Stories tab.
- **Private stories** are excluded from `getTopLevelStories()` (the main feed) and `getPublicStoriesByAuthor()` (public profile pages). They remain accessible at their direct URL to the owner.
- **Branches** (`parent_id IS NOT NULL`) are always public. `addNode()` ignores any `visibility` argument and hard-codes `'public'` for branches.
- **Follower/following counts** can be hidden on the public profile via the Privacy settings tab. This affects `/u/[userId]` only — your own `/profile` always shows them.

### Follow System

Follows are stored in the `follows` table as `(follower_id, target_id)` pairs with a composite primary key ensuring uniqueness. `toggleFollow()` in `store.js` checks for an existing row and either inserts or deletes. The Following feed tab fetches all `target_id` values the viewer follows and queries `nodes` for their public top-level stories.

### Rich Text Editing

The editor (`src/components/organisms/RichEditor.jsx`) uses Tiptap v3 with a sticky toolbar. Tiptap v3 changed the reactive API — toolbar active states use `useEditorState()` instead of the old `forceUpdate` trick. The editor stores and emits HTML. On the story reader page, content that starts with `<` is rendered via `dangerouslySetInnerHTML` into a `.story-content` div that has its own CSS in `globals.css` for proper typography. Image uploads are converted to base64 data URLs client-side via `FileReader` and stored as `<img>` tags inside the HTML content.

---

## Deployment

The application is a standard Next.js app and deploys to any platform that supports Node.js.

### Vercel (recommended)

1. Push the repository to GitHub.
2. Import the repo in Vercel.
3. Add all environment variables from the [Environment Variables](#environment-variables) section in the Vercel project settings.
4. Deploy. Vercel auto-detects Next.js and builds correctly.

### Other platforms

Run:

```bash
pnpm build
pnpm start
```

The production server listens on port 3000 by default. Set `PORT` to override.

### Notes

- The Turso database is an edge-hosted libSQL instance — no additional database server setup is needed for production.
- There is no file storage for images beyond base64 in the database. For production at scale, replace the base64 image upload in `RichEditor.jsx` with an upload to a storage service (e.g. Cloudflare R2, AWS S3) and store the URL instead.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full contributor guide.

---

## License

Copyright 2025 adam (a2e56b85@gmail.com)

Licensed under the Apache License, Version 2.0. See [LICENSE](./LICENSE) for the full text.
