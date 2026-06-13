# Tokens

`@basekit/tokens` est la **source unique de vérité visuelle**. Il définit le vocabulaire que
tous les composants partagent et le matérialise sous trois formes : des valeurs TypeScript, des
variables CSS `--bk-*`, et un preset Tailwind de classes sémantiques. Aucune couleur brute
n'existe en dehors de ce package.

## Couleurs et `ColorToken`

Les couleurs sont des **rôles sémantiques**, jamais des teintes. La liste complète
(`ColorToken`, dans `types.ts`) :

```
background, foreground,
surface, surfaceRaised, surfaceMuted,
primary, primaryForeground,
accent, accentForeground,
success, successForeground,
warning, warningForeground,
danger, dangerForeground,
muted, mutedForeground,
border, input, ring
```

Chaque rôle a une valeur en thème clair (`lightColors`) et sombre (`darkColors`). Exemple
(extrait de `colors.ts`) :

```ts
export const lightColors: ColorScale = {
  background: "#f6f7f9",
  foreground: "#161a22",
  surface: "#ffffff",
  primary: "#4f46e5",
  primaryForeground: "#ffffff",
  border: "#e2e5ea",
  ring: "#6366f1",
  // …
};
```

Pour les tons « à teinte » (`primary`, `accent`, `success`, `warning`, `danger`), le générateur
calcule automatiquement deux variantes via `color-mix` : `-soft` (fond léger) et `-hover`
(survol). Le ton `neutral` s'appuie sur les surfaces plutôt qu'une teinte.

## Vocabulaire partagé

Tous les composants parlent ces unions (`types.ts`) :

| Type        | Valeurs                                              |
| ----------- | ---------------------------------------------------- |
| `Tone`      | `neutral`, `primary`, `accent`, `success`, `warning`, `danger` |
| `Variant`   | `solid`, `soft`, `outline`, `ghost`, `link`          |
| `Size`      | `xs`, `sm`, `md`, `lg`, `xl`                          |
| `Radius`    | `none`, `sm`, `md`, `lg`, `xl`, `full`                |
| `Shadow`    | `none`, `sm`, `md`, `soft`, `strong`                  |
| `Align`     | `start`, `center`, `end`, `stretch`, `baseline`       |
| `Justify`   | `start`, `center`, `end`, `between`, `around`         |

Valeurs concrètes : `Radius` va de `0` (`none`) à `9999px` (`full`), `md = 0.5rem`. `Shadow`
définit des élévations douces (`soft` et `strong` sont les presets « carte »). `Size` pilote à
la fois l'espacement (`spacing`) et la typographie (`fontSizes`).

## Le preset Tailwind : classes sémantiques

`basekitPreset` expose les tokens comme utilitaires Tailwind dont la couleur résout vers une
variable `--bk-*`. On écrit donc **toujours** :

```
bg-surface  bg-surface-raised  bg-surface-muted
text-foreground  text-muted-foreground
border-border  border-input
bg-primary  text-primary-foreground  bg-primary-soft  bg-primary-hover
bg-success-soft  text-danger  bg-warning  …
ring-ring
```

…et **jamais** `bg-blue-500`, `text-gray-700`, `#4f46e5`, etc.

Chaque ton à teinte expose `DEFAULT`, `foreground`, `soft`, `hover`. Le preset ajoute aussi les
rayons (`rounded-sm/md/lg/xl`), ombres (`shadow-sm/md/soft/strong`), espacements (`bk-xs`…
`bk-xl`), tailles de police (`text-bk-xs`… `text-bk-xl`), familles (`font-sans/mono/serif`) et
breakpoints.

## `theme.css`

Le fichier `packages/tokens/theme.css` est **généré** par `buildThemeStylesheet()`. Il contient
les variables sous trois blocs : `:root` (clair + tokens d'échelle), `.dark` (sombre), et un
fallback `@media (prefers-color-scheme: dark)`. Une app l'importe **une seule fois** à la
racine :

```ts
// apps/playground/src/main.tsx
import "@basekit/tokens/theme.css";
import "./styles.css";
```

Puis elle branche le preset dans Tailwind :

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
import { basekitPreset } from "@basekit/tokens/preset";

export default {
  presets: [basekitPreset as unknown as Config],
  content: ["./index.html", "./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
} satisfies Config;
```

## Clair / sombre

Le thème sombre s'active en ajoutant la classe `.dark` sur `document.documentElement` :

```ts
document.documentElement.classList.toggle("dark", isDark);
```

Comme tout résout vers `--bk-*`, aucun composant n'a besoin de variantes `dark:` : changer la
classe re-thématise toute l'application. Pour thématiser un sous-arbre uniquement, `themeStyle`
(`cssVariables.ts`) renvoie les variables prêtes pour un `style={...}`.

## Ajouter un token

1. Éditer `packages/tokens/src/colors.ts` (ajouter le rôle dans `ColorToken` de `types.ts` s'il
   est nouveau, puis fournir sa valeur dans `lightColors` **et** `darkColors`).
2. Si le token doit devenir une classe Tailwind, l'ajouter dans `tailwindPreset.ts`.
3. Régénérer la feuille de variables :

```bash
pnpm gen:css
```

Cette commande relance `buildThemeStylesheet()` et réécrit `packages/tokens/theme.css`. Ne
modifiez jamais `theme.css` à la main : il porte l'en-tête « Generated … Do not edit ».

## Interdiction des couleurs arbitraires

C'est la règle structurante du design system : **aucune couleur brute hors de
`@basekit/tokens`**. Pas de `bg-blue-500`, pas de `#hex`, pas de `rgb(...)` dans les composants
ou les pages. Tout passe par un rôle sémantique. Cela garantit la cohérence visuelle et permet
le re-thème global (clair/sombre/personnalisé) sans toucher au code.
