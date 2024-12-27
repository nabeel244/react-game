import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import inject from "@rollup/plugin-inject";

export default defineConfig({
  plugins: [
    react(),
    inject({
      crypto: ["crypto", "*"], // Inject crypto polyfill
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "https://api1.ideascan.io", // Use environment variable
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Strip /api prefix
        secure: false, // Disable SSL check during local development
      },
    },
  },
});
