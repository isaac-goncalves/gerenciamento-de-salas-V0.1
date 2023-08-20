import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  host: true,
  server: {
    watch: {
      usePolling: true,
    },
    strictPort: true,
    port: 5173, // you can replace this port with any port
  }
})

