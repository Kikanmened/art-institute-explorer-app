import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const iiifProxy = {
  '/iiif': {
    target: 'https://www.artic.edu',
    changeOrigin: true,
    headers: {
      Referer: 'https://www.artic.edu/',
      'AIC-User-Agent': 'art-institute-explorer-app (WBS class project)',
    },
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: iiifProxy },
  preview: { proxy: iiifProxy },
})