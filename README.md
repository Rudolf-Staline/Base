# Basekit

Basekit est un socle frontend React/Vite/TypeScript pour démarrer des produits plus vite sans disperser la logique de design, de composition de pages et d'accès API.

## Vision du projet

La V1 fournit un monorepo importable dans de vrais projets : tokens centralisés, composants React typés, fonctions déclaratives créant des `UINode`, renderer React, layouts applicatifs, playground et client HTTP générique.

## Installation

```bash
pnpm install
pnpm dev
```

## Commandes

```bash
pnpm dev        # démarre apps/playground
pnpm build      # build tous les packages et apps
pnpm typecheck  # vérifie TypeScript partout
pnpm lint       # alias de vérification typée pour cette V1
pnpm clean      # supprime les artefacts générés
```

## Architecture

```txt
apps/
  playground/       Démo interactive réelle
  docs/             Documentation légère exécutable
packages/
  tokens/           Couleurs, tailles, espacements, radius, ombres, variantes et types
  core/             UINode, createNode, createComponent, createPage, renderNode
  ui/               Composants React + factories déclaratives + layouts
  api/              Client HTTP générique typé
  config/           Configuration partagée
examples/
  dashboard-demo/   Exemple de consommation dashboard
  form-demo/        Exemple de consommation formulaire
```

## Principes d’architecture

1. Les pages assemblent des composants.
2. Les composants ne contiennent pas de logique métier.
3. Les styles passent par les tokens.
4. Les couleurs arbitraires sont interdites.
5. Les composants doivent être composables.
6. Les composants interactifs exposent leurs événements.
7. Les composants de formulaire supportent `value` et `defaultValue`.
8. Les composants riches utilisent `children`, slots ou sous-composants.
9. Le renderer transforme les `UINode` en React.
10. Le design system doit rester modifiable globalement.

## Packages

- `@basekit/tokens` : source de vérité des couleurs, tailles, espacements, radius, ombres, variantes et types TypeScript.
- `@basekit/core` : primitives déclaratives (`UINode`, `UIChild`, `createNode`, `createComponent`, `normalizeChildren`, `createPage`, `renderNode`, `renderChildren`).
- `@basekit/ui` : composants React (`ButtonView`, `InputView`, `DataTableView`...) et fonctions déclaratives (`Button`, `Input`, `DataTable`...).
- `@basekit/api` : `createApiClient`, `ApiError`, méthodes `get`, `post`, `put`, `patch`, `delete`.
- `@basekit/config` : base de configuration partagée.

## Tokens

Les pages consommatrices doivent préférer :

```tsx
<ButtonView tone="primary" variant="solid" size="md" />
<Text tone="danger" value="Erreur" />
```

Les composants UI utilisent des variables `--bk-*` dérivées de `@basekit/tokens`. Les classes de couleurs arbitraires dans les pages sont à éviter ; si une couleur manque, elle doit être ajoutée aux tokens.

## Composants

Les composants exposent des props communes (`id`, `className`, `children`, `tone`, `variant`, `size`, `disabled`, `hidden`, `testId`) et des props métier d'interface :

- `Button` : texte, slots d'icône, loading, fullWidth, événements souris/focus/click.
- `Input` et `DateInput` : modes contrôlé/non contrôlé, `value`, `defaultValue`, aides, erreurs, slots, dates min/max.
- `Card` : composition React avec `Card.Header`, `Card.Content`, `Card.Footer`, `Card.Title`, `Card.Description`.
- `DataTable` : colonnes typées, `rowKey`, états loading/vide, lignes hover/striped/compactes.
- Layouts : `AppShell`, `DashboardLayout`, `AuthLayout`, `ReaderLayout`, `SettingsLayout`.

## Exemples React

```tsx
<Card.View variant="elevated">
  <Card.Header>
    <Card.Title>Statistiques</Card.Title>
    <Card.Description>Performance du modèle</Card.Description>
  </Card.Header>
  <Card.Content>
    <MetricCardView label="Accuracy" value="92.4%" tone="success" />
  </Card.Content>
  <Card.Footer>
    <ButtonView variant="ghost">Voir détail</ButtonView>
  </Card.Footer>
</Card.View>
```

## Exemples déclaratifs

```ts
const page = Page({
  id: "login",
  layout: "auth",
  title: "Connexion",
  content: Stack({
    gap: "md",
    children: [
      Text({ value: "Bienvenue", textVariant: "title", tone: "primary" }),
      Input({ id: "email", label: "Email", value: state.email, onValueChange: setEmail }),
      Button({ text: "Se connecter", tone: "primary", onClick: login }),
    ],
  }),
});
```

Rendu React :

```tsx
<RenderNode node={page} />
```

## Création d’une page

```ts
export const OperationValidatedPage = createPage({
  id: "operations.validated",
  layout: "dashboard",
  state: { startDate: "", endDate: "" },
  view: ({ state, actions, data }) =>
    Page({
      title: "Opérations validées",
      content: [
        FilterBar({
          title: "Filtrer par période",
          fields: [
            DateInput({ label: "Date de début", value: state.startDate, onValueChange: actions.setStartDate }),
            DateInput({ label: "Date de fin", value: state.endDate, onValueChange: actions.setEndDate }),
          ],
          actions: [Button({ text: "Réinitialiser", tone: "neutral", variant: "soft", onClick: actions.resetFilters })],
        }),
        DataTable({ rows: data.operations, columns: operationColumns, emptyText: "Aucune opération" }),
      ],
    }),
});
```

Le playground inclut Dashboard, Form, DataTable, OperationValidatedPage, ReaderLayout et variantes de composants.

## Couche API

```ts
import { createApiClient } from "@basekit/api";

const api = createApiClient({
  baseUrl: import.meta.env.VITE_API_URL,
  getToken: () => localStorage.getItem("token"),
  timeoutMs: 8000,
});

const user = await api.get<User>("/me");
```

Le package API est volontairement générique : aucune logique métier, headers configurables, token optionnel, timeout et réponses typées.

## Utiliser Basekit dans un autre projet

1. Publier ou référencer les packages `@basekit/*`.
2. Installer `@basekit/tokens`, `@basekit/core`, `@basekit/ui` et éventuellement `@basekit/api`.
3. Importer les styles Tailwind de l'application consommatrice et scanner `node_modules/@basekit/ui` si nécessaire.
4. Utiliser les composants React directement ou créer des pages déclaratives rendues par `RenderNode`.

## Comment ajouter un composant

1. Ajouter les props typées dans `packages/ui/src/index.tsx`.
2. Créer la vue React `NomView`.
3. Créer la factory déclarative avec `createComponent<NomProps>("Nom")`.
4. Enregistrer la vue dans `registry`.
5. Ajouter une démonstration dans `apps/playground`.
6. Lancer `pnpm typecheck`, `pnpm lint` et `pnpm build`.

## Règles de contribution

- Pas de logique métier dans les composants.
- Pas de couleurs arbitraires dans les pages.
- Préférer tokens, props déclaratives, slots et composition.
- Conserver les packages génériques et importables.
- Toute nouvelle API doit être typée et démontrée dans le playground.
