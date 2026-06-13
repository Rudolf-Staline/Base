# Page builder

Le page builder de `@basekit/core` permet de décrire une page entière comme une **fonction
pure** de son état, exécutée par un runtime React. La définition (`createPage`) est typée et
inerte ; `usePageRuntime` lui donne vie (état, actions, données) ; le résultat est un arbre
`UINode` rendu par `RenderNode`.

```
createPage(def)  →  usePageRuntime(def, { services })  →  { node, context }  →  <RenderNode node={node} />
```

## `createPage`

`createPage<State, Actions, Data, Services>(definition)` est un helper d'identité typé : il
renvoie la définition telle quelle mais fixe les génériques pour que `view`, `actions` et
`data` soient entièrement inférés.

```ts
const page = createPage<State, Actions, Data>({
  id,           // identifiant unique de la page
  layout,       // "default" | "dashboard" | "auth" | "reader" | "settings" | "form"
  title,        // titre (optionnel)
  description,  // sous-titre (optionnel)
  meta,         // métadonnées libres (optionnel)
  state,        // état initial
  data,         // loader async/sync (optionnel)
  actions,      // fabrique de handlers (optionnel)
  guards,       // gardes d'accès (optionnel)
  view,         // fonction de rendu (obligatoire)
});
```

## Le shell `Page`

`Page` est un **nœud de structure** utilisé *à l'intérieur* du `view` pour disposer titre,
actions et contenu avec le chrome standard. `PageNodeProps` : `id`, `layout`, `title`,
`description`, `content`, `actions` (actions d'en-tête), `header`, `footer`.

```ts
Page({
  title: "Opérations validées",
  description: "Page construite par composition de nœuds déclaratifs.",
  content: Stack({ /* … */ }),
});
```

Variantes pré-réglées (même API, `layout` figé) : `DashboardPage`, `AuthPage`,
`SettingsPage`, `ReaderPage`, `FormPage`.

> Ne pas confondre `Page` (le nœud shell) avec `layout` (la prop de la définition) : `layout`
> décrit le gabarit de page côté runtime, `Page` est le nœud que `view` retourne.

## `layout`

`PageLayout` : `"default" | "dashboard" | "auth" | "reader" | "settings" | "form"`. Indique le
gabarit attendu pour la page.

## `state`

Objet d'état initial. Le runtime en est propriétaire ; on le lit dans `view` via `ctx.state`.

```ts
type State = { startDate: string; endDate: string };
// …
state: { startDate: "", endDate: "" },
```

## `actions`

Fabrique recevant `{ setState, getState, services }` et renvoyant l'objet d'actions. `setState`
applique un **patch** (objet partiel ou fonction `prev => partiel`).

```ts
type Actions = {
  setStartDate: (v: string) => void;
  resetFilters: () => void;
};

actions: ({ setState, getState, services }) => ({
  setStartDate: (startDate) => setState({ startDate }),
  resetFilters: () => setState({ startDate: "", endDate: "" }),
}),
```

## `data`

Loader **sync ou async** recevant `{ state, services }`. Relançable via `reload`. Pendant son
exécution, `loading` est `true` et toute exception remonte dans `error`.

```ts
// sync (démo)
data: () => ({ operations }),

// async (réel)
data: async ({ services }) => ({
  operations: await services.api.get<Operation[]>("/operations/validated"),
}),
```

## `view`

Fonction **pure** recevant le `PageContext` et retournant un `UIChild` (typiquement un nœud
`Page(...)`). Le contexte expose : `state`, `actions`, `data`, `loading`, `error`, `reload`.

```ts
view: ({ state, actions, data, loading, error, reload }) =>
  Page({ title: "…", content: /* arbre UINode */ }),
```

## `usePageRuntime`

```ts
const { node, context } = usePageRuntime(definition, { services });
```

Le hook :

1. initialise l'état depuis `definition.state` ;
2. construit des `actions` mémoïsées avec `{ setState, getState, services }` ;
3. exécute le loader `data` au montage (et à chaque `reload`), en gérant
   `loading` / `error` ;
4. calcule `node = definition.view(context)`.

On rend `node` avec `<RenderNode />`. `services` est l'injection de dépendances (typiquement un
client `@basekit/api`) disponible dans `data` et `actions`.

## Exemple complet (miroir de `OperationsPage`)

Reproduit `apps/playground/src/pages/OperationsPage.tsx`.

```tsx
import { createPage, usePageRuntime } from "@basekit/core";
import {
  Button,
  DataTable,
  DateInput,
  EmptyState,
  FilterBar,
  Grid,
  MetricCard,
  Page,
  RenderNode,
  Stack,
} from "@basekit/ui";
import {
  filterOperationsByDate,
  operationColumns,
  operations,
  type Operation,
} from "../data";

type State = { startDate: string; endDate: string };
type Actions = {
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  resetFilters: () => void;
};
type Data = { operations: Operation[] };

export const operationValidatedPage = createPage<State, Actions, Data>({
  id: "operations.validated",
  layout: "dashboard",
  title: "Opérations validées",
  state: { startDate: "", endDate: "" },
  // En vrai : data: async ({ services }) => ({ operations: await services.api.get("/operations/validated") })
  data: () => ({ operations }),
  actions: ({ setState }) => ({
    setStartDate: (startDate) => setState({ startDate }),
    setEndDate: (endDate) => setState({ endDate }),
    resetFilters: () => setState({ startDate: "", endDate: "" }),
  }),
  view: ({ state, actions, data }) => {
    const rows = filterOperationsByDate(data.operations ?? [], state);
    const totalIn = rows
      .filter((o) => o.type === "in")
      .reduce((s, o) => s + o.quantity, 0);
    const totalOut = rows
      .filter((o) => o.type === "out")
      .reduce((s, o) => s + o.quantity, 0);

    return Page({
      title: "Opérations validées",
      description: "Page construite par composition de nœuds déclaratifs.",
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
              DateInput({
                id: "endDate",
                label: "Date de fin",
                value: state.endDate,
                onValueChange: actions.setEndDate,
                clearable: true,
              }),
            ],
            actions: [
              Button({
                text: "Réinitialiser",
                iconLeft: "undo",
                tone: "neutral",
                variant: "soft",
                onClick: actions.resetFilters,
              }),
            ],
          }),
          Grid({
            columns: 3,
            children: [
              MetricCard({ label: "Entrées", value: totalIn, tone: "success", icon: "arrow-right" }),
              MetricCard({ label: "Sorties", value: totalOut, tone: "danger", icon: "arrow-right" }),
              MetricCard({ label: "Lignes", value: rows.length, tone: "primary" }),
            ],
          }),
          rows.length > 0
            ? DataTable<Operation>({
                rows,
                columns: operationColumns,
                rowKey: "id",
                striped: true,
                hoverable: true,
                emptyText: "Aucune opération validée trouvée pour cette période",
              })
            : EmptyState({
                title: "Aucune opération",
                description: "Aucune opération validée trouvée pour cette période.",
                icon: "search",
              }),
        ],
      }),
    });
  },
});

export const OperationsPage = () => {
  const { node } = usePageRuntime(operationValidatedPage);
  return <RenderNode node={node} />;
};
```

### Points à retenir

- La `view` est **pure** : elle dérive tout (totaux, lignes filtrées) depuis `state` et `data`,
  sans effet de bord.
- Les actions ne font que `setState` ; le runtime ré-exécute la `view`.
- Le branchement conditionnel (`DataTable` vs `EmptyState`) se fait directement dans l'arbre.
- Pour brancher une vraie source de données, remplacez `data: () => ({ operations })` par un
  loader async utilisant `services.api`, puis passez le client à `usePageRuntime(def, {
  services: { api } })`.
