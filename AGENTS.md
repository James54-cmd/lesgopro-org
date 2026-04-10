---
name: feature-structuring
description: >
  Apply this skill whenever the user is structuring, scaffolding, or refactoring any
  React or Next.js codebase. Trigger when they ask: where does this file go, how do I
  organize this feature, is this the right structure, where should this hook live, how do
  I separate concerns, or how do I scale this project. Also trigger when the user shares
  a folder tree or file and asks for feedback on structure — even if they never say
  "feature" or "architecture". Use this skill for any project regardless of data layer
  (GraphQL, REST, Supabase, tRPC, SWR, React Query) or routing strategy (app router,
  pages router). This skill is project-agnostic and adapts to the stack the user describes.
---

# Feature Structuring Skill

A flexible, senior-level guide for organizing any React/Next.js codebase.
Stack-agnostic. Adapts to GraphQL, REST, Supabase, tRPC, or anything else.

**Core goal**: Every file has exactly one home. That home is always obvious.

---

## Step 1 — Read the Project First

Before suggesting any structure, identify:

1. **Routing strategy** — `app/` router (Next.js 13+) or `pages/` router?
2. **Data layer** — GraphQL (Apollo/urql), REST (fetch/axios), Supabase client, tRPC, SWR, React Query?
3. **Auth pattern** — Supabase Auth, NextAuth, Clerk, custom?
4. **Existing conventions** — What folders already exist? Respect them unless they're wrong.
5. **Project scale** — Solo/small (flexible) vs team/large (strict)?

Ask the user if any of these are unclear. Never assume the stack.

---

## The Universal Layer Model

Regardless of stack, these layers always exist. Data flows **down only** — never skip, never go back up.

```
┌─────────────────────────────────┐
│         app/ or pages/          │  Routing only. No logic. No state.
├─────────────────────────────────┤
│        Feature Pages            │  Composes state hook + components.
├─────────────────────────────────┤
│        Feature State Hook       │  Owns all local state for this feature.
├─────────────────────────────────┤
│        Feature Logic Hooks      │  Business logic. Calls data hooks.
├─────────────────────────────────┤
│        Data / Server Hooks      │  Fetching, mutations, caching.
├─────────────────────────────────┤
│     Queries / API / Client      │  Raw queries, API calls, client setup.
├─────────────────────────────────┤
│          API → Database         │  Server only.
└─────────────────────────────────┘
```

---

## Universal Directory Layout

This layout adapts to any Next.js project. Sections marked `[stack-dependent]` vary by data layer.

```
app/                              # Next.js routing ONLY
  (group)/                        # Route groups for layout isolation
    feature-name/
      page.tsx                    # Thin shell — imports page component only
  api/                            # API routes / server actions
    feature/route.ts
  layout.tsx
  globals.css

features/                         # ALL UI + state lives here
  <feature-name>/
    types.ts                      # Interfaces, enums, zod schemas for this feature
    hooks/
      use<Feature>State.ts        # Single state hook — owns useState, derived values
      use<Feature>.ts             # Business logic hook — calls data hooks
    components/
      <Feature>Card.tsx           # Dumb — props in, JSX out
      <Feature>List.tsx           # Dumb — props in, JSX out
      <Feature>Form.tsx           # Dumb — controlled, callbacks only
    pages/
      <Feature>Page.tsx           # Composes state hook + components

lib/                              # All data access — zero UI here
  [stack-dependent — see below]
  server/                         # Server-only utilities (never imported by client)
    <service>.ts
  utils.ts                        # Pure functions — no side effects, no imports from features
  auth/                           # Auth helpers and redirects

components/                       # Shared cross-feature UI primitives only
  ui/
    button.tsx
    modal.tsx
    card.tsx

types/                            # Global/shared types only
  index.ts                        # App-wide interfaces
  <service>.ts                    # Generated or external types (e.g. supabase.ts)

prompts/                          # AI prompt templates (if applicable)
scripts/                          # One-off scripts, ingestion, seeding
supabase/ or prisma/              # DB schema, migrations
```

---

## lib/ by Data Layer

Adapt `lib/` based on the project's data layer. Pick the one that matches.

### Supabase (REST + realtime)
```
lib/
  supabase.ts                     # Client init (browser)
  server/
    supabase-admin.ts             # Service role client — server only
  <feature>/
    queries.ts                    # Supabase select/filter chains
    mutations.ts                  # Insert/update/delete calls
    hooks.ts                      # useQuery wrappers (React Query or SWR)
```

### GraphQL (Apollo / urql)
```
lib/
  graphql/
    client.ts                     # Apollo/urql client setup
    <feature>/
      queries.ts                  # gql`` strings
      mutations.ts                # gql`` strings
      hooks.ts                    # useQuery / useMutation wrappers
```

### REST / fetch
```
lib/
  api/
    client.ts                     # Base fetch wrapper, auth headers
    <feature>/
      endpoints.ts                # URL constants
      requests.ts                 # Typed fetch functions
      hooks.ts                    # useQuery/SWR/React Query wrappers
```

### tRPC
```
lib/
  trpc/
    client.ts                     # tRPC client
    server.ts                     # tRPC router
  server/
    routers/
      <feature>.ts                # Feature router
```

---

## The 10 Rules (Stack-Agnostic)

### Rule 1 — Separate DATA from FEATURE from ROUTING
- `lib/` = data access, server utilities, client setup
- `features/` = UI + state + business logic
- `app/` or `pages/` = routing shell only

### Rule 2 — Every feature gets its own folder
```
features/bible/
features/chat/
features/settings/
```
One product feature = one folder. Shared UI goes in `components/ui/`, not in a feature.

### Rule 3 — Feature folder anatomy
```
features/<n>/
  types.ts          ← always
  hooks/            ← always
  components/       ← always
  pages/            ← optional (skip if app/ routing handles it directly)
```

### Rule 4 — State lives in one hook per feature
The page shell renders. The state hook thinks.
```ts
// ✅ Correct
export function useBibleState() {
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null)
  const { verses } = useBibleVerses()
  return { selectedVerse, setSelectedVerse, verses }
}

// ❌ Wrong — logic leaking into the page
export default function BiblePage() {
  const [selectedVerse, setSelectedVerse] = useState(null) // move this out
}
```

### Rule 5 — Feature hooks call data hooks, not clients
```
Page → useFeatureState → useFeatureLogic → useDataHook → lib/client
```
Never call `supabase.from(...)`, `apolloClient.query(...)`, or `fetch(...)` directly
inside a component or state hook.

### Rule 6 — Data hooks live in lib/, not in features/
```ts
// lib/graphql/bible/hooks.ts  ✅
export function useGetVerses() {
  return useQuery(GET_VERSES)
}

// features/bible/hooks/useBible.ts  ✅
import { useGetVerses } from '@/lib/graphql/bible/hooks'
export function useBible() {
  const { data } = useGetVerses()
  // business logic here
}
```

### Rule 7 — Components are dumb
No fetching. No saving. No business logic. Props in → JSX out.
```tsx
// ✅ Correct
function VerseCard({ verse, onHighlight }: Props) {
  return <div onClick={() => onHighlight(verse.id)}>{verse.text}</div>
}

// ❌ Wrong
function VerseCard({ verseId }: { verseId: string }) {
  const { data } = useGetVerse(verseId) // fetching in component
}
```

### Rule 8 — Pages compose only
```tsx
// ✅ Correct — app/bible/page.tsx
import { BiblePage } from '@/features/bible/pages/BiblePage'
export default function Page() { return <BiblePage /> }

// ✅ Correct — features/bible/pages/BiblePage.tsx
export function BiblePage() {
  const state = useBibleState()
  return <BibleReader {...state} />
}
```

### Rule 9 — server/ is a hard boundary
Files in `lib/server/` are never imported by client components.
Mark them or keep them in server-only paths.
```
lib/server/supabase-admin.ts    ← service role key, server only
lib/server/chat-generation.ts   ← AI calls, server only
lib/server/api-bible.ts         ← external API, server only
```

### Rule 10 — Shared vs feature-scoped
| Is it used by 2+ features? | → `components/ui/` or root `lib/utils.ts` |
| Is it used by 1 feature only? | → inside `features/<n>/` |
| Is it a global type? | → `types/index.ts` |
| Is it a feature type? | → `features/<n>/types.ts` |

---

## Pre-Ship Checklist

For every new feature, verify before merging:

- [ ] Feature folder exists under `features/`
- [ ] `types.ts` exists with all interfaces for this feature
- [ ] One state hook (`use<Feature>State.ts`) owns all `useState`
- [ ] Components receive props only — no fetching inside
- [ ] Page (app/ or feature/pages/) only composes — no logic
- [ ] Data hooks are in `lib/` not in `features/`
- [ ] Nothing in `lib/server/` is imported by a client component
- [ ] No direct client calls (`supabase`, `fetch`, `apollo`) inside components
- [ ] Shared UI is in `components/ui/`, not duplicated across features
- [ ] Types not duplicated — check `types/` before creating new ones

---

## Naming Conventions

| Thing | Pattern | Example |
|---|---|---|
| Feature state hook | `use<Feature>State` | `useBibleState` |
| Feature logic hook | `use<Feature>` | `useBible`, `useHighlight` |
| Data hook | `use<Action><Resource>` | `useGetVerses`, `useCreateNote` |
| Component | `PascalCase` noun | `VerseCard`, `HighlightBar` |
| Page component | `<Feature>Page` | `BiblePage`, `ChatPage` |
| Route shell | `page.tsx` | Next.js convention |
| Query file | `queries.ts` | per feature in lib/ |
| Types file | `types.ts` | per feature in features/ |
| Server utility | `<service>.ts` | `supabase-admin.ts` |

---

## Quick Reference — Where Does This File Go?

| What you're writing | Where it goes |
|---|---|
| A SQL/Supabase query | `lib/<layer>/<feature>/queries.ts` |
| A data-fetching hook | `lib/<layer>/<feature>/hooks.ts` |
| Local UI state | `features/<feature>/hooks/use<Feature>State.ts` |
| Business logic | `features/<feature>/hooks/use<Feature>.ts` |
| A UI component (feature-only) | `features/<feature>/components/` |
| A UI component (shared/global) | `components/ui/` |
| A page shell | `app/<route>/page.tsx` |
| A full page component | `features/<feature>/pages/<Feature>Page.tsx` |
| A feature-scoped type | `features/<feature>/types.ts` |
| A global/shared type | `types/index.ts` |
| A generated type (Supabase, etc.) | `types/<service>.ts` |
| A pure helper function | `lib/utils.ts` or `features/<feature>/utils.ts` |
| A server-only utility | `lib/server/<service>.ts` |
| AI prompts | `prompts/<n>.md` |
| DB schema/migrations | `supabase/` or `prisma/` |
| One-off scripts | `scripts/` |
| Client setup (Supabase/Apollo/etc.) | `lib/<layer>/client.ts` |
| Auth helpers | `lib/auth/` |
| API route | `app/api/<feature>/route.ts` |

---

## Common Mistakes & Fixes

| Mistake | Fix |
|---|---|
| `useState` in a page | Move to `use<Feature>State.ts` |
| `fetch` / `supabase.from` in a component | Move to `lib/<layer>/<feature>/hooks.ts` |
| Business logic in a component | Move to `features/<feature>/hooks/use<Feature>.ts` |
| Feature-specific type in `types/index.ts` | Move to `features/<feature>/types.ts` |
| Shared component duplicated in 2 features | Move to `components/ui/` |
| `lib/server/` file imported in a client component | Wrap in an API route or server action |
| One huge `hooks.ts` for the whole app | Split by feature folder |
| Page importing directly from `lib/` | Go through a feature hook instead |
| Helper in a component file | Extract to `lib/utils.ts` or feature `utils.ts` |
