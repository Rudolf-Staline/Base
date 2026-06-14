# Changesets

Ce dossier pilote le versioning et la publication des packages publiables de BaseKit
(`@basekit/tokens`, `@basekit/core`, `@basekit/ui`, `@basekit/api`), versionnés en lockstep
(groupe `fixed`).

## Flux

1. Après un changement qui impacte les consommateurs, créer un changeset :

   ```bash
   pnpm changeset
   ```

   Choisir le niveau (`patch` / `minor` / `major`) et décrire le changement.
   Un fichier markdown est ajouté ici.

2. Pour appliquer les changesets en attente (bump des versions + changelog) :

   ```bash
   pnpm version
   ```

3. Pour builder puis publier sur le registre :

   ```bash
   pnpm release
   ```

En CI, l'étape 3 est gérée par `.github/workflows/release.yml` après merge sur `main`.

> Les packages `private` (`@basekit/config`, `@basekit/templates`, apps) sont ignorés
> automatiquement et ne sont jamais publiés.
