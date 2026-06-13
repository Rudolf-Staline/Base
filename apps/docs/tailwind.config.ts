import type { Config } from "tailwindcss";
import { basekitPreset } from "../../packages/tokens/src/tailwindPreset";

export default {
  presets: [basekitPreset as unknown as Config],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
