# Dashboard demo

Exemple de consommation de BaseKit pour un dashboard : `DashboardLayout` (AppShell
+ sidebar + topbar), `MetricCard`, `DataTable` et `Timeline`.

Ces fichiers sont des **références à copier-coller** dans un projet consommateur
(ils ne sont pas compilés par le monorepo). La version exécutable vit dans
`apps/playground` (onglets _Dashboard_ et _Opérations (Page)_).

## Installation côté projet consommateur

```bash
pnpm add @basekit/ui @basekit/core @basekit/tokens
```

```ts
// main.tsx
import "@basekit/tokens/theme.css";
import "./tailwind.css"; // @tailwind base/components/utilities
```

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
import { basekitPreset } from "@basekit/tokens/preset";

export default {
  presets: [basekitPreset as unknown as Config],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@basekit/ui/dist/**/*.js",
  ],
} satisfies Config;
```

Voir `App.example.tsx` pour le composant React.
