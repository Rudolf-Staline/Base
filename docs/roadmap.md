# Roadmap BaseKit

Ces composants ne sont pas annoncés comme disponibles dans la documentation principale tant qu'ils ne sont pas réellement implémentés, exportés, enregistrés et testés.

## Composants à venir

- CommandPalette
- DateRangePicker (sélection de plage avancée)
- Combobox avancé (navigation clavier complète : `ArrowUp`/`ArrowDown` parcourant les options, `aria-activedescendant`)
- Autocomplete avancé (suggestions asynchrones, mise en surbrillance des correspondances)

## Limites connues des composants livrés

Quelques composants sont des versions minimales honnêtes. Leurs limites assumées :

- **Combobox / Autocomplete** : filtrage local, sélection, `clear`, `Escape` pour fermer et
  `Enter` pour choisir la première option. La navigation flèche-par-flèche dans la liste et
  `aria-activedescendant` complet sont en roadmap.
- **Tooltip / Popover** : positionnement statique via `placement` (pas de moteur anti-collision).
- **Table** : table de présentation pour contenu libre. Pour une table pilotée par données
  (colonnes, tri, états de chargement/vide, sélection), utiliser `DataTable`.

## Critère d'entrée dans la documentation principale

Un composant rejoint la liste publique seulement quand il possède :

- un `XView` React ;
- un `X` déclaratif ;
- des props typées ;
- un export depuis `packages/ui/src/index.tsx` ;
- une entrée registry quand il est déclaratif ;
- une démonstration neutre si le composant est important ;
- un test comportemental minimal quand il est interactif.
