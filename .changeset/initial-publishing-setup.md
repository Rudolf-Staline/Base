---
"@basekit/tokens": minor
"@basekit/core": minor
"@basekit/ui": minor
"@basekit/api": minor
---

Préparation à la distribution : `sideEffects: false` sur `core`, `ui` et `api` pour permettre
le tree-shaking côté consommateurs (Vite/Rollup), et `publishConfig.access: public` sur les
packages publiables. Aucun changement d'API.
