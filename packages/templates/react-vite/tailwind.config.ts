import type { Config } from "tailwindcss";
import { basekitPreset } from "@basekit/tokens/preset";

export default {
  presets: [basekitPreset as unknown as Config],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@basekit/ui/dist/**/*.js",
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
