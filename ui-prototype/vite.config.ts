import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// UI 프로토타입 전용 서버 (실제 frontend 5173 포트와 완전히 분리된 5174 포트 고정)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
  },
})
