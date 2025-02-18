import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        // target: "http://clicker-game-api.me",
        // target: "http://18.221.208.111:8000",
        target: "https://api1.ideascan.io",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
