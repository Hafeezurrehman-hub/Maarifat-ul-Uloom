import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed at: https://hafeezurrehman-hub.github.io/Maarifat-ul-Uloom/
export default defineConfig({
  base: '/Maarifat-ul-Uloom/',
  plugins: [react()],
  build: {
    // Suppress the large-chunk warning (expected for a React + Framer Motion SPA)
    chunkSizeWarningLimit: 1200,
    cssCodeSplit: true,
    target: 'es2020',
  },
})
