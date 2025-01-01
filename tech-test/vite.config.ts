import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// eslint-disable-next-line import/no-default-export -- required for Vite
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname),
      '@client': resolve(__dirname, 'src'),
      '@shared': resolve(__dirname, 'shared'),
      '@server': resolve(__dirname, 'server'),
    },
  },
})
