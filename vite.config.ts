import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcss from './postcss.config'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss
  }
})
