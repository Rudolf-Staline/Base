import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const here = fileURLToPath(new URL(".", import.meta.url));
const pkg = (p: string) => resolve(here, "../../packages", p);

/**
 * Vite resolves `@basekit/*` straight to source, so the playground always runs
 * against the latest package code with no build step in dev.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@basekit/tokens/theme.css": pkg("tokens/theme.css"),
      "@basekit/tokens/preset": pkg("tokens/src/tailwindPreset.ts"),
      "@basekit/tokens": pkg("tokens/src/index.ts"),
      "@basekit/core": pkg("core/src/index.ts"),
      "@basekit/ui": pkg("ui/src/index.tsx"),
      "@basekit/api": pkg("api/src/index.ts"),
    },
  },
  server: { host: "0.0.0.0", port: 5173 },
});
