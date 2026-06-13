# Basekit

Basekit est un socle frontend réutilisable pour applications React/Vite/TypeScript : design tokens, composants UI, construction déclarative de pages et couche API commune.

## Architecture

```txt
apps/playground   Démo interactive avec page opérations validées
apps/docs         Documentation légère des composants clés
packages/tokens   Couleurs, tailles, radius, thèmes clair/sombre, types
packages/core     Nœuds déclaratifs, createComponent, createPage, renderNode
packages/ui       Composants React + factories fonctionnelles
packages/api      Client HTTP générique
packages/config   Configuration partagée
packages/templates Emplacement pour futurs templates
examples          Notes et exemples de consommation
```

## Installation et lancement

```bash
pnpm install
pnpm dev
pnpm --filter @basekit/docs dev
pnpm build
pnpm typecheck
```

## Philosophie déclarative

Les composants UI exposent deux formes :

```ts
const node = Button({ text: "Enregistrer", tone: "primary", variant: "solid" });
```

et React classique :

```tsx
<ButtonView tone="danger" variant="soft">Supprimer</ButtonView>
```

Une page assemble des composants au lieu d'écrire beaucoup de HTML/CSS :

```ts
const page = Page({
  title: "Connexion",
  content: Stack({ children: [Input({ label: "Email" }), Button({ text: "Se connecter" })] }),
});
```

## Tokens

Les couleurs publiques passent par des tokens (`primary`, `danger`, `surface`, `textMuted`, etc.) et les variantes (`solid`, `soft`, `outline`, `ghost`). Les projets consommateurs doivent privilégier `tone`, `variant`, `size`, `background` plutôt que des classes arbitraires.

## Créer un composant

1. Définir des props typées dans `packages/ui/src/index.ts`.
2. Créer la vue React (`ButtonView`, `InputView`, etc.).
3. Exporter la factory déclarative avec `createComponent<Props>("Nom")`.
4. Ajouter la vue au `registry` pour que `RenderNode` sache rendre le nœud.

## Créer une page

Utilisez `createPage()` depuis `@basekit/core` avec `state`, `actions`, `data` et une fonction `view`. La démo `OperationValidatedPage` montre des filtres dates, un bouton reset, des métriques et un tableau sans HTML métier dispersé.

## API layer

```ts
import { createApiClient } from "@basekit/api";
const api = createApiClient({ baseUrl: import.meta.env.VITE_API_URL, getToken: () => authStore.getState().token, timeoutMs: 8000 });
const user = await api.get<User>("/me");
```

Le client fournit `get`, `post`, `put`, `patch`, `delete`, `ApiError`, baseUrl, token optionnel et timeout.

## V1

La V1 privilégie une architecture saine et extensible. Storybook n'est pas ajouté pour éviter l'usine à gaz ; `apps/docs` couvre les composants demandés de façon légère.
