/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    watch: true,
    setupFiles: './__test__/setup.js',
    reporters: 'verbose',
    include: ['**/*.test.tsx'],
    cache: false
  }
})
