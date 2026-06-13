import type { Config } from "tailwindcss";
import { basekitPreset } from "@basekit/tokens";

/**
 * Shared Tailwind base config for BaseKit apps.
 *
 * Apps should `presets: [basekitPreset]` (or extend this file) and add their
 * own `content` globs. Always include the UI package source so its classes are
 * generated:
 *
 *   content: [
 *     "./index.html",
 *     "./src/**\/*.{ts,tsx}",
 *     "../../packages/ui/src/**\/*.{ts,tsx}",
 *   ]
 */
const config: Partial<Config> = {
  presets: [basekitPreset as unknown as Config],
  theme: { extend: {} },
  plugins: [],
};

export default config;
export { basekitPreset };
