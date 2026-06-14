/// <reference types="vite/client" />

declare module "node:path" {
  export function resolve(...paths: string[]): string;
}

declare module "node:url" {
  export function fileURLToPath(url: string | URL): string;
}
