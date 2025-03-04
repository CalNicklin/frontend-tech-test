import path from 'node:path';
import { defineConfig } from 'vitest/config';

// eslint-disable-next-line import/no-default-export -- vitest config
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['**/e2e/**', '**/e2etests/**', 'node_modules/**'],
  },
});
