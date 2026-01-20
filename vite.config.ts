 import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // GitHub Pages base path
  base: '/aletwe/',

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
