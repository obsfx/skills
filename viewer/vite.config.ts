import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'TldrawViewer',
      formats: ['iife'],
      fileName: () => 'tldraw-viewer.js',
    },
    outDir: '../scripts',
    emptyOutDir: false,
    cssCodeSplit: false,
  },
});
