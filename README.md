# ClearScore Tech Test

A React application built with TypeScript and Vite, implementing a Server-Driven UI approach.

## Prerequisites

- Node.js (v18+)
- pnpm

## Setup

1. Install dependencies:

```
pnpm install
```

2. Create a `.env` file in the root directory with the following variables:

```
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
EXTERNAL_API_URL=https://api.jsonbin.io/v3/b/6107fbe9f14b8b153e05e714
API_URL=http://localhost:3000
```

## Development

Run both the client and server in development mode:

```
pnpm dev
```

Or run them separately:

```
# Client only
pnpm dev:client

# Server only
pnpm dev:server
```

## Building

```
# Build both client and server
pnpm build

# Build server only
pnpm build:server
```

## Project Structure

```
├── src/                # Source files
│   ├── app/           # App-level components and providers
│   ├── components/    # Reusable UI components
│   ├── features/      # Feature-specific components and logic
│   ├── lib/           # Utilities and configuration
│   ├── server/        # Server-side code
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── tests/             # Test files
```

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@/*` - Source directory
- `@/components/*` - UI Components
- `@/features/*` - Feature modules
- `@/lib/*` - Utilities and configuration
- `@/server/*` - Server-side code
- `@/types/*` - TypeScript types

## Environment Variables

The application uses typed environment variables. Required variables:

- `NODE_ENV` - Environment mode (development/production)
- `PORT` - Server port number
- `LOG_LEVEL` - Server logging level
- `EXTERNAL_API_URL` - External API endpoint
- `API_URL` - Local API endpoint

Environment variables are validated at runtime using Zod. The application will exit if required variables are missing or invalid.

## Linting

The project uses Vercel's ESLint configuration. Run linting with:

```
pnpm lint
```

## Tech Stack

- React 18
- TypeScript
- Vite
- Hono (Server)
- Zod (Schema validation)
- TanStack Query
- CVA (Class Variance Authority)
