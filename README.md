# LESGOPRO - Learner's Group of Programmers

A Next.js application for LESGOPRO at Mandaue City College with a clear split between the public site and a protected admin area.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI primitives**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Cormorant Garamond and Source Sans 3

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lesgopro-org
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/
│   ├── (public)/           # Open-facing pages for students and other visitors
│   ├── (private)/          # Protected admin route group
│   │   └── admin/          # Admin pages live behind the private boundary
│   ├── api/                # Future Next.js route handlers
│   └── layout.tsx          # Root fonts, metadata, loader, assistant
├── components/
│   ├── app/                # Cross-feature shells and app-level shared components
│   ├── navigation/         # Shared navigation components
│   └── ui/                 # Reusable design-system primitives
├── features/
│   ├── assistant/          # AI assistant feature
│   ├── public/home/        # Public homepage feature module
│   └── workspace/          # Admin workspace components
├── hooks/                  # Shared hooks used by multiple features
├── lib/
│   ├── api/                # Shared API clients and adapters
│   └── utils.ts            # Shared utilities
├── types/                  # Cross-feature shared types
└── styles/
    └── globals.css         # Global styles and design tokens
```

## Conventions

- Feature-first organization: keep feature-specific components, hooks, types, and content inside the feature folder.
- Shared primitives only: `src/components/ui` is for reusable UI building blocks, not feature UI.
- Shared app shells only: `src/components/app` is for shells and app-wide building blocks.
- Explicit file names: prefer names like `home-content.ts`, `home-types.ts`, and `assistant-types.ts`.
- Barrel files: use `index.ts` only at stable boundaries.

`AGENTS.md` is the source of truth for future agent and contributor conventions.

## Commands

```bash
npm run dev
npm run lint
npm run type-check
```

## License

© 2026 LESGOPRO - Learner's Group of Programmers, Mandaue City College. All rights reserved.
