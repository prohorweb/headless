import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // proxy /graphql to WordPress to avoid CORS during development
      '/graphql': {
        target: process.env.VITE_GRAPHQL_PROXY_TARGET || 'http://wordpress',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/graphql/, '/graphql')
      }
    }
  }
})
