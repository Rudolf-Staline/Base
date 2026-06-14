# BaseKit

BaseKit est une bibliothèque générique de composants UI, de tokens de design system et de moteur déclaratif React. Elle fournit des primitives composables pour construire des interfaces produit sans embarquer de domaine métier.

> Règle : **BaseKit ne contient aucun composant métier. Les projets consommateurs créent leurs objets métier eux-mêmes à partir des composants génériques.**

## Vision

- composants React accessibles et stylables ;
- factories déclaratives rendues par `RenderNode` ;
- registry extensible ;
- tokens partagés : couleurs, typographie, spacing, radius, shadows et thèmes clair/sombre ;
- playground vitrine, organisé par familles de composants.

## Composants disponibles

Buttons, ButtonGroup, IconButton, Radio, RadioGroup, Checkbox, CheckboxGroup, Switch, Toggle, ToggleGroup, Input, TextInput, NumberInput, PasswordInput, SearchInput, EmailInput, PhoneInput, UrlInput, Textarea, DateInput, TimeInput, DateTimeInput, Calendar, DatePicker, DateRangePicker, TimePicker, Select, MultiSelect, Combobox, Autocomplete, Slider, RangeSlider, FileInput, Dropzone, Form, FormField, FieldLabel, FieldHint, FieldError, FormSection, FormActions, Card, Modal, Drawer, Popover, Tooltip, Dropdown, Tabs, Accordion, Alert, Toast, Badge, Avatar, DataTable, Pagination, Breadcrumb, Sidebar, Topbar, AppShell, Container, Stack, Inline, Grid, Divider, Skeleton, Spinner, Progress, EmptyState et ErrorState.

## Usage React

```tsx
import { ButtonView, TextInputView } from "@basekit/ui";

<ButtonView tone="primary">Valider</ButtonView>
<TextInputView label="Nom" placeholder="Entrez un nom" />
```

## Usage déclaratif

```ts
import { Button, DatePicker, EmailInput, Page, RadioGroup, Stack, TextInput } from "@basekit/ui";

Page({
  title: "Formulaire",
  content: Stack({
    gap: "md",
    children: [
      TextInput({ label: "Nom", placeholder: "Entrez un nom" }),
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

## Formulaires génériques

`Form`, `FormSection`, `FormField`, `FieldLabel`, `FieldHint`, `FieldError` et `FormActions` servent à composer des formulaires neutres avec des champs comme Nom, Email, Rôle, Statut, Date et Description.

## Playground

`apps/playground` est une vitrine générique : Foundations, Buttons, Inputs, Selection, Date & Calendar, Feedback, Overlays, Layout, Data Display et Forms.

## Conventions

- ne pas introduire d'exemple métier ;
- utiliser des données neutres (`Item A`, `Option A`, `Utilisateur`, `Projet`, `Statut`, `Quantité`) ;
- conserver les tokens, le core déclaratif, le renderer et le registry ;
- documenter les limites des composants simples comme Calendar/DatePicker.

## Interdictions

Aucun exemple ou composant centré sur un secteur, une application ou un workflow métier ne doit être ajouté au dépôt. Les dossiers d'exemples doivent rester génériques.
