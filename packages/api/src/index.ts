export type ApiClientOptions = { baseUrl: string; getToken?: () => string | null | undefined | Promise<string | null | undefined>; headers?: HeadersInit; timeoutMs?: number };
export type ApiResponse<T> = { data: T; status: number; headers: Headers };
export class ApiError<T = unknown> extends Error { constructor(public status: number, message: string, public payload?: T) { super(message); this.name = "ApiError"; } }
const joinUrl = (baseUrl: string, path: string) => `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
export const createApiClient = (options: ApiClientOptions) => {
  const request = async <T>(method: string, path: string, body?: unknown, init: RequestInit = {}): Promise<T> => {
    const controller = new AbortController(); const timeout = options.timeoutMs ? setTimeout(() => controller.abort(), options.timeoutMs) : undefined;
    const token = await options.getToken?.();
    try {
      const response = await fetch(joinUrl(options.baseUrl, path), { ...init, method, signal: controller.signal, headers: { "Content-Type":"application/json", ...(options.headers ?? {}), ...(init.headers ?? {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: body === undefined ? undefined : JSON.stringify(body) });
      const text = await response.text(); const payload = text ? JSON.parse(text) : undefined;
      if (!response.ok) throw new ApiError(response.status, payload?.message ?? response.statusText, payload);
      return payload as T;
    } finally { if (timeout) clearTimeout(timeout); }
  };
  return { request, get:<T>(p:string,i?:RequestInit)=>request<T>("GET",p,undefined,i), post:<T>(p:string,b?:unknown,i?:RequestInit)=>request<T>("POST",p,b,i), put:<T>(p:string,b?:unknown,i?:RequestInit)=>request<T>("PUT",p,b,i), patch:<T>(p:string,b?:unknown,i?:RequestInit)=>request<T>("PATCH",p,b,i), delete:<T>(p:string,i?:RequestInit)=>request<T>("DELETE",p,undefined,i) };
};
