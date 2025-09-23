import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:3333',
        changeOrigin: true,
        secure: false, // karena Gophish pakai self-signed cert
      },
      // Proxy ke Ark API
      '/ark-api': {
        target: 'https://ark.ap-southeast.bytepluses.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ark-api/, ''),
      },
    }
  }
})
