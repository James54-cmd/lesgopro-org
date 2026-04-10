# LESGOPRO - Learner's Group of Programmers

A modern web application for the LESGOPRO organization at Mandaue City College, built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Design System Features

- **LESGOPRO Brand Colors**: Crimson red, antique gold, laurel green, and warm cream
- **shadcn/ui Integration**: Pre-built accessible components with LESGOPRO theming
- **Responsive Design**: Mobile-first approach with clean, collegiate aesthetics
- **Type-safe**: Full TypeScript support with proper type definitions

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom LESGOPRO design tokens
- **Components**: shadcn/ui with branded wrapper components
- **Icons**: Lucide React
- **Typography**: Inter Font (Google Fonts)
- **Language**: TypeScript

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

### Adding shadcn/ui Components

To add more shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

For example:
```bash
npx shadcn@latest add dialog dropdown-menu table tabs
```

## Project Structure

```
src/
├── app/                     # Next.js App Router pages
│   ├── layout.tsx          # Root layout with Inter font
│   └── page.tsx            # Homepage
├── components/
│   ├── ui/                 # shadcn/ui generated components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── badge.tsx
│   ├── layout/             # Layout components
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   └── shared/             # LESGOPRO branded components
│       ├── section-header.tsx
│       ├── stat-card.tsx
│       ├── status-badge.tsx
│       ├── member-card.tsx
│       └── event-card.tsx
├── features/
│   └── home/
│       ├── data.ts         # Homepage content and typed data
│       └── sections/       # Home page section components
│           ├── hero-section.tsx
│           ├── stats-section.tsx
│           ├── members-section.tsx
│           ├── events-section.tsx
│           ├── projects-section.tsx
│           └── join-cta-section.tsx
├── lib/
│   └── utils.ts            # Utility functions (cn helper)
└── styles/
    └── globals.css         # Global styles with CSS variables
```

## Component Library

### LESGOPRO Components

- **SectionHeader**: Branded section headers with labels and titles
- **StatCard**: Statistical display cards with LESGOPRO styling
- **StatusBadge**: Status indicators with brand color variants
- **MemberCard**: Member profile cards with roles and specializations
- **EventCard**: Event display cards with date, status, and registration info

### Design Tokens

The design system includes:
- **Colors**: Primary (crimson), Secondary (gold), Accent (green), Cream background
- **Typography**: Inter font with defined scale and spacing
- **Shadows**: Branded shadow system with ink-based colors
- **Border Radius**: Consistent rounded corners (6px, 8px, 12px, 16px)

## Customization

### Adding New Color Variants

1. Add colors to `tailwind.config.ts`:
```typescript
colors: {
  'new-color': {
    DEFAULT: '#hex-value',
    light: '#hex-value',
    dark: '#hex-value',
  }
}
```

2. Add CSS variables to `globals.css`:
```css
:root {
  --new-color: hsl-values;
}
```

### Creating New Components

Follow the pattern:
1. Use shadcn/ui base components when possible
2. Create wrapper components in `shared/` that apply LESGOPRO styling
3. Use the `cn()` utility for conditional styling
4. Follow the established component prop patterns

## Contributing

1. Follow the established component patterns
2. Use TypeScript for all new code
3. Maintain the LESGOPRO design consistency
4. Test components in the homepage before committing

## License

© 2026 LESGOPRO - Learner's Group of Programmers, Mandaue City College. All rights reserved.
