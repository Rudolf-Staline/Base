# BaseKit

> Un design system TypeScript, un page builder déclaratif et un renderer React — le tout dans un monorepo.

BaseKit est une boîte à outils pour construire des applications internes denses (dashboards,
back-offices, outils métier) rapidement et de façon cohérente. Chaque composant existe sous
deux formes : un composant React classique (JSX) **et** une fabrique déclarative qui produit
un arbre de nœuds (`UINode`) rendu par un renderer maison. Le style passe exclusivement par
des **tokens** : aucune couleur brute (`bg-blue-500`) n'apparaît jamais dans une page.

## Vision

- **Un vocabulaire visuel unique.** `tone`, `variant`, `size`, `radius`, `shadow` : les mêmes
  mots partout, sur tous les composants.
- **Thématisation globale.** Les couleurs sont des rôles sémantiques (`primary`, `surface`,
  `border`…) résolus en variables CSS `--bk-*`. Light et dark sans toucher au code composant.
- **Pages déclaratives.** Une page = une fonction pure `state → UINode`. L'état, les actions
  et le chargement de données sont gérés par le runtime.
- **Pas de logique métier dans l'UI.** Les composants et le client HTTP sont génériques ;
  le métier vit dans les apps.

## Installation

```bash
pnpm install      # installe tout le monorepo
pnpm dev          # lance le playground (apps/playground) sur http://localhost:5173
```

> Pré-requis : Node 18+ et `pnpm` (le projet épingle `pnpm@9.15.0`).

## Commandes

| Commande          | Effet                                                   |
| ----------------- | ------------------------------------------------------- |
| `pnpm install`    | Installe les dépendances de tout le workspace           |
| `pnpm dev`        | Lance le playground (Vite, `@basekit/playground`)       |
| `pnpm dev:docs`   | Lance l'app docs (`@basekit/docs`)                      |
| `pnpm build`      | Build les packages (`tsc -b`) puis les apps             |
| `pnpm typecheck`  | Vérifie les types des packages et des apps              |
| `pnpm test`       | Lance les tests une fois (Vitest)                       |
| `pnpm test:watch` | Tests en mode watch                                     |
| `pnpm lint`       | ESLint sur tout le repo                                 |
| `pnpm format`     | Prettier (écriture) sur `**/*.{ts,tsx,md,json}`         |
| `pnpm clean`      | Nettoie `dist`, build infos et `node_modules`           |
| `pnpm gen:css`    | Régénère `packages/tokens/theme.css` depuis `colors.ts` |

## Architecture

```
Base/
├─ packages/
│  ├─ tokens/   @basekit/tokens   couleurs, tailles, preset Tailwind, theme.css
│  ├─ core/     @basekit/core     modèle de nœuds, factory, renderer, page builder, utils
│  ├─ ui/       @basekit/ui       ~50 composants (View + factory + props) + registry
│  ├─ api/      @basekit/api      client HTTP générique typé + mock
│  └─ config/   @basekit/config   config TS/ESLint partagée (privé)
└─ apps/
   ├─ playground/  @basekit/playground  démos de tous les composants + pages
   └─ docs/        @basekit/docs        site de documentation
```

Les packages se compilent avec les **project references** TypeScript (`tsc -b`). En dev, les
apps utilisent Vite avec des **alias** qui pointent `@basekit/*` directement sur les sources :
aucun build intermédiaire nécessaire pendant le développement.

## Packages

| Package           | Rôle                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `@basekit/tokens` | Source unique de vérité visuelle : valeurs TS, variables CSS, preset Tailwind                                                              |
| `@basekit/core`   | Moteur déclaratif : `UINode`, `createComponent`, `createRegistry`, `renderNode`, `createPage`, `usePageRuntime`, utils (`cn`, `variants`…) |
| `@basekit/ui`     | Bibliothèque de composants + `defaultRegistry` + `RenderNode`                                                                              |
| `@basekit/api`    | `createApiClient`, `createMockClient`, `ApiError`                                                                                          |
| `@basekit/config` | Configuration partagée (privée, non publiée)                                                                                               |

## Deux façons d'utiliser un composant

Chaque composant est exporté **trois fois** : `XView` (React/JSX), `X` (fabrique déclarative),
`XProps` (types). Exemple avec `Button` :

```tsx
import { ButtonView, Button } from "@basekit/ui";

// 1. React (JSX)
<ButtonView tone="primary" onClick={save}>
  Enregistrer
</ButtonView>;

// 2. Déclaratif (produit un UINode)
const node = Button({ text: "Enregistrer", tone: "primary", onClick: save });
```

Pour afficher un arbre déclaratif, on le passe à `RenderNode` :

```tsx
import { RenderNode, Stack, Button } from "@basekit/ui";

const tree = Stack({
  gap: "md",
  children: [
    Button({ text: "Annuler", variant: "ghost" }),
    Button({ text: "Valider", tone: "primary" }),
  ],
});

<RenderNode node={tree} />;
```

`RenderNode` utilise le `defaultRegistry` (qui mappe chaque nom — `"Button"`, `"Stack"`… — à
son `XView`). Un composant inconnu n'explose pas : il rend un marqueur visible.

## Créer une page

Une page combine `createPage` (définition typée) et `usePageRuntime` (exécution). Le `view`
est une fonction pure qui reçoit `state`, `actions`, `data` et retourne un arbre déclaratif.
Exemple réel (`apps/playground/src/pages/OperationsPage.tsx`) :

```tsx
import { createPage, usePageRuntime } from "@basekit/core";
import {
  Button,
  DataTable,
  DateInput,
  FilterBar,
  Grid,
  MetricCard,
  Page,
  RenderNode,
  Stack,
} from "@basekit/ui";

type State = { startDate: string; endDate: string };
type Actions = { setStartDate: (v: string) => void; resetFilters: () => void };
type Data = { operations: Operation[] };

const operationsPage = createPage<State, Actions, Data>({
  id: "operations.validated",
  layout: "dashboard",
  title: "Opérations validées",
  state: { startDate: "", endDate: "" },
  data: () => ({ operations }),
  actions: ({ setState }) => ({
    setStartDate: (startDate) => setState({ startDate }),
    resetFilters: () => setState({ startDate: "", endDate: "" }),
  }),
  view: ({ state, actions, data }) =>
    Page({
      title: "Opérations validées",
      content: Stack({
        gap: "lg",
        children: [
          FilterBar({
            title: "Filtrer par période",
            fields: [
              DateInput({
                id: "startDate",
                label: "Date de début",
                value: state.startDate,
                onValueChange: actions.setStartDate,
                clearable: true,
              }),
            ],
            actions: [
              Button({
                text: "Réinitialiser",
                tone: "neutral",
                variant: "soft",
                onClick: actions.resetFilters,
              }),
            ],
          }),
          Grid({
            columns: 3,
            children: [
              MetricCard({
                label: "Lignes",
                value: data.operations.length,
                tone: "primary",
              }),
            ],
          }),
          DataTable<Operation>({
            rows: data.operations,
            columns: operationColumns,
            rowKey: "id",
            striped: true,
          }),
        ],
      }),
    }),
});

export const OperationsPage = () => {
  const { node } = usePageRuntime(operationsPage);
  return <RenderNode node={node} />;
};
```

Détails complets : [`docs/page-builder.md`](docs/page-builder.md).

## Créer un composant

Un composant BaseKit suit toujours le même patron (voir [`docs/conventions.md`](docs/conventions.md)) :

```tsx
// 1. La vue React
export type StatProps = { label: string; value: string; tone?: Tone };
export const StatView = ({ label, value, tone = "neutral" }: StatProps) => (
  <div className="rounded-md bg-surface p-4">
    <p className="text-bk-sm text-muted-foreground">{label}</p>
    <p className="text-xl font-semibold text-foreground">{value}</p>
  </div>
);

// 2. La fabrique déclarative
export const Stat = createComponent<StatProps>("Stat");
```

Puis on enregistre `StatView` sous la clé `"Stat"` dans `packages/ui/src/registry.tsx` et on
exporte le tout depuis `packages/ui/src/index.tsx`.

## Tokens

Les composants ne référencent jamais une couleur brute, seulement des **classes sémantiques**
fournies par le preset Tailwind `basekitPreset` : `bg-surface`, `text-muted-foreground`,
`border-border`, `bg-primary-soft`… Ces classes résolvent vers des variables `--bk-*`.

Une app doit :

1. importer une fois `@basekit/tokens/theme.css` (les variables) ;
2. ajouter le preset à sa config Tailwind :

```ts
import { basekitPreset } from "@basekit/tokens/preset";
export default {
  presets: [basekitPreset],
  content: [
    /* … */
  ],
};
```

Le thème sombre s'active en ajoutant la classe `.dark` sur `document.documentElement`. Pour
ajouter un token, on édite `packages/tokens/src/colors.ts` puis on lance `pnpm gen:css`.
Voir [`docs/tokens.md`](docs/tokens.md).

## Couche API

```ts
import { createApiClient } from "@basekit/api";

const api = createApiClient({
  baseUrl: "https://api.exemple.fr",
  getToken: () => localStorage.getItem("token"),
});

const me = await api.get<User>("/me");
await api.post<User>("/users", { name: "Ada" });
```

Les erreurs non-2xx, timeouts et pannes réseau lèvent un `ApiError` (`status`, `payload`,
`url`, `isNetworkError`). `createMockClient(routes)` fournit un client en mémoire pour les
démos et tests. Voir [`docs/api-layer.md`](docs/api-layer.md).

## Playground

`pnpm dev` lance `apps/playground` : une vitrine de tous les composants, des layouts
(dashboard, formulaire, reader), de la page déclarative (`OperationsPage`) et d'une démo API.
C'est le meilleur endroit pour voir le système en action et la bascule clair/sombre.

## Conventions

- Pas de logique métier dans `@basekit/ui` ni `@basekit/api`.
- Pas de Tailwind brut ni de couleurs arbitraires dans les pages : tout passe par les tokens.
- Composants petits et focalisés, types exportés, tests sur les composants critiques.
- Nommage : `XView` / `X` / `XProps`, regroupés par catégorie (`primitives/`, `layout/`,
  `composition/`, `feedback/`, `data/`, `form/`).

Détails : [`docs/conventions.md`](docs/conventions.md).

## Limites actuelles (V1)

- Pas de Storybook (le playground tient ce rôle).
- Validation de formulaire minimale (pas de schéma intégré).
- `DataTable` non virtualisée (rendu de toutes les lignes).
- Un seul renderer (React) — le modèle `UINode` est prévu pour en accueillir d'autres.
- Packages non publiés sur un registre (consommés via le workspace).

## Prochaines étapes

Voir [`docs/roadmap.md`](docs/roadmap.md) : validation de formulaire enrichie, `DataTable`
virtualisée, `CommandPalette`, renderers additionnels, publication des packages, tests de
régression visuelle.

## Documentation

- [Architecture](docs/architecture.md)
- [Composants](docs/components.md)
- [Page builder](docs/page-builder.md)
- [Tokens](docs/tokens.md)
- [Couche API](docs/api-layer.md)
- [Conventions](docs/conventions.md)
- [Roadmap](docs/roadmap.md)
