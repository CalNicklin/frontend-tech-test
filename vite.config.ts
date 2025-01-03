import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Unfonts from 'unplugin-fonts/vite';

// eslint-disable-next-line import/no-default-export -- required for Vite
export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      custom: {
        families: [
          {
            name: 'CSClarity',
            src: './src/assets/fonts/cs-clarity-regular.ttf',
          },
          {
            name: 'CSClarity-bold',
            src: './src/assets/fonts/cs-clarity-bold.ttf',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname),
      '@client': resolve(__dirname, 'src'),
      '@shared': resolve(__dirname, 'shared'),
      '@server': resolve(__dirname, 'server'),
    },
  },
});
