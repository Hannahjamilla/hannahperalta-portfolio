import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '127.0.0.1',
    port: 5174,
  },
  build: {
    chunkSizeWarningLimit: 400,
    minify: 'esbuild',
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          // More aggressive chunking
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react'
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'icons'
          }
          if (id.includes('src/components/ui/')) {
            return 'ui'
          }
          if (id.includes('src/data/')) {
            return 'data'
          }
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || 'asset'
          if (/\.(png|jpe?g|webp|svg|gif|tiff|bmp|ico)$/i.test(name)) {
            return `images/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    force: true
  },
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
})
