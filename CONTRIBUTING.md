# Contributing to Infinite Story

Thank you for your interest. This guide covers setup, conventions, and the PR process.

---

## Table of Contents

- [Ways to Contribute](#ways-to-contribute)
- [Development Setup](#development-setup)
- [Project Conventions](#project-conventions)
- [Making Changes](#making-changes)
- [Testing Your Changes](#testing-your-changes)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Architecture Decisions](#architecture-decisions)

---

## Ways to Contribute

- **Bug fixes** - open an issue first, then submit a PR.
- **Features** - check open `enhancement` issues and comment to claim before starting.
- **Documentation** - improvements to this guide, the README, or inline comments are welcome.
- **Performance** - query optimisation, bundle size, and rendering fixes are valued.

---

## Development Setup

```bash
# 1. Clone and install
git clone https://github.com/yourusername/infinite_story.git
cd infinite_story
pnpm install          # requires pnpm v11

# 2. Create .env (never commit this)
cp .env.example .env  # fill in Clerk and Turso credentials

# 3. Push database schema
pnpm drizzle-kit push

# 4. Start dev server
pnpm dev
```

Required credentials - see the README's Environment Variables section for full details:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/feed
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/feed
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=eyJ...
```

---

## Project Conventions

### Imports

Always use `@/` absolute imports. No relative paths (`./`, `../`) anywhere.

```js
// Correct
import Avatar from '@/components/atoms/Avatar'
// Wrong
import Avatar from './Avatar'
```

### Components

Follow Atomic Design - place components in the right layer:

| Layer | Location | Rule |
|---|---|---|
| Atom | `src/components/atoms/` | Single element, no API calls, primitive props only |
| Molecule | `src/components/molecules/` | Composed of atoms, no API calls, may have local UI state |
| Organism | `src/components/organisms/` | Full feature sections, may fetch data or use effects |

Default to server components. Only add `'use client'` when you need event handlers, hooks, or Clerk client APIs.

### Styling

- Tailwind utility classes only. Custom CSS goes in `globals.css` only.
- Stick to the existing colour palette (`#242424`, `#6b6b6b`, `#e6e6e6`, `#1a8917`, `#f2a600`, `#c94c4c`).
- Body text: Geist Sans. Editorial/story text: Lora serif via `var(--font-lora)`.
- Mobile-first. Test at 375px viewport width.

### Icons

Lucide React only - no other icon libraries, no raw SVGs, no unicode glyphs.

### Data Access

All database access goes through `src/lib/store.js`. Never import `db.js` or `schema.js` directly from pages or API routes.

- Every store function must be `async` and exported.
- Use `Promise.all` for independent concurrent fetches.
- No business logic in store functions - formatting and enrichment happen in routes or components.

### API Routes

- One named export per HTTP verb (`GET`, `POST`, `PATCH`, etc.).
- Always `await params`: `const { id } = await params`.
- Use `auth()` from `@clerk/nextjs/server` for auth checks.
- Return 401 (unauthenticated), 403 (forbidden), 404 (not found), 400 (bad input) appropriately.

### Comments

Write no comments by default. Add one only when the **why** is non-obvious - a hidden constraint, a subtle invariant, or a workaround for a specific bug.

---

## Making Changes

### Branches

```bash
git checkout main && git pull
git checkout -b feat/my-feature   # or fix/, refactor/, docs/, chore/
```

### Commit Messages

Imperative mood, present tense, under 72 characters:

```
feat: add story export as Markdown
fix: prevent anonymous follow when unauthenticated
```

### Schema Changes

After editing `src/lib/schema.js`:

```bash
pnpm drizzle-kit push
```

Rules:
- Always provide a default for new columns on existing tables.
- Never remove columns in a PR - deprecate first, remove later.
- Update `rowToNode` or `rowToComment` if the new column should be exposed through the store.
- Document every schema change in your PR description.

### New Pages

1. Create `page.jsx` under `src/app/(logged-in)/` (auth) or `src/app/` (public).
2. Create a matching `loading.jsx` with a pulse skeleton that mirrors the page layout.
3. If async, `await params` before destructuring dynamic segments.
4. Add the route to the README's Route table.

### New Components

1. Pick the correct Atomic Design layer.
2. Create `src/components/<layer>/ComponentName.jsx`.
3. Import using `@/` paths everywhere it's used.
4. No barrel `index.js` files - import files directly.

---

## Testing Your Changes

1. **Build must pass:**
   ```bash
   pnpm build
   ```

2. **Manually test the golden path** for anything you touched:
   - Write and publish a story → read, like, rate, comment, branch it
   - Follow an author → check the Following feed tab
   - Profile tabs (Stories, Branches, Likes, Followers, Following)
   - Toggle story visibility (Public / Private)
   - Privacy settings (hide followers / following)
   - Visit another user's public profile

3. **Test at 375px width** - no overflow, no broken layouts.

4. **Accessibility basics** - form inputs have `id`, `name`, `autoComplete`, and `<label htmlFor>`. Icon-only buttons have a `title`.

---

## Pull Request Process

PR title format: `type: short description`

The description must include:

- **What changed** - bullet list of files and why.
- **How to test** - step-by-step instructions with URLs and expected outcomes.
- **Schema changes** - tables/columns added or modified, with types and defaults.
- **Screenshots** - before/after if the UI changed.

**Review checklist** (address before requesting review):

- [ ] `pnpm build` passes with zero errors
- [ ] All imports use `@/` - no relative paths
- [ ] Icons from `lucide-react` only
- [ ] No colours outside the design token palette
- [ ] No `console.log` left in
- [ ] `loading.jsx` added for any new async page
- [ ] Schema changes documented and `drizzle-kit push` confirmed working
- [ ] Tested on desktop and 375px mobile

---

## Reporting Bugs

Open a GitHub Issue with:

1. One-sentence summary
2. Steps to reproduce (numbered, specific URLs and inputs)
3. Expected vs. actual behaviour
4. Browser, OS, Node.js version
5. Screenshots or recording if visual

Label it `bug`.

---

## Architecture Decisions

Do not change these without opening a discussion issue first.

- **No TypeScript** - plain JavaScript throughout.
- **Drizzle only** - no Prisma, Sequelize, or raw SQL outside `sql` template tags.
- **No test framework** - don't add Jest/Vitest/Playwright without maintainer approval.
- **No global state library** - use React `useState`/`useEffect`. No Redux or Zustand.
- **Lucide React only** - no other icon packages.
- **No CSS-in-JS** - Tailwind utilities and `globals.css` only.
- **`store.js` is the only data layer** - pages and routes never import `db.js` or `schema.js` directly.
- **Branches are always public** - enforced in `addNode()`. Do not add UI to change branch visibility.

---

Thank you for contributing to Infinite Story.
