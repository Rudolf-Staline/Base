# Architecture

BaseKit est un monorepo pnpm qui sépare strictement quatre préoccupations : **les tokens**
(le visuel), **le cœur déclaratif** (le modèle et le renderer), **les composants** (l'UI) et
**l'accès réseau** (l'API). Deux apps consomment ces packages.

## Vue d'ensemble du monorepo

```
Base/
├─ packages/
│  ├─ tokens/   @basekit/tokens
│  ├─ core/     @basekit/core
│  ├─ ui/       @basekit/ui
│  ├─ api/      @basekit/api
│  └─ config/   @basekit/config   (privé : config TS/ESLint partagée)
└─ apps/
   ├─ playground/  @basekit/playground
   └─ docs/        @basekit/docs
```

## Rôle de chaque package

### `@basekit/tokens`

La **source unique de vérité visuelle**. Il expose les tokens sous trois formes :

- des **valeurs TypeScript** (`lightColors`, `darkColors`, `radii`, `shadows`, `spacing`,
  `fontSizes`…) ;
- des **variables CSS** `--bk-*` via `buildThemeStylesheet()` (générées dans `theme.css`) ;
- un **preset Tailwind** `basekitPreset` qui transforme les tokens en utilitaires sémantiques
  (`bg-surface`, `text-muted-foreground`, `border-border`, `bg-primary-soft`…).

C'est le seul endroit où des couleurs brutes existent. Tout le reste ne parle qu'en rôles.

### `@basekit/core`

Le **moteur déclaratif**, indépendant de tout composant concret :

- **Modèle de nœuds** : `UINode`, `UIChild`, `createNode`, `normalizeChildren`, guards
  (`isUINode`).
- **Factory + registry** : `createComponent` (fabrique une fonction qui produit un `UINode`),
  `createRegistry` (associe un nom à une implémentation React).
- **Renderer** : `renderNode(node, registry)` et `renderChildren`.
- **Page builder** : `createPage`, le shell `Page` (+ variantes), `usePageRuntime`.
- **Utils** : `cn`, `variants`, `composeRefs`, `invariant`.

Le modèle est *renderer-agnostique* : un futur renderer non-React pourrait consommer les
mêmes arbres `UINode`.

### `@basekit/ui`

La **bibliothèque de composants** (~50). Pour chaque composant elle fournit `XView` (React),
`X` (fabrique via `createComponent`) et `XProps`. Elle assemble aussi le `defaultRegistry`
(nom → `XView`) et expose `RenderNode`, le composant React qui rend un arbre déclaratif.
Elle réexporte le page builder de `core` pour une ergonomie « un seul import ».

### `@basekit/api`

Un **client HTTP générique et typé**, sans logique métier : `createApiClient` (auth, query,
timeout, JSON, erreurs typées `ApiError`), `createMockClient` (client en mémoire pour démos
et tests), et les helpers `joinUrl` / `buildQueryString`.

### `@basekit/config`

Config TypeScript/ESLint partagée. Package privé, non publié.

## Séparation tokens / core / ui / api

Les dépendances vont dans un seul sens :

```
tokens ◄── ui ──► core
              │
api (indépendant)
```

- `core` ne dépend d'aucun composant : il ne connaît que des **noms** (chaînes) et un registry.
- `ui` dépend de `core` (pour `createComponent`/`renderNode`) et de `tokens` (pour les types
  `Tone`/`Variant`/… et les classes du preset).
- `api` est totalement indépendant.
- `tokens` ne dépend de rien.

Conséquence : la logique de rendu (`core`) et le catalogue visuel (`ui`) sont découplés du
visuel concret (`tokens`) et du réseau (`api`).

## Composants React, nœuds déclaratifs et renderer

Trois objets cohabitent pour un même composant. Prenons `Button` :

| Forme        | Quoi                                                      | Quand l'utiliser                          |
| ------------ | -------------------------------------------------------- | ----------------------------------------- |
| `ButtonView` | Composant React (`forwardRef`, JSX)                      | Dans du JSX classique                     |
| `Button`     | Fabrique `createComponent<ButtonProps>("Button")`        | Dans un arbre déclaratif (`UINode`)       |
| `ButtonProps`| Type des props                                           | Pour typer les deux usages                |

Un **`UINode`** est un objet sérialisable-ish :

```ts
interface UINode<Props> {
  readonly $$basekit: "node";
  readonly component: string;   // clé du registry, ex. "Button"
  readonly props: Props;
  readonly children: UIChild[];
  readonly key?: string | number;
}
```

`Button({ text: "Ok" })` ne rend rien : il produit `{ $$basekit: "node", component: "Button",
props: { text: "Ok" }, children: [] }`. Le **renderer** transforme ce nœud en React :

```ts
renderNode(node, registry);
```

- texte (string/number) → rendu tel quel ;
- valeurs vides (`null`/`undefined`/`false`/`true`) → ignorées ;
- tableau → fragment ;
- élément React valide → passe à travers (l'échappatoire JSX) ;
- `UINode` → on cherche `registry[node.component]` et on crée l'élément ;
- composant inconnu → un marqueur visible (`⚠ Unknown component`) plutôt qu'un crash.

`RenderNode` (`@basekit/ui`) est le wrapper React qui utilise le `defaultRegistry` par défaut :

```tsx
<RenderNode node={Button({ text: "Ok", tone: "primary" })} />
```

## Flux de création d'une page

```
createPage<State, Actions, Data>({ id, layout, title, state, data, actions, view })
        │  (definition pure, typée — ne s'exécute pas)
        ▼
usePageRuntime(definition, { services })
        │  possède l'état, construit les actions, lance le loader data
        ▼
{ node, context }       node = definition.view(context)
        ▼
<RenderNode node={node} />
```

`usePageRuntime` :

1. initialise l'état depuis `definition.state` ;
2. fabrique des `actions` mémoïsées avec `{ setState, getState, services }` ;
3. exécute le loader `data` (sync ou async) avec `loading` / `error` / `reload` ;
4. appelle `view(context)` pour obtenir l'arbre `UINode`.

## Flux de rendu

```
UINode (arbre)
   └─ renderNode(node, registry)
        ├─ lookup registry["Stack"] → StackView
        ├─ renderChildren(node.children, registry)  ← récursif, clés stables
        └─ createElement(StackView, props, ...enfants rendus)
   → ReactNode
```

Le `defaultRegistry` est peuplé dans `packages/ui/src/registry.tsx` : chaque entrée mappe un
nom de composant (`"Stack"`, `"Button"`…) à son `XView`. Ajouter un composant au système =
ajouter son `XView` ici.

## Setup TypeScript

### Project references (build)

Chaque package est `composite: true` et se compile vers `dist/` via `tsc -b`. Le `tsconfig.json`
racine n'a pas de fichiers propres, seulement des références :

```jsonc
// tsconfig.json (racine)
{
  "files": [],
  "references": [
    { "path": "packages/tokens" },
    { "path": "packages/core" },
    { "path": "packages/ui" },
    { "path": "packages/api" }
  ]
}
```

Chaque package déclare ses dépendances inter-packages dans ses propres `references`
(ex. `core` référence `tokens`). Les types inter-packages se résolvent via le champ `exports`
des `package.json` (`@basekit/tokens` expose `./dist/index.d.ts`, `./theme.css`, `./preset`).

### Vite aliases (dev)

En développement, les apps n'attendent **aucun** build des packages : Vite aliase chaque
`@basekit/*` directement sur les sources.

```ts
// apps/playground/vite.config.ts
resolve: {
  alias: {
    "@basekit/tokens/theme.css": pkg("tokens/theme.css"),
    "@basekit/tokens/preset": pkg("tokens/src/tailwindPreset.ts"),
    "@basekit/tokens": pkg("tokens/src/index.ts"),
    "@basekit/core": pkg("core/src/index.ts"),
    "@basekit/ui": pkg("ui/src/index.tsx"),
    "@basekit/api": pkg("api/src/index.ts"),
  },
}
```

Ainsi le playground tourne toujours contre le code source le plus récent, sans étape
intermédiaire. Le build de prod (`pnpm build`) compile lui les packages avant les apps.
