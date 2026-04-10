# AGENTS.md

## Goal
Keep the repo easy to navigate as it grows across the public site and the protected admin experience.

## Route Boundaries
- `src/app/(public)` is the open-facing experience for students and other visitors.
- `src/app/(private)` is the protected admin route group.
- Admin pages live at `src/app/(private)/admin`.
- Future route handlers belong in `src/app/api/**/route.ts`.

## Folder Ownership
- `src/features/<domain>/<feature>` owns feature-specific UI, content, hooks, api helpers, and types.
- `src/components/ui` is only for reusable design-system primitives.
- `src/components/app` is for cross-feature app shells and shared application-level components.
- `src/components/navigation` is for shared navigation pieces.
- `src/hooks` is only for hooks reused across multiple features.
- `src/lib/api` is for shared API clients, adapters, and request helpers.
- `src/types` is only for cross-feature shared types.

## Naming Rules
- Use kebab-case file names.
- Prefer explicit file names over generic ones.
- Good: `home-content.ts`, `home-types.ts`, `assistant-types.ts`, `private-area-overview.tsx`.
- Avoid generic names like `data.ts`, `helpers.ts`, or `types.ts` at broad levels unless the folder scope is tiny and obvious.

## Index Files
- Use `index.ts` only at stable boundaries such as `components/app`, `components/navigation`, or a top-level feature folder.
- Do not add barrel files inside every nested folder by default.

## Placement Rules
- If a component is used by only one feature, keep it inside that feature.
- If a hook is used by only one feature, keep it inside that feature.
- If an API helper is used by only one feature, keep it inside that feature under an `api/` folder when needed.
- Promote files to global folders only after they are clearly shared.

## Quick Checklist
- Public UI stays out of private-only folders.
- Admin functionality stays under the private route boundary.
- Shared primitives go to `components/ui`.
- Shared shells and navigation go to `components/app` or `components/navigation`.
- Cross-feature hooks go to `src/hooks`.
- Shared API clients go to `src/lib/api`.
