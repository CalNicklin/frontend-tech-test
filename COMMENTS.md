# Implementation Comments

## Key Technical Decisions

### Framework & Tools
- Following your recommendation, I used Vite/React as SSR wasn't necessary for this scope
- Used pnpm as package manager
- Implemented Vercel's house style guide linting presets for code quality
- Used Tanstack Query for data fetching and caching
- Implemented Zod for runtime schema validation and type safety
- [PARKED] Used Hono for the API service, chosen for its strong Zod integration (ask me to see this!)
- Integrated Playwright for browser-level testing
- Added basic Sentry logging for production error tracking
- Implemented a typesafe design system with CVA / Tailwind CSS
- Utilized Radix for the insight details drawer implementation

### Architecture Decisions
- Initially explored Server-Driven UI (SDUI) approach but ultimately parked it due to time constraints, which included:
  -- Implemented a Node service to handle API data fetching and transformation in an SDui schema.
- Used Zod schemas as single source of truth for both API and UI component prop types
- Developed with a TDD/CDD approach for reliability
- Implemented per-card data schema validation rather than all-or-nothing rendering for better UX.
- Added comprehensive type safety.

## Time Constraint Concessions

1. **SDUI Implementation**: While initially explored, had to park the full SDUI approach to focus on delivering a solid, production-ready client side solution within the timeframe.

2. **Testing Coverage**: While key functionality is tested (including Playwright tests for critical user flows), there could be room for more comprehensive test coverage especially around the UI.

3. **Localisation**: Didn't implement localisation due to time constraints

4. **Storybook**: Would have been useful as a tool for component development, design collaboration and documentation

## Additional Notes

- The implementation focuses on production readiness and maintainability
- Strong emphasis on type safety and runtime validation throughout the application
- Implemented responsive design across all breakpoints
- Added error handling and loading states
- Added comprehensive TypeScript documentation comments

## Future Improvements (Given More Time)

1. Complete mock SDUI implementation for more dynamic UI control
2. Expand test coverage
3. Full OpenAPI specification documentation with zod-openapi
4. More comprehensive error handling and recovery strategies
5. Enhanced performance optimizations
6. More extensive accessibility testing
