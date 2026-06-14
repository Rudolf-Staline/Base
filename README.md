# BaseKit

BaseKit est une bibliothèque générique de composants UI, de tokens de design system et de moteur déclaratif React. Elle fournit des primitives composables pour construire des interfaces produit sans embarquer de domaine métier.

> Règle : **BaseKit ne contient aucun composant métier. Les projets consommateurs créent leurs objets métier eux-mêmes à partir des composants génériques.**

## Vision

- composants React accessibles et stylables ;
- factories déclaratives rendues par `RenderNode` ;
- registry extensible ;
- tokens partagés : couleurs, typographie, spacing, radius, shadows et thèmes clair/sombre ;
- playground vitrine, organisé par familles de composants.

## Installation

Monorepo pnpm (Node 22, pnpm 9). À la racine :

```bash
pnpm install
```

## Commandes

```bash
pnpm dev          # lance le playground (vitrine des composants)
pnpm dev:docs     # lance l'app docs
pnpm typecheck    # tsc -b sur les packages + apps
pnpm test         # vitest run
pnpm lint         # eslint
pnpm build        # build des packages puis des apps
pnpm gen:css      # régénère packages/tokens/theme.css
```

## Publication

Les packages publiables (`@basekit/tokens`, `@basekit/core`, `@basekit/ui`, `@basekit/api`)
sont versionnés en lockstep via [Changesets](.changeset/README.md) :

```bash
pnpm changeset   # décrire un changement (patch/minor/major)
pnpm version     # appliquer les changesets en attente (bump + changelog)
pnpm release     # build des packages puis publish
```

En CI, `.github/workflows/release.yml` ouvre une PR « Version Packages » et publie au merge
sur `main`. Cible : **npm public, scope `@basekit`**. Runbook complet (setup org/token,
prerelease pour consommer en avance) dans [`docs/publishing.md`](docs/publishing.md).

## Consommer BaseKit dans une app

Une fois publié, voir le starter [`packages/templates/react-vite`](packages/templates/README.md) :
`pnpm add @basekit/ui @basekit/core @basekit/tokens @basekit/api`, brancher `basekitPreset`
dans Tailwind et importer `@basekit/tokens/theme.css`.

## Composants réellement disponibles

- **Actions** : Button, IconButton, ButtonGroup, Toggle, ToggleGroup.
- **Inputs** : Input, TextInput, NumberInput, PasswordInput, SearchInput, EmailInput, PhoneInput, UrlInput, Textarea, DateInput, DateTimeInput, Calendar, DatePicker, TimePicker, FileInput, Dropzone.
- **Sélection** : Radio, RadioGroup, Checkbox, CheckboxGroup, Switch, Select, MultiSelect, Combobox, Autocomplete.
- **Sliders** : Slider, RangeSlider.
- **Formulaires** : Form, FormField, FieldLabel, FieldHint, FieldError, FormSection, FormActions, FilterBar.
- **Composition / overlays** : Card, CardHeader, CardContent, CardFooter, Modal, Drawer, Dropdown, Tabs, Accordion, Tooltip, Popover.
- **Navigation** : Breadcrumb, Pagination.
- **Feedback** : Alert, Callout, Toast, Skeleton, Spinner, Progress, EmptyState, ErrorState.
- **Data display** : Table, DataTable, MetricCard, StatBlock, DescriptionList, Timeline, List, Badge, Avatar, Link, Divider, Kbd.
- **Layout** : AppShell, Sidebar, Topbar, PageHeader, Page, DashboardLayout, Container, Stack, Inline, Grid, Section, ScrollArea, SplitPane.

## Usage React

```tsx
import { ButtonView, TextInputView } from "@basekit/ui";

<ButtonView tone="primary">Valider</ButtonView>
<TextInputView label="Utilisateur" placeholder="Nom" />
```

## Usage déclaratif

```ts
import { Button, DatePicker, EmailInput, Page, RadioGroup, Stack, TextInput } from "@basekit/ui";

Page({
  title: "Formulaire",
  content: Stack({
    gap: "md",
    children: [
      TextInput({ label: "Utilisateur", placeholder: "Nom" }),
      EmailInput({ label: "Email", placeholder: "nom@example.com" }),
      RadioGroup({ label: "Type", options: [{ label: "Option A", value: "a" }, { label: "Option B", value: "b" }] }),
      DatePicker({ label: "Date" }),
      Button({ text: "Valider", tone: "primary" }),
    ],
  }),
});
```

## Registry

`defaultRegistry` associe les clés déclaratives aux vues React. `RenderNode` rend les arbres `UINode`. Ajoutez un composant en exportant `XView`, `X`, `XProps`, puis en l'inscrivant dans `packages/ui/src/registry.tsx`.

## Tokens

`@basekit/tokens` est la source unique de vérité visuelle : couleurs sémantiques (`primary`, `surface`, `danger`…), typographie, spacing, radius, shadows. Les composants ne parlent qu'en rôles ; aucune couleur brute n'existe en dehors de ce package. Le thème sombre s'active via la classe `.dark` sur `document.documentElement`. Détails dans [`docs/tokens.md`](docs/tokens.md).

## Playground

`pnpm dev` lance la vitrine : une page par famille de composants (Foundations, Actions, Inputs, Selection, Date & Calendar, Overlays, Navigation, Data Display, Feedback, Forms, Layout), en thème clair et sombre. Les données restent neutres.

## Documentation

- [`docs/components.md`](docs/components.md) — catalogue des composants (usage React + déclaratif).
- [`docs/architecture.md`](docs/architecture.md) — monorepo, core déclaratif, renderer, registry.
- [`docs/page-builder.md`](docs/page-builder.md) — pages déclaratives (`createPage`, `usePageRuntime`).
- [`docs/tokens.md`](docs/tokens.md) — design tokens et thèmes.
- [`docs/conventions.md`](docs/conventions.md) — règles d'ajout de composants.
- [`docs/publishing.md`](docs/publishing.md) — versioning Changesets et publication npm.
- [`docs/roadmap.md`](docs/roadmap.md) — ce qui reste à faire et les limites connues.

## Roadmap

Les composants non prêts ne sont pas listés comme disponibles. Consultez [`docs/roadmap.md`](docs/roadmap.md) pour les prochains composants prévus et les limites connues des versions minimales.

## Conventions

- ne pas introduire d'exemple métier ;
- utiliser des données neutres (`Item A`, `Option A`, `Utilisateur`, `Projet`, `Statut`, `Quantité`) ;
- conserver les tokens, le core déclaratif, le renderer et le registry ;
- documenter honnêtement les limites des composants simples.
