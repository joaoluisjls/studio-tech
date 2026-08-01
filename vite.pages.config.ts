import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const root = path.dirname(fileURLToPath(import.meta.url));

// Static single-page build for GitHub Pages. Uses the shared SPA entry
// (index.html + src/spa-main.tsx). `npm run dev` and `npm run build` (SSR)
// are unaffected.
export default defineConfig({
  base: "/studio-tech/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(root, "src"),
    },
  },
  build: {
    outDir: ".output/public",
    emptyOutDir: true,
  },
});
