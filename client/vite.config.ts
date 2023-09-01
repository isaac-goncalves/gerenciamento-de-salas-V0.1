import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // https: {
    //   key: fs.readFileSync("./cert/nice-beach-060306510.3.azurestaticapps.net.key"),
    //   cert: fs.readFileSync("./cert/nice-beach-060306510.3.azurestaticapps.net.crt")
    // },
    host: true,
    watch: {
      usePolling: true,
    },
    strictPort: true,
    port: 430, // you can replace this port with any port
  }
})

