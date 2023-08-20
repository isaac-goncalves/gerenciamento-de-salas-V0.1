import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    watch: {
      usePolling: true,
    },
    strictPort: true,
    port: 5173, // you can replace this port with any port
  }
})

