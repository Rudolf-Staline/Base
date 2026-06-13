# Composants

Tous les composants vivent dans `@basekit/ui` et suivent la même règle d'export : `XView`
(React/JSX), `X` (fabrique déclarative produisant un `UINode`) et `XProps` (types). Importez la
forme qui correspond à votre contexte :

```tsx
import { ButtonView, Button, type ButtonProps } from "@basekit/ui";

<ButtonView tone="primary">JSX</ButtonView>;          // React
const node = Button({ text: "Déclaratif", tone: "primary" }); // UINode
```

Le vocabulaire partagé (`@basekit/tokens`) : `Tone = neutral | primary | accent | success |
warning | danger`, `Variant = solid | soft | outline | ghost | link`, `Size = xs | sm | md |
lg | xl`, `Radius = none | sm | md | lg | xl | full`, `Shadow = none | sm | md | soft | strong`.

## Table récapitulative

| Composant         | Catégorie    | Exports                                                       |
| ----------------- | ------------ | ------------------------------------------------------------ |
| Button            | primitives   | `ButtonView` / `Button` / `ButtonProps`                      |
| IconButton        | primitives   | `IconButtonView` / `IconButton` / `IconButtonProps`          |
| Input             | primitives   | `InputView` / `Input` / `InputProps`                         |
| Textarea          | primitives   | `TextareaView` / `Textarea` / `TextareaProps`                |
| DateInput         | primitives   | `DateInputView` / `DateInput` / `DateInputProps`             |
| Select            | primitives   | `SelectView` / `Select` / `SelectProps`, `SelectOption`      |
| Checkbox          | primitives   | `CheckboxView` / `Checkbox` / `CheckboxProps`                |
| Switch            | primitives   | `SwitchView` / `Switch` / `SwitchProps`                      |
| Text              | primitives   | `TextView` / `Text` / `TextProps`                            |
| Heading           | primitives   | `HeadingView` / `Heading` / `HeadingProps`                   |
| Badge             | primitives   | `BadgeView` / `Badge` / `BadgeProps`                         |
| Link              | primitives   | `LinkView` / `Link` / `LinkProps`                            |
| Avatar            | primitives   | `AvatarView` / `Avatar` / `AvatarProps`                      |
| Divider           | primitives   | `DividerView` / `Divider` / `DividerProps`                   |
| Kbd               | primitives   | `KbdView` / `Kbd` / `KbdProps`                               |
| Spinner           | primitives   | `SpinnerView` / `Spinner` / `SpinnerProps`                   |
| Stack             | layout       | `StackView` / `Stack` / `StackProps`                         |
| Inline            | layout       | `InlineView` / `Inline` / `InlineProps`                      |
| Grid              | layout       | `GridView` / `Grid` / `GridProps`                            |
| Container         | layout       | `ContainerView` / `Container` / `ContainerProps`             |
| Section           | layout       | `SectionView` / `Section` / `SectionProps`                   |
| ScrollArea        | layout       | `ScrollAreaView` / `ScrollArea` / `ScrollAreaProps`          |
| SplitPane         | layout       | `SplitPaneView` / `SplitPane` / `SplitPaneProps`             |
| AppShell          | layout       | `AppShellView` / `AppShell` / `AppShellProps`                |
| Sidebar           | layout       | `SidebarView` / `Sidebar` / `SidebarProps`, `SidebarNavItem` |
| Topbar            | layout       | `TopbarView` / `Topbar` / `TopbarProps`                      |
| PageHeader        | layout       | `PageHeaderView` / `PageHeader` / `PageHeaderProps`          |
| Page              | layout       | `PageView` / `Page` / `PageNodeProps` (shell de page)        |
| DashboardLayout   | layout       | `DashboardLayout` / `DashboardLayoutProps`                   |
| AuthLayout        | layout       | `AuthLayout` / `AuthLayoutProps`                             |
| ReaderLayout      | layout       | `ReaderLayout` / `ReaderLayoutProps`                         |
| SettingsLayout    | layout       | `SettingsLayout` / `SettingsLayoutProps`                     |
| FormLayout        | layout       | `FormLayout` / `FormLayoutProps`                             |
| Card              | composition  | `CardView` / `Card` (+ sous-composants) / `CardProps`        |
| Modal             | composition  | `ModalView` / `Modal` / `ModalProps`                         |
| Drawer            | composition  | `DrawerView` / `Drawer` / `DrawerProps`                      |
| Tabs              | composition  | `TabsView` / `Tabs` / `TabsProps`, `TabItem`                 |
| Accordion         | composition  | `AccordionView` / `Accordion` / `AccordionProps`, `AccordionItem` |
| Dropdown          | composition  | `DropdownView` / `Dropdown` / `DropdownProps`, `DropdownItem`|
| Alert             | feedback     | `AlertView` / `Alert` / `AlertProps`                         |
| Callout           | feedback     | `CalloutView` / `Callout` / `CalloutProps`                   |
| EmptyState        | feedback     | `EmptyStateView` / `EmptyState` / `EmptyStateProps`          |
| ErrorState        | feedback     | `ErrorStateView` / `ErrorState` / `ErrorStateProps`          |
| Skeleton          | feedback     | `SkeletonView` / `Skeleton` / `SkeletonProps`                |
| Progress          | feedback     | `ProgressView` / `Progress` / `ProgressProps`                |
| Toast             | feedback     | `ToastProvider`, `useToast`, `Toast`                         |
| DataTable         | data         | `DataTableView` / `DataTable` / `DataTableProps`, `DataTableColumn`, `Column` |
| MetricCard        | data         | `MetricCardView` / `MetricCard` / `MetricCardProps`          |
| StatBlock         | data         | `StatBlockView` / `StatBlock` / `StatBlockProps`             |
| List              | data         | `ListView` / `List` / `ListProps`, `ListItem`                |
| DescriptionList   | data         | `DescriptionListView` / `DescriptionList` / `DescriptionListProps` |
| Timeline          | data         | `TimelineView` / `Timeline` / `TimelineProps`, `TimelineItem`|
| Form              | form         | `FormView` / `Form` / `FormProps`                            |
| FormSection       | form         | `FormSectionView` / `FormSection` / `FormSectionProps`       |
| FormField         | form         | `FormFieldView` / `FormField` / `FormFieldProps`             |
| FormActions       | form         | `FormActionsView` / `FormActions` / `FormActionsProps`       |
| FilterBar         | form         | `FilterBarView` / `FilterBar` / `FilterBarProps`             |

---

## Primitives

### Button / IconButton

Props clés de `ButtonProps` : `text` ou `children`, `tone` (défaut `primary`), `variant`
(défaut `solid`), `size` (défaut `md`), `radius` (défaut `md`), `disabled`, `loading`,
`fullWidth`, `iconLeft`, `iconRight`, `onClick`. `IconButtonProps` impose `icon` et
`aria-label` (obligatoire pour l'accessibilité) ; ses défauts sont `tone="neutral"`,
`variant="ghost"`.

```tsx
<ButtonView tone="primary" iconLeft="check" loading={saving} onClick={save}>
  Enregistrer
</ButtonView>;

// Déclaratif
Button({ text: "Supprimer", tone: "danger", variant: "soft", onClick: remove });
IconButton({ icon: "close", "aria-label": "Fermer", onClick: close });
```

### Input / Textarea

`InputProps` : `label`, `type`, `value`, `placeholder`, `error`, `helperText`, `required`,
`disabled`, `leftSlot`, `rightSlot`, et surtout `onChangeValue` / `onValueChange` (handlers
value-first, l'ergonomie par défaut) en plus du `onChange` natif. `Textarea` reprend ces props
(sans slots ni `type`) et ajoute `rows`.

```tsx
<InputView
  label="E-mail"
  type="email"
  required
  value={email}
  onValueChange={setEmail}
  error={emailError}
/>;

Input({ id: "name", label: "Nom", value: name, onValueChange: setName });
```

### DateInput

`DateInputProps` étend `InputProps` (type `date` forcé) et ajoute `clearable` : affiche un
bouton d'effacement quand une valeur existe et que le champ est actif.

```tsx
DateInput({ id: "start", label: "Début", value, onValueChange: setValue, clearable: true });
```

### Select

`SelectProps` : `options: SelectOption[]` (`{ label, value, disabled? }`), `value`,
`placeholder`, `onValueChange`, plus le partage habituel (`label`, `error`, `helperText`,
`required`, `disabled`).

```tsx
<SelectView
  label="Statut"
  value={status}
  onValueChange={setStatus}
  options={[
    { label: "Ouvert", value: "open" },
    { label: "Fermé", value: "closed" },
  ]}
/>;
```

### Checkbox / Switch

`CheckboxProps` : `label`, `description`, `checked`, `onChange: (checked: boolean) => void`,
`disabled`, `required`. `SwitchProps` est identique sans `description`. Les deux émettent un
booléen, pas un événement.

```tsx
<CheckboxView label="Accepter les CGU" checked={ok} onChange={setOk} />;
<SwitchView label="Notifications" checked={on} onChange={setOn} />;
```

### Text / Heading

`TextProps` : `value` ou `children`, `as` (`p | span | div | label`), `textVariant`
(`display | title | heading | subtitle | body | label | caption | code`), `tone`, `align`,
`truncate`, `weight`. `HeadingProps` ajoute `level` (1–4) et choisit la balise `h1`–`h4`.

```tsx
<HeadingView level={1}>Tableau de bord</HeadingView>;
<TextView textVariant="caption" tone="neutral">Mis à jour il y a 2 min</TextView>;
Text({ value: "Texte déclaratif", textVariant: "body" });
```

### Badge

`BadgeProps` : `text` ou `children`, `tone` (défaut `neutral`), `variant`
(`soft | solid | outline`, défaut `soft`), `dot`, `iconLeft`.

```tsx
<BadgeView tone="success" variant="soft" dot>Actif</BadgeView>;
Badge({ text: "Brouillon", tone: "warning", variant: "outline" });
```

### Link / Avatar / Divider / Kbd / Spinner

- `Link` : `href`, `text`/`children`, `tone` (défaut `primary`), `external` (ouvre dans un
  nouvel onglet et ajoute une icône).
- `Avatar` : `src`, `name` (génère les initiales en l'absence d'image), `size`.
- `Divider` : `orientation` (`horizontal | vertical`), `label` optionnel.
- `Kbd` : `keys: string[]` (jointes par ` + `) ou `children`.
- `Spinner` : `size`, `tone`, `label`.

```tsx
<LinkView href="https://exemple.fr" external>Documentation</LinkView>;
<AvatarView name="Ada Lovelace" size="sm" />;
<KbdView keys={["Ctrl", "K"]} />;
```

---

## Layout

### Stack / Inline / Grid

- `Stack` (flex colonne) : `gap` (défaut `md`), `align`, `justify`, `padding`.
- `Inline` (flex ligne) : mêmes props + `wrap`.
- `Grid` : `columns` (`1 | 2 | 3 | 4 | 6 | 12`, responsive), `gap`, ou `minItemWidth` pour une
  grille auto-fit.

```tsx
Stack({
  gap: "lg",
  children: [Heading({ value: "Titre", level: 2 }), Text({ value: "Contenu" })],
});

Grid({ columns: 3, children: [/* … cartes … */] });
```

### Section

Bloc titré : `title`, `description`, `actions`, `children`.

```tsx
<SectionView title="Membres" actions={<ButtonView size="sm">Inviter</ButtonView>}>
  {/* … */}
</SectionView>;
```

Autres : `Container` (`size`), `ScrollArea` (`maxHeight`), `SplitPane`
(`primary`/`secondary`/`secondaryWidth`/`side`). Les shells (`AppShell`, `Sidebar`, `Topbar`,
`PageHeader`) et les layouts de page (`DashboardLayout`, `AuthLayout`, `ReaderLayout`,
`SettingsLayout`, `FormLayout`) composent une application complète — voir le playground.

---

## Composition

### Card (+ sous-composants)

`Card` combine une fabrique déclarative et des sous-composants React. `CardProps` : `variant`
(`plain | outlined | elevated`, défaut `outlined`), `tone`, `padding`, `radius`, `shadow`,
`border`, `interactive`/`onClick` (rend un `<button>`).

```tsx
// React : Card.View + sous-composants
<Card.View variant="elevated">
  <Card.Header title="Profil" description="Vos informations" />
  <Card.Content>…</Card.Content>
  <Card.Footer>
    <ButtonView tone="primary">Enregistrer</ButtonView>
  </Card.Footer>
</Card.View>;

// Déclaratif : Card + CardHeader / CardContent / CardFooter
Card({
  children: [
    CardHeader({ title: "Profil" }),
    CardContent({ children: Text({ value: "…" }) }),
  ],
});
```

`CardView` est un alias de `Card.View`. Sous-composants exportés : `CardHeader`,
`CardContent`, `CardFooter` (fabriques) et `CardHeaderView`, `CardContentView`,
`CardFooterView`, `CardTitleView`, `CardDescriptionView` (vues).

### Modal / Drawer

`ModalProps` : `open`, `onClose`, `title`, `description`, `footer`, `size`
(`sm | md | lg | xl`), `dismissable` (clic backdrop, défaut `true`). Fermeture sur `Escape`,
verrouillage du scroll, rendu via portail. `DrawerProps` reprend tout sauf `size` et ajoute le
positionnement latéral.

```tsx
<ModalView open={open} onClose={close} title="Confirmer" footer={<ButtonView tone="danger">Supprimer</ButtonView>}>
  Cette action est irréversible.
</ModalView>;
```

### Tabs / Accordion / Dropdown

- `Tabs` : `items: TabItem[]` (`{ id, label, icon?, content, disabled? }`), `value`/
  `defaultValue`, `onValueChange`.
- `Accordion` : `items: AccordionItem[]` (`{ id, title, content }`), `multiple`, `defaultOpen`.
- `Dropdown` : `trigger`, `items: DropdownItem[]` (`{ id, label, icon?, tone?, onSelect?,
  disabled? }`), `align`. Se ferme au clic extérieur et sur `Escape`.

```tsx
<TabsView
  items={[
    { id: "info", label: "Infos", content: <p>…</p> },
    { id: "perm", label: "Permissions", content: <p>…</p> },
  ]}
/>;

<DropdownView
  trigger={<IconButtonView icon="menu" aria-label="Actions" />}
  items={[{ id: "del", label: "Supprimer", tone: "danger", onSelect: remove }]}
/>;
```

---

## Feedback

### Alert / Callout

`AlertProps` : `title`, `children`, `tone` (défaut `primary`, choisit une icône par défaut),
`icon` (ou `false` pour aucune), `onClose` (ajoute un bouton de fermeture). `CalloutProps` est
plus discret (bordure latérale) : `title`, `tone`, `icon`.

```tsx
<AlertView tone="danger" title="Échec" onClose={dismiss}>
  Impossible d'enregistrer.
</AlertView>;
Callout({ tone: "warning", title: "Attention", children: Text({ value: "Vérifiez les dates." }) });
```

### EmptyState / ErrorState

`EmptyStateProps` : `title` (défaut « Aucune donnée »), `description`, `icon` (défaut
`search`), `action`. `ErrorStateProps` : `title` (défaut « Une erreur est survenue »),
`description`, `action`.

```tsx
EmptyState({ title: "Aucun résultat", description: "Modifiez vos filtres.", icon: "search" });
<ErrorStateView description={error.message} action={<ButtonView onClick={reload}>Réessayer</ButtonView>} />;
```

Voir aussi `Skeleton`, `Progress` et le système de toasts (`ToastProvider`, `useToast`).

---

## Data

### MetricCard

`MetricCardProps` : `label`, `value`, `tone`, `icon`, `delta` (ex. `"+12.4%"`), `trend`
(`up | down | flat`), `helpText`.

```tsx
MetricCard({ label: "Chiffre d'affaires", value: "84 200 €", tone: "success", delta: "+12,4%", trend: "up" });
```

### DataTable (+ DataTableColumn)

`DataTableProps<T>` : `rows: T[]`, `columns: DataTableColumn<T>[]`, `rowKey`, `loading`,
`emptyText`, `striped`, `hoverable`, `compact`, `footer`, `onRowClick`, `selectable`,
`selectedRows`, `onSelectionChange`.

`DataTableColumn<T>` : `id`, `header`, `accessor` (clé de `T` **ou** fonction), `cell`
(fonction `(row, index)` qui peut renvoyer un `ReactNode` **ou** un `UINode`), `align`,
`width`, `sortable`, `footer`. Le helper `Column<T>(col)` type une colonne inline.

```tsx
const columns: DataTableColumn<User>[] = [
  Column({ id: "name", header: "Nom", accessor: "name" }),
  Column({
    id: "status",
    header: "Statut",
    // cell peut renvoyer un UINode déclaratif :
    cell: (u) => Badge({ text: u.active ? "Actif" : "Inactif", tone: u.active ? "success" : "neutral" }),
  }),
];

<DataTableView rows={users} columns={columns} rowKey="id" striped hoverable />;

// Déclaratif (générique) :
DataTable<User>({ rows: users, columns, rowKey: "id", striped: true });
```

Autres composants `data` : `StatBlock`, `List` (`items: ListItem[]`), `DescriptionList`,
`Timeline`.

---

## Form

`Form` (gère `onSubmit` en empêchant le rechargement), `FormSection` (`title`/`description`),
`FormField`, `FormActions`, et `FilterBar` (`title`, `fields`, `actions` — voir
`OperationsPage`). Ces composants acceptent indifféremment des enfants React ou des `UINode`.

```tsx
FilterBar({
  title: "Filtrer",
  fields: [DateInput({ id: "from", label: "Du", value, onValueChange })],
  actions: [Button({ text: "Réinitialiser", variant: "soft", onClick: reset })],
});
```
