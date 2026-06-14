# Publication

## Décision

- **Registre :** npm (public).
- **Scope :** `@basekit` — revendiqué via une **organisation npm gratuite** nommée `basekit`
  (les 4 packages `@basekit/*` sont libres au moment de l'écriture).
- **Fallback :** si l'org `basekit` est indisponible, utiliser le scope personnel
  `@rudolf-staline` (déjà rattaché à ton compte) — cela impose un renommage des 4 packages,
  de leurs imports internes, du registry et du template.
- **Versioning :** les 4 packages publiables bougent en lockstep (groupe `fixed` Changesets).

## Setup unique

1. Créer l'org : npmjs.com → *Add Organization* → `basekit` → plan **Free** (packages publics).
2. Créer un **Automation token** : npmjs.com → *Access Tokens* → *Generate New Token* →
   type *Automation*.
3. L'ajouter au repo GitHub : *Settings → Secrets and variables → Actions* → secret
   `NPM_TOKEN`.

Rien d'autre n'est nécessaire : `.github/workflows/release.yml` est déjà câblé pour npm.

## Flux courant (automatisé)

1. Sur une PR de feature, après un changement qui impacte les consommateurs :
   ```bash
   pnpm changeset
   ```
2. Au merge sur `main`, le workflow Release ouvre (ou met à jour) une PR
   **« Version Packages »** : bump des versions + changelog.
3. Le merge de cette PR déclenche `pnpm release` (build puis `changeset publish`).

## Publier en local (manuel)

```bash
pnpm changeset       # décrire le changement
pnpm version         # bump + changelog
pnpm release         # build:packages puis changeset publish
```

## Consommer dans une app avant la stabilisation : prerelease

Pour brancher Omed Scripture sur BaseKit sans attendre une 1.0 stable, utiliser le mode
prerelease de Changesets :

```bash
pnpm changeset pre enter next   # entre en mode prerelease (tag "next")
pnpm changeset                  # décrire le changement
pnpm version                    # produit p.ex. 0.1.0-next.0
pnpm release                    # publie sous le tag npm "next"
```

Côté Omed :

```bash
pnpm add @basekit/ui@next @basekit/core@next @basekit/tokens@next @basekit/api@next
```

Quand l'API est figée :

```bash
pnpm changeset pre exit
pnpm version && pnpm release     # première version stable
```

## Câblage côté consommateur

Voir le starter [`packages/templates/react-vite`](../packages/templates/README.md) : preset
Tailwind `basekitPreset`, scan de `node_modules/@basekit/ui/dist/**`, import de
`@basekit/tokens/theme.css`.
