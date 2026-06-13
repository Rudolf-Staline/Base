# @basekit/templates

Starter templates for new BaseKit-based applications. These are reference files
(not built or linted) you copy into a fresh Vite + React + TypeScript app to get
tokens, Tailwind and the component library wired up in minutes.

## `react-vite` template

A minimal React/Vite/TS app already plugged into BaseKit. Files live in
[`./react-vite`](./react-vite):

| File                 | Purpose                                              |
| -------------------- | ---------------------------------------------------- |
| `package.json`       | Dependencies on `@basekit/*` + Vite/Tailwind         |
| `vite.config.ts`     | React plugin                                          |
| `tailwind.config.ts` | Uses `basekitPreset` + scans `@basekit/ui`           |
| `postcss.config.js`  | Tailwind + autoprefixer                              |
| `src/main.tsx`       | Imports `@basekit/tokens/theme.css` + mounts the app |
| `src/styles.css`     | `@tailwind` layers + base body styles                |
| `src/App.tsx`        | A starter dashboard page                             |

### Quick start

```bash
# 1. scaffold a Vite React+TS app
pnpm create vite my-app --template react-ts
cd my-app

# 2. add BaseKit
pnpm add @basekit/ui @basekit/core @basekit/tokens @basekit/api
pnpm add -D tailwindcss postcss autoprefixer

# 3. copy the template files from packages/templates/react-vite over your src/
# 4. run
pnpm dev
```

## Updating BaseKit in a consumer project

BaseKit is versioned. To pick up changes:

```bash
pnpm up @basekit/ui @basekit/core @basekit/tokens @basekit/api --latest
pnpm build
```

Because all styling flows through tokens and the Tailwind preset, visual updates
propagate automatically once you rebuild.
