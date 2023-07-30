import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? 'docs/' : '/',
  plugins: [react()],
  server: process.env.NODE_ENV === 'development' ? { host: '0.0.0.0', port: 3000 } : {},
})
