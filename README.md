# ClearScore Tech Test

A React application built with TypeScript and Vite, implementing a credit report insights feature with initial testing.

## Prerequisites

- Node.js (v20+)
- pnpm

## Key Files

- `src/app.tsx` - Main application component
- `src/main.tsx` - Application entry point with Sentry integration
- `src/env.ts` - Environment configuration and validation
- `tailwind.config.js` - Design system tokens and configuration
- `vite.config.ts` - Build configuration with Sentry plugin
- `playwright.config.ts` - E2E and visual regression test configuration
- `vitest.config.ts` - Unit test configurat◊ion
- `pact.config.js` - Contract testing configuration

## Configuration Files

- `.env` - Environment variables
- `.eslintrc.cjs` - Vercel ESLint configuration
- `postcss.config.js` - Tailwind and PostCSS configuration
- `tsconfig.json` - TypeScript configuration
- `.github/workflows/CI.yaml` - CI pipeline configuration

## Testing

- E2E and visual regression tests with Playwright
- Unit tests with Vitest
- Contract tests with Pact
- Comprehensive test coverage across breakpoints

## Tech Stack

- React 18
- TypeScript
- Vite
- TanStack Query
- Tailwind CSS
- CVA (Class Variance Authority)
- Zod
- Sentry
- Playwright
- Vitest
- Pact

The project implements a credit report insights feature with responsive design, accessibility, and comprehensive testing. It uses modern React patterns and practices with a strong focus on type safety and design system implementation.

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env` file in the root directory with the following variables:

```
NODE_ENV
LOG_LEVEL
VITE_CREDIT_REPORT_API_URL
VITE_INSIGHTS_API_URL
VITE_SENTRY_DSN
```

There is also a `.env.example` file in the root directory.

## Development

Run the development server:

```bash
pnpm run dev
```

## Building

```bash
pnpm run build
```

## Project Structure

```
├── src/ # Source files
│ ├── api/ # API client and data fetching
│ ├── assets/ # Static assets and fonts
│ ├── components/ # Reusable UI components
│ ├── lib/ # Utilities and business logic
│ ├── styles/ # Design system tokens
│ └── types/ # TypeScript type definitions
├── e2etests/ # Playwright tests
├── public/ # Static assets
└── pacts/ # Contract test definitions
```

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@/*` - Source directory
- `@/components/*` - UI Components
- `@/lib/*` - Utilities and business logic
- `@/types/*` - TypeScript types and zod schemas

## Environment Variables

The application uses typed environment variables validated with Zod:

- `NODE_ENV` - Environment mode (development/production)
- `LOG_LEVEL` - Log level (debug/info/warn/error)
- `VITE_CREDIT_REPORT_API_URL` - Credit report API endpoint
- `VITE_INSIGHTS_API_URL` - Insights API endpoint
- `VITE_SENTRY_DSN` - Sentry DSN for error tracking

## Testing

Run all tests:

```bash
pnpm run test
```

Or run specific test suites:

```bash
pnpm test:unit # Run unit tests
pnpm test:playwright # Run E2E and visual tests
pnpm test:pact # Run contract tests
```

## Linting

The project uses Vercel's ESLint configuration:

```bash
pnpm run lint
```
