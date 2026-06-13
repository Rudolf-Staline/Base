# Roadmap

## État actuel — V1

BaseKit V1 est complet et stable : il compile, passe le typecheck et les tests proprement. Ce
qui est en place :

- **`@basekit/tokens`** : palette clair/sombre, variantes `-soft`/`-hover` dérivées, preset
  Tailwind de classes sémantiques, génération de `theme.css`.
- **`@basekit/core`** : modèle `UINode`, factory + registry, renderer React (`renderNode` /
  `RenderNode`) avec fallback visible pour les composants inconnus, page builder (`createPage`,
  `Page`, `usePageRuntime`), utils (`cn`, `variants`, `composeRefs`, `invariant`).
- **`@basekit/ui`** : ~50 composants, chacun en triple export `XView` / `X` / `XProps`, plus le
  `defaultRegistry` et les layouts (dashboard, auth, reader, settings, form).
- **`@basekit/api`** : client HTTP générique typé, `ApiError`, `createMockClient`.
- **Apps** : un playground complet (vitrine, page déclarative `OperationsPage`, démo API,
  bascule clair/sombre) et une app docs.
- **Outillage** : monorepo pnpm, project references TypeScript, alias Vite en dev.

### Limites connues

- Pas de Storybook : le playground tient ce rôle.
- Validation de formulaire minimale (pas de schéma intégré).
- `DataTable` rend toutes les lignes (pas de virtualisation).
- Un seul renderer (React).
- Packages consommés via le workspace, non publiés.

## Prochaines étapes

### Court terme

- **Validation de formulaire enrichie** : intégration d'un schéma (ex. zod), messages d'erreur
  par champ câblés automatiquement, état `touched`/`dirty`, et helpers dans le page runtime.
- **`DataTable` virtualisée** : rendu fenêtré pour les grandes tables, tri/pagination intégrés
  (la prop `sortable` des colonnes est déjà prévue).
- **`CommandPalette`** : palette de commandes (⌘K) réutilisant `Dropdown`/`Modal` et le système
  d'icônes.

### Moyen terme

- **Storybook (optionnel)** : en complément du playground, pour la documentation interactive et
  les contrôles de props.
- **Tests de régression visuelle** : snapshots visuels des composants en clair et en sombre.
- **Renderers additionnels** : exploiter le fait que `UINode` est renderer-agnostique (rendu
  e-mail/HTML statique, voire non-DOM) en réutilisant le même modèle et le même registry.

### Long terme

- **Publication des packages** sur un registre (npm privé ou public), avec versionnage et
  changelog, pour consommer BaseKit hors du monorepo.
- Enrichissement continu du catalogue de composants et des layouts au fil des besoins produits.
