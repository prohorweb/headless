import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/graphql': {
        target: process.env.VITE_GRAPHQL_PROXY_TARGET || 'http://wordpress',
        changeOrigin: true,
        secure: false
      },
      '/wp-content': {
        target: process.env.VITE_GRAPHQL_PROXY_TARGET || 'http://wordpress',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
