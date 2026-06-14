# Page builder

Le page builder de BaseKit décrit une page comme une **fonction pure d'un contexte** : état,
actions, données. Il vit dans `@basekit/core` et est réexporté par `@basekit/ui` pour un seul
import. Aucune logique métier n'est embarquée : l'état, les données et les services viennent de
l'app consommatrice.

Les exemples restent neutres : Item A, Option A, Utilisateur, Projet, Statut, Date, Quantité.

## Vue d'ensemble

```
createPage(definition)        // identité typée — ne s'exécute pas
        ▼
usePageRuntime(definition)    // possède l'état, construit les actions, charge les données
        ▼
{ node, context }             // node = definition.view(context), un arbre UINode
        ▼
<RenderNode node={node} />    // rendu React via le registry
```

## `createPage`

`createPage` ne fait que **fixer les génériques** `State` / `Actions` / `Data` / `Services`
pour que `view`, `actions` et `data` soient entièrement inférés. Il retourne la définition
inchangée.

```ts
import { createPage, Page, Stack, TextInput, Button } from "@basekit/ui";

type State = { name: string };
type Actions = { setName: (name: string) => void; submit: () => void };

export const profilePage = createPage<State, Actions>({
  id: "profile",
  layout: "form",
  title: "Profil",
  state: { name: "" },
  actions: ({ setState, getState, services }) => ({
    setName: (name) => setState({ name }),
    submit: () => console.log(getState().name),
  }),
  view: ({ state, actions }) =>
    Page({
      title: "Profil",
      content: Stack({
        gap: "md",
        children: [
          TextInput({ label: "Utilisateur", value: state.name, onValueChange: actions.setName }),
          Button({ text: "Valider", tone: "primary", onClick: actions.submit }),
        ],
      }),
    }),
});
```

## `usePageRuntime`

Hook qui exécute une définition :

1. initialise l'état depuis `definition.state` ;
2. fabrique des `actions` mémoïsées avec `{ setState, getState, services }` ;
3. lance le loader `data` (sync ou async) en exposant `loading` / `error` / `reload` ;
4. appelle `view(context)` et renvoie `{ node, context }`.

```tsx
import { usePageRuntime, RenderNode } from "@basekit/ui";

export const ProfileScreen = () => {
  const { node } = usePageRuntime(profilePage, { services: myServices });
  return <RenderNode node={node} />;
};
```

## La définition de page

`PageDefinition` (dans `@basekit/core`) :

| Champ | Rôle |
| --- | --- |
| `id` | Identifiant de la page. |
| `layout` | `default` \| `dashboard` \| `auth` \| `reader` \| `settings` \| `form`. |
| `title`, `description`, `meta` | Métadonnées. |
| `state` | État initial. |
| `data` | Loader optionnel `(ctx) => Promise<Data> \| Data`, rejouable via `reload`. |
| `actions` | Fabrique d'actions depuis `{ setState, getState, services }`. |
| `guards` | Gardes d'accès optionnelles évaluées avant rendu. |
| `view` | Fonction pure `(context) => UIChild`. |

Le `view` reçoit `{ state, actions, data, loading, error, reload }` et retourne un arbre
`UINode`. Comme il est pur, il est facile à tester : un `UINode` est un simple objet inspectable.

## Le shell `Page`

`Page` (et ses variantes `DashboardPage`, `AuthPage`, `SettingsPage`, `ReaderPage`, `FormPage`)
est un **nœud de mise en page** rendu par `PageView`. Il dispose le titre, les actions d'en-tête
et le contenu avec la chrome standard :

```ts
Page({
  title: "Tableau",
  actions: Button({ text: "Nouvel élément", tone: "primary" }),
  header: Breadcrumb({ items: [{ label: "Accueil", href: "/" }, { label: "Tableau", current: true }] }),
  content: Stack({ gap: "md", children: [/* … */] }),
});
```

`Page` est aussi enregistré dans le registry (`Page` → `PageView`), donc utilisable directement
dans un arbre déclaratif.

## Pourquoi ce découpage

- **`view` pur** : pas d'effets, pas d'I/O — du rendu déterministe, testable.
- **État/actions/données séparés** : la logique vit dans l'app (via `services`/`data`/`actions`),
  jamais dans les composants.
- **Renderer-agnostique** : `view` produit des `UINode`, pas du JSX ; un autre renderer pourrait
  consommer les mêmes arbres.
