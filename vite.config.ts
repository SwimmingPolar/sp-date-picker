/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'
import libCss from 'vite-plugin-libcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    dts({
      insertTypesEntry: true
    }),
    libCss()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    watch: true,
    setupFiles: './__test__/setup.js',
    reporters: 'verbose',
    include: ['**/*.test.tsx'],
    cache: false
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'index',
      formats: ['es', 'umd'],
      fileName: format => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
