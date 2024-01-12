import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['eventemitter3', 'parse-svg-path', 'earcut', '@xmldom/xmldom', '@pixi/react', 'react', 'react-dom/client', 'pixi.js'],
    noDiscovery: true,
    force: true
  }
})
