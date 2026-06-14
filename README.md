# BaseKit

BaseKit est une bibliothèque générique de composants UI, de tokens de design system et de moteur déclaratif React. Elle fournit des primitives composables pour construire des interfaces produit sans embarquer de domaine métier.

> Règle : **BaseKit ne contient aucun composant métier. Les projets consommateurs créent leurs objets métier eux-mêmes à partir des composants génériques.**

## Vision

- composants React accessibles et stylables ;
- factories déclaratives rendues par `RenderNode` ;
- registry extensible ;
- tokens partagés : couleurs, typographie, spacing, radius, shadows et thèmes clair/sombre ;
- playground vitrine, organisé par familles de composants.

## Composants réellement disponibles

- **Actions** : Button, IconButton.
- **Inputs** : Input, TextInput, NumberInput, PasswordInput, SearchInput, EmailInput, PhoneInput, UrlInput, Textarea, DateInput, Calendar, DatePicker, TimePicker, FileInput, Dropzone.
- **Sélection** : Radio, RadioGroup, Checkbox, CheckboxGroup, Switch, Select, MultiSelect, Combobox, Autocomplete.
- **Sliders** : Slider, RangeSlider.
- **Formulaires** : Form, FormField, FieldLabel, FieldHint, FieldError, FormSection, FormActions, FilterBar.
- **Composition** : Card, CardHeader, CardContent, CardFooter, Modal, Drawer, Dropdown, Tabs, Accordion.
- **Feedback** : Alert, Callout, Toast, Skeleton, Spinner, Progress, EmptyState, ErrorState.
- **Data display** : DataTable, MetricCard, StatBlock, DescriptionList, Timeline, List, Badge, Avatar, Link, Divider, Kbd.
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

## Roadmap

Les composants non prêts ne sont pas listés comme disponibles. Consultez `docs/roadmap.md` pour les prochains composants prévus.

## Conventions

- ne pas introduire d'exemple métier ;
- utiliser des données neutres (`Item A`, `Option A`, `Utilisateur`, `Projet`, `Statut`, `Quantité`) ;
- conserver les tokens, le core déclaratif, le renderer et le registry ;
- documenter honnêtement les limites des composants simples.
