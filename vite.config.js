import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    // Keep Create React App's output folder so the existing Vercel project settings still apply.
    outDir: "build",
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
  },
});
