/**
 * Vite configuration file using `defineConfig` for type assistance.
 *
 * Plugins:
 * - `@vitejs/plugin-react-swc`: Enables React support with SWC (a faster alternative to Babel).
 *
 * Module Resolution:
 * - Sets up custom path aliases for cleaner and more maintainable imports throughout the project.
 *   These aliases map shorthand paths to specific folders or files in the `src/` directory.
 *
 * Aliases:
 * - `@`           → `src/` root directory
 * - `@api`        → `src/api/index.ts`
 * - `@assets`     → `src/assets`
 * - `@components` → `src/components`
 * - `@constants`  → `src/constants`
 * - `@hooks`      → `src/hooks`
 * - `@pages`      → `src/pages`
 * - `@utils`      → `src/utils`
 * - `@context`    → `src/context`
 * - `@services`   → `src/services`
 * - `@types`      → `src/types`
 * - `@styles`     → `src/styles`
 * - `@store`      → `src/store`
 * - `@routes`     → `src/routes`
 *
 * This setup enhances development efficiency by simplifying relative imports and improving code readability.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'src/api/index.ts'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@routes': path.resolve(__dirname, 'src/routes'),
    },
  },
})
