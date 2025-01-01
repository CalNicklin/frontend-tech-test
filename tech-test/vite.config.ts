import { defineConfig } from 'vite'

// eslint-disable-next-line import/no-default-export -- required for Vite
export default defineConfig({
  resolve: {
    alias: {
      "@": ".",
    },
  },
})
