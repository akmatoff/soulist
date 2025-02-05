import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        bar: './bar.html',
        cousine: './cousine.html',
      },
    },
  },
})
