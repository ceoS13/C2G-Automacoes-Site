
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true, // Garante que o CSS seja dividido por rota/componente
    rollupOptions: {
      output: {
        manualChunks: {
          // Separa o núcleo do React (carregado sempre)
          'react-vendor': ['react', 'react-dom'],
          // Separa animações pesadas (só carrega quando necessário)
          'framer-motion': ['framer-motion'],
          // Separa ícones e utilitários
          'ui-vendor': ['lucide-react', 'clsx', 'tailwind-merge'],
          // Separa bibliotecas de scroll e animação secundária
          'animation-vendor': ['aos', 'react-scroll']
        }
      }
    },
    // Otimizações de minificação para reduzir tempo de parse
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    port: 3000,
  },
});
