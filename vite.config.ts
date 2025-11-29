import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@shared': '/src/shared',
      '@modules': '/src/modules',
      '@stores': '/src/stores',
      '@lib': '/src/lib',
      '@utils': '/src/utils',
      '@types': '/src/types',
      '@assets': '/src/assets'
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'ui-vendor': ['framer-motion', '@headlessui/react'],
          'utils-vendor': ['date-fns', 'clsx', 'tailwind-merge']
        }
      }
    }
  }
})