# Couche API

`@basekit/api` est un client HTTP **générique et typé**, volontairement dépourvu de logique
métier. On le configure une fois (URL de base, token, headers, timeout) puis on appelle
`get/post/put/patch/delete`. Les erreurs remontent sous forme d'un `ApiError` typé. Un client
mock en mémoire (`createMockClient`) sert aux démos et aux tests.

## `createApiClient`

```ts
import { createApiClient } from "@basekit/api";

const api = createApiClient({
  baseUrl: "https://api.exemple.fr",
  getToken: () => localStorage.getItem("token"), // sync ou async
  headers: { "X-App": "basekit" },               // headers par défaut
  timeoutMs: 10_000,                              // 0 désactive
  onError: (err) => console.error(err.status, err.message),
});
```

`ApiClientOptions` :

| Option      | Type                                                          | Rôle                                            |
| ----------- | ------------------------------------------------------------ | ----------------------------------------------- |
| `baseUrl`   | `string`                                                     | Préfixe de toutes les requêtes                  |
| `getToken`  | `() => string \| null \| undefined \| Promise<…>`           | Ajoute `Authorization: Bearer <token>`          |
| `headers`   | `HeadersInit`                                               | En-têtes par défaut                             |
| `timeoutMs` | `number`                                                    | Timeout par défaut (0 = désactivé)              |
| `onError`   | `(error: ApiError) => void`                                | Observer/transformer les erreurs avant le throw |

Le client retourne l'objet :

```ts
{
  request,  // <T>(method, path, body?, options?) => Promise<T>
  raw,      // <T>(...) => Promise<ApiResponse<T>>  (data + status + headers + ok)
  get,      // <T>(path, options?) => Promise<T>
  post,     // <T>(path, body?, options?) => Promise<T>
  put,      // <T>(path, body?, options?) => Promise<T>
  patch,    // <T>(path, body?, options?) => Promise<T>
  delete,   // <T>(path, options?) => Promise<T>
}
```

## GET / POST / PUT / PATCH / DELETE

Toutes les méthodes sont génériques sur le type de réponse :

```ts
type User = { id: string; name: string };

const me = await api.get<User>("/me");
const created = await api.post<User>("/users", { name: "Ada" });
const updated = await api.put<User>("/users/1", { name: "Ada L." });
const patched = await api.patch<User>("/users/1", { name: "Ada Lovelace" });
await api.delete<void>("/users/1");
```

Le corps des `post/put/patch` est sérialisé en JSON automatiquement (l'en-tête
`Content-Type: application/json` est posé quand un body JSON est présent). `request` renvoie
directement `data` ; `raw` renvoie l'enveloppe complète :

```ts
const res = await api.raw<User[]>("GET", "/users");
res.status;  // 200
res.headers; // Headers
res.data;    // User[]
res.ok;      // true
```

## Token d'authentification

`getToken` est appelé avant chaque requête. S'il renvoie une valeur, l'en-tête
`Authorization: Bearer <token>` est ajouté. Il peut être synchrone ou asynchrone (ex. lecture
d'un store, rafraîchissement). Une exception levée par `getToken` est ignorée silencieusement
(la requête part sans token).

## `RequestOptions`

Chaque appel accepte un dernier argument d'options :

```ts
type RequestOptions = {
  query?: QueryParams;     // params de query string ; un tableau produit des clés répétées
  headers?: HeadersInit;   // headers par requête, fusionnés par-dessus ceux du client
  timeoutMs?: number;      // timeout par requête, surcharge le défaut
  signal?: AbortSignal;    // signal d'annulation externe, combiné avec celui du timeout
  rawBody?: BodyInit;      // envoie un corps brut (FormData, Blob, string) au lieu de JSON
};
```

Exemples :

```ts
// query string : /search?tag=a&tag=b&page=2
await api.get<Result[]>("/search", { query: { tag: ["a", "b"], page: 2 } });

// headers et timeout spécifiques
await api.get<Report>("/reports/heavy", { timeoutMs: 30_000, headers: { Accept: "text/csv" } });

// annulation
const controller = new AbortController();
const promise = api.get<User>("/me", { signal: controller.signal });
controller.abort();

// upload de fichier (corps brut, pas de JSON)
const form = new FormData();
form.append("file", file);
await api.post<{ url: string }>("/upload", undefined, { rawBody: form });
```

Helpers exportés : `joinUrl(base, path)` et `buildQueryString(params)`.

## Gestion des erreurs : `ApiError`

Toute réponse non-2xx, tout timeout et toute panne réseau lèvent un `ApiError` :

| Propriété        | Type      | Description                                              |
| ---------------- | --------- | -------------------------------------------------------- |
| `status`         | `number`  | Code HTTP ; `0` pour réseau/timeout                      |
| `message`        | `string`  | Message (extrait du payload `message` si présent)        |
| `payload`        | `T`       | Corps de la réponse d'erreur (parsé)                     |
| `url`            | `string`  | URL appelée                                              |
| `isNetworkError` | `boolean` | `true` si `status === 0` (réseau ou timeout)             |

```ts
import { ApiError } from "@basekit/api";

try {
  await api.get<User>("/me");
} catch (err) {
  if (err instanceof ApiError) {
    if (err.isNetworkError) {
      // panne réseau ou timeout
    } else if (err.status === 401) {
      // non authentifié
    } else {
      console.error(err.status, err.payload);
    }
  }
}
```

`onError` (option du client) est appelé pour observer/journaliser l'erreur avant qu'elle ne
soit relancée.

## `createMockClient`

Un client en mémoire, sans réseau, qui implémente la même interface que `createApiClient`.
Idéal pour le playground et les tests. Les routes sont testées dans l'ordre ; une route non
trouvée lève un `ApiError` 404, exactement comme le vrai client.

```ts
import { createMockClient } from "@basekit/api";

const api = createMockClient([
  { method: "GET", path: "/me", response: { id: "1", name: "Ada" } },
  {
    method: "GET",
    path: /^\/users\/\d+$/,                 // path peut être une RegExp
    response: (path) => ({ id: path.split("/").pop() }),
  },
  { method: "POST", path: "/users", response: (path, body) => ({ id: "2", ...(body as object) }) },
  { method: "GET", path: "/boom", status: 500 }, // route d'erreur
]);

await api.get("/me");                    // { id: "1", name: "Ada" }
await api.get("/unknown");               // throw ApiError(404)
```

`MockRoute` : `method?`, `path` (string ou RegExp, sans query string), `response` (statique ou
résolveur `(path, body) => …`), `status?` (≥ 400 ⇒ erreur), `delay?` (latence simulée en ms).
`createMockClient(routes, { defaultDelay })` permet de régler la latence par défaut (250 ms).

## Brancher l'API dans une page

Le client se passe en `services` à `usePageRuntime`, où `data` et `actions` peuvent l'utiliser :

```ts
const { node } = usePageRuntime(page, { services: { api } });

// dans la définition :
data: async ({ services }) => ({
  users: await services.api.get<User[]>("/users"),
}),
```
