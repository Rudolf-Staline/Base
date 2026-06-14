# Conventions

Ces règles maintiennent BaseKit cohérent, re-thématisable et facile à étendre. Elles sont
volontairement strictes : c'est ce qui permet aux ~65 composants de se comporter de façon
prévisible.

## 1. Pas de logique métier dans l'UI

`@basekit/ui` et `@basekit/api` sont **génériques**. Un composant ne connaît ni vos entités, ni
vos endpoints, ni vos règles. Le client HTTP sait attacher un token et sérialiser du JSON, pas
ce qu'est une « opération validée ». La logique métier vit dans les apps (et passe aux pages via
`services` / `data` / `actions`).

## 2. Pas de Tailwind brut ni de couleurs arbitraires dans les pages

- Interdit : `bg-blue-500`, `text-gray-700`, `#4f46e5`, `style={{ color: "red" }}`.
- Autorisé : les classes sémantiques du preset (`bg-surface`, `text-muted-foreground`,
  `border-border`, `bg-primary-soft`…).

Idéalement, une page se compose **uniquement** de composants BaseKit (`Stack`, `Grid`, `Card`,
`MetricCard`, `DataTable`…) et ne contient pas de `className` Tailwind ad hoc. Quand un style
custom est inévitable dans un composant, il n'utilise que des classes sémantiques.

## 3. Les couleurs passent par les tokens

Toute couleur est un rôle (`primary`, `surface`, `danger`…) résolu en variable `--bk-*`. Voir
[`tokens.md`](tokens.md). C'est ce qui rend le thème clair/sombre gratuit et global.

## 4. Composants petits et focalisés

Un composant fait une chose. Les gros assemblages se construisent par composition (`Card` +
`CardHeader` + `CardContent`, `Stack` de `MetricCard`, etc.). Préférez plusieurs petits
composants à un composant à 30 props.

## 5. Types exportés

Pour chaque composant, exporter ses props (`XProps`). Les types de données publics
(`SelectOption`, `DataTableColumn`, `TabItem`, `SidebarNavItem`…) sont exportés depuis
`@basekit/ui`. Cela permet aux apps de typer leurs usages déclaratifs et React de la même façon.

## 6. Tests pour les composants critiques

Les composants à logique (formulaires, `DataTable`, renderer, page runtime, client API) doivent
être testés. Lancer :

```bash
pnpm test         # une passe
pnpm test:watch   # mode watch
```

Le rendu déclaratif est un bon candidat aux tests : un `UINode` est un objet simple à inspecter,
et `renderNode` est déterministe.

## 7. Accessibilité minimale

- Les boutons icône (`IconButton`) **exigent** un `aria-label` (typé obligatoire).
- Les champs (`Input`, `Select`, `Textarea`) câblent `label`, `aria-invalid`,
  `aria-describedby` et un `id` (généré si absent).
- `Modal`/`Drawer` gèrent `Escape` et le focus ; `Tabs`/`Accordion`/`Dropdown` posent les
  rôles ARIA (`tablist`, `menu`…).
- Conserver ces garanties en ajoutant un composant : focus visible (`focus-visible:ring-ring`),
  rôles, labels.

## 8. Nommage et organisation des fichiers

- **Trois exports par composant** : `XView` (React), `X` (fabrique `createComponent`),
  `XProps` (types).
- **Dossiers par catégorie** dans `packages/ui/src/` : `primitives/`, `layout/`,
  `composition/`, `navigation/`, `feedback/`, `data/`, `form/`.
- Un fichier peut regrouper plusieurs composants proches (`primitives/Misc.tsx` :
  `Badge`/`Link`/`Avatar`/`Divider`/`Kbd`/`Spinner`).
- La clé du registry, le nom passé à `createComponent` et le préfixe des exports sont **le même
  mot** (`"Button"` → `Button` / `ButtonView` / `ButtonProps`).

## Ajouter un composant (procédure)

1. **Créer la vue React** dans le bon dossier, en n'utilisant que des classes sémantiques de
   tokens et le vocabulaire partagé (`Tone`, `Variant`, `Size`…) :

   ```tsx
   // packages/ui/src/data/Stat.tsx
   import { cn, createComponent } from "@basekit/core";
   import type { Tone } from "@basekit/tokens";
   import { textToneStyles } from "../internal";

   export type StatProps = { label: string; value: string; tone?: Tone };

   export const StatView = ({ label, value, tone = "neutral" }: StatProps) => (
     <div className="rounded-lg border border-border bg-surface p-4">
       <p className="text-bk-sm text-muted-foreground">{label}</p>
       <p className={cn("text-xl font-semibold", textToneStyles[tone])}>{value}</p>
     </div>
   );

   // 2. La fabrique déclarative (même nom)
   export const Stat = createComponent<StatProps>("Stat");
   ```

2. **Enregistrer la vue** dans le registry par défaut, sous sa clé :

   ```tsx
   // packages/ui/src/registry.tsx
   import { StatView } from "./data/Stat";
   // …
   const registryApi = createRegistry({
     // …
     Stat: c(StatView),
   });
   ```

3. **Exporter les trois formes** depuis le point d'entrée :

   ```tsx
   // packages/ui/src/index.tsx
   export { StatView, Stat } from "./data/Stat";
   export type { StatProps } from "./data/Stat";
   ```

4. **Ajouter une démo** dans le playground (`apps/playground/src/pages/ShowcasePages.tsx`) pour
   le rendre visible et vérifiable en clair et en sombre.

Une fois ces quatre étapes faites, le composant est utilisable en JSX (`<StatView />`) **et** en
déclaratif (`Stat({ label, value })`), et rendu correctement par `RenderNode`.
