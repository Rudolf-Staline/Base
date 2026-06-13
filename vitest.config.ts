import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const here = fileURLToPath(new URL(".", import.meta.url));
const pkg = (p: string) => resolve(here, "packages", p);

export default defineConfig({
  esbuild: { jsx: "automatic" },
  resolve: {
    alias: {
      "@basekit/tokens/preset": pkg("tokens/src/tailwindPreset.ts"),
      "@basekit/tokens": pkg("tokens/src/index.ts"),
      "@basekit/core": pkg("core/src/index.ts"),
      "@basekit/ui": pkg("ui/src/index.tsx"),
      "@basekit/api": pkg("api/src/index.ts"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "packages/**/*.{test,spec}.{ts,tsx}",
      "tests/**/*.{test,spec}.{ts,tsx}",
    ],
  },
});
