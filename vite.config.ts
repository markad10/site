import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from 'url';
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// إعدادات Vite المبسطة والمتوافقة مع Windows
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "client", "src"),
      "@shared": resolve(__dirname, "shared"),
    },
  },
  root: resolve(__dirname, "client"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    host: '127.0.0.1',
    port: 5000,
    strictPort: true,
    watch: {
      usePolling: true,
    },
    fs: {
      strict: false,
    },
  },
});
