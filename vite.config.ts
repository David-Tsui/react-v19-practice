import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-react-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      // target to transform
      include: [
        /\.tsx?$/, // .ts, .tsx,
      ],

      imports: [
        'react',
      ],
      eslintrc: {
        enabled: true, // <-- generate eslintrc-auto-import.json
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
      dts: './auto-imports.d.ts', // generate corresponding .d.ts file
      // you can also use custom resolvers
      resolvers: [],
    }),

    Components({
      // You can customize the dirs if your components are in a different folder
      include: [/\.tsx$/],
      dts: true, // generate corresponding .d.ts file
    }),
  ],
})
