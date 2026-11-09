import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function getBackendTarget(): string {
  // 1. Explicit environment variable overrides
  if (process.env.BACKEND_URL) return process.env.BACKEND_URL;
  if (process.env.VITE_BACKEND_PORT) return `http://localhost:${process.env.VITE_BACKEND_PORT}`;
  if (process.env.PORT) return `http://localhost:${process.env.PORT}`;

  // 2. Dynamic discovery file written by server/index.js at runtime
  try {
    const activeFile = path.resolve(__dirname, 'server/data/active_server.json');
    if (fs.existsSync(activeFile)) {
      const data = JSON.parse(fs.readFileSync(activeFile, 'utf8'));
      if (data && data.url) return data.url;
      if (data && data.port) return `http://localhost:${data.port}`;
    }
  } catch {}

  // 3. Standard default
  return 'http://localhost:5000';
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        router: () => getBackendTarget(),
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        router: () => getBackendTarget(),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'ui-vendor': ['framer-motion', 'lucide-react', 'canvas-confetti'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
});
