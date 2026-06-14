# Roadmap BaseKit

Ces composants ne sont pas annoncés comme disponibles dans la documentation principale tant qu'ils ne sont pas réellement implémentés, exportés, enregistrés et testés.

## Composants à venir

- ButtonGroup
- Toggle
- ToggleGroup
- Popover
- Tooltip
- Pagination
- Breadcrumb
- Table
- DateTimeInput
- DateRangePicker avancé
- Combobox avancé
- Autocomplete avancé
- CommandPalette

## Critère d'entrée dans la documentation principale

Un composant rejoint la liste publique seulement quand il possède :

- un `XView` React ;
- un `X` déclaratif ;
- des props typées ;
- un export depuis `packages/ui/src/index.tsx` ;
- une entrée registry quand il est déclaratif ;
- une démonstration neutre si le composant est important ;
- un test comportemental minimal quand il est interactif.
