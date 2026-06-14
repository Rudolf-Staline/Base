# Composants BaseKit

Cette page liste les composants publics effectivement exportés par `@basekit/ui` et raccordés
au registry déclaratif quand c'est pertinent. Chaque composant existe sous trois formes :
`XView` (React), `X` (fabrique déclarative pour `RenderNode`) et `XProps` (types).

## Catalogue

| Famille | Composants |
| --- | --- |
| Actions | Button, IconButton, ButtonGroup, Toggle, ToggleGroup |
| Inputs | Input, TextInput, NumberInput, PasswordInput, SearchInput, EmailInput, PhoneInput, UrlInput, Textarea, DateInput, DateTimeInput, Calendar, DatePicker, TimePicker, FileInput, Dropzone |
| Sélection | Radio, RadioGroup, Checkbox, CheckboxGroup, Switch, Select, MultiSelect, Combobox, Autocomplete |
| Sliders | Slider, RangeSlider |
| Formulaires | Form, FormField, FieldLabel, FieldHint, FieldError, FormSection, FormActions, FilterBar |
| Composition / overlays | Card (+ Header/Content/Footer), Modal, Drawer, Dropdown, Tabs, Accordion, Tooltip, Popover |
| Navigation | Breadcrumb, Pagination |
| Feedback | Alert, Callout, Toast, Skeleton, Spinner, Progress, EmptyState, ErrorState |
| Data display | Table (+ sous-composants), DataTable, MetricCard, StatBlock, DescriptionList, Timeline, List, Badge, Avatar, Link, Divider, Kbd |
| Layout | AppShell, Sidebar, Topbar, PageHeader, Page, Container, Stack, Inline, Grid, Section, ScrollArea, SplitPane |

## Usage en deux styles

Tout composant s'utilise en JSX (`XView`) **ou** en déclaratif (`X`, rendu par `RenderNode`) :

```tsx
import { ButtonView, Button, RenderNode } from "@basekit/ui";

// React
<ButtonView tone="primary" text="Valider" />;

// Déclaratif
<RenderNode node={Button({ tone: "primary", text: "Valider" })} />;
```

## Composants ajoutés en V1

### ButtonGroup

Regroupe des boutons, en ligne ou en colonne, éventuellement « attachés » (segmenté).
Les valeurs `size`/`variant`/`tone`/`disabled` posées sur le groupe sont transmises aux boutons
enfants qui ne les définissent pas.

```tsx
<ButtonGroupView attached variant="outline" aria-label="Alignement">
  <ButtonView text="Gauche" />
  <ButtonView text="Centre" />
  <ButtonView text="Droite" />
</ButtonGroupView>
```

Props : `orientation` (`horizontal` | `vertical`), `attached`, `size`, `variant`, `tone`,
`disabled`, `children`.

### Toggle

Bouton à deux états utilisant `aria-pressed`. Contrôlé (`pressed`) ou non (`defaultPressed`).

```tsx
<ToggleView text="Gras" defaultPressed onPressedChange={(p) => console.log(p)} />
```

Props : `pressed`, `defaultPressed`, `onPressedChange`, `text`, `icon`, `tone`, `variant`,
`size`, `disabled`.

### ToggleGroup

Groupe de toggles en sélection `single` ou `multiple`.

```tsx
<ToggleGroupView
  type="single"
  defaultValue="week"
  options={[
    { value: "day", label: "Jour" },
    { value: "week", label: "Semaine" },
  ]}
  onValueChange={(v) => console.log(v)}
/>
```

Props : `type`, `options`, `value`/`defaultValue` (single), `values`/`defaultValues`
(multiple), `orientation`, `disabled`, `onValueChange`, `onValuesChange`.

### Tooltip

Info-bulle révélée au survol et au focus, reliée par `aria-describedby`.

```tsx
<TooltipView content="Information" placement="top">
  <ButtonView text="Survoler" />
</TooltipView>
```

Props : `content`, `placement` (`top` | `right` | `bottom` | `left`), `delayMs`, `disabled`.
Limite : positionnement statique, sans moteur anti-collision.

### Popover

Trigger + panneau flottant. Ouverture contrôlée ou non, fermeture sur `Escape` et clic
extérieur. Panneau exposé comme `dialog`.

```tsx
<PopoverView title="Détails" trigger={<ButtonView text="Ouvrir" />}>
  Contenu générique.
</PopoverView>
```

Props : `trigger`, `open`/`defaultOpen`, `onOpenChange`, `placement`, `title`,
`closeOnInteractOutside`. Limite : positionnement statique.

### Pagination

```tsx
<PaginationView page={3} totalPages={10} showFirstLast onPageChange={(p) => console.log(p)} />
```

Props : `page`/`defaultPage`, `totalPages`, `onPageChange`, `siblingCount`, `boundaryCount`,
`showFirstLast`, `showPrevNext`, `disabled`. Affiche les ellipses automatiquement. `nav` porte
`aria-label`, la page courante porte `aria-current="page"`.

### Breadcrumb

```tsx
<BreadcrumbView
  items={[
    { label: "Accueil", href: "/" },
    { label: "Section", href: "/section" },
    { label: "Page courante", current: true },
  ]}
/>
```

Props : `items` (`{ label, href?, current? }[]`), `separator`, `onItemClick`. `nav` porte
`aria-label`, l'élément courant porte `aria-current="page"`.

### Table

Table de présentation pour contenu libre, distincte de `DataTable` (qui est pilotée par
données). Sous-composants : `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`,
`TableCaption`.

```tsx
<TableView striped>
  <TableCaptionView>Tableau générique</TableCaptionView>
  <TableHeaderView>
    <TableRowView>
      <TableHeadView>Nom</TableHeadView>
      <TableHeadView align="right">Quantité</TableHeadView>
    </TableRowView>
  </TableHeaderView>
  <TableBodyView>
    <TableRowView>
      <TableCellView>Item A</TableCellView>
      <TableCellView align="right">1</TableCellView>
    </TableRowView>
  </TableBodyView>
</TableView>
```

Props (`Table`) : `striped`, `compact`, `bordered`, `className`, `children`. Pour une table avec
colonnes typées, tri, états de chargement/vide et sélection, utiliser **`DataTable`**.

### DateTimeInput

Wrapper typé autour de `InputView type="datetime-local"`.

```tsx
<DateTimeInputView label="Date et heure" onValueChange={(v) => console.log(v)} />
```

Props : `value`/`defaultValue`, `minValue`, `maxValue`, `step`, `onValueChange`, `label`,
`error`, `helperText`, `disabled`, `required`.

## Notes sur des composants existants

- **Combobox / Autocomplete** : versions minimales honnêtes (input de recherche, filtrage local,
  sélection, `clear`, fermeture sur `Escape`, choix de la première option sur `Enter`, fermeture
  au clic extérieur). Les variantes avancées (navigation flèche-par-flèche, `aria-activedescendant`
  complet) sont en roadmap.
- **RangeSlider** : les deux poignées exposent des noms accessibles distincts (`… — minimum`,
  `… — maximum`) ; passez `minLabel`/`maxLabel` pour les personnaliser.
- **DatePicker** : expose `onOpenChange` ; le bouton « Effacer » n'ouvre pas le calendrier.
- **Dropzone** : activable au clavier (`Enter` / `Espace`) en plus du glisser-déposer.

## Règle de contenu

BaseKit reste une bibliothèque UI pure. Les exemples et fixtures restent neutres : Item A,
Item B, Option A, Option B, Utilisateur, Projet, Statut, Date, Quantité, Catégorie, Élément.
