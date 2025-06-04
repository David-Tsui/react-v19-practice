import { defineConfig } from 'vitest/config'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-react-components/vite'


export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['react'],
    }),
    Components({
      include: [/\.tsx$/],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
