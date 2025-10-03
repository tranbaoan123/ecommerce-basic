import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // Key: Path to intercept
        target: "http://localhost:3000", // Target backend server
        changeOrigin: true, // Adjusts the Host header to match the target
      },
    },
  },
});
